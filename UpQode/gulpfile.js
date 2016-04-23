var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var path = require('path');

gulp.task('sass', function () {
  sass('src/sass/style.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('gcdn', function () {
    return gulp.src('index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/sass/*.scss', ['sass'])
});