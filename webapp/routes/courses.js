const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');
const navbar_handle = require('../API/navbar_handle')
const mongoose = require('mongoose'); 

// setTimeout((() => {
//  const collection  = mongoose.connection.db.collection("CourseInformation");
//}), 2000)
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

router.get('/courses_temp/', jwt_auth.authorization, (req, res) => {
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
		  res.render('courses_delete', Object.assign({
				username: username,
				courses: vals
			}, navbar_handle.check(req)));
	  });

})

router.post('/courses_delete/', jwt_auth.authorization, (req, res) => {
    let username = req.obj.name;
	const collection  = mongoose.connection.db.collection("CourseInformation");
	let course_deleting = collection.findOne ({"courseid": req.body.id});
	if (course_deleting["creatorid"] != req.obj.id)
	{
		res.send ("User not permitted to delete course");
	}
	else
	{
		deleteCourse (course_deleting["courseid"]);
		console.log ("Course delete: ");
		console.log (course_deleting["courseid"]);
		res.send ("Course deleted");
	};
})

module.exports = router;