// Karma configuration
// Generated on Tue May 03 2016 14:22:46 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
  return {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      // 3rd party dependencies
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-translate/angular-translate.min.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/**/angular-*.min.js',
      'bower_components/angular-*/*.{min,directive}.js',
      'bower_components/bowser/bowser.min.js',

      // app code
      'tests/libs/app.js',
      'config/app.helpers.js',
      'config/app.config.shared.js',
      'config/app.config.routes.js',
      'config/app.config.interceptors.js',
      'config/app.config.menus.js',
      'config/app.js',
      'components/**/index.js',
      'components/**/**.js',

      // test 3rd party dependencies
      'node_modules/chai/chai.js',
      'tests/libs/chai.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: ['karma-jasmine', 'karma-mocha', 'karma-phantomjs-launcher']
  };
};