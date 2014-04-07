module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      compile:
        files:
          'lib/cloud-front-log.js':'lib/cloud-front-log.coffee'
      compile_spec:
        expand: true
        src: ['spec/**/*.coffee']
        ext: '.js'
    coffeelint:
      options:
        max_line_length:
          level: 'ignore'
      src: [ 'lib/**/*.coffee' ]
      spec:[ 'spec/**/*.coffee' ]
    jasmine_node:
      all: ['spec/']


  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-jasmine-node'
  
  grunt.registerTask 'default', [
    'coffeelint:src','coffee:compile',
    'coffeelint:spec','coffee:compile_spec',
    'jasmine_node'
  ]

