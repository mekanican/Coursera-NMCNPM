const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');

router.use(jwt_auth.authorization);
router.get('/courses', (req, res) => {
    let username = req.obj.name;
    res.render('courses', {
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
    })
})

module.exports = router;