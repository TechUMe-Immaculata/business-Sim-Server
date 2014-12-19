/*$.ajax({
  type: "POST",
  url: "https://api.parse.com/1/functions/hello/",
  headers: {
  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
  "Content-Type": "application/json"
  },
  data: {}
})
  .done(function( msg ) {
  // all code here gets run when the POST was successful
  // you can do things like update the console, display an alert, etc...
   alert(msg.result);
  });
  */

  
document.getElementById("btnSubmit").addEventListener("click", sendToSever);

function sendToSever()
{
  var price = document.getElementById("animal");
  window.alert(price);

  /*
  $.ajax({
  type: "POST",
  url: "https://api.parse.com/1/functions/animal/",
  headers: {
  "X-Parse-Application-Id": "Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci",
  "X-Parse-REST-API-Key": "GcLEre3e2D25P14Pno5PbQ11YO0rixhvIoBxv2RG",
  "Content-Type": "application/json"
  },
  data: {'price' : price}
})
  .done(function( msg ) {
  // all code here gets run when the POST was successful
  // you can do things like update the console, display an alert, etc...
 console.log(msg);
   var serverResult = msg.result;
   $("#animalDisplay").html(serverResult);
  });   */

}