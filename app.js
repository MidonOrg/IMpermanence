var IMpermanenceApp = angular.module('IMpermanenceApp', ['firebase', 'ui.router', 'angular-md5']);

IMpermanenceApp.config(function ($stateProvider, $urlRouterProvider) {
    var homeState = {
        name: 'home',
        url: '/',
        cache: false,
        templateUrl: 'splash/splash.html',
        resolve: {
            requireNoAuth: function ($state, Auth) {
                return Auth.$requireSignIn().then(function (auth) {
                        $state.go('messenger');
                    },
                    function (error) {
                        return;
                    });
            }
        }
    }

    var loginState = {
        name: 'login',
        url: '/login',
        cache: false,
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
            requireNoAuth: function ($state, Auth) {
                return Auth.$requireSignIn().then(function (auth) {
                    $state.go('home');
                }, function (error) {
                    return;
                });
            }
        }
    }

    var registerState = {
        name: 'register',
        url: '/register',
        cache: false,
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
            requireNoAuth: function ($state, Auth) {
                return Auth.$requireSignIn().then(function (auth) {
                    $state.go('home');
                }, function (error) {
                    return;
                });
            }
        }
    }

    var profileState = {
        name: 'profile',
        url: '/profile',
        cache: false,
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
            auth: function ($state, Users, Auth) {
                return Auth.$requireSignIn().catch(function () {
                    $state.go('home');
                });
            },
            profile: function (Users, Auth) {
                return Auth.$requireSignIn().then(function (auth) {
                    return Users.getProfile(auth.uid).$loaded();
                });
            }
        }
    }

    var messengerState = {
        name: 'messenger',
        url: '/messenger',
        cache: false,
        controller: 'MessengerCtrl as messengerCtrl',
        templateUrl: 'messenger/index.html',
        resolve: {
            channels: function (Channels) {
                return Channels.$loaded();
            },
            profile: function ($state, Auth, Users) {
                return Auth.$requireSignIn().then(function (auth) {
                    return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                        return profile;
                    });
                }, function (error) {
                    $state.go('home');
                });
            }
        }
    }

    var messengerCreateState = {
        name: 'messenger.create',
        url: '/create',
        cache: false,
        controller: 'MessengerCtrl as messengerCtrl',
        templateUrl: 'messenger/create.html'

    }

    var messengerMessageState = {
        name: 'messenger.messages',
        url: '/{channelId}/messages',
        cache: false,
        templateUrl: 'messenger/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
            messages: function ($stateParams, Messages) {
                return Messages.forChannel($stateParams.channelId).$loaded();
            },
            channelName: function ($stateParams, channels) {
                return '#' + channels.$getRecord($stateParams.channelId).name;
            }
        }
    }

    var messengerDirectState = {
        name: 'messenger.direct',
        url: '/{uid}/messages/direct',
        cache: false,
        templateUrl: 'messenger/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
            messages: function ($stateParams, Messages, profile) {
                return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
            },
            channelName: function ($stateParams, Users) {
                return Users.all.$loaded().then(function () {
                    return '@' + Users.getDisplayName($stateParams.uid);
                });
            }
        }
    }

    var logoutState = {
        name: 'logout',
        url: '/logout',
        cache: false,
        controller: "LogoutCtrl as logoutCtrl"
    }

    $stateProvider.state(homeState);
    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(profileState);
    $stateProvider.state(messengerState);
    $stateProvider.state(messengerCreateState);
    $stateProvider.state(messengerMessageState);
    $stateProvider.state(messengerDirectState);
    $stateProvider.state(logoutState);
    $urlRouterProvider.otherwise('/');
})