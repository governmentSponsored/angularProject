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
					url: './angular/file-upload/simple/upload.php'
				});
			},
			controllerAs: 'uploadForm'
		};
	});
	
	app.directive('uploadParseForm', function() {
		return {
			restrict: 'E',
			templateUrl: './html/upload-parse-form.html'
		};
	});
})();