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
var numberOfPlayers = 6;
var rank = 0;
//isMultiplayer = request.params.clientMultiplayer;

 
  match.set("name",request.params.matchName);
  match.set("gameTime",request.params.matchTime);
  match.set("turn",0);
  match.set("population",1200);
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
	compMatch.set("capitalTotal",0);
	compMatch.set("maxProduction",150);
	compMatch.set("cashAvailable",25000);
	compMatch.set("creditLine",25000);
	compMatch.set("networth",500000);
	compMatch.set("isBankrupt",false);
	compMatch.set("unitCost",7);
	rank++;
	compMatch.set("rank",rank);
	compMatch.set("companyName",company[0].get("company"));
	
	var marketShare = {};
	marketShare.charityMS =  Math.round(1 / numberOfPlayers *100)/100;
	marketShare.marketingMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.priceMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.researchAndDevelopmentMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.totalMS =  Math.round(1 / numberOfPlayers*100)/100;
	compMatch.set("marketShare",marketShare);
	
	var stats = {}
	stats.expense = compMatch.get("capital")+compMatch.get("charity")+compMatch.get("researchDevelopment")+compMatch.get("marketing")+(compMatch.get("production")*7);
	stats.profit = 0;
	stats.revenue = 0;
	compMatch.set("stats",stats);

 
  //save compMatch
  compMatch.save();
 
 
     
//create a query to find the computer company's
var queryComp = new Parse.Query("Company");
queryComp.equalTo("isBot", true);
 
return queryComp.find();
}).then(function(bot) {
//add 5 bots into match
  for (i =0; i< numberOfPlayers-1;i++){
  //create a comp match and initialize variables
    var compMatch = new Parse.Object("CompMatch");
    compMatch.set("companyId",bot[i].id);
    compMatch.set("matchId", match.id);
    compMatch.set("capital", Math.floor((Math.random() * 3000) + 1));
    compMatch.set("charity",Math.floor((Math.random() * 3000) + 1));
    compMatch.set("price",Math.floor((Math.random() * 50) + 15));
    compMatch.set("production",150);
    compMatch.set("researchDevelopment", Math.floor((Math.random() * 3000) + 1));
    compMatch.set("marketing", Math.floor((Math.random() * 3000) + 1));
    compMatch.set("isSubbed",true);
    compMatch.set("isBot",true);
	compMatch.set("capitalTotal",0);
	compMatch.set("maxProduction",150);
	compMatch.set("cashAvailable",25000);
	compMatch.set("creditLine",25000);
	compMatch.set("networth",500000);
	compMatch.set("isBankrupt",false);
	compMatch.set("unitCost",7);
	rank++;
	compMatch.set("rank",rank);
	compMatch.set("companyName",bot[i].get("company"));
	
	
	var marketShare = {};
	marketShare.charityMS =  Math.round(1 / numberOfPlayers *100)/100;
	marketShare.marketingMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.priceMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.researchAndDevelopmentMS =   Math.round(1 / numberOfPlayers*100)/100;
	marketShare.totalMS =  Math.round(1 / numberOfPlayers*100)/100;
	compMatch.set("marketShare",marketShare);
	
	var stats = {}
	stats.expense = compMatch.get("capital")+compMatch.get("charity")+compMatch.get("researchDevelopment")+compMatch.get("marketing")+(compMatch.get("production")*7);
	stats.profit = 0;
	stats.revenue = 0;
	compMatch.set("stats",stats);
     
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

var Match = Parse.Object.extend("Match");
var match = new Match();
//var numberOfTurns;





//var companyMatchDataArray = new Array();
//var companyMatchData = {};
//companyMatchData.turn = null;
//companyMatchData.totalMS = null;
//companyMatchData.totalProduction = null;
//companyMatchData.totalInvestment = null;
//companyMatchData.rank = null;
//companyMatchData.companyName = null;
//companyMatchData.production = null;
//companyMatchData.networth = null;
//companyMatchData.companyId = null;
//companyMatchData.maxCarterAmount = null;

//query to find the match
var queryMatch = new  Parse.Query("Match");
queryMatch.equalTo("objectId",matchId);

queryMatch.find().then(function(objectMatch){
  
  //population natural birth rate
  var percent = 1.00;
  
  //get current match data
  match = objectMatch[0];
  
  //get the past population of the last turn
  population = match.get("population");
  
  //increase poulation
  population = Math.round(population * percent); 
  match.set("population",population);
  
  //increment for next turn
  match.increment("turn");

  //set turn to data going out
  //companyMatchData.turn = match.get("turn");
  
  //save
  match.save();

  //define query to find the individual companies in the match
var queryComp = new Parse.Query("CompMatch");
queryComp.equalTo("matchId", match.id);
queryComp.descending("marketing");

return queryComp.find();
}).then(function(compMatch){

for ( var i = 0;  i < compMatch.length; i++){
	if(compMatch[i].get("isBankrupt") == true)
	{
		compMatch[i].set("capital",0) 
		compMatch[i].set("charity",0) 
		compMatch[i].set("marketing",0)
		compMatch[i].set("researchDevelopment",0)
		compMatch[i].set("production",0)
		compMatch[i].set("price",0)
		compMatch[i].set("isSubbed",true)
	}
}
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

 // companyMatchData.totalMS = null;
 // companyMatchData.totalProduction = null;
 // companyMatchData.totalInvestment = null;
 // companyMatchData.rank = null;
 // companyMatchData.companyName = null;
 // companyMatchData.production = null;
  //companyMatchData.networth = null;
 // companyMatchData.companyId = null;
 // companyMatchData.maxCarterAmount = null;
	
	//find the single population for the company
	var singlePopulation = (match.get("population")/2)*(Math.cos(compMatch[i].get("price")*Math.PI/100))+(match.get("population")/2);
	//calculate how much MS based on price ( pop / sum pop) 
	objectMS.priceMS = Math.round((singlePopulation/totalPopulationSum)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calculate R&D MS (R&D / R&D sum)
	objectMS.researchAndDevelopmentMS = Math.round((compMatch[i].get("researchDevelopment")/totalResearchAndDevelopment)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;
	
	//calculate marketing MS 9(marketing / marketing sum)
	objectMS.marketingMS = Math.round((compMatch[i].get("marketing")/totalMarketing)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calculate charity MS ( charity / charity sum)
	objectMS.charityMS = Math.round((compMatch[i].get("charity")/totalCharity)*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;

	//calculate total MS by adding up all market based on their individual worth       
	objectMS.totalMS = Math.round(((objectMS.priceMS * 0.45) + (objectMS.researchAndDevelopmentMS * 0.25) + (objectMS.marketingMS * 0.20) + (objectMS.charityMS * 0.10))*NUMBER_OF_DECIMALS)/NUMBER_OF_DECIMALS;
	

	//get the demand for your product
	var maxCarterAmount = Math.round(objectMS.totalMS * match.get("population")); 
	console.log("production" + "====" + "max");
	console.log(compMatch[i].get("production") + "====" + maxCarterAmount);
	//check if you have to much production for demand
	if(compMatch[i].get("production") > maxCarterAmount)
	{
	//sell the least amount of products that can be sent //save as revenue
	objectStats.revenue = Math.round(maxCarterAmount * compMatch[i].get("price"));
	console.log("1")
	}
	
	//check if you have just enough procuction for demand
	else if (compMatch[i].get("production") == maxCarterAmount)
	{
	//sell the equal amount of products //save as revenue
	objectStats.revenue = Math.round(maxCarterAmount * compMatch[i].get("price"));
	console.log("2")
	}
	
	//check if you do not have enough production for demand
	else if (compMatch[i].get("production") < maxCarterAmount)
	{
	// sell the maximum amount of producs possible //save as revenue
	objectStats.revenue = Math.round(compMatch[i].get("production") * compMatch[i].get("price"));
	console.log("3")
	console.log(compMatch[i].get("price"));
	console.log(objectStats.revenue);
	}
	else{
	//error
	console.log("error 403 WHA");
	}
	console.log(compMatch[i].get("companyName"));
	
	//long term investment into company is set here //depreciation is needed
	compMatch[i].set("capitalTotal",compMatch[i].get("capitalTotal") + compMatch[i].get("capital"));
	
	
	
	//define variables
	var pricePerProduct = 7 - ((compMatch[i].get("capitalTotal"))/75000)
	
	
	//lowest efficiency possible 
	if (pricePerProduct < 1)
	{
		pricePerProduct = 1;
	}
	else{}
	
	compMatch[i].set("unitCost",Math.round(pricePerProduct*100)/100);
	//calculate the total expenses of the turn for the company
	objectStats.expense = Math.round((pricePerProduct * compMatch[i].get("production")) +compMatch[i].get("capital") + compMatch[i].get("researchDevelopment") + compMatch[i].get("marketing") + compMatch[i].get("charity"));
	//find the profit obtained for the turn
	objectStats.profit = Math.round(objectStats.revenue - objectStats.expense);
	console.log("revenue = " + objectStats.revenue + " expense = " + objectStats.expense );
	console.log("profit = " +objectStats.profit);
	
	
	
	//define variables
	var maxProduction = 0;
	const PRICE_INCREMENT_PER_PRODUCT = 50 , INITIAL_PRODUCTION = 150;
	
	//every 50$ invested 1 product can be made
	maxProduction = Math.round((compMatch[i].get("capitalTotal")/PRICE_INCREMENT_PER_PRODUCT) + INITIAL_PRODUCTION);
	
	//define variables
	const MAX_CREDIT = 25000;
	var networth = compMatch[i].get("cashAvailable") + compMatch[i].get("creditLine") + objectStats.profit;
	console.log("networth = " + networth);
	compMatch[i].set("networth",networth);
	//determine users state
	if(networth > MAX_CREDIT)
	{
		//adding cash and fill up mac credit
		compMatch[i].set("cashAvailable",networth-MAX_CREDIT);
		compMatch[i].set("creditLine",MAX_CREDIT);
	}
	else if ( networth <= MAX_CREDIT)
	{
		//no cash and subtracting what credit you have left
		compMatch[i].set("cashAvailable",0);
		compMatch[i].set("creditLine",MAX_CREDIT-networth);
		
		//check if player is bankrupt or not then declares bankruptcy
		if (networth < 0 )
		{
			compMatch[i].set("isBankrupt", true);
			compMatch[i].set("cashAvailable",0);
			compMatch[i].set("creditLine",networth);
			//console.log("----BANKRUPT----");
			//console.log(MAX_CREDIT +"CREDIT");
			//console.log(networth+"NETWORTH");
			//console.log(objectStats.profit+"profit")
			//console.log(MAX_CREDIT-networth);
		}
	}

    //set some varible for next turn
  compMatch[i].set("maxProduction",maxProduction);
  compMatch[i].set("stats",objectStats);
  compMatch[i].set("marketShare",objectMS);

 // companyMatchData.totalMS = objectMS.totalMS;
  //companyMatchData.totalProduction = maxProduction;
 // companyMatchData.totalInvestment = compMatch[i].get("capitalTotal");
  //.companyName = compMatch[i].get("companyName");
  //companyMatchData.production = compMatch[i].get("production");
  //companyMatchData.networth = compMatch[i].get("networth");
  //companyMatchData.companyId = compMatch[i].get("companyId");
 // companyMatchData.maxCarterAmount = maxCarterAmount;

 // var object = companyMatchData;
  //companyMatchDataArray.push(object);
 // console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
 // console.log(companyMatchData);
  //console.log(companyMatchDataArray[i]);
  //if ( i == 0)
 // {}
 // else{
 // console.log(companyMatchDataArray[i-1]);
  //}



	//if company is a bot then calculate the next turn moves and submit
	if (compMatch[i].get("isBot") == true)
	{
		if(objectStats.profit <= 0)
		{
			compMatch[i].set("production", Math.floor(Math.random() * (compMatch[i].get("maxProduction")*(0.3)) + (compMatch[i].get("maxProduction")*(0.7))));
			
			compMatch[i].set("capital", Math.floor((Math.random() * 3000) + 1));
			compMatch[i].set("charity",Math.floor((Math.random() * 3000) + 1));
			compMatch[i].set("price",Math.floor((Math.random() * 50) + 15));
			compMatch[i].set("researchDevelopment", Math.floor((Math.random() * 3000) + 1));
			compMatch[i].set("marketing", Math.floor((Math.random() * 3000) + 1));
		}
		else
		{
			//states are positive so don't do anything
		}
		
    compMatch[i].set("isSubbed",true);
	}
	//else the company is not a bot 
	else
	{
	//reset submitted turn
    compMatch[i].set("isSubbed",false);
	}
	
}

compMatch.sort(function(a, b){return b.get("networth")-a.get("networth")});

for ( var i = 0;  i < compMatch.length; i++)
{
compMatch[i].set("rank",(i+1));
//companyMatchDataArray[i].rank = compMatch[i].get("rank");
//compMatch[i].save();
console.log(compMatch[i].get("rank") + "_______"+compMatch[i].get("networth"));

if (compMatch[i].get("isBot") == true && compMatch[i].get("rank") == 6)
{
	compMatch[i].set("production", Math.floor(Math.random() * (compMatch[i].get("maxProduction")*(0.3)) + (compMatch[i].get("maxProduction")*(0.7))));
	
	compMatch[i].set("capital",compMatch[0].get("capital"));
	compMatch[i].set("charity",compMatch[0].get("charity"));
	
	compMatch[i].set("researchDevelopment",compMatch[0].get("researchDevelopment"));
	compMatch[i].set("marketing",compMatch[0].get("marketing"));
	
	if (compMatch[i].get("unitCost") < compMatch[i].get("unitCost"))
	{
		compMatch[i].set("price",compMatch[0].get("price")+5);
	}
	else
	{
		compMatch[i].set("price",compMatch[0].get("price"));
	}
	
	console.log("The Price Is ++++++++++ "+compMatch[i].get("price"));
	
	var maxRevenue = compMatch[i].get("production") * compMatch[i].get("unitCost");
	
	var maxExpense = compMatch[i].get("capital")+compMatch[i].get("charity")+compMatch[i].get("researchDevelopment")+compMatch[i].get("marketing");
	
	var delta = maxRevenue - maxExpense;
	
	console.log("before delta " + delta);
	if (delta <= 0)
	{
		console.log("after delta ");
		compMatch[i].set("capital",1);
		maxExpense = compMatch[i].get("capital")+compMatch[i].get("charity")+compMatch[i].get("researchDevelopment")+compMatch[i].get("marketing");
		delta = maxRevenue - maxExpense;
		
		if(delta <= 0)
		{
			var da=1,db=1,dc=1;
			
			while (delta <= 0)
			{
				var divider = da + db + dc;
				var subtractor = (delta - 100) / divider;
				console.log("divider " + divider);
				if (compMatch[i].get("charity")+subtractor < 0)
				{
					compMatch[i].set("charity",0);
					da = 0;
				}
				else
				{
					compMatch[i].set("charity",compMatch[i].get("charity")+subtractor);
				}
				if (compMatch[i].get("researchDevelopment")+subtractor < 0)
				{
					compMatch[i].set("researchDevelopment",0);
					db = 0;
				}
				else
				{
					compMatch[i].set("researchDevelopment",compMatch[i].get("researchDevelopment")+subtractor);
				}
				if (compMatch[i].get("marketing")+subtractor < 0)
				{
					compMatch[i].set("marketing",0);
					dc = 0;
				}
				else
				{
					compMatch[i].set("marketing",compMatch[i].get("marketing")+subtractor);
				}
				
				maxExpense = compMatch[i].get("capital")+compMatch[i].get("charity")+compMatch[i].get("researchDevelopment")+compMatch[i].get("marketing");
				delta = maxRevenue - maxExpense;
				console.log(maxRevenue);
				console.log("== expense ==" + maxExpense);
				console.log("iteration with a delta of " + delta);
			}
			console.log(delta);
		}
	}
	
}
}


return Parse.Object.saveAll(compMatch);

}).then(function (afteSave){
	//match.set("dataOut",companyMatchDataArray);
	//console.log(companyMatchDataArray[0]);
	//console.log(companyMatchDataArray[1]);
	//console.log(companyMatchDataArray[2]);
	//console.log(companyMatchDataArray[3]);
	//console.log(companyMatchDataArray[4]);
	//console.log(companyMatchDataArray[5]);
  return Parse.Object.saveAll(match);

}).then(function(saveMatch){
/*
  if ( match.get("turn") > 3){
// MARCO work

var  deleteMatch= {};
deleteMatch.matchId = match.id;


Parse.Cloud.run('gameOver', deleteMatch, {


    success: function(works){

      console.log("it was deleted");
 
        
    },
    error:function(error){

        console.log("cloudy did not work");
    }
}); 

console.log("tress" + match.id);
console.log("lol" + match.get("turn"));
console.log("sharks : " + match.id);

console.log("you were supposed to deleted it");

}
else if (match.get("turn")  <= 3){

}
*/

    return response.success("turn:"+ match.get("turn"));
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



Parse.Cloud.define("gameOver", function(request, response) {
var matchid = request.params.matchId;
CompMatch = Parse.Object.extend("CompMatch");

// query to get the place of the users 
var query = new Parse.Query("CompMatch");
query.equalTo("matchId" , matchid);
query.descending("networth");

 
query.find().then(function(rankings){
  
//get the winner

var rank1 = rankings[0].get("networth");
company1 = rankings[0].get("companyName");
companyId1 = rankings[0].get("companyId");
console.log(companyId1);
var Company = Parse.Object.extend("Company");
var query1 = new Parse.Query("Company");
query1.equalTo("objectId" , rankings[0].get("companyId"));

query1.find({

    success: function(usercompany) {
      //increase the users win loss record
       
    usercompany[0].increment("gamesTotal");
    usercompany[0].increment("gamesWon");
   console.log(usercompany[0]);
   

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


//get the second place 
var rank2 = rankings[1].get("networth");
company2 = rankings[1].get("companyName");
companyId2 = rankings[1].get("companyId");
var query2 = new Parse.Query("Company");
query2.equalTo("objectId" , rankings[1].get("companyId"));
query2.find({

    success: function(usercompany) {
//increase the users win loss record
    usercompany[0].increment("gamesTotal");
    usercompany[0].increment("gamesWon");
   usercompany[0].save();
   

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

//get third place 
var rank3 = rankings[2].get("networth");
company3 = rankings[2].get("companyName");
var query3 = new Parse.Query("Company");
companyId3 = rankings[2].get("companyId");
query3.equalTo("objectId" , rankings[2].get("companyId"));
query3.find({

    success: function(usercompany) {
 //increase the users win loss record
    usercompany[0].increment("gamesTotal");
    
    usercompany[0].increment("gameslost");
   usercompany[0].save();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

// get four place
var rank4 = rankings[3].get("networth");
company4 = rankings[3].get("companyName");
var query4 = new Parse.Query("Company");
companyId4 = rankings[3].get("companyId");
query4.equalTo("objectId" , rankings[3].get("companyId"));
query4.find({

    success: function(usercompany) {
 //increase the users win loss record
    usercompany[0].increment("gamesTotal");
    
    usercompany[0].increment("gameslost");
   usercompany[0].save();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
//get fith place
var rank5 = rankings[4].get("networth");
company5 = rankings[4].get("companyName");
companyId5 = rankings[4].get("companyId");
var query5 = new Parse.Query("Company");
query5.equalTo("objectId" , rankings[4].get("companyId"));
query5.find({

    success: function(usercompany) {
 //increase the users win loss record
    usercompany[0].increment("gamesTotal");
   
    usercompany[0].increment("gamesLost");
   usercompany[0].save();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

//get sixth place 
var rank6 = rankings[5].get("networth");
company6 = rankings[5].get("companyName");
companyId6 = rankings[5].get("companyId");
var query6 = new Parse.Query("Company");
query6.equalTo("objectId" , rankings[5].get("companyId"));
query6.find({
 
    success: function(usercompany) {
//increase the users win loss record
    usercompany[0].increment("gamesTotal");
    
    usercompany[0].increment("gameslost");
   usercompany[0].save();

  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});



// contains the company names

var company1;
var company2;
var company3;
var company4;
var company5;
var company6;
// get winnner var for console log
var winner1 = company1;
var winner2 = company2;
var winner3 = company3;









var plot = "The winner is " + winner1 + " : second winner"+ winner2 + " : the third winner is " + winner3;
var Match = Parse.Object.extend("Match");
var matchquery = new Parse.Query("Match");
matchquery.equalTo("objectId" , matchid);
matchquery.find({

success: function(match){
var matchname = match[0].get("name");
match[0].destroy({
  success: function(match) {
    // The object was deleted from the Parse Cloud.
    console.log("match : " + matchname + " is deleted" );
  },
  error: function(match, error) {
    // The delete failed.
    // error is a Parse.Error with an error code and message.
  }
});
response.success(plot);
},
error: function(error){
    console.log("not working");

    response.error("Nopeee")
}

});

return null
}).then(function(result){


})

})



