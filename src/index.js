const express = require('express');
const connection = require('../database/db');
require('dotenv').config();

const userRoute = require('../routes/user.route');
const ipRoute = require('../routes/ip.route');

//Create express app
const app = express();
app.use(express.json());

//base end point
app.get('/', (req,res) => {
    res.send("Base end point");
});

//Routes
app.use('/user',userRoute);
app.use('/ip',ipRoute);

//Listen to server
const port = process.env.PORT || 4000;
app.listen(port, async() => {
    try {
        await connection;
        console.log(`Server is running at port ${port}`);
        console.log("Connected to Mongo DB Atlas");
    } catch (err) {
        console.log("Problem connecting to Mongo DB Atlas");
        console.log(err.message);
    }
});

