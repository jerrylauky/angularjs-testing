module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
    shorthandCompacting: false,
    roundingPrecision: -1,
    rebase: true,
    rebaseTo: './scripts/css'
  },
  target: {
    files: {
      'scripts/css/style.min.css': ['assets/css/style.css']
    }
  }
};