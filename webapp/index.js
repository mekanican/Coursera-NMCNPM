const express = require('express');
const app = express();

const PORT = process.env.PORT || 12345
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

// Todo: mongodb setup

app.use('/', express.static('public/homepage'))

// Example : /API?a=123&b=456
app.get('/API', (req, res) => {
    console.log(`Get ${[req.query.a, req.query.b]}`)
    res.json({success : true})
})

app.listen(PORT, () => {
    console.log(`App currently running on localhost:${PORT}`)
})
