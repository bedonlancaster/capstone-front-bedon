import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { DrinksList } from "./components/drinksList/DrinksList";
import { DrinkDetails } from "./components/drinkDetails/DrinkDetails";
import { Welcome } from "./components/welcome/Welcome";
import { NavBar } from "./components/nav/NavBar";
import { CreateNewDrink } from "./components/createNewDrink/CreateNewDrink";
import { useState, useEffect } from "react";
import { Login } from "./components/auth/Login";
import { EditDrink } from "./components/editDrink/EditDrink";

function DrinkDetailsWithParams() {
  const { drinkId } = useParams();
  return <DrinkDetails drinkId={drinkId} />;
}

function App() {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);


  useEffect(() => {
    const storedId = localStorage.getItem("employeeId");
    if (storedId) {
      fetch(`http://localhost:8088/employees/${storedId}`)
        .then((res) => res.json())
        .then((employee) => setLoggedInEmployee(employee));
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        onLogout={() => {
          setLoggedInEmployee(null);
          localStorage.removeItem("employeeId");
        }}
        loggedInEmployee={loggedInEmployee}
      />
      <div>
        {!loggedInEmployee ? (
          <Login onLogin={setLoggedInEmployee} />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/DrinksList" element={<DrinksList />} />
              <Route path="/drinks/:drinkId" element={<DrinkDetailsWithParams />} />
              <Route path="/CreateNewDrink" element={<CreateNewDrink />} />
              <Route path="/drinks/:drinkId/EditDrink" element={<EditDrink />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;