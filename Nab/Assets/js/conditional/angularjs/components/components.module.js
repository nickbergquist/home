'use strict';

import { RecordBreakersListModule } from './record-breakers-list/record-breakers-list.module';

export const ComponentsModule = angular
	.module('app.components', [
		RecordBreakersListModule
	])
	.name;
