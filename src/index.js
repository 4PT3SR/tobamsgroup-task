const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDb = require('./db/mongoose');
const limiter = require('./utils/rateLimiter');
const userRouter = require('./routes/userRouter');
const notFoundHandler = require('./controllers/notFoundHandler');
const globalErrorHandler = require('./controllers/globalErrorHandler');

const app = express();

// to prevent brute force
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'));

const PORT = process.env.PORT || 9900;


// Routes
app.use('/api/v1/users', userRouter);
app.all('*', notFoundHandler)
app.use(globalErrorHandler);


const startApp = async () => {
    try {
        await connectDb()
        app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startApp();