angular.module('myApp', []).
  controller('myController', ['$scope', '$http',
    function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
    $scope.selectedChar = window.location.search.substring(7);
    $scope.characters = [];
    $scope.characterResult = [];
    $scope.character = {};
    $scope.getAll = function() {
      return $http.get('/characters').success(function(data){
        angular.copy(data, $scope.characters);
      });
    };
    $scope.deleteCharacters = function() {
      $http.delete('/characters')
      .success(function(data) {
        console.log("In deletion success");
        $scope.getAll();
      });
    }
    $scope.getChar = function() {
      return $http.get('/getcharacter?name=' + window.location.search.substring(6)).success(function(data){
        angular.copy(data, $scope.characterResult);
        $scope.character = $scope.characterResult[0];
        });
      };

     $scope.getAll();
     $scope.getChar();
    $scope.characterName = window.location.search.substring(6);
     

  }]).directive('card', cardDirective);
  
    function cardDirective () {
    return {
    scope: {
      character: "="
    },
    restrict: "E",
    replace: "true",
    templateUrl: "javascripts/cardDirective.html"
  };
}