//Contains logic for organization-related endpoints:

/*createOrg:
Accepts organization details and applies default values where needed.
Saves the new organization in the database.
*/
/*getAllOrgs function to handle pagination.
This code retrieves a paginated list of organizations based on the page and limit query parameters,
 which default to 1 and 10, respectively. */


const Organization = require('../models/organisation');
const updateChildOrgPolicies = require('../utils/updateChildOrgPolicies');  // A utility function

exports.createOrg = async (req, res) => {
  const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy, parentOrg } = req.body;

  try {
    const org = new Organization({
      name,
      account,
      website,
      fuelReimbursementPolicy: fuelReimbursementPolicy || '1000',
      speedLimitPolicy: speedLimitPolicy || '50 km/h',
      parentOrg
    });

    await org.save();
    res.status(201).json(org);
  } catch (error) {
    res.status(400).json({ message: 'Error creating organization' });
  }
};

/* In the context of a web API, pagination helps limit the number of records returned by an endpoint in each response, making data retrieval more efficient and reducing load on both the server and the client.
  if you have hundreds of organizations in your database, you might not want to fetch all of them at once. Instead, you can divide the data into "pages" and retrieve only a specified number of records per request.
 Pagination Works with page and limit Parameters
  */
exports.getAllOrgs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
  
    try {
      const organizations = await Organization.find().skip(skip).limit(Number(limit));
      res.status(200).json(organizations);
    } catch (error) {
      res.status(400).json({ message: 'Error retrieving organizations' });
    }
  };
 
/*This is where the organization is updated.
If a parent organization exists, the logic calls the updateChildOrgPolicies function
to propagate any policy changes to child organizations.
*/

exports.updateOrg = async (req, res) => {
    try {
        const orgId = req.params.id;
        const orgUpdates = req.body;  // This will contain the updates to the organization

        // Find the parent organization if applicable
        const org = await Organization.findById(orgId);
        if (!org) {
            return res.status(404).json({ error: "Organization not found" });
        }

        // Update the organization with the new policies or other fields
        if (orgUpdates.fuelReimbursementPolicy) {
            org.fuelReimbursementPolicy = orgUpdates.fuelReimbursementPolicy;
        }
        if (orgUpdates.speedLimitPolicy) {
            org.speedLimitPolicy = orgUpdates.speedLimitPolicy;
        }

        // Save the updated parent organization
        await org.save();

        // Check if the organization has a parent, and propagate the changes to child organizations
        if (org.parentOrg) {
            await updateChildOrgPolicies(org);  // Propagate the changes to child organizations
        }

        // Return the updated organization
        res.json(org);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
