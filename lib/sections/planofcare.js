"use strict";

var commonFunctions = require('./commonFunctions');

var processDate = commonFunctions.getFunction('cda_date');

function processPlanOfCareChild(rawChildObj) {
    var childObj = {};
    var dateArray = {};
    for (var key in rawChildObj) {
		
		if (typeof(rawChildObj[key]) === "function") 
			continue;
		
        var value = rawChildObj[key];
        var ignoreValue = commonFunctions.getFunction('ignore');
        if (ignoreValue(value)) {
            continue;
        } else if (key.indexOf('description') >= 0) {
            var processFunction = commonFunctions.getFunction('cda_coded_entry');
            childObj.plan = processFunction(value);
        } else if (key.indexOf('next eligible date') >= 0) {
            dateArray["low"] = processDate(value);
        } else if (key.indexOf('last date of service') >= 0) {
            dateArray["high"] = processDate(value);
        }
    }

    childObj.type = 'medicare';

    if (dateArray !== {}) {
        childObj.date_time = dateArray;
    }
    return childObj;
}

function parsePlanOfCare(intObj) {

    //setup templates for common function
    var result = [];
    for (var key in intObj) {
		
		if (typeof(intObj[key]) === "function") 
			continue;
		
        var obj = processPlanOfCareChild(intObj[key]);
        result.push(obj);
    }

    return result;
}

module.exports = parsePlanOfCare;
