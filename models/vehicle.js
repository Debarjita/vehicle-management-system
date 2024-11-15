/*Defines the Vehicle schema:

vin: Unique vehicle identification number.
org: Reference to the organization that owns the vehicle.
details: JSON object storing decoded vehicle details. */


const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  details: { type: Object, required: true },  // decoded VIN details
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
