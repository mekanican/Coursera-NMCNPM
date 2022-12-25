const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    Role: {
        type: String,
        enum:  ['lecturer', 'learner'],
        required: true,
    }, 
    FullName: {
        type: String,
        required: true
    }, 
    Gender: {
        type: Boolean
    },
    Birthday: {
        type: Date
    }, 
    Email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    }, 
    Address: {
        type: String
    },
    DateCreated: {
        type: Date,
        default: Date.now()
    },
    LastModified: {
        type: Date,
        default: Date.now()
    }, 
    IsActive: {
        type: Boolean,
        default: true
    } 
}, { collection: 'User' });

module.exports = {
    User: mongoose.model('User', userSchema)
}