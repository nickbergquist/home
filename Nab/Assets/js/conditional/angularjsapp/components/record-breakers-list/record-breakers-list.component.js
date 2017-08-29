'use strict';

// export the Component Definition Object (CDO)
export const RecordBreakersListComponent = {
	templateUrl: config => config.pathTemplates + 'record-breakers-list.html',
	controller: RecordBreakersListController
};

//RecordBreakersListController.$inject = ['$http', 'simpleMathService'];

function RecordBreakersListController($http, simpleMathService) {
	//let self = this; // no need to do this in ES6

	let a = 12;
	let b = 24;

	//self.result = simpleMathService.multiply(a, b);
	//self.title = 'East coast record breakers';
	//self.orderProp = 'recordDate';

	this.result = simpleMathService.multiply(a, b);
	this.title = 'East coast record breakers';
	this.orderProp = 'recordDate';

	// the 'then' method of the promise object handles the asynchronous response, parsing the response
	// into the 'data' property. This is used in a callback function to assign the 'records' property 
	// to the controller. 
	// 
	//$http.get('js/data/recordBreakers.json').then(function (response) {
	//	self.records = response.data;
	//});

	// alternatively, using the ES6 arrow function 'this' is bound to the anonymous function from
	// the outer scope and there is no need to instantiate the 'self' variable...
	// there is a lexical 'this'
	$http.get('js/data/recordBreakers.json').then(response => this.records = response.data);

}