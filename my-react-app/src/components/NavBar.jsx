import './NavBar.css'
import { NavLink } from 'react-router-dom'
function NavBar() {
    const getLinkClass = ({ isActive }) => isActive ? "active" : "";
    return (
        <ul className="nav-bar">
            <li>
                <NavLink className={getLinkClass} to="/">Home</NavLink>
            </li>

            <li>
                <NavLink className={getLinkClass} to="/about">About</NavLink>
            </li>

            <li>
                <NavLink className={getLinkClass} to="/post">Post</NavLink>
            </li>
            <li>
                <NavLink className={getLinkClass} to="/user/john">User</NavLink>
            </li>
        </ul>
    );
}

export default NavBar;