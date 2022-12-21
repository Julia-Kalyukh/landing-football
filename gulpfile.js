const gulp = require('gulp');
const server = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const svgStore = require('gulp-svgstore');
const del = require('del');

// const { STYLE_LIBS, JS_LIBS } = require('./gulp.config');
const { STYLE_LIBS } = require('./gulp.config');

gulp.task('server', function () {
  server.init({
    server: {
      baseDir: "dist"
    },
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('src/**/*.html', { usePolling: true }, gulp.series('html', refresh));
  gulp.watch('src/css/**/*.{scss,sass}', { usePolling: true }, gulp.series('styles-main'));
  gulp.watch('src/js/**/*.{js,json}', { usePolling: true }, gulp.series('scripts-main', refresh));
  gulp.watch('src/img/**/*.svg', { usePolling: true }, gulp.series('icons', 'html', refresh));
  gulp.watch('src/img/**/*.{png,jpg}', { usePolling: true }, gulp.series('images', 'html', refresh));
  gulp.watch('src/img/video/*.*', { usePolling: true }, gulp.series('video', 'html', refresh));
});

const refresh = (done) => {
  server.reload();
  done();
};

gulp.task('styles-main', function () {
  return gulp.src("src/css/**/*.{scss,sass}")
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task('styles-vendor', function () {
  return gulp.src([...STYLE_LIBS])
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(concat("vendor.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src(["src/html/*.html", "src/html/pages/**/*.html"])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root',
      context: { // глобальные переменные для include
        test: 'text'
      }
    }))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest("dist/"));
});

// Спрайт
gulp.task('sprite', function () {
  return gulp.src('src/img/icons/icons-sprite/**/*.svg')
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('dist/img/icons'));
});

gulp.task('scripts-main', function () {
  return gulp.src(["src/js/**/*.js"])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    // .pipe(concat('script.js'))
    // .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest("dist/js"));
});

// gulp.task('scripts-vendor', function () {
//   return gulp.src([...JS_LIBS])
//     .pipe(uglify())
//     .pipe(concat('vendor.min.js'))
//     .pipe(gulp.dest("dist/js"));
// });

gulp.task('fonts', function () {
  return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function () {
  return gulp.src("src/img/icons/**/*.svg")
    .pipe(gulp.dest("dist/img/icons"));
});

gulp.task('images', function () {
  return gulp.src("src/img/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("dist/img/images"));
});

gulp.task('video', function () {
  return gulp.src("src/img/video/*.*")
    .pipe(gulp.dest("dist/img/video"));
});

gulp.task('copy',
  gulp.series(
    'fonts',
    'images',
    'icons',
    'video'
  )
);

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('default',
  gulp.series(
    'clean',
    'styles-main',
    'styles-vendor',
    'scripts-main',
    // 'scripts-vendor',
    'sprite',
    'copy',
    'html',
    'server'
  )
);

gulp.task('build',
  gulp.series(
    'styles-main',
    'styles-vendor',
    'scripts-main',
    // 'scripts-vendor',
    'sprite',
    'copy',
    'html',
  )
);