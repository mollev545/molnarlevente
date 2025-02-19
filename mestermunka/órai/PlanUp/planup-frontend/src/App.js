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
import  {AuthProvider}  from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/rooms" element={<Rooms apiUrl="http://localhost:3001" userId={1} />} />
          <Route path="/swipe" element={<ProgramSwipe apiUrl="http://localhost:3001" userId={1} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
