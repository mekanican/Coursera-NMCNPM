const express = require('express');
const app = express();

const PORT = process.env.PORT || 12345
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD


// Session setup
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'Long time in human life, Fate is so bad for nice people. Go through such difficult, I saw and had struggle feelings.'
    // Hyper secure btw!
}));

require('./API/google_oauth2')(app);


// mongodb setup
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, {
    useNewUrlParser: true,
    //useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



app.use('/', express.static('public'))

// Example : /API?a=123&b=456
app.get('/API', (req, res) => {
    console.log(`Get ${[req.query.a, req.query.b]}`)
    res.json({ success: true })
})

const converter = require('./API/ffmpeg_mp4_hls').converter;

app.get('/convert', (req, res) => {
    converter('Excαlibur.mp4');
    res.redirect('/all-courses')
})

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
