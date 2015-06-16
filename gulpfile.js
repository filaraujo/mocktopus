var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Basic usage
gulp.task('scripts', function() {
  gulp.src('index.js')
    .pipe(rename('mocktopus.min.js'))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});
