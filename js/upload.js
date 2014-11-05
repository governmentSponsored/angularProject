//wrap the whole function in closure
(function() {
	var app = angular.module('upload',['angularFileUpload']);
	
	/*app.controller('UploadController', function($scope, FileUploader) {
		$scope.uploader = new FileUploader();
	});*/
	
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
	
	app.directive('uploadParseForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'html/upload-parse-form.html'
		};
	});

	app.controller('ExampleController', ['$scope', function($scope) {
	    $scope.master = {};

	    $scope.update = function(user) {
	        $scope.master = angular.copy(user);
	        console.log($scope.master);
	    };

	    $scope.setFiles = function(element) {
		    $scope.$apply(function($scope) {
		     	console.log('files:', element.files);
		      	// Turn the FileList object into an Array
		        $scope.files = []
		        for (var i = 0; i < element.files.length; i++) {
		          $scope.files.push(element.files[i])
		        }
		    });
	    };
    }]);
})();