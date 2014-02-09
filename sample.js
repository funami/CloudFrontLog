#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var CloudFrontLog = require('./lib/cloudfront-log.js');

program
  .version('0.0.1')
  .option('-f, --file [file path]', 'Specified file [path]',undefined)
  .parse(process.argv);

if (program.file){
  var cflog = new CloudFrontLog();
  var log = cflog.load(program.file);

} else {
  program.help();
}
