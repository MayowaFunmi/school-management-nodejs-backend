const checkAdminRole = (req, res, next) => {
    const userRoles = req.user.roles;

    if (userRoles && userRoles.includes('ADMIN')) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
};

const checkSuperAdminRole = (req, res, next) => {
    const userRoles = req.user.roles;

    if (userRoles && userRoles.includes('SUPER ADMIN')) {
        next();
    } else {
        return res.status(403).json({ message: "Access denied"})
    }
};
module.exports = { checkAdminRole, checkSuperAdminRole };