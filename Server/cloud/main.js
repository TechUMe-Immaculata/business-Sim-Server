// Use Parse.Cloud.define to define as many cloud functions as you want.
<<<<<<< HEAD
/*
=======
 
>>>>>>> origin/MASTER
Parse.Cloud.define("sendCompanyInfo", function(request, response) {
  
    console.log(request.params);
 
  //saving data
 
 
  var Company = Parse.Object.extend("Company");
  var company = new Company();
<<<<<<< HEAD

  //makes the parameters in the Parse Object a variable
	var price = request.params.price;
	var userName = request.params.playerName;

  company.set("Price", price)
  company.set("Username",userName)
  //adds unique clolums to the data on server
	//company.addUnique("Price",Price);
	//company.addUnique("UserName",UserName);

=======
 
  //makes the parameters in the Parse Object a variable
    var price = request.params.price;
    var userName = request.params.playerName;
 
  company.set("Price", price);
  company.set("Username",userName);
  
  //adds unique columns to the data on server
    //company.addUnique("Price",Price);
    //company.addUnique("UserName",UserName);
 
>>>>>>> origin/MASTER
    company.save(null, {
  success: function(company) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + company.id);
  },
  error: function(company, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
<<<<<<< HEAD

  //response.success(request.params.price + 1);
=======
});
  response.success(request.params.price + 1);
>>>>>>> origin/MASTER
 
  
});
<<<<<<< HEAD
*/

Parse.Cloud.define("sendEmail",function(request,response){

var query = new parse.query("CompanyName");
query.equalTo("Price" ,request.params.Price);
var pricer = new parse.object("CheckPrice");
pricer.set("Price" , price);
 response.success();
});

/*
=======
 
 
 
>>>>>>> origin/MASTER
Parse.Cloud.define("getCompanyInfo", function(request, response) {

var Company = Parse.Object.extend("Company");
var query = new Parse.Query(Company);
console.log("before");
query.equalTo("objectId","zohdi5RJuN");
query.find({
  success: function(results) {
  console.log("after");
    // The object was retrieved successfully.
	var object = results[0];
    console.log(object.id + " - " + object.get("Price"));
  },
  error: function(error){
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log("error    = " + error.code + "    " + error.message );
  }
});
/*
console.log("the price "+price);
<<<<<<< HEAD
  response.success("Hello");
 
});
*/
=======
  
//var Company = Parse.Object.extend("Company"); 
//var company = new Company();
 var myId = "aQ8ozxNevn";
 var query = new Parse.Query("Company");
 console.log(myId);
 console.log(query);
 console.log("before");
query.get(myId, {
  success: function(object) {
    // object is an instance of Parse.Object.
	console.log("Success");
  },
>>>>>>> origin/MASTER

  error: function(object, error) {
    // error is an instance of Parse.Error.
	console.log("fail");
  }
});
  response.success("shit");

  */
});
