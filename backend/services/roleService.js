const USER = require('../models/userModel');
const ROLES = require('../models/userRoles');

const adminRoleToUser = async (userId, roleName) => {
    try {
        const adminRole = await ROLES.findOne({ roleName: roleName });
        if (!adminRole) {
            throw new Error('Role not found');
        }
        const user = await USER.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.roles) {
            user.roles = [];
        }

        if (!user.roles.includes(adminRole._id.toString())) {
            user.roles.push(adminRole._id.toString());
            await user.save();
            console.log('ADMIN role added successfully');
        } else {
            console.log(`user already has role ${roleName}`);
        }
    } catch (error) {
        console.error('Error adding ADMIN role:', error);
        throw error;
    }
}

module.exports = { adminRoleToUser };