const mongoose = require('mongoose')

const lecture = mongoose.Schema(
    {
        SectionId: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            unique: true,
            ref: 'CourseSection',
            required: true,
        },
        Title: {
            type: String,
            required: true
        },
        LectureContent: {
            type: String
        },
        VideoURL: {
            type: String
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
    }, { collection: 'Lecture' }
)

module.exports = {
    Lecture: mongoose.model('Lecture', lecture)
}