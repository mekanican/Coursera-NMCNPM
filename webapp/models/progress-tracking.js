const mongoose = require('mongoose')

const progressTracking = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseInformation',
        required: true,
        index: true,
	},
    TotalSectionFinished: {
        type: Number,
        required: true,
        default: 0
    },
    Streak: {
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'ProgressTracking' });

progressTracking.index({UserId: 1, CourseId: 1}, {unique: true})

module.exports = {
    ProgressTracking: mongoose.model('ProgressTracking', progressTracking)
}
