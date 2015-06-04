"use strict";

var expect = require('chai').expect;
var fs = require('fs');

var bbcms = require("../index");
var bbm = require('blue-button-model');

describe('parser.js', function () {
    it('CMS parser/model validation', function (done) {
        var txtfile = fs.readFileSync(__dirname + '/fixtures/sample.txt', 'utf-8');

        expect(txtfile).to.exist;

        //convert string into JSON
        var result = bbcms.parseText(txtfile);
        expect(result).to.exist;

        var valid = bbm.validator.validateDocumentModel(result);

        if (!valid) {
            console.log("Errors: \n", JSON.stringify(bbm.validator.getLastError(), null, 4));
        }

        expect(valid).to.be.true;

        done();
    });

    it('Extra line breaks before sections', function (done) {
        var txtfile = fs.readFileSync(__dirname + '/fixtures/sample-extra.txt', 'utf-8');

        expect(txtfile).to.exist;

        //convert string into JSON
        var result = bbcms.parseText(txtfile);
        expect(result).to.exist;

        var valid = bbm.validator.validateDocumentModel(result);

        if (!valid) {
            console.log("Errors: \n", JSON.stringify(bbm.validator.getLastError(), null, 4));
        }

        expect(valid).to.be.true;

        done();
    });
});
