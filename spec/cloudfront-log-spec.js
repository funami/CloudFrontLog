'use strict'
var CloudFrontLog = require("../lib/cloudfront-log");
var testfile = __dirname+"/testdata/E2WAP9S9SFKN6O.2014-02-07-11.i0vnmDwB";


describe("CloudFrontLog", function () {
  var cf = undefined;
  beforeEach(function() {
    cf = new CloudFrontLog();
    expect(cf.file).toEqual();
  });
  describe("init", function () {
    it("should object created", function () {
      expect(cf).toBeDefined();
    });
  });  
  
  describe("set writer ", function () {
    it("should wrter can be change ", function () {

      // capture console.log
      var oldLog = console.log;
      var consolelog = [];
      console.log = function (message) {
        consolelog.push(message)
      };

      var out = [];
      cf.writer = undefined; // use default writer =  process.stdout.writ
      cf.print('aaa');
      cf.print('bbb');
      expect(out).toEqual([]);
      expect(consolelog).toEqual(["aaa","bbb"]);

      out = [];
      consolelog = [];
      cf.writer = function (str){
        out.push(str)
      };
      cf.print('aaa');
      cf.print('bbb');
      expect(out).toEqual(["aaa","bbb"]);
      expect(consolelog).toEqual([]);

      // reset console.log
      console.log = oldLog;

    });
  });  


  describe("parse", function () {
    it("should line is parsed", function () {
      var test_line = '2014-02-07	11:03:37	NRT54	46456	125.204.230.244	GET	dwkjexg5kaiaa.cloudfront.net	/oo/xx/191.js	200	http://example.com/help/about/?vos=nkeyantp2013060403	Mozilla/5.0%2520(compatible;%2520MSIE%252010.0;%2520Windows%2520NT%25206.1;%2520WOW64;%2520Trident/6.0)	-	-	Hit	-CiiLZ93Rlk2QIUJQSRTSktYkVYB6D70Uy6i_FOdOLyS4Enhds23XA==	dwkjexg5kaiaa.cloudfront.net	http	360';
      var p = cf.parse(test_line);
      expect(p['cs-uri-stem']).toEqual('/oo/xx/191.js');
      expect(p['date']).toEqual('2014-02-07');
      expect(p['hour']).toEqual('11');
      expect(p['dt']).toEqual('20140207110337');
      expect(p['ua']).toEqual('IE_10/Windows_7');
    });

  });

  describe("make line",function () {
    it("should line is parsed", function () {
      var test_line = '2014-02-07	11:03:37	NRT54	46456	125.204.230.244	GET	dwkjexg5kaiaa.cloudfront.net	/oo/xx/191.js	200	http://example.com/help/about/?vos=nkeyantp2013060403	Mozilla/5.0%2520(compatible;%2520MSIE%252010.0;%2520Windows%2520NT%25206.1;%2520WOW64;%2520Trident/6.0)	-	-	Hit	-CiiLZ93Rlk2QIUJQSRTSktYkVYB6D70Uy6i_FOdOLyS4Enhds23XA==	dwkjexg5kaiaa.cloudfront.net	http	360';
      var c = cf.conv(test_line);
      expect(c).toEqual("191\tIE_10/Windows_7\t2014-02-07\t11\t20140207110337");
    });


  });
  describe("load file",function(){
    it("load file and perse each line ", function () {
      var out = [];
      cf.writer = function (str){
        out.push(str)
      };
      cf.load(testfile);
      expect(out).toEqual([
        "191\tIE_10/Windows_7\t2014-02-07\t11\t20140207110337",
        "33\tIE_9/Windows_Vista\t2014-02-07\t11\t20140207110328",
        "54\tMobile_Safari_7/iOS_7\t2014-02-07\t11\t20140207110345"
      ]);
    });
    it("filter by range ", function () {
      var out = [];
      cf.writer = function (str){
        out.push(str)
      };
      cf.start = 20140207110329;
      cf.end = 20140207110344;
      cf.load(testfile);
      expect(out).toEqual([
        "191\tIE_10/Windows_7\t2014-02-07\t11\t20140207110337"
      ]);
    });
    it("filter by id", function () {
      var out = [];
      cf.writer = function (str){
        out.push(str)
      };
      cf.id = 54;
      cf.load(testfile);
      expect(out).toEqual([
        "54\tMobile_Safari_7/iOS_7\t2014-02-07\t11\t20140207110345"
      ]);
    });
  });

});   
