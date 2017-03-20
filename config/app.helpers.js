// helper functions

APP.constructUrl = function (protocol, hostname, port) {
    var url = (protocol ? protocol + '://' : '') + hostname + (hostname ? (port ? ':' + port : '') : ''),
        isValidUrl = !Utils.isEmptyString(url) && Utils.isValidUrl(url);

	return isValidUrl ? url : 'http://localhost';
};

APP.installCache = function (cache, config) {
    // cache enabled?
    if (!config.enabled)
        cache.defaults.disabled = true;

    // handle cache settings
    if (config.TTL.default)
        cache.defaults.maxAge = config.TTL.default;

    return cache;
};


APP.installRoutes = function (router, config) {
    // routes specified?
    if (config.states) {

        // set up routes
        for (var stateName in config.states) {
            var stateSpec = config.states[stateName];

            router.state(stateName, stateSpec);
        }
    }

    return router;
};


APP.installInterceptors = function (app, interceptors, config) {
    // interceptors specified?
    if (config) {

        // set up interceptors
        for(var interceptorName in config) {
            var interceptor = config[interceptorName];

            app.service(interceptorName, interceptor);
            interceptors.push(interceptorName);
        }
    }

    return interceptors;
};


APP.setUpHttpRequest = function (httpRequest, config) {
    if (config) {
        if (config.CORS) {
            delete httpRequest.headers.common['X-Requested-With'];
            httpRequest.useXDomain = true;
        }

        if (config.accept) {
            httpRequest.headers.common['Accept'] = config.accept;
        }
    }

    return httpRequest;
};


APP.installLanguagePacks = function (translator, config) {
    if (config.useStaticFilesLoader) {
    	translator.useStaticFilesLoader({
            prefix: config.cwd,
            suffix: config.fileType
        });
    }

    if (config.useLocalStorage) {
    	translator.useLocalStorage();

    	var hasLang = !!localStorage.getItem(config.sessionKey), 
        	lang = localStorage.getItem(config.sessionKey) || config.default;

        translator.preferredLanguage(lang);

        if (!hasLang)
        	localStorage.setItem(config.sessionKey, config.default);
    }

    if (config.sanitizeType)
    	translator.useSanitizeValueStrategy(config.sanitizeType);

    return translator;
};