IMpermanenceApp.controller('ProfileCtrl', function ($state, $uibModal, md5, auth, profile, Crypt) {
    var profileCtrl = this;
    profileCtrl.profile = profile;
    profileCtrl.username = '';
    profileCtrl.hash = '';
    profileCtrl.symmetricKey = '';
    profileCtrl.asymmetricKey = '';
    profileCtrl.plainText = '';
    profileCtrl.encText = '';
    profileCtrl.AplainText = '';
    profileCtrl.AencText = '';

    profileCtrl.updateProfile = function () {
        profileCtrl.profile.emailHash = md5.createHash(auth.email);
        profileCtrl.profile.$save().then(function () {
            $state.go('messenger');
        });
    };

    profileCtrl.encrypted = CryptoJS.AES.encrypt("This is a test message to check encryption.", "Secret Passphrase");
    profileCtrl.decrypted = CryptoJS.AES.decrypt(profileCtrl.encrypted, "Secret Passphrase");
    profileCtrl.decryptedCleaned = profileCtrl.decrypted.toString(CryptoJS.enc.Utf8);

    profileCtrl.generateSymmetricKey = function () {
        Crypt.generateSymmetricKey().then(function (hash) {
            profileCtrl.symmetricKey = hash;
        });
    };

    profileCtrl.generateAsymmetricKey = function () {
        Crypt.generateAsymmetricKey().then(function (rsa) {
            profileCtrl.asymmetricKey = cryptico.publicKeyString(rsa);
        });
    };

    profileCtrl.encryptSymmetric = function () {
        profileCtrl.encText = Crypt.symmetricEncrypt(profileCtrl.plainText);
        profileCtrl.plainText = '';
    };

    profileCtrl.decryptSymmetric = function () {
        profileCtrl.plainText = Crypt.symmetricDecrypt(profileCtrl.encText);
        profileCtrl.encText = '';
    };

    profileCtrl.encryptAsymmetric = function () {
        profileCtrl.AencText = Crypt.AsymmetricEncrypt(profileCtrl.AplainText).cipher;
        profileCtrl.AplainText = '';
    };

    profileCtrl.decryptAsymmetric = function () {
        profileCtrl.AplainText = Crypt.AsymmetricDecrypt(profileCtrl.AencText).plaintext;
        profileCtrl.AencText = '';
    };

});