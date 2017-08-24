'use strict';

describe('Record breakers component.', function () {

	// mock the module containing the 'recordBreakersList' component before each test
	beforeEach(module('components.recordBreakersList'));

	// test the controller
	describe('RecordBreakersListController', function () { 

		it('should create a `records` model with 4 records.', inject(function ($componentController) {
			var ctrl = $componentController('recordBreakersList');

			expect(ctrl.records.length).toBe(4);
		}));
	});
	
});
