app.controller('hostsController',function($scope,$http,$rootScope){
	$http.get("/dockerpad/dockerhosts").then(function(rs){
		$scope.hosts = rs.data;
		console.log(rs)
	})
	$scope.addHost = function(){
		//$scope.name = $scope.host = $scope.port = "";
		$http.post("/dockerpad/add",{Name:$scope.name,Host:$scope.host,Port:$scope.port})
			.success(function(rs){
				$("#responsive").modal('toggle');
				$http.get("/dockerpad/dockerhosts").then(function(rs){
					$scope.hosts = rs.data;
					console.log(rs)
					$scope.name = $scope.host = $scope.port = "";
				})
			})
		
	}
	$scope.editHost = function(name,host,port,k){
		$scope.name = name;
		$scope.host = host;
		$scope.port = port;
		$http.post("/dockerpad/edit",{name:name,Host:host,Port:port,"key":k})
			.success(function(rs){
				$http.get("#hostsMenu")
			})
		//alert(name+host+port)
		$("#responsive").modal('toggle');
		
	}
	$scope.removeHost = function(k){
		$http.post("/dockerpad/remove",{key:k})
			.success(function(rs){
				$http.get("/dockerpad/dockerhosts").then(function(rs){
					$scope.hosts = rs.data;
					console.log(rs)
				})
			})
	}
	$scope.useHost = function(k){
		$http.post("/dockerpad/use",{key:k})
		.success(function(rs){
			$rootScope.current = $scope.hosts[k];
		})
		
		
	}
})
