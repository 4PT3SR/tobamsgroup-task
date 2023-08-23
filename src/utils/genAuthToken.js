const jwt = require('jsonwebtoken');
const generateToken = (userId) => {
    const token = jwt.sign({
        userId
    }, process.env.jwt_secret, {
        expiresIn: '1d'
    });
    return token;
}


module.exports = generateToken;