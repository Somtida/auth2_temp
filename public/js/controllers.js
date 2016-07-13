'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, $q) {
  console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        // console.log("res");
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});


app.controller('loginCtrl', function($scope, $state, $auth) {
  console.log('loginCtrl!');

  $scope.login = () => {
    $auth.login($scope.user)
      .then(res => {
        console.log('res:', res);
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

});


app.controller('registerCtrl', function($scope, $state, $auth) {
  console.log('registerCtrl!');

  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords must match.  Try again.');
    } else {

      $auth.signup($scope.user)
        .then(res => {
          console.log('res:', res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
        });
    }
  };

});

app.controller('profileCtrl', function($scope, Profile) {
  console.log('profileCtrl!');

  $scope.user = Profile;

});


app.controller('usersCtrl', function($scope, Users, $state, User) {
  console.log('usersCtrl!');

  $scope.users = Users;

  $scope.toggleAuthorization = (user) => {

    console.log("user: ", user);
    User.toggleAuthor(user._id)
      .then(res=>{
        console.log("res: ",res);
        user.admin = !user.admin;
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }
  // $scope.toggleAuthorization = (index) => {
  //   console.log("index: ",index);
  //   console.log("user: ", $scope.users[index]);
  //   User.toggleAuthor($scope.users[index]._id)
  //     .then(res=>{
  //       console.log("res: ",res);
  //       $state.reload('users')
  //     })
  //     .catch(err => {
  //       console.log("err: ",err);
  //     })
  // }

});
