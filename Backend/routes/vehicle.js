const router = require("express").Router();
let vehicle = require("../models/vehicle");

router.route("/add").post((req,res)=>{
    const regNo = req.body.RegNo;
    const make = req.body.Make;
    const model = req.body.Model;
    const engC = number(req.body.EngC);
    const cMil = number(req.body.CMileage);

    const newVehicle = new vehicle({
        regNo,
        make,
        model,
        engC,
        cMil
    })

    newVehicle.save().then(()=>{
        res.json("Vehicle Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    vehicle.find().then((vehicles)=>{
        res.json(vehicles);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {regNo,make,model,engC,cMil} = req.body

    const updateVehicle = {
        regNo,
        make,
        model,
        engC,
        cMil
    }

    const update = await vehicle.findByIdAndUpdate(userId, updateVehicle).then(()=>{
        res.status(200).send({status: "Vehicle updated", user: update})
    }).catch((err)=>{
        console.log(err);
        re.status(500).send({status: "Error while updating vehicle data"});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await vehicle.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Vehicle Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error while deleting the vehicle", error: err.message})
    })
})

router.route("/get/:id").get(async(req,res)=>{
    const userId = req.params.id;
    const vehi = await vehicle.findById(userId).then(()=>{
        res.status(200).send({status: "Vehicle fetched", user: vehi}).catch((err)=>{
            console.log(err.message)
            res.status(500).send({status: "Error while fetching the vehicle", error: err.message})
        })
    })
})

module.exports = router;