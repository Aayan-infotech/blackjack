const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    game_code: {
        type: String,
        required: true,
        unique:true
       
    },
    game_type: {
        type: String,
        required: true,
        
    },
    max_player: {
        type: String,
        required: true,
       
    },
    bet_amount: {
        type: String,
        required: true,
        
    },
    pot_price: {
        type: String,
        required: true,
        
    },
    players: {
        type: [String],
        required: true,
        
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Startgame', gameSchema); 
