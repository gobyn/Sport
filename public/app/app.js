angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	var routeRoleChecks = {
		admin: {auth: function(sportAuth){
			return sportAuth.authorizeCurrentUserForRoute('admin');
		}}
	}
	
	$locationProvider.html5Mode({ enabled: true, requireBase: false });
	$routeProvider
		.when('/', { templateUrl: '/partials/main/main', controller: 'sportMainCtrl' })
		.when('/admin/users', { templateUrl: '/partials/admin/user-list', controller: 'sportUserListCtrl', resolve: routeRoleChecks.admin });
});

// run function runs after the rest of the module has been loaded
angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'not authorized'){
			$location.path('/');
		}
	})
});