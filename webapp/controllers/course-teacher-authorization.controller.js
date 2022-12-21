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
  // TODO: assert that teacherId and courseId should be validated
  // User must be in Lecturer role
  // User and Course must not be deleted (hard or soft)

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

// TODO: create an update query

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
      let listQueries = []
      let listCourses = []

      for (let authorization of foundAuthorization) {
          listQueries.push(authorization.populate('CourseId'))
      }

      Promise.all(listQueries).then(
        docs => {
          for (let doc of docs) {
            listCourses.push(doc.CourseId)
          }

          callback(null, listCourses) 
        }
      )
    },
    (error) => {
      callback(error)
    }
  )
}

const findTeachersByCourseId = (courseId, callback) => {
  CourseTeacherAuthorization.find(
    {
      "CourseId": courseId
    }
  ).then(foundAuthorization => {
    let listQueries = []
    let listTeachers = []

      for (let authorization of foundAuthorization) {
          listQueries.push(authorization.populate('TeacherId'))
      }

      Promise.all(listQueries).then(
        docs => {
          for (let doc of docs) {
            listTeachers.push(doc.TeacherId)
          }

          callback(null, listTeachers) 
        }
      )
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