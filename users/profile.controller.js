IMpermanenceApp.controller('ProfileCtrl', function ($state, $uibModal, md5, auth, profile, DoodleHash) {
    var profileCtrl = this;
    profileCtrl.profile = profile;
    profileCtrl.username = '';
    profileCtrl.hash = '';

    profileCtrl.updateProfile = function () {
        profileCtrl.profile.emailHash = md5.createHash(auth.email);
        profileCtrl.profile.$save().then(function () {
            $state.go('messenger');
        });
    };

    profileCtrl.encrypted = CryptoJS.AES.encrypt("This is a test message to check encryption.", "Secret Passphrase");
    profileCtrl.decrypted = CryptoJS.AES.decrypt(profileCtrl.encrypted, "Secret Passphrase");
    profileCtrl.decryptedCleaned = profileCtrl.decrypted.toString(CryptoJS.enc.Utf8);

    profileCtrl.launchDoodleModal = function () {
        DoodleHash.getHashFromUser().then(function (hash) {
            profileCtrl.hash = hash;
        });
    };

});