const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'Long time in human life, Fate is so bad for nice people. Go through such difficult, I saw and had struggle feelings.'
//Tao Token moi khi tao nguoi dung hoac khi nhan duoc request login
function generateAccessToken(obj) {
    return jwt.sign(obj, TOKEN_SECRET, { expiresIn: '1d' });
}

module.exports = {
    //Verify token hien tai co ton tai (dung) khong
    authorization: (req, res, next) => {
        const token = req.cookies.access_token;
        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, TOKEN_SECRET);
            req.obj = data;
            return next();
        } catch {
            return res.sendStatus(403);
        }
    },
    loginHandle: (obj, res) => {
        const token = generateAccessToken(obj);

        res.cookie("access_token", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .redirect('/');
    }
}