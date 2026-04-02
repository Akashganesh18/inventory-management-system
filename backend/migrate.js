require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const migrateData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for Migration');

    // Read the offline products
    const rawData = fs.readFileSync(path.join(__dirname, 'data', 'products.json'));
    const products = JSON.parse(rawData);

    if (products.length === 0) {
      console.log('No data to migrate in products.json');
      process.exit();
    }

    // Since _id from the JSON is just a string (timestamp), mongoose will generate a new valid _id
    // But we extract other properties to inject into MongoDB
    const mappedProducts = products.map((p) => ({
      name: p.name,
      category: p.category,
      price: p.price,
      quantity: p.quantity,
      minStock: p.minStock,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date()
    }));

    await Product.insertMany(mappedProducts);
    console.log(`✅ Successfully migrated ${mappedProducts.length} items to your new local MongoDB!`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateData();
