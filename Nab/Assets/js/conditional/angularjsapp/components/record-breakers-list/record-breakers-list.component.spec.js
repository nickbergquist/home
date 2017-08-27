'use strict';

describe('Record breakers component.', () => {

	// mock the module containing the 'recordBreakersList' component before each test
	beforeEach(module('components.recordBreakersList'));

	// test the controller
	describe('RecordBreakersListController', () => { 
		var ctrl;

		beforeEach(inject(function ($componentController) {
			ctrl = $componentController('recordBreakersList');
		}));

		it('should create a `records` model with 4 records.', () => {
			expect(ctrl.records.length).toBe(4);
		});

		it('should set a default value for the `orderProp` model', () => {
			expect(ctrl.orderProp).toBe('recordDate');
		});
	});
	
});
