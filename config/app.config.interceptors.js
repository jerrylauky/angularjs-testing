(function () {

    'use strict';

    var FILE_EXTENSIONS = ['html', 'css', 'js', 'json', 'woff', 'woff2', 'jpg', 'jpeg', 'png', 'pdf', 'gif', 'ttf'];
    var AUTH_API_KEYWORD = 'oauth';
    var AUTH_BASIC_NAME = 'Basic';
    var AUTH_BEARER_NAME = 'Bearer';
    var AUTH_BASIC_TOKEN = 'client:';



    // interceptors go here

    APP.config.interceptors = {
    	// interceptors that update API headers accordingly
    	'APIInterceptor': ['Base64', 'Session', 'ArrayUtils', 'UrlString', function (Base64, Session, ArrayUtils, UrlString) {
	        this.request = function (config) {
	            var fileExtensions = new ArrayUtils(FILE_EXTENSIONS),
	            	url = new UrlString(config.url),
	            	ext = url.getFileExtension();

	            // apply header ONLY IF it's an API requeset
	            var requiredAuthHeader = !fileExtensions.has(ext);

	            if (requiredAuthHeader) {
	                var isAuthAPI = url.contains(AUTH_API_KEYWORD),
	                    session = Session.get(),
	                    authType = AUTH_BASIC_NAME,
	                    token = Base64.encode(AUTH_BASIC_TOKEN);

	                if (!isAuthAPI) {
	                	authType = session.has('token_type') ? session.token_type : AUTH_BEARER_NAME;
	                	token = session.has('access_token') ? session.access_token : '';
	                }

	                // note: headers property must be trimmed
	                // in safari, leading and trailing space in headers will trigger error 'DOM Exception 12.'
	                config.headers.Authorization = (authType + ' ' + token).trim();

	                // ensure URI's decoded before sending the API request
	                config.url = decodeURIComponent(url.toString());
	            }

	            return config;
	        };
	    }]
    };
}());