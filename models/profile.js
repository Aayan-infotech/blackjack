const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Profile', RoleSchema); 