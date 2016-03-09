var gulp = require('gulp');

// Include our plugins

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Lint task

gulp.task('lint', function() {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile SASS

gulp.task('sass', function(){
	return gulp.src('public/stylesheets/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/stylesheets/css'));
});

//Concatenate and minify JS

gulp.task('scripts', function() {
	return gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

//WATCH CHANGES

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('public/stylesheets/sass/*.scss', ['sass']);
});

//Default task

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);