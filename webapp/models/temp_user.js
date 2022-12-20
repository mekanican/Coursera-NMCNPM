const mongoose = require('mongoose'); // Erase if already required
//https://mongoosejs.com/docs/schematypes.html
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        index: true,
    }, 
    fullname: {
        type: String,
        required: true,
        unique: false,
        index: true,
    }, 
    gender: {
        type: Boolean,
        index: true,
    },
    birthday: {
        type: Date,
        index: true,
    }, 
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    }, 
    address: {
        type: String,
        required: false,
        unique: false,
        index: true,
    },
    datecreated: {
        type: Date,
        index: true,
    },
    lastmodified: {
        type: Date,
        index: true,
    }, 
    isactive: {
        type: Boolean,
        index: true,
    } 
}, { collection: 'User' });
/*
    //     validate: {
    //         validator: v => {
    //             return v == 'Learner' || v == 'Lecturer'
    //         }
    //     }
	//Number
*/
const CourseInformationSchema = new mongoose.Schema({
	
	coursename: {
        type: String,
        required: true,
        unique: false,
        index: true,
    }, courseid: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    }, description: {
        type: String,
        required: false,
        unique: false,
        index: true,
    }, tag: {
        type: Number,
        required: false,
        unique: false,
        index: true,
    }, rating: {
        type: mongoose.Schema.Types.Decimal128,
        required: false,
        unique: false,
        index: true,
    }, creatorid: {
        type: Number,
        required: true,
        unique: false,
        index: true,
    },
    datecreated: {
        type: Date,
        index: true,
    },
    lastmodified: {
        type: Date,
        index: true,
    }
}, { collection: 'CourseInformation' });
const NoteSchema = new mongoose.Schema({
	noteid: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		ref: 'User'
    },lectureid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		//ref: 'SectionLecture'
    }, notecontent: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },  
    datecreated: {
        type: Date,
        index: true,
    },
    lastmodified: {
        type: Date,
        index: true,
    }
}, { collection: 'Note' });


const ProgressTrackingSchema = new mongoose.Schema({
	progressid: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		ref: 'User'
    },courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		ref: 'CourseInformation'
    },TotalSectionFinished: {
        type: Number,
        required: true,
        index: true,
    },Streak: {
        type: Number,
        required: true,
        index: true,
    }
}, { collection: 'ProgressTracking' });
const FavoriteCourseSchema = new mongoose.Schema({
	favoritecourseid: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		ref: 'User'
    },courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
		ref: 'CourseInformation'
    }
}, { collection: 'FavoriteCourse' });
/*const TempSchema = new mongoose.Schema({
	
	coursename: {
        type: String,
        required: true,
        unique: false,
        index: true,
    }, courseid: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    }, description: {
        type: String,
        required: false,
        unique: false,
        index: true,
    }, rating: {
        type: mongoose.Schema.Types.Decimal128,
        required: false,
        unique: false,
        index: true,
    }, 
    datecreated: {
        type: Date,
        index: true,
    },
}, { collection: 'Name' });*/
//Export the model
///module.exports = mongoose.model('User', userSchema); 
//module.exports = mongoose.model('CourseInformation', CourseInformationSchema);
module.exports = {
  User: mongoose.model('User', userSchema),
  CourseInformation: mongoose.model('CourseInformation', CourseInformationSchema),
  ProgressTracking: mongoose.model('ProgressTracking', ProgressTrackingSchema),
  Note: mongoose.model('Note', NoteSchema),
  FavoriteCourse: mongoose.model('FavoriteCourse', FavoriteCourseSchema),
}