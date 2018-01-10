MyApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginCtrl'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'app/components/register/register.html',
            controller: 'RegisterCtrl'
        })
        
        .state('header', {
            abstract: true,
            templateUrl: 'app/shared/header/header.html',
            controller: 'HeaderCtrl'
        })

        .state('header.home', {
            url: '/home',
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeCtrl',
            resolve: {
                homePromise: function(homeFactory) {
                  return homeFactory.getData();
                }
              }
        })

        .state('header.form', {
            url: '/form',
            templateUrl: 'app/components/form/form.html',
            controller: 'FormCtrl'
        });

});