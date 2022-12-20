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
    createEmailName: (userid, email, name, role, callback) => {
        User.create({
            userid: userid,
            email: email,
            fullname: name,
            role: role,
			gender: true
        }).then(err => {
            if (!err) {
                callback(err);
            } else {
                callback(userid, email, name, role);
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
			lastmodified:lastmodified,
			isdeleted:false,
        }).then(err => {
            if (!err) {
                callback(err);
            } else { 
                callback(courseid);
            }
        })
    },
	deleteCourse: (deleted_courseid, callback) =>
	{
		//CourseInformation.dropIndex ({courseid:deleted_courseid})
		CourseInformation.findOneAndUpdate({courseid:deleted_courseid}, {isdelete:true}, {new:true}).then(err => {
            if (!err) {
					callback(err);
            } else {  
                //callback && callback(deleted_courseid);
            }
        })
	},
	createProgressTracking: (progressid, userid, courseid, totalsectionfinished, streak, callback)=>
	{
		ProgressTracking.create(
		{ 
			progressid:progressid, 
			userid:userid, 
			courseid:courseid, 
			totalsectionfinished:totalsectionfinished, 
			streak:streak
		}).then(err => {
            if (!err) {
                callback(err);
            } else {
                //	callback(courseid);
            }
        })
    }, 
	getProgressTracking: (progressid, callback)=>
	{
		ProgressTracking.findOne({progressid:progressid}).populate('user').
		exec(function (err, yes) {
			if (err)
			{
				callback(err);
			}
			else
			{
				console.log('TestProgressTracking: ', yes);
			};
		  });
	},
	createFavoriteCourse: (favoritecourseid, userid, courseid)=>
	{
		FavoriteCourse.create(
		{
			favoritecourseid:favoritecourseid, 
			userid:userid, 
			courseid:courseid, 
		}).then(err => {
            if (!err) {
                callback(err);
            } else {
                callback(favoritecourseid);
            }
        })
    }, 
	createNote: (noteid, userid, lectureid, notecontent, datecreated, lastmodified) =>
	{
		Note.create ({
			noteid:noteid, 
			userid:userid, 
			lectureid:lectureid, 
			notecontent:notecontent, 
			datecreated:datecreated, 
			lastmodified:lastmodified
		}).then(err => {
            if (!err) {
                callback(err);
            } else {
                callback(courseid);
            }
        })
	},
} 