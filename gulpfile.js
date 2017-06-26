var buildFolder = './Build/',
    gulp = require('gulp'),
    fs = require('fs'),
    concat = require("gulp-concat"),
    header = require("gulp-header"),    
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    sass = require("gulp-sass"),
    less = require("gulp-less"),
    uglify = require("gulp-uglify"),
    jshint = require("gulp-jshint"),
    jasmineBrowser = require('gulp-jasmine-browser'),
    open = require('gulp-open');

// Get version using NodeJs file system
var getVersion = function () {
    return fs.readFileSync('Version');
};

// Get copyright using NodeJs file system
var getCopyright = function () {
    return fs.readFileSync('Copyright');
};

// Get copyright using NodeJs file system
var getCopyrightVersion = function () {
    return fs.readFileSync('CopyrightVersion');
};

// Run All tasks one by one
gulp.task('default', ['compile-less', 'compile-sass', 'minify-css', 'minify-html', 'minify-js', 'concat', 'jsLint','jasmine','app']);

// Compile ECMAScript 6
gulp.task('compile-es6', function () {
    gulp.src('./ES6/one.es6.js')
        .pipe(babel())
        .pipe(gulp.dest(buildFolder + 'compile-es6'));
});


// Compile Less
gulp.task('compile-less', function () {
    gulp.src('./src/main/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest(buildFolder + 'compile-less'));
});

// Compile Sass
gulp.task('compile-sass', function () {
    gulp.src('./Sass/one.sass')
        .pipe(sass())
        .pipe(gulp.dest(buildFolder + 'compile-sass'));
});

// Minify Css
gulp.task('minify-css', function () {
    gulp.src(buildFolder + 'compile-less/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest(buildFolder + 'minify-css'));
});

// Minify HTML
gulp.task('minify-html', function () {
    gulp.src('index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest(buildFolder + 'minify-html'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
    gulp.src('./src/main/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder + 'minify-js'));
});

// Concat JavaScript
gulp.task('concat', function () {
    gulp.src('./src/main/scripts/*.js')
        .pipe(concat('concat.js'))
        .pipe(gulp.dest(buildFolder + 'concat'));
});

// Concat JavaScript and Add Copyright
gulp.task('concat-copyright', function () {
    gulp.src('./src/main/scripts/*.js')
        .pipe(concat('concat-copyright.js'))
        .pipe(header(getCopyright()))
        .pipe(gulp.dest(buildFolder + 'concat'));
});

// Concat JavaScript and Add Copyright + Version
gulp.task('concat-copyright-version', function () {
    gulp.src('./src/main/scripts/*.js')
        .pipe(concat('concat-copyright-version.js'))
        .pipe(header(getCopyrightVersion(), {
            version: getVersion()
        }))
        .pipe(gulp.dest(buildFolder + 'concat'));
});

// Lint JavaScript
gulp.task('jsLint', function () {
    gulp.src('./src/main/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

//jasmine test
gulp.task('jasmine', function() {
  return gulp.src(['src/**/*.js', 'test/**/*Spec.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

// Open an URL in a given browser:

gulp.task('app', function(){
    var options = {
        uri: 'http://localhost:8000/index.html',
        app: 'chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));
});

