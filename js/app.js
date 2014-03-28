window.app = angular.module("Mangekyou", []);

window.app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

window.app.controller('formController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function(){
		var request = {
			 		opinion: $scope.opinion,
					label:  $scope.label,
					type: $scope.type
		}
		$http.post('http://localhost:5984/' + $scope.userid, request);
	}
}])
