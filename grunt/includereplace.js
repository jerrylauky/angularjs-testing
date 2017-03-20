module.exports = {
  js: {
    options: {
      globals: {
        jsScripts: '<%= filesToHTML(scripts.prod.js, getCurrentUnixTimeStamp())%>'
      }
    },
    src: '<%= scripts.shared.index.original %>',
    dest: './',
    expand: true,
    cwd: './'
  },
  css: {
    options: {
      globals: {
        cssScripts: '<%= filesToHTML(scripts.prod.css, getCurrentUnixTimeStamp())%>'
      }
    },
    src: '<%= scripts.shared.index.original %>',
    dest: './',
    expand: true,
    cwd: './'
  }
};