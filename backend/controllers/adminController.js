const { adminRoleToUser } = require('../services/roleService');
const { createOrganization } = require('../services/adminServices');
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
module.exports = { addAdminRoleToUser, addNewRole, getAllRoles, addOrganization };
  