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
                        radar_data = $scope.response.value.value;
                        var y_axis = [];
                        var x_axis = [];
                        for ( var i = 0; i < radar_data.length; i++ ){
                            x_axis.push( radar_data[i]["label"] + " " + radar_data[i]["opinion"] );
                            y_axis.push( radar_data[i]["support"] );
                        }
                        var margin = {top: 20, right: 30, bottom: 30, left: 40},
                            width = 460 - margin.left - margin.right,
                            height = 500 - margin.top - margin.bottom;
                        var x = d3.scale.ordinal().domain(x_axis).rangeRoundBands([0, width], .1);
                        var y = d3.scale.linear().range([height, 0]);
                        var chart = d3.select(".chart")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                        x.domain(radar_data.map(function(d) { return d["label"] ; }));
                        y.domain([0,d3.max(radar_data, function(d) { return d["support"]; })]);
                        var bar = chart.selectAll('g').data(radar_data).enter().append("g").attr( "transform", function(d,i) { return "translate("+ x(d["label"]) + ",0)"; });
                        bar.append("rect").attr("y", function(d){return y(d["support"]); } ).attr("height",function(d) { return height - y( d["support"] ); } ).attr("width", x.rangeBand()); 
                        bar.append("text").attr("x", x.rangeBand()  ).attr("y",function(d) { return y( d["support"] ) + 3; } ).attr("dy", ".175em").text( function(d){ return d["label"] + " " + d["opinion"];}); 
                        var xAxis = d3.svg.axis() .scale(x) .orient("bottom");
                        var yAxis = d3.svg.axis() .scale(y) .orient("left");
                        chart.append("g") .attr("class", "y axis") .call(yAxis);
                        chart.append("g") .attr("class", "x axis") .attr("transform", "translate(0," + height + ")") .call(xAxis);

	})
}])


