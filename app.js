var myApp = angular.module("myApp", []);

myApp.controller("NameCtrl", function($scope){
    var count = 0;

    $scope.name = "noname" + count;
    $scope.names = ["foo", "bar", "foobar"];

    $scope.addName = function(){
        // angular does not allow duplicates in ng-repeat
        if($scope.enteredName && $scope.names.indexOf($scope.enteredName) < 0)
            $scope.names.push($scope.enteredName);
        $scope.enteredName = "";
    };

    $scope.removeName = function(name){
        var p = $scope.names.indexOf(name);
        if(p > -1)
            $scope.names.splice(p, 1);
    };

    setInterval(function(){
        count++;
        $scope.name = "noname" + count;
        $scope.$apply();
    }, 1000);
});