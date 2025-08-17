import style from "./BurgerMenu.module.css";
import NavbarItem from "../navbaritem/NavbarItem";
import { useState } from "react";

const BurgerMenu = ({ onClick }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickItem = (label) => {
        setMenuVisible(false);
        if (onClick) onClick(label);
    };

    return (
        <div className={style.BurgerMenu}>
            {!menuVisible && (
                <div onClick={handleClick} className={style.OpenMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 40 32"
                        fill="none"
                    >
                        <path
                            d="M3 28.75H37"
                            stroke="#FEFEFE"
                            strokeWidth="5.33333"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 16H37"
                            stroke="#FEFEFE"
                            strokeWidth="5.33333"
                            strokeLinecap="round"
                        />
                        <path
                            d="M3 3.25H37"
                            stroke="#FEFEFE"
                            strokeWidth="5.33333"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            )}

            <div
                className={`${style.Menu} ${menuVisible ? style.MenuOpen : ""}`}
            >
                <svg
                    onClick={handleClick}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 23 24"
                    fill="none"
                    stroke="#fefefe"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                <ul>
                    <NavbarItem
                        onClick={() => handleClickItem("home")}
                        label={"HOME"}
                    />
                    <NavbarItem
                        onClick={() => handleClickItem("about")}
                        label={"ABOUT"}
                    />
                    <NavbarItem
                        onClick={() => handleClickItem("projects")}
                        label={"PROJECT"}
                    />
                    <NavbarItem
                        onClick={() => handleClickItem("contact")}
                        label={"CONTACT"}
                    />
                </ul>
            </div>
        </div>
    );
};

export default BurgerMenu;
