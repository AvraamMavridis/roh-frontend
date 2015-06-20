'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');


module.exports = gulp.task('serve', function (next) {
  var staticServerPath = BUILD_FOLDER;
  if (release)
    staticServerPath = RELEASE_FOLDER;

  connect.server({
      root: staticServerPath,
      livereload: true
  });

});
