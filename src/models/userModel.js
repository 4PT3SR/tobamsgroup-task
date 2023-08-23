const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You need to enter a username"],
        unique: [true, "Sorry, username has already been taken"],
        maxLength: [13, "Username can only conatain a maximum of 10 characters"],
        minLength: [3, "Username must conatain atleast 3 characters"]
    },
    password: {
        type: String,
        required: [true, "You need to enter a password"],
        minLength: [8, "Password must be atleast 10 characters long"]
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next()
})
userSchema.statics.getCredentials = async function (username, password) {
    const user = await User.findOne({
        username
    });
    const errResponse = 'Incorrect Username or Password'
    if (!user) {
        throw new AppError(errResponse, 400);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new AppError(errResponse, 400);
    }
    return user;
}



userSchema.methods.toJSON = function () {

    const user = this;
    let userObject = user.toObject();
    delete userObject.password
    delete userObject.__v
    return userObject

}

const User = new mongoose.model('User', userSchema);

module.exports = User;