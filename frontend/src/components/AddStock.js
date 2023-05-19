import React,{useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from '../components/Header';



 function AddStock(){
  
  let [item, setItem] = useState("");
  const [quantity,setQuantity] = useState("");
  const [unitPrice,setUnitPrice] = useState("");
  const [expireDate,setExpireDate] = useState("");
  const [supplier,setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState(null);
  const [country, setCountry] = useState("");


 


  function sendData(e){
    e.preventDefault();

    const newStock = {

        item,
        quantity,
        unitPrice,
        expireDate,
        supplier,
        country

    }

    axios.post("http://localhost:8070/stock/stadd",newStock).then(()=>{
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Stock Added',
            showConfirmButton: false,
            timer: 1500
          })
    }).catch((err)=>{
      alert(err)
    })
   
  }

  useEffect(()=>{
    const showSup = async ()=>{
        const response = await fetch('http://localhost:8070/supplier/getsup')
        const json = await response.json()

        if(response.ok){
          setSuppliers(json)
        }
    }
    showSup()
}, [])

    return(

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '150vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
           <Header/>     
<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Stock</h1>
            </div>
            
        <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

<form onSubmit={sendData}>

 <div className="mb-3 text-white ">
    <label for="item" className="form-label">Item</label>
    <input type="text" className="form-control ml-2 mr-5" id="fullname"placeholder="Enter item Name"
    required onChange={(e)=>{

        setItem(e.target.value);
    }}/>

  </div>

  <div class="row g-3">



  <div className="col mb-3 text-white">
    <label for="quantity" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="nic"placeholder="Enter Quantity"
     required onChange={(e)=>{

        setQuantity(e.target.value);
    }}/>
    
  </div>

  <div className="col mb-3 text-white">
    <label for="country" className="form-label">country</label>
    <input type="number" className="form-control" id="nic"placeholder="Enter Quantity"
     required onChange={(e)=>{

        setQuantity(e.target.value);
    }}/>
    
  </div>
  </div>






  <div class="row g-3"> 
  
  <div className="col mb-3 text-white">
    <label for="unitPrice" className="form-label">UnitPrice</label>
    <input type="number" className="form-control" id="age"placeholder="Enter UnitPrice"
     required onChange={(e)=>{

        setUnitPrice(e.target.value);
    }}/>
    
  </div>




<div className="col mb-3 text-white">
  <label htmlFor="bday" className="form-label">Expire Day</label>
  <input type="date" className="form-control" id="bday" placeholder="Enter Expire Day"
    required onChange={(e)=>{
      setExpireDate(e.target.value);
    }}
  />
</div>
</div>
<div class="mb-3">
                <label for="vno" class="form-label" id="t2">country</label>
                <div class="dropdown">
                <select  class="btn btn-secondary dropdown-toggle" required onChange={(e)=>{
                    setCountry(e.target.value)
                }}>
             
                
                </select>

            </div>
            </div>
<div class="mb-3">
                <label for="vno" class="form-label" id="t2">supplier</label>
                <div class="dropdown">
                <select  class="btn btn-secondary dropdown-toggle" required onChange={(e)=>{
                    setSupplier(e.target.value)
                }}>
             
                {suppliers && suppliers.map((supplier) => (
                    <option value={supplier.name}>{supplier.name}</option>
                ))}
                </select>

            </div>
            </div>





  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
  

</form>


        </div>
        </div>
    )
}
export default AddStock;