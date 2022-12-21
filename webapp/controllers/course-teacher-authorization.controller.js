const {CourseTeacherAuthorization} = require('../models/course-teacher-authorization');

const get = (teacherId, courseId, callback) => {
  CourseTeacherAuthorization.findOne(
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
}

const create = (teacherId, courseId, callback) => {
  CourseTeacherAuthorization.create({
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
}

//TODO: create an update query

const deleteHard = (authorizationId, callback) => {
  CourseTeacherAuthorization.findByIdAndDelete(authorizationId).
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
}

const findCoursesByTeacherId = (teacherId, callback) => {
  CourseTeacherAuthorization.find(
    {
      "TeacherId": teacherId
    }
  ).then(
    (foundAuthorization) => {
      console.log(foundAuthorization)
    },
    (error) => {
      callback(error)
    }
  )
}

module.exports = {
  get,
  create,
  deleteHard,
  findCoursesByTeacherId
}