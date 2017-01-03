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
			 var nodes = new vis.DataSet([
				     {id: 1, label: $scope.host.name,group: 0},
				     {id: 2, label: 'bridge',group: 2},
				     {id: 3, label: 'host',group: 2},
				     {id: 4, label: 'local',group: 2},
			     ]);

			 // create an array with edges
			 var edges = new vis.DataSet([
				     {from: 1, to: 2},
				     {from: 1, to: 3},
				     {from: 1, to: 4},
			     ]);

			// create a network
			 var container = document.getElementById('mynetwork');
			 var data = {
					 nodes: nodes,
					 edges: edges
			       };
			 var options = {
					 nodes: {
						 shape: 'dot',
		        },};
			 var network = new vis.Network(container, data, options);
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
		 // create an array with nodes
		  var nodes = new vis.DataSet([
		    {id: 1, label: 'Node 1',group: 0},
		    {id: 2, label: 'Node 2',group: 2},
		    {id: 3, label: 'Node 3',group: 2},
		    {id: 4, label: 'Node 4',group: 2},
		    {id: 5, label: 'Node 5',group: 2}
		  ]);

		  // create an array with edges
		  var edges = new vis.DataSet([
		    {from: 1, to: 3},
		    {from: 1, to: 2},
		    {from: 2, to: 4},
		    {from: 2, to: 5}
		  ]);

		  // create a network
		  var container = document.getElementById('mynetwork');
		  var data = {
		    nodes: nodes,
		    edges: edges
		  };
		  var options = {};
		  var network = new vis.Network(container, data, options);
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
});
