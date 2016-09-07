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
    precss = require('precss'),
    willchange = require("postcss-will-change"),
    browserslist = require("browserslist");
    // cssnext = require('cssnext');
    colorRgbaFallback = require("postcss-color-rgba-fallback");

var paths = {
  cssSource: 'app/src/post-css/',
  jsSource: 'app/src/js/',
  cssDestination: 'app/css/',
  jsDestination: 'app/js/'
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
  return gulp.src(paths.cssSource + 'style.css')
    .pipe(  plumber()   )
    .pipe(  sourcemaps.init()   )
    .pipe(  postcss([
        lost(),
        precss(),
    ]),
    colorRgbaFallback(),
    willchange(),
    autoprefixer(browserslist(['last 3 versions','Firefox <= 20']))
    )
    .pipe(  sourcemaps.write('./')  )
    .pipe(rename({
        basename: "style"
    }))
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
    gulp.src('app/index.html')
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


gulp.task('build:copy',['build:cleanfolder'],function() {
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
    gulp.watch('app/index.html', ['html']);

});


// /////////////////////////////////
//  DEFAULT //////////////////////
// /////////////////////////////////

gulp.task('default', ['html','styles','script','browser-sync','watch']);
