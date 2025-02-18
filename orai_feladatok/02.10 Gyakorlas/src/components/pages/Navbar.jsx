import React from 'react'
import { useState } from 'react'
import { Link,Navlink } from 'react'

import'./Navbar.css'

export const Navbar = () =>{
const [menuOPen,setMenuOPen]=useState(false)
return(
<nav>
<Link to="/" className="title"> Címoldal</Link>
<div className='menu' onClick={()  =>
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
        <Navlink to="/about">Rólunk</Navlink>
    </li>
    <li>
    <Navlink to="/services">Szolgáltatások</Navlink>
    </li>
    <li>
    <Navlink to="/contact">Kapcsolat</Navlink>
    </li>
    <li>
    <Navlink to="/https://www.hengersor.hu">Hengersor</Navlink>
    </li>

</ul>

</nav>
);
}