import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditDrink.css"

export const EditDrink = () => {
    const { drinkId } = useParams();
    const navigate = useNavigate();
    const [drink, setDrink] = useState(null);
    const [allIngredients, setAllIngredients] = useState([]);
    const [drinkIngredients, setDrinkIngredients] = useState([]);
    const [newIngredients, setNewIngredients] = useState([]);
    const [amountMeasurements] = useState([
        { id: 1, amount: "barspoon" },
        { id: 2, amount: ".25 oz" },
        { id: 3, amount: ".5 oz" },
        { id: 4, amount: ".75 oz" },
        { id: 5, amount: "1 oz" },
        { id: 6, amount: "1.25 oz" },
        { id: 7, amount: "1.5 oz" },
        { id: 8, amount: "1.75 oz" },
        { id: 9, amount: "2 oz" },
        { id: 10, amount: "2.25 oz" },
        { id: 11, amount: "2.5 oz" },
        { id: 12, amount: "2.75 oz" },
        { id: 13, amount: "3 oz" },
        { id: 14, amount: "1 dash" },
        { id: 15, amount: "2 dashes" },
        { id: 16, amount: "3 dashes" },
        { id: 17, amount: "4 dashes" },
        { id: 18, amount: "2 drops" },
        { id: 19, amount: "3 drops" },
        { id: 20, amount: "4 drops" },
        { id: 21, amount: "5 drops" },
        { id: 22, amount: "6 drops" }
    ]);

    // Fetch drink, its ingredients, and all possible ingredients
    useEffect(() => {
        fetch(`http://localhost:8088/drinks/${drinkId}`)
            .then(res => res.json())
            .then(setDrink);

        fetch(`http://localhost:8088/drinkIngredients?drinkId=${drinkId}&_expand=ingredient`)
            .then(res => res.json())
            .then(data => {
                setDrinkIngredients(data);
                setNewIngredients(
                    data.map(di => ({
                        ingredientId: di.ingredientId,
                        ingredientAmount: di.ingredientAmount
                    }))
                );
            });

        fetch("http://localhost:8088/ingredients")
            .then(res => res.json())
            .then(setAllIngredients);
    }, [drinkId]);

    // Handle drink field changes
    const handleDrinkChange = (e) => {
        setDrink({ ...drink, [e.target.name]: e.target.value });
    };

    // Handle ingredient changes
    const handleIngredientChange = (idx, field, value) => {
        const updated = [...newIngredients];
        updated[idx][field] = value;
        setNewIngredients(updated);
    };

    // Add new ingredient row
    const addIngredient = () => {
        setNewIngredients([...newIngredients, { ingredientId: "", ingredientAmount: "" }]);
    };

    // Remove ingredient row
    const removeIngredient = (idx) => {
        setNewIngredients(newIngredients.filter((_, i) => i !== idx));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Update the drink
        await fetch(`http://localhost:8088/drinks/${drinkId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(drink)
        });

        // 2. Delete all old drinkIngredients
        await Promise.all(
            drinkIngredients.map(ing =>
                fetch(`http://localhost:8088/drinkIngredients/${ing.id}`, { method: "DELETE" })
            )
        );

        // 3. Create new drinkIngredients
        await Promise.all(
            newIngredients
                .filter(ni => ni.ingredientId && ni.ingredientAmount)
                .map(ni =>
                    fetch("http://localhost:8088/drinkIngredients", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            drinkId: Number(drinkId),
                            ingredientId: Number(ni.ingredientId),
                            ingredientAmount: ni.ingredientAmount
                        })
                    })
                )
        );

        navigate(`/drinks/${drinkId}`);
    };

    // Delete handler
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this drink? This cannot be undone.")) return;

        await Promise.all(
            drinkIngredients.map(ing =>
                fetch(`http://localhost:8088/drinkIngredients/${ing.id}`, { method: "DELETE" })
            )
        );
        await fetch(`http://localhost:8088/drinks/${drinkId}`, { method: "DELETE" });
        navigate("/DrinksList");
    };

    if (!drink) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="edit-drink-form">
            <h2>Edit Drink</h2>
            <input
                name="name"
                value={drink.name || ""}
                onChange={handleDrinkChange}
                placeholder="Drink Name"
                required
            />
            <input
                name="spirit"
                value={drink.spirit || ""}
                onChange={handleDrinkChange}
                placeholder="Spirit"
            />
            <input
                name="method"
                value={drink.method || ""}
                onChange={handleDrinkChange}
                placeholder="Method"
            />
            <input
                name="glass"
                value={drink.glass || ""}
                onChange={handleDrinkChange}
                placeholder="Glass"
            />
            <input
                name="garnish"
                value={drink.garnish || ""}
                onChange={handleDrinkChange}
                placeholder="Garnish"
            />
            <textarea
                name="description"
                value={drink.description || ""}
                onChange={handleDrinkChange}
                placeholder="Description"
            />
            <textarea
                name="instructions"
                value={drink.instructions || ""}
                onChange={handleDrinkChange}
                placeholder="Instructions"
            />

            <h3>Ingredients</h3>
            {newIngredients.map((ing, idx) => (
                <div key={idx} style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
                    <select
                        value={ing.ingredientId}
                        onChange={e => handleIngredientChange(idx, "ingredientId", e.target.value)}
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
                        onChange={e => handleIngredientChange(idx, "ingredientAmount", e.target.value)}
                        required
                    >
                        <option value="">Select Amount</option>
                        {amountMeasurements.map(measurement => (
                            <option key={measurement.id} value={measurement.amount}>
                                {measurement.amount}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={() => removeIngredient(idx)}>
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