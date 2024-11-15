/*This function checks if the organization is a child and whether it has overridden the parent's policies. 
If not, it updates the child with the parent’s policy. It iterates over all child organizations of the parent and updates them as needed.
*/


const Organization = require('../models/organisation');  // Assuming you have an Organization model

const updateChildOrgPolicies = async (org) => {
  if (org.parentOrg) {
    const parentOrg = await Organization.findById(org.parentOrg);
    if (parentOrg) {
      // Propagate fuelReimbursementPolicy if not overridden
      if (org.fuelReimbursementPolicy === parentOrg.fuelReimbursementPolicy) {
        org.fuelReimbursementPolicy = parentOrg.fuelReimbursementPolicy;
      }
      // Propagate speedLimitPolicy if not overridden
      if (org.speedLimitPolicy === parentOrg.speedLimitPolicy) {
        org.speedLimitPolicy = parentOrg.speedLimitPolicy;
      }

      // Find all child organizations of this parent
      const childOrgs = await Organization.find({ parentOrg: org.parentOrg });
      
      // Update each child organization with the new policies
      for (let childOrg of childOrgs) {
        // Check if the child organization has overridden the policies, if not, update them
        if (childOrg.fuelReimbursementPolicy === parentOrg.fuelReimbursementPolicy) {
          childOrg.fuelReimbursementPolicy = parentOrg.fuelReimbursementPolicy;
        }
        if (childOrg.speedLimitPolicy === parentOrg.speedLimitPolicy) {
          childOrg.speedLimitPolicy = parentOrg.speedLimitPolicy;
        }

        await childOrg.save();  // Save the child organization with the updated policies
      }
    }
  }
};

module.exports = updateChildOrgPolicies;
