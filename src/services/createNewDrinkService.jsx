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
