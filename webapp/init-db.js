const express = require('express')
const router = express.Router()
const mongoose = require('mongoose'); 
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
connection = mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
});

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb_container:27017/test`;

module.exports = { init_db: function () {
{
	//var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    //var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    //var admin = db.getSiblingDB('admin');
    //admin.auth(rootUser, rootPassword);
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.createCollection("User", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  
  
});
    //var user = '$MONGO_INITDB_USERNAME';
    //var passwd = '$(cat "$MONGO_INITDB_PASSWORD_FILE")';
    //db.createUser({user: user, pwd: passwd, roles: ["readWrite", "dbAdmin" ]});
	//var dbo = db.db("mydb");
	/*db.db("test").createCollection("User")
	mongoose.connection.db.runCommand(
	   {
		 createIndexes: "User",
		 indexes:[
				{
					key: {
						UserID: 1
					},
					name: "UserID",
					unique: true
				},
				{
					key: {
						Role : 1
					},
					name: "Role",
					unique: false
				},
				{
					key: {
						Fullname: 1
					},
					name: "Fullname",
					unique: false
				},
				{
					key: {
						Email: 1
					},
					name: "Email",
					unique: false
				},
				{
					key: {
						Gender: 1
					},
					name: "Gender",
					unique: false
				},
				{
					key: {
						Birthday: 1
					},
					name: "Birthday",
					unique: false
				},
				{
					key: {
						Address: 1
					},
					name: "Address",
					unique: false
				},
				{
					key: {
						DateCreated: 1
					},
					name: "DateCreated",
					unique: false
				},
				{
					key: {
						LastModified: 1
					},
					name: "LastModified",
					unique: false
				},
				{
					key: {
						IsActive: 1
					},
					name: "IsActive",
					unique: false
				}
			]
	   }
	);*/
}
}};