export const CreateNewDrinkService = (newDrink) => {
    return fetch("http://localhost:8088/drinks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDrink)
    }).then(res => res.json());
}

export const CreateNewDrinkIngredientsService = (newDrinkIngredient) => {
    return fetch("http://localhost:8088/drinkIngredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDrinkIngredient)
    }).then(res => res.json());
}



/* SO WITHIN THIS FUNCTION, WE accepting two parameters (which will later be populated with our drink object, and our array of ingredients)
the drink object is routed to the CreateNewDrinkService POST which POSTS the new drink object to the drinks array of the database
we STORE the value of that in createdDrink (so we can reference this new objects .id)

we then await that and use Promise.all which runs all ingredient POSTs in parallel and waits for all to finish before continuing

we then .map the ingredientsArray and for each ingredient we run CreateNewDrinkIngredientService which POSTs a new drinkIngredient object
and for drinkId: it uses the createdDrink.id that we just created a second ago (which is super sick and complex)
it sets ingredientId: to ingredient.ingreientId
and ingredientAmount: to ingredient.ingredientAmount

IT DOES THIS FOR EACH AND EVERY INGREDIENT THAT IS A PART OF THE DRINK THAT WE CREATE AND POST TO THE DATABASE

HOW COOL IS THAT
*/
export const CreateDrinkWithIngredients = async (drink, ingredientsArray) => {

    const createdDrink = await CreateNewDrinkService(drink);


    await Promise.all(
        ingredientsArray.map(ingredient =>
            CreateNewDrinkIngredientsService({
                drinkId: createdDrink.id,
                ingredientId: ingredient.ingredientId,
                ingredientAmount: ingredient.ingredientAmount
            })
        )
    );

    return createdDrink;
};
