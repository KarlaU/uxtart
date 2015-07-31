var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
//var imagemin = require('gulp-imagemin');
//var pngquant = require('imagemin-pngquant');

var tasks = {
    assets: function(){
        gulp.src('./src/css/bootstrap.min.css')
        .pipe(gulp.dest('./public/css'));

        gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./public/fonts'));
    },

    styl: function(){
        gulp.src('./src/css/styles.styl')
        .pipe(stylus({compress:true}))
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest('./public/css'));
    },

    scripts: function(){
        return gulp.src('./src/js/*.js')
            .pipe(gulp.dest('./public/js/'));
    }
};

gulp.task('assets', tasks.assets);
gulp.task('styl', tasks.styl);
gulp.task('images', tasks.images);
gulp.task('scripts', tasks.scripts);

gulp.task('watch', ['assets', 'styl', 'scripts'], function(){
    gulp.watch(['./src/css/**/*.styl'], ['styl']);
    gulp.watch(['./src/js/*.js'], ['scripts']);
});

gulp.task('default', ['watch']);
