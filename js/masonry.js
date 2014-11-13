//Query(window).on('load', function() {
$(document).load(function() {
	var container = document.querySelector('.masonry');
	var msnry = new Masonry(container, {
			// options
	  		itemSelector: '.item'
	});	
});