module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      main: {
        options: {
          separator: ';'
        },
        src: ['js/src/main/*.js'],
        dest: 'js/dist/script.main.js'
      },
      menu: {
        options: {
          separator: ';'
        },
        src: ['js/src/menu/*.js'],
        dest: 'js/dist/script.menu.js'
      },
      css: {
        src: ['css/src/*.css'],
        dest: 'css/dist/main.css'
      }
    },
    uglify: {
      main: {
        src: ['js/dist/script.main.js'],
        dest: 'js/dist/script.main.min.js'
      },
      menu: {
        src: ['js/dist/script.menu.js'],
        dest: 'js/dist/script.menu.min.js'
      }
    },
    cssmin: {
      css: {
        src: ['css/dist/main.css'],
        dest: 'css/dist/main.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};
