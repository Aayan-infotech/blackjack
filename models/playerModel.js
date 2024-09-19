const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
   
    max_player:{
        type: String,
        required: true
    },
    bet_amount:{
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema); 
// create game code

