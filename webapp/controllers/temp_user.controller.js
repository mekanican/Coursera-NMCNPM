const {User} = require('../models/user')
const {CourseInformation} = require('../models/course-information')
const {ProgressTracking} = require('../models/progress-tracking')
const {Note} = require('../models/note')
const {FavoriteCourse} = require('../models/favorite-course')

module.exports = {
	getNumberOfAccount: async (callback) => {
		numDocs = await User.estimatedDocumentCount()
		callback(null, numDocs)
	},
    getName: (email, callback) => {
        User.findOne({ 'Email': email }, 'FullName').then((returnObject, err) => {
            if (err) {
                callback("Cannot query", null); // better callback
            }

            callback(null, returnObject);
        })
    }, 
    createEmailName: (email, name, role, callback) => {
        User.create({
            'Email': email,
            'FullName': name,
            'Role': role
        }).then(err => {
            if (err) { // todo
                callback(err);
            } else {
                callback(email, name, role);
            }
        })
    },
	createCourse: (courseName, description, tag, rating, creatorId, callback) => {
        CourseInformation.create({
			'CourseName':courseName, 
			'Description':description, 
			'Tag':tag, 
			'Rating':rating, 
			'CreatorId':creatorId, 
			'DateCreated': Date.now(), 
			'LastModified': Date.now(),
			'IsDeleted': false
        }).then(
			(returnedObject) => {
				if (returnedObject) {
					callback(null, returnedObject)
				} else {
					callback('Course has not been created')
				}
			},
			(error) => {
				callback(error)
			}
		)
    },
	deleteCourse: (courseId, callback) =>
	{
		//CourseInformation.dropIndex ({courseid:deleted_courseid})
		CourseInformation.findOneAndUpdate(
			{
				'CourseId': courseId,
				'IsDeleted': false
			}, 
			{
				'IsDeleted' :true
			}, 
			{
				new:true
			}).then(
				(returnedObject) => {
					if (returnedObject) {
						callback(null, returnedObject)
					} else {
						callback(`Course ${courseId.toString()} cannot be found`)
					}
				},
				(error) => {
					callback(error)
				}
			)
	},
	createProgressTracking: (userId, courseId, totalSectionFinished, streak, callback)=>
	{
		ProgressTracking.create(
		{
			'UserId':userId, 
			'CourseId':courseId, 
			'TotalSectionFinished':totalSectionFinished, 
			'Streak':streak
		}).then(
			(returnedObject) => {
				if (returnedObject) {
					callback(returnedObject)
				} else {
					callback('Progress has not been created')
				}
			},
			(error) => {
				callback(error)
			}
		)
    }, 
	getProgressTracking: (progressId, callback)=>
	{
		ProgressTracking.findOne(
			{
				'ProgressId': progressId
			})
		.populate('User')
		.exec(function (err, yes) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, yes)
			}
		  })
	},
	createFavoriteCourse: (userId, courseId, callback) =>
	{
		FavoriteCourse.create(
		{
			'UserId' : userId, 
			'CourseId' : courseId
		}).then(
			(returnedObject) => {
				if (returnedObject) {
					callback(returnedObject)
				} else {
					callback('Favorite has not been created')
				}
			},
			(error) => {
				callback(error)
			}
		)
    }, 
	createNote: (userId, lectureId, noteContent, callback) =>
	{
		Note.create ({
			'UserId' :userId, 
			'LectureId': lectureId, 
			'NoteContent': noteContent, 
			'DateCreated': Date.now(), 
			'LastModified': Date.now()
		}).then(
			(returnedObject) => {
				if (returnedObject) {
					callback(returnedObject)
				} else {
					callback('Note has not been created')
				}
			},
			(error) => {
				callback(error)
			}
		)
	},
} 
