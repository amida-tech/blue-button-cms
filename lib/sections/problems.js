"use strict";

var commonFunctions = require('./commonFunctions');

function processProblemChild(rawChildObj) {
    var childObj = {};
    var dateArray = {};
    for (var key in rawChildObj) {
        var value = rawChildObj[key];
        var ignoreValue = commonFunctions.getFunction('ignore');
        var processDate;
        if (ignoreValue(value)) {
            continue;
        } else if (key.indexOf('name') >= 0) {
            var processFunction = commonFunctions.getFunction('cda_coded_entry');
            var pr = childObj.problem = {};
            pr.code = processFunction(value);
        } else if (key.indexOf('start date') >= 0) {
            processDate = commonFunctions.getFunction('cda_date');
            dateArray["low"] = processDate(value);
        } else if (key.indexOf('end date') >= 0) {
            processDate = commonFunctions.getFunction('cda_date');
            dateArray["high"] = processDate(value);
        }
    }

    if (dateArray !== {}) {
        childObj.date_time = dateArray;
    }

    // Just commenting out not to change functionality, '==' should probably be '='
    //if (childObj.status === undefined) {
    //    childObj.status == 'resolved';
    //}

    return childObj;
}

function parseProblems(intObj) {

    //setup templates for common function
    var result = [];
    for (var key in intObj) {
        var obj = processProblemChild(intObj[key]);
        result.push(obj);
    }

    return result;
}

module.exports = parseProblems;
