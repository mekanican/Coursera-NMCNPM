const mongoose = require('mongoose')

const {CourseSection} = require('../models/course-section')
const {create: createTest, deleteSoftBySectionId: deleteSoftTest} = require('./test.controller')
const {create: createLecture, deleteSoftBySectionId: deleteSoftLecture} = require('./lecture.controller')

/**
 * @callback returnCallback
 * @param {String} error - Error returned in type of string.
 * @param {Object} object - Object returned after execution. 
 */

/**
 * Get course section by Object id.
 * @param {ObjectId} sectionId - sectionId is _id field got from CourseSection.
 * @param {returnCallback} callback
 */
const get = (sectionId, callback) => {
    CourseSection.findOne(
        {
            "_id": sectionId,
            "IsDeleted": false
        }
    ).then(
        (courseSection) => {
            if (!courseSection) {
                callback(`Section ${sectionId.toString()} does not exist`, null)
            } else {
                callback(null, courseSection)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

/**
 * Create a section in a course.
 * @param {ObjectId} courseId - CourseId is _id of the course in CourseInformation Schema. 
 * @param {string} type - Type must exist in the set of {"Lecture" or "Test"}.
 * @param {int} sectionOrder - Order of the section. It should be noted that two arbitrary sections in the same course cannot have same order. 
 * @param {ObjectId} creatorAuthorizationId - AuthorizationId of creator is got from CourseTeacherAuthorization Schema. 
 * @param {returnCallback} callback 
 */
const create = (courseId, type, sectionOrder, creatorAuthorizationId, callback) => {
    CourseSection.create({
        "CourseId": courseId,
        "Type": type,
        "SectionOrder": sectionOrder,
        "CreatorAuthorizationId": creatorAuthorizationId,
        "DateCreated": Date.now(),
        "LastModified": Date.now(),
        "IsDeleted": false
    }).then(
        (courseSection) => {
            if (!courseSection) {
                callback(`Section has not been created`, null)
            } else {
                callback(null, courseSection)
                if (courseSection.Type === "Test") {
                    createTest(
                        courseSection._id,
                        "Default title",
                        (error, object) => {}
                    )
                } else if (courseSection.Type === "Lecture") {
                    createLecture(
                        courseSection._id,
                        "Default title",
                        "Default content",
                        (error, object) => {}
                    )
                }
            }
        },
        (error) => {
            callback(error)
        }
    )
}

/**
 * Update order of a section.
 * @param {ObjectId} sectionId  
 * @param {int} sectionOrder - New order of a section.
 * @param {returnCallback} callback 
 */
const updateOrder = (sectionId, sectionOrder, callback) => {
    var callbackInGet = (error, section) => {
        if (!error) {
          section.SectionOrder = sectionOrder
          section.LastModified = Date.now()
          section.save()
          callback(null, section)
        } else {
          callback(error)
        }
      }
    get(sectionId, callbackInGet)
}

/**
 * Soft-delete the section.
 * @param {ObjectId} sectionId 
 * @param {returnCallback} callback 
 */
const deleteSoft = (sectionId, callback) => {
    CourseSection.findOne(
        {
            "_id": sectionId,
            "IsDeleted": false
        }
    ).then(
        (courseSection) => {
            if (!courseSection) {
                callback(`Section ${sectionId.toString()} does not exist`, null)
            } else {
                courseSection.IsDeleted = true
                courseSection.LastModified = Date.now()
                courseSection.save()

                if (courseSection.Type == "Test") {
                    deleteSoftTest(
                        courseSection._id,
                        (error, object) => {}
                    )
                } else if (courseSection.Type == "Lecture") {
                    deleteSoftLecture(
                        courseSection._id,
                        (error, object) => {}
                    )
                }
                callback(null, courseSection)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

module.exports = {
    get,
    create,
    updateOrder,
    deleteSoft
}