$(document).ready(function() {
	//initial
	$( "#content" ).load( "content/about.html", function() {
		$("body").addClass("about");
		$(".box").addClass("inactive");
		$(".about").removeClass("inactive").addClass("active");
	});

	//handle menu clicks
	 $("li.box").click(function(event){
	 	event.preventDefault();

	 	//first class is the page we are redirecting to
	 	var page = event.target.className.split(" ")[0]
	 	// alert(page)
	 	$("#content").load("content/" + page + ".html");

	 	//change colors (add/remove .active to li)
	 	$("body").removeClass();
	 	$("body").addClass(page);
	 	$(".box").addClass("inactive");
	 	$(".box").removeClass("active");
	 	$(event.target).removeClass("inactive").addClass("active");
	 });

	 $("span").click(function(event){
	 	event.preventDefault();

	 	//first class is the page we are redirecting to
	 	var image = event.target.className.split(" ")[0]
	 	// alert(page)
	 	alert("image");
	 });

});