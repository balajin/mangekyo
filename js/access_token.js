var app = angular.module("access_token", []);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.post = { 'Content-Type' : 'application/x-www-form-urlencoded' };
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.controller('get_token', ['$scope', '$http', function($scope, $http) {
        url = location.href;
        c = url.lastIndexOf("code");
        end = url.lastIndexOf("state");
        auth_code = url.substr( c+5 ,  ( end - c - 6 ));
        $http.post("http://localhost:5555/toook?client_id=7577fwxufljky5&client_secret=GAs0Uqv4RTllDH0z&grant_type=authorization_code&code="+auth_code+"&redirect_uri=http://localhost:5555/auth_form.html").success( function ( data, status, headers, config ) {

            window.access_token = data["access_token"];
            var c_promise = get_connections( $http );
            c_promise.then(function(data){ 
                $http.post('http://localhost:5984/_replicator', data);
                window.location.href = "http://localhost:5555/app.html"
            })

        }).error( function ( data, status, headers, config ){
        })
}]);



var get_connections = function( http ){

            var deferred = Q.defer();
            http.get("http://localhost:5555/connections?format=json&oauth2_access_token="+ window.access_token ).success( function ( data, status, headers, config ) {
                var connection_ids = []
                for ( var i = 0; i < data['values'].length; i ++){
                    connection_ids.push( data["values"][i]["id"])
                }
                deferred.resolve( connection_ids );

            }).error( function ( data, status, headers, config ){
                deferred.reject();

            })
            return deferred.promise;

}
