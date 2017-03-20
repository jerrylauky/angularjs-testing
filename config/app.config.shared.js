(function () {

    'use strict';

    var ONE_SECOND = 1000;
    var ONE_AND_A_HALF_SECOND = 1.5 * ONE_SECOND;
    var ONE_MINUTE = 60 * ONE_SECOND;
	var FIVE_MINUTES = 5 * ONE_MINUTE;
	var TEN_MINUTES = 10 * ONE_MINUTE;
	var ONE_HOUR = 60 * ONE_MINUTE;
	var TWELVE_HOURS = 12 * ONE_HOUR;

	











	APP.config.http = {
		protocol: 'http',
		hostname: '10.10.10.10',
		port: 1234,
		headers: {
			CORS: true,
			accept: 'application/json, text/javascript'
		}
	};


	APP.rootUrl = APP.constructUrl(APP.config.http.protocol, APP.config.http.hostname, APP.config.http.port);


	APP.version = '1.0.0';


	// all dependencies required for angular
	APP.requires = [
		// plugins
		'ui.bootstrap',
		'ui.router',
		'pascalprecht.translate',
	    'angular-cache',
	    'ngCookies',

	    // app modules
	    // 'app.common',
	];


	var AUTH_ROOT_URL = APP.rootUrl + '/auth', SSO_ROOT_URL = AUTH_ROOT_URL + '/sso';


	APP.config.cache = {
		enabled: true,
		TTL: {
			default: FIVE_MINUTES,
			profile: TWELVE_HOURS,
			movies: TEN_MINUTES,
			dramas: TEN_MINUTES
		}
	};


	APP.config.debug = {
		enabled: false
	};


	APP.config.locale = {
		default: 'en',
		cwd: 'locale/',
		fileType: '.json',
		sessionKey: 'lang',
		useStaticFilesLoader: true,
		useLocalStorage: true,
		sanitizeType: 'sanitize',
		list: ['en']
	};


	APP.config.pagination = {
		size: 20
	};


	// major services
	APP.config.Auth = {
		enabled: true,
		url: AUTH_ROOT_URL,
		SSO: {
			enabled: true,
			url: SSO_ROOT_URL,
			login: {
				url: SSO_ROOT_URL + '/authorize?username={username}'
			},
			logout: {
				url: SSO_ROOT_URL + '/logout'
			}
		}
	};


	APP.config.Movies = {
		enabled: true,
		url: APP.rootUrl + '/movies'
	};


	APP.config.Dramas = {
		enabled: true,
		url: APP.rootUrl + '/dramas'
	};


	APP.config.Profile = {
		enabled: true,
		url: APP.rootUrl + '/profile',
		solrDelay: ONE_AND_A_HALF_SECOND
	};


	APP.config.fileUploader = {
		enabled: true,
		url: APP.rootUrl + '/file-uploader'
	};
	// major services
}());