module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
    sourceMap: true,
    mangle: false,
    quoteStyle: 3,
    compress: {
      drop_console: true
    }
  },
  app: {
    files: [{
      'scripts/js/app.min.js': [
        'config/app.helpers.js',
        'config/app.config.shared.js',
        'config/app.config.routes.js',
        'config/app.config.interceptors.js',
        'config/app.config.menus.js',
        'app.js', 
        'scripts/js/app.templates.js'
      ]
    }, {
      expand: true,
      cwd: 'components/',
      src: ['{,*/}index.js', '**/*.js'],
      dest: 'scripts/js',
      rename: function (dest, src) {
        var directories = src.split('/');
        return dest + '/' + directories[0] + '.min.js';
      }
    }]
  }
};