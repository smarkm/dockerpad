app.controller('hostsController',function($scope,$http,$rootScope){
	$http.get("/dockerpad/dockerhosts").then(function(rs){
		$scope.hosts = rs.data;
		console.log(rs)
	})
	$scope.addHost = function(){
		//$scope.name = $scope.host = $scope.port = "";
		$http.post("/dockerpad/host/add",{name:$scope.name,host:$scope.host,port:$scope.port})
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
		$scope.key = k;
		/*$http.post("/dockerpad/host/edit",{"host.name":name,"host.host":host,"host.port":port,"key":k})
			.success(function(rs){
				$http.get("#hostsMenu")
			})*/
		//alert(name+host+port)
		$("#responsive").modal('toggle');
		
	}
	$scope.updateHost = function(){
		k = $scope.key;
		if(k==undefined){
			$scope.addHost();
			return;
		}
		//$scope.name = $scope.host = $scope.port = "";
		$http.post("/dockerpad/host/update",{"name":$scope.name,"host":$scope.host,"port":$scope.port,"key":k})
			.success(function(rs){
				$("#responsive").modal('toggle');
				$http.get("/dockerpad/dockerhosts").then(function(rs){
					$scope.hosts = rs.data;
					console.log(rs)
					$scope.name = $scope.host = $scope.port = "";
				})
			})
		
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
