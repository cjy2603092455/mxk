let gulp = require('gulp')
let htmlmin = require('gulp-htmlmin')
let uglify = require('gulp-uglify')
let babel = require('gulp-babel')


gulp.task('watch-all', async () => {
    gulp.watch("./src/**/*", async () => {
        //压缩html
        gulp.src('./src/*.html')
            // .pipe(htmlmin({
            //     collapseWhitespace: true
            // }))
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk'))
        //压缩js
        gulp.src('./src/js/*.js')
            // .pipe(babel({
            //     presets: ['@babel/env']
            // }))         //先ES6转ES5
            // .pipe(uglify())
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk\\js'))

        gulp.src('./src/php/**/*')
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk\\php'))

        gulp.src('./src/css/*.css')
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk\\css'))

        gulp.src('./src/icon/**/*')
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk\\icon'))

        gulp.src('./src/images/**/*')
            .pipe(gulp.dest('D:\\phpstudy_pro\\WWW\\mxk\\images'))
    })

})