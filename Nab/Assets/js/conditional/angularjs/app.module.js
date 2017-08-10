(function () {
	'use strict';

	//var ComponentsModule = require('./components/components.module');


	const myModule = require('./test.module');

	let val = myModule.fwibble();

	//console.log('val: ' + val); // val is "Hello"







	angular.module('myApplication', ['mySharedElements']);

	var mySharedElements = angular.module('mySharedElements', []);

	mySharedElements.directive('myDirective', function () {
		return {
			restrict: 'A',
			transclude: true,
			template: '<div style="background-color:pink" ng-transclude></div>'
		}; 
	});

	angular.module('myApplication').controller('DemoController', function () {

	});



	


})();