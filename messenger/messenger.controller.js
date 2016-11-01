IMpermanenceApp.controller('MessengerCtrl', function ($state, Auth, Users, profile, channels) {
    var messengerCtrl = this;

    messengerCtrl.profile = profile;
    messengerCtrl.channels = channels;
    messengerCtrl.getDisplayName = Users.getDisplayName;
    messengerCtrl.getGravatar = Users.getGravatar;
    messengerCtrl.users = Users.all;

    Users.setOnline(profile.$id);

    messengerCtrl.logout = function () {
        messengerCtrl.profile.online = null;
        messengerCtrl.profile.$save().then(function () {
            $state.go('logout');
        });
    };

    messengerCtrl.newChannel = {
        name: ''
    };

    messengerCtrl.createChannel = function () {
        messengerCtrl.channels.$add(messengerCtrl.newChannel).then(function (ref) {
            messengerCtrl.newChannel = {
                name: ''
            };
            $state.go('channels.messages'), {
                channelId: ref.key()
            };
        });
    };
});