import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="l__nav">
            <div className="flex flex--justify--center">
                <i className="icon icon--logo m--bot-46"></i>
            </div>
            <NavLink
                to="/products"
                className="anchor l__nav__item cur--pointer"
                activeClassName="l__nav--active"
            ><i className="icon icon--package m--right-16"></i> Add product
            </NavLink>
        </div>
    )
}

export default Nav;