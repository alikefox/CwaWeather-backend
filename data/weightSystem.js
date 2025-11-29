/**
 * 看天吃飯 - 權重系統
 * 根據天氣條件計算餐點推薦權重
 */

// ===== 溫度對類別的權重影響 =====
// 溫度區間: FREEZING(≤10), COLD(11-17), COOL(18-22), WARM(23-27), HOT(28-32), SCORCHING(≥33)
const TEMPERATURE_WEIGHTS = {
  HOT_SOUP:     { FREEZING: 1.8, COLD: 1.5, COOL: 1.2, WARM: 0.9, HOT: 0.5, SCORCHING: 0.3 },
  HOT_POT:      { FREEZING: 2.0, COLD: 1.7, COOL: 1.3, WARM: 0.8, HOT: 0.4, SCORCHING: 0.2 },
  NOODLES_HOT:  { FREEZING: 1.6, COLD: 1.4, COOL: 1.2, WARM: 1.0, HOT: 0.7, SCORCHING: 0.5 },
  NOODLES_COLD: { FREEZING: 0.2, COLD: 0.4, COOL: 0.8, WARM: 1.2, HOT: 1.6, SCORCHING: 1.8 },
  RICE_HOT:     { FREEZING: 1.3, COLD: 1.2, COOL: 1.1, WARM: 1.0, HOT: 0.9, SCORCHING: 0.8 },
  RICE_COLD:    { FREEZING: 0.4, COLD: 0.6, COOL: 0.9, WARM: 1.2, HOT: 1.4, SCORCHING: 1.5 },
  CONGEE:       { FREEZING: 1.5, COLD: 1.3, COOL: 1.1, WARM: 1.0, HOT: 0.9, SCORCHING: 0.8 },
  FRIED:        { FREEZING: 0.8, COLD: 0.9, COOL: 1.0, WARM: 1.0, HOT: 0.8, SCORCHING: 0.6 },
  STIR_FRY:     { FREEZING: 1.2, COLD: 1.1, COOL: 1.0, WARM: 1.0, HOT: 0.9, SCORCHING: 0.8 },
  BBQ_GRILL:    { FREEZING: 0.7, COLD: 0.8, COOL: 1.0, WARM: 1.1, HOT: 0.9, SCORCHING: 0.6 },
  SALAD:        { FREEZING: 0.3, COLD: 0.5, COOL: 0.8, WARM: 1.2, HOT: 1.5, SCORCHING: 1.7 },
  SANDWICH:     { FREEZING: 0.8, COLD: 0.9, COOL: 1.0, WARM: 1.1, HOT: 1.0, SCORCHING: 0.9 },
  BREAD:        { FREEZING: 0.9, COLD: 1.0, COOL: 1.0, WARM: 1.0, HOT: 0.9, SCORCHING: 0.8 },
  DIMSUM:       { FREEZING: 1.3, COLD: 1.2, COOL: 1.1, WARM: 1.0, HOT: 0.9, SCORCHING: 0.8 },
  SWEET_SOUP:   { FREEZING: 1.5, COLD: 1.3, COOL: 1.0, WARM: 0.8, HOT: 0.6, SCORCHING: 0.5 },
  ICE_DESSERT:  { FREEZING: 0.1, COLD: 0.3, COOL: 0.6, WARM: 1.0, HOT: 1.6, SCORCHING: 2.0 },
  COLD_DRINK:   { FREEZING: 0.3, COLD: 0.5, COOL: 0.8, WARM: 1.2, HOT: 1.6, SCORCHING: 1.8 },
  HOT_DRINK:    { FREEZING: 1.8, COLD: 1.5, COOL: 1.2, WARM: 0.9, HOT: 0.5, SCORCHING: 0.3 },
  TAIWANESE:    { FREEZING: 1.1, COLD: 1.1, COOL: 1.0, WARM: 1.0, HOT: 1.0, SCORCHING: 0.9 },
  JAPANESE:     { FREEZING: 1.0, COLD: 1.0, COOL: 1.0, WARM: 1.0, HOT: 1.0, SCORCHING: 1.0 },
  WESTERN:      { FREEZING: 1.0, COLD: 1.0, COOL: 1.0, WARM: 1.0, HOT: 1.0, SCORCHING: 1.0 },
  KOREAN:       { FREEZING: 1.3, COLD: 1.2, COOL: 1.0, WARM: 0.9, HOT: 0.8, SCORCHING: 0.7 },
  SEAFOOD:      { FREEZING: 0.9, COLD: 1.0, COOL: 1.0, WARM: 1.1, HOT: 1.2, SCORCHING: 1.1 },
  VEGETARIAN:   { FREEZING: 0.8, COLD: 0.9, COOL: 1.0, WARM: 1.1, HOT: 1.2, SCORCHING: 1.2 }
};

// ===== 天氣狀況對類別的權重影響 =====
// 天氣: SUNNY, CLOUDY, RAINY, STORMY
const WEATHER_WEIGHTS = {
  HOT_SOUP:     { SUNNY: 0.9, CLOUDY: 1.0, RAINY: 1.4, STORMY: 1.6 },
  HOT_POT:      { SUNNY: 0.8, CLOUDY: 1.0, RAINY: 1.5, STORMY: 1.7 },
  NOODLES_HOT:  { SUNNY: 0.9, CLOUDY: 1.0, RAINY: 1.3, STORMY: 1.4 },
  NOODLES_COLD: { SUNNY: 1.3, CLOUDY: 1.0, RAINY: 0.6, STORMY: 0.4 },
  RICE_HOT:     { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.1, STORMY: 1.2 },
  RICE_COLD:    { SUNNY: 1.2, CLOUDY: 1.0, RAINY: 0.7, STORMY: 0.5 },
  CONGEE:       { SUNNY: 0.9, CLOUDY: 1.0, RAINY: 1.2, STORMY: 1.3 },
  FRIED:        { SUNNY: 1.1, CLOUDY: 1.0, RAINY: 0.8, STORMY: 0.7 },
  STIR_FRY:     { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.0, STORMY: 1.0 },
  BBQ_GRILL:    { SUNNY: 1.2, CLOUDY: 1.0, RAINY: 0.6, STORMY: 0.4 },
  SALAD:        { SUNNY: 1.3, CLOUDY: 1.0, RAINY: 0.6, STORMY: 0.4 },
  SANDWICH:     { SUNNY: 1.1, CLOUDY: 1.0, RAINY: 0.9, STORMY: 0.8 },
  BREAD:        { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.0, STORMY: 1.0 },
  DIMSUM:       { SUNNY: 0.9, CLOUDY: 1.0, RAINY: 1.1, STORMY: 1.2 },
  SWEET_SOUP:   { SUNNY: 0.8, CLOUDY: 1.0, RAINY: 1.2, STORMY: 1.3 },
  ICE_DESSERT:  { SUNNY: 1.4, CLOUDY: 1.0, RAINY: 0.5, STORMY: 0.3 },
  COLD_DRINK:   { SUNNY: 1.3, CLOUDY: 1.0, RAINY: 0.7, STORMY: 0.5 },
  HOT_DRINK:    { SUNNY: 0.8, CLOUDY: 1.0, RAINY: 1.3, STORMY: 1.5 },
  TAIWANESE:    { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.1, STORMY: 1.1 },
  JAPANESE:     { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.0, STORMY: 1.0 },
  WESTERN:      { SUNNY: 1.0, CLOUDY: 1.0, RAINY: 1.0, STORMY: 1.0 },
  KOREAN:       { SUNNY: 0.9, CLOUDY: 1.0, RAINY: 1.2, STORMY: 1.3 },
  SEAFOOD:      { SUNNY: 1.1, CLOUDY: 1.0, RAINY: 0.9, STORMY: 0.8 },
  VEGETARIAN:   { SUNNY: 1.1, CLOUDY: 1.0, RAINY: 0.9, STORMY: 0.9 }
};

// ===== 餐別權重調整 =====
const MEAL_TYPE_WEIGHTS = {
  breakfast: {
    BREAD: 1.5,
    SANDWICH: 1.5,
    CONGEE: 1.4,
    DIMSUM: 1.4,
    HOT_DRINK: 1.3,
    NOODLES_HOT: 1.2,
    TAIWANESE: 1.2,
    RICE_COLD: 1.3,
    // 早餐不適合的
    HOT_POT: 0.0,
    BBQ_GRILL: 0.0,
    STIR_FRY: 0.3,
    ICE_DESSERT: 0.5,
    SEAFOOD: 0.4,
    KOREAN: 0.5,
    SWEET_SOUP: 0.4,
    FRIED: 0.6,
    JAPANESE: 0.7,
    WESTERN: 1.2  // 早午餐
  },
  lunch: {
    RICE_HOT: 1.3,
    NOODLES_HOT: 1.2,
    TAIWANESE: 1.2,
    SALAD: 1.2,
    STIR_FRY: 1.1,
    FRIED: 1.1,
    JAPANESE: 1.1,
    WESTERN: 1.1,
    KOREAN: 1.0,
    SEAFOOD: 1.0,
    SANDWICH: 1.0,
    HOT_POT: 0.9,
    BBQ_GRILL: 0.8
  },
  dinner: {
    HOT_POT: 1.4,
    BBQ_GRILL: 1.3,
    STIR_FRY: 1.3,
    KOREAN: 1.2,
    JAPANESE: 1.2,
    SEAFOOD: 1.2,
    RICE_HOT: 1.1,
    NOODLES_HOT: 1.1,
    TAIWANESE: 1.1,
    SWEET_SOUP: 1.0,
    // 晚餐較少的
    BREAD: 0.5,
    SANDWICH: 0.6,
    CONGEE: 0.9,
    RICE_COLD: 0.6
  }
};

// ===== 飲品類別（用於推薦搭配飲料）=====
const DRINK_CATEGORIES = ['COLD_DRINK', 'HOT_DRINK'];

// ===== 輔助函數 =====

/**
 * 根據溫度取得溫度區間代碼
 */
function getTemperatureZone(temp) {
  if (temp <= 10) return 'FREEZING';
  if (temp <= 17) return 'COLD';
  if (temp <= 22) return 'COOL';
  if (temp <= 27) return 'WARM';
  if (temp <= 32) return 'HOT';
  return 'SCORCHING';
}

/**
 * 根據天氣描述取得天氣代碼
 */
function getWeatherCondition(weatherDesc) {
  if (!weatherDesc) return 'CLOUDY';
  if (weatherDesc.includes('雷') || weatherDesc.includes('大雨') || weatherDesc.includes('豪雨')) {
    return 'STORMY';
  }
  if (weatherDesc.includes('雨')) {
    return 'RAINY';
  }
  if (weatherDesc.includes('晴')) {
    return 'SUNNY';
  }
  return 'CLOUDY';
}

/**
 * 根據當前時間取得餐別
 */
function getMealType(hour = null) {
  const h = hour !== null ? hour : new Date().getHours();
  if (h >= 5 && h < 11) return 'breakfast';
  if (h >= 11 && h < 17) return 'lunch';
  return 'dinner';
}

/**
 * 計算類別的最終權重
 */
function calculateCategoryWeight(categoryId, temperature, weather, mealType) {
  const tempZone = getTemperatureZone(temperature);
  const weatherCondition = getWeatherCondition(weather);

  // 基礎權重
  let weight = 1.0;

  // 溫度權重
  if (TEMPERATURE_WEIGHTS[categoryId]) {
    weight *= TEMPERATURE_WEIGHTS[categoryId][tempZone] || 1.0;
  }

  // 天氣權重
  if (WEATHER_WEIGHTS[categoryId]) {
    weight *= WEATHER_WEIGHTS[categoryId][weatherCondition] || 1.0;
  }

  // 餐別權重
  if (MEAL_TYPE_WEIGHTS[mealType] && MEAL_TYPE_WEIGHTS[mealType][categoryId]) {
    weight *= MEAL_TYPE_WEIGHTS[mealType][categoryId];
  }

  // 加入隨機因子 (0.85 - 1.15)
  const randomFactor = 0.85 + Math.random() * 0.3;
  weight *= randomFactor;

  return weight;
}

/**
 * 取得所有類別的加權分數
 */
function getAllCategoryWeights(categories, temperature, weather, mealType) {
  const weights = {};

  for (const [categoryId, category] of Object.entries(categories)) {
    // 檢查該類別是否適合這個餐別
    if (!category.mealTypes.includes(mealType)) {
      weights[categoryId] = 0;
      continue;
    }

    weights[categoryId] = calculateCategoryWeight(categoryId, temperature, weather, mealType);
  }

  return weights;
}

/**
 * 根據權重隨機選擇一個類別
 */
function selectCategoryByWeight(weights) {
  // 過濾掉權重為 0 的類別
  const validCategories = Object.entries(weights).filter(([_, w]) => w > 0);

  if (validCategories.length === 0) return null;

  // 計算總權重
  const totalWeight = validCategories.reduce((sum, [_, w]) => sum + w, 0);

  // 隨機選擇
  let random = Math.random() * totalWeight;

  for (const [categoryId, weight] of validCategories) {
    random -= weight;
    if (random <= 0) {
      return categoryId;
    }
  }

  // 保底返回最後一個
  return validCategories[validCategories.length - 1][0];
}

/**
 * 從類別中隨機選擇一個餐點
 */
function selectFoodFromCategory(categoryId, foodItems) {
  const categoryFoods = Object.entries(foodItems)
    .filter(([_, food]) => food.category === categoryId);

  if (categoryFoods.length === 0) return null;

  // 根據 baseWeight 加權隨機選擇
  const totalWeight = categoryFoods.reduce((sum, [_, food]) => sum + food.baseWeight, 0);
  let random = Math.random() * totalWeight;

  for (const [foodId, food] of categoryFoods) {
    random -= food.baseWeight;
    if (random <= 0) {
      return { id: foodId, ...food };
    }
  }

  // 保底
  const last = categoryFoods[categoryFoods.length - 1];
  return { id: last[0], ...last[1] };
}

/**
 * 選擇推薦飲品
 */
function selectDrink(temperature, weather, foodItems) {
  const tempZone = getTemperatureZone(temperature);
  const weatherCondition = getWeatherCondition(weather);

  // 決定推薦冷飲還是熱飲
  let preferCold = false;

  if (['HOT', 'SCORCHING'].includes(tempZone) && ['SUNNY', 'CLOUDY'].includes(weatherCondition)) {
    preferCold = true;
  } else if (['FREEZING', 'COLD'].includes(tempZone) || ['RAINY', 'STORMY'].includes(weatherCondition)) {
    preferCold = false;
  } else {
    // 溫和天氣，隨機
    preferCold = Math.random() > 0.5;
  }

  const drinkCategory = preferCold ? 'COLD_DRINK' : 'HOT_DRINK';
  return selectFoodFromCategory(drinkCategory, foodItems);
}

module.exports = {
  TEMPERATURE_WEIGHTS,
  WEATHER_WEIGHTS,
  MEAL_TYPE_WEIGHTS,
  DRINK_CATEGORIES,
  getTemperatureZone,
  getWeatherCondition,
  getMealType,
  calculateCategoryWeight,
  getAllCategoryWeights,
  selectCategoryByWeight,
  selectFoodFromCategory,
  selectDrink
};
