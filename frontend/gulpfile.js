// Gulp
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect'),
    deepExtend = require('deep-extend-stream'),
    gutil      = require('gulp-util'),
    jshint     = require('gulp-jshint'),
    jshint_styles = require('jshint-stylish'),
    less       = require('gulp-less'),
    plumber    = require('gulp-plumber'),
    pug        = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    yamlData   = require('vinyl-yaml-data');


/* Rutas de los dev-assets */
var source = {
    data:    "dev-assets/data/data.yaml",
    pug:     "dev-assets/pug/*.pug",
    js:      "dev-assets/js/main.js",
    plugins: "dev-assets/js/plugins/*.js",
    less:    "dev-assets/less/main.less",
    images:  "dev-assets/images"
};

/* Rutas de los compilados */
var outputDir = {
    templates: "public",
    js:        "public/assets/js",
    vendor:    "public/assets/js/vendor",
    css:       "public/assets/css",
    images:    "public/assets/images"
};


/* Emitidor de errores en consola */
function onError(error) {
    gutil.log(error);
    this.emit('end');
}


/* Obtener data desde YAML */
var locals = {};
gulp.task('data', function () {
    return gulp.src( source.data )
        .pipe( yamlData() )
        .pipe( deepExtend(locals) )
        .pipe( connect.reload() );
});


/* Transpilar Pug a HTML */
gulp.task('templates', function () {
    return gulp.src( source.pug )
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug({
            data: locals,
            pretty: true
        }))
        .pipe( gulp.dest(outputDir.templates) )
        .pipe( connect.reload() );
});


/* Concatenar y ofuscar los plugins JS */
gulp.task('vendor', function() {
    return gulp.src( source.plugins )
        .pipe( concat('vendor_all.js') )
        .pipe( uglify() )
        .pipe( gulp.dest(outputDir.vendor) )
        .pipe( connect.reload() );
});


/* Procesar las depedencias del main.js */
gulp.task('javascript', function () {
    return gulp.src( source.js )
        .pipe(plumber({
            errorHandler: onError
        }))
        //.pipe( sourcemaps.init() )
        .pipe( uglify() )
        //.pipe( sourcemaps.write() )
        .pipe( gulp.dest(outputDir.js) )
        .pipe( connect.reload() );
});


/* Verificar codigo de JS */
gulp.task('lint', function () {
    return gulp.src( source.js )
        .pipe( jshint() )
        .pipe( jshint.reporter( jshint_styles ));
});


/* Transpilar Less a CSS */
gulp.task('less', function () {
    return gulp.src( source.less )
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            compress: false
        }))
        .pipe( gulp.dest(outputDir.css) )
        .pipe( connect.reload() );
});


/* Observadores de cambios */
gulp.task('watch', function () {
    gulp.watch('dev-assets/data/**/*.yaml', ['data', 'templates']);
    gulp.watch('dev-assets/pug/**/*.pug', ['templates']);
    gulp.watch('dev-assets/js/plugins/*.js', ['vendor']);
    gulp.watch('dev-assets/js/**/*.js', ['javascript', 'lint']);
    gulp.watch('dev-assets/less/**/*.less', ['less']);
});


/* Servidor Local: localhost:7070 */
gulp.task('connect-server', function () {
    connect.server({
        root: outputDir.templates,
        port: 7070, //process.env.PORT,
        livereload: true
    });
});

/* Servidor Local: localhost:7070 */
gulp.task('connect-server-prod', function () {
    connect.server({
        root: outputDir.templates,
    });
});

var taskDeploy = [
    'data',
    'templates',
    'vendor',
    'javascript',
    'less'
];

var taskDefault = [
    'data',
    'templates',
    'vendor',
    'javascript',
    'less',
    'watch',
    'connect-server'
];


gulp.task('deploy', taskDeploy);

gulp.task('default', taskDefault);