const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: "3307",
    password: "",
    database: "kozutak",
});

db.connect(err => {
    if (err) {
        console.error("Hiba az adatbázis kapcsolat során:", err);
        return;
    }
    console.log("Sikerekes kapcsolódás");
});

app.get("/", (req, res) => {
    res.send("Fut a backend.");
});

app.get("/regiok", (req, res) => {
    const sql = "SELECT * FROM regiok";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Baj van:", err);
            return res.status(500).json(err);
        }
        return res.json(result);
    });
});

app.get("/regiok_8", (req, res) => {
    const sql = "SELECT * FROM regiok WHERE Rid = 8";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Baj van:", err);
            return res.status(500).json(err);
        }
        return res.json(result);
    });
});

app.post("/ujregio", (req, res) => {
    const { Rid, regionev, regio_tipusa } = req.body;
    if (!Rid || !regionev || !regio_tipusa) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    const sql = "INSERT INTO regiok (Rid, regionev, regio_tipusa) VALUES (?, ?, ?)";
    db.query(sql, [Rid, regionev, regio_tipusa], (err, result) => {
        if (err) {
            console.error("Error inserting region:", err);
            return res.status(500).json({ error: "Adatbázis hiba történt" });
        }
        return res.status(201).json({ message: "Sikeres beszúrás!", result });
    });
});
app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM regiok WHERE Rid = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting region:", err);
            return res.status(500).json(err);
        }
        return res.json({ message: "Sikeres törlés!", result });
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
