const User = require('../models/temp_user');

module.exports = {
    getName: (email, callback) => {
        User.findOne({ email: email }, 'name').then((name, err) => {
            if (err) {
                console.log(err)
                callback(null);
            }
            if (!name) {
                callback(null);
            } else {
                callback(name);
            }
        })
    },
    createEmailName: (email, name, role, callback) => {
        User.create({
            email: email,
            name: name,
            role: role
        }).then(err => {
            if (!err) {
                callback(null);
            } else {
                callback(email, name, role);
            }
        })
    }
}