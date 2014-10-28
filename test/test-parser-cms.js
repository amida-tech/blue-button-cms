var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');

var bbcms = require("../index");
var bbm = require('blue-button-model');

describe('parser.js', function () {
    var txtfile = null;

    before(function (done) {
        var filepath = path.join(__dirname, 'fixtures/sample.txt');
        txtfile = fs.readFileSync(filepath, 'utf-8').toString();
        done();
    });

    it('CMS parser/model validation', function (done) {
        expect(txtfile).to.exist;

        //convert string into JSON 
        var result = bbcms.parseText(txtfile);
        expect(result).to.exist;

        //console.log(JSON.stringify(result.data.providers, null, 10));

        val = bbm.validator.validateDocumentModel(result);

        var err = bbm.validator.getLastError();

        //if validation failed print all validation errors and summary by category of error
        if (!err.valid) {

            var _ = require("underscore");

            function count(numbers) {
                return _.reduce(numbers, function (result, current) {
                    return result + 1;
                }, 0);
            }
            var result = _.chain(err.errors)
                .groupBy("code")
                .map(function (value, key) {
                    return {
                        code: key,
                        count: count(_.pluck(value, "code"))
                    }
                })
                .value();

            console.log("Errors: \n", JSON.stringify(bb.validator.getLastError(), null, 4));
            console.log("Errors summary: \n ", JSON.stringify(result, null, 4));
        }

        expect(err.valid).to.equal(true);

        done();
    });

});
