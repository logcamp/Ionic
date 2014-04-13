var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	minifyCss 	= require('gulp-minify-css'),
	rename 		= require('gulp-rename'),
	compass 	= require('gulp-compass'),
	livereload 	= require('gulp-livereload'),
	growl 		= require('gulp-notify-growl'),
	//path 		= require('path'),
	//server		= livereload(),
	watch 		= require('gulp-watch'),
	plumber 	= require('gulp-plumber'),
	growler 	= growl();

var paths = {
  sass: ['scss/ionic.app.scss'],
  html: ['www/index.html','www/templates/*.html']
};

gulp.task('compass', function() {
  gulp.src(paths.sass)
  .pipe(watch(function(files){
	  return files.pipe(compass({
		css: 'www/css',
		sass: 'scss',
		style: 'expanded'

	}))
	.pipe(minifyCss({
		keepSpecialComments: 0
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(growler({
		title: 'Hooray',
		message: 'Compass task complete'
	}))
	.pipe(livereload())
  }));
});

gulp.task('html', function() {
	gulp.src(paths.html)	
	.pipe(watch(function(files){
		return files.pipe(livereload())
		.pipe(growler({
				title: 'Yay',
				message: 'Html task complete'
		}));
	}));
	
});


gulp.task('default', ['compass','html']);
