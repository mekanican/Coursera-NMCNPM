const {Document} = require('../models/document')

const get = (documentId, callback) => {
    Document.findOne(
        {
            "_id": documentId,
            "IsDeleted": false
        }
    ).then(
        (document) => {
            if (!document) {
                return callback(`Document ${documentId.toString()} does not exist!`)
            }

            return callback(null, document)
        },
        (error) => {
            return callback(error)
        }
    )
}

const create = (courseSectionId, uploaderId, fileName, filePath, callback) => {
    Document.create(
        {
            "CourseSectionId": courseSectionId,
            "UploaderId": uploaderId,
            "FileName": fileName,
            "FilePath": filePath,
            "IsDeleted": false,
            DateCreated: Date.now(),
            LastModified: Date.now()
        }
    ).then(
        (newDoc) => {
            if (!newDoc) {
                return callback('Document has not been created')
            }
            return callback(null, newDoc)
        },
        (error) => {
            return callback(error)
        }
    )
}

// TODO: write updating query based on front-end request

const deleteSoft = (documentId, callback) => {
    const deleteCallback = (error, document) => {
        if (error) {
            return callback(error)
        }

        document.IsDeleted = true
        document.save()

        return callback(null, document)
    }

    get(documentId, deleteCallback)
}


module.exports = {
    get,
    create,
    deleteSoft
}