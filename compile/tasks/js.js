var browserify = require('browserify'),
			Q = require('q'),
			rename = require('gulp-rename'),
			source = require('vinyl-source-stream'),
			gulp = require('gulp'),
			es = require('event-stream'),
			html = require('html-browserify'),
			uglify = require('uglify-js');
      
module.exports = function js(){
	Q()
		.then(function(){
      console.log('launch js');
			var defer = Q.defer(),
					b = browserify({
            transform: html
          });
			b
        // .plugin('browserify-bower')
				.add('front/src/js/app.js')
				.bundle()
				.pipe(source('script.js'))
				// .pipe(uglify.minify())
				.pipe(gulp.dest('./front/assets/js/'))
				.pipe(es.map(function(){
					console.log('ok js');
				}));
			return defer.promise;
		});

};
