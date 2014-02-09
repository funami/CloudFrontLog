'use strict'
var useragent = require('useragent');
var fs = require('fs');
var CloudFrontLog = function () {
  var writer = undefined;

  this.parse = function (line) {
    var res = line.split("\t");
    if (line === ''){
      return ;
    }
    try{
      var ret = {};
      ret['cs-uri-stem'] = res[7];
      ret['date'] = res[0];
      if (res[1]){ 
        var hms = res[1].split(":"); 
        ret['hour'] = hms[0];
        ret['dt'] = res[0].split("-").join('') + hms.join('');;
      }
      var agent = useragent.lookup(decodeURIComponent(decodeURIComponent(res[10])));
      ret['ua'] = agent.toString();
      var myid = undefined;
      if (res[7]){
        var uri = res[7].split(/\//);
        if (uri.length == 4){ 
          myid = uri[3].split(/\./)[0];
        }
      }
      if (myid){
        ret['myid'] = myid;
        return ret;
      } else {
        return ;
      }
    }catch(err){
      //console.log(err,res[10]);

    }

  };
  
  this.load = function (file) {
      var str = fs.readFileSync(file).toString();
      var lines = str.split("\n");
      var re = /^#/;
      var self = this;
      lines.forEach(function(line){
        if (line.search(re) < 0){
          var out = self.conv(line);
          if (out){
            self.print(out);
          }
        }
      });
  };

  this.conv = function (line){
    var out = this.parse(line);
    if (out){
      return [out['myid'],out['ua'],out['date'],out['hour'],out['dt']].join("\t");
    } else {
      return undefined;
    }
  }

  this.print = function (d) {
    if (this.writer){
      this.writer(d);
    } else {
      console.log(d);
    }
  };
};
module.exports = CloudFrontLog;
