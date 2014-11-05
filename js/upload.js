//wrap the whole function in closure
(function() {
	var app = angular.module('upload',['angularFileUpload']);
	
	//server side upload function
	app.directive('uploadForm', function() {
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
	});
	
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
		
		$scope.parseBeerSave = function(beer,theFiles) {
			var currentFile;
			Parse.initialize('WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi', 'ihjA6JyiHQ7LHLmPfKCwBRyU2vIRegnJ4m3YvWwu');
			for(var a=0; a<theFiles.length; a++) {
				currentFile = theFiles[a];;
				console.log(currentFile.name + ' ' + currentFile.type);
				var beer = beer;
				var fullUrl = 'https://api.parse.com/1/files/' + currentFile.name;
				$.ajax({
					type: "POST",
					beforeSend: function(request) {
					  request.setRequestHeader("X-Parse-Application-Id", 'WfjtyO2ov01ie5KPiSbOaAvOzBpessMB8iervPEi');
					  request.setRequestHeader("X-Parse-REST-API-Key", 'Gc8NJ6LtoyZ7JBXbT6GYKUABWcXFIltFti7qxhqm');
					  request.setRequestHeader("Content-Type", currentFile.type);
					},
					url: fullUrl,
					data: currentFile,
					processData: false,
					contentType: false,
					success: function(data) {
						var ParseFile = Parse.Object.extend("Files");
						var parseFile = new ParseFile();
						parseFile.save({
							beerName: beer.name,
							pic: data.url
						}, {
							success: function(object) {
								console.log('yay!');
								console.log(object);
							},
							error: function(model, error) {
								console.log('whoops');
							}
						});
						console.log(data);
						console.log("File available at: " + data.url);
					},
					error: function(data) {
					  var obj = jQuery.parseJSON(data);
					  console.log(obj.error);
					}
				});

				/*var promise1 = fileReader.readAsDataUrl(currentFile, $scope);
				promise1.then(function(result) {
					console.log(result);
				});
				console.log('done with loop # ' + a);
				console.log(promise1);*/
			}
		};
	 
	})

	app.directive("ngFileSelect",function(){

	  return {
		link: function($scope,el){
		  
		  el.bind("change", function(e){
			$scope.files = [];
			for(var i=0; i<(e.srcElement || e.target).files.length; i++) {
				$scope.file = (e.srcElement || e.target).files[i];
				$scope.getFile($scope.file);
				$scope.files.push($scope.file);
			}
			console.log($scope.files);
		  })
		  
		}
		
	  }
	  
	  
	})
})();

(function (module) {
     
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
 
        return {
            readAsDataUrl: readAsDataURL
        };
    };
 
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);
 
}(angular.module("upload")));