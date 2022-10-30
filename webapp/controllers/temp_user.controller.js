const User = require('../models/temp_user');

module.exports = {
    getName: email => {
        User.findOne({ email: email }, 'name').then((err, name) => {
            if (err) {
                console.log(err)
                return null
            }
            if (!name) {
                return null
            } else {
                return name
            }
        })
    },
    createEmailName: (email, name) => {
        User.create({
            email: email,
            name: name
        }).then(err => {
            console.log(err)
        })
    }
}