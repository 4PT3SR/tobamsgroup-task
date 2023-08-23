const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')


const auth = catchAsync(async (req, res, next) => {
    let authToken = req.header('Authorization');
    if (!authToken) {
        throw new AppError('No auth token', 401);
    }
    authToken = authToken.replace('Bearer ', '')

    let payload = jwt.verify(authToken, process.env.jwt_secret);

    let user = await User.findById(payload.userId);

    if (!user) {
        throw new AppError('Unable to authenticate user', 401);
    }

    req.user = user;

    next()
})



module.exports = auth