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
var connection = mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, {
    useNewUrlParser: true, 
    //useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
        //set true neu la lan dau chay, chua co database, sau do nho set false
        if (true)
		{
			const first_start_up = require('./controllers/temp_user.controller');
            first_start_up.createEmailName('notabotbytheway@gmail.com', 'CNPM', (name, email) => {
                console.log(name, email);
            });
			first_start_up.createCourse (1, "NMCNPM", "Description, ah yes",null,4.5,2,null,null,null);
			first_start_up.createCourse (2, "DMCS", "Mon thu 2",null,1,3,null,null,null);
		}; 
    } else {
        console.log('Error in DB connection: ' + err)
		console.log(MONGO_USERNAME);
		console.log(MONGO_PASSWORD); 
    } 
});

//var InitDB = require('./init-db.js');
//InitDB.init_db(); 

//JWT

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }))

// process.env.TOKEN_SECRET;


const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.username = data.username;
	console.log ("USERNAME: ");
	console.log(data.username);
    //req.userRole = data.role;
    return next();
  } catch {
	console.log ("Login failed");
    return res.sendStatus(403);
  }
};

//Nhan duoc request nao do, kiem tra token truoc khi thuc hien.
app.post('/api/testt', authorization, (req, res) => {
  // executes after authorization
  res.json({ message: "test JWT" });
  // ...
})

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
app.use(require('./routes/courses'));

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
//console.log (`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`)
