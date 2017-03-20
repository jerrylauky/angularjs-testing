module.exports = function (grunt, options) {
  return {
    options: {
      stripBanners: {
        block: true
      },
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      separator: ';\n'
    },

    app: {
      files: [{
        'scripts/js/core.min.js': [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap.min.js'
        ],

        'scripts/js/plugins.min.js': [
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-translate/angular-translate.min.js',
          'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
          'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
          'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
          'bower_components/angular-cache/dist/angular-cache.min.js',
          'bower_components/angular-cookies/angular-cookies.min.js',
        ],

        'scripts/css/core.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css']
      }]
    }
  };
};