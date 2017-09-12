const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const notifier = require('node-notifier');
const gulpif = require('gulp-if');

let build = false;
const date = new Date();
const _getDate = () => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}__${date.getHours()}-${date.getMinutes()}`;

function handleError(error) {
    notifier.notify('⚠️ Error.');
    console.log(error.toString());
    if (!build) this.emit('end');
}

gulp.task('is-build', () => build = true);

gulp.task('assets', () => 
    gulp.src('./src/assets/**/*').pipe(gulp.dest('./dist/assets/'))
);

gulp.task('html', () => gulp.src('./src/popup/popup.html').pipe(gulp.dest('./dist/popup/')));

gulp.task('manifest', () => gulp.src('./src/manifest.json').pipe(gulp.dest('./dist/')));

gulp.task('js-lint', () => 
    gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()).on('error', handleError)
);

gulp.task('sass-lint', () =>
    gulp.src('./src/popup/scss/**/*.scss')
        .pipe(sassLint({ configFile: './sass-lint.yml' }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError()).on('error', handleError)
);

gulp.task('sass', () =>
    gulp.src('./src/popup/scss/popup.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/popup/'))
);

gulp.task('bundle-background', () => 
    browserify({
        entries: './src/background/background.js',
        debug: false,
    })
    .transform(babelify)
    .bundle().on('error', handleError)
    .pipe(source('background.js'))
    .pipe(buffer())
    .pipe(gulpif(build, uglify()))
    .pipe(gulp.dest('./dist/background/'))
);

gulp.task('bundle-content', () =>
    browserify({
        entries: './src/content/content.js',
        debug: false,
    })
    .transform(babelify)
    .bundle().on('error', handleError)
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulpif(build, uglify()))
    .pipe(gulp.dest('./dist/content/'))
);

gulp.task('bundle-popup', () =>
    browserify({
        entries: './src/popup/popup.js',
        debug: false,
    })
    .transform(babelify)
    .bundle().on('error', handleError)
    .pipe(source('popup.js'))
    .pipe(buffer())
    .pipe(gulpif(build, uglify()))
    .pipe(gulp.dest('./dist/popup/'))
);

gulp.task('bundle-all', ['bundle-background', 'bundle-content', 'bundle-popup']);

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['bundle-all']);
    gulp.watch('./src/popup/scss/**/*.scss', ['sass']);
    gulp.watch('./src/popup/popup.html', ['html']);
    gulp.watch('./src/manifest.json', ['manifest']);
});

gulp.task('zip', () => 
    gulp.src('./dist/**/*')
        .pipe(zip(`${_getDate()}.zip`))
        .pipe(gulp.dest('./zip/'))
);

gulp.task('empty-dist', () =>
    gulp.src('./dist/', {read: false}).pipe(clean())
);

gulp.task('build', gulpSequence(
    'is-build',
    ['js-lint', 'sass-lint'],
    'empty-dist',
    ['bundle-all', 'sass', 'html', 'assets', 'manifest'],
    'zip')
);
