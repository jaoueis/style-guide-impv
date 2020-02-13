'use strict';

//const projName = 'style-guide';

// load plugins
const gulp         = require('gulp');
const gulpSass     = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS    = require('gulp-clean-css');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const terser       = require('gulp-terser');
const connect      = require('gulp-connect-php');
const browser_sync = require('browser-sync').create();

// prevent errors stop Gulp tasks
function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

// BrowserSync
function browserSync(done) {
    connect.server({}, function () {
        browser_sync.init({
            injectChanges: true,
            proxy        : '127.0.0.1:8000'
        });
    });
    done();

    //this code snippet to set the proxy to MAMP server
    //browser_sync.init({
    //    injectChanges: true,
    //    proxy        : '127.0.0.1/' + projName
    //});
    //done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browser_sync.reload();
    done();
}

// SASS task
function sass() {
    return gulp.src(['./node_modules/bootstrap-4-grid/scss/grid/bootstrap-grid.scss', './scss/main.scss'])
               .pipe(sourcemaps.init())
               .pipe(gulpSass())
               .pipe(autoprefixer({
                   overrideBrowserslist: ['last 2 versions'],
                   cascade             : false
               }))
               .pipe(concat('styles.css'))
               .pipe(minifyCSS())
               .pipe(sourcemaps.write())
               .on('error', swallowError)
               .pipe(gulp.dest('.'))
               .pipe(browser_sync.stream());
}

// transpile, concatenate and minify scripts
function js() {
    return gulp.src(['./js/src/lib/*.js', './js/src/*.js'])
               .pipe(concat('production.js'))
               .pipe(gulp.dest('./js/build/'))
               .pipe(rename('production.min.js'))
               .pipe(terser())
               .on('error', swallowError)
               .pipe(gulp.dest('./js/build'));
}

// watch files
function watch() {
    gulp.watch(['./scss/*.scss', './scss/*/*.scss'], gulp.series(sass));
    gulp.watch(['./js/src/lib/*.js', './js/src/*.js'], gulp.series(js, browserSyncReload));
    gulp.watch(['./includes/*.php', './includes/**/*.php', './*.php'], gulp.series(browserSyncReload));
}

// tasks
gulp.task('sass', sass);
gulp.task('js', js);

// build
gulp.task('build', gulp.parallel('sass', 'js'));

// watch
gulp.task('watch', gulp.parallel(watch, browserSync));

// run
gulp.task('default', gulp.series('watch', 'build'));