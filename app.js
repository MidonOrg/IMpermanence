var IMpermanenceApp = angular.module('IMpermanenceApp', ['firebase', 'ui.router', 'angular-md5', 'ui.bootstrap']);

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

IMpermanenceApp.directive("drawing", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX;
            var lastY;

            element.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }

                // begins new line
                ctx.beginPath();

                drawing = true;
            });
            element.bind('mousemove', function (event) {
                if (drawing) {
                    // get current mouse position
                    if (event.offsetX !== undefined) {
                        currentX = event.offsetX;
                        currentY = event.offsetY;
                    } else {
                        currentX = event.layerX - event.currentTarget.offsetLeft;
                        currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(lastX, lastY, currentX, currentY);

                    // set current coordinates to last one
                    lastX = currentX;
                    lastY = currentY;
                }

            });
            element.bind('mouseup', function (event) {
                // stop drawing
                drawing = false;
            });

            // canvas reset
            function reset() {
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY) {
                // line from
                ctx.moveTo(lX, lY);
                // to
                ctx.lineTo(cX, cY);
                // color
                ctx.strokeStyle = "#4bf";
                // draw it
                ctx.stroke();
            }
        }
    };
});