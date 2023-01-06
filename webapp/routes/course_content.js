const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth')

const CourseSectionController = require('../controllers/course-section.controller')
const LectureController = require('../controllers/lecture.controller')

router.get("/course_content/:id", jwt_auth.authorization, (req, res) => {
    CourseSectionController.findAllByCourseId(req.params.id, async (err, obj) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            console.log(obj);
            obj = await obj.map(elem => {
                return {
                    name: elem.Title,
                    id: elem.SectionId.toString(),
                    type: elem.type,
                    src: ""
                }
            })
            res.render('play-list', {
                data: obj,
                courseID: req.params.id
            })
        }
    })
})

router.get("/lecture_content/:type/:id", jwt_auth.authorization, (req, res) => {
    let type = req.params.type;
    let id = req.params.id

    if (type == 'Lecture') {
        LectureController.findBySectionId(id, (err, obj) => {
            if (err) {
                res.sendStatus(404);
            }
            res.json({
                videoUrl: obj.LectureContent
            });
        })
    } else {

    }
})

// API Related for course content

module.exports = router