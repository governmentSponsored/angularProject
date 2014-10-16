//wrap the whole function in closure
(function() {
	var app = angular.module('store',[]);
	
	//important that StoreController be in caps and that it has Controller included in it
	app.controller('StoreController', function() {
		this.products = beers;
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
					author: "thanksforthespam@hotmail.com"
				},
				{
					stars: 1,
					comment: "Booooooo!",
					author: "hahayoustink@hotmail.com"
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
					thumb: "silverBullet_thumb.jpg"
				}
			],
			reviews: [
				{
					stars: 5,
					comment: "WOW WOW WOW!",
					author: "ZOMGtoeverything@hotmail.com"
				},
				{
					stars: 2,
					comment: "Meh?",
					author: "whateverdude@hotmail.com"
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
					author: "ZOMGtoeverything@hotmail.com"
				},
				{
					stars: 5,
					comment: "Crying with joy.",
					author: "5stars4life@hotmail.com"
				},
				{
					stars: 5,
					comment: "I can die happy now",
					author: "5stars2you@hotmail.com"
				}
			]
		}			
	];
	
	app.controller("PanelController", function() {
		this.tab = 1;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});
})();