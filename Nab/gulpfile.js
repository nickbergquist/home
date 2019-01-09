'use strict';

/**
 * DEPENDENCIES
 */
const gulp = require('gulp');
const util = require('gulp-util');
const pathExists = require('path-exists');
const rename = require('gulp-rename');
const loadJsonFile = require('load-json-file');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const config = loadJsonFile.sync('gulpconfig.json');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const eslint = require('gulp-eslint');
const gzip = require('gulp-gzip');


/**
 * PATHS
 */
const scssSrc = config.paths.stylesheets.scss;
const scssIgnore = config.paths.stylesheets.ignore;
const scssThemes = config.paths.stylesheets.themes;
const cssConditionalVendor = config.paths.stylesheets.conditionalVendor;
const cssDest = config.paths.stylesheets.css;

const scriptMain = config.paths.javascript.srcMain;
const mainSite = config.paths.javascript.mainSite;
const scriptStatic = config.paths.javascript.srcStatic;
const scriptConditional = config.paths.javascript.srcConditional;
const scriptConditionalIgnore = config.paths.javascript.srcConditionalIgnore;
const scriptDest = config.paths.javascript.dest;
const scriptGenSiteLintConfig = config.paths.javascript.generalSiteLintConfig;


/**
 * SASS/CSS
 */
const sassOptions = {
    errLogToConsole: true
};

// development: build a full CSS deployment 
gulp.task('dev-css', ['tear-down-css', 'dev-build-sass', 'view-specific-css']);

// development: compile unminified SASS with linting and sourcemaps 
gulp.task('dev-build-sass', [], () => {
	return gulp
		.src([scssSrc, scssIgnore])
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write().on('end', () => util.log('Sourcemap created')))
		.pipe(gulp.dest(cssDest).on('end', () => util.log('CSS (compiled SASS) written to ' + cssDest)));
});

// production: compile SASS with minification and HTTP compression
gulp.task('pub-css', ['tear-down-css', 'view-specific-css'], () => {
    return gulp
		.src([scssSrc, scssIgnore])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
		.pipe(cleanCss().on('end', () => util.log('CSS minified')))
		.pipe(rename('main.gz.min.css'))
		.pipe(gzip({ append: false }))
		.pipe(gulp.dest(cssDest).on('end', () => util.log('CSS (compiled SASS) minified and written to ' + cssDest)));
});

// view-specific CSS, not required on all pages but process to wwwroot/css without appending to the main CSS file
gulp.task('view-specific-css', () => {
	return gulp
		.src(cssConditionalVendor)
		.pipe(cleanCss().on('end', () => util.log('Vendor CSS minified')))
		.pipe(rename({ suffix: '.gz.min' }))
		.pipe(gzip({ append: false }))
		.pipe(gulp.dest(cssDest).on('end', () => util.log('Vendor CSS written to ' + cssDest)));
});

// SASS theme usage: gulp theme --name name-of-theme
gulp.task('theme', () => {
	let themePath = scssThemes + util.env.name + '.scss';
	let filePresent = pathExists.sync(themePath);

	if (filePresent) {
		util.log('File at ' + themePath + ' exists, starting pipe...');
		return gulp
			.src(themePath)
			.pipe(sass(sassOptions).on('error', sass.logError))
			.pipe(autoprefixer())
			//.pipe(cleanCss().on('end', () => util.log('CSS minified')))
			.pipe(rename('main.css')) // or rename as 'main.min.css' if publishing with minification
			.pipe(gulp.dest(cssDest).on('end', () => util.log('CSS written to ' + cssDest)));
	} else {
		util.log('File at ' + themePath + ' missing, check the SASS theme name matches the task name parameter.');
		util.log('Usage: gulp theme --name name-of-theme');
		util.log('Exiting process');
		process.exit();
	}
});

// remove all compiled CSS
gulp.task('tear-down-css', () => {
	return del.sync(cssDest + '*');
});


/**
 * JAVASCRIPT
 */
// development: copy, build and lint
gulp.task('dev-scripts', ['tear-down-scripts', 'dev-build-site', 'view-specific-scripts']);

// development: main site script(s) with linting
gulp.task('dev-build-site', ['bundle-static-scripts'], () => {
	return gulp
		.src([scriptMain], { dot: false })
		.pipe(eslint({ configFile: scriptGenSiteLintConfig }))
		.pipe(eslint.format())
		//.pipe(eslint.failAfterError())
		.pipe(gulp.dest(scriptDest).on('end', () => util.log('Unaltered main site JS written to ' + scriptDest)));
});

// production: main task
gulp.task('pub-scripts', ['tear-down-scripts', 'pub-build-site', 'view-specific-scripts']);

// production: main site script(s) with minification
gulp.task('pub-build-site', ['bundle-main-site-static-scripts']);

// production: concatenate, minify and HTTP compress static scripts and main site script
gulp.task('bundle-main-site-static-scripts', () => {
	return gulp
		.src([scriptStatic + 'matchMedia.js', scriptStatic + 'enquire.min.js', mainSite])
		.pipe(concat('site.gz.min.js'))
		.pipe(uglify())
		.pipe(gzip({ append: false }))
		.pipe(gulp.dest(scriptDest).on('end', () => util.log('Minified main/static site JS written to ' + scriptDest)));
});

// concat and minify static main site scripts
gulp.task('bundle-static-scripts', () => {
	return gulp
		.src([scriptStatic + 'matchMedia.js', scriptStatic + 'enquire.min.js'])
		.pipe(concat('static.gz.min.js'))
		.pipe(uglify())
		.pipe(gzip({ append: false }))
		.pipe(gulp.dest(scriptDest).on('end', () => util.log('Minified static JS written to ' + scriptDest)));
});

// view-specific JS, not required in all views - minify but no concatenation to any other JS file
gulp.task('view-specific-scripts', () => {
	return gulp
		.src([scriptConditional, scriptConditionalIgnore])
		.pipe(rename({ dirname: '', suffix: '.gz.min' })) // remove source directory(s)
		.pipe(uglify())
		.pipe(gzip({ append: false }))
		.pipe(gulp.dest(scriptDest).on('end', () => util.log('Conditional JS written to ' + scriptDest)));
});

gulp.task('tear-down-scripts', () => {
	return del.sync(scriptDest + '*');
});


/**
 * WATCH TASKS
 */
// watch for changes in SASS, JS or HTML template files
gulp.task('watch', () => {
	gulp.watch([scssSrc, scssIgnore], ['dev-build-sass']);
	gulp.watch(scriptMain, ['dev-build-site']);
});


/**
 * MAIN TASKS
 */
// build development
gulp.task('default', ['dev-build', 'watch']);
gulp.task('dev-build', ['dev-css', 'dev-scripts']);

// build published
gulp.task('pub-build', ['pub-css', 'pub-scripts']);
