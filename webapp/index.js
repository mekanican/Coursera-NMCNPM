const express = require('express');
const app = express();
const PORT = process.env.PORT || 12345
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

app.set("view engine", "ejs")

// Session setup
// const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser())

process.env.TOKEN_SECRET = 'Long time in human life, Fate is so bad for nice people. Go through such difficult, I saw and had struggle feelings.'

// require('./API/google_oauth2')(app);


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
        // create temp user
        if (false) require('./controllers/temp_user.controller')
            .createEmailName('notabotbytheway@gmail.com', 'CNPM');
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


//JWT

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }))

// process.env.TOKEN_SECRET;



//HET JWT

// Secure video folder in public!
// app.use((req, res, next) => {
//     if (req.url.match(/^\/hls_videos\//)) {
//         // Todo: checking things
//     } else {
//         next();
//     }
// })

// app.use('/', express.static('public'))

// Example : /API?a=123&b=456
// app.get('/API', (req, res) => {
//     console.log(`Get ${[req.query.a, req.query.b]}`)
//     res.json({ success: true })
// })

app.use('/img', express.static('./public/img'))

app.use(require('./routes/convert'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/signup'));

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
