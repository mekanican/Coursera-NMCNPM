const mongoose = require('mongoose')

const document = new mongoose.Schema(
    {
        CourseSectionId: {
          type: mongoose.Types.ObjectId,
          ref: "CourseSection",
          required: true,
          index: true  
        },
        UploaderId: {
            type: mongoose.Types.ObjectId,
            ref: "CourseTeacherAuthorization",
            required: true,
            index: true
        },
        FileName: {
            type: String,
            required: true,
            index: true
        },
        FilePath: {
            type: String,
            required: true,
            index: true
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
            default: false,
            required: true
        }
    }, { collection: "Document"}
)

module.exports = {
    Document: mongoose.model("Document", document)
}