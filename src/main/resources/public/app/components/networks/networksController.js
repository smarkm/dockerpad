app.controller("networksController",function($scope,$http){
	$http.get("/api/networks").then(function(rs){
			$scope.networks = rs.data;
			console.log(rs)
		})
})
app.controller("networkInfoController",function($scope,$http,$routeParams){
	nId = $routeParams.nId;
	$http.get("/api/networks/"+nId).then(function(rs){
			$scope.net = rs.data
		})
})
