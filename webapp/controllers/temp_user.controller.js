//const {User, CourseInformation} = require('../models/temp_user');
const {User, CourseInformation, ProgressTracking, Note, FavoriteCourse} = require('../models/temp_user');

module.exports = {
    getName: (email, callback) => {
        User.findOne({ email: email }, 'fullname').then((returnObject, err) => {
            if (err) {
                callback("Cannot query", null); // better callback
            }

            callback(null, returnObject);
        })
    },
    createEmailName: (email, name, role, callback) => {
        User.create({
            email: email,
            fullname: name,
            role: role,
			gender: true
        }).then(err => {
            if (!err) {
                callback(err);
            } else {
                callback(null, email, name, role);
            }
        })
    },
	createCourse: (courseid, coursename, description, tag, rating, creatorid, datecreated, lastmodified, callback) => {
        CourseInformation.create({
            courseid:courseid, 
			coursename:coursename, 
			description:description, 
			tag:tag, 
			rating:rating, 
			creatorid:creatorid, 
			datecreated:datecreated, 
			lastmodified:lastmodified
        }).then(err => {
            if (!err) {
                callback(null);
            } else {
                //callback(email, name);
            }
        })
    },
	deleteCourse: (deleted_courseid, callback) =>
	{
		CourseInformation.dropIndex ({
		courseid:deleted_courseid}).then(err => {
            if (!err) {
                callback(null);
            } else {
                //callback(email, name);
            }
        })
	}
} 