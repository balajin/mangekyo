var get_coderwall = function( http ){

            var deferred = Q.defer();
            http.get("https://coderwall.com/narainbalaji.json" ).success( function ( data, status, headers, config ) {
                var badge_id = []
                for ( var i = 0; i < data['badges'].length; i ++){
                    badge_id.push( data["badges"][i]["name"])
                }
                deferred.resolve( badge_id );

            }).error( function ( data, status, headers, config ){
                deferred.reject();

            })
            return deferred.promise;

}

