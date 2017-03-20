/* Copyright (C) QuickPlay Media, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 *
 * Written by Jerry Lau <jerry.lau@quickplay.com>, Feburary 28, 2017
 */

/*
 * @requirement         RDCO-5255
 * @bug                 RDCO-5396
 */

describe('\nE2E: User Management Switch Orgs\n', function () {
    var ROOT_URL = '/#',
        UMS_ROOT_URL = ROOT_URL + '/settings',
        UMS_USERLIST_URL = UMS_ROOT_URL + '/users',
        CMS_ROOT_URL = ROOT_URL + '/content',
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


    var userNameCellReference = by.css(KENDO_LIST_USERNAME_SELECTOR),
        contentTypeWrapperReference = by.css(CONTENT_TYPE_WRAPPER_SELECTOR)


    var searchBox = element(by.id(SIMPLE_SEARCH_INPUT_SELECTOR)),
        searchButton = element(by.id(SIMPLE_SEARCH_BUTTON_SELECTOR)),
        searchClearButton = element(by.id(SIMPLE_SEARCH_CLEAR_BUTTON_SELECTOR)),
        usernameInput = element(by.id(USERNAME_INPUT_SELECTOR)),
        passwordInput = element(by.id(PASSWORD_INPUT_SELECTOR)),
        loginButton = element(by.id(LOGIN_BUTTON_SELECTOR)),
        userListButton = element(by.id(USER_LIST_BUTTON_SELECTOR)),
        userNameCell = element(by.css(KENDO_LIST_USERNAME_SELECTOR)),
        userNameCells = element.all(by.css(KENDO_LIST_USERNAME_SELECTOR));

    var login = function () {
        usernameInput.sendKeys(USERNAME);
        passwordInput.sendKeys(PASSWORD);
        return loginButton.click();
    };

    var forceMinimumDelay = function () {
        return browser.sleep(WAIT_TIME_BETWEEN_ACTIONS);
    };

    var MULTIORG_USERNAME = 'multiorgs_protractor';
    var MULTIORG_PASSWORD = 'test';

    var USER_ADD_NEW_BUTTON_SELECTOR = 'settings-add-new-button',
        PANEL_HEADER_SELECTOR = 'panel-header-fix',
        PANEL_USER_INPUT_SELECTOR = 'settings-panel-user-input-field',
        PANEL_PASSWORD_INPUT_SELECTOR = 'settings-panel-password-input-field',
        PANEL_CONFIRM_PASSWORD_INPUT_SELECTOR = 'settings-panel-confirm-password-input-field',
        PANEL_ASSIGNMENTS_TAB_SELECTOR = 'settings-panel-assignments-tab-button',
        PANEL_ASSIGNMENT_ADD_NEW_BUTTON_SELECTOR = 'settings-panel-add-assignment-button',
        PANEL_ASSIGNMENT_DROPDOWN_SELECTOR = '.k-dropdown-wrap.k-state-default',
        PANEL_ASSIGNMENT_DROPDOWN_LIST_SELECTOR = '.k-animation-container',
        PANEL_ASSIGNMENT_DROPDOWN_FIRST_ITEM_SELECTOR = '.k-item:first-child',
        PANEL_ASSIGNMENT_DROPDOWN_SECOND_ITEM_SELECTOR = '.k-item:nth-child(2)',
        PANEL_SAVE_BUTTON = 'settings-panel-save-button',
        USER_MENU_BUTTON_SELECTOR = 'user-menu-button', 
        LOGOUT_BUTTON_SELECTOR = 'logout-button';

    var panelHeaderReference = by.css(PANEL_HEADER_SELECTOR),
        panelAssignmentDropdownListReference = by.css(PANEL_ASSIGNMENT_DROPDOWN_LIST_SELECTOR),
        panelAssignmentDropdownFirstItemReference = by.css(PANEL_ASSIGNMENT_DROPDOWN_FIRST_ITEM_SELECTOR),
        panelAssignmentDropdownSecondItemReference = by.css(PANEL_ASSIGNMENT_DROPDOWN_SECOND_ITEM_SELECTOR);

    var userAddNewButton = element(by.id(USER_ADD_NEW_BUTTON_SELECTOR)),
        panelUserInput = element(by.id(PANEL_USER_INPUT_SELECTOR)),
        panelPasswordInput = element(by.id(PANEL_PASSWORD_INPUT_SELECTOR)),
        panelConfirmPasswordInput = element(by.id(PANEL_CONFIRM_PASSWORD_INPUT_SELECTOR)),
        panelAssignmentsTab = element(by.id(PANEL_ASSIGNMENTS_TAB_SELECTOR)),
        panelAssignmentAddNewButton = element(by.id(PANEL_ASSIGNMENT_ADD_NEW_BUTTON_SELECTOR)),
        panelAssignmentDropdowns = element.all(by.css(PANEL_ASSIGNMENT_DROPDOWN_SELECTOR)),
        panelSaveButton = element(by.id(PANEL_SAVE_BUTTON)),
        userMenuButton = element(by.id(USER_MENU_BUTTON_SELECTOR)),
        logoutButton = element(by.id(LOGOUT_BUTTON_SELECTOR));


    // create a multiorg user if not already exists before executing test cases

    browser.get(ROOT_URL).then(function () {
        // login before tests
        return login();
    }).then(function () {
        return browser.driver
                .wait(browser.driver.isElementPresent(contentTypeWrapperReference))
                .then(forceMinimumDelay);
    }).then(function () {
        // check if user exists
        return browser.get(UMS_USERLIST_URL).then(function () {
            return searchBox.sendKeys(MULTIORG_USERNAME, protractor.Key.ENTER).then(function () {
                return browser.driver
                    .wait(browser.driver.isElementPresent(userNameCellReference))
                    .then(forceMinimumDelay)
                    .then(function () {
                        return userNameCell.isPresent();
                    });
            })
        });
    }).then(function (userExists) {
        if (!userExists) {
            // create a multi org user
            return browser.get(UMS_USERLIST_URL).then(function () {
                // click add new
                return userAddNewButton.click().then(function () {
                    return browser.driver
                            .wait(browser.driver.isElementPresent(panelHeaderReference))
                            .then(forceMinimumDelay);
                }).then(function () {
                    // fill out info in details tab

                    // enter username
                    return panelUserInput.sendKeys(MULTIORG_USERNAME).then(function () {
                        // enter password
                        panelPasswordInput.sendKeys(MULTIORG_PASSWORD);
                    }).then(function () {
                        // enter confirm password
                        panelConfirmPasswordInput.sendKeys(MULTIORG_PASSWORD);
                    });
                }).then(function () {
                    // fill out info in assignments tab

                    // class assignments tab
                    return panelAssignmentsTab.click().then(function () {
                        // class add new button
                        return panelAssignmentAddNewButton.click();
                    }).then(function () {
                        // click dropdown
                        return panelAssignmentDropdowns.first().click();
                    }).then(function () {
                        // get the visible dropdown
                        return element.all(function (driver) {
                            var dropdowns = driver.findElements(panelAssignmentDropdownListReference);

                            return protractor.promise.filter(dropdowns, function (dropdown) {
                                return dropdown.isDisplayed();
                            }).then(function (visibleDropdowns) {
                                return visibleDropdowns;
                            });
                        });
                    }).then(function (dropdowns) {
                        // select first org
                        return dropdowns[0].element(panelAssignmentDropdownFirstItemReference).click();
                    }).then(function () {
                        // click add new button again
                        return panelAssignmentAddNewButton.click();
                    }).then(function () {
                        // click 2nd dropdown
                        return panelAssignmentDropdowns.get(1).click();
                    }).then(function () {
                        // get the 2nd visible dropdown
                        return element.all(function (driver) {
                            var dropdowns = driver.findElements(panelAssignmentDropdownListReference);

                            return protractor.promise.filter(dropdowns, function (dropdown) {
                                return dropdown.isDisplayed();
                            }).then(function (visibleDropdowns) {
                                return visibleDropdowns;
                            });
                        });
                    }).then(function (dropdowns) {
                        return dropdowns[0].element(panelAssignmentDropdownSecondItemReference).click();
                    }).then(function () {
                        return panelSaveButton.click();
                    });
                });
            });
        } else {
            return browser.sleep(0);
        }
    }).then(forceMinimumDelay)
    .then(function () {
        return userMenuButton.click().then(function () {
            return logoutButton.click();
        }).then(function () {
            usernameInput.sendKeys(MULTIORG_USERNAME);
            passwordInput.sendKeys(MULTIORG_PASSWORD);

            return loginButton.click();
        });
    }).then(forceMinimumDelay);
    
    beforeEach(function () {
        browser.get(CMS_ROOT_URL).then(function () {
            browser.driver
                .wait(browser.driver.isElementPresent(contentTypeWrapperReference))
                .then(forceMinimumDelay);
        });
    });

    var ACCOUNT_TITLE_SELECTOR = '#account-switch-dropdown-button .account-title',
        ACCOUNT_SWITCHER_BUTTON_SELECTOR = 'account-switch-dropdown-button',
        ACCOUNT_SWITCHER_OTHER_ACCOUNT_BUTTONS_SELECTOR = '.bottom-outter-wrapper .account > a:not(.selected)';

    var accountTitle = element(by.css(ACCOUNT_TITLE_SELECTOR)),
        accountSwitcherButton = element(by.id(ACCOUNT_SWITCHER_BUTTON_SELECTOR)),
        accountSwitcherOtherAccountButtons = element.all(by.css(ACCOUNT_SWITCHER_OTHER_ACCOUNT_BUTTONS_SELECTOR));


    it('- should redirect to dashboard after switching org', function () {
        // get current org
        accountTitle.getText().then(function (title) {
            // open switch org dropdown
            accountSwitcherButton.click().then(function () {
                // click on whatever is not selected as current org
                accountSwitcherOtherAccountButtons.first()
                    .click()
                    .then(forceMinimumDelay)
                    .then(forceMinimumDelay)
                    .then(forceMinimumDelay)
                    .then(function () {

                        // org title should now be different
                        expect(accountTitle.getText()).not.toEqual(title);
                        // url must equal home page
                        browser.getCurrentUrl().then(function (url) {
                            expect(url).toEqual(browser.baseUrl + ROOT_URL + '/');
                        });
                    });
            });
        });
    });
});