"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var react = require('gulp-react');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var order = require('gulp-order');
var sass = require('gulp-sass');
var print = require('gulp-print');
var addsrc = require('gulp-add-src');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');


gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./app/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});


// move html
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build'))
});

// move fonts
gulp.task('fonts', function () {
  return gulp.src(['app/**/*.woff','app/**/*.ttf' ])
    .pipe(gulp.dest('build'))
});

// compile sass
gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
});

// move css
gulp.task('css', function () {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('build'))
});

// move js
gulp.task('js', function () {
  return gulp.src('app/bower_components/**/*.js')
    .pipe(gulp.dest('build/bower_components'))
});



gulp.task('jsx', function () {
    return gulp.src('app/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('build/js'))
        .pipe(order([
          'build/js/jsx/config.js',
          'build/js/jsx/actions.js',
          'build/js/jsx/*Store.js',
          'build/js/jsx/*Button.js',
          'build/js/jsx/*.js'],
          {base: '.'}
         ))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('app/**/*.jsx', ['jsx']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.sass', ['sass']);
});

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true,
      host: '127.0.0.1'
    }));
});


gulp.task('default', ['fonts','browserify','js','html','sass','css', 'serve','watch']);
