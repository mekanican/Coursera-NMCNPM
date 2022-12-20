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

module.exports = {
    CourseTeacherAuthorization: mongoose.model('CourseTeacherAuthorization', courseTeacherAuthorization)
}