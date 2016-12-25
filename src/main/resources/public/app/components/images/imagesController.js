app.controller("imagesController", function($scope, $http) {
	$http.get("/api/images/json").then(function(rs){
		$scope.images = rs.data;
		console.log(rs)
	})
})