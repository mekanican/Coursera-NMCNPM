const mongoose = require('mongoose')

const courseTeacherAuthorization = mongoose.Schema(
    {
        CourseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseInformation",
            required: true
        },
        TeacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, { collection: 'CourseTeacherAuthorization' }
)

courseTeacherAuthorization.index({CourseId: 1, TeacherId: 1}, {unique: true})

module.exports = {
    CourseTeacherAuthorization: mongoose.model('CourseTeacherAuthorization', courseTeacherAuthorization)
}