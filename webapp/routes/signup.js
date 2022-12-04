const express = require('express')
const router = express.Router()
const jwt_auth = require('../API/jwt_auth');

const user_controller = require('../controllers/temp_user.controller');

router.use(jwt_auth.authorization);

router.get('/signup', (req, res, next) => {

    if (!req.obj) {
        res.redirect('/login');
        return;
    }

    if (req.obj.valid == true) { // Already login -> take back to home
        res.redirect('/');
        return;
    }


    let username = req.query.username;
    let role = req.query.format;
    let email = req.obj.email; // inspect login.js for more res.obj information

    if (role != 'learner' && role != 'lecturer') {
        res.redirect('/login');
    }

    // there's will be no 2 same email, so no need to handle special case here
    user_controller.createEmailName(email, username, role, (_1, _2, _3, _4) => {});
    
    // Now set the valid to true to actually authorized this user !
    let x = jwt_auth.loginHandle({ 
        name: username, 
        email: email, 
        valid: true // if signup success then change to true
    }, res)
    // Take back to home
    // Improvement: redirect to previous page ?
    x.redirect('/');
    return;
})

module.exports = router