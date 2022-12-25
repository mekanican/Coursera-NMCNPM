const asyncHandler = require('express-async-handler');
const Mongoose = require('mongoose');
const { CourseSection } = require('../models/course-section');
const ObjectId = Mongoose.Types.ObjectId

const {create, get, updateOrder, deleteSoft, findAllByCourseId} = require('./course-section.controller')
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

  // create(
  //   ObjectId('639bed9aaf8d87cdcda35be8'),
  //   "Test",
  //   4,
  //   ObjectId('63a11297ac93c812500b5c07'),
  //   callback
  // )
  
  // updateOrder(
  //   ObjectId('63a5968d834e85fbfc891dbe'),
  //   1, 
  //   callback
  // ) 
  
  // deleteSoft(
  //   ObjectId('63a5968d834e85fbfc891dbe'),
  //   callback
  // )

  findAllByCourseId(
    ObjectId('639bed9aaf8d87cdcda35be8'),
    callback
  )
  res.status(200).json('OKE');
}) 

module.exports = {
  getGoals
}