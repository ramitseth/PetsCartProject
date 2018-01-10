MyApp.factory('homeFactory', function ($q, apiFactory) {

    return {
        getData: getData
    };

    function getData() {

        // Get data from petslist api call
        var deferred = $q.defer();
        var apiPath = "petslist";
        var apiMethod = "GET";
        var parameters = {};

        var success = function (result) {
            var JSONData = {};
            if (result.status) {
                JSONData = result.result;
            }
            deferred.resolve(JSONData);
        };

        var error = function (err) {
            deferred.reject();
        };

        apiFactory.callAPI(apiPath, apiMethod, parameters, success, error);

        return deferred.promise;
    }
});