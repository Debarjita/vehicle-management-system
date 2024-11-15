const express = require('express');
const orgController = require('../controllers/orgController'); // Correct import
const router = express.Router();

// GET /orgs with pagination
router.get('/orgs', orgController.getAllOrgs);
router.post('/', orgController.createOrg); // Access createOrg through orgController

module.exports = router;
