#!/usr/bin/env node
var CloudFrontLog = require('./lib/cloudfront-log.js');
var cflog = new CloudFrontLog();
var program = require('commander');
program
  .version('0.0.1')
  .option('-s, --start [start time YYYYMMDDHHmmSS]', 'Specified start time  [YYYYMMDDHHmmSS]',undefined)
  .option('-e, --end [end time YYYYMMDDHHmmSS]', 'Specified end time  [YYYYMMDDHHmmSS]',undefined)
  .option('-i, --id [id]', 'Specified id  [id]',undefined)
  .parse(process.argv);

cflog.start = program.start;
cflog.end = program.end;
cflog.id = program.id;

process.stdin.resume();
process.stdin.setEncoding('utf8');
// 標準入力がくると発生するイベント
process.stdin.on('data', function (chunk) {
  chunk.trim().split('\n').forEach(function(line) {
    // 1行ずつ表示
    var out = cflog.conv(line);
    if (out){
      console.log(out);
    }
  });
});
// EOFがくると発生するイベント
process.stdin.on('end', function () {
});

