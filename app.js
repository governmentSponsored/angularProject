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