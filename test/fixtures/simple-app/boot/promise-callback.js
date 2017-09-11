// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var Promise = require('bluebird');

module.exports = function(app, callback) {
  callback();
  if (process.promiseAndCallback) {
    return Promise.reject();
  }
};
