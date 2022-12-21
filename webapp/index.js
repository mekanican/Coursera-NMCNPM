const express = require('express');
const app = express();
const PORT = process.env.PORT || 12345
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

// ------- BEGIN OF SETUP -------
// Setup "view" folder use ejs engine ( https://ejs.co/ )
app.set("view engine", "ejs")

// For cookie handle
const cookieParser = require('cookie-parser');
app.use(cookieParser())
process.env.TOKEN_SECRET = 'Randomized Randomize'

// mongodb setup
InitMongoDBInstance();

// JWT
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true }))

// ------- END OF SETUP --------

// -- BEGIN OF ROUTE HANDLER ---

// Serve file in public folder!
app.use('/', express.static('./public'));
// endpoint '/convert' handle
app.use(require('./routes/convert'));
// endpoint '/' handle
app.use(require('./routes/index'));
// endpoint '/login' handle
app.use(require('./routes/login'));
// endpoint '/signup' handle
app.use(require('./routes/signup'));
// endpoint '/courses' handle
app.use(require('./routes/courses'));
// endpoint '/logout' handle
app.use(require('./routes/logout'));
// endpoint '/course_content/<id>'
app.use(require('./routes/course_content'));

// TODO: this debugging code needs cleaning after used
app.use(require('./routes/certificate'))

// ---- END OF ROUTE HANDLER ---
// SET PORT, default is 20222 if not defined in ENV
// Remember this is virtual port, not real port (can be the same)
app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})

function InitMongoDBInstance() {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    // Connect MongoDB at default port 27017.
    mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, {
        useNewUrlParser: true,
    }, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.');
            //set true neu la lan dau chay, chua co database, sau do nho set false
            mongoose.connection.db.listCollections().toArray(function(err, names) {
				if (err) {
					console.log(err);
				}
				else { 
					if (names.length == 0)
					{ 
						console.log ("database is empty, initializing database with data");
						const first_start_up = require('./controllers/temp_user.controller');
						first_start_up.createEmailName(1, 'notabotbytheway@gmail.com', 'CNPM', 'Role#1', (name, email) => {
							console.log(name, email);
						});
						first_start_up.createEmailName(2, 'bot@gmail.com', 'DMCS', 'Role#2', (name, email) => {
							console.log(name, email);
						});
						first_start_up.createEmailName(3, 'bot3@gmail.com', 'DMCS', 'Role#3', (name, email) => {
							console.log(name, email);
						});
						first_start_up.createEmailName(4, 'bot4@gmail.com', 'DMCS', 'Role#4', (name, email) => {
							console.log(name, email);
						});
						first_start_up.createCourse (1, "NMCNPM", "Description, ah yes",null,4.5,2,null,null,(err)=>
						{
							if (err!=1)
							{console.log ("createCourse Error"); console.log(err);};
						});
						first_start_up.createCourse (2, "DMCS", "Mon thu 2",null,1,3,null,null,(err)=>
						{
							if (err!=1)
							{console.log ("createCourse Error"); console.log(err);};
						});
						first_start_up.createCourse (3, "Course_nay_deleted", "Mon thu 3",null,1,4,null,null,(err)=>
						{
							if (err!=1)
							{console.log ("createCourse Error"); console.log(err);};
						});;
						first_start_up.deleteCourse (3,(err)=>
						{
							if (err!=1)
							{console.log ("DeleteCourse Error"); console.log(err);};
						});
						//first_start_up.createCourse (null, "courseNameIsRequired", "Tao course co ID null de khong course khac co id null duoc, ID la unique",null,null,-1,null,null,null);
						first_start_up.createProgressTracking (1, 1, 2,2,2);
						first_start_up.createProgressTracking (2, 1, 3,2,1);
						first_start_up.createProgressTracking (3, 2, 4,4,2);
						setTimeout(function(){
							console.log ("database should be filled with data now");
							console.log ("test populate de kiem tra reference:");
							first_start_up.getProgressTracking(2,(err)=>
								{ 
									if (err!=1)
									{console.log ("TestProgressTracking Error"); console.log(err);};
								}); 
						  //logic
						},5000); 
					};
				}
			});
        } else {
            // EXIT ON FAILED DATABASE INIT
            console.log('Error in DB connection: ' + err);
            console.log("The server is shutting down!, fix bug and try again!")
            process.exit(1);
        }
    });
}

