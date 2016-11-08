IMpermanenceApp.service("DoodleHash", function ($uibModal, $q) {
    this.Hash = '';
    var deferred = $q.defer();

    this.getHashFromUser = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'auth/generateSeed.html',
            controller: 'SeedCtrl',
            controllerAs: 'seedCtrl',
            resolve: {}
        });

        modalInstance.result.then(function (hash) {
            deferred.resolve(hash);
            this.Hash = hash;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            deferred.reject();
        });

        return deferred.promise;
    };

    return this;
})