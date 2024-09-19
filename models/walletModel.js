const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletModel = new Schema({
   amount:{
    type:String,
    required:true
   }
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Wallet', walletModel); 
