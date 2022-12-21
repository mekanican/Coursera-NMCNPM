const asyncHandler = require('express-async-handler');
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId

const {findCoursesByTeacherId} = require('./course-teacher-authorization.controller')

// TODO: this is test function, delete after use
// route: /testget
const getGoals = asyncHandler(async (req, res) => {
  var callback = (error, object) => {
    if (error) {
      console.log(error)
    } else {
      console.log(object)
    }
  }

  findCoursesByTeacherId(
    ObjectId('639f5509965e46582a4447d2'),
    callback
  )
  
 


  res.status(200).json('OKE');
}) 

module.exports = {
  getGoals
}