'use strict';

// export the Component Definition Object (CDO)
export const RecordBreakersListComponent = {
	templateUrl: TemplatePath,
	controller: RecordBreakersListController
};

function TemplatePath(resourcePathService) {
	return resourcePathService.getTemplate();
}

function RecordBreakersListController(resourcePathService) {
	this.title = 'East coast record breakers';
	this.orderProp = 'recordDate';
	this.records = [];

	// 'then' method of the promise object parses the asynchronous response... 
	// then used in a callback function to assign the 'records' property to the controller
	resourcePathService
		.getData()
		.then(response => this.records = response);

	// using the ES6 arrow function - 'this' is bound to the anonymous function from
	// the outer scope and there is no need to instantiate a parent function 'self' variable...
	// there is a lexical 'this'
}