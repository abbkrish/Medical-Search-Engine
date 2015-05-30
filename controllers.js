function ListCtrl($scope, $http) {
  $scope.data = {message: "OHSNAPZ"};
  $scope.message = "wtf4";
  $http.get('/api/post').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function AddCtrl($scope, $http, $location) {
  /*
  console.log('omgsgsgdgsd');
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
  */
  $scope.tilt = 'ot';
}

function UpdateCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeleteCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}

angular.module('myApp').controller('ListCtrl', ListCtrl);
