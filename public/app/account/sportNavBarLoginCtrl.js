angular.module('app').controller('sportNavBarLoginCtrl', function($scope, $http, sportNotifier, sportIdentity, sportAuth){
    $scope.identity = sportIdentity;
    $scope.signin = function(username, password){
        sportAuth.authenticateUser(username, password).then(function(success){
            if(success){
                sportNotifier.notify('You have been successfully signed in!');
            }else{
                sportNotifier.notify('Username/Password combination incorrect');
            }
        });
    }
});