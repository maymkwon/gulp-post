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
    del = require('del'),
    precss = require('precss');

var paths = {
  cssSource: 'src/p_css/',
  jsSource: 'src/js/',
  cssDestination: 'css/',
  jsDestination: 'js/'
};


// /////////////////////////////////
//  Script 업무//////////////////////
// /////////////////////////////////
gulp.task('script', function(){
    gulp.src(paths.jsSource + '**/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDestination))
    .pipe(reload({stream:true}));
});


// /////////////////////////////////
//  Styles 업무//////////////////////
// /////////////////////////////////
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
    .pipe(rename({
        suffix:'.min',
        basename: "style"
    }))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(reload({stream:true}));
});


// /////////////////////////////////
//  HTML 업무 //////////////////////
// /////////////////////////////////
gulp.task('html',function () {
    gulp.src('./index.html')
    .pipe(reload({stream:true}));
});




// /////////////////////////////////
//  BUILD 업무 //////////////////////
// /////////////////////////////////
gulp.task('build:cleanfolder',function(cb) {
        del([
            'build/**'
        ], cb);
});


gulp.task('build:copy',function() {
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});


gulp.task('build:remove',['build:copy'],function(cb) {
    del([
        'build/src/',
        'build/css/!(*.min.css)',
        'build/js/!(*.min.js)'
    ], cb);
});


gulp.task('build', ['build:copy','build:remove']);


// /////////////////////////////////
//  browser-sync 업무 //////////////////////
// /////////////////////////////////
gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:"./app"
        }
    });
});


// /////////////////////////////////
//  WATCH 업무 //////////////////////
// /////////////////////////////////
gulp.task('watch', function () {
    gulp.watch(paths.cssSource + '**/*.css', ['styles']);
    gulp.watch(paths.jsSource + '**/*.js', ['script']);
    gulp.watch('./index.html', ['html']);

});


// /////////////////////////////////
//  DEFAULT //////////////////////
// /////////////////////////////////

gulp.task('default', ['html','styles','script','browser-sync','watch']);
