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

  match.set("name",request.params.matchName);
  match.set("gameTime",request.params.matchTime);
  match.set("turn",0);
  match.set("population",1000000);
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
    compMatch.set("charity",0);
    compMatch.set("price",5);
    compMatch.set("production", 50);
    compMatch.set("researchDevelopment", 0);
    compMatch.set("marketing", 0);

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
    compMatch.set("capital", 500);
    compMatch.set("charity",0);
    compMatch.set("price",5);
    compMatch.set("production", 50);
    compMatch.set("researchDevelopment", 0);
    compMatch.set("marketing", 0);
	
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
//increase population exponetinaly but slowly****
var turn = 0;
var population = 1000000;
var matchId = request.params.matchId;
var totalPopulationSum = 0, totalMarketing = 0, totalResearchAndDevelopment = 0, totalCharity = 0;
var companyMatchDataArray = new Array();
var Match = Parse.Object.extend("Match");
var match = new Match();
var queryMatch = new  Parse.Query("Match");
queryMatch.equalTo("objectId",matchId);

queryMatch.find().then(function(objectMatch){
	
  match = objectMatch[0];
  
  turn = match.get("turn");
  console.log(turn);
  population = Math.round(population * Math.pow(1.05,turn)); 
  match.set("population",population);
  match.increment("turn");
  match.save();

var queryComp = new Parse.Query("CompMatch");
queryComp.equalTo("matchId", match.id);

return queryComp.find();
}).then(function(compMatch){

for ( var i = 0; i < compMatch.length; i++)
{
	companyMatchDataArray.push(compMatch[i]);
	//totalPrice = totalPrice + compMatch[i].get("price");
	totalPopulationSum = totalPopulationSum +(-1)*Math.pow(match.get("population"),(compMatch[i].get("price")/100))+match.get("population")+1;
	totalMarketing = totalMarketing + compMatch[i].get("marketing");
	totalResearchAndDevelopment = totalResearchAndDevelopment + compMatch[i].get("researchDevelopment");
	totalCharity = totalCharity + compMatch[i].get("charity");
}
var object = {};
for ( var i = 0;  i < companyMatchDataArray.length; i++)
{
	object.priceMS = ((-1)*Math.pow(match.get("population"),(compMatch[i].get("price")/100))+match.get("population")+1)/totalPopulationSum;
	object.researchAndDevelopmentMS = Math.round((companyMatchDataArray[i].get("researchDevelopment")/totalResearchAndDevelopment)*100)/100;
	object.charityMS = Math.round((companyMatchDataArray[i].get("charity")/totalCharity)*100)/100;
	
	console.log("price "+companyMatchDataArray[i].get("price"));
	
	console.log("% "+(-1)*Math.pow(match.get("population"),(compMatch[i].get("price")/100))+match.get("population")+1);
	console.log("pop "+totalPopulationSum);
	
	companyMatchDataArray[i].set("marketShare",object);
	companyMatchDataArray[i].save();
}

return response.success(totalPopulationSum);
})


//expense save

//find charity MS %

//find marketing Ms %

//find price Ms %

//calculate R&D Ms %

//add all Ms together
//save their total Ms % to comp match

//find how many products they can sell
//if amount >= production then sell production
//else if amount < production then sell the amount
//save products sold to comp match

//revenue save 
//net profit save





//loop for each bot

//create fake varibles for bots based ( based off last decision )

//find charity MS %

//find marketing Ms %

//find price Ms %

//calculate R&D Ms %

//save their total Ms %
});
























 /*   console.log(request.params);
 var Company = Parse.Object.extend("Company");
 var objectList = new Array();
  //saving data
  alert("before");
 for (var i = 0; i < 6; i++)
 {
	alert("after");
	console.log(i);
	var company = new Company();
	 
	//var clientUserName = request.params.playerName;
	var  matchId = "1";
	 
	company.set("matchId", matchId);
	company.set("UserName","bot"+i);
	  
	company.set("capital",0);
	company.set("price",0);
	company.set("production",0);
	company.set("charity",0);
	company.set("researchDevelopment",0);
	
	objectList.push(company);
	  
	}

  //adds unique columns to the data on server
    //company.addUnique("Price",Price);
    //company.addUnique("UserName",UserName);
 
 Parse.Object.saveAll(objectList, {
  success: function(list) {
    // Execute any logic that should take place after the object is saved.
    alert('new object lists created');
	//reponse.success("done");
  },
  error: function(error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
	//response.error("shit");
  }
});

  response.success("done");
  */
  
  
  
  /*
  Parse.Cloud.define("averageStars", function(request, response) {
  var sum = 0;
  var j=0;

  var query = new Parse.Query("Comedy");
  query.equalTo("movie", request.params.movie);

  query.find().then(function(results) {
    for (var i = 0; i < results.length; ++i) {
      sum += results[i].get("stars");
      ++j;
    }

    var query2 = new Parse.Query("Drama");
    query2.equalTo("movie", request.params.movie);

    return query2.find();
  }).then(function(results) {
    for (var i = 0; i < results.length; ++i) {
      sum += results[i].get("stars");
      ++j;
    }

    response.success(sum / j);
  }, function(error) {
    response.error("movie lookup failed");
  });
});
*/


//Parse.Cloud.run('',{},
/*
 Parse.Cloud.run('createMatchUserSingle',{currentUser}, {
      success: function(results) {
          Parse.Cloud.run('getGifts',{}, {
            success: function(results) {
                response.success(results);
            },
            error: function(error) {
                response.error("Some error.");
            }
          });
      },
      error: function(error) {
          response.error("Some error.");
      }
    });
*/

/* function backup
Parse.Cloud.define("createMatch", function(request, response) {

//console.log("part A");
//var currentUser = request.params.objectId;
//var Match = Parse.Object.extend("Match");
//var match = new Match();

match.set("name","starfox");
//Match.addUnique("name","starfox");
//Add other users before bots.


var queryUser = new Parse.Query("Company");
queryUser.equalTo("userId", currentUser.id);
console.log("part B");
queryUser.find({
  success: function(user) {
  console.log("part C");
    var compMatch = new parse.object("CompMatch");
    compMatch.set("userId",user[0].id);
    compMatch.set("matchId", Match.id);
    compMatch.set("capital", 500);
    compMatch.set("charity",0);
    compMatch.set("price",5);
    compMatch.set("production", 50);
    compMatch.set("researchDevelopment", 0);
    compMatch.set("marketing", 0);
  },
  error: function(error){
    console.log("error with match");
  }
});

console.log("part D");
var queryComp = new Parse.Query("Bots");
queryComp.equalTo("difficulty", "easy");

queryComp.find({
  success: function(bot) {
  console.log("part E");
    var object = bot;
  for (i =0; i< 5;i++){
    var compMatch = new parse.object("CompMatch");
    compMatch.set("userId",bot[0].id);
    compMatch.set("matchId", Match.id);
    compMatch.set("capital", 500);
    compMatch.set("charity",0);
    compMatch.set("price",5);
    compMatch.set("production", 50);
    compMatch.set("researchDevelopment", 0);
    compMatch.set("marketing", 0);
  }  
  },
  error: function(error){
  console.log("error with bot");  
  }
});

console.log("part F");
  var returnData = {};
  returnData.clientMatchId = Match.id;
  returnData.clientGameresult = true;
  response.success("done");
});
 */