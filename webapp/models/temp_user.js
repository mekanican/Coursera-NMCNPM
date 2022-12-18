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
//Export the model
///module.exports = mongoose.model('User', userSchema); 
//module.exports = mongoose.model('CourseInformation', CourseInformationSchema);
module.exports = {
  User: mongoose.model('User', userSchema),
  CourseInformation: mongoose.model('CourseInformation', CourseInformationSchema)
}