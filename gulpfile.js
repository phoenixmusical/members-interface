var path = require('path');
var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var htmlReplace = require('gulp-html-replace');
var serve = require('gulp-serve');
var config = require('./config.json');

gulp.task('default', ['build']);

gulp.task('serve', ['build'], serve('dist'))

gulp.task('build', ['index', 'views', 'styles', 'javascript']);

gulp.task('clean', function(callback){
	del(['dist/'], callback);
});

gulp.task('index', ['clean'], function(callback){
	return gulp.src('app/index.html')
		.pipe(htmlReplace({
			config: {
				src: JSON.stringify(config),
				tpl: '<script>CONFIG=%s;</script>'
			}
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('views', ['clean'], function(callback){
	return gulp.src('app/views/*.html')
		.pipe(gulp.dest('dist/views/'));
});

gulp.task('styles', ['clean'], function(){
	return gulp.src('app/less/*.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			paths: [__dirname + '/app/less', __dirname+'/app']
		}))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('javascript', ['clean'], function() {
	var b = browserify({
		entries: 'app/code/index.js',
		debug: true
	});
	
	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js/'));
});
