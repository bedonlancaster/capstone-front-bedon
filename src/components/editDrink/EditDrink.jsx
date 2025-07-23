import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDrinkById } from "../../services/drinkDetailsService";
import { getDrinkDetailsByDrinkId } from "../../services/drinkDetailsService";
import { getIngredientsService, getAmountMeasurements } from "../../services/generalService";
import "./EditDrink.css"

export const EditDrink = () => {
    const { drinkId } = useParams();
    const navigate = useNavigate();
    const [drink, setDrink] = useState(null);
    const [allIngredients, setAllIngredients] = useState([]);
    const [drinkIngredients, setDrinkIngredients] = useState([]);
    const [newIngredients, setNewIngredients] = useState([]);
    const [amountMeasurements, setAmountMeasurements] = useState([]);

    useEffect(() => {
        getDrinkById(drinkId).then(setDrink);
        getDrinkDetailsByDrinkId(drinkId).then(data => {
            setDrinkIngredients(data);
            setNewIngredients(
                data.map(drinkIngredient => ({
                    ingredientId: drinkIngredient.ingredientId,
                    ingredientAmount: drinkIngredient.ingredientAmount
                }))
            );
        });
        getIngredientsService().then(setAllIngredients);
        getAmountMeasurements().then(setAmountMeasurements);
    }, [drinkId]);

    const handleDrinkChange = (event) => {
        setDrink({ ...drink, [event.target.name]: event.target.value });
    };

    const handleIngredientChange = (index, property, value) => {
        const updated = [...newIngredients];
        updated[index][property] = value;
        setNewIngredients(updated);
    };

    const addIngredient = () => {
        setNewIngredients([...newIngredients, { ingredientId: "", ingredientAmount: "" }]);
    };

    const removeIngredient = (index) => {
        setNewIngredients(newIngredients.filter((ingredient, ingredientIndex) => ingredientIndex !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:8088/drinks/${drinkId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(drink)
        });

        await Promise.all(
            drinkIngredients.map(drinkIngredient =>
                fetch(`http://localhost:8088/drinkIngredients/${drinkIngredient.id}`, { method: "DELETE" })
            )
        );

        await Promise.all(
            newIngredients
                .filter(newIngredient => newIngredient.ingredientId && newIngredient.ingredientAmount)
                .map(newIngredient =>
                    fetch("http://localhost:8088/drinkIngredients", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            drinkId: parseInt(drinkId),
                            ingredientId: parseInt(newIngredient.ingredientId),
                            ingredientAmount: newIngredient.ingredientAmount
                        })
                    })
                )
        );

        navigate(`/drinks/${drinkId}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this drink? This cannot be undone.")) return;

        await Promise.all(
            drinkIngredients.map(drinkIngredient =>
                fetch(`http://localhost:8088/drinkIngredients/${drinkIngredient.id}`, { method: "DELETE" })
            )
        );
        await fetch(`http://localhost:8088/drinks/${drinkId}`, { method: "DELETE" });
        navigate("/DrinksList");
    };

    if (drink === null) return <div>Hold on please</div>;

    return (
        <form onSubmit={handleSubmit} className="edit-drink-form">
            <h2>Edit Drink</h2>
            <input
                name="name"
                value={drink.name}
                onChange={handleDrinkChange}
                placeholder="Drink Name"
                required
            />
            <input
                name="spirit"
                value={drink.spirit}
                onChange={handleDrinkChange}
                placeholder="Spirit"
                required
            />
            <input
                name="method"
                value={drink.method}
                onChange={handleDrinkChange}
                placeholder="Method"
                required
            />
            <input
                name="glass"
                value={drink.glass}
                onChange={handleDrinkChange}
                placeholder="Glass"
                required
            />
            <input
                name="garnish"
                value={drink.garnish}
                onChange={handleDrinkChange}
                placeholder="Garnish"
                required
            />
            <textarea
                name="description"
                value={drink.description}
                onChange={handleDrinkChange}
                placeholder="Description"
                required
            />
            <textarea
                name="instructions"
                value={drink.instructions}
                onChange={handleDrinkChange}
                placeholder="Instructions"
                required
            />

            <h3>Ingredients</h3>
            {newIngredients.map((ing, index) => (
                <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
                    <select
                        value={ing.ingredientId}
                        onChange={e => handleIngredientChange(index, "ingredientId", e.target.value)}
                        required
                    >
                        <option value="">Select Ingredient</option>
                        {allIngredients.map(ingredient => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={ing.ingredientAmount}
                        onChange={e => handleIngredientChange(index, "ingredientAmount", e.target.value)}
                        required
                    >
                        <option value="">Select Amount</option>
                        {amountMeasurements.map(measurement => (
                            <option key={measurement.id} value={measurement.amount}>
                                {measurement.amount}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={() => removeIngredient(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addIngredient}>
                Add Ingredient
            </button>
            <br />
            <button type="submit">Update Drink</button>
            <button
                type="button"
                className="delete-drink-btn"
                onClick={handleDelete}
                style={{ background: "#d32f2f", color: "white", marginTop: "1rem" }}
            >
                Delete Drink
            </button>
        </form>
    );
};