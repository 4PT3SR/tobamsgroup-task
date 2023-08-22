const express = require('express');
const connectDb = require('./db/mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



app.get('/', async (req, res, next) => {
    res.send('SERVER IS LIVE');
})



const PORT = process.env.PORT || 9900;

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