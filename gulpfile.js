const { watch, series, parallel, src, dest } = require('gulp');
const pump = require('pump');
const beeper = require('beeper');
var gulp = require('gulp');

var less = require('gulp-less');
const zip = require('gulp-zip');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
/* postcss utitlies */
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-mod-function');
const cssnano = require('cssnano');
const easyimport = require('postcss-easy-import');
const atImport = require("postcss-import");

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//import image from 'gulp-image';

const handleError = (done) => {
    return function (err) {
        if (err) {
            console.log(err);
            beeper();
        }
        return done(err);
    };
};

function css(done){
  pump([src('./assets/css/*.css', {sourcemaps: true})
    ,concat('style.css')
    ,postcss([
        atImport,
        easyimport,
        colorFunction(),
        autoprefixer(),
        cssnano()
    ])
    ,dest('./assets/built/')
  ], handleError(done));
}

function js(done){
  pump([src(['./assets/js/lib/*.js','./assets/js/*.js'], {sourcemaps: true}),
    concat('script.js'),
    uglify(),
    dest('./assets/built/')], handleError(done));
}

function images(done){
  pump([src('src/images/*'),
    ,image()
		,dest('assets/built/images/')], handleError(done));
  done();
}

/* watching less files for changes */
function watchless(done){
  watch('./assets/css/*.less', series(less1));
  done();
};

/* watching less files for changes */
function watchjs(done){
  watch('./assets/js/*.js', series(js));
  done();
};

/* reload browser in case of any changes */
function serve(done){
    browserSync.init({
      proxy: "http://localhost:2368"
    });
    watch("./assets/css/*.less").on("change", reload);
    watch("./assets/built/*.css").on("change", reload);
    watch("./assets/built/*.js").on("change", reload);
    watch("./partials/*.hbs").on("change", reload);
    watch("*.hbs").on("change", reload);
  done();
}

function zipper(done){
  const filename = require('./package.json').name + '.zip';
  src([
      '**',
      '!node_modules', '!node_modules/**',
      '!dist', '!dist/**',
      '!yarn-error.log',
      '!yarn.lock',
      '!gulpfile.js',
      '!assets/css/*.less',
      '!assets/plugins/**'
  ])
  .pipe(zip(filename))
  .pipe(dest('dist/'))
  done();
}

function less1(done){
  pump([src('./assets/css/index.less','./assets/css/index1.less')
    ,less()
    ,postcss([
        easyimport(),
        colorFunction(),
        autoprefixer(),
        cssnano()
    ]),
    ,dest('./assets/built/')
  ], handleError(done));
}

const build = series(less1, js);
/* Initialize tasks */

exports.build = build;
exports.zip = series(build,zipper);
exports.default = series(build,watchless, watchjs, serve);
