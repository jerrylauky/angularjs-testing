(function () {

    'use strict';

	APP.config.routes = {
	    states: {
		    'home': {
	            url: '/',
	            templateUrl: 'index.html'
	        },

	        'login': {
	            url: '/login?token',
	            templateUrl: 'app/auth/login.html'
	        },

	        'logout': {
	            url: '/logout',
	            templateUrl: 'app/auth/logout.html'
	        },
	        
		    'otherwise': {
	            url: '*path',
	            templateUrl: 'app/misc/notfound.html'
	        }
	    }
	};
}());
