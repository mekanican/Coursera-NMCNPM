const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    LectureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true,
        index: true,
    }, 
    NoteContent: {
        type: String,
        default: "Default content"
    },  
    DateCreated: {
        type: Date,
        default: Date.now()
    },
    LastModified: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'Note'})

//}, {  toObject: {virtuals:true}, collection: 'Note' });

// noteSchema.virtual('User', {
//   ref: 'User',
//   localField: 'UserId',
//   foreignField: 'UserId',
//   justOne: true // for many-to-1 relationships
// });

// noteSchema.virtual('Lecture', {
//   ref: 'Lecture',
//   localField: 'LectureId',
//   foreignField: 'SectionId',
//   justOne: true // for many-to-1 relationships
// });

module.exports = {
    Note: mongoose.model('Note', noteSchema)
}