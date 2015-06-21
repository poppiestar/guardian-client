
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var stylint = require('gulp-stylint');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var stringify = require('stringify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('css', function () {
    gulp.src('./src/stylus/**/*.styl')
        .pipe(stylint({ maxWarnings: 0, maxWarningsKill: true }))
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return browserify({
            entries: './src/js/app.js',
            debug: true,
            transform: stringify({
                    extensions: ['.html'], minify: true
                })
            })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['css', 'js']);

