const express = require('express');
const productRoutes = require('./routes/product.routes');
const connectDB = require('./config/db');

const app = express();
connectDB();   

app.use(express.json());

// ربط الـ Routes
app.use('/products', productRoutes);

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});
