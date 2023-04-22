import React, {useState} from "react";
import axios from "axios";
import './Add.css';
import Swal from 'sweetalert2';

export default function AddVehicle(){

    const [RegNo, setRegNo] = useState("")
    const [Make, setMake] = useState("")
    const [Model, setModel] = useState("")
    const [EngC, setEngC] = useState("")
    const [CMileage, setCMil] = useState("")  

    function sendData(e){
        e.preventDefault();

        const newVehicle = {
            RegNo, 
            Make, 
            Model,
            EngC,
            CMileage
          }
       axios.post("http://localhost:8070/vehicle/addvehicle", newVehicle).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Vehicle Added',
            showConfirmButton: true,
            timer: 15000
          })
       }).catch((err)=>{
        alert(err)
       })
    }

    return(

        <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
            backgroundSize: 'cover',
            minHeight: '91.75vh',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            
        }}>

        <div className="topic">
            <br></br>
        <h1 className="t1" id="t2">Add your Vehicle</h1>
        </div>
        <div className="cont">
        <div className="container">
            <form onSubmit={sendData}>
                <br></br>
                
            <div class="mb-3">
                <label for="name" class="form-label" id="t2">Vehicle Registration Number</label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" onChange={(e)=>{
                    setRegNo(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Make</label>
                <input type="text" class="form-control" id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setMake(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t2">Model</label>
                <input type="text" class="form-control" id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setModel(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vno" class="form-label" id="t2">Engine Capacity</label>
                <input type="text" class="form-control" id="vno" aria-describedby="emailHelp" onChange={(e)=>{
                    setEngC(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="vtype" class="form-label" id="t2">Current Mileage</label>
                <input type="text" class="form-control" id="vtype" aria-describedby="emailHelp" onChange={(e)=>{
                    setCMil(e.target.value);
                }}/>
            </div>
            <button type="submit" class="btn btn-primary">Add Vehicle</button>
        </form>
        </div>
        </div>
        </div>
        
    )

}