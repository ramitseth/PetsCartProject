MyApp.controller('LoginCtrl', function ($scope, $rootScope, $state, apiFactory) {

    //checking localstorage for already stored username and password
    $scope.user = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
    };

    $scope.focus = function (id) {
        document.getElementById(id).focus();
        document.getElementById(id).select();
    };

    $scope.login = function () {
        // Verify if username/password is not blank
        if ($scope.user.username && $scope.user.password) {

            var apiPath = "login";
            var apiMethod = "POST";
            var parameters = {
                username: $scope.user.username,
                password: $scope.user.password,
            };

            var success = function (result) {
                if (!result.status) {
                    swal({
                        text: 'Username or Password is incorrect!'
                    }).then(function () {
                        $scope.focus('username');
                    });
                } else {
                    if (result.result)
                        $rootScope.usersPetList = result.result.petslist;

                    localStorage.setItem('username', $scope.user.username);
                    localStorage.setItem('password', $scope.user.password);
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
                text: 'Please enter valid username & password!'
            }).then(function () {
                $scope.focus('username');
            });

        }
    };

});