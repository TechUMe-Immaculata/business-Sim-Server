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
	//response.success("'"+request.params.price+"'");
  },
  error: function(error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
	//response.error("shit");
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
	response.error("shit");
  }
});
});

Parse.Cloud.define("signUp", function(request, response) {

var user = new Parse.User();
var company = Parse.Object.extend('Company')

user.set("username", request.params.usernameClient);
user.set("password", request.params.passwordClient);
user.set("email", request.params.emailClient);

 
// other fields can be set just like with Parse.Object
//user.set("phone", "415-392-0202");
 
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
	company.set('userId', user.id);
	company.set("name","Apple inc.");
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});

response.success(request.params.usernameClient);

});

Parse.Cloud.define("login", function(request, response) {
//login
Parse.User.logIn(requestest.params.usernameClient, request.params.passwordClinet, {
  success: function(user) {
    // Do stuff after successful login.
	response.success("Yo it works");
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
	response.error("You messed up");
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

//this function creates a single player match with 5 bots and one user
Parse.Cloud.define("createMatch", function(request, response) {
 
//define variables
var currentUser = request.params.objectId;
var Match = Parse.Object.extend("Match");
var match = new Match();
var companyIdArray = new Array();
var isMultiplayer = false;
//isMultiplayer = request.params.clientMultiplayer;

 
  match.set("name",request.params.matchName);
  match.set("gameTime",request.params.matchTime);
  match.set("turn",0);
  match.set("population",1000000);
  match.set("multiplayer",isMultiplayer);
  match.save().then(function(afterSave)
  {
 
//create a query to find the user creating the match
var queryUser = new Parse.Query("Company");
queryUser.equalTo("userId", currentUser);
 
    return queryUser.find();
  }).then(function(company) {
 
 
  //add the company id to the list
  companyIdArray.push(company[0].id);
 
    // Execute any logic that should take place after the object is saved.
    //make an instance of comp match and initialize 
    var compMatch = new Parse.Object("CompMatch");
    compMatch.set("companyId",company[0].id);
    compMatch.set("matchId", match.id);
    compMatch.set("capital", 500);
    compMatch.set("charity",10);
    compMatch.set("price",5);
    compMatch.set("production", 50);
    compMatch.set("researchDevelopment", 10);
    compMatch.set("marketing", 10);
    compMatch.set("isSubbed",false);
    compMatch.set("isBot",false);
	compMatch.set("capitalTotal",10);
	compMatch.set("maxProduction",1000);
	compMatch.set("cashAvailable",50000);
	compMatch.set("creditLine",50000);
 
  //save compMatch
  compMatch.save();
 
 
     
//create a query to find the computer company's
var queryComp = new Parse.Query("Company");
queryComp.equalTo("isBot", true);
 
return queryComp.find();
}).then(function(bot) {
//add 5 bots into match
  for (i =0; i< 5;i++){
  //create a comp match and initialize variables
    var compMatch = new Parse.Object("CompMatch");
    compMatch.set("companyId",bot[i].id);
    compMatch.set("matchId", match.id);
    compMatch.set("capital", Math.floor((Math.random() * 10000) + 1));
    compMatch.set("charity",Math.floor((Math.random() * 10000) + 1));
    compMatch.set("price",Math.floor((Math.random() * 100) + 1));
    compMatch.set("production", Math.floor((Math.random() * 10000) + 1));
    compMatch.set("researchDevelopment", Math.floor((Math.random() * 10000) + 1));
    compMatch.set("marketing", Math.floor((Math.random() * 10000) + 1));
    compMatch.set("isSubbed",true);
    compMatch.set("isBot",true);
	compMatch.set("capitalTotal",0);
	compMatch.set("maxProduction",1000);
	compMatch.set("cashAvailable",50000);
	compMatch.set("creditLine",50000);
     
    compMatch.save();
 
companyIdArray.push(bot[i].id);
  }
 
match.set("companyIds",companyIdArray);
 
 
match.save();
 
  var returnData = {};
  returnData.clientMatchId = match.id;
  returnData.clientGameresult = true;
  console.log("+++++++++"+match.id);
   
   
  response.success(match.id);
   
  },function(error){
  console.log("error with bot");  
});
 
});
Parse.Cloud.define("logIn", function(request, response) {

//console.log("AAAAAA");
var username = request.params.usernameClient;
var password = request.params.passwordClient;

 Parse.User.logIn(username,password, 
 {
  success: function(user) {
    // Do stuff after successful login.
	//console.log("CCCCCCCC");
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
	response.error(false);
  }
});
	var listUser = new Array();
	var queryUser = new Parse.Query("User");
	var currentUser = {};
	console.log("BBBBBBB");
queryUser.equalTo("username", username);

queryUser.find({
  success: function(userData) {
	currentUser.clientId = userData[0].id;
	currentUser.clientUsername = username;
	listUser.push(currentUser);
	//console.log(currentUser.clientId);
	//console.log(currentUser.clientUsename);
	//console.log(listUser);
	response.success(listUser);
  },
  error: function(error){
  console.log("error with bot");
  respose.error();  
  }
});

});



Parse.Cloud.define("turn", function(request, response) {
var turn = 0;
var population = 0;
var matchId = request.params.matchId;
var totalPopulationSum = 0, totalMarketing = 0, totalResearchAndDevelopment = 0, totalCharity = 0;
var companyMatchDataArray = new Array();
var Match = Parse.Object.extend("Match");
var match = new Match();

//query to find the match
var queryMatch = new  Parse.Query("Match");
queryMatch.equalTo("objectId",matchId);

queryMatch.find().then(function(objectMatch){
  
  //population natural birth rate
  var percent = 1.05;
  
  //get current match data
  match = objectMatch[0];
  
  //get the past population of the last turn
  population = match.get("population");
  
  //increase poulation
  population = Math.round(population * percent); 
  match.set("population",population);
  
  //increment for next turn
  match.increment("turn");
  
  //save
  match.save();

  //define query to find the individual companies in the match
var queryComp = new Parse.Query("CompMatch");
queryComp.equalTo("matchId", match.id);

return queryComp.find();
}).then(function(compMatch){
//how many decimals to round to
const NUMBER_OF_DECIMALS = 1000;

//calculate totals
for ( var i = 0; i < compMatch.length; i++)
{
	//get the total amount of population that they carter to on their own as a seprate business
	totalPopulationSum = totalPopulationSum + (match.get("population")/2)*(Math.cos(compMatch[i].get("price")*Math.PI/100))+(match.get("population")/2);
	
	//get the total investment of marketing in turn
	totalMarketing = totalMarketing + compMatch[i].get("marketing");
	
	//get total investment of R&D in turn
	totalResearchAndDevelopment = totalResearchAndDevelopment + compMatch[i].get("researchDevelopment");
	
	//get total investment of charity in game
	totalCharity = totalCharity + compMatch[i].get("charity");
}

//calculate all that will happen in one turn
for ( var i = 0;  i < compMatch.length; i++)
{
	//objects that save the calculations
	var objectMS = {};
	var objectStats = {};
	
	//find the single population for the company
	var singlePopulation = (match.get("population")/2)*(Math.cos(compMatch[i].get("price")*Math.PI/100))+(match.get("population")/2);
	//calculate how much MS based on price ( pop / sum pop) 
	objectMS.priceMS = Math.round((singlePopulation/totalPopulationSum)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calculate R&D MS (R&D / R&D sum)
	objectMS.researchAndDevelopmentMS = Math.round((compMatch[i].get("researchDevelopment")/totalResearchAndDevelopment)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;
	
	//calaculate marketing MS 9(marketing / marketing sum)
	objectMS.marketingMS = Math.round((compMatch[i].get("marketing")/totalMarketing)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calaculate charity MS ( charity / charity sum)
	objectMS.charityMS = Math.round((compMatch[i].get("charity")/totalCharity)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calculate total MS by adding up all market based on their individual worth       
	objectMS.totalMS = Math.round(((objectMS.priceMS * 0.30) + (objectMS.researchAndDevelopmentMS * 0.20) + (objectMS.marketingMS * 0.40) + (objectMS.charityMS * 0.10))*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;
	

	//get the demand for your product
	var maxCarterAmount = Math.round(objectMS.totalMS * match.get("population")); 

	//check if you have to much production for demand
	if(compMatch[i].get("production") > maxCarterAmount)
	{
	//sell the least amount of products that can be sent //save as revenue
	objectStats.revenue = maxCarterAmount * compMatch[i].get("price");
	}
	
	//check if you have just enough procuction for demand
	else if (compMatch[i].get("production") == maxCarterAmount)
	{
	//sell the equal amount of products //save as revenue
	objectStats.revenue = maxCarterAmount * compMatch[i].get("price");
	}
	
	//check if you do not have enough production for demand
	else if (compMatch[i].get("production") < maxCarterAmount)
	{
	// sell the maximum amount of producs possible //save as revenue
	objectStats.revenue = compMatch[i].get("production") * compMatch[i].get("price");
	}
	else{
	//error
	console.log("error 403 WHA");
	}
	
	//long term investment into company is set here //depreciation is needed
	compMatch[i].set("capitalTotal",compMatch[i].get("capitalTotal") + compMatch[i].get("capital"));
	
	
	
	//define varibles
	var pricePerProduct = 0;
	const MAX_INVESTMENT = 45000000;
	
	//error checking if the investment goes beyound what is expected of the function
	if (compMatch[i].get("capitalTotal") < MAX_INVESTMENT)
	{
		//get price of product
		pricePerProduct = Math.abs((-(1.5/10000000)*compMatch[i].get("capitalTotal")) + 7);
	}
	else
	{
		//maximum duduction of price
		pricePerProduct = Math.abs((-(1.5/10000000)*MAX_INVESTMENT) + 7);
	}
	
	//calculate the total expenses of the turn for the company
	objectStats.expense = (pricePerProduct * compMatch[i].get("production")) +compMatch[i].get("capital") + compMatch[i].get("researchDevelopment") + compMatch[i].get("marketing") + compMatch[i].get("charity");
	//find the profit obtained for the turn
	objectStats.profit = objectStats.revenue - objectStats.expense;
	
	
	
	//define variables
	var maxProduction = 0;
	const PRICE_INCREMENT_PER_PRODUCT = 50 , INITIAL_PRODUCTION = 1000;
	
	//every 50$ invested 1 product can be made
	maxProduction = (compMatch[i].get("capitalTotal")/PRICE_INCREMENT_PER_PRODUCT) + INITIAL_PRODUCTION;
	
	const MAX_CREDIT = 50000;
	var networth = compMatch[i].get("cashAvailable") + compMatch[i].get("creditLine") + objectStats.profit;
	
	if(networth > MAX_CREDIT)
	{
		compMatch[i].set("cashAvailable",networth-MAX_CREDIT);
		compMatch[i].set("creditLine",MAX_CREDIT);
	}
	else if ( networth <= MAX_CREDIT)
	{
		compMatch[i].set("cashAvailable",0);
		compMatch[i].set("creditLine",MAX_CREDIT-networth);
	}
	
	/*
	if ( objectStats.profit > 0)
	{
		 if(net
	}
	else if ( objectStats.profit < 0)
	{
	
	}
	else if ( objectStats.profit == 0)
	{
	
	}
	*/
	//if company is a bot then calculate the next turn moves and submit
	if (compMatch[i].get("isBot") == true)
	{
    compMatch[i].set("capital", Math.floor((Math.random() * 10000) + 1));
    compMatch[i].set("charity",Math.floor((Math.random() * 10000) + 1));
    compMatch[i].set("price",Math.floor((Math.random() * 100) + 1));
    compMatch[i].set("production", Math.floor((Math.random() * maxProduction) + 1));
    compMatch[i].set("researchDevelopment", Math.floor((Math.random() * 10000) + 1));
    compMatch[i].set("marketing", Math.floor((Math.random() * 10000) + 1));
    compMatch[i].set("isSubbed",true);
	}
	//else the company is not a bot 
	else
	{
	//reset submitted turn
    compMatch[i].set("isSubbed",false);
	}
	
	//save the company
	compMatch[i].set("maxProduction",maxProduction);
	compMatch[i].set("stats",objectStats);
	compMatch[i].set("marketShare",objectMS);
	compMatch[i].save();
}

//long run this will return data for single player
return response.success(population);
})
});

Parse.Cloud.define("submitSolo", function(request, response) {
console.log("super error pls stop");
//variables to find the user in match
var companyId = request.params.companyId; 
var matchId = request.params.matchId; 

console.log(companyId);
console.log(matchId);


//set up a query to find the company in Match
var CompMatch = Parse.Object.extend("CompMatch");
var query = new Parse.Query(CompMatch);

query.equalTo("matchId",matchId);
query.equalTo("companyId",companyId);

//find frist result
query.first().then(function(company){

//check if user has submitted before
console.log(request.params.clientPrice);
if (company.get("isSubbed") == false)
{
//update the online data base
company.set("capital", Number(request.params.clientCapital));
company.set("researchDevelopment",Number(request.params.clientResearchDevelopment));
company.set("production", Number(request.params.clientProduction));
company.set("marketing",Number(request.params.clientMarketing));
company.set("price",Number(request.params.clientPrice));
company.set("charity",Number(request.params.clientCharity));
}
else
{
//the user has already submitted
}

//save to server
return company.save();
}).then(function (doneSave)
{
//send info back to client
return response.success(true);
})
});

