var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var path = require('path');
var googlecdn = require('gulp-google-cdn');
var mainBowerFiles = require('main-bower-files');

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

gulp.task('mainJS', function() {
    return gulp.src(mainBowerFiles('**/*.js',
      {
          "overrides": {
              "jquery": {
                  "main": [
                    "dist/jquery.min.js",
                  ]
              },
              "modernizr": {
                  "main": [
                    "modernizr.js",
                  ]
              },
          }
      }
      ))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('mainCSS', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function () {
  gulp.watch('src/sass/*.scss', ['sass'])
});


