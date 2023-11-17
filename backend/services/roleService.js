const USER = require('../models/userModel');
const ROLES = require('../models/userRoles');

const adminRoleToUser = async (userId) => {
    try {
        const adminRole = await ROLES.findOne({ roleName: 'ADMIN' });
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

        if (!user.roles.includes('ADMIN')) {
            user.roles.push(adminRole._id);
        }
        await user.save();
        console.log('ADMIN role added successfully');
    } catch (error) {
        console.error('Error adding ADMIN role:', error);
        throw error;
    }
}

module.exports = { adminRoleToUser };