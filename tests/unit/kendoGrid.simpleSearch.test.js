/* Copyright (C) QuickPlay Media, Inc. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 *
 * Written by Jerry Lau <jerry.lau@quickplay.com>, January 14, 2016
 */

/*
 * @requirement         RDCO-3320
 * @implementation      RDCO-5295
 */

describe('\nUnit: KendoGrid Simple Search\n', function () {
    var $controller, $location, createController;

    beforeEach(function () {
        module('kendo');

        inject(function (_$rootScope_, _$controller_, _$location_, _$state_) {
            var ctrl = _$controller_;
            $location = _$location_;

            createController = function () {
                return ctrl('UsersController', {
                    '$scope': _$rootScope_.$new(),
                    '$state': _$state_
                });
            };

            $controller = createController();
        });
    });

    describe('\n- Current page\n', function () {
        var params, currentPage, pagination, pageSize, updateSearch;

        beforeEach(function () {
            currentPage = ($controller.currentPage = 2);
            pagination = $controller.services.model.pagination;
            pageSize = $controller.pageSize;

            pagination.setTotalState(40).setFinalState(40);                 // pagination init
            $controller._updatePagination(currentPage);                     // switch to 2nd page

            updateSearch = function (enabled, value) {
                $controller.searchEnabled = enabled;
                $controller.searchValue = value;

                return $controller;
            };
        });

        it('- should be set to 1st page if search is on and not empty', function () {
            updateSearch(true, 'ABC');
            params = $controller._constructRequestParams();

            $controller.currentPage.should.be.a('number').and.equal(1);
            pagination.getCurrentState().should.be.a('number').and.equal(0);
            params.paginationState.should.be.a('number').and.equal(0);
        });

        it('- should remain unchanged if search is not on', function () {
            updateSearch(false, 'ABC');
            params = $controller._constructRequestParams();

            var expectedPaginationState = pageSize * 1;

            currentPage.should.be.a('number').and.equal(2);
            pagination.getCurrentState().should.be.a('number').and.equal(expectedPaginationState);
            params.paginationState.should.be.a('number').and.equal(expectedPaginationState);
        });

        it('- should remain unchanged if search is on but empty', function () {
            updateSearch(true, '');
            params = $controller._constructRequestParams();

            var expectedPaginationState = pageSize * 1;

            currentPage.should.be.a('number').and.equal(2);
            pagination.getCurrentState().should.be.a('number').and.equal(expectedPaginationState);
            params.paginationState.should.be.a('number').and.equal(expectedPaginationState);
        });
    });

    describe('\n- Search', function () {
        beforeEach(function () {
            $controller.searchValue = 'ABC';

            // monitor these functions
            spyOn($controller, 'resetSearch').and.callThrough();
            spyOn($controller, 'loadKendo');
        });

        it('\n - should reset if called directly', function () {
            $controller.resetSearch();
            $controller.searchValue.should.be.a('string').and.equal('');
        });

        describe('\n - onKeyup\n', function () {
            var mockEvent;

            it(' - should reset if ESC button', function () {
                mockEvent = {keyCode: 27};
                $controller.clearSearchOnEscKeyup(mockEvent);

                expect($controller.resetSearch).toHaveBeenCalled();
                $controller.resetSearch.calls.count().should.be.a('number').and.equal(1);

                expect($controller.loadKendo).toHaveBeenCalled();
                $controller.loadKendo.calls.count().should.be.a('number').and.equal(1);

                $controller.searchValue.should.be.a('string').and.equal('');
            });

            it(' - should remain unchanged if any other buttons', function () {
                mockEvent = {keyCode: 13};
                $controller.clearSearchOnEscKeyup(mockEvent);

                expect($controller.resetSearch).not.toHaveBeenCalled();     // should not be called at all
                expect($controller.loadKendo).not.toHaveBeenCalled();       // should not be called at all

                $controller.searchValue.should.be.a('string').and.equal('ABC');
            });
        });
    });
});