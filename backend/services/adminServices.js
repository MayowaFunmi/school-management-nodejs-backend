const USER = require('../models/userModel');
const Admin = require('../models/organizationModel');
const { adminRoleToUser } = require('../services/roleService');

const createZone = async (orgId, zoneName) => {

    if (!zoneName) {
        throw new Error('Zone name cannot be null');
    }
}

const getOrganizationByName = async (orgName) => {
    let name = "";
    if (orgName)
    {
        name = orgName.toLowerCase();
    } else {
        throw new Error("Organization name cannot be empty");
    }
    const org = await Admin.findOne({ organizationName: name});
    if (org) {
        return org._id.toString();
    } else {
        return null;
    }
};

const getOrganizationByByAdminId = async (adminId) => {
    const orgAdmin = await Admin.findOne({ userId: adminId });
    if (orgAdmin) {
        return orgAdmin._id.toString();
    } else {
        return null;
    }
}

const createOrganization = async (userId, org) => {
    const user = await USER.findById(userId);
    let organization = "";
    if (!user) {
        throw new Error("user not found")
    }
    if (!org)
    {
        throw new Error("Organization name cannot be empty");
    } else {
        organization = org.toLowerCase();
    }
    const savedOrg = new Admin({
        userId, 
        organizationName: organization
    });
    await savedOrg.save();

    // add ADMIN role to user
    await adminRoleToUser(userId, "ADMIN");
}

module.exports = { createZone, createOrganization, getOrganizationByName, getOrganizationByByAdminId, createZone };