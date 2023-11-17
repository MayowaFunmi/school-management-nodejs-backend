const Role = require('../models/userRoles');

const checkAdminRole = async (req, res, next) => {
    const role = await Role.findOne({ roleName: 'ADMIN'});
    const superAdmin = await Role.findOne({ roleName: "SUPER ADMIN"});
    const userRoles = req.user.roles;

    if ((userRoles && userRoles.includes(role._id.toString())) || userRoles.includes(superAdmin._id.toString())) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
};

const checkModeratorRole = async (req, res, next) => {
    const role = await Role.findOne({ roleName: 'MODERATOR'});
    const superAdmin = await Role.findOne({ roleName: "SUPER ADMIN"});
    const userRoles = req.user.roles;

    if ((userRoles && userRoles.includes(role._id.toString())) || userRoles.includes(superAdmin._id.toString())) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
};

const checkSuperAdminRole = async (req, res, next) => {
    const role = await Role.findOne({ roleName: 'SUPER ADMIN'});
    const userRoles = req.user.roles;
    if (userRoles && userRoles.includes(role._id.toString())) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
};


module.exports = { checkAdminRole, checkSuperAdminRole, checkModeratorRole };