const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/dbConfig");
const router = express.Router();

// Bejelentkezés
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Minden mezőt ki kell tölteni!" });
  }

  try {
    // Lekérdezzük a felhasználót az adatbázisból
    const [rows] = await db.query("SELECT * FROM Users WHERE Email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "A felhasználó nem található." });
    }

    const user = rows[0]; // Az első találat a felhasználó

    // Ellenőrizzük a jelszót
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Helytelen jelszó!" });
    }

    // Generáljuk a JWT-t
    const token = jwt.sign({ userId: user.UserID }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sikeres bejelentkezés!", token });
  } catch (error) {
    console.error("Hiba a bejelentkezés során:", error);
    res.status(500).json({ message: "Hiba történt a bejelentkezés során." });
  }
});

module.exports = router;
