import React from "react";
import style from "./navbar.module.css";
import NavbarItem from "../navbaritem/NavbarItem";

const Navbar = ({ onClick }) => {
    return (
        <nav className={style.Navbar}>
            <ul className={style.NavbarList}>
                <NavbarItem onClick={onClick} label={"HOME"} />
                <NavbarItem onClick={onClick} label={"ABOUT"} />
                <NavbarItem onClick={onClick} label={"PROJECTS"} />
                <NavbarItem onClick={onClick} label={"CONTACT"} />
            </ul>
        </nav>
    );
};

export default Navbar;
