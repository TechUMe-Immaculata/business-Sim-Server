
$(function() {
Parse.$ = jQuery;
Parse.initialize("Z8KSlQyzuWQKn449idqkqNYbiH7HWy09US0ws0Ci", "zDzVGtrgvtFN0Sxs6YjkuOq9leznJ4UguavX6bdt");


logIn: function(e) {
var self = this;
var username = this.$("userName").val();
var password = this.$("myPass").val();


	Parse.User.logIn(username , password , {
	  success : function(user) {
		/*Parse.Cloud.run('fire' , {} , {
			success:function(result) {
			
		},
		error : function(error) {
		};
	   
	  });

	}
*/
   response.success("earth");
		}, 
		error : function(error){
		response.error("water");
		};




});

});