IMpermanenceApp.service("DoodleHash", function ($uibModal, $q) {
    this.Hash = '';

    this.getHashFromUser = function () {
        var deferred = $q.defer();
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