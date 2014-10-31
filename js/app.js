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

	//get the list of beers for the interface
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
	});
})();
