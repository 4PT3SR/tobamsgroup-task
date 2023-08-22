const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB connected successfully!')
}
module.exports = connectDb;