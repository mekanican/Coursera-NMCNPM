mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$MONGO_INITDB_USERNAME';
    var passwd = '$(cat "$MONGO_INITDB_PASSWORD_FILE")';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite", "dbAdmin" ]});
	db.createCollection("User")
	db.runCommand(
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
	);
EOF