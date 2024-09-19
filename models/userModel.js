const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true,
            unique: true
            
        },
        email: {
            type: String,
            required: false,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: false,
            unique: true

        },
        jobTitle: {
            type: String,
            required: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);