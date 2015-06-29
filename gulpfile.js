var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('assets', function(){
    gulp.src('./src/css/bootstrap.min.css')
    .pipe(gulp.dest('./public/css'));

    gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('styl', function(){
    gulp.src('./src/css/styles.styl')
    .pipe(stylus({compress:true}))
    .pipe(rename({extname:'.min.css'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function(){
    gulp.src('./src/img/*')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('watch', function(){
    gulp.watch(['./src/css/**/*.styl'], ['styl']);
});

gulp.task('default', ['assets', 'styl', 'images', 'watch']);
