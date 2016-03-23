var _ = require('underscore')
var request = require('needle')
var VERSION = '20150306'

var getHeaders = function(access_token, others) {
  return _.extend(others || {}, {
    'Authorization': 'Bearer ' + access_token,
    'Accept': 'application/vnd.wit.' + VERSION
  })
}

var captureTextIntent = function (access_token, text, options, callback) {
  if (!callback) {
    callback = options
    options = undefined
  }

  var query_params = _.extend({'q': text}, options)

  var request_options = {
    format: 'json',
    headers: getHeaders(access_token)
  }

  needle.request('get', 'https://api.wit.ai/message', query_params, request_options, function(err, resp, body) {
    if (response && response.statusCode !== 200) {
      err = "Invalid response received from server: " + response.statusCode
    }

    callback(err, body)
  })
}

module.exports.captureTextIntent = captureTextIntent
