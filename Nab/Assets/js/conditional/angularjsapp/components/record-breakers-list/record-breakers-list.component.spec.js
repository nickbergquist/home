'use strict';

describe('Record breakers component.', () => {
	var ctrl, resourcePathService, httpBackend;

	// mock the module containing the 'recordBreakersList' component
	beforeEach(module('components.recordBreakersList'));

	// module service also has dependencies
	beforeEach(module(function ($provide) {
		$provide.value('resourcePathService', __env); // $provide must be called before inject function
	}));

	beforeEach(inject(function ($componentController, _resourcePathService_, $httpBackend) {
		resourcePathService = _resourcePathService_;
		httpBackend = $httpBackend;

		httpBackend.when('GET', 'js/appfiles/data/recordBreakers.json')
			.respond([{ name: 'Papyrus' }, { name: 'Mallard' }]);


		//ctrl = $componentController('recordBreakersList');
	}));

	it('should do something', function () {
		

		
	});



	// test the controller
//	describe('RecordBreakersListController', () => { 
//		var $httpBackend, resourcePathService, ctrl;

		// underscore wrapping - inject a service and assign it to a same-named variable in the
		// inject function scope. So inject the resourcePathService service without a naming collision with
		// the same-named parent scope variable - the injector strips the underscores, recognises the
		// service in the method parameter and assigns it to the variable of the same name
//		beforeEach(inject(($componentController, _resourcePathService_, _$httpBackend_) => {
//			resourcePathService = _resourcePathService_;
//			$httpBackend = _$httpBackend_;

			// $httpBackend service used in the angular-mocks.js inject helper method is a mock HTTP 
			// backend implementation of the standard $httpBackend service for unit-testing use of
			// the $http service in the module controller. 
//			$httpBackend.expectGET('js/appfiles/data/recordBreakers.json')
//				.respond([{ name: 'Papyrus' }, { name: 'Mallard'}]);

//			resourcePathService.getData();
			
//			ctrl = $componentController('recordBreakersList');
//		}));

//		it('should create a `records` property with 2 records fetched with `$http`', () => {
			// the response from the $httpBackend.expectGET method is not returned until 
			// the $httpBackend.flush is called. As an example...
//			expect(ctrl.records).toBeUndefined();

			// causes the promise returned by the $http service to be resolved by the trained response
			// i.e., the $httpBackend service to be trained by the $httpBackend.expectGET method to
			// expect an incoming HTTP request
//			$httpBackend.flush(); 

			// the response is now returned
//			expect(ctrl.records).toEqual([{ name: 'Papyrus' }, { name: 'Mallard' }]);
//		});
		
//		it('should set a default value for the `orderProp` model', () => {
//			expect(ctrl.orderProp).toBe('recordDate');
//		});
//	});
	
});
