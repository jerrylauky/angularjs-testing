exports.config = {

  /*----- Connection setup -----*/
  // Your test script communicates directly Chrome Driver or Firefox Driver, bypassing any Selenium Server. 
  // If this is true, settings for seleniumAddress and seleniumServerJar will be ignored. 
  // If you attempt to use a browser other than Chrome or Firefox an error will be thrown.

  // Note: when protractor complains about browser driver not available, run:
  // ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
  directConnect: true,


  /*----- Test -----*/
  
  // spec patterns are relative to the location of this config.
  specs: [
    '../e2e/**/*.js'
  ],


  /*----- Capabilities to be passed to the webdriver instance -----*/

  // for a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome',
  },

  // base URL for your application under test. 
  // calls to protractor.get() with relative paths will be prepended with this.
  // baseUrl: 'http://127.0.0.1:9999/mockedIndex.html',
  baseUrl: 'http://localhost:9001',

  // selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>  
  rootElement: 'html'

};