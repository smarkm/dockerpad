app.controller("containersController",function($scope,$http){
	runing = "/api/containers/json";
	all = "/api/containers/json?all=1";
	$scope.api = runing;
	$scope.btn_R_A = "Show All"
	showContainer($scope.api,$http,$scope);

	$scope.showAll = function(){
		if($scope.api==runing){
			$scope.api=all;
			$scope.btn_R_A = "Show Running"
		}else{
			$scope.api =runing;
			$scope.btn_R_A = "Show All"
		}
		showContainer($scope.api,$http,$scope);

	};
	$scope.deleteContainer = function(id,name){
		$http.delete("/api/containers/"+id)
			.success(function(rs){
				alert("delete "+name+" ok")
				showContainer($scope.api,$http,$scope);
			})
		showContainer($scope.api,$http,$scope);
	}
	$scope.startContainer = function(id,name){
		$http.post("/api/containers/"+id+"/start")
			.success(function(rs){
				alert("start "+name+" ok")
				showContainer($scope.api,$http,$scope);
			})
			showContainer($scope.api,$http,$scope);
	}
	$scope.stopContainer = function(id,name){
		$http.post("/api/containers/"+id+"/stop")
			.success(function(rs){
				alert("stop "+name+" ok")
				showContainer($scope.api,$http,$scope);
			})
		showContainer($scope.api,$http,$scope);
	}
})

function showContainer(url,http,scope){
	http.get(url).then(function(rs){
		scope.containers = rs.data;
		console.log(rs)
	});
}
