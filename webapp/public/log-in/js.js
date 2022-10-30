//var formData;
$(function () {
    $('#loginform').on('submit',function (e) {
			//formData = new FormData(document.getElementsByName('my-form')[0]);
			//for (const value of formData.values()) {
			//  console.log(value);
			//}
              $.ajax({
				  //enctype: "multipart/form-data",
					type: "POST",
					url: "/api/testt",//"/api/login",// where you wanna post
					data: $('#loginform').serialize(),
					error: function(jqXHR, textStatus, errorMessage) {
						console.log(errorMessage); // Optional
					},
					success: function(data) 
					{
						console.log(data);
					} 
				});
          e.preventDefault(); //Prevent page from loading url
        });
});

