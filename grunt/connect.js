module.exports = function (grunt, options) {
	return {
		options: {
			base: './',
			hostname: 'localhost'
		},
		devserver: {
			options: {
				livereload: options.LIVERELOAD_PORT,
				port: options.SERVER_DEV_PORT
			}
		},
		testserver: {
			options: {
				port: options.SERVER_TEST_PORT
			}
		}
	};
};