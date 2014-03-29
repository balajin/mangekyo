window.app.controller('changeController', ['$scope', '$http', function($scope, $http) {
	$scope.submit = function(){
		$http.get('http://localhost:5984/' + $scope.userid + '/_design/radar/_view/findByLabel/', {
			params : {
				key: "\""+$scope.label + "\""
			}
		}).success(function(data, status, header, config){
			var value = data.rows[0].value;
			value.changes = value.changes || [];
			value.changes.push({
				prev:value.opinion,
				now:$scope.opinion
			})
			value.opinion = $scope.opinion;
			$http.put('http://localhost:5984/' + $scope.userid + '/' + value._id, value);
		});
	}
}])
