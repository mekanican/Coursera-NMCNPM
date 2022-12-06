const express = require('express')
const router = express.Router()

const jwt_auth = require('../API/jwt_auth');
const navbar_handle = require('../API/navbar_handle')
const mongoose = require('mongoose'); 
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
connection = mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
});

//router.use(jwt_auth.authorization);
//router.get('/all-courses', jwt_auth.authorization, (req, res) => {
router.get('/courses', jwt_auth.authorization, (req, res) => {
    //let username = req.obj.name;
	var username = "test";
	//connection;
	/*mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });*/
	
	
	/*mongoose.connection.db.collection.find({
	  "users": {
		"$exists": true
	  }
	})*/
	//mongoose.connection.once('/courses', async function () {
	
	  const collection  = mongoose.connection.db.collection("Course_Information");
	  collection.find({"Course_Name": {
    "$exists": true
  }}, {_id:0}).toArray(function(err, data){
		  
		  var vals=[];
			for(var i=0;i<data.length;i++){
			   vals.push({title:data[i]["Course_Name"], desciption:data[i]["Description"]});
			}
		  console.log(vals);
		  res.render('courses', Object.assign({
				username: username,
				courses: vals
			}, navbar_handle.check(req)));
	  });

	//});
	
	/*
    res.render('courses', {
        username: username,
        courses: [
            {
                title: "SQL",
                description: "Cơ sở dữ liệu"
            },
            {
                title: "DSA",
                description: "Thuật toán đại cương"
            }
        ]
    })*/
})

/*router.use("/get-courses", express.static("./public/courses_content"));
router.get('/get-courses', authorization, (req, res) => 
{
	let course_name = req.body.course_name;
	//Kiem tra access cua user vao course, xai MongoDB
	//???
	//???
	//Sau do doc file tu thu muc cua course?
	//Thu muc trong course duoc chia thanh nhieu thu muc con chua cac bai hoc?
	//Hay luu path vao database?
	//Khong biet, nhung gio t se gui dai mot file html chua man hinh course cho user.
	//Sau nay thi render luon text + image + video bai giang trong html luon?
	res.render("courses_content", {
        username: "",
        email: "",
		courses = []
    })
	
})*/

module.exports = router;