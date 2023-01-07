const router = require('express').Router();
const jwt_auth = require('../API/jwt_auth')

const {User} = require('../models/user')
const {CourseInformation} = require('../models/course-information');
const {CourseSection} = require('../models/course-section');
const {CourseTeacherAuthorization} = require('../models/course-teacher-authorization');
const {Lecture} = require('../models/lecture');
const {Test} = require('../models/test');
const {Document} = require('../models/document');

router.get('/add', jwt_auth.authorization, async (req, res) => {
    let email = req.obj.email;
    let user = await User.findOne({Email: email});
    if (user.Role != 'lecturer') {
        return res.sendStatus(401); // Not authorized
    }
    // create new course

    let newCourse = await CourseInformation.create({
        CourseName: "Example course name",
		CreatorId: user._id
    })

    let auth = await CourseTeacherAuthorization.create({
		CourseId: newCourse._id,
		TeacherId: user._id
	})

    return res.redirect('course/' + newCourse._id.toString() + '/' + auth._id.toString());
})

router.get('/add/course/:courseID/:authID', async (req, res) => {
    let course = await CourseInformation.findById(req.params.courseID);
    let auth = await CourseTeacherAuthorization.findById(req.params.authID);
    if (!course || !auth) return res.sendStatus(404);
});

router.get('/add/test/:courseID/:authID', async (req, res) => {

})

router.post('/add/course/:courseID/:authID', async (req, res) => {

});

router.post('/add/test/:courseID/:authID', async (req, res) => {
    
})

module.exports = router;