'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');

module.exports = gulp.task('watch', function () {

  watch({ glob: [config.paths.src.scripts]}, ['lint','copy']);
  watch({ glob: [config.paths.src.index]}, ['index','copy']);
  watch({ glob: [config.paths.src.templates, config.paths.src.templatesHTML]}, ['templates','copy']);
  watch({ glob: [config.paths.src.stylesGlob]}, ['styles','copy']);
});
