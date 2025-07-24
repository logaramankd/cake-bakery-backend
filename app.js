require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes.js')
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
    res.send('cake backery backend is running');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});