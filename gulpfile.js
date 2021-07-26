const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const rename = require('gulp-rename');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const html = () => {
  return gulp.src('source/html/*.html')
  .pipe(gulp.dest('build'))
};

const css = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
};

const js = () => {
  return gulp.src(['source/js/*.js'])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/js'))
};

const syncserver = () => {
  server.init({
    server: 'build/',
    startPath: "/index.html",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/html/**/*.html', gulp.series(html, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', {usePolling: true}, gulp.series(css));
  gulp.watch('source/js/**/*.{js,json}', gulp.series(js, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const copy = () => {
  return gulp.src([
    'source/fonts/**',
    'source/img/**',
  ], {
    base: 'source',
  })
      .pipe(gulp.dest('build'));
};


const clean = () => {
  return del('build');
};

const build = gulp.series(clean, copy, css, js, html);

const start = gulp.series(build, syncserver);


exports.build = build;
exports.html = html;
exports.js = js;
exports.start = start;
