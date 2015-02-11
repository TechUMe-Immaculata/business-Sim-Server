Parse.Cloud.define("averageStars", function(request, response) {
  var sum = 0;
  var j=0;

  var query = new Parse.Query("Comedy");
  query.equalTo("movie", request.params.movie);

  query.find().then(function(results) {
    for (var i = 0; i < results.length; ++i) {
      sum += results[i].get("stars");
      ++j;
    }

    var query2 = new Parse.Query("Drama");
    query2.equalTo("movie", request.params.movie);

    return query2.find();
  }).then(function(results) {
    for (var i = 0; i < results.length; ++i) {
      sum += results[i].get("stars");
      ++j;
    }

    response.success(sum / j);
  }, function(error) {
    response.error("movie lookup failed");
  });
});
