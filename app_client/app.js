var app = angular.module('TuneBox', ['ngResource', 'ngRoute', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/index.view.html',
      controller: 'homeCtrl'
    })
    .when('/browse', {
      templateUrl: 'partials/browse.view.html',
      controller: 'roomlistingCtrl'
    })
    .when('/register', {
      templateUrl: 'partials/register.view.html',
      controller: 'registerCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.view.html',
      controller: 'loginCtrl'
    })
    .when('/room', {
      templateUrl: 'partials/room.view.html',
      controller: 'youtubeCtrl'
    })
    .when('/create-room', {
      templateUrl: 'partials/create-room.html',
      controller: 'roomcreationCtrl'
    })
    .when('/rooms', {
      templateUrl: 'partials/rooms.html',
      controller: 'roomlistingCtrl'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.view.html',
      controller: 'profileCtrl'
    })
    .when('/room/:roomid', {
      templateUrl: 'partials/room.view.html',
      controller: 'roomCtrl'
    })
    .when('/room/edit/:roomId', {
      templateUrl: 'partials/editRoom.view.html',
      controller: 'editRoomCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);