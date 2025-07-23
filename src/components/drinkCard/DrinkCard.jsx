import React from "react";
import "./DrinkCard.css"

export const DrinkCard = ({ drink }) => (
    <div className="drink-card">
        <h3>{drink.name}</h3>
        <p>{drink.category.category}</p>
        <p>{drink.spirit}</p>
    </div>
);