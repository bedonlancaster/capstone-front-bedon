import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCocktails } from "../../services/cocktailService";
import { getDrinkDetailsByDrinkId } from "../../services/drinkDetailsService";
import "./DrinkDetails.css"

export const DrinkDetails = ({ drinkId }) => {
    const [drink, setDrink] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();
    const loggedInEmployeeId = parseInt(localStorage.getItem("employeeId"));

    useEffect(() => {
        getCocktails().then(drinks => {
            const chosenDrink = drinks.find(drink => drink.id === parseInt(drinkId));
            setDrink(chosenDrink);
        });
        getDrinkDetailsByDrinkId(drinkId)
            .then(data => setIngredients(data));
    }, [drinkId]);

    if (drink === null) {
        return <div>Hold on while we fetch your drink</div>;
    }

    return (
        <div className="drink-details">
            <h2>{drink.name}</h2>
            <p><strong>Category:</strong> {drink.category?.category}</p>
            <p><strong>Spirit:</strong> {drink.spirit}</p>
            <p><strong>Method:</strong> {drink.method}</p>
            <p><strong>Glass:</strong> {drink.glass}</p>
            <p><strong>Garnish:</strong> {drink.garnish}</p>
            <p><strong>Submitted By:</strong> {drink.employee?.name}</p>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map(drinkIngredient => (
                    <li key={drinkIngredient.id}>
                        {drinkIngredient.ingredientAmount} {drinkIngredient.ingredient?.name}
                    </li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{drink.instructions}</p>
            <h4>Description</h4>
            <p>{drink.description}</p>
            {drink.employeeId === loggedInEmployeeId && (
                <button
                    className="edit-drink-btn"
                    onClick={() => navigate(`/drinks/${drinkId}/EditDrink`)}
                >
                    Edit
                </button>
            )}
        </div>
    );
};