const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');

router.use(jwt_auth.authorization);
router.get('/all-courses', (req, res) => {
    let username = req.obj.name;
    res.render('courses', {
        username: username,
        courses: [
            {
                title: "SQL",
                desciption: "Cơ sở dữ liệu"
            },
            {
                title: "DSA",
                description: "Thuật toán đại cương"
            }
        ]
    })
})

module.exports = router;