import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Edit.css';
import Swal from 'sweetalert2';

export default function UpdateVideos() {
  const { id } = useParams();

  const [RegNo, setRegNo] = useState("");
  const [Make, setMake] = useState("");
  const [Model, setModel] = useState("");
  const [EngC, setEngC] = useState("");
  const [CMileage, setMilage] = useState("");

  useEffect(function () {
    function getVehicle() {
      axios.get("http://localhost:8070/vehicle/getvehicle/" + id).then((res) => {
          if (res.data) {
            setRegNo(res.data.RegNo || "");
            setMake(res.data.Make || "");
            setModel(res.data.Model || "");
            setEngC(res.data.EngC || "");
            setMilage(res.data.CMileage || "");

            console.log(res.data);
            console.log(res.data.RegNo);
            console.log(res.data.Make);
          }
        })
        .catch(function (err) {
          alert("data not fetched");
          alert(err);
        });
    }
    getVehicle();
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (!RegNo || !Make || !Model || !EngC || !CMileage) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedVehicle = {
      RegNo,
      Make,
      Model,
      EngC,
      CMileage,
    };
    console.log(updatedVehicle);
    axios
      .put("http://localhost:8070/vehicle/updatevehicle/" + id, updatedVehicle)
      .then(function () {
        alert("Vehicle details updated.");
      })
      .catch(function () {
        alert("Vehicle details not updated.");
      });
  }

  return (
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
      backgroundSize: 'cover',
      minHeight: '91.75vh',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      
  }}>

    <div className="container">
    <form className="form1">
    <br></br>
    <h1 className="t1" id="t2">Edit Vehicle Data</h1>
  <div className="mb-3">
    <div className="lbl"><label for="exampleInputEmail1" className="form-label" id="t2">Vehicle Registration Number</label></div>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={RegNo} onChange={(event) => setRegNo(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="t2">Make</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={Make} onChange={(event) => setMake(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id="t2">Model</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => setModel(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" id="t2">Engine Capacity</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => setEngC(event.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label" id="t2">Current Mileage</label>
    <input type="text" className="form-control" id="exampleInputPassword1" onChange={(event) => setMilage(event.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary"  onClick={updateData}>Update</button>
</form>      
    </div>
    </div>
  );
}
