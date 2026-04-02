require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Mount routes
app.use('/products', require('./routes/productRoutes'));

// Error handling for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`);
});
