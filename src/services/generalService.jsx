export const getEmployees = () => {
    return fetch('http://localhost:8088/employees').then(res => res.json())
}
export const getSpirits = () => {
    return fetch('http://localhost:8088/spirits').then(res => res.json())
}
export const getGlasses = () => {
    return fetch('http://localhost:8088/glasses').then(res => res.json())
}
export const getCategories = () => {
    return fetch('http://localhost:8088/categories').then(res => res.json())
}
export const getAmountMeasurements = () => {
    return fetch('http://localhost:8088/amountMeasurements').then(res => res.json())
}
export const getIngredientsService = () => {
    return fetch('http://localhost:8088/ingredients').then(res => res.json())
}
export const getMethods = () => {
    return fetch('http://localhost:8088/methods').then(res => res.json())
}
