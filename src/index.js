const express = require('express');


const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/', async (req, res, next) => {
    res.send('SERVER IS LIVE');
})



const PORT = process.env.PORT || 9900;


app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`))