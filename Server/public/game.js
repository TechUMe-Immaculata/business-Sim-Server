

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


 document.getElementById('labelCapital').innerHTML = " Chapital : " + querycapital;

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




Parse.Cloud.run('submitSolo', playerstats, {


    success: function(works){
  location.reload();

 
        
    },
    error:function(error){

        console.log("Nah boi");
    }
});












};



