module.exports = {
	unit: {
		configFile: 'tests/config/karma.conf.unit.js',
		autoWatch: false,
		singleRun: true
	},
	midway: {
		configFile: 'tests/config/karma.conf.midway.js',
		autoWatch: false,
		singleRun: true
	},
  	unit_auto: {
		configFile: 'tests/config/karma.conf.unit.js'
	},
	midway_auto: {
		configFile: 'tests/config/karma.conf.midway.js'
	}
};