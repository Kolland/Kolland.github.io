var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var path = require('path');

//sass
gulp.task('sass', function () {
	sass('src/sass/style.scss', { sourcemap: true })
    .on('error', sass.logError)
 	
    .pipe(gulp.dest('dist/css'));

});

//nunjucks template
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.html')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('dist'))
});

//all pages
gulp.task('nj_all', function () {
  return gulp.src('src/pages/**/*.html')
    .pipe(plumber())
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(gulp.dest('dist'));
});

//watcher
gulp.task('watch', function () {
	gulp.watch('src/sass/style.scss', ['sass']);
  gulp.watch(['src/pages/**/*.html', 'src/templates/**/*.html' ], ['nunjucks']);
});
