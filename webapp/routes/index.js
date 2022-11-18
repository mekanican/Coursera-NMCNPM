const express = require('express')
const router = express.Router()

router.use("/homepage", express.static("./public/homepage"))

router.get('/', (req, res, next) => {
    res.render("index")
})

module.exports = router