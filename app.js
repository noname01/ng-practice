var myApp = angular.module("myApp", []);

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

myApp.controller("CountryCtrl", function($scope, $http){
    $http.get("countries.json")
        .success(function(data){
            $scope.countries = data;
        });
});