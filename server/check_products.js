const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database', 'prism.sqlite');
const db = new sqlite3.Database(dbPath);

db.all('SELECT COUNT(*) as count FROM products', [], (err, rows) => {
  if (err) {
    console.error('Error counting products:', err);
  } else {
    console.log('Product count:', rows[0].count);
  }

  db.all('SELECT DISTINCT category FROM products', [], (err, rows) => {
    if (err) {
      console.error('Error fetching categories:', err);
    } else {
      console.log('Categories in DB:', rows);
    }

    db.all('SELECT name, category FROM products LIMIT 5', [], (err, rows) => {
      if (err) {
        console.error('Error fetching sample products:', err);
      } else {
        console.log('Sample products:', rows);
      }
      db.close();
    });
  });
});
