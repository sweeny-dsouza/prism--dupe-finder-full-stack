const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'prism.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Products Table
      db.run(`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        brand TEXT,
        category TEXT,
        subcategory TEXT,
        price REAL,
        currency TEXT,
        originalPrice REAL,
        ingredients TEXT,
        keyIngredients TEXT,
        benefits TEXT,
        concerns TEXT,
        skinType TEXT,
        hairType TEXT,
        bodyRoutineStep TEXT,
        texture TEXT,
        finish TEXT,
        rating REAL,
        reviewCount INTEGER,
        tags TEXT,
        imageUrl TEXT,
        description TEXT,
        isLuxury BOOLEAN,
        budgetLevel TEXT,
        dupeOf TEXT
      )`);

      // Ingredients Table
      db.run(`CREATE TABLE IF NOT EXISTS ingredients (
        id TEXT PRIMARY KEY,
        name TEXT,
        benefits TEXT,
        concerns TEXT,
        suitableFor TEXT,
        avoidIf TEXT,
        scientificSummary TEXT,
        commonIn TEXT
      )`);

      // Concerns Table
      db.run(`CREATE TABLE IF NOT EXISTS concerns (
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        recommendedIngredients TEXT,
        avoidIngredients TEXT,
        type TEXT -- 'skin' or 'hair'
      )`);

      // Orders Table
      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        items TEXT,
        total REAL,
        date TEXT,
        status TEXT,
        customer_name TEXT,
        customer_email TEXT,
        customer_address TEXT,
        customer_city TEXT,
        customer_zip TEXT,
        customer_phone TEXT
      )`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

module.exports = { db, initDb };
