IMpermanenceApp.controller('SeedCtrl', function ($uibModalInstance) {
    seedCtrl = this;
    seedCtrl.mouseIsDown = false;
    seedCtrl.mouseX;
    seedCtrl.mouseY;

    seedCtrl.Input = [];


    seedCtrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
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

    seedCtrl.Hash = function () {
        alert(CryptoJS.MD5(seedCtrl.Input.toString()));
    }
});