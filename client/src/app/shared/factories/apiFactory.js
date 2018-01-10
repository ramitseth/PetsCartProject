MyApp.factory('apiFactory', function () {

  var Baseurl = "http://127.0.0.1:3000/";

  return {
    callAPI: callAPI
  };

  function callAPI(apiPath, apiMethod, parameters, onsuccess, onerror) {

    var apiurl = Baseurl + apiPath;
    $.ajax(apiurl, {
      type: apiMethod,
      data: parameters,
      success: function (data) {
        var obj;
        if (data.length > 0) {
          obj = JSON.parse(data);
        }
        onsuccess(obj);
      },
      error: onerror
    });
  }

});