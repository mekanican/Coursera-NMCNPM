const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');

// Declare model
const {Certificate} = require('../models/certificate');

const get = (async (userId, courseId, callback) => {
  await Certificate.findOne(
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
})

const create = (async (userId, courseId, certificateImage, callback) => {
  await Certificate.create({
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
})

const updateImage = (async (userId, courseId, image, callback) => {
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

  await get(userId, courseId, callbackInGet)
})

const deleteSoft = (async (certificateId, callback) => {
  await Certificate.findOne(
    {
      "CertificateId": certificateId,
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
})

module.exports = {
  get,
  create,
  updateImage,
  deleteSoft
}