(function() {
  'use strict';
  var CloudFrontLog, md5;

  md5 = require('md5');

  CloudFrontLog = function() {
    var writer;
    writer = null;
    this.filter = {
      "default": function(flds, domain_id) {
        return [domain_id, md5.digest_s("" + flds[4] + "," + flds[7] + "," + flds[10]), flds[0], flds[1], flds[4], flds[7], flds[8], flds[9], flds[10], flds[13]].join("\t");
      }
    };
    this.parse = function(line, filter_name) {
      var domain_id, e, flds, url_path;
      if (!line) {
        return null;
      }
      try {
        flds = line.split("\t");
        if (flds.length !== 18) {
          return null;
        } else {
          url_path = flds[7].split('/');
          if (url_path.length !== 4) {
            return null;
          }
          domain_id = url_path[3].split('.')[0];
          flds[10] = decodeURIComponent(decodeURIComponent(flds[10]));
          if (filter_name !== void 0) {
            return this.filter[filter_name](flds, domain_id);
          } else {
            return flds;
          }
        }
      } catch (_error) {
        e = _error;
        console.log(e);
        return null;
      }
    };
    return this;
  };

  module.exports = CloudFrontLog;

}).call(this);
