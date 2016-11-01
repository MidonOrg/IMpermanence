IMpermanenceApp.controller('MessagesCtrl', function (profile, channelName, messages) {
    var messagesCtrl = this;


    messagesCtrl.messages = messages;
    messagesCtrl.channelName = channelName;
    messagesCtrl.message = '';
    messagesCtrl.sendMessage = function () {
        if (messagesCtrl.message.length > 0) {
            messagesCtrl.messages.$add({
                uid: profile.$id,
                body: messagesCtrl.message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(function () {
                messagesCtrl.message = '';
            });
        }
    }
});

IMpermanenceApp.directive('iconUpdater', function () {
    return {
        link: function ($scope, element, attrs, controller) {
            jdenticon();
        }
    };
});