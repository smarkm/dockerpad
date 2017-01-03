app.controller('hostController',function($scope,$http,$rootScope,$routeParams){
	var id = $routeParams.id;
	$http.post("/dockerpad/host",{"id":id}).then(function(rs){
		
		var host = rs.data;
		if(host!=""){
			$("#host").text("Docker Host:"+host.name);
			$scope.host = host;
		}
	})
	$scope.loadImages = function(){
		$http.post("/dockerpad/host/images",{"id":$scope.host.id}).then(function(rs){
			var images = rs.data;
			$scope.images = images;
			$("#imageTitle").text("Image("+images.length+")")
		})
	}
	$scope.loadContainers = function(){
		$http.post("/dockerpad/host/containers",{"id":$scope.host.id}).then(function(rs){
			var containers = rs.data;
			$scope.containers = containers;
			$("#containerTitle").text("Containers("+containers.length+")")
			$scope.containerChart();
		})
	}
	$scope.loadNetworks = function(){
		$http.post("/dockerpad/host/networks",{"id":$scope.host.id}).then(function(rs){
			var networks = rs.data;
			$scope.networks = networks;
			$("#networkTitle").text("Networks("+networks.length+")")
		})
	}
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
	$scope.showNetwork = function(id){
		alert(id)
	}
	$scope.useHost = function(k){
		$http.post("/dockerpad/use",{key:k})
		.success(function(rs){
			$rootScope.current = $scope.hosts[k];
		})
	}
	$scope.hello = function(){alert("hello")}
	
	$scope.containerChart = function(){
		var chart;
        var legend;
        var cs =$scope.host.info;
        var chartData = new Array();
        chartData[0]= {type:"Running",count:cs.ContainersRunning};
        chartData[1]= {type:"Paused",count:cs.ContainersPaused};
        chartData[2]= {type:"Stopped",count:cs.ContainersStopped};
        console.log(chartData)
            // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData;
        chart.titleField = "type";
        chart.valueField = "count";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 2;
        
        legend = new AmCharts.AmLegend();
        legend.align = "center";
        legend.markerType = "circle";
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        chart.addLegend(legend);
            // WRITE
        chart.write("containerChart");
	}
})
