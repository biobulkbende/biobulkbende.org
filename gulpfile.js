const gulp = require("gulp");
const { src, dest, series, parallel } = require("gulp");
const autoprefixer = require("autoprefixer"),
  postcss = require("gulp-postcss"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  del = require("del"),
  webpack = require("webpack-stream"),
  webpackConfig = require("./webpack.config.js"),
  modernizr = require("gulp-modernizr"),
  svgSprite = require("gulp-svg-sprite"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create();

// JS TASKS
function cleanScripts() {
  return del("./app/temp/scripts/App.js");
}

function modernizrTask() {
  return src(["./app/assets/scss/**/*.scss", "./app/assets/js/**/*.js"])
    .pipe(
      modernizr({
        options: ["setClasses"],
      })
    )
    .pipe(dest("./app/assets/temp"));
}

function scriptsTask() {
  return (
    src("./app/assets/js/App.js")
      .pipe(
        webpack(webpackConfig, null, function (err, stats) {
          if (err) {
            console.log(err);
          }
        })
      )
      // .on('error', function (err) { if(err){ console.log(err.message);} })
      .pipe(dest("./app/bundle/scripts")) // copy JS in bundle
      .pipe(browserSync.stream())
  );
}

function endCleanModernizr() {
  return del(["./app/assets/temp"]);
}

// SCSS TASKS
function scssTask() {
  return src("./app/assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./app/bundle/styles")) // copy CSS in bundle
    .pipe(browserSync.stream());
}

// ICONS TASK
var config = {
  mode: {
    css: {
      sprite: "sprite.svg",
      render: {
        css: {
          template: "./gulp/templates/sprite.css",
        },
      },
    },
  },
};

function beginClean() {
  return del(["./app/temp/sprite", "-/app/assets/media/images/sprites"]);
}

function createSprite() {
  return src("./app/assets/media/images/icons/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(dest("./app/temp/sprite/"));
}

function copySpriteGraphic() {
  return src("./app/temp/sprite/css/**/*.svg").pipe(
    dest("./app/bundle/media/images/sprites") // copy sprites in bundle
  );
}

function copySpriteCSS() {
  return src("./app/temp/sprite/css/*.css")
    .pipe(rename("_sprite.scss"))
    .pipe(dest("./app/assets/scss/modules"));
}

function endClean() {
  return del("./app/temp/sprite");
}

// WATCH TASK
const watch = function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./app",
    },
  });
  gulp
    .watch(
      "./app/assets/scss/**/*.scss",
      { usePolling: true },
      gulp.series(scssTask)
    )
    .on("change", browserSync.reload);
  gulp.watch(
    "./app/assets/js/**/*.js",
    { usePolling: true },
    gulp.series(cleanScripts, modernizrTask, scriptsTask, endCleanModernizr)
  );
  // gulp.watch("./app/assets/images", {usePolling : true}, gulp.series(imagesTask));
  gulp.watch("./app/*.html").on("change", browserSync.reload);
};

// IMAGE TASK
function imagesTask() {
  return src([
    "./app/assets/media/images/**/*",
    "./app/temp/media/images/**/*",
    "!./app/assets/media/images/icons",
    "!./app/assets/media/images/icons/**/*",
  ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(dest("./app/bundle/media/images"));
}

// FONT TASK
function copyFonts() {
  return src("./app/assets/media/fonts/**/*")
    .pipe(dest("./app/bundle/media/fonts"));
}

exports.watch = watch;
exports.images = imagesTask;
exports.icons = series(
  beginClean,
  createSprite,
  copySpriteGraphic,
  copySpriteCSS,
  endClean
);


exports.copyMediaInBundle = series(
  copySpriteGraphic,
  copyFonts,
  imagesTask
);
