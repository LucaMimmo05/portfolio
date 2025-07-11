import React from 'react'
import style from "./navbar.module.css";

const Navbar = ({onClick}) => {
  return (
    <nav className={style.Navbar}>
        
        <ul className={style.NavbarList}>
            <li className={style.NavbarItem} onClick={() => onClick("home")}>HOME</li>
            <li className={style.NavbarItem} onClick={() => onClick("about")}>ABOUT</li>
            <li className={style.NavbarItem} onClick={() => onClick("projects")}>PROJECTS</li>
            <li className={style.NavbarItem} onClick={() => onClick("key")}>KEY POINTS</li>
            <li className={style.NavbarItem} onClick={() => onClick("contact")}>CONTACT</li>
        </ul>
    </nav>
  )
}

export default Navbar