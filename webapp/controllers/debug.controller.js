const asyncHandler = require('express-async-handler');
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId
const {get, create, updateOrder, deleteSoft} = require('./course-section.controller')
const {create: createTest} = require('./test.controller')
const {create: createLecture} = require('./lecture.controller')
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

  // await create(
  //   ObjectId('63a1134a3d481821ef97f97e'),
  //   "Lecture",
  //   1,
  //   ObjectId('63a11297ac93c812500b5c07'),
  //   callback
  // )

  await deleteSoft(
    ObjectId('63a1196eb881e936b3d1b69d'),
    callback
  )
 


  res.status(200).json('OKE');
}) 

module.exports = {
  getGoals
}