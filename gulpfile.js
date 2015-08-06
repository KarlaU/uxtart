var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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

    images: function(){
        //si karla tiene problemas, por favor comentar el contenido
        // de esta funcion
        var choices = {
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        };

        gulp.src('./src/img/*')
        .pipe(imagemin(choices))
        .pipe(gulp.dest('./public/img/'));
    },

    scripts: function(){
        return gulp.src('./src/js/*.js').pipe(gulp.dest('./public/js/'));
    }
};

gulp.task('assets', tasks.assets);
gulp.task('styl', tasks.styl);
gulp.task('images', tasks.images);
gulp.task('scripts', tasks.scripts);

gulp.task('watch', function(){
    gulp.watch(['./src/css/**/*.styl'], ['styl']);
    gulp.watch(['./src/js/*.js'], ['scripts']);
});

gulp.task('default', ['assets', 'styl', 'scripts', 'images' , 'watch']);
