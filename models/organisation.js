/*Defines the Organization schema:

name, account, website: Basic organization details.
fuelReimbursementPolicy, speedLimitPolicy: Policies with default values.
parentOrg: Reference to another organization, creating a parent-child structure for policy inheritance.
*/




const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  account: { type: String, required: true },
  website: { type: String, required: true },
  fuelReimbursementPolicy: { type: String, default: '1000' },
  speedLimitPolicy: { type: String, default: '50 km/h' },  // default value
  parentOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
});

module.exports = mongoose.model('Organization', organizationSchema);
