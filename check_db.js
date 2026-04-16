const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'server', 'database', 'prism.sqlite');
const db = new sqlite3.Database(dbPath);

db.all('SELECT DISTINCT category FROM products', [], (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Categories:', rows);
  
  db.all('SELECT name, category FROM products LIMIT 10', [], (err, rows) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Sample Products:', rows);
    db.close();
  });
});
