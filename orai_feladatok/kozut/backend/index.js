const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: "3306",
    password: "",
    database: "kozutak",
});

app.get("/", (req, res) => {
    res.send("Fut a backend.");
});

app.get("/regiok", (req, res) => {
    const sql = "SELECT * FROM regiok";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/regiok_8", (req, res) => {
    const sql = "SELECT * FROM regiok WHERE Rid = 8";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.post("/ujregio", (req, res) => {
    const sql = "INSERT INTO `regiok` (`Rid`, `regionev`, `regio_tipusa`) VALUES (?, ?, ?), (?, ?, ?)";
    const values = ['10', 'Budapest', 'Főváros', '11', 'Szeged', 'Város'];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("hiba történt", err);
            return res.status(500).json({ error: "Adatbázis hiba történt" });
        }
        return res.status(200).json({ message: "Sikeres beszúrás!", result });
    });
});

app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM `regiok` WHERE Rid = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
