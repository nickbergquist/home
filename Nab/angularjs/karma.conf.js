//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '../Assets/js/conditional/angularjsapp',

	files: [
		{ pattern: '../../../../wwwroot/lib/angular/angular.js', watched: false },
		{ pattern: '../../../../wwwroot/lib/angular-mocks/angular-mocks.js', watched: false },
		'../../../../wwwroot/js/app.js',
		'**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

	browsers: ['Chrome'],
	//browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      //'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
