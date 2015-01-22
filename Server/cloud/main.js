// Use Parse.Cloud.define to define as many cloud functions as you want.
 
Parse.Cloud.define("sendCompanyInfo", function(request, response) {
  
    console.log(request.params);
 
  //saving data
 
 
  var Company = Parse.Object.extend("Company");
  var company = new Company();
 
  //makes the parameters in the Parse Object a variable
    var clientPrice = request.params.price;
    var ClientUserName = request.params.playerName;
 
  company.set("price", clientPrice);
  company.set("UserName",ClientUserName);
  
  //adds unique columns to the data on server
    //company.addUnique("Price",Price);
    //company.addUnique("UserName",UserName);
 
    company.save(null, {
  success: function(results) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + company.id);
	reponse.success("'"+request.params.price+"'");
  },
  error: function(error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
	response.error("shit");
  }
});
  response.success(request.params.price);
 
  
});
 
 
 
Parse.Cloud.define("getCompanyInfo", function(request, response) {

var Company = Parse.Object.extend("Company");
var query = new Parse.Query(Company);
var clientPrice = 0;
var clientId = "";
console.log("before");
query.equalTo("objectId","QjFVIkg7p0");
query.find({
  success: function(results) {
  console.log("after");
    // The object was retrieved successfully.
	var object = results[0];
    console.log(object.id + " - " + object.get("price"));
	price = object.get("price");
	id = object.id;
	response.success(price);
  },
  error: function(error){
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log("error    = " + error.code + "    " + error.message );
	reponse.error("shit");
  }
});
});

Parse.Cloud.define("signUp", function(request, response) {

var user = new Parse.User();
user.set("username", request.params.usernameClient);
user.set("password", request.params.passwordClient);
user.set("email", request.params.emailClient);
 
// other fields can be set just like with Parse.Object
//user.set("phone", "415-392-0202");
 
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});

response.success(request.params.usernameClient);

});

Parse.Cloud.define("logIn", function(request, response) {

var username = request.params.usernameClient;
var password = request.params.passwordClient;

 Parse.User.logIn(username,password, 
 {
  success: function(user) {
    // Do stuff after successful login.
	//Parse.User.Current();
	response.success(true);
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
	response.error(false);
  }
});

});

Parse.Cloud.define("sendData", function(request, response) {
 
var Company = Parse.Object.extend("Company");
var query = new Parse.Query(Company);
var clientPrice = 0;
var clientId = "";
console.log("before");
query.equalTo("objectId","QjFVIkg7p0");
query.find({
  success: function(results) {
  console.log("after");
    // The object was retrieved successfully.
	var object = results[0];
    console.log(object.id + " - " + object.get("price"));
	var data = {};
	data.price = object.get("price");
	
	response.success(JSON.stringify(data));
  },
  error: function(error){
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log("error    = " + error.code + "    " + error.message );
	reponse.error("shit");
  }
});

});

//--------------------------------------------------------------------------------

Parse.Cloud.define("createMatch", function(request, response) {
  
    console.log(request.params);
 
  //saving data
 
  var Company = Parse.Object.extend("Company");
  var company = new Company();
 
  var clientUserName = request.params.playerName;
  var  matchId = "1";
 
  company.set("matchId", matchId);
  company.set("UserName",clientUserName);
  
  company.set("capital",0);
  company.set("price",0);
  company.set("production",0);
  company.set("charity",0);
  company.set("researchDevelopment",0);
  
  //adds unique columns to the data on server
    //company.addUnique("Price",Price);
    //company.addUnique("UserName",UserName);
 
    company.save(null, {
  success: function(results) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + company.id);
	reponse.success("'"+request.params.price+"'");
  },
  error: function(error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
	response.error("shit");
  }
});
  response.success(request.params.price);
 
  
});