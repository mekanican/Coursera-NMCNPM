const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth')

// Mapping course ID -> data
const data = {
    "123456": {
        sections: [
            {
                subsections: [
                    {
                        content: "day la noi dung",
                        videoLink: "/course-data/abcxyz",
                        title: "P1.1. Luu thong hang hoa",
                        fileList: [
                            {
                                name: "file1.txt",
                                path: "/course-data/xx1xx.txt"
                            },
                            {
                                name: "file2.txt",
                                path: "/course-data/xxx2x.txt"
                            }
                        ]
                    }
                ],
                title: "P1. Nhung nguyen ly co ban cua chu nghia mac lenin"
            }
        ]
    }
};

router.get("/course_content", jwt_auth.authorization, (req, res) => {
    console.log(req.query.id);
    if (data.hasOwnProperty(req.query.id)) {
        let posSec = -1;
        let posSub = -1;
        if (req.query.sec && req.query.sub) {
            let a = parseInt(req.query.sec);
            let b = parseInt(req.query.sub);
            if (0 <= a && a < data[req.query.id].sections.length 
                && 0 <= b && b < data[req.query.id].sections[a].subsections.length) {
                    posSec = a;
                    posSub = b;
                }
        }
        res.render('course_content', {data: data[req.query.id], posSec: posSec, posSub: posSub});
    }
    else
        res.status(404);
})

module.exports = router