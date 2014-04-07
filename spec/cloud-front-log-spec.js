(function() {
  'use strict';
  var CloudFrontLog;

  CloudFrontLog = require("../lib/cloud-front-log");

  describe("CloudFrontLog", function() {
    var cf;
    cf = null;
    beforeEach(function() {
      cf = new CloudFrontLog();
      return expect(cf.file).toEqual(null);
    });
    describe("init", function() {
      return it("should object created", function() {
        return expect(cf).toBeDefined();
      });
    });
    return describe("parse", function() {
      var test_line;
      test_line = '2014-02-07	11:03:37	NRT54	46456	125.204.230.244	GET	dwkjexg5kaiaa.cloudfront.net	/oo/xx/191.js	200	http://example.com/help/about/?vos=2013060403	Mozilla/5.0%2520(compatible;%2520MSIE%252010.0;%2520Windows%2520NT%25206.1;%2520WOW64;%2520Trident/6.0)	-	-	Hit	-CiiLZ93Rlk2QIUJQSRTSktYkVYB6D70Uy6i_FOdOLyS4Enhds23XA==	dwkjexg5kaiaa.cloudfront.net	http	360';
      it("should line is parsed", function() {
        var flds;
        flds = cf.parse(test_line);
        return expect(flds).toEqual(['2014-02-07', '11:03:37', 'NRT54', '46456', '125.204.230.244', 'GET', 'dwkjexg5kaiaa.cloudfront.net', '/oo/xx/191.js', '200', 'http://example.com/help/about/?vos=2013060403', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)', '-', '-', 'Hit', '-CiiLZ93Rlk2QIUJQSRTSktYkVYB6D70Uy6i_FOdOLyS4Enhds23XA==', 'dwkjexg5kaiaa.cloudfront.net', 'http', '360']);
      });
      it("should null line return null", function() {
        return expect(cf.parse(null)).toEqual(null);
      });
      it("should format broken line return null", function() {
        return expect(cf.parse('2014-02-07	11:03:37	NRT54	46456')).toEqual(null);
      });
      it("should filter modify datas", function() {
        var ret;
        ret = cf.parse(test_line, 'default');
        return expect(ret).toEqual(['191', '32439674626ff7336e0109f282183ea4', '2014-02-07', '11:03:37', '125.204.230.244', '/oo/xx/191.js', '200', 'http://example.com/help/about/?vos=2013060403', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)', 'Hit'].join("\t"));
      });
      return it("should just assets is not parsed", function() {
        var flds, test_ng_line;
        test_ng_line = '2014-02-07	11:03:37	NRT54	46456	125.204.230.244	GET	dwkjexg5kaiaa.cloudfront.net	/planbcd_post_sources/000/001/802/original/registration_active.png	200	http://example.com/help/about/?vos=2013060403	Mozilla/5.0%2520(compatible;%2520MSIE%252010.0;%2520Windows%2520NT%25206.1;%2520WOW64;%2520Trident/6.0)	-	-	Hit	-CiiLZ93Rlk2QIUJQSRTSktYkVYB6D70Uy6i_FOdOLyS4Enhds23XA==	dwkjexg5kaiaa.cloudfront.net	http	360';
        flds = cf.parse(test_ng_line);
        return expect(flds).toEqual(null);
      });
    });
  });

}).call(this);
