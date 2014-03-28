var app = angular.module("Mangekyou", []);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.controller('formController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function(){
		var request = {
			opinion: $scope.opinion,
			userid: $scope.userid,
			label:  $scope.label,
			type: $scope.type 
		}
		$http.post('http://localhost:5984/mangekyou', request);
	}
}])
