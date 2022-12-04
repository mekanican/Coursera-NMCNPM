const jwt_auth = require('../API/jwt_auth')


// Use auth or not based on cookies
const decide = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next();
    } else {
        return jwt_auth.authorization(req, res, next);
    }
}

module.exports = {
    middleware: decide,
    check: req => {
        let signedIn = false
        let name = ""
        if (req.obj && req.obj.valid) {
            signedIn = true
            name = req.obj.name
        }
        return {
            signedIn: signedIn,
            name: name
        }
    }
};