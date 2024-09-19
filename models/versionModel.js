const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionSchema = new Schema({
    android_minimum_version: {
        type: String,
        required: true,
       
    },
    android_latest_version: {
        type: String,
        required: true,
        
    },
    ios_minimum_version: {
        type: String,
        required: true,
       
    },
    ios_latest_version: {
        type: String,
        required: true,
        
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Version', versionSchema); 
