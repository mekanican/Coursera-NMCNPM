module.exports = (app, callback) => {
    // Passport setup

    const passport = require('passport');
    var userProfile = null;

    app.use(passport.initialize());

    app.get('/success', (req, res) => {
        if (!userProfile)
            return;

        name_ = userProfile.displayName;
        email = userProfile.emails[0].value;

        callback(name_, email, res);
    });
    app.get('/error', (req, res) => res.redirect("/login"));

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
        passport.authenticate('google', { failureRedirect: '/error', session: false }),
        function (req, res) {
            res.redirect('/success');
        });
}