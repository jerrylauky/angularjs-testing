module.exports = function (grunt, options) {
  return {
    options: {
      livereload: options.LIVERELOAD_PORT
    },

    sass: {
      files: ['assets/**/*.scss'],
      tasks: ['sass']
    },
    app: {
      files: ['grunt/**/*.js', 'config/**/*.js', 'app/**/*.{js,html}', 'components/**/*.{js, html}', 'index.html', 'assets/scss/**/*.scss'],
      tasks: ['sass']
    }
  };
};