const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth')

const CourseSectionController = require('../controllers/course-section.controller')
const LectureController = require('../controllers/lecture.controller')

// Mapping course ID -> data
const data2 = {
    "123456": {
        sections: [
            {
                name: "Nhung nguyen ly co ban cua chu nghia mac lenin",
                src: "/course-data/abcxyz",
                id: "vid_1",
            },
            {
                name: "A",
                src: "",
                id: "vid_2",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_3",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_4",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_5",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_6",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_7",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_8",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_9",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_10",
            },
            {
                name: "B",
                src: "/course-data/abcxyz",
                id: "vid_11",
            }
        ]
    }
}

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
                data: obj
            })
        }
    })

    // if (data2.hasOwnProperty(req.params.id)) {
    //     res.render('play-list', {data: data2[req.params.id]});
    // }
    // else
    //     res.sendStatus(404);
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