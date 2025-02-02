const jwt = require('jsonwebtoken');

const SECRET_KEY = '0963b0287f6e5c3564fc0c1914fa57cdd4a7be665d38a2cef270aa03a0334806';

const authenticateToken = (req, res, next) => {
const token = req.cookies?.token || req.headers['authorization'].split(' ')[1];

if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user; 
        next(); 
    });
};




module.exports = authenticateToken;
