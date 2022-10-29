const express = require('express');
const app = express();
const PORT = process.env.PORT || 12345
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD


// Session setup
const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' // Change later!
}));

// Passport setup

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Google AUTH

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '638129714576-tj4n4jo44t26j0q7043gd8k7n3046vnp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:20222/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
});


// mongodb setup
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// // Connect MongoDB at default port 27017.
// mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, {
//     useNewUrlParser: true,
//     //useCreateIndex: true,
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//         console.log('Error in DB connection: ' + err)
//     }
// });


//JWT
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

//app.use(express.urlencoded());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({
    extended: true
}))
//app.use(require('connect').bodyParser());
dotenv.config();
process.env.TOKEN_SECRET;
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
function generageTokenSecret ()
{
	console.log(require('crypto').randomBytes(64).toString('hex'))
	//Save output vao file .env
}
function loadTokenSecret ()
{
	const dotenv = require('dotenv');
	// get config vars
dotenv.config();
	// access config var
process.env.TOKEN_SECRET;
}
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '7200s' });
}
//generageTokenSecret ();
//Tao Token moi khi tao nguoi dung hoac khi nhan duoc request login
app.post('/api/createNewUser', (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

app.post('/api/login', (req, res) => {
   const token = generateAccessToken({ username: req.body.username });
  
   console.log(req.body);
   //res.json(req.body);
   
   res.json(token);
   //res.sendFile(path.join(__dirname + '/public/homepage/index.html'))
});

//Verify token hien tai co ton tai khong

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  //jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
//Nhan duoc request nao do, kiem tra token truoc khi thuc hien.
app.get('/api/userOrders', authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
})

//HET JWT



app.use('/', express.static('public'))

// Example : /API?a=123&b=456
app.get('/API', (req, res) => {
    console.log(`Get ${[req.query.a, req.query.b]}`)
    res.json({success : true})
})

const converter = require('./API/ffmpeg_mp4_hls').converter;

app.get('/convert', (req, res) => {
    converter('Excαlibur.mp4'); // Kiem tra kha nang chiu dung UTF 8 :)
    // Should be async ?
    res.redirect('/all-courses')
})

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
