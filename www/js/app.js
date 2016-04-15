// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.factory('artikelService', function($http) {
  var artikel = [];
  
  return {
    getArtikel: function(){
      return $http.get('http://localhost:8080/api/artikel').then(function(response){
        artikel = response.data;
        return response.data;
      });
    },
    getDetail: function(index){
      console.log(index);
       return $http.get('http://localhost:8080/api/artikel/detail/'+index).then(function(response){
        artikel = response.data[0];
        console.log(artikel);
        return response.data[0];
      });
    }
  }
})

.controller("MainCtrl",function($scope, artikelService){
  artikelService.getArtikel().then(function(artikel){
    $scope.artikel = artikel;
    console.log($scope.artikel);
    console.log(artikel);
  });
})

.controller("ArtikelCtrl",function($scope, $stateParams, artikelService){
  var index = $stateParams.index;
  artikelService.getDetail(index).then(function(artikel){
    $scope.item = artikel;
    console.log($scope.item);
    
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('index', {
    url: "/",
    templateUrl: "halaman/index.html",
    controller: 'MainCtrl'
  })

  .state('artikelDetail', {
    url: "/artikel/:index",
    templateUrl: "halaman/detail.html",
    controller: "ArtikelCtrl"
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});