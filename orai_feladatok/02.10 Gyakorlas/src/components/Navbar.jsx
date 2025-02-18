import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {
    const [menuOPen,setMenuOPen]= useState(false)
     return (
        <nav>
            <Link to="/" className="title">Címoldal</Link>
           <div className="menu" onClick={() =>
             {
                setMenuOPen(!menuOPen);
            }
           }>
             <span></span>
             <span></span>
             <span></span>
           </div>
          <ul className={menuOPen ? "open" : ""}>
                <li> 
                    <NavLink to="/about">Régiók</NavLink>
                </li>
                <li> 
                    <NavLink to="/services">Szolgáltatások</NavLink>
                </li>
                <li> 
                    <NavLink to="/contact">Kapcsolatok</NavLink>
                </li>
                <li>  
                    <NavLink to="http://www.hengersor.hu" target="_blank">Hengersor</NavLink>
                </li>
          </ul>

        </nav>
     );

};