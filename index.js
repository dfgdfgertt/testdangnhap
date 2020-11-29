console.log("hi");
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended: true
}));

dotenv.config({
    path: './config/config.env'
})

connectDB();
//API

app.get('/' , (req, res) =>{
    res.status(200).json({
        "name": "longhocgioi" 
    });
});

const PORT = process.env.PORT || 3000



app.use('/api/android', require('./routes/usercontroller'));

app.listen(PORT, 
    console.log(`Server is running on Port: ${PORT}`.red.underline.bold)
    );