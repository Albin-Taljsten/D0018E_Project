const mysql = require('mysql2/promise');
require('dotenv').config();

// ===== DATABASE CONFIG =====
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// ===== BRAND LISTS =====
const helmetBrands = ['Salomon', 'Atomic', 'Rossignol', 'Giro', 'POC'];
const skiBrands = ['Atomic', 'Rossignol', 'Salomon', 'Head', 'Nordica'];
const snowboardBrands = ['Burton', 'Salomon', 'Nitro', 'Rossignol', 'DC'];
const gloveBrands = ['Hestra', 'Dakine', 'Reusch', 'Salomon', 'Black Diamond'];
const skiBootBrands = ['Salomon', 'Atomic', 'Nordica', 'Head', 'Rossignol'];
const snowboardBootBrands = ['Burton', 'Salomon', 'Nitro', 'ThirtyTwo', 'DC'];

// ===== UTIL FUNCTIONS =====
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function randomStock() {
  return Math.floor(Math.random() * 50) + 5;
}

// ===== PRODUCT GENERATORS =====
function generateHelmet(i) {
  const brand = randomItem(helmetBrands);
  return [
    `${brand} Alpine Pro Helmet ${i}`,
    'Lightweight ski helmet with adjustable ventilation and impact protection.',
    randomPrice(99, 249),
    randomStock(),
    'Helmet',
    `images/helmets/helmet_${(i % 6) + 1}.jpg`
  ];
}

function generateSkis(i) {
  const brand = randomItem(skiBrands);
  const length = 150 + Math.floor(Math.random() * 40);
  return [
    `${brand} All-Mountain Skis ${length}cm`,
    'Versatile all-mountain skis designed for stability and control.',
    randomPrice(399, 799),
    randomStock(),
    'Skis',
    `images/skis/ski_${(i % 5) + 1}.jpg`
  ];
}

function generateSnowboard(i) {
  const brand = randomItem(snowboardBrands);
  const length = 150 + Math.floor(Math.random() * 15);
  return [
    `${brand} Freestyle Snowboard ${length}cm`,
    'Responsive snowboard built for park and powder riding.',
    randomPrice(349, 699),
    randomStock(),
    'Snowboard',
    `images/snowboards/snowboard_${(i % 6) + 1}.jpg`
  ];
}

function generateGloves(i) {
  const brand = randomItem(gloveBrands);
  return [
    `${brand} Winter Pro Ski Gloves ${i}`,
    'Waterproof insulated ski gloves for cold alpine conditions.',
    randomPrice(49, 149),
    randomStock(),
    'Ski Gloves',
    `images/gloves/gloves_${(i % 6) + 1}.jpg`
  ];
}

function generateSkiBoots(i) {
  const brand = randomItem(skiBootBrands);
  const flex = 80 + Math.floor(Math.random() * 50);
  return [
    `${brand} Performance Ski Boots Flex ${flex}`,
    'High-performance ski boots offering comfort and precision.',
    randomPrice(299, 599),
    randomStock(),
    'Ski Boots',
    `images/ski_boots/ski_boot_${(i % 6) + 1}.jpg`
  ];
}

function generateSnowboardBoots(i) {
  const brand = randomItem(snowboardBootBrands);
  return [
    `${brand} All-Mountain Snowboard Boots ${i}`,
    'Supportive snowboard boots with modern lacing system.',
    randomPrice(199, 399),
    randomStock(),
    'Snowboard Boots',
    `images/snowboard_boots/snow_boot_${(i % 6) + 1}.jpg`
  ];
}

// ===== MAIN SEED FUNCTION =====
async function seed() {
  const connection = await pool.getConnection();

  try {
    console.log('Seeding products...');

    const products = [];

    for (let i = 1; i <= 50; i++) {
      products.push(generateHelmet(i));
      products.push(generateSkis(i));
      products.push(generateSnowboard(i));
      products.push(generateGloves(i));
      products.push(generateSkiBoots(i));
      products.push(generateSnowboardBoots(i));
    }

    const sql = `
      INSERT INTO products
      (name, description, price, stock, type, image)
      VALUES ?
    `;

    await connection.query(sql, [products]);

    console.log('✅ 300 products inserted successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    connection.release();
    process.exit();
  }
}

seed();