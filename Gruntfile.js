module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['public/css/source/**'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files:[{
          expand: true,
          cwd: 'public/css/source',
          src: ['*.scss'],
          dest: 'public/css/generated',
          ext: '.css'
        }] 
      }
    },
    concat:{
      css:{
        src:["public/css/vendor/foundation.min.css","public/css/generates/main.css"],
        dest: "generated/css/main.min.css"
      },
      js:{
        src:["public/js/**/*.js"],
        dest: "generated/js/vendor.concat.js"
      }
    },
    uglify: {
      package: {
        files: {
          'generated/js/package.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    clean: {
      build: ['generated/'],
      concat: ['<%= concat.js.dest %>']
    }
  });

  
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean:build', 'sass', 'concat:css', 'concat:js', 'uglify:package', 'clean:concat']);

};