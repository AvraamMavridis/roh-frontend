'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');

module.exports = gulp.task('lint', function () {
  return gulp.src(config.paths.src.scripts)
  .pipe(tslint())
  .pipe(tslint.report('verbose'))
});
