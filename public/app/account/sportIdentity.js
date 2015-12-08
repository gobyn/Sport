angular.module('app').factory('sportIdentity', function(){
    return{
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});