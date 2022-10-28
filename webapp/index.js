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



app.use('/', express.static('public'))

// Example : /API?a=123&b=456
app.get('/API', (req, res) => {
    console.log(`Get ${[req.query.a, req.query.b]}`)
    res.json({success : true})
})

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
