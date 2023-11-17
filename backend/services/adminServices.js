const USER = require('../models/userModel');
const admin = require('../models/organizationModel');
const { adminRoleToUser } = require('../services/roleService');

const createZone = async (zoneName) => {
    if (!zoneName) {
        throw new Error('Zone name cannot be null');
    }
}

const createOrganization = async (userId, organization) => {
    const user = await USER.findById(userId);
    if (!user) {
        throw new Error("user not found")
    }

    const savedOrg = new admin({
        userId, 
        organizationName: organization
    });
    await savedOrg.save();

    // add ADMIN role to user
    await adminRoleToUser(userId, "ADMIN");
}

module.exports = { createZone, createOrganization }