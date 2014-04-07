#!/usr/bin/env node

var CloudFrontLog = require('./lib/cloud-front-log.js');

var cflog = new CloudFrontLog();

process.stdin.resume();
process.stdin.setEncoding('utf8');
// 標準入力がくると発生するイベント
process.stdin.on('data', function (chunk) {
  chunk.trim().split('\n').forEach(function(line) {
    // 1行ずつ表示
    var out = cflog.parse(line,'default');
    if (out){
      console.log(out);
    }
  });
});
// EOFがくると発生するイベント
process.stdin.on('end', function () {
});
