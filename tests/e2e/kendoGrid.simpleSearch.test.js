/* Copyright (C) QuickPlay Media, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 *
 * Written by Jerry Lau <jerry.lau@quickplay.com>, January 14, 2016
 */

/*
 * @requirement			RDCO-3320
 * @implementation		RDCO-5295
 */

describe('\nE2E: KendoGrid Simple Search\n', function () {
	var ROOT_URL = '/#',
		UMS_ROOT_URL = ROOT_URL + '/settings',
		UMS_USERLIST_URL = UMS_ROOT_URL + '/users',
		WAIT_TIME_BETWEEN_ACTIONS = 1000,
		USERNAME_INPUT_SELECTOR = 'username',
		PASSWORD_INPUT_SELECTOR = 'password',
		LOGIN_BUTTON_SELECTOR = 'login-button',
		CONTENT_TYPE_WRAPPER_SELECTOR = 'content-type-wrapper',
		SIMPLE_SEARCH_INPUT_SELECTOR = 'simple-search-field',
		SIMPLE_SEARCH_INPUT_MODEL = 'searchValue',
		SIMPLE_SEARCH_BUTTON_SELECTOR = 'simple-search-button',
		SIMPLE_SEARCH_CLEAR_BUTTON_SELECTOR = 'simple-search-clear-button',
		KENDO_LIST_SELECTOR = 'k-grid-content',
		KENDO_LIST_USERNAME_SELECTOR = 'span[ng-bind="dataItem.displayName"]',
		USER_LIST_BUTTON_SELECTOR = 'settings-users-button',
		USER_PANEL_SELECTOR = 'panel-content-context-bar',
		USERNAME = 'admin',
		PASSWORD = 'adminp',
		SEARCH_VALUE = 'admin', 
		SEARCH_VALUE_UPPERCASE = 'ADMIN';


	var searchBox = element(by.id(SIMPLE_SEARCH_INPUT_SELECTOR)),
		searchButton = element(by.id(SIMPLE_SEARCH_BUTTON_SELECTOR)),
		searchClearButton = element(by.id(SIMPLE_SEARCH_CLEAR_BUTTON_SELECTOR)),
		usernameInput = element(by.id(USERNAME_INPUT_SELECTOR)),
		passwordInput = element(by.id(PASSWORD_INPUT_SELECTOR)),
		loginButton = element(by.id(LOGIN_BUTTON_SELECTOR)),
		userListButton = element(by.id(USER_LIST_BUTTON_SELECTOR)),
		userNameCells = element.all(by.css(KENDO_LIST_USERNAME_SELECTOR));

	var login = function () {
		usernameInput.sendKeys(USERNAME);
		passwordInput.sendKeys(PASSWORD);
		return loginButton.click();
	};

	var forceMinimumDelay = function () {
		browser.sleep(WAIT_TIME_BETWEEN_ACTIONS);
	};

	browser.get(ROOT_URL).then(function () {
		// login before tests
		login().then(function () {
			browser.driver
				.wait(browser.driver.isElementPresent(by.css(CONTENT_TYPE_WRAPPER_SELECTOR)))
				.then(forceMinimumDelay);
		});
	});

	beforeEach(function () {
		// navigate to user list
		browser.get(UMS_USERLIST_URL).then(function () {
			browser.driver
				.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_SELECTOR)))
				.then(forceMinimumDelay);
		});
	});

	it('- should be displayed', function () {
		expect(searchBox.isDisplayed()).toBeTruthy();
	});

	it('- should be enabled when specified in controller', function () {
		searchBox.getAttribute('disabled').then(function (value) {
			expect(searchBox.isEnabled()).toEqual(!value);
		});
	});

	describe('\nSearch results\n', function () {
		it('- should be displayed when value is entered', function () {
			searchBox.sendKeys(SEARCH_VALUE, protractor.Key.ENTER).then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).toContain(SEARCH_VALUE);
					});
			});
		});

		it('- should be displayed when value is entered and search button clicked', function () {
			searchBox.sendKeys(SEARCH_VALUE).then(function () {
				return searchButton.click();
			}).then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).toContain(SEARCH_VALUE);
					});
			});
		});

		it('- should be case sensitive', function () {
			searchBox.sendKeys(SEARCH_VALUE_UPPERCASE).then(function () {
				return searchButton.click();
			}).then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element(by.css(KENDO_LIST_USERNAME_SELECTOR)).isPresent()).toBeFalsy();
					});
			});
		});
	});

	describe('\nKendo List\n', function () {
		beforeEach(function () {
			// contains search value by default
			searchBox.sendKeys(SEARCH_VALUE, protractor.Key.ENTER).then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_SELECTOR)))
					.then(forceMinimumDelay);
			});
		});

		it('- should restore original item list when ESC key entered', function () {
			searchBox.sendKeys(protractor.Key.ESCAPE).then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element(by.css(KENDO_LIST_USERNAME_SELECTOR)).isPresent()).toBeTruthy();
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).not.toContain([SEARCH_VALUE]);
					});
			});
		});

		it('- should restore original item list when clear button clicked', function () {
			searchClearButton.click().then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element(by.css(KENDO_LIST_USERNAME_SELECTOR)).isPresent()).toBeTruthy();
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).not.toContain([SEARCH_VALUE]);
					});
			});
		});

		it('- should restore original item list when navigate away outside Kendo and panel area', function () {
			userListButton.click().then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(KENDO_LIST_USERNAME_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element(by.css(KENDO_LIST_USERNAME_SELECTOR)).isPresent()).toBeTruthy();
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).not.toContain([SEARCH_VALUE]);
					});
			});
		});

		it('- should reserve search results when navigate between details panel and Kendo list', function () {
			userNameCells.first().click().then(function () {
				browser.driver
					.wait(browser.driver.isElementPresent(by.css(USER_PANEL_SELECTOR)))
					.then(forceMinimumDelay)
					.then(function () {
						expect(element.all(by.css(KENDO_LIST_USERNAME_SELECTOR)).getText()).toContain(SEARCH_VALUE);
					});
			});
		});
	});
});