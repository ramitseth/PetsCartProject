MyApp.controller('FormCtrl', function ($scope, $rootScope, $state, headerService, apiFactory) {

    // Check for active state on header bar
    headerService.checkActiveItem(1);

    // Resets the form
    $scope.resetForm = function () {
        $scope.myPet = {};
    };

    // When user changes the pet
    $scope.petChanged = function (pet) {
        $scope.myPet.name = pet.name;
        $scope.myPet.cost = pet.cost;
        $scope.calculatePrice();
    };

    // Calculates the price of the selected Pet and Quantity
    $scope.calculatePrice = function () {
        if ($scope.myPet.quantity) {
            $scope.myPet.price = $scope.myPet.quantity * $scope.myPet.cost;
        } else {
            $scope.myPet.price = '';
        }
    };

    // Saves added pet to user's cart
    $scope.addToCart = function () {
        if ($scope.myPet.petID && $scope.myPet.quantity) {

            // Call the api
            var apiPath = "userpets/update";
            var apiMethod = "POST";
            var parameters = {
                username: localStorage.getItem('username'),
                petID: $scope.myPet.petID,
                quantity: $scope.myPet.quantity
            };

            var success = function (result) {
                if (!result.status || !result.result || !result.result.petslist) {
                    swal({
                        text: "Pet cannot be added to the cart. Try again!"
                    });
                } else {
                    swal({
                        text: 'Pet successfully added to the cart!'
                    });
                    $rootScope.usersPetList = result.result.petslist;
                    $state.go('header.home');
                }
            };

            var error = function (err) {
                swal({
                    text: "Server is not responding!"
                });
            };

            apiFactory.callAPI(apiPath, apiMethod, parameters, success, error);
        } else {
            swal({
                text: 'Please select a pet and enter valid quantity!'
            });
        }
    };

});