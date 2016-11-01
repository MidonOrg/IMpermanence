IMpermanenceApp.controller('LogoutCtrl', function ($state, Auth) {
    Auth.$signOut().then(function () {
        $state.go('home');
    });
});