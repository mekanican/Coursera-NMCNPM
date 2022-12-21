const asyncHandler = require('express-async-handler');

// Declare model
const {Certificate} = require('../models/certificate');

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

const deleteSoft = (certificateId, callback) => {
  Certificate.findOne(
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
}

module.exports = {
  get,
  create,
  updateImage,
  deleteSoft
}