//wrap the whole function in closure
(function() {
	//now that we've removed product related functionality, we need to tell this app variable 
	//that it has a dependency in store-products
	var app = angular.module('store',['products']);
	
	//using the filter from @jeffjohnson9046 from the percent-filter.js
	// This filter makes the assumption that the input will be in decimal form (i.e. 17% is 0.17).
	app.filter('percentage', ['$filter', function ($filter) {
		return function (input, decimals) {
			return $filter('number')(input * 100, decimals) + '%';
		};
	}]);
	
	//important that StoreController be in caps and that it has Controller included in it
	app.controller('StoreController', function() {
		this.products = beers;
	});
	
	//service method instead of factory. seems to be more straightforward.
	app.service('BrewReviewService', function($http, $q){
		 
		this.message = function(num) {
			return [num, num* num];
		}
		this.brewReviewFromParse = function(beerType) {
			var deferred = $q.defer();
			var encoded = encodeURIComponent('where={"beer":"'+ beerType +'"}');
			var baseUrl = 'https://api.parse.com/1/classes/Review?';
			var fullUrl = baseUrl + encoded;
			
			$http({method : 'GET',
				   url : fullUrl, 
				   headers: { 'X-Parse-Application-Id':'WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi', 'X-Parse-REST-API-Key':'Gc8NJ6LtoyZ7JBXbT6GYKUABWcXFIltFti7qxhqm'}
				 })
				.success(function(data, status) {
					deferred.resolve(data);
				})
				.error(function(data, status) {
					deferred.reject('There was an error');
				})
				
			return deferred.promise;
		}
	 
	});
	 
	app.controller('BrewReviewController', function($scope, BrewReviewService) {
		$scope.parseData = [];
		
		$scope.doubleWord = function() {
			$scope.response = BrewReviewService.message($scope.numero);
		}
		
		$scope.callParseData = function(beerType) {
			BrewReviewService.brewReviewFromParse(beerType)
							 .then(function(data) {
								$scope.parseData = data.results;
							 }, function(data) {
								alert(data);
							 })
		}
		
	});
	
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
