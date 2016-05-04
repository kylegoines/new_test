var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

function serve(){
	gulp.watch('app/js/*', ['scripts']);
}



gulp.task('scripts', function() {
	browserify({ debug: true })
	  .transform(babelify)
	  .require("./app/js/test.js", { entry: true })
	  .bundle()
	  .on("error", function (err) { console.log("Error: " + err.message); })
	  .pipe(fs.createWriteStream("bundle.js"));

});

gulp.task('default', serve);