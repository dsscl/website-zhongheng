'use strict';

// 引入 gulp及组件
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    revcollector = require('gulp-rev-collector'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

gulp.task('sass',function(){
    return gulp.src('sass/sass-index.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ["> 0%"],
        cascade: false,
        remove:true
    }))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    /*.pipe(rev())*/
    .pipe(gulp.dest('css'))
    .pipe(notify({message: 'sass task complete'}))
    /*.pipe(rev.manifest())        
    .pipe(gulp.dest('rev'))
    .pipe(notify({message: 'rev task complete'}));*/
});

gulp.task('js',function(){
    return gulp.src('plugin/arrowslide/js/slide.js')
    /*.pipe(concat('all.js'))*/
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('plugin/arrowslide/js'))
    .pipe(notify({message:'js task complete'}));
});

gulp.task('watch',function(){
	gulp.watch(['sass/*.scss','plugin/arrowslide/js/slide.js'],['sass','js']);
	livereload.listen();
	gulp.watch(['css/*','plugin/arrowslide/js/*']).on('change',livereload.changed);
});

gulp.task('default',function(){
	gulp.start('sass','js','watch');
});


/*gulp.task('rev', function() {
    gulp.src(['rev/*.json', '/*.html']) 
    .pipe(revcollector())         
    .pipe(gulp.dest('/*.html'))
    .pipe(notify({message: 'rev1 task complete'}));                
});*/