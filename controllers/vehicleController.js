/*
Contains logic for vehicle-related endpoints:
decodeVin: (decode means retrieving info about the vehicle from the govt org url)
Takes a VIN, checks if it's cached, and returns cached data if available.
cached means to store data in framework called Redis, to avoid repeteddly calling the same VIN info from the server
Calls the NHTSA VIN decoding API if data isn’t cached.
Decodes the VIN, caches the result for future requests, and sends it as the response to the user or client.
*/

/*addVehicle:
if the vin is already available in db shows message
Adds a new vehicle. It validates the VIN format, verifies the organization, and decodes the VIN.
After decoding, it stores the vehicle in the database and responds with the new vehicle’s details.
validation of VIN- 17 alpha numeric digits and org should be present in our system
*/

const axios = require('axios');
const Vehicle = require('../models/vehicle');
const Organization = require('../models/organisation');
const { cache, getFromCache } = require('../utils/cache');

exports.decodeVin = async (req, res) => {
  const { vin } = req.params;
  
  // Check cache
  const cachedData = await getFromCache(vin);
  if (cachedData) return res.json(cachedData);

  try {
    const response = await axios.get(`${process.env.NHTSA_API_URL}vehicles/DecodeVin/${vin}?format=json`);
    const details = response.data.Results;
    await cache(vin, details);  // Save to cache
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error decoding VIN' });
  }
};

exports.addVehicle = async (req, res) => {
  const { vin, org } = req.body;

  const existingVehicle = await Vehicle.findOne({ vin });
   if (existingVehicle) return res.status(400).json({ message: 'Vehicle with this VIN already exists' });

  try {
    if (!/^[a-zA-Z0-9]{17}$/.test(vin)) return res.status(400).json({ message: 'Invalid VIN format' });

    const organization = await Organization.findById(org);
    if (!organization) return res.status(400).json({ message: 'Organization not found' });

    const response = await axios.get(`${process.env.NHTSA_API_URL}vehicles/DecodeVin/${vin}?format=json`);
    const details = response.data.Results;

    const vehicle = new Vehicle({ vin, org, details });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle' });
  }
};
