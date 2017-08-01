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
    /*.pipe(minifycss())*/
    .pipe(rev())
    .pipe(gulp.dest('css'))
    .pipe(notify({message: 'sass task complete'}))
    /*生成一个rev-manifest.json*/
    .pipe(rev.manifest())        
    .pipe(gulp.dest('rev'))
    .pipe(notify({message: 'rev task complete'}));
});

gulp.task('rev', function() {
	//- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    gulp.src(['rev/*.json', '/*.html'])   
    //- 执行文件内css名的替换
    .pipe(revcollector())                                   
    //- 替换后的文件输出的目录
    .pipe(gulp.dest('/*.html'))
    .pipe(notify({message: 'rev1 task complete'}));                
});

gulp.task('watch',function(){
	gulp.watch(['sass/*.scss'],['sass']);
	livereload.listen();
	gulp.watch(['css/*']).on('change',livereload.changed);
});

gulp.task('default',function(){
	gulp.start('sass','rev','watch');
});

/*gulp.task('script',function(){
	return gulp.src('')
	.pipe(concat('all.js'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
	.pipe(notify({message:'js task complete'}));
});*/