import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/rooms">Rooms</Link>
        </nav>
    );
}

export default Navbar;
