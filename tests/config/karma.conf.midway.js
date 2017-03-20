var karmaConfig = require('./karma.conf.shared.js');

module.exports = function (config) {
	var conf = karmaConfig(config);

	conf.files = conf.files.concat([
		// midway testing specific dependencies
		'node_modules/ng-midway-tester/src/ngMidwayTester.js',
		'tests/config/mocha.conf.js',

		// test files
		'tests/midway/**/*.test.js'
	]);

	conf.proxies = {
		'/': 'http://localhost:9999/'
	};

	config.set(conf);
};