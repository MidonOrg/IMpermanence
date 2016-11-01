IMpermanenceApp.controller('AuthCtrl', function (Auth, $state, md5, $firebaseObject) {
    var authCtrl = this;
    var usersRef = firebase.database().ref().child('users');

    authCtrl.user = {
        name: '',
        password: '',
    };

    authCtrl.login = function () {
        Auth.$signInWithEmailAndPassword(authCtrl.user.name + '@IMpermanence.com', authCtrl.user.password)
            .then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.email);
                $state.go('home', {}, {
                    reload: true
                });
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
    };

    authCtrl.register = function () {
        Auth.$createUserWithEmailAndPassword(authCtrl.user.name + '@IMpermanence.com', authCtrl.user.password)
            .then(function (firebaseUser) {
                console.log("User " + firebaseUser.email + " created successfully!");
                firebaseUser.updateProfile({
                    displayName: authCtrl.user.name
                }).then(function () {
                    var user = $firebaseObject(usersRef.child(firebaseUser.uid));
                    user.emailHash = md5.createHash(firebaseUser.email);
                    user.displayName = authCtrl.user.name;
                    user.$save().then(function () {
                        $state.go('messenger');
                    });
                });
                $state.go('home', {}, {
                    reload: true
                });
            }).catch(function (error) {
                console.error("Error: ", error);
            });
    };
});