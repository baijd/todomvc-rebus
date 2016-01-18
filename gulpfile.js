var gulp = require('gulp'),
	connect = require('gulp-connect'),
	port = process.env.port || 5000,
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('connect', function(){
	connect.server({
		port : port,
		livereload : true
	});
});

gulp.task('browserify', function(){
	gulp.src('./src/app.js')
		.pipe(browserify({
			transform : 'reactify',
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){
	gulp.src('./dist/**/*.js')
		.pipe( connect.reload() );
});

gulp.task('html', function(){
	gulp.src('./*.html')
		.pipe( connect.reload() );
});

gulp.task('watch', function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./*.html',['html']);
	gulp.watch('./src/**/*.js',['browserify']);
});

gulp.task('default',['connect']);
gulp.task('server',['browserify','connect','watch']);