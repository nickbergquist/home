﻿'use strict';

import { ComponentsModule } from './components/components.module';

export const AppModule = angular
	.module('app', [
		ComponentsModule
	])
	.constant('config', {
		pathTemplates: 'js/templates/'
	})
	.name;