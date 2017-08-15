
//import myModule from './test.module';
//import componentsModule from './components/components.module';


{
	'use strict';
	
	//let val = myModule.fwibble();
	//console.log('val: ' + val); // val is "Hello"



	angular
		.module('recordBreakersApp', [])
		.controller('RecordBreakersListController', function RecordBreakersListController($scope) {
			$scope.records = [
				{
					name: 'Flying Scotsman',
					number: '4472',
					class: 'A1',
					built: '1923',
					snippet: 'First steam locomotive offically recorded at 100 mph, 1934.'
				},
				{
					name: 'Papyrus',
					number: '2750',
					class: 'A3',
					built: '1929',
					snippet: 'Holder of the world speed record for steam at 108 mph, 1935.'
				},
				{
					name: 'Silver Link',
					number: '2509',
					class: 'A4',
					built: '1935',
					snippet: 'Holder of the British speed record for steam at 112 mph on the inaugural Silver Jubilee high-speed streamlined service between Kings Cross and Newcastle, 1935.'
				},
				{
					name: 'Mallard',
					number: '4468',
					class: 'A4',
					built: '1938',
					snippet: 'Holder of the world speed record for steam at 126 mph, 1938.'
				}
			];
		});








	// declare a module with a dependency on another module
	//angular
	//	.module('myApplication', ['mySharedElements']);

	// declare the other module 
	//angular
	//	.module('mySharedElements', [])
	//	.directive('fwibbleDirective', () => {
	//		return {
	//			restrict: 'A',
	//			transclude: true,
	//			template: '<div style="background-color:pink" ng-transclude></div>'
	//		};
	//	});

	//angular.module('myApplication').controller('DemoController', function () {

	//});


}