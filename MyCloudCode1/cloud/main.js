// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//  response.success("Hello world!");
//});
 
Parse.Cloud.define("animal", function(request, response) {
 
	console.log(request.params);
    var Company = Parse.Object.extend("GameScore");
    var company = new Company();

    company.set(request.params.playerName);
    company.set(request.params.price);

    company.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + company.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});
  response.success(request.params.price);
 
});