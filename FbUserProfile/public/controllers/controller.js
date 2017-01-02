
var myApp = angular.module('myFbApp', ['angularUtils.directives.dirPagination']);
myApp.controller('AppCtrl', function($scope, $http) {


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
	
var refresh = function() {
    $http.get('/userlist').then(function (response) {
        $scope.userlist = response.data;


    });
}
refresh();
	
	$scope.addUser = function() {
  $http.post('/userlist', $scope.user).then(function(response) {
    refresh();
  });
};

	
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/userlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  $http.get('/userlist/' + id).then(function(response) {
    $scope.user = response.data;
  });
};  

$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/userlist/' + $scope.user._id, $scope.user).then(function(response) {
    refresh();
  })
};

})

