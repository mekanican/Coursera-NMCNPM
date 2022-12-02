const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET + process.env.TOKEN_SECRET; // double security™
//Tao Token moi khi tao nguoi dung hoac khi nhan duoc request login
function generateAccessToken(obj) {
    return jwt.sign(obj, TOKEN_SECRET, { expiresIn: '1d' });
}


module.exports = {
    //Verify token hien tai co ton tai (dung) khong
    // usage: đây là middleware, có thể dùng ở đầu mỗi endpoint để chắc chắn
    // người dùng đã đăng nhập (dựa trên token đã tạo ở "loginHandle" phía dưới)
    
    // Ví dụ:
    // app.get('/api/userOrders', authorization, (req, res) => {
    //     // executes after authorization
    //     // ...
    // })
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
    // Create token cho obj hien tai (thong tin nguoi dung), sau do set cookie
    // Va quay lai '/' (trang chu)
    loginHandle: (obj, res) => {
        const token = generateAccessToken(obj);

        return res.cookie("access_token", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
        })
            // .status(200)
            // .redirect('/');
    }
}