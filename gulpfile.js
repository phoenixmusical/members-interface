var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build']);

gulp.task('build', ['styles', 'javascript']);

gulp.task('clean', function(callback){
	del(['dist'], callback);
});

gulp.task('styles', ['clean'], function(callback){
	callback();
});

gulp.task('javascript', ['clean'], function() {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries : './code/entry.js',
		debug : true
	});
	
	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));
});