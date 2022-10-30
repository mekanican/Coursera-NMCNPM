function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
    console.log('Cookie created as ' + name + "=" + value + ". Expiration: " + expires);
}

function readCookie(name) {
    var x = retrieveCookie(name);
    if (x) {
        window.alert(x);
        console.log('Cookie passed to alert menu')
    }
    else {
        console.log('Cookie was undefined and did not return');
    }
}


/*var formData;
$(function () {
    $('#loginform').on('submit',function (e) {
			formData = new FormData(document.getElementsByName('my-form')[0]);
			for (const value of formData.values()) {
			  console.log(value);
			}
              $.ajax({
				  enctype: "multipart/form-data",
					type: "POST",
					url: "/api/login",// where you wanna post
					data: formData,//.serialize(),
					processData: false,
					contentType: false,
					error: function(jqXHR, textStatus, errorMessage) {
						console.log(errorMessage); // Optional
					},
					success: function(data) 
					{
						console.log(data);
						createCookie("JWT", data, 1);
					} 
				});
          e.preventDefault(); //Prevent page from loading url
        });
});*/


var formData;
$(function () {
    $('#loginform').on('submit',function (e) {
			formData = new FormData(document.getElementsByName('my-form')[0]);
			for (const value of formData.values()) {
			  console.log(value);
			}
              $.ajax({
				  //enctype: "multipart/form-data",
					type: "POST",
					url: "/api/createNewUser",//"/api/login",// where you wanna post
					data: $('#loginform').serialize(),
					error: function(jqXHR, textStatus, errorMessage) {
						console.log(errorMessage); // Optional
					},
					success: function(data) 
					{
						console.log(data);
						//createCookie("JWT", data, 1);
					} 
				});
          e.preventDefault(); //Prevent page from loading url
        });
});

