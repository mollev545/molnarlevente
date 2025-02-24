// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security

const app = express();
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost", // Database host
    port: "3307",      //Database port
    user: "root",      // Database username
    password: "", // Database password
    database: "fogado" // Name of the database
});

app.get('/', (req, res) => {
    return res.json("From backend side");
});

app.get('/szobak', (req, res) => {
    const sql = "select * from szobak"; 
    db.query(sql, (err, data) => { 
        if (err) return res.json(err); 
        return res.json(data); 
    })
});

app.listen(6666, () => {
    console.log("Fut a backend  https://localhost:6666 ✅");
});
