window.app.controller('trendController', ['$scope', '$http', function($scope, $http){
	$http.get('http://localhost:5984/_all_dbs').success(function(data, status, header, config){
		for(var i = 0; i<data.length;i++){
			$scope.result = [];
			if(data[i].indexOf("_") != 0){
				$http.get("http://localhost:5984/"+data[i]+"/_design/radar/_view/trend",{
					params : {
						reduce : true
					}
				}).success(function(count, status, header, config){
					$scope.result.push({
						name: config.url.substring(config.url.indexOf("5984/") + 5, config.url.indexOf("_design") -1),
						value : count.rows[0].value
					})
				})
			}
		}
		$scope.$watch('result', function(){
			$scope.result = _.sortBy($scope.result, function(result){
				return result.value
			}, true).reverse();
		})
	})
}])


