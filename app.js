var myApp = angular.module("myApp", ["ngRoute"]);

// config routes, inject template into ng-view
myApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "default.html"
        })
        .when("/hello", {
            templateUrl: "hello.html",
            controller: "NameCtrl"
        })
        .when("/todo", {
            templateUrl: "todo.html",
            controller: "TodoCtrl"
        })
        .when("/countries", {
            templateUrl: "countries.html",
            controller: "CountryCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
});

myApp.controller("NameCtrl", function($scope){
    var count = 0;
    $scope.name = "noname" + count;

    setInterval(function(){
        count++;
        $scope.name = "noname" + count;
        $scope.$apply();
    }, 1000);
});

myApp.controller("TodoCtrl", function($scope){
    $scope.todos = ["foo", "bar", "foobar"];

    $scope.addTodo = function(){
        // angular does not allow duplicates in ng-repeat
        if($scope.enteredTodo && $scope.todos.indexOf($scope.enteredTodo) < 0)
            $scope.todos.push($scope.enteredTodo);
        $scope.enteredTodo = "";
    };

    $scope.removeTodo = function(item){
        var p = $scope.todos.indexOf(item);
        if(p > -1)
            $scope.todos.splice(p, 1);
    };
});

// note: implicit dependency injection will break with code minification
myApp.controller("CountryCtrl", function($scope, $http){
    $scope.sortField = "name";
    $scope.reverseSort = false;

    $scope.setSort = function(newSortField){
        $scope.reverseSort = $scope.sortField == newSortField ? !$scope.reverseSort : true;
        $scope.sortField = newSortField;
    };

    $http.get("countries.json")
        .success(function(data){
            $scope.countries = data;
        });
});