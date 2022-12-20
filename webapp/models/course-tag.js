const mongoose = require('mongoose')

const courseTag = mongoose.Schema(
    {
        TagName: {
            type: String,
            required: true
        }
    }, { collection: 'CourseTag' }
)

module.exports = {
    CourseTag: mongoose.model('CourseTag', courseTag)
}