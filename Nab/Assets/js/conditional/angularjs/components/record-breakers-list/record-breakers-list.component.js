'use strict';

// export the Component Definition Object (CDO)
export const RecordBreakersListComponent = {
	templateUrl: config => config.pathTemplates + 'record-breakers-list.html',
	controller: RecordBreakersListController
};

// inject service dependency
function RecordBreakersListController(simpleMathService) {
	let a = 12;
	let b = 24;

	this.result = simpleMathService.multiply(a, b);

	this.title = 'East coast record breakers';
	this.records = [
		{
			name: 'Flying Scotsman',
			number: '4472',
			class: 'A1',
			built: '1923',
			snippet: 'First steam locomotive offically recorded at 100 mph, 1934. But still a contentious issue! Part of the <a href="https://en.wikipedia.org/wiki/List_of_rolling_stock_items_in_the_UK_National_Collection">National Collection</a>.'
		},
		{
			name: 'Papyrus',
			number: '2750',
			class: 'A3',
			built: '1929',
			snippet: 'Holder of the world speed record for steam at 108 mph, 1935. Sadly now baked-bean tins.'
		},
		{
			name: 'Silver Link',
			number: '2509',
			class: 'A4',
			built: '1935',
			snippet: 'First of class. Holder of the British speed record for steam at 112 mph on the inaugural Silver Jubilee high-speed streamlined service between Kings Cross and Newcastle, 1935.'
		},
		{
			name: 'Mallard',
			number: '4468',
			class: 'A4',
			built: '1938',
			snippet: 'Current holder of the world speed record for steam at 126 mph, 1938. Part of the <a href="https://en.wikipedia.org/wiki/List_of_rolling_stock_items_in_the_UK_National_Collection">National Collection</a>'
		}
	];
}