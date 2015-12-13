angular.module('app').controller('sportUserListCtrl', function($scope, sportUser){
    $scope.users = sportUser.query();
});