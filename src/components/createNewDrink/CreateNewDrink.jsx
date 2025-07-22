import { useState, useEffect } from "react";
import { CreateDrinkWithIngredients } from "../../services/createNewDrinkService";
import { getIngredientsService } from "../../services/cocktailService";
import "./createNewDrink.css"
import { Link, useNavigate } from "react-router-dom";

export const CreateNewDrink = () => {
    const navigate = useNavigate();

    // SETTING UP "TRANSIENT STATE" FOR EACH DRINKS SUBMISSION 
    const [drinkName, setDrinkName] = useState("");
    const [spirit, setSpirit] = useState("");
    const [method, setMethod] = useState("");
    const [glass, setGlass] = useState("");
    const [garnish, setGarnish] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [employeeId, setEmployeeId] = useState("");



    //SETTING UP INGREDIENT SELECTIONS, WITH OBJECTS PER SELECTED INGREDIENT AND AMOUNT
    const [selectedIngredients, setSelectedIngredients] = useState([
        { ingredientId: "", ingredientAmount: "" }
    ]);


    //SETTING UP AVAILABLE INGREDIENTS TO CHOOSE FROM
    const [availableIngredients, setAvailableIngredients] = useState([]);


    //SETTING SPIRIT OPTIONS BASED OFF OF SPIRITS IN DATABASE
    const [spirits] = useState([
        { id: 1, name: "Gin" },
        { id: 2, name: "Vodka" },
        { id: 3, name: "Whiskey" },
        { id: 4, name: "Bourbon" },
        { id: 5, name: "Rye Whiskey" },
        { id: 6, name: "Scotch" },
        { id: 7, name: "Rum" },
        { id: 8, name: "Tequila" },
        { id: 9, name: "Mezcal" },
        { id: 10, name: "Brandy" },
        { id: 11, name: "Cognac" },
        { id: 12, name: "Pisco" },
        { id: 13, name: "Amaro" }
    ]);


    //SETTING OPTIONS FOR GLASSWARE
    const [glasses] = useState([
        { id: 1, name: "Rocks" },
        { id: 2, name: "Collins" },
        { id: 3, name: "Spritz" },
        { id: 4, name: "Nick & Nora" },
        { id: 5, name: "Tiki Mug" }
    ])


    //SETTING CATEGORY OPTIONS FOR DROPDOWN
    const [categories] = useState([
        { id: 1, category: "Classic" },
        { id: 2, category: "Modern Classic" },
        { id: 3, category: "tiny bar original" }
    ]);

    //SETTING EMPLOYEE OPTIONS FOR DROPDOWN
    const [employees] = useState([
        { id: 1, name: "Bedon Lancaster" },
        { id: 2, name: "Caroline Lancaster" },
        { id: 3, name: "Ivan Sobek" },
        { id: 4, name: "Carson Lystad" },
        { id: 5, name: "Ryan Savage" },
        { id: 6, name: "Noah Luna" },
        { id: 7, name: "Brad Longfellow" }
    ]);

    //SETTING AMOUNT OPTIONS FOR DROPDOWN
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


    //INTIIAL RENDER SETTING THE ENTIRE INGREDIENTS ARRAY 
    useEffect(() => {
        getIngredientsService().then(setAvailableIngredients);
    }, []);

    // THIS IS HOW WE CAN ADD A NEW INGREDIENT
    // ... SPREAD OPERATOR HAS each selectedIngredients, and adds this new object that we UPDATE on line 300
    const addIngredient = () => {
        setSelectedIngredients([...selectedIngredients, { ingredientId: "", ingredientAmount: "" }]);
    };

    // THIS IS HOW WE CAN REMOVE AN INGREDIENT
    // _ is the CURRENT OBJECT
    // i is the current index (id) in the selectedIngredients array
    // !== basically is using .filter to keep only the ingredients whose index is NOT EQUAL to the index you ARE trying to remove
    //updates selectedIngredients and sets them using .filter
    // LOOK AT LINE 294
    const removeIngredient = (index) => {
        setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    };

    /* THIS IS HOW WE CAN UPDATE AN INGREDIENT

        INDEX, 
        FIELD
        VALUE
    */
    const updateIngredient = (index, field, value) => {
        const updated = [...selectedIngredients];
        updated[index][field] = value;
        setSelectedIngredients(updated);
    };

    // THIS HANDLES THE SUBMISSION AND SETS UP A NEW DRINK TO BE POSTED TO THE DATABASE
    const handleSubmit = async (event) => {
        event.preventDefault();

        const drink = {
            name: drinkName,
            spirit,
            method,
            glass,
            garnish,
            description,
            instructions,
            categoryId: parseInt(categoryId),
            employeeId: parseInt(employeeId)
        };

        // THIS IS A NEAT WAY TO FILTER OUT THE INGREDIENTS THAT DIDN'T GET FILLED OUT, NOT NECESSARY BUT COOL
        const validIngredients = selectedIngredients.filter(
            ingredient => ingredient.ingredientId && ingredient.ingredientAmount
        );


        //THIS IS HANDLING THE ACTUAL SUBMISSION, WHICH TRIGGERS THE FINAL POST IN OUR createNewDrink.jsx in services, which POSTS BOTH THE DRINK
        // AND THE DRINK INGREDIENTS TO THE DATABASE
        try {
            await CreateDrinkWithIngredients(drink, validIngredients);
            alert("Drink created successfully!");
            // Redirect to the new drink's details page:
            navigate("/DrinksList");
        } catch (error) {
            console.error("Error creating drink:", error);
            alert("Failed to create drink");
        }
    };


    //WE USE <FORM> BECAUSE IT ALLOWS US TO SUBMIT EVERYTHING ON ONE CLICK
    //I ADDED THIS PREVENTDEFAULT HERE TO PREVENT ACCIDENTALLY HITTING ENTER WHICH BROKE MY DATABASE
    return (
        <div className="create-drink-container">


            <h2>Create New Drink</h2>
            <form onSubmit={handleSubmit}
                onKeyDown={event => {
                    if (event.key === "Enter") event.preventDefault()
                }}>

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



                <select value={method} onChange={(event) => setMethod(event.target.value)}
                    required
                >
                    <option value="">Select Method</option>
                    <option value="shaken">Shaken</option>
                    <option value="stirred">Stirred</option>
                    <option value="built">Built</option>
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