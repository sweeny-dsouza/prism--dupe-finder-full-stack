const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, 'database', 'prism.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Products API
app.get('/api/products', (req, res) => {
  const { category, concern, search } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  let params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (concern) {
    query += ' AND concerns LIKE ?';
    params.push(`%${concern}%`);
  }
  if (search) {
    query += ' AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Parse JSON fields
    const products = rows.map(row => ({
      ...row,
      ingredients: JSON.parse(row.ingredients || '[]'),
      benefits: JSON.parse(row.benefits || '[]'),
      concerns: JSON.parse(row.concerns || '[]'),
      tags: JSON.parse(row.tags || '[]'),
      keyIngredients: JSON.parse(row.keyIngredients || '[]'),
      hairType: JSON.parse(row.hairType || '[]')
    }));
    res.json(products);
  });
});

app.get('/api/products/:id', (req, res) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = {
      ...row,
      ingredients: JSON.parse(row.ingredients || '[]'),
      benefits: JSON.parse(row.benefits || '[]'),
      concerns: JSON.parse(row.concerns || '[]'),
      tags: JSON.parse(row.tags || '[]'),
      keyIngredients: JSON.parse(row.keyIngredients || '[]'),
      hairType: JSON.parse(row.hairType || '[]')
    };
    res.json(product);
  });
});

// Ingredients API
app.get('/api/ingredients', (req, res) => {
  db.all('SELECT * FROM ingredients', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const ingredients = rows.map(row => ({
      ...row,
      benefits: JSON.parse(row.benefits || '[]'),
      concerns: JSON.parse(row.concerns || '[]'),
      suitableFor: JSON.parse(row.suitableFor || '[]'),
      avoidIf: JSON.parse(row.avoidIf || '[]'),
      commonIn: JSON.parse(row.commonIn || '[]')
    }));
    res.json(ingredients);
  });
});

// Concerns API
app.get('/api/concerns', (req, res) => {
  const type = req.query.type; // 'skin' or 'hair'
  let query = 'SELECT * FROM concerns';
  if (type) query += ' WHERE type = ?';
  
  db.all(query, type ? [type] : [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const concerns = rows.map(row => ({
      ...row,
      recommendedIngredients: JSON.parse(row.recommendedIngredients || '[]'),
      avoidIngredients: JSON.parse(row.avoidIngredients || '[]'),
      recommendedProductIds: JSON.parse(row.recommendedProductIds || '[]')
    }));
    res.json(concerns);
  });
});

// Orders API
app.post('/api/orders', (req, res) => {
  const { items, total, customerDetails } = req.body;
  const orderId = `ORD-${Date.now()}`;
  const status = 'Order Placed';
  const date = new Date().toISOString();

  const query = `
    INSERT INTO orders (id, items, total, date, status, customer_name, customer_email, customer_address, customer_city, customer_zip, customer_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    orderId,
    JSON.stringify(items),
    total,
    date,
    status,
    customerDetails.fullName,
    customerDetails.email,
    customerDetails.address,
    customerDetails.city,
    customerDetails.postalCode,
    customerDetails.phone
  ];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: orderId, status, date });
  });
});

app.get('/api/orders/:id', (req, res) => {
  db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Order not found' });
    
    res.json({
      ...row,
      items: JSON.parse(row.items || '[]'),
      customerDetails: {
        fullName: row.customer_name,
        email: row.customer_email,
        address: row.customer_address,
        city: row.customer_city,
        postalCode: row.customer_zip,
        phone: row.customer_phone
      }
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
