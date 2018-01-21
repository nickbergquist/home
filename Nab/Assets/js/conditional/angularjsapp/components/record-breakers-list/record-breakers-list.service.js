'use strict';

export function RecordBreakersListService($http, __env) {

	return {
		getTemplate: function () {
			return __env.pathTemplates + 'record-breakers-list.html';
		},
		getData: function () {
			return $http
				.get(__env.pathData + 'recordBreakers.json')
				.then(response => response.data);
		}
	};
}
