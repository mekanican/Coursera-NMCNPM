const express = require('express')
const router = express.Router()
const jwt_auth = require('../API/jwt_auth');

const user_controller = require('../controllers/temp_user.controller');
router.use("/sign-up", express.static("./public/sign-up"))

router.get('/sign-up', (req, res, next) => {
    console.log(req.query);
    let username = req.query.username;
    let email = req.query.email; // Vulnerable!!!, since user can inject custom payload through GET request
    // TODO: Request Forgery!
    let role = req.query.format;
    if (role != 'learner' && role != 'lecturer') {
        res.redirect('/login');
    }
    user_controller.createEmailName(email, username, role, (_1, _2, _3) => {});
    jwt_auth.loginHandle({ name: username, email: email, role: role, valid: true }, res);
    res.redirect('/');
    return;
})

module.exports = router