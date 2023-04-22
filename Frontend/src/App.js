import React from "react";
import AddVehicle from "./components/AddVehicle";
import Header from "./components/Header";
import FetchVehicle from "./components/FetchVehicle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditVehicle from "./components/EditVehicle";

function App() {
  return (
    
    <div className="App">
     <Header/>
     <Routes>
        <Route path="/showvehicle" element={<FetchVehicle/>}/>
        <Route path="/addvehicle" element={<AddVehicle/>}/>
        <Route path="/updatevehicle/:id" element={<EditVehicle/>}/>
     </Routes>
    </div>

  );
}

export default App;