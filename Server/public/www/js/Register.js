
document.getElementById("enterButton").addEventListener("click", Register);
//window.location.replace('...');


function Register()
{ 
Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
    

  var username = this.$("#userName").val();
  var password = this.$("#myPass").val();
  var email = this.$("#myemail").val();
  
  
    
    
  var user = new Parse.User();
  user.set("name" , username);
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);
  
  user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  //alert("asfdasdfsadf");
  //make call to create match
  window.location="company.html";
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
  
}; 