import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import './Fetch.css';

const FetchData = () => {

    const [vehicles, setVehicles] = useState(null)
    const [deletevehicle, setVehicleDelete] = useState("");
    const [Search, setSearch] = useState("");

    useEffect(()=>{
        const showVehi = async ()=>{
            const response = await fetch('http://localhost:8070/vehicle/showvehicle')
            const json = await response.json()

            if(response.ok){
                setVehicles(json)
            }
        }
        showVehi()
    }, [])

    const deleteVehicle=async (id) => {
      try {
        await axios.delete(`http://localhost:8070/vehicle/deletevehicle/${id}`);
        setVehicleDelete(vehicles.filter((item) => item.id !== id));
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Vehicle Removed',
          showConfirmButton: false,
          timer: 15000
        })
      
        window.location.reload(); 
        //data deleted after that page will refresh automatically
      } catch (error) {
        alert('Error deleting data', error);
        console.log(error);
      }
    };

    const DownloadPdf=()=>{
      const doc = new jsPDF()
      doc.text("Added Vehicles", 90,10)
      doc.autoTable({
        vehicles:vehicles.map(col=>({...col,datakey:col.field})),
        body:vehicles
      })
      doc.save('Vehicles.pdf')
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

        <div className="container">
          <br></br>
            <h1 className="t1" id="t2">My Vehicles</h1><br></br>
            <Link to='/addvehicle' className='btn btn-success'>Add Vehicle</Link>&nbsp;
              <button type="button" class="btn btn-primary" onClick={DownloadPdf}>Download Vehicle Report</button>
            <form className="f1">
              <input type="text" placeholder="Search Vehicles" className="i1" onChange={(e)=> setSearch(e.target.value)}></input>
            </form>
            <br></br>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col" id="t2">Registration No.</th>
                    <th scope="col" id="t2">Make</th>
                    <th scope="col" id="t2">Model</th>
                    <th scope="col" id="t2">Engine Capacity</th>
                    <th scope="col" id="t2">Current Mileage</th>
                  </tr>
                </thead>
                <tbody>
                {vehicles && vehicles.filter((vehicle)=>{
                  return Search.toLowerCase() === ''
                  ? vehicle
                  : vehicle.RegNo.toLowerCase().includes(Search);
                }).map((vehicle)=>(
                  <tr>
                    <td id="t2">{vehicle.RegNo}</td>
                    <td id="t2">{vehicle.Make}</td>
                    <td id="t2">{vehicle.Model}</td>
                    <td id="t2">{vehicle.EngC}</td>
                    <td id="t2">{vehicle.CMileage}</td>
                    <div class="d-grid gap-2 d-md-block">
                        <Link to={`/updatevehicle/${vehicle._id}`} class="btn btn-warning">Edit</Link>&nbsp;
                        <button class="btn btn-danger" onClick={()=>deleteVehicle(vehicle._id)}>Delete</button>
                    </div>
                  </tr>))}
                </tbody>
              </table>
              <br></br>
                            
        </div>
        </div>
    )
}

export default FetchData;