const mongoose = require('mongoose')

const test = mongoose.Schema(
    {
        SectionId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: 'CourseSection',
            required: true
        },
        Title: {
            type: String,
            required: true
        },
        DateCreated: {
            type: Date,
            default: Date.now
        },
        LastModified: {
            type: Date,
            default: Date.now
        },
        IsDeleted: {
            type: Boolean,
            default: false
        }
    }, { collection: 'Test' }
)

module.exports = {
    Test: mongoose.model('Test', test)
}