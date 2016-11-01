IMpermanenceApp.controller('ProfileCtrl', function ($state, md5, auth, profile) {
    var profileCtrl = this;
    profileCtrl.profile = profile;
    profileCtrl.username = '';

    profileCtrl.updateProfile = function () {
        profileCtrl.profile.emailHash = md5.createHash(auth.email);
        profileCtrl.profile.$save().then(function () {
            $state.go('messenger');
        });
    };

    profileCtrl.encrypted = CryptoJS.AES.encrypt("This is a test message to check encryption.", "Secret Passphrase");
    profileCtrl.decrypted = CryptoJS.AES.decrypt(profileCtrl.encrypted, "Secret Passphrase");
    profileCtrl.decryptedCleaned = profileCtrl.decrypted.toString(CryptoJS.enc.Utf8);

});