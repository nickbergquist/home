'use strict';

describe('Record breakers component', () => {

	describe('recordBreakersList', () => {

		beforeEach( () => {
			browser.get('/code/angularjs-thing/');
		});


		it('should filter the record breakers list as a user types into the search box', () => {

			var recordBreakersList = element.all(by.repeater('record in $ctrl.records'));
			var query = element(by.model('$ctrl.query'));

			expect(recordBreakersList.count()).toBe(4);

			query.sendKeys('Mallard');
			expect(recordBreakersList.count()).toBe(1);

			query.clear();
			query.sendKeys('44');
			expect(recordBreakersList.count()).toBe(2);
		});


		it('should be possible to control record breakers order via the drop-down menu', () => {

			var queryField = element(by.model('$ctrl.query'));

			var orderSelect = element(by.model('$ctrl.orderProp'));
			var nameOption = orderSelect.element(by.css('option[value="name"]'));
			var recordDateDescOption = orderSelect.element(by.css('option[value="recordDate"]'));
			var recordDateAscOption = orderSelect.element(by.css('option[value="-recordDate"]'));

			// returns a promise resolving to an array containing all HTML elements with a binding to the record's name:
			var recordBreakerNameColumn = element.all(by.repeater('record in $ctrl.records').column('record.name'));
			
			// use map array method - callback function taken as argument takes in the current array element
			// and returns the new element to take its place in the new array:
			var getNames = () => recordBreakerNameColumn.map(elem => elem.getText());

			//function getNames() {
			//	return recordBreakerNameColumn.map(function (elem) {
			//		return elem.getText();
			//	});
			//}
			
			// expect the default list using the orderBy filter on $ctrl.orderProp
			expect(getNames()).toEqual([
				'A1 No. 4472, "Flying Scotsman" - 1934',
				'A3 No. 2750, "Papyrus" - 1935',
				'A4 No. 2509, "Silver Link" - 1935',
				'A4 No. 4468, "Mallard" - 1938'
			]);

			recordDateAscOption.click();

			expect(getNames()).toEqual([
				'A4 No. 4468, "Mallard" - 1938',
				'A3 No. 2750, "Papyrus" - 1935',
				'A4 No. 2509, "Silver Link" - 1935',
				'A1 No. 4472, "Flying Scotsman" - 1934'
			]);

			// narrow dataset to make the assertions shorter
			queryField.sendKeys('A4');

			recordDateDescOption.click();

			expect(getNames()).toEqual([
				'A4 No. 2509, "Silver Link" - 1935',
				'A4 No. 4468, "Mallard" - 1938'
			]);

			nameOption.click();

			expect(getNames()).toEqual([
				'A4 No. 4468, "Mallard" - 1938',
				'A4 No. 2509, "Silver Link" - 1935'
			]);

			
		});

	});
});
