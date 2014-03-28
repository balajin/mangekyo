window.app.controller('adsController', ['$scope', '$http', function($scope, $http){
	var allPoints = [];
	$scope.allAds = [];
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
			allPoints.push({
				label: value.value.label,
				type: value.value.type,
				opinion: highest.key,
				support:highest.value
			})
		}

		for(var i = 0 ; i<allPoints.length;i++){
			$http.get('http://localhost:5984/ads/_design/radar/_view/find', {
				params: {
					key : "\""+ allPoints[i].label +":"+ allPoints[i].opinion +"\""
				}
			}).success(function(data, status, headers, config){
					for (var i in data.rows){
						var value = data.rows[i];
						$scope.allAds.push(value.value);
					}
				
			})
		}
	})
}])


