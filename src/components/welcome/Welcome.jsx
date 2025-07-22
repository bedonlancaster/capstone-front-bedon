import "./Welcome.css";
import tinyLogo from "../../assets/tinyLogo.png"
import { Link, Outlet } from "react-router-dom";
export const Welcome = () => {
    return (
        <div className="welcome-container">
            <img src={tinyLogo} className="tiny-logo" alt="Tiny Bar Logo" />

            <h1>cocktail database</h1>
            <div>welcome to tiny town</div>
            <Link to="/CreateNewDrink">
                <button className="btn-create">Create New Drink</button>
            </Link>
            <Link to="/DrinksList">
                <button className="btn-drinks">Drinks List</button>
            </Link>
            <Outlet />
        </div>
    )
}