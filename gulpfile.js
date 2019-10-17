var gulp=require('gulp'),
	connectPhp=require('gulp-connect-php'),
	htmlmin=require('gulp-htmlmin'),
	browserSync=require('browser-sync').create();

gulp.task('html',function(){
	return gulp.src('develop/*html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('product/'))
		.pipe(browserSync.reload({stream:true}))
})
gulp.task('php',function(){
	return gulp.src('develop/*php')
		.pipe(gulp.dest('product'))
		.pipe(browserSync.reload({stream:true}))
})

gulp.task('server',function(){
	var options={
		base:'./product',
		bin:'E:/wamp/bin/php/php5.5.12/php.exe',//自己php.exe的地址
		ini:'E:/wamp/bin/php/php5.5.12/php.ini',
		port:6666
	}
	return connectPhp.server(options)
})
gulp.task('browser-sync',function(){
	var options={
		proxy:'127.0.0.1:6666',
		port:3000,
		watch:true,
		startPath:'test.html',
		open:true
	};
	return browserSync.init(options);
})
gulp.task('watch',function(){
	gulp.watch('develop/*html',gulp.series('html'));
	gulp.watch('develop/*php',gulp.series('php'));
})
gulp.task('default',gulp.series('html','php',gulp.parallel('server','browser-sync','watch')));
