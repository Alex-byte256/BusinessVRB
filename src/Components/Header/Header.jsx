import Container from "../Container/Container";
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";

function Header() {

    return<header className={css.headerSection}>
        <Container>
            <ul className={css.headerLinkList}>
                <li className={css.linkItem}><NavLink to={"/"} className={({ isActive}) => isActive ? `${css.active} ${css.link}` : css.link}>Main</NavLink> </li>
                <li className={css.linkItem}><NavLink to={"/Favorite"} className={({ isActive}) => isActive ? `${css.active} ${css.link}` : css.link} >Favorite</NavLink></li>
                <li className={css.linkItem}><NavLink to={"/addNew"} className={({ isActive}) => isActive ?`${css.active} ${css.link}` : css.link}>Add new movie</NavLink></li>
            </ul>
        </Container>
    </header>
}

export default Header