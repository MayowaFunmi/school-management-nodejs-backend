const express = require('express');
const router = express.Router();
const verifyLogin = require('../middleware/verifyLogin');
const { addOrganization, organizationByName, organizationByAdminId } = require('../controllers/adminController');
const { checkAdminRole } = require('../middleware/checkAdmin');

router.post('/create-an-organization', verifyLogin, addOrganization);
router.get('/get-organization-by-name', verifyLogin, checkAdminRole, organizationByName);
router.get('/get-organization-by-adminId', verifyLogin, checkAdminRole, organizationByAdminId);

module.exports = router;