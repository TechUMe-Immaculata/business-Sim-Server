

Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
Parse.$ = jQuery;

var currentUser = Parse.User.current();
var game1;
var game2;
var game3;

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

					document.getElementById("g1").innerHTML = game1.get("name");
					document.getElementById("g2").innerHTML = game2.get("name");
					document.getElementById("g3").innerHTML = game3.get("name");



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





$("tr").live('click', function() {
    if (this.id == "g1") {
        var selectedgame= game1;
        console.log(selectedgame.get("name"));

    }
    else if (this.id =="g2"){
    	 selectedgame = game2;
    	 console.log(selectedgame.get("name"));
    }
    else if (this.id=="g3"){
    	selectedgame = game3;
    	 console.log(selectedgame.get("name"));
    }
})


};
   





/*

function loaduserstats(){
submit work 

var query = new Parse.Query(CompMatch);
query.equalTo("CompMatch", currentUser.id) , var matchid = this.$("#td").val();;

var usercapital 
var userprice
var usercharity
var userprice
var userproduction
var userresearchDevelopment
var usermarketing

};

function playerSubmit(){



var  player = {};
playerstats.objectId = currentUser.id;
playerstats.matchTime = 5;
playerstats.matchName = this.$("#myMatch").val();

var player.capital = usercapital;
var player.price = userprice;
var player.charity = usercharity;
var player.price = userprice;
var player.production = userproduction;
var player.researchDevelopment = userresearchDevelopment;
var player.marketing= usermarketing;

Parse.Cloud.run('match', player, {

	success: function(works){
	
	window.location = "game.html";
		
	},
	error:function(error){

		console.log("Nah boi");
	}
});

};

 });
*/
