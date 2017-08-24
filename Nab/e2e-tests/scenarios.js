'use strict';

describe('Record breakers component', function() {

	describe('recordBreakersList', function () {

		beforeEach(function() {
			browser.get('/code/angularjs-thing/');
		});

		it('should filter the record breakers list as a user types into the search box', function() {

			var recordBreakersList = element.all(by.repeater('record in $ctrl.records'));
			var query = element(by.model('$ctrl.query'));

			expect(recordBreakersList.count()).toBe(4);

			query.sendKeys('Mallard');
			expect(recordBreakersList.count()).toBe(1);

			query.clear();
			query.sendKeys('44');
			expect(recordBreakersList.count()).toBe(2);
		});
	});

});
