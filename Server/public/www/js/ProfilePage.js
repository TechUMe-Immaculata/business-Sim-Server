//SideBar Button event listeners
document.getElementById("homeButton").addEventListener("click", homeButtonPress);
document.getElementById("friendsPic").addEventListener("click", friendsPicPress);
document.getElementById("settingsPic").addEventListener("click", settingsPicPress);
document.getElementById("notificationsPic").addEventListener("click", notificationsPicPress);

//Side Bar Button Links
function homeButtonPress()
{
  window.location="Home.html";
}
function friendsPicPress()
{
  window.location="FriendsPage.html";
}
function settingsPicPress()
{
  window.location="SettingsPage.html";
}
function notificationsPicPress()
{
  window.location="NotificationsPage.html";
}


//swipe code for moving the menue to the left when swiped
$(window).load(function(){
        $("[data-toggle]").click(function() {
          var toggle_el = $(this).data("toggle");
          $(toggle_el).toggleClass("open-sidebar");
        });
         $("body").swipe({
              swipeStatus:function(event, phase, direction, distance, duration, fingers)
                  {
                      if (phase=="move" && direction =="right") {
    
                          // $(".container").addClass("open-sidebar");
                           //return false;
                      }
                      if (phase=="move" && direction =="left") {
                           $(".container").removeClass("open-sidebar");
                           return false;
                      }
                  }

          }); 
      });
Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");
    // create company 
    document.getElementById("profileInfoName").innerHTML ="Name: " + name.toString();

    // get user id and company 
    var currentUser = Parse.User.current();
    var name = currentUser.get("username");
    var myUserId = currentUser.id;
    var companyElements;
    var Company = Parse.Object.extend("Company");
    var query = new Parse.Query(Company);
    var myImage = document.getElementById('userProfilePicture');
    var profilePic = currentUser.get("profilePicture");
    console.log(currentUser.get("profilePicture"));
 
   
    document.getElementById("userProfilePicture").innerHTML = "src = '"+profilePic.url()+"'";
    $('#userProfilePicture').hide().attr('src', profilePic.url()).show();
    query.equalTo("userId", myUserId);
  

   
    query.find({
  success: function(results) {
  var companyElements = results[0];
  var companyname = companyElements.get("company");
  var gamesWonNumber = companyElements.get("gamesWon");
  var gamesLostNumber = companyElements.get("gamesLost");
 
  document.getElementById("profileInfoCompanyName").innerHTML ="Company: " + companyname.toString();
  document.getElementById("profileInfoGamesWon").innerHTML ="Games Won: " + gamesWonNumber.toString();

 document.getElementById("profileInfoGamesLost").innerHTML ="Games Lost: " + gamesLostNumber.toString();
  

  },
  error: function(error){

    console.log("error    = " + error.code + "    " + error.message );
  response.error("shit");
  }
});
