const express = require('express')
const router = express.Router()

const navbar_handle = require('../API/navbar_handle')

router.get('/', navbar_handle.middleware, (req, res, next) => {
    res.render("index", navbar_handle.check(req))
})

module.exports = router