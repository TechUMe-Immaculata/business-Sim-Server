Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");

guestCreate();
function guestCreate()
{
     var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

  var username = text+"_guest";

  var user = new Parse.User();
  user.set("name" , username);
  user.set("username", username);
    user.set("password", text);
  user.set("email", text+"@email.com");
  
  user.signUp(null, {

  //need to make a company later
  
  success: function(user) {
var userCompanyName = text+"_guestCompany";
    var Company = Parse.Object.extend("Company");
    var mycompany = new Company();
    mycompany.set("company", userCompanyName);


    // get user id and company 
    var currentUser = Parse.User.current();
      var myUserId = currentUser.id;

    mycompany.set("userId" , myUserId);
    console.log(myUserId);
    mycompany.set("username" , currentUser.get("username"));
    mycompany.set("isBot" , false);
    mycompany.save(null, {

      success: function(setCompany){
            window.location="GuestHome.html";
        console.log(mycompany);


      }, 
      error: function(object, error){
     
         console.log("Error: " + error.code + " " + error.message);


      }
    });
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
  
}; 