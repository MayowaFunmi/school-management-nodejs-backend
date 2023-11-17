const express = require('express');
const router = express.Router();
const { checkSuperAdminRole } = require('../middleware/checkAdmin');
const { addAdminRoleToUser, addNewRole, getAllRoles } = require('../controllers/adminController');
const verifyLogin = require('../middleware/verifyLogin');

// add roles route
router.post('/addRole', verifyLogin, checkSuperAdminRole, addNewRole);
router.get('/getRoles', verifyLogin, checkSuperAdminRole, getAllRoles);

// add ADMIN ROLE to user
router.post('/add-admin-role', verifyLogin, checkSuperAdminRole, addAdminRoleToUser);

module.exports = router;