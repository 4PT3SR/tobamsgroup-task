const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true
});

module.exports = limiter;