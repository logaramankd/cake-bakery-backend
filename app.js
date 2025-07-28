require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes.js')
const categoriesRoutes = require('./src/routes/categoriesRoutes.js')
const productRoutes = require('./src/routes/productsRoutes.js')
const adminOrderRoutes = require('./src/routes/adminOrderRoutes.js')
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', productRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/addons', require('./src/routes/addonRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes.js'));
app.use('/api/orders', require('./src/routes/orderRoutes.js'));
app.use('/admin', adminOrderRoutes);


app.get('/', (req, res) => {
    res.send('cake backery backend is running');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});