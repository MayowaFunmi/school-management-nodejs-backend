const { adminRoleToUser } = require('../services/roleService');
const { createOrganization, getOrganizationByName, getOrganizationByAdminId, createZone, organizationExists } = require('../services/adminServices');
const Role = require('../models/userRoles');

const addAdminRoleToUser = async (req, res) => {
    const {userId, roleName } = req.body;
  
    try {
      // Call the method to add the 'ADMIN' role to the user
      await adminRoleToUser(userId, roleName);
  
      // Respond with a success message
      res.status(200).json({ message: 'ADMIN role added successfully.' });
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addNewRole = async (req, res) => {
	try {
        const roleName = req.body.roleName;
        if (!roleName) {
            return res.status(400).json({ message: "Role name should not be empty"})
        }

        const newRole = new Role({ roleName });
        const role = await newRole.save();
        res.status(201).json({ message: `Role ${roleName} added successfully`, data: role})
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const getAllRoles = async (req, res) => {
	try {
        const roles = await Role.find();
        res.status(200).json({ message: "all roles fetched successfully", data: roles });
    } catch (error) {
        console.error('Error getting roles:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const addOrganization = async (req, res) => {
    try {
        const { userId, organization } = req.body;
        await createOrganization(userId, organization);
        return res.status(200).json({ message: "your organization created successfully, you are now an admin"});
    } catch (error) {
        console.log("error occured - ", error);
        return res.status(500).json({ message: "internal server error "})
    }
}

const organizationByName = async (req, res) => {
    try {
        const { name } = req.body;
        const getOrdId = await getOrganizationByName(name);
        if (!getOrdId) {
            return res.status(300).json({ message: `Organiation with the name '${name}' not found`})
        }
        return res.status(200).json({ message: "Organization Id found successfully", data: getOrdId });
    } catch (error) {
        return res.status(500).json({ message: "internal server error"});
    }
};

const organizationByAdminId = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orgId = await getOrganizationByAdminId(userId);
        if (orgId == null) {
            return res.status(404).json({ message: "user not found for the organization" })
        } else {
            return res.status(200).json({ message: "organization id retrieved successfully", data: orgId })
        }
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`});
    }
}

const addZone = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { uniqueId, zoneName } = req.body;
        const orgId = await organizationExists(uniqueId, userId);
        if(orgId) {
            const response = await createZone(orgId, zoneName);
            return res.status(200).json({ message: "Zone created successfully", data: response })
        } else {
            return res.status(401).json({ message: "error: org does not exist or you are not authorized to access the org"})
        }
    } catch (error) {
        return res.status(500).json({ message: `internal server error - ${error}`})
    }
}

module.exports = { addAdminRoleToUser, addNewRole, getAllRoles, addOrganization, organizationByName, organizationByAdminId, addZone };