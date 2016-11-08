IMpermanenceApp.service("Crypt", function ($q, DoodleHash) {
    var Bits = 1024
    var SymmetricKey = {};
    var RSAkey = {};

    this.generateSymmetricKey = function () {
        var deferred = $q.defer();
        DoodleHash.getHashFromUser().then(function (hash) {
            SymmetricKey = hash;
            deferred.resolve(hash);
        }, function () {
            deferred.reject();
        });
        return deferred.promise;
    }

    this.generateAsymmetricKey = function () {
        var deferred = $q.defer();
        DoodleHash.getHashFromUser().then(function (hash) {
            RSAkey = cryptico.generateRSAKey(hash, Bits);
            deferred.resolve(RSAkey);
        }, function () {
            deferred.reject();
        });
        return deferred.promise;
    }

    this.symmetricEncrypt = function (string) {
        return CryptoJS.AES.encrypt(string, SymmetricKey.toString());
    }

    this.symmetricDecrypt = function (string) {
        return CryptoJS.AES.decrypt(string, SymmetricKey.toString()).toString(CryptoJS.enc.Utf8);
    }

    this.AsymmetricEncrypt = function (string) {
        return cryptico.encrypt(string, cryptico.publicKeyString(RSAkey));
    }

    this.AsymmetricDecrypt = function (string) {
        return cryptico.decrypt(string, RSAkey)
    }

    return this;
})