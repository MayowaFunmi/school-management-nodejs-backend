const express = require('express');
const router = express.Router();
const verifyLogin = require('../middleware/verifyLogin');
const { addOrganization, organizationByName, organizationByAdminId, addZone, addDepartment } = require('../controllers/adminController');
const { checkAdminRole } = require('../middleware/checkAdmin');

router.post('/create-an-organization', verifyLogin, addOrganization);
router.get('/get-organization-by-name', verifyLogin, checkAdminRole, organizationByName);
router.get('/get-organization-by-adminId', verifyLogin, checkAdminRole, organizationByAdminId);
router.post('/add-new-zone', verifyLogin, checkAdminRole, addZone);
router.post('/add-new-department', verifyLogin, checkAdminRole, addDepartment);

module.exports = router;