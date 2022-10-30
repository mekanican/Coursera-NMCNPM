module.exports = app => {
    app.get('/register_data', (req, res) => {
        if (!req.session.userProfile) {
            res.status(203).send({});
        }
        res.status(200).send(req.session.userProfile);
    })
    app.post('/register', (req, res) => {
        role = req.body.role
        // Todo: Apply JWT here
    })
}