const user_controller = require('../controllers/temp_user.controller');

module.exports = app => {
    // Passport setup

    const passport = require('passport');
    var userProfile = null;

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/success', (req, res) => {
        name_ = userProfile.displayName;
        email = userProfile.emails[0].value;
        req.session.userProfile = {}

        if (!user_controller.getName(email)) {
            req.session.userProfile.email = email
            req.session.userProfile.name = name_
            res.redirect('/sign-up/sign-up.html')
        } else {
            // user_controller.getName()
            // Todo: apply JWT here
            res.redirect('/')
        }
    });
    app.get('/error', (req, res) => res.redirect("/log-in/log-in.html"));

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
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
        function (accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        }
    ));

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/success');
        });
}