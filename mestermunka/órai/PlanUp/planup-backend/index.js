const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dbConfig = require('./config/dbConfig'); // Adatbázis konfiguráció importálása
const programRoutes = require('./routes/programs'); // Program útvonalak
const roomRoutes = require('./routes/rooms'); // Szoba útvonalak

// Az app inicializálása
const app = express();

// Middleware-ek
app.use(express.json());
app.use(cors());

// Adatbázis kapcsolat middleware
let db;
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Adatbázis kapcsolat sikeres!');
    // Hozzáadjuk a db kapcsolatot a req-hez, hogy elérhető legyen az útvonalakban
    app.use((req, res, next) => {
      req.db = db;
      next();
    });
  } catch (err) {
    console.error('Nem sikerült csatlakozni az adatbázishoz:', err.message);
    process.exit(1); // Ha nincs adatbáziskapcsolat, állítsuk le a szervert
  }
})();

// Útvonalak regisztrálása
app.use('/programs', programRoutes); // Program útvonalak
app.use('/rooms', roomRoutes); // Szoba útvonalak

// Regisztráció
app.post('/auth/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const [result] = await req.db.execute(
      'INSERT INTO Users (Username, PasswordHash, Email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );
    res.status(201).json({ message: 'User registered successfully', userID: result.insertId });
  } catch (error) {
    console.error('Regisztrációs hiba:', error.message);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
});

// Bejelentkezés
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Felhasználónév és jelszó szükséges!' });
  }

  try {
    const [users] = await req.db.execute('SELECT * FROM Users WHERE Username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Érvénytelen hitelesítő adatok' });
    }

    const user = users[0];
    const isPasswordValid = bcrypt.compareSync(password, user.PasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Érvénytelen hitelesítő adatok' });
    }

    res.status(200).json({ message: 'Sikeres bejelentkezés', userID: user.UserID });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error.message);
    res.status(500).json({ error: 'Bejelentkezés sikertelen', details: error.message });
  }
});

// Teszt útvonal
app.get('/', (req, res) => {
  res.send('Express.js backend működik!');
});

// Szerver indítása
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});

// Program funkciók
app.get('/programs', async (req, res) => {
  try {
    const [programs] = await req.db.execute('SELECT * FROM Programs');
    res.status(200).json(programs);
  } catch (error) {
    console.error('Hiba történt a programok lekérdezése során:', error.message);
    res.status(500).json({ error: 'Hiba történt a programok lekérdezése során.' });
  }
});

app.get('/programs/random', async (req, res) => {
  try {
    const [program] = await req.db.execute('SELECT * FROM Programs ORDER BY RAND() LIMIT 1');
    res.status(200).json(program[0] || {});
  } catch (error) {
    console.error('Véletlenszerű program hiba:', error.message);
    res.status(500).json({ error: 'Hiba történt egy véletlenszerű program lekérdezése során.' });
  }
});

app.post('/programs/:id/like', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'UserID szükséges!' });
  }

  try {
    await req.db.execute('INSERT INTO SwipeActions (UserID, ProgramID, Action) VALUES (?, ?, "like")', [userId, id]);
    res.status(200).json({ message: 'A program sikeresen kedvelve lett.' });
  } catch (error) {
    console.error('Kedvelési hiba:', error.message);
    res.status(500).json({ error: 'Hiba történt a program kedvelése során.' });
  }
});

app.post('/programs/:id/dislike', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'UserID szükséges!' });
  }

  try {
    await req.db.execute('INSERT INTO SwipeActions (UserID, ProgramID, Action) VALUES (?, ?, "dislike")', [userId, id]);
    res.status(200).json({ message: 'A program sikeresen nem kedvelt.' });
  } catch (error) {
    console.error('Nem kedvelési hiba:', error.message);
    res.status(500).json({ error: 'Hiba történt a program nem kedvelése során.' });
  }
});
