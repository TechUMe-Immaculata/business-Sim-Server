//The Variables
// 0 = on  1= off
var NotificationsOnOrOff = 0; 


//SideBar Button event listeners
document.getElementById("homeButton").addEventListener("click", homeButtonPress);

document.getElementById("friendsPic").addEventListener("click", friendsPicPress);
document.getElementById("notificationsPic").addEventListener("click", notificationsPicPress);



//Side Bar Button Links
function homeButtonPress()
{
  window.location="Home.html";
}
function profilePicPress()
{
  window.location="ProfilePage.html";
}
function friendsPicPress()
{
  window.location="FriendsPage.html";
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

//Notifications On/Off buttons.
document.getElementById("NotificationCheckNumber1").addEventListener("click", NotificationCheckNumber1Press);
function NotificationCheckNumber1Press()
{
  document.getElementById("NotificationCheckNumber1").style.background = "#00CC00"; //Bright Green
  document.getElementById("NotificationCheckNumber2").style.background = "#990000"; // Dark Red
  NotificationsOnOrOff = 0;
}

document.getElementById("NotificationCheckNumber2").addEventListener("click", NotificationCheckNumber2Press);
function NotificationCheckNumber2Press()
{
  document.getElementById("NotificationCheckNumber1").style.background = "#006600"; //Dark Green
  document.getElementById("NotificationCheckNumber2").style.background = "#FF1919"; //Bright Red
  NotificationsOnOrOff = 1;
}