MyApp.controller('HomeCtrl', function ($scope, $rootScope, headerService, homePromise) {

    // Check for active state on header bar
    headerService.checkActiveItem(0);

    // Get pets list from home Factory
    $rootScope.petsList = homePromise;

    // Generates User's cart information
    if ($rootScope.usersPetList && $rootScope.usersPetList.length > 0) {
        $scope.noPetsFound = false;
        for (var i = 0; i < $rootScope.usersPetList.length; i++) {
            var petFound = $rootScope.petsList.filter(function (pet) {
                return pet.petID == $rootScope.usersPetList[i].petID;
            });
            if (petFound.length > 0) {
                $rootScope.usersPetList[i].name = petFound[0].name;
                $rootScope.usersPetList[i].cost = petFound[0].cost;
                $rootScope.usersPetList[i].price = $rootScope.usersPetList[i].quantity * $rootScope.usersPetList[i].cost;
            } else {
                $rootScope.usersPetList[i].name = 'N/A';
                $rootScope.usersPetList[i].cost = 'N/A';
                $rootScope.usersPetList[i].price = 'N/A';
            }
        }
    }
    else {
        $scope.noPetsFound = true;
    }
});