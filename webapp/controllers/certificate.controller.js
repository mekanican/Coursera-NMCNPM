const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');

// Declare model
const {Certificate} = require('../models/certificate');
const {User, CourseInformation} = require('../models/temp_user');


// TODO: this is test function, delete after use
// route: /testget
const getGoals = asyncHandler(async (req, res) => {
  // Create a new record 
  // await createCertificate(
  //   mongoose.Types.ObjectId('639f5509965e46582a4447d2'),
  //   mongoose.Types.ObjectId('639bed9aaf8d87cdcda35be9'),
  //   "abcd123",
  //   (err, object) => {
  //     if (!err){
  //       console.log("Create successfully")
  //       console.log(object.toString())
  //     } else {
  //       console.log(err)
  //     }
  //   }
  //   )

  // Find and delete a record
  //  await getCertificate(
  //       mongoose.Types.ObjectId('639e4dddca85db4b1bae53ab'),
  //       mongoose.Types.ObjectId('639e4f1eca85db4b1bae53af'),
  //       (errorMessage, object) => {
  //         if (!errorMessage) {
  //           console.log(object._id.toString())
  //           deleteCertificate(
  //             object._id,
  //             (err, foundCertificate) => {
  //               if (!err) {
  //                 console.log('Delete successfully')
  //                 console.log(foundCertificate.toString())
  //               } else {
  //                 console.log(err)
  //                 console.log('No certificate has been found')
  //               }
  //             }
  //           )
  //         } else {
  //           console.log("Error")
  //         }
  //       }
  //   )

  // Check reference document
  // await getCertificate(
  //   mongoose.Types.ObjectId('639f5509965e46582a4447d2'),
  //   mongoose.Types.ObjectId('639bed9aaf8d87cdcda35be9'),
  //   (error, certificate) => {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     console.log(certificate)
  //     certificate.populate('UserId').then(
  //       (certificate) => {
  //         console.log(certificate.UserId)
  //       },
  //       (error) => {
  //         console.log('Error happened in population')
  //         console.log(error)
  //       }
  //     )
  //   }
  // )

  // Test update
  // await updateCertificateImage(
  //   mongoose.Types.ObjectId('639f557b43de820e3882de7a'),
  //   'new image uri',
  //   (error, newCertificate) => {
  //     if (error) {
  //       console.log(error)
  //     } else {
  //       console.log(newCertificate)
  //     }
  //   })

  res.status(200).json('OKE');
}) 

const getCertificate = (async (userId, courseId, callback) => {
  await Certificate.findOne(
    {
      "UserId": userId,
      "CourseId": courseId
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

const createCertificate = (async (userId, courseId, certificateImage, callback) => {
  await Certificate.create({
    "DateComplete": Date.now(),
    "UserId": userId,
    "CourseId": courseId,
    "CertificateURI": certificateImage
  }).then(
    (certificate) => {

        callback(null, certificate)
    },
    (error) => {
      callback(error)
    }
  )
})

const updateCertificateImage = (async (certificateId, image, callback) => {
  await Certificate.findByIdAndUpdate(certificateId, 
    { "CertificateURI": image}
    ).then(
      (foundCertificate) => {
        return callback(null, foundCertificate)
      },
      (error) => {
        return callback(error)
      }
    )
})

const deleteCertificate = (async (certificateId, callback) => {
  await Certificate.findByIdAndDelete(certificateId).then(
    (foundCertificate) => {
      if (!foundCertificate){
        return callback(`Certificate ${certificateId.toString()} cannot be found`)
      } else {
        return callback(null, foundCertificate)
      }
    },
    (error) => {
      return callback(error)
    }
  )
})

module.exports = {
  getGoals,
  createCertificate,
  getCertificate,
  updateCertificateImage,
  deleteCertificate
}