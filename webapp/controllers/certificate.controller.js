const asyncHandler = require('express-async-handler');

const {Certificate} = require('../models/certificate');
/**
 * @callback returnCallback
 * @param {String} error - Error returned in type of string.
 * @param {Object} object - Object returned after execution. 
 */


/**
 * Get certificate through UserId and CourseId
 * @param {ObjectId} userId  - UserId is _id field got from User Schema.
 * @param {ObjectId} courseId - CourseId is _id field got from Course Schema.
 * @param {returnCallback} callback 
 */
const get = (userId, courseId, callback) => {
  Certificate.findOne(
    {
      "UserId": userId,
      "CourseId": courseId,
      "IsDeleted": false
    }
  ).then(
    (certificate) => {
      if (!certificate) return callback("No certificate has been found", null);
      else { 
        return callback(null, certificate);
      }
    },
    (error) => {
      return callback(error, null);
    }
  )
}

/**
 * Create a certificate document. It is noted that the certificateImage is a string of 64-based encoded image.
 * @param {ObjectId} userId  - UserId is _id field got from User Schema.
 * @param {ObjectID} courseId - CourseId is _id field got from Course Schema.
 * @param {string} certificateImage - A string of 64-based encoded image.
 * @param {returnCallback} callback 
 */
const create = (userId, courseId, certificateImage, callback) => {
  Certificate.create({
    "DateComplete": Date.now(),
    "UserId": userId,
    "CourseId": courseId,
    "CertificateURI": certificateImage,
    "IsDeleted": false
  }).then(
    (certificate) => {
        callback(null, certificate)
    },
    (error) => {
      callback(error)
    }
  )
}

/**
 * Update image of certificate
 * @param {ObjectId} userId  - UserId is _id field got from User Schema.
 * @param {ObjectID} courseId - CourseId is _id field got from Course Schema.
 * @param {string} image - A string of new 64-based encoded image.
 * @param {returnCallback} callback 
 */
const updateImage = (userId, courseId, image, callback) => {
  var callbackInGet = (error, certificate) => {
    if (!error) {
      certificate.update(
        {
          "CertificateURI": image
        }
      )
      callback(null, certificate)
    } else {
      callback(error)
    }
  }

  get(userId, courseId, callbackInGet)
}

/**
 * Soft-delete the certificate.
 * @param {ObjectId} certificateId - Certificate _id.
 * @param {returnCallback} callback 
 */
const deleteSoft = (certificateId, callback) => {
  Certificate.findOne(
    {
      "_id": certificateId,
      "IsDeleted": false
    }).then(
    (foundCertificate) => {
      if (!foundCertificate){
        return callback(`Certificate ${certificateId.toString()} cannot be found`)
      } else {
        foundCertificate.IsDeleted = true
        foundCertificate.save()
        return callback(null, foundCertificate)
      }
    },
    (error) => {
      return callback(error)
    }
  )
}

module.exports = {
  get,
  create,
  updateImage,
  deleteSoft
}