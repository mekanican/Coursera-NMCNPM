const {Lecture} = require('../models/lecture')

const get = async (lectureId, callback) => {
    await Lecture.findOne(
        {
            "_id": lectureId,
            "IsDeleted": false
        }
    ).then(
        (lecture) => {
            if (!lecture) {
                callback(`Lecture ${lectureId.toString()} does not exist`, null)
            } else {
                callback(null, lecture)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

const create = async (sectionId, title, content, callback) => {
    await Lecture.create({
        "SectionId": sectionId,
        "Title": title,
        "LectureContent": content,
        "DateCreated": Date.now(),
        "LastModified": Date.now(),
        "IsDeleted": false
    }).then(
        (lecture) => {
            if (!lecture) {
                callback(`Lecture has not been created`, null)
            } else {
                callback(null, lecture)
            }
        },
        (error) => {
            callback(error)
        }
    )
}

const updateContent = async (lectureId, content, callback) => {
    var callbackInGet = (error, lecture) => {
        if (!error) {
          lecture.LectureContent = content
          lecture.LastModified = Date.now()
          lecture.save()
          callback(null, lecture)
        } else {
          callback(error)
        }
      }
    await get(lectureId, callbackInGet)
}

const deleteSoftBySectionId = async (sectionId, callback) => {
    await Lecture.findOne(
        {
            "SectionId": sectionId,
            "IsDeleted": false
        }
    ).then(
        (lecture) => {
            if (!lecture) {
                callback(`Section ${sectionId.toString()} does not exist`, null)
            } else {
                lecture.IsDeleted = true
                lecture.LastModified = Date.now()
                lecture.save()
                callback(null, lecture)
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
    updateContent,
    deleteSoftBySectionId
}