const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getGame = new Schema({
   game_code:{
    type:String,
    required:true,
    unique:true
   }
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Getgame', getGame); 
