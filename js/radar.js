window.app.controller('radarController', ['$scope', '$http', function($scope, $http){
	$http.get('http://localhost:5984/mangekyou/_design/radar/_view/fetch', {
		params: {
			reduce: true,
			key: "\"df\""
		}
	}).success(function(data, status, headers, config){
		$scope.response=data.rows[0].value;
		populate_watches();
	})

	function merge(map, anotherMap){
		var result = {};
		for(var i in map){
			result[i] = map[i];
			result[i] = result[i].concat(anotherMap[i]);
		}
		return result;
	}

	function populate_watches(){
		$http.get('http://localhost:5984/mangekyou/_design/radar/_view/friends', {
			params: {key:"\"df\""}
		}).success(function(data, status, headers, config){
			var friends = data.rows[0].value;
			for(var j in friends){
				$http.get('http://localhost:5984/mangekyou/_design/radar/_view/fetch', {
					params: {
						reduce: true,
						key:"\""+ friends[j] +"\""
					}
				}).success(function(data, status, headers, config){
					if(data.rows[0].value){
						$scope.response = merge($scope.response, data.rows[0].value);
					}
				})		
			}	
		})	
	}
}])

