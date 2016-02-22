var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');


gulp.task('sass', function () {
	sass('src/sass/**.scss', { sourcemap: true })
    .on('error', sass.logError)
 	
    .pipe(gulp.dest('dest/css'));

});

gulp.task('svgstore', function () {
    return gulp
        .src('src/svg_icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('dest/img'));
});

gulp.task('watch', function () {
	gulp.watch('src/sass/**.scss', ['sass'])
});
