## Objectives

As our app size grows, a lot of things can go wrong when we try to spend a lot of time to do manual testing, therefore the objectives of this is to:

* Increase test case coverage
 * all test cases are for sure covered if they are implemented for each JIRA bug and run before each release.
* Increase time-efficiency
  * As developers can spend more time on improving our app instead of doing manual testing which can becomes very time consuming and challenging, imagine if later on we have 10 thousand JIRA bugs.
  * developers are not blocked from development when manual testing and selenium testing are eliminated 
* Increase quality
  * As bugs are guaranteed fixed and will not come back when new changes are added in the code unless requirements are changed.
* Decrease learning curve
  * New members know where to look for bugs or can verify whether a bug has already been created on JIRA when JIRA numbers are specified next to each test case.
* Decrease overhead
  * Developers do not require a lot of knowledge on test automation setup and everything is ready with 2 commands.
  * Developers are not blocked from development when test automation runs on a light-weight test framework (instead of Selenium, requires a lot of setup time and CPU) 
* Decrease chances of releasing critical bugs to production.
* Decrease number of duplicate JIRAs

## Configuration

* This test automation is using Karma for Unit and Midway Testing only, and using Protractor for End-to-End Testing.
* Unit, Midway and Protractor each has its own config file, namely:
  * `config/karma.conf.unit.js`
  * `config/karma.conf.midway.js`
  * `config/protractor.conf.js`
* `karma.conf.unit.js` and `karma.conf.midway.js` inherits configurations from `config/karma.conf.shared.js`


## Installation

**Install repo**:

```
jerrylauky$> mkdir angularjs-test-automation && cd angularjs-test-automation && git clone <this-repo-here>.git .
```

**Install dependencies**:

```
jerrylauky$> npm install && bower install
```

**Run tests**:

```
jerrylauky$> grunt test             # run all tests
jerrylauky$> grunt test:unit        # run all unit tests
jerrylauky$> grunt test:midway      # run all midway tests
jerrylauky$> grunt test:e2e         # run all e2e tests
```

**Run tests with auto re-run on file change**:

```
jerrylauky$> grunt test:auto        # run all tests
jerrylauky$> grunt test:unit:auto   # run all unit tests
jerrylauky$> grunt test:midway:auto # run all midway tests
```

**Note**:
* auto re-run is only available for unit and midway tests
* if encounter an error complaining about browser driver not available,  
run: `./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update`

## Directory and Structure

```
/path/to/project/directory/tests/

      — config/    , contains all config files
      — e2e/       , contains all end-to-end testing files
      — libs/      , contains all lib/dependency files required for our test framework
      — unit/      , contains all unit testing files
      — midway/    , contains all testing files between backend and frontend
```
