"use strict";

var fs = require('fs');

var bbcms = require("../index");
var bbm = require('@amida-tech/blue-button-model');

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

describe('parser.js', function () {
  it('CMS parser/model validation', function (done) {
    var txtfile = fs.readFileSync(__dirname + '/fixtures/sample.txt', 'utf-8');

    expect(txtfile).toBeDefined();

    //convert string into JSON
    var result = bbcms.parseText(txtfile);
    expect(result).toBeDefined();

    var valid = bbm.validator.validateDocumentModel(result);

    if (!valid) {
      console.log("Errors: \n", JSON.stringify(bbm.validator.getLastError(), null, 4));
    }

    expect(valid).toBe(true);

    done();
  });

  it('Extra line breaks before sections', function (done) {
    var txtfile = fs.readFileSync(__dirname + '/fixtures/sample-extra.txt', 'utf-8');

    expect(txtfile).toBeDefined();

    //convert string into JSON
    var result = bbcms.parseText(txtfile);
    expect(result).toBeDefined();

    var valid = bbm.validator.validateDocumentModel(result);

    if (!valid) {
      console.log("Errors: \n", JSON.stringify(bbm.validator.getLastError(), null, 4));
    }

    expect(valid).toBe(true);

    done();
  });
});
