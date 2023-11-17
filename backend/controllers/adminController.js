const { adminRoleToUser } = require('../services/roleService');

const addAdminRoleToUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Call the method to add the 'ADMIN' role to the user
      await adminRoleToUser(userId);
  
      // Respond with a success message
      res.status(200).json({ message: 'ADMIN role added successfully.' });
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = addAdminRoleToUser;
  