IMpermanenceApp.controller('SeedCtrl', function ($uibModalInstance) {
    seedCtrl = this;
    seedCtrl.mouseIsDown = false;
    seedCtrl.mouseX;
    seedCtrl.mouseY;

    seedCtrl.Input = [];


    seedCtrl.ok = function () {
        $uibModalInstance.close(seedCtrl.Hash().toString());
    };

    seedCtrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    seedCtrl.MouseDown = function (ev) {
        seedCtrl.mouseIsDown = true;
    };

    seedCtrl.MouseUp = function (ev) {
        seedCtrl.mouseIsDown = false;
    };

    seedCtrl.MouseMove = function (ev) {
        seedCtrl.mouseX = ev.clientX;
        seedCtrl.mouseY = ev.clientY;
        if (seedCtrl.mouseIsDown) {
            seedCtrl.Input.push(ev.clientX + ',' + ev.clientY);
        }
    };

    seedCtrl.NotAcceptableDoodle = function () {
        if (seedCtrl.Input.length < 1000)
            return true;
        return false;
    };

    seedCtrl.Hash = function () {
        return CryptoJS.SHA512(seedCtrl.Input.toString());
    }
});