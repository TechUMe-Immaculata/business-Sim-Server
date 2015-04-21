//main container button event listeners
document.getElementById("quickPlayButton").addEventListener("click", quickPlayButtonPress);
document.getElementById("privateGameButton").addEventListener("click", privateGameButtonPress);

//SideBar Button event listeners
document.getElementById("userProfilePicture").addEventListener("click", profilePicPress);
document.getElementById("friendsPic").addEventListener("click", friendsPicPress);
document.getElementById("signOutButton").addEventListener("click", signOutPress);
document.getElementById("settingsPic").addEventListener("click", settingsPicPress);
document.getElementById("notificationsPic").addEventListener("click", notificationsPicPress);

//Main container Button event listeners
function quickPlayButtonPress()
{
	window.location="GuestGameSingleOrMultiplayer.html";
}

function privateGameButtonPress()
{
  window.location="PrivateGames.html";
}

//Side Bar Button Links
function profilePicPress()
{
  window.location="ProfilePage.html";
}
function friendsPicPress()
{
  window.location="FriendsPage.html";
}

//This function signs out the user, and then returns them to the sign in page
function signOutPress()
{
  Parse.User.logOut();
 
  var currentUser = Parse.User.current();  // this will now be null

  window.location="NewUserHome.html";

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

    // get user id and company 
    var currentUser = Parse.User.current();
    var name = currentUser.get("username");
    var myUserId = currentUser.id;
    var profilePic = currentUser.get("profilePicture");
   
 
   

    $('#userProfilePicture').hide().attr('src', profilePic.url()).show();

  

   
  