const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth')

router.get("/logout", jwt_auth.authorization, (req, res) => {
    return res
        .clearCookie("access_token")
        .redirect('/');
})

module.exports = router