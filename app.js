//wrap the whole function in closure
(function() {
	var app = angular.module('store',[]);
	
	//important that StoreController be in caps and that it has Controller included in it
	app.controller('StoreController', function() {
		this.product = beer;
	});
	
	var beer = {
		name: "Rising Sun",
		price: 4.99,
		description: "Sour, citrus, and inspired by Japan, the land of the rising sun!"
	}
})();