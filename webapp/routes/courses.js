const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');
const navbar_handle = require('../API/navbar_handle')

router.get('/courses', jwt_auth.authorization, (req, res) => {
    let username = req.obj.name;
    res.render('courses', Object.assign({
        username: username,
        courses: [
            {
                title: "SQL",
                description: "Cơ sở dữ liệu"
            },
            {
                title: "DSA",
                description: "Thuật toán đại cương"
            }
        ]
    }, navbar_handle.check(req)))
})

module.exports = router;