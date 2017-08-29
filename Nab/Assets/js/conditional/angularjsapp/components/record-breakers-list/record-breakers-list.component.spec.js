'use strict';

describe('Record breakers component.', () => {

	// mock the module containing the 'recordBreakersList' component before each test
	beforeEach(module('components.recordBreakersList'));

	// test the controller
	describe('RecordBreakersListController', () => { 
		var $httpBackend, ctrl; // declared in describe function scope to be available in 'it' clauses

		// underscore wrapping - inject a service and assign it to a same-named variable in the
		// inject function scope. So inject the $httpBackend service without a naming collision with
		// the same-named parent scope variable - the injector strips the underscores, recognises the
		// service in the method parameter and assigns it to the variable of the same name
		beforeEach(inject(($componentController, _$httpBackend_) => {
			$httpBackend = _$httpBackend_;

			// $httpBackend service used in the angular-mocks.js inject helper method is a mock HTTP 
			// backend implementation of the standard $httpBackend service for unit-testing use of
			// the $http service in the module controller. 
			$httpBackend.expectGET('js/data/recordBreakers.json')
				.respond([{ name: 'Papyrus' }, { name: 'Mallard'}]);

			ctrl = $componentController('recordBreakersList');
		}));


		it('should create a `records` property with 2 records fetched with `$http`', () => {
			// the response from the $httpBackend.expectGET method is not returned until 
			// the $httpBackend.flush is called. As an example...
			expect(ctrl.records).toBeUndefined();

			// causes the promise returned by the $http service to be resolved by the trained response
			// i.e., the $httpBackend service to be trained by the $httpBackend.expectGET method to
			// expect an incoming HTTP request
			$httpBackend.flush(); 

			// the response is now returned
			expect(ctrl.records).toEqual([{ name: 'Papyrus' }, { name: 'Mallard' }]);
		});
		
		it('should set a default value for the `orderProp` model', () => {
			expect(ctrl.orderProp).toBe('recordDate');
		});
	});
	
});
