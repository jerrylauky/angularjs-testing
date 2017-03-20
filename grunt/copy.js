module.exports = {
  app: {
    files: [{
      expand: true,
      src: [
        // app files
        'assets/{images,css}/**',
        'scripts/**',
        'locale/**',
        'index.html',
        'app.js',

        // excluding backups, generated files, test files, config files
        '!{assets/css,scripts}/**/*.{bak,map.gzip,md,yml,log}',
        '!{assets/css,scripts}/**/{bower,package,composer}.json',
      ],
      dest: 'dist/'
    }]
  },
  make: {
    files: [{
        expand: true,
        src: './<%= scripts.shared.index.original %>',
        dest: '.',
        rename: function (dest, src) {
          return src + '.bak';
        }
      },
      {
        expand: true,
        src: './<%= scripts.shared.index.placeholder %>',
        dest: '.',
        rename: function (dest, src) {
          return dest + '/<%= scripts.shared.index.original %>';
        }
      }
    ]
  },
  undo: {
    files: [{
      expand: true,
      src: './<%= scripts.shared.index.original %>.bak',
      dest: '.',
      rename: function (dest, src) {
        return dest + '/<%= scripts.shared.index.original %>';
      }
    }]
  }
};