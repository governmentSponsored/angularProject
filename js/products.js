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
			templateUrl: './html/product-title.html'
		};
	});
	
	//panel functionality (click on abv, review or description will bring up respective tab)
	app.directive('productPanels', function() {
		return {
			restrict: 'E',
			templateUrl: './html/product-panels.html',
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
			templateUrl: './html/product-description.html'
		};
	});
	
	//abv panel
	app.directive('productAbv', function() {
		return {
			restrict: 'E',
			templateUrl: './html/product-abv.html'
		};
	});
	
	//reviews panel
	app.directive('productReviews', function() {
		return {
			restrict: 'E',
			templateUrl: './html/product-reviews.html',
			controller: function($scope, BrewReviewService) {
				$scope.parseData = [];
				this.review = {};
				Parse.initialize('WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi', 'ihjA6JyiHQ7LHLmPfKCwBRyU2vIRegnJ4m3YvWwu');
				var Review = Parse.Object.extend("Review");
				
				//queries parse for each beer
				$scope.callParseData = function(beerType) {
					BrewReviewService.brewReviewFromParse(beerType)
									 .then(function(data) {
										$scope.parseData = data.results;
									 }, function(data) {
										alert(data);
									 })	
				}
				
				//appends review w/date to the corresponding beer
				$scope.addReview = function(product) {
					var author = this.review.author,
					stars = this.review.stars,
					comment = this.review.comment,
					beer = product.name

					var reviewObject = new Review();
					  reviewObject.save({
						author: author,
						stars: stars,
						comment: comment,
						beer: beer
					  }, {
					  success: function(object) {
						//refreshes the list of reviews to include this new review
						$scope.callParseData(beer);
						console.log('saved!');
					  },
					  error: function(model, error) {
						console.log('not saved!');
					  }
					}); 
					
					//clears values in the form and cleans it up
					this.review = {};
					$scope.reviewForm.$setPristine();
				}
			},
			controllerAs: 'BrewReviewCtrl'
		};
	});
	
	//service method to make http requests for beer reviews
	app.service('BrewReviewService', function($http, $q){
		 
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

	//get the list of beers for the view
	app.service('BeerService', function($http, $q){
		 
		this.beersFromParse = function() {
			var deferred = $q.defer();
			var baseUrl = 'https://api.parse.com/1/classes/Beer?';
			
			$http({method : 'GET',
				   url : baseUrl, 
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

	//consume the BeerService service so that the controller can interact with the view
	app.controller('BeerController', function($scope, BeerService) {
		$scope.beerData = [];
		
		$scope.callParseBeerData = function() {
			BeerService.beersFromParse()
							 .then(function(data) {
								$scope.beerData = data.results;
							 }, function(data) {
								alert(data);
							 })
		}

		$scope.addBeer = function() {
			var Beer = Parse.Object.extend("Beer"),
			beerObject = new Review();
			beerObject.save({
				name: name,
				price: price,
				description: description,
				canPurchase: canPurchase,
				soldOut: soldOut,
				abv: abv,
				images: images //woof, need to work on upload picture functionality as well
			}, {
				success: function(object) {
				//refreshes the list of reviews to include this new review
				//$scope.callParseData(beer);
				console.log('saved!');
				},
				error: function(model, error) {
					console.log('not saved!');
				}
			}); 
		}
	});
})();
