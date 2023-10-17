const mongoose = require('mongoose');
const User = require("../model/userSchema");


const cardSchema = new mongoose.Schema({
    cardOwnerName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    expiryYear: {
        type: Number,
        required: true,
        min: 2021,
        max: 3000
    },
    //authCode: String,
    cvv: {
        type: Number,
        required: true,
        min: 100,
        max: 9999
    },

    amount: {
        type: Number,
        default: 50000
    },
    
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    /*time:{
        type:String,
    }*/

   
},

);

const Card = mongoose.model('CARDS', cardSchema);

module.exports = Card;


