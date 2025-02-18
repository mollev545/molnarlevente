import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Programs from './pages/Programs';
import ProgramSwipe from './pages/ProgramSwipe';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import Navbar from './pages/Navbar';
import Settings from './pages/ProfileSettings';
import 'tachyons/css/tachyons.min.css';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
<Route class="link dim black b f6 f5-ns dib mr3" path="/" element={<HomePage />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/login" element={<Login />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/register" element={<Registration />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/programs" element={<Programs />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/rooms" element={<Rooms apiUrl="http://localhost:3001" userId={1} />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/profile" element={<Profile />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/swipe" element={<ProgramSwipe apiUrl="http://localhost:3001" userId={1} />} />
<Route class="link dim black b f6 f5-ns dib mr3" path="/settings" element={<Settings />} />
</Routes>
</Router>
  );
}

export default App;
