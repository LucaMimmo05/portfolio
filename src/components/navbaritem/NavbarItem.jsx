import style from "./NavbarItem.module.css"

const NavbarItem = ({ onClick, label }) => {
    return (
        <li
            className={style.NavbarItem}
            onClick={() => onClick(label.toLowerCase())}
        >
            {label}
        </li>
    );
};

export default NavbarItem;
