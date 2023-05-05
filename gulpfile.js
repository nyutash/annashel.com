let compileConfig = {
    settings: require('./src/compile-settings.json')
};

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.task('sass', function () {
    return gulp.src(compileConfig.settings.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        // Commented until
        //.pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/styles/**/*.scss', gulp.series('sass'));
  });

gulp.task('js', function () {
    return gulp.src(compileConfig.settings.javascripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(minify())
        .pipe(gulp.dest('dist/javascripts'));
  });
  
  gulp.task('js:watch', function () {
    gulp.watch('src/javascripts/**/*.js', gulp.series('js'));
  });

gulp.task('default', gulp.parallel('sass', 'js'));
gulp.task('watch', gulp.parallel('sass:watch', 'js:watch'));