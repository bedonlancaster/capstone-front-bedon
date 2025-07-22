import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { DrinksList } from "./components/drinksList/DrinksList";
import { DrinkDetails } from "./components/drinkDetails/DrinkDetails";
import { Welcome } from "./components/welcome/Welcome";
import { NavBar } from "./components/nav/NavBar";
import { CreateNewDrink } from "./components/createNewDrink/CreateNewDrink";
import { useState } from "react";
import { Login } from "./components/auth/Login";
import { EditDrink } from "./components/editDrink/EditDrink"; // <-- import at the top


function DrinkDetailsWrapper() {
  const { drinkId } = useParams();
  return <DrinkDetails drinkId={drinkId} />;
}

function App() {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  return (
    <BrowserRouter>
      <NavBar
        onLogout={() => setLoggedInEmployee(null)}
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
              <Route path="/drinks/:drinkId" element={<DrinkDetailsWrapper />} />
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