import React, { useEffect, useState } from "react";
import { getCocktails } from "../../services/cocktailService";
import { DrinkCard } from "../drinkCard/DrinkCard";
import { Link } from "react-router-dom";
import "./DrinksList.css";

export const DrinksList = () => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        getCocktails().then(setDrinks);
    }, []);

    return (
        <div className="drinks-list-container">
            <h2 className="drinks-list-title">Drinks List</h2>
            <div className="drinks-list">
                {drinks.map(drink => (
                    <Link key={drink.id} to={`/drinks/${drink.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <DrinkCard drink={drink} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

