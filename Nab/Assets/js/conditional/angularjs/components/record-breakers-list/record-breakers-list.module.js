'use strict';

import { RecordBreakersListComponent } from './record-breakers-list.component';

export const RecordBreakersListModule = angular
	.module('components.recordBreakersList', [])
	.component('recordBreakersList', RecordBreakersListComponent)
	.name;
	