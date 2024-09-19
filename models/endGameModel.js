const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const endSchema = new Schema({
    game_id: {
        type: String,
        required: true,
       
    },
    pot_price: {
        type: String,
        required: true,
        
    },
    winner_id: {
        type: String,
        required: true,
       
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Endgame', endSchema); 
