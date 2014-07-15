'use strict';

var PORT = 8080,
    PATHS = {
        source: './src/',

        media: 'media/',
        scripts: 'scripts/',
        styles: 'styles/'
    };

var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: PATHS.source,
        host: '127.0.0.1',
        port: PORT,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(PATHS.source + 'index.html');
    gulp.watch(PATHS.source + PATHS.styles + '**/*.css');
    gulp.watch(PATHS.source + PATHS.scripts + '**/*.js');
    gulp.watch(PATHS.source + PATHS.media + '**/*');

    gulp.watch([
        PATHS.source + 'index.html',
        PATHS.source + PATHS.styles + '**/*.css',
        PATHS.source + PATHS.scripts + '**/*.js',
        PATHS.source + PATHS.media + '**/*'
    ], function() {
        gulp.src(PATHS.source + 'index.html')
            .pipe(connect.reload());
    });
});

gulp.task('default', ['connect', 'watch']);
