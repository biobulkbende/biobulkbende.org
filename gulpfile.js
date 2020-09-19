const gulp = require('gulp');
const { src, dest, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
webpack = require('webpack-stream'),
webpackConfig = require('./webpack.config.js'),
modernizr = require('gulp-modernizr'),
browserSync = require('browser-sync').create();


// JS TASKS

function cleanScripts(){
	return del('./app/temp/scripts/App.js');
}

function modernizrTask(){
	return src(['./app/assets/scss/**/*.scss','./app/assets/js/**/*.js'])
		.pipe(modernizr({
			"options": [
				"setClasses"
			]
		}))
		.pipe(dest('./app/assets/temp'));
}

function scriptsTask(){
	return src('./app/assets/js/App.js')
		.pipe(webpack(webpackConfig, null, function(err, stats) {
      		if (err) { console.log(err); };
    	}))
		// .on('error', function (err) { if(err){ console.log(err.message);} })
		.pipe(dest('./app/temp/scripts'))
		.pipe(browserSync.stream());
}

function endCleanModernizr(){
	return del(['./app/assets/temp']);
}

// SCSS TASKS

function scssTask() {
	return src('./app/assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer()]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/temp/styles'))
		.pipe(browserSync.stream());
}

// WATCH TASK

const watch = function() {
	browserSync.init({
		notify: false,
    	server: {
    		baseDir: './app'
    	}
    });
    gulp.watch("./app/assets/scss/**/*.scss", {usePolling : true}, gulp.series(scssTask)).on('change', browserSync.reload);
    gulp.watch("./app/assets/js/**/*.js", {usePolling : true}, gulp.series(cleanScripts, modernizrTask, scriptsTask, endCleanModernizr));
    // gulp.watch("./app/assets/images", {usePolling : true}, gulp.series(imagesTask));
    gulp.watch("./app/*.html").on('change', browserSync.reload);
};

exports.watch = watch;