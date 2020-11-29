const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    avatar:{
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
    
});

module.exports = mongoose.model('user' , userShema);