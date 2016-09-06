var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    precss = require('precss');

var paths = {
  cssSource: 'src/p_css/',
  jsSource: 'src/js/',
  cssDestination: 'dist/css/',
  jsDestination: 'dist/js/'
};


// //////////
//  Script
// //////////
gulp.task('script', function(){
    gulp.src(paths.jsSource + '**/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDestination))
    .pipe(reload({stream:true}));
});


// //////////
//  Styles
// //////////
gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '**/*.css')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      precss(),
      autoprefixer({ browserslist: ['> 1%, last 2 versions, Firefox ESR,ie 8'] })
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(reload({stream:true}));
});

gulp.task('html',function () {
    gulp.src('./index.html')
    .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:"./"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.cssSource + '**/*.css', ['styles']);
    gulp.watch(paths.jsSource + '**/*.js', ['script']);
    gulp.watch('./index.html', ['html']);

});
// //////////
//  DEFAULT
// //////////

gulp.task('default', ['html','styles','script','browser-sync','watch']);
