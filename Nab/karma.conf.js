//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './Assets/js/conditional/angularjs',

	files: [
		'../../../../wwwroot/lib/angular/angular.js',
		'../../../../wwwroot/lib/angular-mocks/angular-mocks.js',
		'../../../../wwwroot/js/app.js',
		'**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
