MyApp.service('headerService', function ($rootScope) {

    this.checkActiveItem = function (itemNum) {
        if (!$rootScope.activeItem[itemNum]) {
            this.changeActiveItem(itemNum);
        }
    };

    this.changeActiveItem = function (stateNum) {
        for (var i = 0; i < $rootScope.activeItem.length; i++) {
            if (i == stateNum) {
                $rootScope.activeItem[i] = true;
            } else {
                $rootScope.activeItem[i] = false;
            }
        }
        return;
    };
});