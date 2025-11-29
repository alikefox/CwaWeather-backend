require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// 載入餐點資料庫與權重系統
const { FOOD_CATEGORIES, FOOD_ITEMS, TAIWAN_CITIES } = require("./data/foodDatabase");
const {
  getMealType,
  getAllCategoryWeights,
  selectCategoryByWeight,
  selectFoodFromCategory,
  selectDrink
} = require("./data/weightSystem");

const app = express();
const PORT = process.env.PORT || 3000;

// CWA API 設定
const CWA_API_BASE_URL = "https://opendata.cwa.gov.tw/api";
const CWA_API_KEY = process.env.CWA_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 解析天氣資料
 */
function parseWeatherData(locationData) {
  const weatherElements = locationData.weatherElement;
  const timeCount = weatherElements[0].time.length;
  const forecasts = [];

  for (let i = 0; i < timeCount; i++) {
    const forecast = {
      startTime: weatherElements[0].time[i].startTime,
      endTime: weatherElements[0].time[i].endTime,
      weather: "",
      rain: "",
      minTemp: "",
      maxTemp: "",
      comfort: ""
    };

    weatherElements.forEach((element) => {
      const value = element.time[i].parameter;
      switch (element.elementName) {
        case "Wx":
          forecast.weather = value.parameterName;
          break;
        case "PoP":
          forecast.rain = value.parameterName;
          break;
        case "MinT":
          forecast.minTemp = value.parameterName;
          break;
        case "MaxT":
          forecast.maxTemp = value.parameterName;
          break;
        case "CI":
          forecast.comfort = value.parameterName;
          break;
      }
    });

    forecasts.push(forecast);
  }

  return forecasts;
}

/**
 * 產生單餐推薦
 */
function generateMealRecommendation(temperature, weather, mealType) {
  // 計算所有類別權重
  const weights = getAllCategoryWeights(FOOD_CATEGORIES, temperature, weather, mealType);

  // 選擇類別
  const selectedCategoryId = selectCategoryByWeight(weights);
  if (!selectedCategoryId) return null;

  const category = FOOD_CATEGORIES[selectedCategoryId];

  // 從類別中選擇餐點
  const food = selectFoodFromCategory(selectedCategoryId, FOOD_ITEMS);

  // 選擇飲品（午餐晚餐才推薦）
  let drink = null;
  if (mealType !== 'breakfast' || Math.random() > 0.5) {
    drink = selectDrink(temperature, weather, FOOD_ITEMS);
  }

  return {
    category: {
      id: category.id,
      name: category.name,
      icon: category.icon
    },
    food: food ? {
      id: food.id,
      name: food.name,
      icon: category.icon
    } : null,
    drink: drink ? {
      id: drink.id,
      name: drink.name,
      icon: drink.category === 'COLD_DRINK' ? '🧋' : '☕'
    } : null
  };
}

/**
 * 產生三餐推薦
 */
function generateAllRecommendations(temperature, weather) {
  return {
    breakfast: generateMealRecommendation(temperature, weather, 'breakfast'),
    lunch: generateMealRecommendation(temperature, weather, 'lunch'),
    dinner: generateMealRecommendation(temperature, weather, 'dinner')
  };
}

/**
 * 取得指定縣市天氣預報
 */
const getCityWeather = async (req, res) => {
  try {
    const { city } = req.params;

    // 檢查是否有設定 API Key
    if (!CWA_API_KEY) {
      return res.status(500).json({
        error: "伺服器設定錯誤",
        message: "請在 .env 檔案中設定 CWA_API_KEY"
      });
    }

    // 驗證城市名稱
    const cityInfo = TAIWAN_CITIES.find(
      c => c.name === city || c.apiName === city || c.id === city
    );

    if (!cityInfo) {
      return res.status(400).json({
        error: "無效的縣市名稱",
        message: `找不到「${city}」，請使用正確的縣市名稱`,
        availableCities: TAIWAN_CITIES.map(c => c.name)
      });
    }

    // 呼叫 CWA API
    const response = await axios.get(
      `${CWA_API_BASE_URL}/v1/rest/datastore/F-C0032-001`,
      {
        params: {
          Authorization: CWA_API_KEY,
          locationName: cityInfo.apiName
        }
      }
    );

    const locationData = response.data.records.location[0];

    if (!locationData) {
      return res.status(404).json({
        error: "查無資料",
        message: `無法取得${cityInfo.name}天氣資料`
      });
    }

    // 解析天氣資料
    const forecasts = parseWeatherData(locationData);
    const current = forecasts[0];

    // 計算平均溫度
    const avgTemp = Math.round((parseInt(current.maxTemp) + parseInt(current.minTemp)) / 2);

    // 產生餐點推薦
    const recommendations = generateAllRecommendations(avgTemp, current.weather);

    // 回傳資料
    res.json({
      success: true,
      data: {
        city: cityInfo.name,
        cityId: cityInfo.id,
        region: cityInfo.region,
        weather: current.weather,
        temperature: {
          min: parseInt(current.minTemp),
          max: parseInt(current.maxTemp),
          avg: avgTemp
        },
        rainProbability: parseInt(current.rain),
        comfort: current.comfort,
        forecasts: forecasts,
        recommendations: recommendations
      }
    });

  } catch (error) {
    console.error("取得天氣資料失敗:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: "CWA API 錯誤",
        message: error.response.data.message || "無法取得天氣資料",
        details: error.response.data
      });
    }

    res.status(500).json({
      error: "伺服器錯誤",
      message: "無法取得天氣資料，請稍後再試"
    });
  }
};

/**
 * 刷新單餐推薦
 */
const refreshRecommendation = async (req, res) => {
  try {
    const { city, meal } = req.params;

    // 驗證餐別
    if (!['breakfast', 'lunch', 'dinner'].includes(meal)) {
      return res.status(400).json({
        error: "無效的餐別",
        message: "請使用 breakfast, lunch 或 dinner"
      });
    }

    // 驗證城市
    const cityInfo = TAIWAN_CITIES.find(
      c => c.name === city || c.apiName === city || c.id === city
    );

    if (!cityInfo) {
      return res.status(400).json({
        error: "無效的縣市名稱"
      });
    }

    // 取得天氣資料
    const response = await axios.get(
      `${CWA_API_BASE_URL}/v1/rest/datastore/F-C0032-001`,
      {
        params: {
          Authorization: CWA_API_KEY,
          locationName: cityInfo.apiName
        }
      }
    );

    const locationData = response.data.records.location[0];
    const forecasts = parseWeatherData(locationData);
    const current = forecasts[0];
    const avgTemp = Math.round((parseInt(current.maxTemp) + parseInt(current.minTemp)) / 2);

    // 產生新推薦
    const recommendation = generateMealRecommendation(avgTemp, current.weather, meal);

    res.json({
      success: true,
      data: recommendation
    });

  } catch (error) {
    console.error("刷新推薦失敗:", error.message);
    res.status(500).json({
      error: "伺服器錯誤",
      message: "無法刷新推薦，請稍後再試"
    });
  }
};

// ===== Routes =====

// 首頁
app.get("/", (req, res) => {
  res.json({
    message: "🍽️ 歡迎使用「看天吃飯」API",
    description: "根據天氣智慧推薦三餐",
    endpoints: {
      getCities: "GET /api/cities",
      getWeather: "GET /api/weather/:city",
      refreshRecommendation: "GET /api/recommend/:city/:meal",
      health: "GET /api/health"
    }
  });
});

// 健康檢查
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 取得所有縣市列表
app.get("/api/cities", (req, res) => {
  res.json({
    success: true,
    data: TAIWAN_CITIES
  });
});

// 取得指定縣市天氣與推薦
app.get("/api/weather/:city", getCityWeather);

// 相容舊的高雄 API
app.get("/api/weather/kaohsiung", (req, res) => {
  req.params.city = "高雄市";
  getCityWeather(req, res);
});

// 刷新單餐推薦
app.get("/api/recommend/:city/:meal", refreshRecommendation);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "伺服器錯誤",
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "找不到此路徑"
  });
});

app.listen(PORT, () => {
  console.log(`🍽️ 看天吃飯 API 伺服器已啟動`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📍 環境: ${process.env.NODE_ENV || "development"}`);
});
