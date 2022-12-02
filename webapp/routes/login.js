const express = require('express')
const router = express.Router()

// Get temp_user mongoDB model
const user_controller = require('../controllers/temp_user.controller');

const oauth = require('../API/google_oauth2');
const jwt_auth = require('../API/jwt_auth');

oauth(router, (name_, email_, res) => {
    // Query to database to find a user with corresponding email_
    user_controller.getName(email_, (err, returnObject) => {
        if (err) {
            console.log(err);
            res.status(503);
            return;
        }
        
        // If user is not in database -> signup
        if (!returnObject) {

            // Partial authorize user
            let x = jwt_auth.loginHandle({ 
                name: name_, 
                email: email_, 
                valid: false // if signup success then change to true
            }, res)
            x.render('signup', {
                username: name_,
                email: email_
            })
        } else {
            // Else -> authorize this user!
            userCustomName = returnObject.name
            let x = jwt_auth.loginHandle({ 
                name: userCustomName, 
                email: email_, 
                valid: true 
            }, res)
            x.status(200).redirect('/');
        }
    });
})

router.get('/login', (req, res, next) => {
    res.render("login")
})

module.exports = router