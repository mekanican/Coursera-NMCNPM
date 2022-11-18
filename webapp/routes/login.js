const express = require('express')
const router = express.Router()

const user_controller = require('../controllers/temp_user.controller');
const oauth = require('../API/google_oauth2');

const jwt_auth = require('../API/jwt_auth');


//Nhan duoc request nao do, kiem tra token truoc khi thuc hien.
// app.get('/api/userOrders', authorization, (req, res) => {
//     // executes after authorization
//     // ...
// })

oauth(router, (name_, email_, res) => {
    user_controller.getName(email_, userCustomName => {
        console.log(userCustomName);
        if (!userCustomName) {
            res.render('signup', {
                username: name_,
                email: email_
            })
        } else {
            userCustomName = userCustomName.name
            // user_controller.getName()
            jwt_auth.loginHandle({ name: userCustomName, email: email_, valid: true }, res)
        }
    });
})

router.use("/log-in", express.static("./public/log-in"))

router.get('/log-in', (req, res, next) => {
    res.render("login")
})

module.exports = router