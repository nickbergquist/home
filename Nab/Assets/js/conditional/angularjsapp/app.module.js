'use strict';

var env = {};

// import config. variables in app.config.js
if (window) {
	Object.assign(env, window.__env);
}

import { ComponentsModule } from './components/components.module';

export const AppModule = angular
	.module('app', [
		'ngSanitize',
		ComponentsModule
	])
	.constant('__env', env)
	.name;