// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var boot = require('../');
var fs = require('fs-extra');
var path = require('path');
var expect = require('chai').expect;
var loadConfig = require('../lib/load-config');
var yaml  = require('js-yaml');

loadConfig.register(['.yaml', '.yml'], yaml.safeLoad);

// add coffee-script to require.extensions
require('coffee-script/register');

var COFFEE_APP = path.join(__dirname, 'fixtures', 'coffee-app-2');

describe('compiler', function() {
  function getModelByName(aModels, aName) {
    for (var i in aModels) {
      var model = aModels[i];
      if (model.name === aName) return model;
    }
  }
  describe('from directory', function() {
    it('loads Model yaml config files', function() {
      var instructions = boot.compile(COFFEE_APP);
      var model = getModelByName(instructions.models, 'Order');
      expect(model).to.be.exist;
      expect(model.sourceFile).to.be.exist;
    });
    it('loads component-config.yaml file', function() {
      var instructions = boot.compile(COFFEE_APP);
      var component = instructions.components[0];
      expect(component).to.eql({
        sourceFile: require.resolve('debug'),
        config: {
          option: 'value',
        },
      });
    });
  });
});

