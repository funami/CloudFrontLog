CloudFrontLog
=============

![](https://www.codeship.io/projects/3cb39540-729a-0131-b8ca-2aee5cfc462c/status?branch=master)

convert CloudFrontLogs , short them. 


## install

```
git clone https://github.com/funami/CloudFrontLog
cd CloudFrontLog
npm install
```

## usage

  Usage: conv.js [options]

  Options:

    -h, --help                               output usage information
    -V, --version                            output the version number
    -s, --start [start time YYYYMMDDHHmmSS]  Specified start time  [YYYYMMDDHHmmSS]
    -e, --end [end time YYYYMMDDHHmmSS]      Specified end time  [YYYYMMDDHHmmSS]
    -i, --id [id]                            Specified id  [id]


### prepare 
download cloud flont log files and gunzip 


### take user agent and date time

pick a custom id from url and print short user agent and date time 

```
cat [cloud flont files] | ./conv.js
```

filter it by custome id

```
cat [cloud flont files] | ./conv.js -s 201402010000 -e 201402020000 -i 100
```

### example

you can test it with test data.

```
$ cat spec/testdata/E2WAP9S9SFKN6O.2014-02-07-11.i0vnmDwB |./conv.js 
191     IE_10/Windows_7 2014-02-07      11      20140207110337
33      IE_9/Windows_Vista      2014-02-07      11      20140207110328
54      Mobile_Safari_7/iOS_7   2014-02-07      11      20140207110345

```

```
$ cat spec/testdata/E2WAP9S9SFKN6O.2014-02-07-11.i0vnmDwB |./conv.js -s 20140207110329 -e 20140207110344   
191     IE_10/Windows_7 2014-02-07      11      20140207110337

```

```
$ cat spec/testdata/E2WAP9S9SFKN6O.2014-02-07-11.i0vnmDwB |./conv.js -i 54
54      Mobile_Safari_7/iOS_7   2014-02-07      11      20140207110345
```




