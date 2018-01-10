MyApp.controller('HeaderCtrl', function ($scope, $state, $rootScope, headerService) {

    //Function to change states
    $scope.changeState = function (stateNum) {
        headerService.changeActiveItem(stateNum);

        //Choose state based on their position on header bar
        if (stateNum == 1) {
            $state.go('header.form');
        } else {
            $state.go('header.home');
        }
    };

});