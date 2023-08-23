const Joi = require('joi');

exports.registerSchema = Joi.object({
    username: Joi.string().required().trim().max(13).min(3).lowercase().messages({
        'string.min': 'Username must conatain atleast 3 characters',
        'string.max': 'Username can only conatain a maximum of 13 characters',
        'any.required': 'You need to enter a username'
    }),
    password: Joi.string().trim().min(10).required().messages({
        'any.required': 'You need to enter a password',
        'string.min': 'Password must be atleast 10 characters long'
    }),
    confirm_password: Joi.string().trim().min(8).valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match with password',
        'any.required': 'You need to confirm your password'
    })
})


exports.loginSchema = Joi.object({
    username: Joi.string().required().trim().lowercase().messages({
        'any.required': 'You need to enter a username'
    }),
    password: Joi.string().trim().required().messages({
        'any.required': 'You need to enter a password',

    })

})