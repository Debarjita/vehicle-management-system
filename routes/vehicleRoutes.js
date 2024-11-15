/*Routes define API endpoints and map them to their respective controllers.

routes/vehicleRoutes.js
Handles vehicle-related routes:

/decode/:vin: VIN decoding.
/: Adding a new vehicle.
*/


const express = require('express');
const { decodeVin, addVehicle, getVehicle } = require('../controllers/vehicleController'); // Corrected import path
const validateVin = require('../middleware/validateVin');
const rateLimiter = require('../middleware/rateLimiter');
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Route for decoding VIN, applying auth, validateVin, and rateLimiter
router.get('/decode/:vin', auth, validateVin, rateLimiter, decodeVin); // Protect VIN decoding endpoint

// Route for adding a new vehicle
router.post('/', auth, addVehicle); // Protect vehicle addition endpoint
module.exports = router;
