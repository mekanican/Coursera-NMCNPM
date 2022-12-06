//const {User, CourseInformation} = require('../models/temp_user');
const {User, CourseInformation} = require('../models/temp_user');

module.exports = {
    getName: (email, callback) => {
        User.findOne({ email: email }, 'name').then((name, err) => {
            if (err) {
                console.log(err)
                callback(null);
            }
            if (!name) {
                callback(null);
            } else {
                callback(name);
            }
        })
    },
    createEmailName: (email, name, callback) => {
        User.create({
            email: email,
            fullname: name,
            role: "test_role",
			gender: true
        }).then(err => {
            if (!err) {
                callback(null);
            } else {
                callback(email, name);
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
    }
} 