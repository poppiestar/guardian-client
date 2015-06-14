
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var stylint = require('gulp-stylint');
var browserify = require('browserify');
var stringify = require('stringify');
var source = require('vinyl-source-stream');

gulp.task('css', function () {
    gulp.src('./src/stylus/**/*.styl')
        .pipe(stylint({ maxWarnings: 0, maxWarningsKill: true }))
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return browserify('./src/js/app.js', {
        transform: stringify({
                extensions: ['.html'], minify:true
            })
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['css', 'js']);

