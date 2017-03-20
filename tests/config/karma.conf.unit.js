var karmaConfig = require('./karma.conf.shared.js');

module.exports = function (config) {
	var conf = karmaConfig(config);

	conf.files = conf.files.concat([
		// unit-testing specific dependencies
		'bower_components/angular-mocks/angular-mocks.js',
		'tests/config/mocha.conf.js',

		// test files
		'tests/unit/**/*.test.js'
	]);

	config.set(conf);
};