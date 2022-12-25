const mongoose = require('mongoose')

const courseInformationSchema = new mongoose.Schema({
	CourseName: {
        type: String,
        required: true
    }, 
    Description: {
        type: String
    }, 
    Tag: {
        type: Number
    }, 
    Rating: {
        type: mongoose.Schema.Types.Decimal128,
    }, 
    CreatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    DateCreated: {
        type: Date,
        default: Date.now()
    },
    LastModified: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }
}, { collection: 'CourseInformation' });

module.exports = {
    CourseInformation: mongoose.model('CourseInformation', courseInformationSchema)
}