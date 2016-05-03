var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var path = require('path');

gulp.task('sass', function () {
  sass('src/sass/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/sass/*.scss', ['sass'])
});