
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var stylint = require('gulp-stylint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('css', function () {
    gulp.src('./src/stylus/**/*.styl')
        .pipe(stylint({ maxWarnings: 0, maxWarningsKill: true }))
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return browserify('./src/js/app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['css', 'js']);

