(function () {

    'use strict';

    demo = angular.module('demo', APP.requires);


    // define interceptors before installing
    for (var interceptorName in APP.config.interceptors) {
        var interceptor = APP.config.interceptors[interceptorName];

        demo.service(interceptorName, interceptor);
    }


    // config block
    demo.config(function ($httpProvider, $stateProvider, $translateProvider, CacheFactoryProvider) {
        // install cache
        CacheFactoryProvider = APP.installCache(CacheFactoryProvider, APP.config.cache);

        // install routes
        $stateProvider = APP.installRoutes($stateProvider, APP.config.routes);

        // install interceptors
        $httpProvider.interceptors = APP.installInterceptors(demo, $httpProvider.interceptors, APP.config.interceptors);

        // set up headers
        $httpProvider.defaults = APP.setUpHttpRequest($httpProvider.defaults, APP.config.http.headers);

        // set up locale
        $translateProvider = APP.installLanguagePacks($translateProvider, APP.config.locale);
    });


    // run block
    demo.run(function ($rootScope, $state, Auth, Session, Logger, User) {
        // disable logging here if needed
        if (Logger && APP.config.debug.enabled)
            Logger.enable();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var currentState = toState, 
                isLoginPage = currentState.name !== 'login',
                session = Session.get(),
                user = new User(session.getUser());

            if (!isLoginPage) {
                if (!user.isAuthenticated()) {
                    $state.go('logout');
                }

                // check session
                // any time when session goes invalid, refresh token
                if (user.isAuthenticated() && !session.isValid())  {
                    Auth.refresh(user, session);
                }
            }
        });
    });
})();