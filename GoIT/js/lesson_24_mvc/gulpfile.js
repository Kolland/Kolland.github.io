var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var path = require('path');


gulp.task('sass', function () {
	sass('src/sass/style.scss', { sourcemap: true })
    .on('error', sass.logError)
 	
    .pipe(gulp.dest('dest/css'));

});

gulp.task('watch', function () {
	gulp.watch('src/sass/style.scss', ['sass'])
});
