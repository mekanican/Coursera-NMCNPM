const router = require('express').Router();
const jwt_auth = require('../API/jwt_auth')
const certificate_controller = require('../controllers/certificate.controller');
const user_controller = require('../controllers/temp_user.controller');
const CourseInformation = require('../models/course-information').CourseInformation;
const User = require('../models/user').User;

const getCert = require('../API/get_cert_and_save');

router.get('/certificate/:id', jwt_auth.authorization, (req, res) => {
    // 2 cases: id is of CertificateID
    // Or id is Course ID

    let courseID = req.params.id;
    CourseInformation.findById(courseID)
        .then(course => {
            if (!course) return res.sendStatus(404);
            user_controller.getName(req.obj.email, (err, user) => {
                if (err) {return res.sendStatus(503);} // Not reachable!
        
                certificate_controller.get(user._id, course._id, (err, certificate) => {
                    if (err) {
                        // first time access -> create
                        User.findById(course.CreatorId).then(creator => {
                            if (!creator) {return res.sendStatus(503);} // Not reachable!
                            getCert(user.FullName, course.CourseName, creator.FullName, (uri) => {
                                certificate_controller.create(user._id, course._id, uri, (err, cert) => {
                                    if (err) {
                                        console.log(err);
                                        return res.sendStatus(503);
                                    }
                                    res.redirect(cert.CertificateURI);
                                })
                            })
                        })
                        
                        
                    } else {
                        res.redirect(certificate.CertificateURI);
                    }
                })
            })

        }).catch(err => {
            res.sendStatus(503);
        })
})

module.exports = router;