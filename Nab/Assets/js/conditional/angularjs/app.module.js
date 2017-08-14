import angular from 'angular';

(function () {
	'use strict';

	
	//const ComponentsModule = require('./components/components.module');
	const myModule = require('./test.module');

	let val = myModule.fwibble();
	//console.log('val: ' + val); // val is "Hello"

	











	// declare a module with a dependency on another module
	angular.module('myApplication', ['mySharedElements']);

	// declare the other module 
	var mySharedElements = angular.module('mySharedElements', []);

	// 
	mySharedElements.directive('fwibbleDirective', function () {
		return {
			restrict: 'A',
			transclude: true,
			template: '<div style="background-color:pink" ng-transclude></div>'
		}; 
	});

	//angular.module('myApplication').controller('DemoController', function () {

	//});


})();