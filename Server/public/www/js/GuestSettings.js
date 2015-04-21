//main container button event listeners

//SideBar Button event listeners
document.getElementById("registerPic").addEventListener("click", registerPress);
document.getElementById("homeButton").addEventListener("click", homePress);


//Main container Button event listeners


//Side Bar Button Links
function registerPress()
{
  window.location="Register.html";
}
function homePress()
{
  window.location="GuestHome.html";
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