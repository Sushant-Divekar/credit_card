const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtoken;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token verification failed.' });
    }
};

module.exports = verifyToken;
