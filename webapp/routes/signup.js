const express = require('express')
const router = express.Router()

router.use("/sign-up", express.static("./public/sign-up"))

router.get('/sign-up', (req, res, next) => {
    res.render("signup", {
        username: "",
        email: ""
    })
})

module.exports = router