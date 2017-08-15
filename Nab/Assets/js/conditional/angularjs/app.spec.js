'use strict';

describe('RecordBreakersListController', function () {

	beforeEach(module('recordBreakersApp'));

	it('should create a `records` model with 4 records', inject(function ($controller) {
		var scope = {};
		var ctrl = $controller('RecordBreakersListController', { $scope: scope });

		expect(scope.records.length).toBe(4);
	}));

});
