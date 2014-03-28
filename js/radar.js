window.app.controller('radarController', ['$scope', '$http', function($scope, $http){
	$scope.response={
			tool:[],
			technique:[],
			language:[]
	};
	$http.get('http://localhost:5984/balajin/_design/radar/_view/fetch', {
		params: {
			reduce: true,
			group: true
		}
	}).success(function(data, status, headers, config){
		for (var i in data.rows){
			var value = data.rows[i];
			var highest = {
				value : -1,
				key: ""
			}
			for(var j in value.value.opinions){
				if(value.value.opinions[j] > highest.value){
					highest.value = value.value.opinions[j];
					highest.key = j;
				}
			}
			$scope.response[value.value.type].push({
				label: value.value.label,
				type: value.value.type,
				opinion: highest.key,
				support:highest.value
			});
		}
	})
}])


