const router = require('express').Router();
const converter = require('../API/ffmpeg_mp4_hls').converter;

router.get('/convert', (req, res) => {
    converter('Excαlibur.mp4');
    res.redirect('/all-courses')
})

module.exports = router;