/**
 * 看天吃飯 - 餐點資料庫
 * 包含 24 種類別、100+ 餐點品項
 */

// ===== 餐點類別定義 =====
const FOOD_CATEGORIES = {
  // 主食類
  HOT_SOUP: {
    id: 'HOT_SOUP',
    name: '熱湯類',
    icon: '🍲',
    description: '暖胃熱湯',
    mealTypes: ['lunch', 'dinner']
  },
  HOT_POT: {
    id: 'HOT_POT',
    name: '火鍋類',
    icon: '🫕',
    description: '各式鍋物',
    mealTypes: ['lunch', 'dinner']
  },
  NOODLES_HOT: {
    id: 'NOODLES_HOT',
    name: '熱麵類',
    icon: '🍜',
    description: '熱騰騰的麵食',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  NOODLES_COLD: {
    id: 'NOODLES_COLD',
    name: '涼麵類',
    icon: '🥢',
    description: '清涼爽口麵食',
    mealTypes: ['lunch', 'dinner']
  },
  RICE_HOT: {
    id: 'RICE_HOT',
    name: '熱飯類',
    icon: '🍚',
    description: '熱騰騰的飯食',
    mealTypes: ['lunch', 'dinner']
  },
  RICE_COLD: {
    id: 'RICE_COLD',
    name: '冷飯類',
    icon: '🍙',
    description: '飯糰、壽司等',
    mealTypes: ['breakfast', 'lunch']
  },
  CONGEE: {
    id: 'CONGEE',
    name: '粥品類',
    icon: '🥣',
    description: '清粥小菜',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  FRIED: {
    id: 'FRIED',
    name: '炸物類',
    icon: '🍗',
    description: '香酥炸物',
    mealTypes: ['lunch', 'dinner']
  },
  STIR_FRY: {
    id: 'STIR_FRY',
    name: '熱炒類',
    icon: '🥘',
    description: '快炒料理',
    mealTypes: ['lunch', 'dinner']
  },
  BBQ_GRILL: {
    id: 'BBQ_GRILL',
    name: '燒烤類',
    icon: '🍖',
    description: '燒肉烤物',
    mealTypes: ['lunch', 'dinner']
  },

  // 輕食類
  SALAD: {
    id: 'SALAD',
    name: '沙拉類',
    icon: '🥗',
    description: '清爽沙拉',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  SANDWICH: {
    id: 'SANDWICH',
    name: '三明治類',
    icon: '🥪',
    description: '各式三明治',
    mealTypes: ['breakfast', 'lunch']
  },
  BREAD: {
    id: 'BREAD',
    name: '麵包類',
    icon: '🥐',
    description: '烘焙麵包',
    mealTypes: ['breakfast']
  },
  DIMSUM: {
    id: 'DIMSUM',
    name: '點心類',
    icon: '🥟',
    description: '中式點心',
    mealTypes: ['breakfast', 'lunch']
  },

  // 湯品飲品類
  SWEET_SOUP: {
    id: 'SWEET_SOUP',
    name: '甜湯類',
    icon: '🍨',
    description: '甜品湯品',
    mealTypes: ['lunch', 'dinner']
  },
  ICE_DESSERT: {
    id: 'ICE_DESSERT',
    name: '冰品類',
    icon: '🍧',
    description: '消暑冰品',
    mealTypes: ['lunch', 'dinner']
  },
  COLD_DRINK: {
    id: 'COLD_DRINK',
    name: '冷飲類',
    icon: '🧋',
    description: '冰涼飲品',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  HOT_DRINK: {
    id: 'HOT_DRINK',
    name: '熱飲類',
    icon: '☕',
    description: '溫暖飲品',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },

  // 特色料理類
  TAIWANESE: {
    id: 'TAIWANESE',
    name: '台式小吃',
    icon: '🧆',
    description: '傳統台灣味',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  JAPANESE: {
    id: 'JAPANESE',
    name: '日式料理',
    icon: '🍱',
    description: '日本料理',
    mealTypes: ['lunch', 'dinner']
  },
  WESTERN: {
    id: 'WESTERN',
    name: '西式料理',
    icon: '🍝',
    description: '西餐料理',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  },
  KOREAN: {
    id: 'KOREAN',
    name: '韓式料理',
    icon: '🍲',
    description: '韓國料理',
    mealTypes: ['lunch', 'dinner']
  },
  SEAFOOD: {
    id: 'SEAFOOD',
    name: '海鮮類',
    icon: '🦐',
    description: '新鮮海產',
    mealTypes: ['lunch', 'dinner']
  },
  VEGETARIAN: {
    id: 'VEGETARIAN',
    name: '素食類',
    icon: '🥬',
    description: '蔬食料理',
    mealTypes: ['breakfast', 'lunch', 'dinner']
  }
};

// ===== 餐點品項資料庫 (100+) =====
const FOOD_ITEMS = {
  // ===== HOT_SOUP 熱湯類 =====
  beef_noodle_soup: { name: '牛肉麵', category: 'HOT_SOUP', baseWeight: 80 },
  pork_rib_soup: { name: '排骨酥湯', category: 'HOT_SOUP', baseWeight: 70 },
  fish_soup: { name: '鮮魚湯', category: 'HOT_SOUP', baseWeight: 65 },
  clam_soup: { name: '蛤蜊湯', category: 'HOT_SOUP', baseWeight: 60 },
  four_herb_soup: { name: '四神湯', category: 'HOT_SOUP', baseWeight: 65 },
  pig_blood_soup: { name: '豬血湯', category: 'HOT_SOUP', baseWeight: 55 },
  wonton_soup: { name: '餛飩湯', category: 'HOT_SOUP', baseWeight: 70 },
  miso_soup: { name: '味噌湯', category: 'HOT_SOUP', baseWeight: 60 },
  corn_soup: { name: '玉米濃湯', category: 'HOT_SOUP', baseWeight: 65 },

  // ===== HOT_POT 火鍋類 =====
  spicy_hot_pot: { name: '麻辣鍋', category: 'HOT_POT', baseWeight: 85 },
  shabu_shabu: { name: '涮涮鍋', category: 'HOT_POT', baseWeight: 80 },
  kimchi_pot: { name: '泡菜鍋', category: 'HOT_POT', baseWeight: 75 },
  lamb_stew: { name: '羊肉爐', category: 'HOT_POT', baseWeight: 70 },
  ginger_duck: { name: '薑母鴨', category: 'HOT_POT', baseWeight: 70 },
  shantou_pot: { name: '汕頭火鍋', category: 'HOT_POT', baseWeight: 65 },
  sauerkraut_fish: { name: '酸菜魚', category: 'HOT_POT', baseWeight: 70 },
  sukiyaki: { name: '壽喜燒', category: 'HOT_POT', baseWeight: 75 },
  mala_tang: { name: '麻辣燙', category: 'HOT_POT', baseWeight: 70 },

  // ===== NOODLES_HOT 熱麵類 =====
  dan_dan_noodles: { name: '擔擔麵', category: 'NOODLES_HOT', baseWeight: 70 },
  zhajiang_noodles: { name: '炸醬麵', category: 'NOODLES_HOT', baseWeight: 75 },
  sesame_oil_noodles: { name: '麻油麵線', category: 'NOODLES_HOT', baseWeight: 70 },
  oyster_vermicelli: { name: '蚵仔麵線', category: 'NOODLES_HOT', baseWeight: 75 },
  braised_pork_noodle: { name: '肉燥麵', category: 'NOODLES_HOT', baseWeight: 80 },
  ramen: { name: '日式拉麵', category: 'NOODLES_HOT', baseWeight: 80 },
  udon: { name: '烏龍麵', category: 'NOODLES_HOT', baseWeight: 70 },
  knife_cut_noodles: { name: '刀削麵', category: 'NOODLES_HOT', baseWeight: 65 },
  instant_pot_noodles: { name: '鍋燒意麵', category: 'NOODLES_HOT', baseWeight: 70 },
  beef_tendon_noodle: { name: '牛筋麵', category: 'NOODLES_HOT', baseWeight: 75 },

  // ===== NOODLES_COLD 涼麵類 =====
  sesame_cold_noodles: { name: '麻醬涼麵', category: 'NOODLES_COLD', baseWeight: 80 },
  soba_cold: { name: '冷蕎麥麵', category: 'NOODLES_COLD', baseWeight: 75 },
  thai_cold_noodles: { name: '泰式涼麵', category: 'NOODLES_COLD', baseWeight: 65 },
  konjac_noodles: { name: '蒟蒻涼麵', category: 'NOODLES_COLD', baseWeight: 60 },
  japanese_cold_udon: { name: '日式冷烏龍', category: 'NOODLES_COLD', baseWeight: 70 },

  // ===== RICE_HOT 熱飯類 =====
  braised_pork_rice: { name: '滷肉飯', category: 'RICE_HOT', baseWeight: 90 },
  chicken_rice: { name: '雞肉飯', category: 'RICE_HOT', baseWeight: 85 },
  pork_chop_rice: { name: '排骨飯', category: 'RICE_HOT', baseWeight: 80 },
  curry_rice: { name: '咖哩飯', category: 'RICE_HOT', baseWeight: 80 },
  fried_rice: { name: '炒飯', category: 'RICE_HOT', baseWeight: 75 },
  beef_rice_bowl: { name: '牛丼', category: 'RICE_HOT', baseWeight: 75 },
  bento: { name: '便當', category: 'RICE_HOT', baseWeight: 85 },
  claypot_rice: { name: '煲仔飯', category: 'RICE_HOT', baseWeight: 70 },
  bibimbap: { name: '石鍋拌飯', category: 'RICE_HOT', baseWeight: 75 },
  omurice: { name: '蛋包飯', category: 'RICE_HOT', baseWeight: 75 },

  // ===== RICE_COLD 冷飯類 =====
  onigiri: { name: '飯糰', category: 'RICE_COLD', baseWeight: 75 },
  sushi: { name: '壽司', category: 'RICE_COLD', baseWeight: 70 },
  sushi_roll: { name: '手捲', category: 'RICE_COLD', baseWeight: 65 },
  taiwanese_rice_ball: { name: '台式飯糰', category: 'RICE_COLD', baseWeight: 80 },

  // ===== CONGEE 粥品類 =====
  plain_congee: { name: '清粥小菜', category: 'CONGEE', baseWeight: 70 },
  preserved_egg_congee: { name: '皮蛋瘦肉粥', category: 'CONGEE', baseWeight: 80 },
  seafood_congee: { name: '海鮮粥', category: 'CONGEE', baseWeight: 75 },
  sweet_potato_congee: { name: '地瓜粥', category: 'CONGEE', baseWeight: 70 },
  mushroom_chicken_congee: { name: '香菇雞粥', category: 'CONGEE', baseWeight: 75 },
  pumpkin_congee: { name: '南瓜粥', category: 'CONGEE', baseWeight: 65 },

  // ===== FRIED 炸物類 =====
  fried_chicken: { name: '炸雞', category: 'FRIED', baseWeight: 80 },
  chicken_cutlet: { name: '雞排', category: 'FRIED', baseWeight: 85 },
  tempura: { name: '天婦羅', category: 'FRIED', baseWeight: 65 },
  salt_pepper_chicken: { name: '鹽酥雞', category: 'FRIED', baseWeight: 80 },
  tonkatsu: { name: '豬排', category: 'FRIED', baseWeight: 75 },
  fried_tofu: { name: '炸豆腐', category: 'FRIED', baseWeight: 60 },
  fried_squid: { name: '炸花枝', category: 'FRIED', baseWeight: 70 },

  // ===== STIR_FRY 熱炒類 =====
  three_cup_chicken: { name: '三杯雞', category: 'STIR_FRY', baseWeight: 80 },
  kung_pao_chicken: { name: '宮保雞丁', category: 'STIR_FRY', baseWeight: 75 },
  sweet_sour_pork: { name: '糖醋排骨', category: 'STIR_FRY', baseWeight: 70 },
  stir_fry_clams: { name: '炒蛤蜊', category: 'STIR_FRY', baseWeight: 70 },
  mapo_tofu: { name: '麻婆豆腐', category: 'STIR_FRY', baseWeight: 75 },
  stir_fry_vegetables: { name: '炒青菜', category: 'STIR_FRY', baseWeight: 65 },
  mongolian_beef: { name: '蒙古牛肉', category: 'STIR_FRY', baseWeight: 70 },

  // ===== BBQ_GRILL 燒烤類 =====
  yakiniku: { name: '燒肉', category: 'BBQ_GRILL', baseWeight: 80 },
  korean_bbq: { name: '韓式烤肉', category: 'BBQ_GRILL', baseWeight: 80 },
  yakitori: { name: '串燒', category: 'BBQ_GRILL', baseWeight: 65 },
  grilled_fish: { name: '烤魚', category: 'BBQ_GRILL', baseWeight: 70 },
  grilled_corn: { name: '烤玉米', category: 'BBQ_GRILL', baseWeight: 55 },

  // ===== SALAD 沙拉類 =====
  caesar_salad: { name: '凱薩沙拉', category: 'SALAD', baseWeight: 70 },
  poke_bowl: { name: '波奇碗', category: 'SALAD', baseWeight: 75 },
  cold_dishes: { name: '涼拌小菜', category: 'SALAD', baseWeight: 65 },
  salt_water_chicken: { name: '鹽水雞', category: 'SALAD', baseWeight: 75 },
  cold_tofu: { name: '涼拌豆腐', category: 'SALAD', baseWeight: 60 },
  fruit_salad: { name: '水果沙拉', category: 'SALAD', baseWeight: 65 },

  // ===== SANDWICH 三明治類 =====
  egg_pancake: { name: '蛋餅', category: 'SANDWICH', baseWeight: 85 },
  toast_sandwich: { name: '吐司三明治', category: 'SANDWICH', baseWeight: 75 },
  burger: { name: '漢堡', category: 'SANDWICH', baseWeight: 80 },
  wrap: { name: '捲餅', category: 'SANDWICH', baseWeight: 65 },
  taiwanese_burger: { name: '刈包', category: 'SANDWICH', baseWeight: 70 },
  club_sandwich: { name: '總匯三明治', category: 'SANDWICH', baseWeight: 75 },

  // ===== BREAD 麵包類 =====
  croissant: { name: '可頌', category: 'BREAD', baseWeight: 70 },
  taiwanese_bread: { name: '台式麵包', category: 'BREAD', baseWeight: 75 },
  bagel: { name: '貝果', category: 'BREAD', baseWeight: 65 },
  scallion_pancake: { name: '蔥油餅', category: 'BREAD', baseWeight: 75 },
  dan_bing: { name: '蛋餅', category: 'BREAD', baseWeight: 80 },
  shaobing: { name: '燒餅', category: 'BREAD', baseWeight: 70 },

  // ===== DIMSUM 點心類 =====
  xiaolongbao: { name: '小籠包', category: 'DIMSUM', baseWeight: 85 },
  steamed_bun: { name: '包子', category: 'DIMSUM', baseWeight: 75 },
  dumpling: { name: '水餃', category: 'DIMSUM', baseWeight: 80 },
  pot_sticker: { name: '鍋貼', category: 'DIMSUM', baseWeight: 75 },
  shumai: { name: '燒賣', category: 'DIMSUM', baseWeight: 65 },
  turnip_cake: { name: '蘿蔔糕', category: 'DIMSUM', baseWeight: 70 },
  spring_roll: { name: '春捲', category: 'DIMSUM', baseWeight: 65 },
  zongzi: { name: '肉粽', category: 'DIMSUM', baseWeight: 70 },

  // ===== SWEET_SOUP 甜湯類 =====
  red_bean_soup: { name: '紅豆湯', category: 'SWEET_SOUP', baseWeight: 75 },
  mung_bean_soup: { name: '綠豆湯', category: 'SWEET_SOUP', baseWeight: 75 },
  taro_ball_soup: { name: '芋圓甜湯', category: 'SWEET_SOUP', baseWeight: 70 },
  tofu_pudding: { name: '豆花', category: 'SWEET_SOUP', baseWeight: 80 },
  peanut_soup: { name: '花生湯', category: 'SWEET_SOUP', baseWeight: 65 },
  tangyuan: { name: '湯圓', category: 'SWEET_SOUP', baseWeight: 70 },

  // ===== ICE_DESSERT 冰品類 =====
  shaved_ice: { name: '剉冰', category: 'ICE_DESSERT', baseWeight: 85 },
  mango_ice: { name: '芒果冰', category: 'ICE_DESSERT', baseWeight: 80 },
  grass_jelly: { name: '仙草冰', category: 'ICE_DESSERT', baseWeight: 75 },
  aiyu_jelly: { name: '愛玉冰', category: 'ICE_DESSERT', baseWeight: 75 },
  ice_cream: { name: '冰淇淋', category: 'ICE_DESSERT', baseWeight: 70 },
  snow_ice: { name: '雪花冰', category: 'ICE_DESSERT', baseWeight: 75 },

  // ===== COLD_DRINK 冷飲類 =====
  bubble_tea: { name: '珍珠奶茶', category: 'COLD_DRINK', baseWeight: 90 },
  fruit_tea: { name: '水果茶', category: 'COLD_DRINK', baseWeight: 75 },
  lemon_tea: { name: '檸檬紅茶', category: 'COLD_DRINK', baseWeight: 70 },
  winter_melon_tea: { name: '冬瓜茶', category: 'COLD_DRINK', baseWeight: 70 },
  fresh_juice: { name: '鮮榨果汁', category: 'COLD_DRINK', baseWeight: 65 },
  smoothie: { name: '冰沙', category: 'COLD_DRINK', baseWeight: 70 },
  yakult_green_tea: { name: '多多綠茶', category: 'COLD_DRINK', baseWeight: 75 },

  // ===== HOT_DRINK 熱飲類 =====
  coffee: { name: '咖啡', category: 'HOT_DRINK', baseWeight: 80 },
  hot_milk_tea: { name: '熱奶茶', category: 'HOT_DRINK', baseWeight: 75 },
  soy_milk: { name: '豆漿', category: 'HOT_DRINK', baseWeight: 80 },
  rice_milk: { name: '米漿', category: 'HOT_DRINK', baseWeight: 70 },
  ginger_tea: { name: '薑茶', category: 'HOT_DRINK', baseWeight: 65 },
  hot_chocolate: { name: '熱可可', category: 'HOT_DRINK', baseWeight: 65 },
  hot_latte: { name: '熱拿鐵', category: 'HOT_DRINK', baseWeight: 75 },

  // ===== TAIWANESE 台式小吃 =====
  lu_wei: { name: '滷味', category: 'TAIWANESE', baseWeight: 80 },
  oyster_omelette: { name: '蚵仔煎', category: 'TAIWANESE', baseWeight: 75 },
  stinky_tofu: { name: '臭豆腐', category: 'TAIWANESE', baseWeight: 65 },
  minced_pork_noodle: { name: '切仔麵', category: 'TAIWANESE', baseWeight: 70 },
  ba_wan: { name: '肉圓', category: 'TAIWANESE', baseWeight: 70 },
  pepper_bun: { name: '胡椒餅', category: 'TAIWANESE', baseWeight: 70 },

  // ===== JAPANESE 日式料理 =====
  sashimi: { name: '生魚片', category: 'JAPANESE', baseWeight: 70 },
  donburi: { name: '丼飯', category: 'JAPANESE', baseWeight: 80 },
  teishoku: { name: '定食', category: 'JAPANESE', baseWeight: 75 },
  katsu_curry: { name: '豬排咖哩', category: 'JAPANESE', baseWeight: 80 },
  takoyaki: { name: '章魚燒', category: 'JAPANESE', baseWeight: 65 },

  // ===== WESTERN 西式料理 =====
  pasta: { name: '義大利麵', category: 'WESTERN', baseWeight: 80 },
  steak: { name: '牛排', category: 'WESTERN', baseWeight: 75 },
  pizza: { name: '披薩', category: 'WESTERN', baseWeight: 75 },
  brunch: { name: '早午餐', category: 'WESTERN', baseWeight: 80 },
  risotto: { name: '燉飯', category: 'WESTERN', baseWeight: 70 },

  // ===== KOREAN 韓式料理 =====
  korean_fried_chicken: { name: '韓式炸雞', category: 'KOREAN', baseWeight: 80 },
  tteokbokki: { name: '辣炒年糕', category: 'KOREAN', baseWeight: 70 },
  japchae: { name: '雜菜', category: 'KOREAN', baseWeight: 65 },
  samgyeopsal: { name: '韓式五花肉', category: 'KOREAN', baseWeight: 75 },
  sundubu_jjigae: { name: '豆腐鍋', category: 'KOREAN', baseWeight: 75 },
  kimbap: { name: '韓式飯捲', category: 'KOREAN', baseWeight: 70 },

  // ===== SEAFOOD 海鮮類 =====
  grilled_squid: { name: '烤魷魚', category: 'SEAFOOD', baseWeight: 65 },
  steamed_fish: { name: '清蒸魚', category: 'SEAFOOD', baseWeight: 70 },
  seafood_fried_rice: { name: '海鮮炒飯', category: 'SEAFOOD', baseWeight: 75 },
  shrimp_dishes: { name: '蝦料理', category: 'SEAFOOD', baseWeight: 70 },
  crab_dishes: { name: '螃蟹料理', category: 'SEAFOOD', baseWeight: 65 },

  // ===== VEGETARIAN 素食類 =====
  vegetarian_bento: { name: '素食便當', category: 'VEGETARIAN', baseWeight: 70 },
  vegetable_noodles: { name: '素麵', category: 'VEGETARIAN', baseWeight: 65 },
  temple_food: { name: '齋菜', category: 'VEGETARIAN', baseWeight: 60 },
  vegetarian_dumplings: { name: '素水餃', category: 'VEGETARIAN', baseWeight: 65 },
  buddha_bowl: { name: '蔬食碗', category: 'VEGETARIAN', baseWeight: 70 }
};

// ===== 台灣 22 縣市 =====
const TAIWAN_CITIES = [
  { id: 'TPE', name: '臺北市', apiName: '臺北市', region: 'north' },
  { id: 'TPH', name: '新北市', apiName: '新北市', region: 'north' },
  { id: 'KEE', name: '基隆市', apiName: '基隆市', region: 'north' },
  { id: 'TYC', name: '桃園市', apiName: '桃園市', region: 'north' },
  { id: 'HSC', name: '新竹市', apiName: '新竹市', region: 'north' },
  { id: 'HSH', name: '新竹縣', apiName: '新竹縣', region: 'north' },
  { id: 'MAL', name: '苗栗縣', apiName: '苗栗縣', region: 'central' },
  { id: 'TXG', name: '臺中市', apiName: '臺中市', region: 'central' },
  { id: 'CWH', name: '彰化縣', apiName: '彰化縣', region: 'central' },
  { id: 'NTO', name: '南投縣', apiName: '南投縣', region: 'central' },
  { id: 'YLH', name: '雲林縣', apiName: '雲林縣', region: 'central' },
  { id: 'CHY', name: '嘉義市', apiName: '嘉義市', region: 'south' },
  { id: 'CYI', name: '嘉義縣', apiName: '嘉義縣', region: 'south' },
  { id: 'TNN', name: '臺南市', apiName: '臺南市', region: 'south' },
  { id: 'KHH', name: '高雄市', apiName: '高雄市', region: 'south' },
  { id: 'IUH', name: '屏東縣', apiName: '屏東縣', region: 'south' },
  { id: 'TTT', name: '臺東縣', apiName: '臺東縣', region: 'east' },
  { id: 'HWA', name: '花蓮縣', apiName: '花蓮縣', region: 'east' },
  { id: 'ILN', name: '宜蘭縣', apiName: '宜蘭縣', region: 'east' },
  { id: 'PEH', name: '澎湖縣', apiName: '澎湖縣', region: 'island' },
  { id: 'KMN', name: '金門縣', apiName: '金門縣', region: 'island' },
  { id: 'LNN', name: '連江縣', apiName: '連江縣', region: 'island' }
];

module.exports = {
  FOOD_CATEGORIES,
  FOOD_ITEMS,
  TAIWAN_CITIES
};
