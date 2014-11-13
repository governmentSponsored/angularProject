//Query(window).on('load', function() {
//$(document).load(addMasonry());
function addMasonry() {
	var container = document.querySelector('.masonry');
	var msnry;
	// initialize Masonry after all images have loaded
	imagesLoaded( container, function() {
	  msnry = new Masonry( container );
	  msnry.layout();
	});
	console.log('hello');
}