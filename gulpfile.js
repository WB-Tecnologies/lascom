'use strict';

// Tars main-module init
// It is a global var
require('./tars/tars');

const gulp = tars.packages.gulp;
const imageop = require('gulp-image-optimization');

// Require system and user's tasks
// You can add your own tasks.
// All your tasks have to be in tars/user-tasks folder
tars.helpers.tarsFsHelper
    .getTasks()
    .forEach(file => require(file)());

// Register links to main tasks without namespace
// Build-dev task. Build dev-version (without watchers)
gulp.task('build-dev', () => gulp.start('main:build-dev'));

// Dev task. Build dev-version with watchers and livereload
gulp.task('dev', () => gulp.start('main:dev'));
gulp.task('imagemin', () => {
    gulp.src(['markup/static/img/**/*.png','markup/static/img/**/*.jpg','markup/static/img/**/*.gif','markup/static/img/**/*.jpeg'])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('temp'));
});

// Build task. Build release version
gulp.task('build', () => gulp.start('main:build'));

// Init task. Just start init task
gulp.task('init', () => gulp.start('service:init'));

// Re-init task. Just start re-init task
gulp.task('re-init', () => gulp.start('service:re-init'));

// Update-deps task. Just start update-deps task
gulp.task('update-deps', () => gulp.start('service:update-deps'));

// Default task. Just start build task
gulp.task('default', () => gulp.start('build'));
