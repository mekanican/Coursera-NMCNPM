const User = require('../models/temp_user');

module.exports = {
    getName: (email, callback) => {
        User.findOne({ email: email }, 'name').then((returnObject, err) => {
            if (err) {
                callback("Cannot query", null); // better callback
            }

            callback(null, returnObject);
        })
    },
    createEmailName: (email, name, role, callback) => {
        User.create({
            email: email,
            name: name,
            role: role
        }).then(err => {
            if (!err) {
                callback(err);
            } else {
                callback(null, email, name, role);
            }
        })
    }
}