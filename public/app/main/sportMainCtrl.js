angular.module('app').controller('sportMainCtrl', function($scope){
	$scope.activities = [
	        { date: new Date('11/12/2015'), type: 'Training', isComplete:true},
	        { date: new Date('11/18/2015'), type: 'Wedstrijd', isComplete:false}
	    ]
});