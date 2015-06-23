var gulp = require('gulp');

module.exports = gulp.task('copy', function () {
  var staticServerPath = BUILD_FOLDER;
  if (release)
    staticServerPath = RELEASE_FOLDER;

  gulp.src('app/bower_components/**')
  .pipe(gulp.dest(staticServerPath + '/libraries'));

  gulp.src('src/directives/**/*.html')
  .pipe(gulp.dest(staticServerPath + '/partials'));

  gulp.src('src/templates/**/*.html')
  .pipe(gulp.dest(staticServerPath + '/templates'));
});
