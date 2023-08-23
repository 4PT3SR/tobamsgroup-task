const AppError = require('../utils/AppError')

module.exports = notFoundHandler = async (req, res, next) => {
    next(new AppError(`${req.originalUrl} does not exist`, 404));
}