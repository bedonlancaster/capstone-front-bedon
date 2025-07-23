export const getDrinkDetailsByDrinkId = (drinkId) => {
    return fetch(`http://localhost:8088/drinkIngredients?drinkId=${drinkId}&_expand=ingredient`).then(response => response.json())
}
export const getDrinkById = (drinkId) => {
    return fetch(`http://localhost:8088/drinks/${drinkId}`).then(res => res.json());
};