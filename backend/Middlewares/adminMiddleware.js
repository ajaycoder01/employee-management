

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied, admin only", success: false });
    }
    next();
};

module.exports = { isAdmin };
