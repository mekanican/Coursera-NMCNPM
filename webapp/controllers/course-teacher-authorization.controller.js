const {CourseTeacherAuthorization} = require('../models/course-teacher-authorization');

const get = (async (teacherId, courseId, callback) => {
  await CourseTeacherAuthorization.findOne(
    {
      "TeacherId": teacherId,
      "CourseId": courseId
    }
  ).then(
    (authorization) => {
      if (!authorization) return callback("There is no authorization", null);
      else { 
        return callback(null, authorization);
      }
    },
    (error) => {
      return callback(error, null);
    }
  )
})

const create = (async (teacherId, courseId, callback) => {
  await CourseTeacherAuthorization.create({
    "TeacherId": teacherId,
    "CourseId": courseId
  }).then(
    (authorization) => {
        callback(null, authorization)
    },
    (error) => {
      callback(error)
    }
  )
})

//TODO: create an update query

const deleteHard = (async (authorizationId, callback) => {
  await CourseTeacherAuthorization.findByIdAndDelete(authorizationId).
  then(
    (foundAuthorization) => {
      if (!foundAuthorization) {
        return callback(`Authoization ${authorizationId.toString()} cannot be found`)
      } else {
        return callback(null, foundAuthorization)
      }
    },
    (error) => {
      return callback(error)
    }
  )
})

module.exports = {
  get,
  create,
  deleteHard
}