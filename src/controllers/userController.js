const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const {
    registerSchema,
    loginSchema
} = require('../utils/joiValidation');
const genAuthToken = require('../utils/genAuthToken')

exports.register = catchAsync(async (req, res, next) => {
    const payload = await registerSchema.validateAsync(req.body);
    const user = await User.create(payload);
    const authToken = genAuthToken(user._id);


    res.status(201).json({
        status: 'Success',
        data: {
            user,
            authToken
        }
    })
});
// Login

exports.login = catchAsync(async (req, res, next) => {
    const {
        username,
        password
    } = await loginSchema.validateAsync(req.body);
    const user = await User.getCredentials(username, password);
    const authToken = genAuthToken(user._id);

    res.status(200).json({
        status: 'Success',
        data: {
            user,
            authToken
        }
    })


})

exports.dashboard = catchAsync(async (req, res, next) => {
    const user = req.user;

    const message = `Welcome to your dashboard, ${user.username}!`

    res.status(200).json({
        status: 'Success',
        message
    })
})