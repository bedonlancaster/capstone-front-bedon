import "./NavBar.css";
import { Link } from "react-router-dom";
import tinyLogo from "../../assets/tinyLogo.png";
import { Logout } from "../auth/Logout";

export const NavBar = ({ onLogout, loggedInEmployee }) => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo-link">
                <img src={tinyLogo} alt="Tiny Bar Logo" className="navbar-logo" />
            </Link>
            <div className="navbar-main">
                <ul className="navbar-links">
                    <li className="navbar-item">
                        <Link to="/CreateNewDrink">Create New Drink</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/DrinksList">Drinks List</Link>
                    </li>
                </ul>
                {loggedInEmployee && (
                    <div className="navbar-logout">
                        <Logout onLogout={onLogout} />
                    </div>
                )}
            </div>
        </nav>
    );
};