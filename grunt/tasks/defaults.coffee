module.exports = (grunt) ->
  # Default task.
  grunt.registerTask 'dev',     [
    'coffee'
  ]
  grunt.registerTask 'test',    ['dev']
  grunt.registerTask 'default', ['test', 'clean']

