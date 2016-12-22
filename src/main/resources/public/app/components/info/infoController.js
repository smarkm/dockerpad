app.controller("infoController",function($scope,$http){
	$http.get("/api/info").then(function(rs){
		$scope.info = rs.data;
		console.log(rs)
	})
})
