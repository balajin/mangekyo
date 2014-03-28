var app = angular.module("Mangekyou", []);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.controller('formController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function(){
		var request = {
			_id: $scope.userid,
			allPoints:[
			 	{
			 		opinion: $scope.opinion,
					label:  $scope.label,
					type: $scope.type 
				}
			]
		}
		$http.put('http://localhost:5984/mangekyou/_design/radar/_update/upsert/' + $scope.userid, request);
	}
}])
