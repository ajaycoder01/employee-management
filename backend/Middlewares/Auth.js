

const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: 'JWT token required', success: false });

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, token invalid or expired', success: false });
    }
};

module.exports = ensureAuthenticated;
