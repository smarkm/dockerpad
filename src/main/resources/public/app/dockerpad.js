var app = angular.module('dockerpad',['ngRoute','pascalprecht.translate'],function ($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function (obj) {
        var query = "", name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + "[" + i + "]";
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + "&";
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + "[" + subName + "]";
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + "&";
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
            }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== "[object File]" ? param(data) : data;
    }];
});
app.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'app/components/dashboard/dashboard.html',
      controller  : 'dashboardController'
    })
    .when('/hostsMenu',{
    	templateUrl : 'app/components/hosts/hosts.html',
    	controller : 'hostsController'
    })
    .when('/imagesMenu',{
    	templateUrl : 'app/components/images/images.html',
    	controller : 'imagesController'
    })
    .when('/containers',{
    	templateUrl : 'app/components/containers/containers.html',
    	controller : 'containersController'
    })
    .when('/networks',{
    	templateUrl : 'app/components/networks/networks.html',
    	controller : 'networksController'
    })
    .when('/networkInfo/:nId',{
      templateUrl : 'app/components/networks/networkinfo.html',
      controller : 'networkInfoController'
    })
    .when('/users',{
    	templateUrl : 'app/components/users/users.html',
    	controller : 'usersController'
    })
    .when('/info',{
    	templateUrl : 'app/components/info/info.html',
    	controller : 'infoController'
    })
    .when('/about',{
    	templateUrl : 'app/components/about/about.html',
    	controller : 'abountController'
    })
    .when('/host/:id',{
    	templateUrl : 'app/components/hosts/host.html',
    	controller : 'hostController'
    }).otherwise({
            redirectTo : '#ios'
        })
    //.otherwise();
});


app.config(function($translateProvider) {
  $translateProvider
  .translations('en', {
  	//L(Lable)_F(Function)_M(Menu)_Name
    L_F_M_Dashborad: 'Dashbord',
    L_F_M_Hosts: 'Hosts',
    L_F_M_Images: 'Images',
    L_F_M_Containers: 'Containers',
    L_F_M_Networks: 'Networks',
    L_F_M_Info: 'Info',
    L_F_M_Users: 'Users',
    L_F_M_About: 'About'
  })
  .translations('zh', {
    L_F_M_Dashborad: '概览',
    L_F_M_Hosts: '主机管理',
    L_F_M_Images: '镜像管理',
    L_F_M_Containers: '容器管理',
    L_F_M_Networks: '网络管理',
    L_F_M_Info: '主机信息',
    L_F_M_Users: '用户管理',
    L_F_M_About: '关于'
  });
   $translateProvider.preferredLanguage('en');
});
