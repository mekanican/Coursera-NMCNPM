const mongoose = require('mongoose')

const favoriteCourseSchema = new mongoose.Schema({
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
    }
}, { collection: 'FavoriteCourse' });

favoriteCourseSchema.index({UserId: 1, CourseId: 1}, {unique: true})

module.exports = {
    FavoriteCourse: mongoose.model('FavoriteCourse', favoriteCourseSchema)
}