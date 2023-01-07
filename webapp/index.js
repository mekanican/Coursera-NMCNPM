const express = require('express');
const mongoose = require('mongoose')
const {User} = require('./models/user')
const {CourseInformation} = require('./models/course-information');
const {CourseSection} = require('./models/course-section');
const {CourseTeacherAuthorization} = require('./models/course-teacher-authorization');
const {Lecture} = require('./models/lecture');
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
// endpoint '/certificate/<id>'
app.use(require('./routes/certificate'));

// endpoint '/add'
app.use(require('./routes/add'));

// TODO: this debugging code needs cleaning after used
app.use(require('./routes/debug'))

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
			User.findOne({}).then(
				(object) => {
					if (!object) {
						f()
					} else {
						const Course = require('./models/course-information').CourseInformation;
						Course.findOne({}).then(obj => console.log(obj));
					}
				}
			)

        } else {
            // EXIT ON FAILED DATABASE INIT
            console.log('Error in DB connection: ' + err);
            console.log("The server is shutting down!, fix bug and try again!")
            process.exit(1);
        }
    });
}

async function f() {
	console.log ("database is empty, initializing database with data");

	// User creation
	let user1 = await User.create({
		Role: "lecturer",
		FullName: "Nghia",
		Email: "boommerang73@gmail.com",
	});

	let user2 = await User.create({
		Role: "learner",
		FullName: "BOT",
		Email: "notabotbytheway@gmail.com",
	})

	console.log(user1)
	console.log(user2)

	// course creation
	let course1 = await CourseInformation.create({
		CourseName: "NMLT",
		Description: "ABCXYZ",
		CreatorId: user1._id
	})

	let course2 = await CourseInformation.create({
		CourseName: "OOP",
		Description: "123456",
		CreatorId: user1._id
	})

	console.log(course1)
	console.log(course2)

	// Section creation

	let auth1 = await CourseTeacherAuthorization.create({
		CourseId: course1._id,
		TeacherId: user1._id
	})

	let section1 = await CourseSection.create({
		CourseId: course1._id,
		SectionOrder: 1,
		Type: "Lecture",
		CreatorAuthorizationId: auth1._id,
	})

	let lecture1 = await Lecture.create({
		SectionId: section1._id,
		Title: "Nhung nguyen ly co ban v1",
		LectureContent: "/course-data/abcxyz"
	})

	let section2 = await CourseSection.create({
		CourseId: course1._id,
		SectionOrder: 2,
		Type: "Lecture",
		CreatorAuthorizationId: auth1._id,
	})

	let lecture2 = await Lecture.create({
		SectionId: section2._id,
		Title: "Nhung nguyen ly co ban v2",
		LectureContent: "/course-data/abcxyz"
	})

	console.log(auth1)
	console.log(section1)
	console.log(lecture1)
	console.log(section2)
	console.log(lecture2)
}