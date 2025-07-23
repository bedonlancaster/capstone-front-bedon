import { useState, useEffect } from "react";
import { CreateDrinkWithIngredients } from "../../services/createNewDrinkService";
import { getIngredientsService } from "../../services/cocktailService";
import {
    getSpirits,
    getGlasses,
    getCategories,
    getEmployees,
    getAmountMeasurements,
    getMethods
} from "../../services/generalService";
import "./createNewDrink.css";
import { useNavigate } from "react-router-dom";

export const CreateNewDrink = () => {
    const navigate = useNavigate();

    // FORM
    const [drinkName, setDrinkName] = useState("");
    const [spirit, setSpirit] = useState("");
    const [method, setMethod] = useState("");
    const [glass, setGlass] = useState("");
    const [garnish, setGarnish] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // DROPDOWN DATA
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [spirits, setSpirits] = useState([]);
    const [glasses, setGlasses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [amountMeasurements, setAmountMeasurements] = useState([]);
    const [methods, setMethods] = useState([]);

    // GET ALL DROPDOWN DATA ON MOUNT
    useEffect(() => {
        getIngredientsService().then(setAvailableIngredients);
        getSpirits().then(setSpirits);
        getGlasses().then(setGlasses);
        getCategories().then(setCategories);
        getEmployees().then(setEmployees);
        getAmountMeasurements().then(setAmountMeasurements);
        getMethods().then(setMethods);
    }, []);

    const addIngredient = () => {
        setSelectedIngredients([...selectedIngredients, { ingredientId: "", ingredientAmount: "" }]);
    };

    const removeIngredient = (index) => {
        setSelectedIngredients(selectedIngredients.filter((ingredient, ingredientIndex) => ingredientIndex !== index));
    };

    const updateIngredient = (index, property, value) => {
        const updated = [...selectedIngredients];
        updated[index][property] = value;
        setSelectedIngredients(updated);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const drink = {
            name: drinkName,
            spirit: spirit,
            method: method,
            glass: glass,
            garnish: garnish,
            description: description,
            instructions: instructions,
            categoryId: parseInt(categoryId),
            employeeId: parseInt(employeeId)
        };

        const validIngredients = selectedIngredients.filter(
            ingredient => ingredient.ingredientId && ingredient.ingredientAmount
        );

        try {
            await CreateDrinkWithIngredients(drink, validIngredients);
            alert("Drink created successfully!");
            navigate("/DrinksList");
        } catch (error) {
            console.error("Error creating drink:", error);
            alert("Failed to create drink");
        }
    };

    return (
        <div className="create-drink-container">
            <h2>Create New Drink</h2>
            <form
                onSubmit={handleSubmit}
                onKeyDown={(event) => {
                    if (event.key === "Enter") event.preventDefault();
                }}
            >
                <input
                    type="text"
                    placeholder="Drink Name"
                    value={drinkName}
                    onChange={(event) => setDrinkName(event.target.value)}
                    required
                    autoFocus
                />

                <select
                    value={spirit}
                    onChange={(event) => setSpirit(event.target.value)}
                    required
                >
                    <option value="">Select Spirit</option>
                    {spirits.map(spiritObj => (
                        <option key={spiritObj.id} value={spiritObj.name}>
                            {spiritObj.name}
                        </option>
                    ))}
                </select>



                <select value={method} onChange={(event) => setMethod(event.target.value)} required>
                    <option value="">Select Method</option>
                    {methods.map(methodObj => (
                        <option key={methodObj.id} value={methodObj.name}>
                            {methodObj.name}
                        </option>
                    ))}
                </select>

                <select
                    value={glass}
                    onChange={(event) => setGlass(event.target.value)}
                    required>

                    <option value="">Select Glass</option>
                    {glasses.map(glassObj => (
                        <option key={glassObj.id}
                            value={glassObj.name}>
                            {glassObj.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Garnish"
                    value={garnish}
                    onChange={(event) => setGarnish(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    required
                />

                <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.category}</option>
                    ))}
                </select>

                <select value={employeeId} onChange={(event) => setEmployeeId(event.target.value)}
                    required
                >
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                    ))}
                </select>

                <h3>Ingredients</h3>
                {selectedIngredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row">
                        <select
                            value={ingredient.ingredientId}
                            onChange={(event) => updateIngredient(index, "ingredientId", parseInt(event.target.value))}
                        >
                            <option value="">Select Ingredient</option>
                            {availableIngredients.map(ingredient => (
                                <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                            ))}
                        </select>

                        <select
                            value={ingredient.ingredientAmount}
                            onChange={(event) => updateIngredient(index, "ingredientAmount", event.target.value)}
                        >
                            <option value="">Select Amount</option>
                            {amountMeasurements.map(measurement => (
                                <option key={measurement.id} value={measurement.amount}>{measurement.amount}</option>
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

                <button type="submit"

                >Create Drink</button>

            </form>
        </div>
    );
};