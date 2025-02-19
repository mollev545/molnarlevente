const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dbConfig = require('./config/dbConfig');
const programRoutes = require('./routes/programs');
const userRoutes = require('./routes/users');
const roomRoutes = require('./routes/rooms'); // Router importálása
const profileRoutes = require('./routes/profiles');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

let db;

// Útvonalak regisztrálása
app.use('/images', express.static('public/images'));
app.use('/rooms', roomRoutes);
app.use('/profile', profileRoutes);
app.use('/programs', programRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);


app.use(async (req, res, next) => {
  try {
    if (!db) {
      console.log('🔄 Kapcsolódás az adatbázishoz...');
      db = await mysql.createConnection(dbConfig);
      console.log('✅ Sikeres kapcsolat az adatbázishoz!');
    }
    req.db = db;
    next();
  } catch (err) {
    console.error('❌ Hiba az adatbázis csatlakozásnál:', err);
    res.status(500).json({ error: 'Nincs adatbázis kapcsolat.', details: err.message });
  }
});



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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Felhasználónév és jelszó szükséges!' });
  }
  try {
    const [users] = await req.db.execute('SELECT * FROM Users WHERE Email = ?', [email]);
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

// Programok listázása
app.get('/programs', async (req, res) => {
  try {
    const [programs] = await req.db.execute('SELECT ProgramID, Name, Description, Price, IsPaid, DurationType FROM Programs');
    res.status(200).json(programs);
  } catch (error) {
    console.error('Hiba történt a programok lekérdezése során:', error.message);
    res.status(500).json({ error: 'Hiba történt a programok lekérdezése során.' });
  }
});

// Véletlenszerű program lekérése
app.get('/programs/random', async (req, res) => {
  try {
    console.log("🔍 Program kiválasztása az adatbázisból...");
    const [program] = await req.db.execute('SELECT * FROM Programs ORDER BY RAND() LIMIT 1');

    if (program.length === 0) {
      console.warn("⚠️ Nincs elérhető program az adatbázisban!");
      return res.status(404).json({ error: 'Nincs elérhető program az adatbázisban.' });
    }

    program[0].Image = `/images/${program[0].Image}`;
    console.log("✅ Program sikeresen betöltve:", program[0]);
    res.status(200).json(program[0]);

  } catch (error) {
    console.error('❌ Hiba a véletlenszerű program lekérdezése során:', error);
    res.status(500).json({ error: 'Szerverhiba történt.', details: error.message });
  }
});

// Program kedvelése
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

// Program nem kedvelése
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
