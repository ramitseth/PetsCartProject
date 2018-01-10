MyApp.controller('RegisterCtrl', function ($scope, $rootScope, $state, apiFactory) {

    // Creating blank user object
    $scope.user = {};
       
    $scope.focus = function (id) {
        document.getElementById(id).focus();
        document.getElementById(id).select();
    };

    $scope.register = function () {
        // Verify if username/password is not blank
        if ($scope.user.username && $scope.user.password) {

            var apiPath = "registration";
            var apiMethod = "POST";
            var parameters = {
                username: $scope.user.username,
                password: $scope.user.password,
                mobile: $scope.user.mobile,
                email: $scope.user.email
            };

            var success = function (result) {
                if (!result.status) {
                    swal({
                        text: result.result
                    }).then(function () {
                        $scope.focus('username');
                    });
                } else {
                    swal({
                        text: result.result
                    }).then(function () {
                        $state.go('login');
                    });
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
                text: 'Please enter valid username & password!'
            }).then(function () {
                $scope.focus('username');
            });

        }
    };

});