var gulp = require('gulp'),
    sass = require('gulp-sass');

// Gulp Sass Task
gulp.task('sass', function() {
    gulp.src('public/styles/scss/styles.scss')
        .pipe(sass({noCache: true}))
        .pipe(gulp.dest('public/styles'));
});