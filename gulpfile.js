var gulp = require('gulp');

//for sass
var sass = require('gulp-sass');

//for babel and browserify
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

function serve(){
	gulp.watch('app/js/*', ['scripts']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
}

var input = 'app/sass/**/*.scss';
var output = 'app/assets/css';

gulp.task('sass', function(){
	return gulp
	    // Find all `.scss` files from the `stylesheets/` folder
	    .src(input)
	    // Run Sass on those files
	    .pipe(sass())

	    .pipe(gulp.dest(output));
});

gulp.task('scripts', function() {
	browserify({ debug: true })
	  .transform(babelify)
	  .require("./app/js/test.js", { entry: true })
	  .bundle()
	  .on("error", function (err) { console.log("Error: " + err.message); })
	  .pipe(fs.createWriteStream("bundle.js"));
});

gulp.task('default', serve);