IMpermanenceApp.service('Users', function ($firebaseArray, $firebaseObject, Auth) {
    var usersRef = firebase.database().ref().child('users');
    var connectedRef = firebase.database().ref('.info/connected');
    var users = $firebaseArray(usersRef);

    var Users = {
        getGravatar: function (uid) {
            var user = users.$getRecord(uid)
                //return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            return users.$getRecord(uid).emailHash;
        },
        getProfile: function (uid) {
            var user = $firebaseObject(usersRef.child(uid));
            return user;
        },
        getDisplayName: function (uid) {
            return users.$getRecord(uid).displayName;
        },
        setOnline: function (uid) {
            var connected = $firebaseObject(connectedRef);
            var online = $firebaseArray(usersRef.child(uid + '/online'));

            connected.$watch(function () {
                if (connected.$value === true) {
                    online.$add(true).then(function (connectedRef) {
                        connectedRef.onDisconnect().remove();
                    });
                }
            });
        },
        all: users
    };

    return Users;
});