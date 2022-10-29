/*$('#loginform').submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var actionUrl = form.attr('action');
    
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
          alert(data); // show response from the php script.
        }
    });
    
});*/
/*
window.onload=function(){
	var formm = document.getElementById("loginform");
	function handleForm(event) { event.preventDefault(); } 
	formm.addEventListener('submit', handleForm);
}*/

console.log ("JS IMPORT WORK");
var formData = new FormData(document.getElementsByName('my-form')[0]);// yourForm: form selector     
$.ajax({
    type: "POST",
    url: "/api/login",// where you wanna post
    data: formData,
    processData: false,
    contentType: false,
    error: function(jqXHR, textStatus, errorMessage) {
        console.log(errorMessage); // Optional
    },
    success: function(data) {console.log(data)} 
});