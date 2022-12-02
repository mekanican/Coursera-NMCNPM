const express = require('express')
const router = express.Router()

// Render index.ejs without param
router.get('/', (req, res, next) => {
    res.render("index")
})

module.exports = router