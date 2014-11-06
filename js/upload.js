//wrap the whole function in closure
(function() {
	var app = angular.module('upload',['angularFileUpload']);
	
	//server side upload function
	//abadoning this in favor of parse. It works fine, but just not as cohesive
	/*app.directive('uploadForm', function() {
		return {
			restrict: 'E',
			templateUrl: './html/upload-form.html',
			controller: function($scope, FileUploader) {
				$scope.uploader = new FileUploader({
					url: './angular/server-file-upload/upload.php'
				});
			},
			controllerAs: 'uploadForm'
		};
	});*/

	//parse upload
	app.directive('uploadParseForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'html/upload-parse-form.html'
		};
	});

	app.controller('UploadController', function ($scope, fileReader, $q, $http) {
		console.log(fileReader)
		$scope.getFile = function (theFile) {
			$scope.progress = 0;
			fileReader.readAsDataUrl(theFile, $scope)
					  .then(function(result) {
						  theFile.imageSrc = result;
					  });
		};
	 
		$scope.$on("fileProgress", function(e, progress) {
			$scope.progress = progress.loaded / progress.total;
		});
		
		//two part process to upload a file to parse, because simply uploading it means it's up there but very difficult to retrieve.
		//1: upload the file to parse and get the url of it
		//2: associate that file with a parse class

		$scope.parseBeerSave = function(beer,theFiles) {
			var currentFile;
			Parse.initialize('WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi', 'ihjA6JyiHQ7LHLmPfKCwBRyU2vIRegnJ4m3YvWwu');

			//loop over every file in from the file input (since it's multiple, but it'd work for single select)
			for(var a=0; a<theFiles.length; a++) {
				currentFile = theFiles[a];;

				//need to declare these variables here so they can be referenced in the $.ajax call
				var beer = beer;
				var fullUrl = 'https://api.parse.com/1/files/' + currentFile.name;
				$.ajax({
					type: "POST",
					beforeSend: function(request) { //set headers, optional to have content type for the image upload
					  request.setRequestHeader("X-Parse-Application-Id", 'WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi');
					  request.setRequestHeader("X-Parse-REST-API-Key", 'Gc8NJ6LtoyZ7JBXbT6GYKUABWcXFIltFti7qxhqm');
					  request.setRequestHeader("Content-Type", currentFile.type);
					},
					url: fullUrl,
					data: currentFile,
					processData: false,
					contentType: false,

					//here we pass the uploaded file url (data.url) over to a parse class
					success: function(data) {
						var ParseFile = Parse.Object.extend("Files");
						var parseFile = new ParseFile();
						parseFile.save({
							beerName: beer.name,
							pic: data.url
						}, {
							success: function(object) {
								console.log('yay! added to parse');
							},
							error: function(model, error) {
								console.log('whoops');
							}
						});
						console.log("File available at: " + data.url);
					},
					error: function(data) {
					  var obj = jQuery.parseJSON(data);
					  console.log(obj.error);
					}
				});
			}
		};
	 
	})

	//this gets called after a person has selected files
	//it's done to add those files to an array ($scope.files) to be referred to later
	app.directive("ngFileSelect",function(){

	  return {
		link: function($scope,el){
		  el.bind("change", function(e){
			$scope.files = [];

			//loop over every file in the multiple select input
			for(var i=0; i<(e.srcElement || e.target).files.length; i++) {
				$scope.file = (e.srcElement || e.target).files[i];
				
				//validate that selected files are only images
				if (!$scope.file.type.match(/image.*/)) {
					alert('sorry ' + $scope.file.name + ' is not an image!');
            	} else {
					$scope.getFile($scope.file);
					$scope.files.push($scope.file);
            	}            	

			}
			console.log($scope.files);
		  })
		  
		}
		
	  }
	  
	  
	})
})();

(function (module) {
     
     //do the standard javascript filereader in the angular way
     //this means lots of promises, defers, etc
    var fileReader = function ($q, $log) {
 
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 		
 		//expose the readAsDataURL function to other functions
        return {
            readAsDataUrl: readAsDataURL
        };
    };
 
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);
 
}(angular.module("upload")));