const mongoose = require('mongoose')
const {Test} = require('./test')
const {Lecture} = require('./lecture')

const courseSection = mongoose.Schema(
    {
        CourseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseInformation",
            required: true
        },
        SectionOrder: {
            type: Number,
            required: true
        },
        Type: {
            type: String,
            enum:  ['Lecture', 'Test'],
            required: true
        },
        CreatorAuthorizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseTeacherAuthorization',
            required: true
        },
        DateCreated: {
            type: Date,
            default: Date.now()
        },
        LastModified: {
            type: Date,
            default: Date.now()
        },
        IsDeleted: {
            type: Boolean,
            default: false
        },
        DeleteOn: {
            type: Date,
            default: null
        }
    }, { collection: 'CourseSection' }
)

courseSection.index({CourseId: 1, SectionOrder: 1, DeleteOn: 1}, {unique: true})

//TODO: Need improvement here
courseSection.virtual('SectionInformation').
    get( async function() {
        if (this.Type == "Test") {
            var section = Test
        } else if (this.Type == "Lecture") {
            var section = Lecture
        }

        var returnObject = undefined

        await section.findOne({
            "SectionId": this._id,
            "IsDeleted": this.IsDeleted
        }).then(
            (object) => {
                if (object) {
                    returnObject = object
                }
            }
        )

        return returnObject
    })

module.exports = {
    CourseSection: mongoose.model('CourseSection', courseSection)
}