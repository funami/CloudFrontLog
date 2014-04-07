'use strict'

module.exports = (grunt) ->
  compile:
    files:
      'lib/cloud-front-log.js'        : 'src/cloud-front-log.coffee',
  compile_spec:
    files:
      bare: false
      join: false
    expand: true
    flatten: false
    src: ['spec/**/*.coffee']
    ext: '.js'

