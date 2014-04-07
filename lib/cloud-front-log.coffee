'use strict'
md5 = require 'md5'

CloudFrontLog = ->
  writer = null

  @filter =
    default: (flds,domain_id)->

      return [
        domain_id,
        md5.digest_s("#{flds[4]},#{flds[7]},#{flds[10]}")
        flds[0],  #date
        flds[1], #time
        flds[4], #ip
        flds[7], #domain
        flds[8], #status
        flds[9], # referer
        flds[10], #ua
        flds[13], #cache
      ].join("\t")

  @parse = (line,filter_name)->
    return null if !line
    try
      flds = line.split "\t"
      if flds.length != 18
        return null
      else
        url_path = flds[7].split('/')
        if url_path.length != 4
          return null
        domain_id = url_path[3].split('.')[0]
        flds[10] = decodeURIComponent(decodeURIComponent(flds[10]))
        if filter_name != undefined
          return @filter[filter_name](flds,domain_id)
        else
          return flds
    catch e
      console.log(e)
      null
  
  return @
module.exports = CloudFrontLog

