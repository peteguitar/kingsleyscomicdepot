$("#search-button").click(function() {
	var hero = $("#search-input").val().trim();
	$.get("/hero/" + hero, function(data) {
		console.log(data);
var template = "<div>" + "<p>Title: " + data[0].title + "</p>" + "</div>";


$("#output").html(template); })

})


