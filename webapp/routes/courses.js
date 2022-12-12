const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');
const navbar_handle = require('../API/navbar_handle')
const mongoose = require('mongoose'); 
// const MONGO_USERNAME = process.env.MONGO_USERNAME
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD
// connection = mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, { useNewUrlParser: true }, function (err) {
//   if (err) throw err;
// });
 
router.get('/courses/', jwt_auth.authorization, (req, res) => {
    let username = req.obj.name;
	
	  const collection  = mongoose.connection.db.collection("CourseInformation");
	  collection.find({"coursename": {
    "$exists": true
  }}, {_id:0}).toArray(function(err, data){
		  
		  var vals=[];
			for(var i=0;i<data.length;i++){
			   vals.push({title:data[i]["coursename"], desciption:data[i]["description"]});
			}
		  console.log(vals);
		  res.render('courses', Object.assign({
				username: username,
				courses: vals
			}, navbar_handle.check(req)));
	  });

})


module.exports = router;