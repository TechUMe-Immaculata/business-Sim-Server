

Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
Parse.$ = jQuery;

var currentUser = Parse.User.current();
var game1;
var game2;
var game3;
var companyIdTest;


function JoinMatch(){
//get matches work 
var company = Parse.Object.extend("Company");
var query = new Parse.Query(company);
query.equalTo("userId", currentUser.id);
console.log(currentUser.id);
query.find({
  success: function(results) {
    // comments now contains the comments for myPost
    	var usercomp = results[0];
    	console.log(results.length);
    	var usercompID = results[0].id;
        companyIdTest = usercompID;
        console.log("inside " + usercompID);
        localStorage.setItem("companyId",usercompID);

        Bcomp = results[0];
        
        console.log(usercompID);
    	var Match = Parse.Object.extend("Match");
    	var nquery = new Parse.Query(Match);
        
     
    	nquery.equalTo("companyIds" , usercompID);
    	nquery.find({
    		success: function(findMatch){
    			console.log(findMatch);
    			if ( findMatch.length == 0 )
    			{
    				console.log('nothing');
    			}
    			else{
    				for(var i = 0; i <= (findMatch.length -1); i++)
    				{



    			 game1 = findMatch[0];
    			var usersgame1 = findMatch[0];
    			 game2 = findMatch[1];
    			var usersgame2 = findMatch[1];


    			 game3 = findMatch[2];
    			var usersgame3 = findMatch[2];
    				console.log(findMatch[0]);
                    if (findMatch.length==1){
					document.getElementById("g1").innerHTML = game1.get("name");

                    }
					else if( findMatch.length ==2){
                        document.getElementById("g1").innerHTML = game1.get("name");
                        document.getElementById("g2").innerHTML = game2.get("name");
					
                }
                else if (findMatch.length==3){

                    document.getElementById("g1").innerHTML = game1.get("name");
                    document.getElementById("g2").innerHTML = game2.get("name");
                    document.getElementById("g3").innerHTML = game3.get("name");


                }



    			//var usermatches = findMatch[i].get("name");
    			//var players= findMatch[i].get("companyIds");



    	//$("<tr id='fox'></tr>").append("<td id ='matchNAME'>"+usermatches+"</td>").append("<td id ='usersInMatches'><a href='game.html'>"+players+"</a></td>").appendTo("#matchlist");

    			
    				
    		

    		

    			

    				
    			//$('td').on('click', 'usermatches', function gname() { var matchname = usermatches; });
    			

            
    		
    		}
    		}
    		},
    		error:function(error){
    			alert("No matches aviable");
    		}
    	});


  } ,
  error:function(error){

alert("nope");
  }
});   

};



$("tr").live('click', function() {
    if (this.id == "g1") {
         var selectedgame= game1.id;
        console.log(selectedgame);
        localStorage.setItem("matchid",selectedgame);
       window.location = "game.html";

    }
    else if (this.id =="g2"){
    	 selectedgame = game2.id;
    	localStorage.setItem("matchid",selectedgame);
        window.location = "game.html";
    }
    else if (this.id=="g3"){
    	selectedgame = game3.id;
    	localStorage.setItem("matchid",selectedgame);
        window.location = "game.html";
    }
});




function loaduserstats(){
var matchid=localStorage.getItem("matchid");

var compID = localStorage.getItem("companyId");

//test turn display function

var queryM = new  Parse.Query("Match");
queryM.equalTo("objectId",matchId);
queryM.find({
success: function(match){
numberOfTurns = match[0].get("turn")
document.getElementById('turns').innerHTML = " quarter: " + numberOfTurns;

},
error: function(error){
  console.log("gameover failed");
}

})

var Match = Parse.Object.extend("Match");
var CompMatch = Parse.Object.extend("CompMatch");
var query = new Parse.Query("CompMatch");
query.equalTo("matchId" ,matchid);
query.equalTo("companyId" ,compID);
query.find({
            success: function(result){
                    
                var compinfo = result[0];

                var querycapital =  compinfo.get("capital");
               var queryProduction = compinfo.get("production");
                var queryPrice = compinfo.get("price");
                var queryResearchDevelopment = compinfo.get("researchDevelopment");
                var queryMarketing = compinfo.get("marketing");
                var queryCharity = compinfo.get("charity");
               
                 
var xChapital = document.getElementById("capital");
xChapital.value = querycapital;



var xPrice = document.getElementById("price");
xPrice.value = queryPrice;

var xCharity = document.getElementById("charity");
xCharity.value = queryCharity;

var xProduction = document.getElementById("production");
xProduction.value = queryProduction;


var xResearchDevelopment = document.getElementById("researchDevelopment");
xResearchDevelopment.value = queryResearchDevelopment;



var xMarketing = document.getElementById("marketing");
xMarketing.value = queryMarketing;


 document.getElementById('labelCapital').innerHTML = " Capital : " + querycapital;

 document.getElementById('labelPrice').innerHTML = " Production :" +queryPrice;

  document.getElementById('labelCharity').innerHTML = " Charity :" +queryCharity;

   document.getElementById('labelProduction').innerHTML = " Price : " +queryProduction;

    document.getElementById('labelResearchDevelopment').innerHTML = " ResearchDevelopment :" +queryResearchDevelopment;

     document.getElementById('labelMarketing').innerHTML = " Marketing :" +queryMarketing;


                
},
error : function(error){

    console.log("nah man")
}



});
};

function gameOver(){
// game over function , saves the user reusults , and than deletes the match 

// this can be replaced with the match query which is done at the bottom..
var matchid=localStorage.getItem("matchid");

var CompMatch = Parse.Object.extend("CompMatch");

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









alert("The winner is " + winner1 + " : second winner"+ winner2 + " : the third winner is " + winner3);
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

},
error: function(error){
    console.log("not working");
}

});

return null
}).then(function(result){


})

};


function testNetworth(){
//get the keys to do the search


// this is a test , make sure to change values to network instead o marketing
var matchid=localStorage.getItem("matchid");

var CompMatch = Parse.Object.extend("CompMatch");

var query = new Parse.Query("CompMatch");
query.equalTo("matchId" , matchid);
query.descending("marketing");
query.include("objectId");

query.find().then(function(rankings){
  
console.log(rankings);
var rank1 = rankings[0].get("marketing");
console.log(rank1);
var rank2=rankings[1].get("marketing");
console.log(rank2);
var rank3=rankings[2].get("marketing");
console.log(rank3);
var rank4= rankings[3].get("marketing");
console.log(rank4);
var rank5= rankings[4].get("marketing");
console.log(rank5);
var rank6= rankings[5].get("marketing");
console.log(rank6);


rankings[0].set("rank",1);
rankings[1].set("rank",2);
rankings[2].set("rank",3);
rankings[3].set("rank",4);
rankings[4].set("rank",5);
rankings[5].set("rank",6);



return rankings.save();
}).then(function(result){

})

//console.log(rank1 + " " + rank2 + " "rank3 + " " + rank4 + " "+ rank5 + " "+ rank6);


  };




function playerSubmit(){


//get the keys to do the search
var matchid=localStorage.getItem("matchid");
var compID = localStorage.getItem("companyId");



// find out what the player wants to change his prices to


//error checking so he doesn't pass the maxes







var Match = Parse.Object.extend("Match");
var CompMatch = Parse.Object.extend("CompMatch");
var query = new Parse.Query("CompMatch");

    var  playerstats = {};
playerstats.companyId = compID;
playerstats.matchId= matchid;
playerstats.clientProduction=this.$("#production").val();
playerstats.clientResearchDevelopment=this.$("#researchDevelopment").val();
playerstats.clientMarketing= this.$("#marketing").val();
playerstats.clientCharity =this.$("#charity").val();
playerstats.clientPrice = this.$("#price").val();
playerstats.clientCapital =this.$("#capital").val();
console.log(playerstats.clientPrice);
console.log(playerstats.clientProduction);
console.log(playerstats.clientMarketing);


var  match = {};
match.matchId = matchid;
console.log("matchid");

Parse.Cloud.run('submitSolo', playerstats, {


    success: function(works){


 
        
    },
    error:function(error){

        console.log("Nah boi");
    }
});



Parse.Cloud.run('turn', match, {


    success: function(works){
  

  console.log("it ran")

 
        
    },
    error:function(error){

        console.log("Nah boi");
    }
});








};



