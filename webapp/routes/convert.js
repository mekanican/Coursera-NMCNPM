const router = require('express').Router();
const jwt_auth = require('../API/jwt_auth')
const converter = require('../API/ffmpeg_mp4_hls').converter;

router.get('/convert', jwt_auth.authorization, (req, res) => {
    converter('ToanC.mp4', 'abcxyz');
    res.redirect('/');
})

module.exports = router;