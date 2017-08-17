'use strict';

describe('The list of record breakers', function () {
	var ctrl;

	// mock the module containing the 'recordBreakersList' component before each test
	beforeEach(module('components.recordBreakersList'));

	// test the controller
	describe('The controller', function () { 
		it('should create a `records` model with 4 records', inject(function ($componentController) {
			ctrl = $componentController('recordBreakersList');

			expect(ctrl.records.length).toBe(4);
		}));
	});

});
