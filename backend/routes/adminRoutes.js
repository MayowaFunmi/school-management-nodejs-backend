const express = require('express');
const router = express.Router();
const verifyLogin = require('../middleware/verifyLogin');
const { addOrganization } = require('../controllers/adminController');

router.post('/create-an-organization', verifyLogin, addOrganization);

module.exports = router;