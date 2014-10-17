(function() {
	//declare a new app 
	var app = angular.module('products',[]);
	
	/*
	This is a custom directive for product title html
	IMPORTANT: note that *productTitle* will match up to HTML *product-title*
	this means that dashed in HTML translates to camelCase in JavaScript.
	*/
	app.directive('productTitle', function() {
		//returns a directive definition object (a config object that defines how directive will work)
		return {
			restrict: 'E', //define the type of directive. In this case E = Element
			templateUrl: 'product-title.html'
		};
	});
	
	app.directive('productPanels', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-panels.html',
			controller: function() { //bring in controller functionality from below
				this.tab = 1;
		
				//sets the tab value
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
				
				//returns true/false based on whether tab is selected or not
				this.isSelected = function(checkTab) {
					return this.tab === checkTab;
				};
			},
			controllerAs: 'panel' //specify alias of controller
		};
	});
	
	//description panel
	app.directive('productDescription', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-description.html'
		};
	});
	
	//abv panel
	app.directive('productAbv', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-abv.html'
		};
	});
	
	//reviews panel
	app.directive('productReviews', function() {
		return {
			restrict: 'E',
			templateUrl: 'product-reviews.html'
		};
	});
	
	//This functionality was moved to the productPanels directive controller attribute
	/*
	//This controller makes the tab functionality work
	app.controller("PanelController", function() {
		this.tab = 1;
		
		//sets the tab value
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		//returns true/false based on whether tab is selected or not
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});
	*/
	
	//adds new reviews and clears the form once review is added
	app.controller("ReviewController", function() {
		this.review = {};
		
		//appends review w/date to the corresponding beer
		this.addReview = function(product) {
			this.review.createdOn = Date.now();
			product.reviews.push(this.review);
			
			//clears values in the form
			this.review = {};
		};
	});
})();