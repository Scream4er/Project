
// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
 
// Подключаем Browsersync
const browserSync = require('browser-sync').create();


 
 
// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'assets/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}
 
 
function styles() {
	return src('assets/**/*.scss')
	.pipe(sass()) 
	.pipe(dest('assets/'))
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}
 
function startwatch() {
 
	
	// Мониторим файлы препроцессора на изменения
	watch('assets/**/*.scss', styles);
}
 
// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
 

// Экспортируем функцию styles() в таск styles
exports.styles = styles;
 
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, browsersync, startwatch);





let project_folder = "dist";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: project_folder + "/*.html",
        css: project_folder + "/scss/style.scss",
        js: project_folder + "/js/script.js",
        img: project_folder + "/img/**/*.{jpg,png,svg,git,webp}",
        fonts: project_folder + "/fonts/*.ttf",
    },
    watch: {
        html: project_folder + "/**/*.html",
        css: project_folder + "/scss/**/*.scss",
        js: project_folder + "/js/**/*.js",
        img: project_folder + "/img/**/*.{jpg,png,svg,git,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();

function browserSync(params) {
    browsersync.init({
        server: { baseDir: './' + project_folder + '/' },
        notify: false, 
        online: true
        })
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

let build = gulp.series(html);
let watch = gulp.parallel(build, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

