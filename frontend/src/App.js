import './App.css';
import Header from './components/Header';

//employee components
import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
import FullDetails from './components/FullDetails';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import QrScanner from './components/QrScanner';


import {BrowserRouter , Router,Route, Routes} from "react-router-dom"


function App() {

  //call the classes
  return (
  
      
      <div className="App">
       <Header/>
      
       <Routes>

       <Route path="/emadd" element={<AddEmployee/>}/>
       <Route path="/em" element={<AllEmployees/>}/>
       <Route path="/emget/:id" element={<FullDetails/>}/>
       <Route path="/emupdate/:id" element={<UpdateEmployee/>}/>
       <Route path="/emdelete/:id" element={<DeleteEmployee/>}/>
       <Route path="/emqr" element={<QrScanner/>}/>

       </Routes>
      </div>
      
   

  );
}

export default App;
