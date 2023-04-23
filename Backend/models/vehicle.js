const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    
    RegNo:{
        type: String,
        required: true
    },
    Make:{
        type: String,
        required: true
    },
    Model:{
        type: String,
        required: true
    },
    EngC:{
        type: String,
        required: true
    },
    CMileage:{
        type: String,
        required: true
    }
});

const vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicle;

