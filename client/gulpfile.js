/* gulp dependencies */
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var os = require('os');
var open = require('gulp-open');


/* path def */
var path = {
  HTML: [
  	'src/.htaccess',
  	'src/*.html',
    'src/app/**/*.html',
    'src/app/**/**/*.html',
    'src/app/**/**/**/*.html',
  	'src/favicon.ico'
  ],
  JS_BODY: [
    'src/app/*.js',
    'src/app/**/*.js',
    'src/app/**/**/*.js',
    'src/app/**/**/**/*.js'
  ],
  CSS: [
    'src/assets/lib/*.css',
    'src/assets/lib/**/*.css',
    'src/assets/css/*.css',
    'src/assets/css/**/*.css'
  ],
  SASS: [
    'src/assets/sass/*.scss',
    'src/assets/sass/**/*.scss'
  ],
  SRC: './src'
};

/* Trying to find the default browser as per the operating system */
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));



/**** Tasks for Development server ****/


/* jslint for debugging */
gulp.task('lint', function() {
  return gulp.src(path.JS_BODY)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


/* connect development server as soon as the server is ready*/
gulp.task('connect', ['linker'], function() {
	connect.server({
		root: path.SRC,
		port: 5040
  });
});


/* run development server in default browser*/
gulp.task('open', ['connect'], function() {
  gulp.src(path.SRC + '/index.html')
    .pipe(open({uri: 'http://localhost:5040', app: browser}));
});


/* convert scss to css and then copy all css and js links in index.html */
gulp.task('linker', function(){
  return Promise.all([
    new Promise(function(resolve, reject) {
      gulp.src(path.SASS)
        .pipe(sass.sync().on('error', sass.logError))
        .on('error', reject)
        .pipe(gulp.dest(path.SRC + '/assets/css'))
        .on('end', resolve)
    }) 
  ]).then(function () {
      gulp.src(path.SRC + '/index.html')
        .pipe(inject(gulp.src(path.JS_BODY, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(path.CSS, {read: false}), {relative: true}))
        .pipe(gulp.dest(path.SRC + '/'));
      });    
});


/* default */
gulp.task('default', ['lint','linker','connect','open']);