require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('cake backery backend is running');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});