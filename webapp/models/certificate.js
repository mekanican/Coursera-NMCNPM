const mongoose = require('mongoose')

const certificate = mongoose.Schema(
    {
        DateComplete: Date,
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        CourseId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseInformation",
            required: true
        },
        CertificateURI: {
            type: String,
            required: true
        }
    }, { collection: 'Certificate'}
)

module.exports = {
    Certificate: mongoose.model('Certificate', certificate)
}