const {Test} = require('../models/test')

const get = (testId, callback) => {
    Test.findOne(
        {
            "_id": testId,
            "IsDeleted": false
        }
    ).then(
        (test) => {
            if (!test) {
                callback(`Test ${testId.toString()} does not exist`, null)
            } else {
                callback(null, test)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

const create = (sectionId, title, callback) => {
    Test.create({
        "SectionId": sectionId,
        "Title": title,
        "DateCreated": Date.now(),
        "LastModified": Date.now(),
        "IsDeleted": false
    }).then(
        (test) => {
            if (!test) {
                callback(`Test has not been created`, null)
            } else {
                callback(null, test)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

//TODO: create an update query

const deleteSoftBySectionId = (sectionId, callback) => {
    Test.findOne(
        {
            "SectionId": sectionId,
            "IsDeleted": false
        }
    ).then(
        (test) => {
            if (!test) {
                callback(`Section ${sectionId.toString()} does not exist`, null)
            } else {
                test.IsDeleted = true
                test.LastModified = Date.now()
                test.save()
                callback(null, test)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

module.exports = {
    get,
    create,
    deleteSoftBySectionId
}