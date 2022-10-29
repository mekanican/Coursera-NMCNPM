
var formData = new FormData(document.getElementsByName('my-form')[0]);
$(function () {
    $('#loginform').on('submit',function (e) {
			//alert("submitted");
              $.ajax({
					type: "POST",
					url: "/api/login",// where you wanna post
					data: formData,
					processData: false,
					contentType: false,
					error: function(jqXHR, textStatus, errorMessage) {
						console.log(errorMessage); // Optional
					},
					success: function(data) 
					{
						console.log(data)
					} 
				});
          e.preventDefault(); //Prevent page from loading url
        });
});