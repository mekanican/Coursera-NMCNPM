const mongoose = require('mongoose')

const {CourseSection} = require('../models/course-section')
const {
    findBySectionId: findTest,
    create: createTest, 
    deleteSoftBySectionId: deleteSoftTest
} = require('./test.controller')
const {
    findBySectionId: findLecture,
    create: createLecture, 
    deleteSoftBySectionId: deleteSoftLecture
} = require('./lecture.controller')

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
            section.save().then(
                (savedSection) => {
                    callback(null, savedSection)
                },
                (newError) => {
                    callback(newError)
                }
            )
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
                courseSection.DeleteOn = Date.now()
                courseSection.save().then(
                    (savedSection) => {
                        callback(null, savedSection)
                    },
                    (error) => {
                        callback(error)
                    }
                )

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

/** 
 * This function is a promise.
 * Find all sections in the given course. The sections will be sorted by the SectionOrder.
 * Each section includes {CourseId, SectionId, Title, Type, SectionOrder}. List of sections will be passed in callback.
 * @param {ObjectId} courseId
 * @param {returnCallback} callback 
 */
const findAllByCourseId = async (courseId, callback) => {
    CourseSection.find(
        {
            "CourseId": courseId
        }
    ).
    sort({SectionOrder: 1}).
    then(
        (sections) => {            
            const createObject = async (object) => {
                sectionInformation = await object.SectionInformation
                return {
                        "CourseId": object.CourseId,
                        "SectionId": object._id,
                        "Type": object.Type,
                        "SectionOrder": object.SectionOrder,
                        "Title": sectionInformation.Title
                    }
            }
            
            const getSections = async () => {
                listObjects = []

                for (let section of sections) {
                    listObjects.push(await createObject(section))
                }
                return listObjects
            }    

            getSections().then(
                (listObject) => {
                    callback(null, listObject)
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
    updateOrder,
    deleteSoft,
    findAllByCourseId
}