//wrap the whole function in closure
(function() {
	var app = angular.module('store',[]);
	
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
	
	//important that StoreController be in caps and that it has Controller included in it
	app.controller('StoreController', function() {
		this.products = beers;
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
	
	//using the filter from @jeffjohnson9046 from the percent-filter.js
	// This filter makes the assumption that the input will be in decimal form (i.e. 17% is 0.17).
	app.filter('percentage', ['$filter', function ($filter) {
		return function (input, decimals) {
			return $filter('number')(input * 100, decimals) + '%';
		};
	}]);
	
	// /angular/img/
	var beers = [
		{
			name: "Rising Sun",
			price: 4.99,
			description: "Sour, citrus, and inspired by Japan, the land of the rising sun!",
			canPurchase: true,
			cannotPurchase: false,
			soldOut: false,
			abv: 0.06,
			images: [
				{
					full: "risingSun.jpg",
					thumb: "risingSun_thumb.jpg"
				},
				{
					percent50: "risingSun_50.jpg",
					percent25: "risingSun_25.jpg"
				}
			],
			reviews: [
				{
					stars: 4,
					comment: "Really good job!",
					author: "thanksforthespam@hotmail.com",
					createdOn: 1413552886810
				},
				{
					stars: 1,
					comment: "Booooooo!",
					author: "hahayoustink@hotmail.com",
					createdOn: 1413552886810
				}
			]
		},
		{
			name: "Silver Bullet",
			price: 0.5,
			description: "Mmmm, cold. Cause that's the important thing here.",
			canPurchase: true,
			cannotPurchase: false,
			soldOut: false,
			abv: 0.01,
			images: [
				{
					full: "silverBullet.jpg",
					thumb: "silverBullet_thumb.jpg",
				}
			],
			reviews: [
				{
					stars: 5,
					comment: "WOW WOW WOW!",
					author: "ZOMGtoeverything@hotmail.com",
					createdOn: 1413552886810
				},
				{
					stars: 2,
					comment: "Meh?",
					author: "whateverdude@hotmail.com",
					createdOn: 1413552886810
				}
			]
		},
		{
			name: "Two Hearted",
			price: 2.99,
			description: "So darn good. Hoppy and delicious.",
			canPurchase: true,
			cannotPurchase: false,
			soldOut: true,
			abv: 0.07,
			images: [
				{
					full: "twoHearted.jpg",
					thumb: "twoHearted_thumb.jpg"
				},
				{
					percent50: "twoHearted_50.jpg",
					percent25: "twoHearted_25.jpg"
				}
			],
			reviews: [
				{
					stars: 5,
					comment: "Speachless!",
					author: "ZOMGtoeverything@hotmail.com",
					createdOn: 1413552886810
				},
				{
					stars: 5,
					comment: "Crying with joy.",
					author: "5stars4life@hotmail.com",
					createdOn: 1413552886810
				},
				{
					stars: 5,
					comment: "I can die happy now",
					author: "5stars2you@hotmail.com",
					createdOn: 1413552886810
				}
			]
		}			
	];
})();