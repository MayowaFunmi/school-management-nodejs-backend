const express = require('express');
const router = express.Router();
const Role = require('../models/userRoles');
const { checkSuperAdminRole } = require('../middleware/checkAdmin');
const addAdminRoleToUser = require('../controllers/adminController');

// add roles route
router.post('/addRole', checkSuperAdminRole, async (req, res) => {
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
});

router.get('/getRoles', checkSuperAdminRole, async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ message: "all roles fetched successfully", data: roles });
    } catch (error) {
        console.error('Error getting roles:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// add ADMIN ROLE to user
router.post('/add-admin-role', checkSuperAdminRole, addAdminRoleToUser);

module.exports = router;