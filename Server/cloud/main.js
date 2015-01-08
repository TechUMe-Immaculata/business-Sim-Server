// Use Parse.Cloud.define to define as many cloud functions as you want.
/*
Parse.Cloud.define("sendCompanyInfo", function(request, response) {
 
	console.log(request.params);

  //saving data


  var Company = Parse.Object.extend("Company");
  var company = new Company();

  //makes the parameters in the Parse Object a variable
	var price = request.params.price;
	var userName = request.params.playerName;

  company.set("Price", price)
  company.set("Username",userName)
  //adds unique clolums to the data on server
	//company.addUnique("Price",Price);
	//company.addUnique("UserName",UserName);

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

  //response.success(request.params.price + 1);
 
});
*/

Parse.Cloud.define("sendEmail",function(request,response){

var query = new parse.query("CompanyName");
query.equalTo("Price" ,request.params.Price);
var pricer = new parse.object("CheckPrice");
pricer.set("Price" , price);
 response.success();
});

/*
Parse.Cloud.define("getCompanyInfo", function(request, response) {
var price = 0;
var username ="";
var Company = Parse.Object.extend("Company");
var query = new Parse.Query(Company);
query.get("aQ8ozxNevn", {
  success: function(company) {
    // The object was retrieved successfully.
    price = company.get("Price");
    username = company.get("Username");
    console.log(company.params.price + "the price");
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
  }
});
console.log("the price "+price);
  response.success("Hello");
 
});
*/


