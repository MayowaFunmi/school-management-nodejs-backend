const USER = require('../models/userModel');
const Admin = require('../models/organizationModel');
const Zone = require('../models/zone');
const { adminRoleToUser } = require('../services/roleService');
const Department = require('../models/department');

const createZone = async (orgId, zoneName) => {

    if (!zoneName || !orgId) {
        throw new Error('Zone name or organization Id cannot be null');
    }
    const newOrg = new Zone({
        organizationUniqueId: orgId,
        name: zoneName
    })
    await newOrg.save();
    return newOrg;
}

const createDepartment = async (orgId, deptName) => {
    if (!deptName || !orgId) {
        throw new Error('Zone name or organization Id cannot be null');
    }
    const newDept = new Department({
        name: deptName,
        organizationUniqueId: orgId
    })
    await newDept.save();
    return newDept;
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

const getOrganizationByAdminId = async (adminId) => {
    const orgAdmin = await Admin.findOne({ userId: adminId });
    if (orgAdmin) {
        return orgAdmin._id.toString();
    } else {
        return null;
    }
}

const organizationExists = async (orgUniqueId, adminId) => {
    if (!orgUniqueId) {
        throw new Error("Organization's unique id cannot be empty");
    }
    const orgAdmin = await Admin.findOne({ organizationUniqueId: orgUniqueId });
    if (orgAdmin && orgAdmin.userId == adminId) {
        return orgUniqueId;
    } else {
        return false;
    }
};

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
    const organizationUniqueId = Admin.generateUniqueId();
    const savedOrg = new Admin({
        userId, 
        organizationName: organization,
        organizationUniqueId
    });
    await savedOrg.save();

    // add ADMIN role to user
    await adminRoleToUser(userId, "ADMIN");
}

module.exports = {
    createZone, createOrganization, getOrganizationByName, getOrganizationByAdminId, 
    createZone, organizationExists, createDepartment
};