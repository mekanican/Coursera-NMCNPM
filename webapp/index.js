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
        } else {
            // EXIT ON FAILED DATABASE INIT
            console.log('Error in DB connection: ' + err);
            console.log("The server is shutting down!, fix bug and try again!")
            process.exit(1);
        }
    });
}

