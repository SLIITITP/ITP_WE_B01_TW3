const express = require("express");
const router = express.Router();
const vehicle = require("../models/vehicle");

router.post("/addvehicle", async (req, res, next) => {
  try {
    const { RegNo, Make, Model, EngC, CMileage } = req.body;
    const newVehicle = new vehicle({
      RegNo,
      Make,
      Model,
      EngC,
      CMileage,
    });
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    next(error);
  }
});

router.get("/showvehicle", async (req, res, next) => {
  try {
    const vehicles = await vehicle.find();
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

router.put("/updatevehicle/:id", async (req, res, next) => {
  try {
    const { RegNo, Make, Model, EngC, CMileage } = req.body;
    const updateVehicle = {
      RegNo,
      Make,
      Model,
      EngC,
      CMileage,
    };
    const updatedVehicle = await vehicle.findByIdAndUpdate(
      req.params.id,
      updateVehicle,
      { new: true }
    );
    if (!updatedVehicle) {
      res.status(404).send({ message: "Vehicle not found" });
    } else {
      res.status(200).json(updatedVehicle);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/deletevehicle/:id", async (req, res, next) => {
  try {
    const deletedVehicle = await vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      res.status(404).send({ message: "Vehicle not found" });
    } else {
      res.status(200).send({ message: "Vehicle deleted" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/getvehicle/:id", async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicleData = await vehicle.findById(vehicleId);
    if (!vehicleData) {
      res.status(404).send({ message: "Vehicle not found" });
    } else {
      res.status(200).send({ message: "Vehicle Fetched" })
      res.status(200).json(vehicleData);
    }
  } catch (error) {
    next(error);
  }
});

// error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Server Error" });
});

module.exports = router;
