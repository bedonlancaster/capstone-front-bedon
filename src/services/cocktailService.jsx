export const getCocktails = () => {
    return fetch('http://localhost:8088/drinks?_expand=category&_expand=employee').then(res => res.json())
}

export const getDrinkIngredients = () => {
    return fetch('http://localhost:8088/drinkIngredients?_expand=drink&_expand=ingredient').then(res => res.json())
}

export const getIngredientsService = () => {
    return fetch("http://localhost:8088/ingredients").then((res) => res.json());
};