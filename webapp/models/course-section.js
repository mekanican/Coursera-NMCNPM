const mongoose = require('mongoose')

const courseSection = mongoose.Schema(
    {
        CourseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseInformation",
            required: true
        },
        SectionOrder: {
            type: Number,
            required: true
        },
        Type: {
            type: String,
            enum:  ['Lecture', 'Test'],
            required: true
        },
        CreatorAuthorizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseTeacherAuthorization',
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
    }, { collection: 'CourseSection' }
)

courseSection.index({CourseId: 1, SectionOrder: 1}, {unique: true})

module.exports = {
    CourseSection: mongoose.model('CourseSection', courseSection)
}