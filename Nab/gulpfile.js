'use strict';

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

const scssInput = config.paths.stylesheets.scss;
const scssIgnore = config.paths.stylesheets.ignore;
const scssThemes = config.paths.stylesheets.themes;
const cssOutput = config.paths.stylesheets.css;
const scriptInput = config.paths.javascript.files;
const scriptFolder = config.paths.javascript.folder;

const sassOptions = {
    errLogToConsole: true
};

// development: compile unminified SASS with linting and sourcemaps 
gulp.task('dev-css', ['tear-down-css'], () => {
    return gulp
        .src([scssInput, scssIgnore])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write().on('end', () => util.log('Sourcemap created')))
        .pipe(gulp.dest(cssOutput).on('end', () => util.log('CSS written to ' + cssOutput)));
});

// production: compile SASS with minification
gulp.task('pub-css', ['tear-down-css'], () => {
    return gulp
        .src([scssInput, scssIgnore])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
		.pipe(cleanCss().on('end', () => util.log('CSS minified')))
		.pipe(rename('main.min.css'))
        .pipe(gulp.dest(cssOutput).on('end', () => util.log('CSS written to ' + cssOutput)));
});

// development: copy static JS and the main JS file over to wwwroot/js as is
gulp.task('dev-scripts', ['tear-down-scripts'], () => {
	return gulp.src(scriptInput)
		.pipe(gulp.dest(scriptFolder).on('end', () => util.log('JS written to ' + scriptFolder)));
});

// production: concatenate JS and minify
gulp.task('pub-scripts', ['tear-down-scripts'], () => {
	return gulp
		.src(['./Assets/js/static/matchMedia.js', './Assets/js/static/enquire.min.js', './Assets/js/site.js'])
		.pipe(concat('site.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(scriptFolder).on('end', () => util.log('JS written to ' + scriptFolder)));
});

gulp.task('tear-down-css', () => {
	return del.sync(cssOutput + '*');
});

gulp.task('tear-down-scripts', () => {
	return del.sync(scriptFolder + '*');
});

// usage: gulp theme --name name-of-theme
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
            .pipe(gulp.dest(cssOutput).on('end', () => util.log('CSS written to ' + cssOutput)));
    } else {
        util.log('File at ' + themePath + ' missing, check the SASS theme name matches the task name parameter.');
        util.log('Usage: gulp theme --name name-of-theme');
        util.log('Exiting process');
        process.exit();
    }
});

// watch for changes in SASS or JS files
gulp.task('watch', () => {
	gulp.watch([scssInput, scssIgnore], ['dev-build-css']);
	gulp.watch(scriptInput, ['dev-build-scripts']);
});

// main tasks
gulp.task('default', ['dev-build', 'watch']);
gulp.task('dev-build', ['tear-down-css', 'tear-down-scripts', 'dev-css', 'dev-scripts']);

// used by 'watch' task
gulp.task('dev-build-css', ['tear-down-css', 'dev-css']);
gulp.task('dev-build-scripts', ['tear-down-scripts', 'dev-scripts']);

// build published
gulp.task('pub-build', ['tear-down-css', 'tear-down-scripts', 'pub-css', 'pub-scripts']);