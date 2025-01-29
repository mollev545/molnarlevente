const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/dbConfig');
const dotnev=require('dotenv').config();


const authRoutes = require('./routes/auth'); // Új import

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Alkalmazd az auth útvonalakat
app.use('/api/auth', authRoutes);

// Teszt endpoint
app.get('/', (req, res) => {
  res.send('PlanUp backend fut!');
});

// Szerver indítása
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
