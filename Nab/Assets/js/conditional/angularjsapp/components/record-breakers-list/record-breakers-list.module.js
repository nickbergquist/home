'use strict';

// service
import { RecordBreakersListService } from './record-breakers-list.service';

// import Component Definition Object (CDO)
import { RecordBreakersListComponent } from './record-breakers-list.component';

export const RecordBreakersListModule = angular
	.module('components.recordBreakersList', [])
	.component('recordBreakersList', RecordBreakersListComponent)
	.service('resourcePathService', RecordBreakersListService)
	.name;