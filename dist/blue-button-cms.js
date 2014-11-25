require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
//converts CMS Object to the BB.js

var txtToIntObj = require('./cmsTxtToIntObj');
var sectionRouter = require('./sectionRouter').sectionRouter;
var documentKeyMapper = {
    "meta": "meta",
    "demographic": "demographics",
    "self reported medical conditions": "problems",
    "self reported allergies": "allergies",
    "self reported labs and tests": "results",
    "drugs": "medications",
    "self reported immunizations": "immunizations",
    "self reported vital statistics": "vitals",
    "plans": "payers",
    "employer subsidy": "payers",
    "primary insurance": "payers",
    "other insurance": "payers",
    "preventive services": "plan_of_care",
    "claim summary": "claims",
    "providers": "providers"
};
var bbDocumentModel = {
    "data": {
        "demographics": {},
        "vitals": [],
        "results": [],
        "medications": [],
        "encounters": [],
        "allergies": [],
        "immunizations": [],
        "socialHistory": [],
        "problems": [],
        "procedures": [],
        "payers": [],
        "claims": [],
        "plan_of_care": [],
        "providers": []
    },
    "meta": {
        "type": "cms",
        "version": ""
    },
    "errors": []
};

// Intermediate JSON is the initially converted JSON model from raw data, convert model based on
//

function cleanUpModel(bbDocumentModel) {
    var x;
    for (x in bbDocumentModel) {
        if (Object.keys(bbDocumentModel[x]).length === 0) {
            delete bbDocumentModel[x];
        }
    }
    var data = bbDocumentModel.data;
    for (x in data) {
        if (Object.keys(data[x]).length === 0) {
            delete data[x];
        }

    }
}

function putDataInBBModel(key, parsedSection, bbDocumentModel) {
    key = key.toLowerCase();
    if (key in documentKeyMapper) {
        key = documentKeyMapper[key];
    }
    if (key in bbDocumentModel) {
        if (bbDocumentModel[key] instanceof Array) {
            if (parsedSection instanceof Array) {
                for (var x in parsedSection) {
                    bbDocumentModel[key].push(parsedSection[x]);
                }
            } else {
                bbDocumentModel[key].push(parsedSection);
            }
        } else if (typeof bbDocumentModel[key] === 'object') {
            if (parsedSection instanceof Array) {
                for (var y in parsedSection) {
                    bbDocumentModel[key] = parsedSection[y];
                }
            }
        }
    } else if ('data' in bbDocumentModel) {
        putDataInBBModel(key, parsedSection, bbDocumentModel.data);
    }
    return bbDocumentModel;
}

function convertToBBModel(intermediateObj) {

    //load up the entire document model
    bbDocumentModel = {
        "data": {
            "demographics": {},
            "vitals": [],
            "results": [],
            "medications": [],
            "encounters": [],
            "allergies": [],
            "immunizations": [],
            "socialHistory": [],
            "problems": [],
            "procedures": [],
            "payers": [],
            "claims": [],
            "plan_of_care": [],
            "providers": []
        },
        "meta": {
            "type": "cms",
            "version": ""
        },
        "errors": []
    };
    // **need to have a function that maps each section of the cms to each section
    // of the bb model
    //first round of processing, by section
    for (var key in intermediateObj) {
        var sectionProcessFunction = sectionRouter(key);
        if (sectionProcessFunction) {
            var section = intermediateObj[key].data;
            var returnedObj = sectionProcessFunction(section, key);
            var parsedSection = returnedObj;
            putDataInBBModel(key, parsedSection, bbDocumentModel);
        }
    }

    /*might want to do some alerting to see which section to process again, based
  on what kind of information there is left. For instance, allergies has
  treatments and one of them has a drug in it. */

    //for now, just process the allergy section.

    //var allergiesSection = intermediateObj['self reported allergies'].data;
    //var allergiesRerunKey = 'drugs';
    //var complexProcessFunction = sectionRouter(allergiesRerunKey);
    //var newSection = complexProcessFunction(allergiesSection);
    //putDataInBBModel(allergiesRerunKey, newSection, bbDocumentModel);
    cleanUpModel(bbDocumentModel);
    //console.log(bbDocumentModel);
    return bbDocumentModel;
}

module.exports.convertToBBModel = convertToBBModel;

},{"./cmsTxtToIntObj":2,"./sectionRouter":4}],2:[function(require,module,exports){
"use strict";
//Byung Joo Shin, Amida Tech

/*remove a list of unwanted characters from a given string, globally(as in
  not only the ends */

function removeUnwantedCharacters(cleanedString, unwantedCharArray) {
    for (var x in unwantedCharArray) {
        var unwantedCharRegExp = new RegExp(unwantedCharArray[x], 'g');
        cleanedString = cleanedString.replace(unwantedCharRegExp, '');
    }
    return cleanedString;
}

/*cleans up keys and values from the beginning and end of the string */

function trimStringEnds(keyValueString, unwantedCharArray) {
    var unwantedBegCharIndex = 0;
    var unwantedEndCharIndex = keyValueString.length - 1;
    var charIsUnwanted;
    var keepGoing = true; //keep traversing the string
    //starting from the beginning of the string
    while (keepGoing) {
        charIsUnwanted = false;
        for (var x = 0; x < unwantedCharArray.length; x++) {
            if (keyValueString.charAt(unwantedBegCharIndex) === unwantedCharArray[x]) {
                charIsUnwanted = true;
            }
        }
        if (!charIsUnwanted) {
            keepGoing = false;
        } else {
            unwantedBegCharIndex++;
        }
    }
    //now start at the end
    keepGoing = true;
    while (keepGoing) {
        charIsUnwanted = false;
        for (var y = 0; y < unwantedCharArray.length; y++) {
            if (keyValueString.charAt(unwantedEndCharIndex) === unwantedCharArray[y]) {
                charIsUnwanted = true;
            }
        }
        if (!charIsUnwanted) {
            keepGoing = false;
        } else {
            unwantedEndCharIndex--;
        }
    }
    keyValueString = keyValueString.slice(unwantedBegCharIndex, unwantedEndCharIndex + 1);
    return keyValueString;
}

//tells whether object is empty or not

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

//main function that will be used to getIntObj

function clean(cmsString) {

    if (cmsString.indexOf('\r\n') >= 0) {
        cmsString = cmsString.replace(/\r\n/g, '\n');
        cmsString = cmsString.replace(/\r/g, '\n');
        //cmsString=cmsString.replace(/\n\n/g, '\n');
        return cmsString;
    }

    return cmsString;
}

//Parses string into sections, then returns the array of strings for
//each section

function separateSections(data) {
    //Separated regular expression into many distinct pieces

    //specical metaMatchCode goes first.

    // 1st regular expression for meta, need to do
    var metaMatchCode = '^(-).[\\S\\s]+?(\\n){2,}';

    /* 2nd regular expression for claims, because the structure of claims is
  unique */
    var claimsHeaderMatchCode = '(-){4,}(\\n)*Claim Summary(\\n){2,}(-){4,}';
    var claimsBodyMatchCode = '([\\S\\s]+Claim[\\S\\s]+)+';
    var claimsEndMatchCode = '(?=((-){4,}))';
    var claimsMatchCode = claimsHeaderMatchCode +
        claimsBodyMatchCode + claimsEndMatchCode;

    //this match code is for all other sections
    var headerMatchCode = '(-){4,}[\\S\\s]+?(\\n){2,}(-){4,}';
    var bodyMatchCode = '[\\S\\s]+?';
    var endMatchCode = '(?=((-){4,}))';
    var sectionMatchCode = headerMatchCode + bodyMatchCode + endMatchCode;

    /* The regular expression for everything, search globally and
  ignore capitalization */
    var totalMatchCode = claimsMatchCode + "|" + sectionMatchCode;
    var totalRegExp = new RegExp(totalMatchCode, 'gi');
    var matchArray = data.match(totalRegExp);
    return matchArray;
}

//cleans up the title string obtained from the regular expression

function cleanUpTitle(rawTitleString) {
    /*dashChar is most commonly the dash of the title string, or a
  the first repeating character surrounding the title */
    var dashChar = rawTitleString.charAt(0);
    //beginning and ending index of the dash
    var dashBegIndex = 0;
    var dashEndIndex = rawTitleString.lastIndexOf(dashChar);

    //loop through to find indicies without continous dashes
    while (rawTitleString.charAt(dashBegIndex) === (dashChar || '\n')) {
        dashBegIndex++;
    }
    while (rawTitleString.charAt(dashEndIndex) === (dashChar || '\n')) {
        dashEndIndex--;
    }

    var titleString = rawTitleString.slice(dashBegIndex + 1, dashEndIndex - 1);
    titleString = trimStringEnds(titleString, ['\n', '-']);
    return titleString;
}

function processMetaChild(objectString) {
        var obj = {};
        var metaValueCode = /(\n{2,}?)([\S\s]+?)(?=\n{2,}?)/gi;
        var metaValues = objectString.match(metaValueCode);
        var counter = 0;
        for (var value in metaValues) {
            var cleanedMetaValue = metaValues[value].replace(/\n/g, '');
            if (cleanedMetaValue.length !== 0) {
                obj[value.toLowerCase()] = cleanedMetaValue;
            }
            counter++;
        }
        return obj;
    }
    /*processes objects with keys and values in each section((i.e. drug 1 of
    demographics */

function processSectionChild(objectString) {
    //regular expression that matches key value pairs
    var obj = {};
    var objArray = [];
    var topObj = obj;
    var keyValuePairRegExp = /(\n){1,}[\S\s,]+?(:)[\S\s]+?(?=((\n){1,})|$)/gi;
    var keyValuePairArray = objectString.match(keyValuePairRegExp);

    var multiKeyCount = {};
    /*this is to deal with multiple same keys from
  one child of a section*/
    //unusual steps are required to parse meta data and claims summary
    for (var s in keyValuePairArray) {
        //clean up the key pair
        var keyValuePairString = trimStringEnds(keyValuePairArray[s], ['\n']);
        //split each string by the :, the result is an array of size two
        var keyValuePair = keyValuePairString.split(/:(.*)/);
        var key = removeUnwantedCharacters(keyValuePair[0].trim(), ['\n', '-']);
        var value = keyValuePair[1].trim();
        //reassign tthe key based on how many duplicates tehre are
        if (key.length <= 0) {
            break;
        }
        key = key.toLowerCase();
        if (key in obj) {
            if (!(key in multiKeyCount)) {
                multiKeyCount[key] = 1;
            }
            var newKey = key + " " + String(multiKeyCount[key]);
            obj[newKey] = value;
            multiKeyCount[key] = multiKeyCount[key] + 1;
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

//function to process claim section of the document
function processClaimsLineChild(objectString) {
    var claimLineObj = {};
    var obj = {};
    var objArray = [];
    var keyValuePairRegExp = /(\n){1,}[\S\s,]+?(:)[\S\s]+?(?=((\n){1,})|$)/gi;
    var keyValuePairArray = objectString.match(keyValuePairRegExp);

    //unusual steps are required to parse meta data and claims summary
    for (var s in keyValuePairArray) {
        //clean up the key value pair
        var keyValuePairString = trimStringEnds(keyValuePairArray[s], ['\n']);
        //split each string by the :, the result is an array of size two
        var keyValuePair = keyValuePairString.split(/:(.*)/);
        var key = removeUnwantedCharacters(keyValuePair[0].trim(), ['\n', '-']);
        key = key.toLowerCase();
        var value = keyValuePair[1].trim();

        var claimLineCheckRegExp = /claim lines/i;
        if (claimLineCheckRegExp.test(key)) {
            claimLineObj.claimNumber = value;
            continue;
        }

        if (value.length === 0) {
            value = null;
        }
        //create a new object for line number
        if (key in obj) {
            objArray.push(obj);
            obj = {};
        }
        obj[key] = value;
    }
    objArray.push(obj);
    claimLineObj.data = objArray;
    return claimLineObj;
}

function processClaimsSectionChild(objectString) {
    //regular expression that matches key value pairs
    var obj = {};
    var objArray = [];
    var topObj = obj;
    var keyValuePairRegExp = /(\n){1,}[\S\s,]+?(:)[\S\s]+?(?=((\n){1,})|$)/gi;
    var keyValuePairArray = objectString.match(keyValuePairRegExp);
    //unusual steps are required to parse meta data and claims summary

    for (var s in keyValuePairArray) {
        //clean up the key pair
        var keyValuePairString = trimStringEnds(keyValuePairArray[s], ['\n']);

        //split each string by the :, the result is an array of size two
        var keyValuePair = keyValuePairString.split(/:(.*)/);
        var key = removeUnwantedCharacters(keyValuePair[0].trim(), ['\n', '-']);
        key = key.toLowerCase();
        var value = keyValuePair[1].trim();

        if (value.length === 0) {
            value = null;
        }
        //create a new object for line number
        if (key in obj) {
            objArray.push(obj);
            obj = {};
        }
        obj[key] = value;
    }
    if (objArray.length > 0) {
        objArray.push(obj);
        return objArray;
    } else {
        return obj;
    }
}

//parses the section body into an object

function getSectionBody(sectionString) {
    /*first, use regular expressions to parse the section body into different
  objects */
    var sectionBody = {};
    var sectionBodyData = [];
    var objectFromBodyRegExp = /-*(\n){2,}(?!-{4,})[\S\s,]+?((?=((\n){3,}?))|\n\n$)/gi;
    //or go to the end of the string.
    var objectStrings = sectionString.match(objectFromBodyRegExp);
    //process each section object (from string to an actual object)
    for (var obj in objectStrings) {
        var sectionChild = processSectionChild(objectStrings[obj]);

        if (!isEmpty(sectionChild)) {
            if ('source' in sectionChild) {
                sectionBody.source = sectionChild.source;
            } else {
                sectionBodyData.push(sectionChild);
            }

        }
    }
    sectionBody.data = sectionBodyData;
    return sectionBody;

}

function getClaimsBody(sectionString) {
    var sectionBody = {};
    var sectionBodyData = [];
    //this is for claim lines of only one type
    //this is for the claim lines with dashes in between
    var claimLineMatchCode =
        '(?:\\n*)(Claim Lines for Claim Number)[\\S\\s]+?\\n*-{4,}[\\S\\s]+?(?=(\\n{3,}Claim Number)|(\\n*-{3,}))';
    //this regular expression is for the regular claims with spaces.
    var claimMatchCode = '(?:(\\n{3,}))(Claim Number)[\\S\\s]+?(?:\\n*-{4,})';
    var sourceMatchCode = '-*(\\n){2,}(?!-{4,})Source[\\S\\s,]+?((?=((\\n){3,}?))|\\n\\n$)';

    var totalClaimMatchCode = claimLineMatchCode + '|' + claimMatchCode;
    var totalClaimsRegExp = new RegExp(totalClaimMatchCode, 'gi');
    //or go to the end of the string
    var sourceMatchRegExp = new RegExp(sourceMatchCode, 'gi');
    var sourceString = sectionString.match(sourceMatchRegExp);

    var objectStrings = sectionString.match(totalClaimsRegExp);

    objectStrings = sourceString.concat(objectStrings);
    var claimStrings = []; //this is where children should go by default
    var claimLineStrings = [];
    //sift between claims and claim lines
    var isClaim = true;
    var x;

    for (x = 0; x < objectStrings.length; x++) {
        var claimsLineCheck = /claim lines for claim number/i;
        if (claimsLineCheck.test(objectStrings[x])) {
            claimLineStrings.push(objectStrings[x]);
        } else {
            claimStrings.push(objectStrings[x]);
        }
    }
    /* claims children keeps track of all the object information, claimsNumberList
    as a set that keeps track of the claims numbers so far */
    var claimsChildren = {};
    var claimsLineChildren = {};

    var obj;
    var claimNumber;

    //process each claim
    for (obj in claimStrings) {
        var child = processClaimsSectionChild(claimStrings[obj]);
        if (!isEmpty(child)) {
            if ('source' in child) { //take into account the source tag
                sectionBody.source = child.source;
            } else {
                claimNumber = child['claim number'];
                claimsChildren[claimNumber] = child;
            }
        }
    }

    //process each batch of claim lines
    for (obj in claimLineStrings) {
        var sectionChild = processClaimsLineChild(claimLineStrings[obj]);
        if (!isEmpty(sectionChild)) {
            if ('source' in sectionChild) {
                sectionBody.source = sectionChild.source;
            } else {
                claimNumber = sectionChild.claimNumber;
                if (claimsLineChildren[claimNumber] !== undefined) {
                    for (x = 0; x < sectionChild.data.length; x++) {
                        claimsLineChildren[claimNumber].push(sectionChild.data[x]);
                    }
                } else {
                    claimsLineChildren[claimNumber] = sectionChild.data;
                }

            }
        }
    }

    //merge two results together
    for (x in claimsChildren) {
        if (x in claimsLineChildren) {
            claimsChildren[x].claimLines = claimsLineChildren[x];
            delete claimsLineChildren[x];
        }
    }
    //reformat claim lines to claims objects
    for (x in claimsLineChildren) {
        var claimObj = {};
        claimObj['claim number'] = x;
        claimObj.claimLines = claimsLineChildren[x];
        claimsChildren[x] = claimObj;
    }

    for (x in claimsChildren) {
        sectionBodyData.push(claimsChildren[x]);
    }

    //add all the objects to section body data
    sectionBody.data = sectionBodyData;
    return sectionBody;

}

//functions for specific meta characters

function getMetaBody(sectionString) {
    var sectionBody = {};
    var sectionBodyObj = {};
    var metaBodyCode = /-{2,}((\n*?\*{3,}[\S\s]+\*{3,})|(\n{2,}))[\S\s]+?\n{3,}/gi;
    var objectStrings = sectionString.match(metaBodyCode);
    for (var obj in objectStrings) {
        var sectionChild = processMetaChild(objectStrings[obj]);
        if (!isEmpty(sectionChild)) {
            sectionBodyObj.type = 'cms';
            //get only the number from version
            var versionRegExp = /\(v[\S\s]+?\)/;
            var version = sectionChild[0].match(versionRegExp)[0];
            version = trimStringEnds(version, ['(', ')', 'v']);
            sectionBodyObj.version = version;
            sectionBodyObj.timestamp = sectionChild[1];
        }
    }
    sectionBody.data = [sectionBodyObj];
    return sectionBody;

}

//converts each section to an  object representation

function convertToObject(sectionString) {

    var sectionObj = {};
    //get the section title(get it raw, clean it)
    var sectionTitleRegExp = /(-){3,}([\S\s]+?)(-){3,}/;
    var sectionRawTitle = sectionString.match(sectionTitleRegExp)[0];
    var sectionTitle = cleanUpTitle(sectionRawTitle).toLowerCase();

    //get the section body
    var sectionBody;
    sectionObj.sectionTitle = sectionTitle;
    //these are very special "edge" cases

    //meta data/information about document in the beginning of the doc
    if (sectionTitle.toLowerCase().indexOf("personal health information") >= 0) {
        delete sectionObj.sectionTitle;
        sectionObj.sectionTitle = 'meta';
        sectionBody = getMetaBody(sectionString);
    } else if (sectionTitle.toLowerCase().indexOf("claim") >= 0) {
        sectionBody = getClaimsBody(sectionString);
    } else {
        sectionBody = getSectionBody(sectionString);
    }
    sectionObj.sectionBody = sectionBody;
    return sectionObj;
}

function getIntObj(cmsString) {

    var rawData = clean(cmsString);
    //might need to convert input ASCII, or have actual strings in the c
    //code be converted to utf8 later
    var documentObj = {};
    var sectionArray = separateSections(rawData);
    for (var section in sectionArray) {
        var sectionObj = convertToObject(sectionArray[section]);
        var sectionObjTitle = sectionObj.sectionTitle;
        var sectionObjBody = sectionObj.sectionBody;
        documentObj[sectionObjTitle] = sectionObjBody;
    }
    //console.log(JSON.stringify(documentObj, null, 4));
    return documentObj;
}

//Gets all section titles given the entire data file string

function getTitles(fileString) {
    var headerMatchCode = '(-){4,}[\\S\\s]+?(\\n){2,}(-){4,}';
    var headerRegExp = new RegExp(headerMatchCode, 'gi');
    var rawTitleArray = fileString.match(headerRegExp);
    var titleArray = [];
    if (rawTitleArray === null) {
        return null;
    }
    for (var i = 0, len = rawTitleArray.length; i < len; i++) {
        var tempTitle = cleanUpTitle(rawTitleArray[i]);
        //exception to the rule, claim lines
        if (tempTitle.toLowerCase().indexOf("claim lines for claim number") < 0 &&
            tempTitle.length > 0) {
            titleArray[i] = tempTitle;
        }
    }
    return titleArray;
}

module.exports.getIntObj = getIntObj;
module.exports.getTitles = getTitles;

},{}],3:[function(require,module,exports){
//main file for CMS parser.

var cmsObjConverter = require('./cmsObjConverter');
var txtToIntObj = require('./cmsTxtToIntObj').getIntObj;

//parses CMS BB text format into BB JSON

function parseCMS(fileString) {
    var intObj = txtToIntObj(fileString);

    var result = cmsObjConverter.convertToBBModel(intObj);

    return result;

}

module.exports = {
    "parseCMS": parseCMS
};

},{"./cmsObjConverter":1,"./cmsTxtToIntObj":2}],4:[function(require,module,exports){
 var commonFunctions = require('./sections/commonFunctions');

 function getMeta(intObj) {
     intObj = intObj[0];
     var processDate = commonFunctions.getFunction('cda_date');
     var dateString = intObj.timestamp;
     var dateObj = processDate(dateString);
     intObj.timestamp = dateObj;
     return [intObj];
 }

 var sections = {
     'meta': getMeta,
     'demographic': require('./sections/demographics.js'),
     'self reported medical conditions': require('./sections/problems.js'),
     'self reported allergies': require('./sections/allergies.js'),
     'self reported labs and tests': require('./sections/results.js'),
     "drugs": require('./sections/medications.js'),
     "self reported vital statistics": require('./sections/vitals.js'),
     "self reported immunizations": require('./sections/immunizations.js'),
     'plans': require('./sections/insurance.js'),
     'employer subsidy': require('./sections/insurance.js'),
     'primary insurance': require('./sections/insurance.js'),
     'other insurance': require('./sections/insurance.js'),
     'claim summary': require('./sections/claims.js'),
     'preventive services': require('./sections/planofcare.js'),
     "providers": require('./sections/providers.js')
 };

 var sectionRouter = function (sectionName) {
     if (sectionName in sections) {
         if (sections[sectionName] !== null) {
             return sections[sectionName];
         }
     } else {
         return null;
     }
 };

 module.exports.sectionRouter = sectionRouter;

},{"./sections/allergies.js":7,"./sections/claims.js":8,"./sections/commonFunctions":9,"./sections/demographics.js":10,"./sections/immunizations.js":11,"./sections/insurance.js":12,"./sections/medications.js":13,"./sections/planofcare.js":14,"./sections/problems.js":15,"./sections/providers.js":16,"./sections/results.js":17,"./sections/vitals.js":18}],5:[function(require,module,exports){
//refer to USPS website for additional details (https://www.usps.com/send/official-abbreviations.htm)

var streetSuffix = {
    "ALLEE": "ALY",
    "ALLEY": "ALY",
    "ALLY": "ALY",
    "ALY": "ALY",
    "ANEX": "ANX",
    "ANNEX": "ANX",
    "ANX": "ANX",
    "ARC": "ARC",
    "ARCADE": "ARC",
    "AV": "AVE",
    "AVE": "AVE",
    "AVEN": "AVE",
    "AVENU": "AVE",
    "AVENUE": "AVE",
    "AVN": "AVE",
    "AVNUE": "AVE",
    "BAYOO": "BYU",
    "BAYOU": "BYU",
    "BCH": "BCH",
    "BEACH": "BCH",
    "BEND": "BND",
    "BND": "BND",
    "BLF": "BLF",
    "BLUF": "BLF",
    "BLUFF": "BLF",
    "BLUFFS": "BLFS",
    "BOT": "BTM",
    "BOTTM": "BTM",
    "BOTTOM": "BTM",
    "BTM": "BTM",
    "BLVD": "BLVD",
    "BOUL": "BLVD",
    "BOULEVARD": "BLVD",
    "BOULV": "BLVD",
    "BR": "BR",
    "BRANCH": "BR",
    "BRNCH": "BR",
    "BRDGE": "BRG",
    "BRG": "BRG",
    "BRIDGE": "BRG",
    "BRK": "BRK",
    "BROOK": "BRK",
    "BROOKS": "BRKS",
    "BURG": "BG",
    "BURGS": "BGS",
    "BYP": "BYP",
    "BYPA": "BYP",
    "BYPAS": "BYP",
    "BYPASS": "BYP",
    "BYPS": "BYP",
    "CAMP": "CP",
    "CMP": "CP",
    "CP": "CP",
    "CANYN": "CYN",
    "CANYON": "CYN",
    "CNYN": "CYN",
    "CYN": "CYN",
    "CAPE": "CPE",
    "CPE": "CPE",
    "CAUSEWAY": "CSWY",
    "CAUSWAY": "CSWY",
    "CSWY": "CSWY",
    "CEN": "CTR",
    "CENT": "CTR",
    "CENTER": "CTR",
    "CENTR": "CTR",
    "CENTRE": "CTR",
    "CNTER": "CTR",
    "CNTR": "CTR",
    "CTR": "CTR",
    "CENTERS": "CTRS",
    "CIR": "CIR",
    "CIRC": "CIR",
    "CIRCL": "CIR",
    "CIRCLE": "CIR",
    "CRCL": "CIR",
    "CRCLE": "CIR",
    "CIRCLES": "CIRS",
    "CLF": "CLF",
    "CLIFF": "CLF",
    "CLFS": "CLFS",
    "CLIFFS": "CLFS",
    "CLB": "CLB",
    "CLUB": "CLB",
    "COMMON": "CMN",
    "COR": "COR",
    "CORNER": "COR",
    "CORNERS": "CORS",
    "CORS": "CORS",
    "COURSE": "CRSE",
    "CRSE": "CRSE",
    "COURT": "CT",
    "CRT": "CT",
    "CT": "CT",
    "COURTS": "CTS",
    "COVE": "CV",
    "CV": "CV",
    "COVES": "CVS",
    "CK": "CRK",
    "CR": "CRK",
    "CREEK": "CRK",
    "CRK": "CRK",
    "CRECENT": "CRES",
    "CRES": "CRES",
    "CRESCENT": "CRES",
    "CRESENT": "CRES",
    "CRSCNT": "CRES",
    "CRSENT": "CRES",
    "CRSNT": "CRES",
    "CREST": "CRST",
    "CROSSING": "XING",
    "CRSSING": "XING",
    "CRSSNG": "XING",
    "XING": "XING",
    "CROSSROAD": "XRD",
    "CURVE": "CURV",
    "DALE": "DL",
    "DL": "DL",
    "DAM": "DM",
    "DM": "DM",
    "DIV": "DV",
    "DIVIDE": "DV",
    "DV": "DV",
    "DVD": "DV",
    "DR": "DR",
    "DRIV": "DR",
    "DRIVE": "DR",
    "DRV": "DR",
    "DRIVES": "DRS",
    "EST": "EST",
    "ESTATE": "EST",
    "ESTATES": "ESTS",
    "ESTS": "ESTS",
    "EXP": "EXPY",
    "EXPR": "EXPY",
    "EXPRESS": "EXPY",
    "EXPRESSWAY": "EXPY",
    "EXPW": "EXPY",
    "EXPY": "EXPY",
    "EXT": "EXT",
    "EXTENSION": "EXT",
    "EXTN": "EXT",
    "EXTNSN": "EXT",
    "EXTENSIONS": "EXTS",
    "EXTS": "EXTS",
    "FALL": "FALL",
    "FALLS": "FLS",
    "FLS": "FLS",
    "FERRY": "FRY",
    "FRRY": "FRY",
    "FRY": "FRY",
    "FIELD": "FLD",
    "FLD": "FLD",
    "FIELDS": "FLDS",
    "FLDS": "FLDS",
    "FLAT": "FLT",
    "FLT": "FLT",
    "FLATS": "FLTS",
    "FLTS": "FLTS",
    "FORD": "FRD",
    "FRD": "FRD",
    "FORDS": "FRDS",
    "FOREST": "FRST",
    "FORESTS": "FRST",
    "FRST": "FRST",
    "FORG": "FRG",
    "FORGE": "FRG",
    "FRG": "FRG",
    "FORGES": "FRGS",
    "FORK": "FRK",
    "FRK": "FRK",
    "FORKS": "FRKS",
    "FRKS": "FRKS",
    "FORT": "FT",
    "FRT": "FT",
    "FT": "FT",
    "FREEWAY": "FWY",
    "FREEWY": "FWY",
    "FRWAY": "FWY",
    "FRWY": "FWY",
    "FWY": "FWY",
    "GARDEN": "GDN",
    "GARDN": "GDN",
    "GDN": "GDN",
    "GRDEN": "GDN",
    "GRDN": "GDN",
    "GARDENS": "GDNS",
    "GDNS": "GDNS",
    "GRDNS": "GDNS",
    "GATEWAY": "GTWY",
    "GATEWY": "GTWY",
    "GATWAY": "GTWY",
    "GTWAY": "GTWY",
    "GTWY": "GTWY",
    "GLEN": "GLN",
    "GLN": "GLN",
    "GLENS": "GLNS",
    "GREEN": "GRN",
    "GRN": "GRN",
    "GREENS": "GRNS",
    "GROV": "GRV",
    "GROVE": "GRV",
    "GRV": "GRV",
    "GROVES": "GRVS",
    "HARB": "HBR",
    "HARBOR": "HBR",
    "HARBR": "HBR",
    "HBR": "HBR",
    "HRBOR": "HBR",
    "HARBORS": "HBRS",
    "HAVEN": "HVN",
    "HAVN": "HVN",
    "HVN": "HVN",
    "HEIGHT": "HTS",
    "HEIGHTS": "HTS",
    "HGTS": "HTS",
    "HT": "HTS",
    "HTS": "HTS",
    "HIGHWAY": "HWY",
    "HIGHWY": "HWY",
    "HIWAY": "HWY",
    "HIWY": "HWY",
    "HWAY": "HWY",
    "HWY": "HWY",
    "HILL": "HL",
    "HL": "HL",
    "HILLS": "HLS",
    "HLS": "HLS",
    "HLLW": "HOLW",
    "HOLLOW": "HOLW",
    "HOLLOWS": "HOLW",
    "HOLW": "HOLW",
    "HOLWS": "HOLW",
    "INLET": "INLT",
    "INLT": "INLT",
    "IS": "IS",
    "ISLAND": "IS",
    "ISLND": "IS",
    "ISLANDS": "ISS",
    "ISLNDS": "ISS",
    "ISS": "ISS",
    "ISLE": "ISLE",
    "ISLES": "ISLE",
    "JCT": "JCT",
    "JCTION": "JCT",
    "JCTN": "JCT",
    "JUNCTION": "JCT",
    "JUNCTN": "JCT",
    "JUNCTON": "JCT",
    "JCTNS": "JCTS",
    "JCTS": "JCTS",
    "JUNCTIONS": "JCTS",
    "KEY": "KY",
    "KY": "KY",
    "KEYS": "KYS",
    "KYS": "KYS",
    "KNL": "KNL",
    "KNOL": "KNL",
    "KNOLL": "KNL",
    "KNLS": "KNLS",
    "KNOLLS": "KNLS",
    "LAKE": "LK",
    "LK": "LK",
    "LAKES": "LKS",
    "LKS": "LKS",
    "LAND": "LAND",
    "LANDING": "LNDG",
    "LNDG": "LNDG",
    "LNDNG": "LNDG",
    "LA": "LN",
    "LANE": "LN",
    "LANES": "LN",
    "LN": "LN",
    "LGT": "LGT",
    "LIGHT": "LGT",
    "LIGHTS": "LGTS",
    "LF": "LF",
    "LOAF": "LF",
    "LCK": "LCK",
    "LOCK": "LCK",
    "LCKS": "LCKS",
    "LOCKS": "LCKS",
    "LDG": "LDG",
    "LDGE": "LDG",
    "LODG": "LDG",
    "LODGE": "LDG",
    "LOOP": "LOOP",
    "LOOPS": "LOOP",
    "MALL": "MALL",
    "MANOR": "MNR",
    "MNR": "MNR",
    "MANORS": "MNRS",
    "MNRS": "MNRS",
    "MDW": "MDW",
    "MEADOW": "MDW",
    "MDWS": "MDWS",
    "MEADOWS": "MDWS",
    "MEDOWS": "MDWS",
    "MEWS": "MEWS",
    "MILL": "ML",
    "ML": "ML",
    "MILLS": "MLS",
    "MLS": "MLS",
    "MISSION": "MSN",
    "MISSN": "MSN",
    "MSN": "MSN",
    "MSSN": "MSN",
    "MOTORWAY": "MTWY",
    "MNT": "MT",
    "MOUNT": "MT",
    "MT": "MT",
    "MNTAIN": "MTN",
    "MNTN": "MTN",
    "MOUNTAIN": "MTN",
    "MOUNTIN": "MTN",
    "MTIN": "MTN",
    "MTN": "MTN",
    "MNTNS": "MTNS",
    "MOUNTAINS": "MTNS",
    "NCK": "NCK",
    "NECK": "NCK",
    "ORCH": "ORCH",
    "ORCHARD": "ORCH",
    "ORCHRD": "ORCH",
    "OVAL": "OVAL",
    "OVL": "OVAL",
    "OVERPASS": "OPAS",
    "PARK": "PARK",
    "PK": "PARK",
    "PRK": "PARK",
    "PARKS": "PARK",
    "PARKWAY": "PKWY",
    "PARKWY": "PKWY",
    "PKWAY": "PKWY",
    "PKWY": "PKWY",
    "PKY": "PKWY",
    "PARKWAYS": "PKWY",
    "PKWYS": "PKWY",
    "PASS": "PASS",
    "PASSAGE": "PSGE",
    "PATH": "PATH",
    "PATHS": "PATH",
    "PIKE": "PIKE",
    "PIKES": "PIKE",
    "PINE": "PNE",
    "PINES": "PNES",
    "PNES": "PNES",
    "PL": "PL",
    "PLACE": "PL",
    "PLAIN": "PLN",
    "PLN": "PLN",
    "PLAINES": "PLNS",
    "PLAINS": "PLNS",
    "PLNS": "PLNS",
    "PLAZA": "PLZ",
    "PLZ": "PLZ",
    "PLZA": "PLZ",
    "POINT": "PT",
    "PT": "PT",
    "POINTS": "PTS",
    "PTS": "PTS",
    "PORT": "PRT",
    "PRT": "PRT",
    "PORTS": "PRTS",
    "PRTS": "PRTS",
    "PR": "PR",
    "PRAIRIE": "PR",
    "PRARIE": "PR",
    "PRR": "PR",
    "RAD": "RADL",
    "RADIAL": "RADL",
    "RADIEL": "RADL",
    "RADL": "RADL",
    "RAMP": "RAMP",
    "RANCH": "RNCH",
    "RANCHES": "RNCH",
    "RNCH": "RNCH",
    "RNCHS": "RNCH",
    "RAPID": "RPD",
    "RPD": "RPD",
    "RAPIDS": "RPDS",
    "RPDS": "RPDS",
    "REST": "RST",
    "RST": "RST",
    "RDG": "RDG",
    "RDGE": "RDG",
    "RIDGE": "RDG",
    "RDGS": "RDGS",
    "RIDGES": "RDGS",
    "RIV": "RIV",
    "RIVER": "RIV",
    "RIVR": "RIV",
    "RVR": "RIV",
    "RD": "RD",
    "ROAD": "RD",
    "RDS": "RDS",
    "ROADS": "RDS",
    "ROUTE": "RTE",
    "ROW": "ROW",
    "RT": "ROUTE",
    "RUE": "RUE",
    "RUN": "RUN",
    "SHL": "SHL",
    "SHOAL": "SHL",
    "SHLS": "SHLS",
    "SHOALS": "SHLS",
    "SHOAR": "SHR",
    "SHORE": "SHR",
    "SHR": "SHR",
    "SHOARS": "SHRS",
    "SHORES": "SHRS",
    "SHRS": "SHRS",
    "SKYWAY": "SKWY",
    "SPG": "SPG",
    "SPNG": "SPG",
    "SPRING": "SPG",
    "SPRNG": "SPG",
    "SPGS": "SPGS",
    "SPNGS": "SPGS",
    "SPRINGS": "SPGS",
    "SPRNGS": "SPGS",
    "SPUR": "SPUR",
    "SPURS": "SPUR",
    "SQ": "SQ",
    "SQR": "SQ",
    "SQRE": "SQ",
    "SQU": "SQ",
    "SQUARE": "SQ",
    "SQRS": "SQS",
    "SQUARES": "SQS",
    "STA": "STA",
    "STATION": "STA",
    "STATN": "STA",
    "STN": "STA",
    "STRA": "STRA",
    "STRAV": "STRA",
    "STRAVE": "STRA",
    "STRAVEN": "STRA",
    "STRAVENUE": "STRA",
    "STRAVN": "STRA",
    "STRVN": "STRA",
    "STRVNUE": "STRA",
    "STREAM": "STRM",
    "STREME": "STRM",
    "STRM": "STRM",
    "ST": "ST",
    "STR": "ST",
    "STREET": "ST",
    "STRT": "ST",
    "STREETS": "STS",
    "SMT": "SMT",
    "SUMIT": "SMT",
    "SUMITT": "SMT",
    "SUMMIT": "SMT",
    "TER": "TER",
    "TERR": "TER",
    "TERRACE": "TER",
    "THROUGHWAY": "TRWY",
    "TRACE": "TRCE",
    "TRACES": "TRCE",
    "TRCE": "TRCE",
    "TRACK": "TRAK",
    "TRACKS": "TRAK",
    "TRAK": "TRAK",
    "TRK": "TRAK",
    "TRKS": "TRAK",
    "TRAFFICWAY": "TRFY",
    "TRFY": "TRFY",
    "TR": "TRL",
    "TRAIL": "TRL",
    "TRAILS": "TRL",
    "TRL": "TRL",
    "TRLS": "TRL",
    "TUNEL": "TUNL",
    "TUNL": "TUNL",
    "TUNLS": "TUNL",
    "TUNNEL": "TUNL",
    "TUNNELS": "TUNL",
    "TUNNL": "TUNL",
    "TPK": "TPKE",
    "TPKE": "TPKE",
    "TRNPK": "TPKE",
    "TRPK": "TPKE",
    "TURNPIKE": "TPKE",
    "TURNPK": "TPKE",
    "UNDERPASS": "UPAS",
    "UN": "UN",
    "UNION": "UN",
    "UNIONS": "UNS",
    "VALLEY": "VLY",
    "VALLY": "VLY",
    "VLLY": "VLY",
    "VLY": "VLY",
    "VALLEYS": "VLYS",
    "VLYS": "VLYS",
    "VDCT": "VIA",
    "VIA": "VIA",
    "VIADCT": "VIA",
    "VIADUCT": "VIA",
    "VIEW": "VW",
    "VW": "VW",
    "VIEWS": "VWS",
    "VWS": "VWS",
    "VILL": "VLG",
    "VILLAG": "VLG",
    "VILLAGE": "VLG",
    "VILLG": "VLG",
    "VILLIAGE": "VLG",
    "VLG": "VLG",
    "VILLAGES": "VLGS",
    "VLGS": "VLGS",
    "VILLE": "VL",
    "VL": "VL",
    "VIS": "VIS",
    "VIST": "VIS",
    "VISTA": "VIS",
    "VST": "VIS",
    "VSTA": "VIS",
    "WALK": "WALK",
    "WALKS": "WALK",
    "WALL": "WALL",
    "WAY": "WAY",
    "WY": "WAY",
    "WAYS": "WAYS",
    "WELL": "WL",
    "WELLS": "WLS",
    "WLS": "WLS"
};

var unitDesignators = {
    "APT": "Apartment",
    "BSMT": "Basement",
    "BLDG": "Building",
    "DEPT": "Department",
    "FL": "Floor",
    "FRNT": "Front",
    "HNGR": "Hanger",
    "KEY": "Key",
    "LBBY": "Lobby",
    "LOT": "Lot",
    "LOWR": "Lower",
    "OFC": "Office",
    "PH": "Penthouse",
    "PIER": "Pier",
    "REAR": "Rear",
    "RM": "Room",
    "SIDE": "Side",
    "SLIP": "Slip",
    "SPC": "Space",
    "STOP": "Stop",
    "STE": "Suite",
    "TRLR": "Trailer",
    "UNIT": "Unit",
    "UPPR": "Upper"
};

module.exports.streetSuffix = streetSuffix;
module.exports.unitDesignators = unitDesignators;

},{}],6:[function(require,module,exports){
"use strict";

//zips is in the format zip code: [City, two letter state code], from https://www.census.gov.

var zips = {
    "10001": [
        "NEW YORK",
        "NY"
    ],
    "10002": [
        "NEW YORK",
        "NY"
    ],
    "10003": [
        "NEW YORK",
        "NY"
    ],
    "10004": [
        "NEW YORK",
        "NY"
    ],
    "10005": [
        "NEW YORK",
        "NY"
    ],
    "10006": [
        "NEW YORK",
        "NY"
    ],
    "10007": [
        "NEW YORK",
        "NY"
    ],
    "10008": [
        "NEW YORK",
        "NY"
    ],
    "10009": [
        "NEW YORK",
        "NY"
    ],
    "10010": [
        "NEW YORK",
        "NY"
    ],
    "10011": [
        "NEW YORK",
        "NY"
    ],
    "10012": [
        "NEW YORK",
        "NY"
    ],
    "10013": [
        "NEW YORK",
        "NY"
    ],
    "10014": [
        "NEW YORK",
        "NY"
    ],
    "10016": [
        "NEW YORK",
        "NY"
    ],
    "10017": [
        "NEW YORK",
        "NY"
    ],
    "10018": [
        "NEW YORK",
        "NY"
    ],
    "10019": [
        "NEW YORK",
        "NY"
    ],
    "10020": [
        "NEW YORK",
        "NY"
    ],
    "10021": [
        "NEW YORK",
        "NY"
    ],
    "10022": [
        "NEW YORK",
        "NY"
    ],
    "10023": [
        "NEW YORK",
        "NY"
    ],
    "10024": [
        "NEW YORK",
        "NY"
    ],
    "10025": [
        "NEW YORK",
        "NY"
    ],
    "10026": [
        "NEW YORK",
        "NY"
    ],
    "10027": [
        "NEW YORK",
        "NY"
    ],
    "10028": [
        "NEW YORK",
        "NY"
    ],
    "10029": [
        "NEW YORK",
        "NY"
    ],
    "10030": [
        "NEW YORK",
        "NY"
    ],
    "10031": [
        "NEW YORK",
        "NY"
    ],
    "10032": [
        "NEW YORK",
        "NY"
    ],
    "10033": [
        "NEW YORK",
        "NY"
    ],
    "10034": [
        "NEW YORK",
        "NY"
    ],
    "10035": [
        "NEW YORK",
        "NY"
    ],
    "10036": [
        "NEW YORK",
        "NY"
    ],
    "10037": [
        "NEW YORK",
        "NY"
    ],
    "10038": [
        "NEW YORK",
        "NY"
    ],
    "10039": [
        "NEW YORK",
        "NY"
    ],
    "10040": [
        "NEW YORK",
        "NY"
    ],
    "10041": [
        "NEW YORK",
        "NY"
    ],
    "10043": [
        "NEW YORK",
        "NY"
    ],
    "10044": [
        "NEW YORK",
        "NY"
    ],
    "10045": [
        "NEW YORK",
        "NY"
    ],
    "10055": [
        "NEW YORK",
        "NY"
    ],
    "10065": [
        "NEW YORK",
        "NY"
    ],
    "10069": [
        "NEW YORK",
        "NY"
    ],
    "10075": [
        "NEW YORK",
        "NY"
    ],
    "10080": [
        "NEW YORK",
        "NY"
    ],
    "10081": [
        "NEW YORK",
        "NY"
    ],
    "10087": [
        "NEW YORK",
        "NY"
    ],
    "10090": [
        "NEW YORK",
        "NY"
    ],
    "10101": [
        "NEW YORK",
        "NY"
    ],
    "10102": [
        "NEW YORK",
        "NY"
    ],
    "10103": [
        "NEW YORK",
        "NY"
    ],
    "10104": [
        "NEW YORK",
        "NY"
    ],
    "10105": [
        "NEW YORK",
        "NY"
    ],
    "10106": [
        "NEW YORK",
        "NY"
    ],
    "10107": [
        "NEW YORK",
        "NY"
    ],
    "10108": [
        "NEW YORK",
        "NY"
    ],
    "10110": [
        "NEW YORK",
        "NY"
    ],
    "10111": [
        "NEW YORK",
        "NY"
    ],
    "10112": [
        "NEW YORK",
        "NY"
    ],
    "10113": [
        "NEW YORK",
        "NY"
    ],
    "10114": [
        "NEW YORK",
        "NY"
    ],
    "10115": [
        "NEW YORK",
        "NY"
    ],
    "10116": [
        "NEW YORK",
        "NY"
    ],
    "10117": [
        "NEW YORK",
        "NY"
    ],
    "10118": [
        "NEW YORK",
        "NY"
    ],
    "10119": [
        "NEW YORK",
        "NY"
    ],
    "10120": [
        "NEW YORK",
        "NY"
    ],
    "10121": [
        "NEW YORK",
        "NY"
    ],
    "10122": [
        "NEW YORK",
        "NY"
    ],
    "10123": [
        "NEW YORK",
        "NY"
    ],
    "10125": [
        "NEW YORK",
        "NY"
    ],
    "10126": [
        "NEW YORK",
        "NY"
    ],
    "10128": [
        "NEW YORK",
        "NY"
    ],
    "10129": [
        "NEW YORK",
        "NY"
    ],
    "10138": [
        "NEW YORK",
        "NY"
    ],
    "10150": [
        "NEW YORK",
        "NY"
    ],
    "10151": [
        "NEW YORK",
        "NY"
    ],
    "10152": [
        "NEW YORK",
        "NY"
    ],
    "10153": [
        "NEW YORK",
        "NY"
    ],
    "10154": [
        "NEW YORK",
        "NY"
    ],
    "10155": [
        "NEW YORK",
        "NY"
    ],
    "10156": [
        "NEW YORK",
        "NY"
    ],
    "10158": [
        "NEW YORK",
        "NY"
    ],
    "10159": [
        "NEW YORK",
        "NY"
    ],
    "10160": [
        "NEW YORK",
        "NY"
    ],
    "10162": [
        "NEW YORK",
        "NY"
    ],
    "10163": [
        "NEW YORK",
        "NY"
    ],
    "10164": [
        "NEW YORK",
        "NY"
    ],
    "10165": [
        "NEW YORK",
        "NY"
    ],
    "10166": [
        "NEW YORK",
        "NY"
    ],
    "10167": [
        "NEW YORK",
        "NY"
    ],
    "10168": [
        "NEW YORK",
        "NY"
    ],
    "10169": [
        "NEW YORK",
        "NY"
    ],
    "10170": [
        "NEW YORK",
        "NY"
    ],
    "10171": [
        "NEW YORK",
        "NY"
    ],
    "10172": [
        "NEW YORK",
        "NY"
    ],
    "10173": [
        "NEW YORK",
        "NY"
    ],
    "10174": [
        "NEW YORK",
        "NY"
    ],
    "10175": [
        "NEW YORK",
        "NY"
    ],
    "10176": [
        "NEW YORK",
        "NY"
    ],
    "10177": [
        "NEW YORK",
        "NY"
    ],
    "10178": [
        "NEW YORK",
        "NY"
    ],
    "10179": [
        "NEW YORK",
        "NY"
    ],
    "10185": [
        "NEW YORK",
        "NY"
    ],
    "10199": [
        "NEW YORK",
        "NY"
    ],
    "10203": [
        "NEW YORK",
        "NY"
    ],
    "10212": [
        "NEW YORK",
        "NY"
    ],
    "10261": [
        "NEW YORK",
        "NY"
    ],
    "10265": [
        "NEW YORK",
        "NY"
    ],
    "10268": [
        "NEW YORK",
        "NY"
    ],
    "10270": [
        "NEW YORK",
        "NY"
    ],
    "10271": [
        "NEW YORK",
        "NY"
    ],
    "10274": [
        "NEW YORK",
        "NY"
    ],
    "10276": [
        "NEW YORK",
        "NY"
    ],
    "10278": [
        "NEW YORK",
        "NY"
    ],
    "10279": [
        "NEW YORK",
        "NY"
    ],
    "10280": [
        "NEW YORK",
        "NY"
    ],
    "10281": [
        "NEW YORK",
        "NY"
    ],
    "10282": [
        "NEW YORK",
        "NY"
    ],
    "10285": [
        "NEW YORK",
        "NY"
    ],
    "10286": [
        "NEW YORK",
        "NY"
    ],
    "10292": [
        "NEW YORK",
        "NY"
    ],
    "10301": [
        "STATEN ISLAND",
        "NY"
    ],
    "10302": [
        "STATEN ISLAND",
        "NY"
    ],
    "10303": [
        "STATEN ISLAND",
        "NY"
    ],
    "10304": [
        "STATEN ISLAND",
        "NY"
    ],
    "10305": [
        "STATEN ISLAND",
        "NY"
    ],
    "10306": [
        "STATEN ISLAND",
        "NY"
    ],
    "10307": [
        "STATEN ISLAND",
        "NY"
    ],
    "10308": [
        "STATEN ISLAND",
        "NY"
    ],
    "10309": [
        "STATEN ISLAND",
        "NY"
    ],
    "10310": [
        "STATEN ISLAND",
        "NY"
    ],
    "10311": [
        "STATEN ISLAND",
        "NY"
    ],
    "10312": [
        "STATEN ISLAND",
        "NY"
    ],
    "10313": [
        "STATEN ISLAND",
        "NY"
    ],
    "10314": [
        "STATEN ISLAND",
        "NY"
    ],
    "10451": [
        "BRONX",
        "NY"
    ],
    "10452": [
        "BRONX",
        "NY"
    ],
    "10453": [
        "BRONX",
        "NY"
    ],
    "10454": [
        "BRONX",
        "NY"
    ],
    "10455": [
        "BRONX",
        "NY"
    ],
    "10456": [
        "BRONX",
        "NY"
    ],
    "10457": [
        "BRONX",
        "NY"
    ],
    "10458": [
        "BRONX",
        "NY"
    ],
    "10459": [
        "BRONX",
        "NY"
    ],
    "10460": [
        "BRONX",
        "NY"
    ],
    "10461": [
        "BRONX",
        "NY"
    ],
    "10462": [
        "BRONX",
        "NY"
    ],
    "10463": [
        "BRONX",
        "NY"
    ],
    "10464": [
        "BRONX",
        "NY"
    ],
    "10465": [
        "BRONX",
        "NY"
    ],
    "10466": [
        "BRONX",
        "NY"
    ],
    "10467": [
        "BRONX",
        "NY"
    ],
    "10468": [
        "BRONX",
        "NY"
    ],
    "10469": [
        "BRONX",
        "NY"
    ],
    "10470": [
        "BRONX",
        "NY"
    ],
    "10471": [
        "BRONX",
        "NY"
    ],
    "10472": [
        "BRONX",
        "NY"
    ],
    "10473": [
        "BRONX",
        "NY"
    ],
    "10474": [
        "BRONX",
        "NY"
    ],
    "10475": [
        "BRONX",
        "NY"
    ],
    "10501": [
        "AMAWALK",
        "NY"
    ],
    "10502": [
        "ARDSLEY",
        "NY"
    ],
    "10503": [
        "ARDSLEY ON HUDSON",
        "NY"
    ],
    "10504": [
        "ARMONK",
        "NY"
    ],
    "10505": [
        "BALDWIN PLACE",
        "NY"
    ],
    "10506": [
        "BEDFORD",
        "NY"
    ],
    "10507": [
        "BEDFORD HILLS",
        "NY"
    ],
    "10509": [
        "BREWSTER",
        "NY"
    ],
    "10510": [
        "BRIARCLIFF MANOR",
        "NY"
    ],
    "10511": [
        "BUCHANAN",
        "NY"
    ],
    "10512": [
        "CARMEL",
        "NY"
    ],
    "10514": [
        "CHAPPAQUA",
        "NY"
    ],
    "10516": [
        "COLD SPRING",
        "NY"
    ],
    "10517": [
        "CROMPOND",
        "NY"
    ],
    "10518": [
        "CROSS RIVER",
        "NY"
    ],
    "10519": [
        "CROTON FALLS",
        "NY"
    ],
    "10520": [
        "CROTON ON HUDSON",
        "NY"
    ],
    "10521": [
        "CROTON ON HUDSON",
        "NY"
    ],
    "10522": [
        "DOBBS FERRY",
        "NY"
    ],
    "10523": [
        "ELMSFORD",
        "NY"
    ],
    "10524": [
        "GARRISON",
        "NY"
    ],
    "10526": [
        "GOLDENS BRIDGE",
        "NY"
    ],
    "10527": [
        "GRANITE SPRINGS",
        "NY"
    ],
    "10528": [
        "HARRISON",
        "NY"
    ],
    "10530": [
        "HARTSDALE",
        "NY"
    ],
    "10532": [
        "HAWTHORNE",
        "NY"
    ],
    "10533": [
        "IRVINGTON",
        "NY"
    ],
    "10535": [
        "JEFFERSON VALLEY",
        "NY"
    ],
    "10536": [
        "KATONAH",
        "NY"
    ],
    "10537": [
        "LAKE PEEKSKILL",
        "NY"
    ],
    "10538": [
        "LARCHMONT",
        "NY"
    ],
    "10540": [
        "LINCOLNDALE",
        "NY"
    ],
    "10541": [
        "MAHOPAC",
        "NY"
    ],
    "10542": [
        "MAHOPAC FALLS",
        "NY"
    ],
    "10543": [
        "MAMARONECK",
        "NY"
    ],
    "10545": [
        "MARYKNOLL",
        "NY"
    ],
    "10546": [
        "MILLWOOD",
        "NY"
    ],
    "10547": [
        "MOHEGAN LAKE",
        "NY"
    ],
    "10548": [
        "MONTROSE",
        "NY"
    ],
    "10549": [
        "MOUNT KISCO",
        "NY"
    ],
    "10550": [
        "MOUNT VERNON",
        "NY"
    ],
    "10551": [
        "MOUNT VERNON",
        "NY"
    ],
    "10552": [
        "MOUNT VERNON",
        "NY"
    ],
    "10553": [
        "MOUNT VERNON",
        "NY"
    ],
    "10560": [
        "NORTH SALEM",
        "NY"
    ],
    "10562": [
        "OSSINING",
        "NY"
    ],
    "10566": [
        "PEEKSKILL",
        "NY"
    ],
    "10567": [
        "CORTLANDT MANOR",
        "NY"
    ],
    "10570": [
        "PLEASANTVILLE",
        "NY"
    ],
    "10573": [
        "PORT CHESTER",
        "NY"
    ],
    "10576": [
        "POUND RIDGE",
        "NY"
    ],
    "10577": [
        "PURCHASE",
        "NY"
    ],
    "10578": [
        "PURDYS",
        "NY"
    ],
    "10579": [
        "PUTNAM VALLEY",
        "NY"
    ],
    "10580": [
        "RYE",
        "NY"
    ],
    "10583": [
        "SCARSDALE",
        "NY"
    ],
    "10587": [
        "SHENOROCK",
        "NY"
    ],
    "10588": [
        "SHRUB OAK",
        "NY"
    ],
    "10589": [
        "SOMERS",
        "NY"
    ],
    "10590": [
        "SOUTH SALEM",
        "NY"
    ],
    "10591": [
        "TARRYTOWN",
        "NY"
    ],
    "10594": [
        "THORNWOOD",
        "NY"
    ],
    "10595": [
        "VALHALLA",
        "NY"
    ],
    "10596": [
        "VERPLANCK",
        "NY"
    ],
    "10597": [
        "WACCABUC",
        "NY"
    ],
    "10598": [
        "YORKTOWN HEIGHTS",
        "NY"
    ],
    "10601": [
        "WHITE PLAINS",
        "NY"
    ],
    "10602": [
        "WHITE PLAINS",
        "NY"
    ],
    "10603": [
        "WHITE PLAINS",
        "NY"
    ],
    "10604": [
        "WEST HARRISON",
        "NY"
    ],
    "10605": [
        "WHITE PLAINS",
        "NY"
    ],
    "10606": [
        "WHITE PLAINS",
        "NY"
    ],
    "10607": [
        "WHITE PLAINS",
        "NY"
    ],
    "10610": [
        "WHITE PLAINS",
        "NY"
    ],
    "10701": [
        "YONKERS",
        "NY"
    ],
    "10702": [
        "YONKERS",
        "NY"
    ],
    "10703": [
        "YONKERS",
        "NY"
    ],
    "10704": [
        "YONKERS",
        "NY"
    ],
    "10705": [
        "YONKERS",
        "NY"
    ],
    "10706": [
        "HASTINGS ON HUDSON",
        "NY"
    ],
    "10707": [
        "TUCKAHOE",
        "NY"
    ],
    "10708": [
        "BRONXVILLE",
        "NY"
    ],
    "10709": [
        "EASTCHESTER",
        "NY"
    ],
    "10710": [
        "YONKERS",
        "NY"
    ],
    "10801": [
        "NEW ROCHELLE",
        "NY"
    ],
    "10802": [
        "NEW ROCHELLE",
        "NY"
    ],
    "10803": [
        "PELHAM",
        "NY"
    ],
    "10804": [
        "NEW ROCHELLE",
        "NY"
    ],
    "10805": [
        "NEW ROCHELLE",
        "NY"
    ],
    "10901": [
        "SUFFERN",
        "NY"
    ],
    "10910": [
        "ARDEN",
        "NY"
    ],
    "10911": [
        "BEAR MOUNTAIN",
        "NY"
    ],
    "10912": [
        "BELLVALE",
        "NY"
    ],
    "10913": [
        "BLAUVELT",
        "NY"
    ],
    "10914": [
        "BLOOMING GROVE",
        "NY"
    ],
    "10915": [
        "BULLVILLE",
        "NY"
    ],
    "10916": [
        "CAMPBELL HALL",
        "NY"
    ],
    "10917": [
        "CENTRAL VALLEY",
        "NY"
    ],
    "10918": [
        "CHESTER",
        "NY"
    ],
    "10919": [
        "CIRCLEVILLE",
        "NY"
    ],
    "10920": [
        "CONGERS",
        "NY"
    ],
    "10921": [
        "FLORIDA",
        "NY"
    ],
    "10922": [
        "FORT MONTGOMERY",
        "NY"
    ],
    "10923": [
        "GARNERVILLE",
        "NY"
    ],
    "10924": [
        "GOSHEN",
        "NY"
    ],
    "10925": [
        "GREENWOOD LAKE",
        "NY"
    ],
    "10926": [
        "HARRIMAN",
        "NY"
    ],
    "10927": [
        "HAVERSTRAW",
        "NY"
    ],
    "10928": [
        "HIGHLAND FALLS",
        "NY"
    ],
    "10930": [
        "HIGHLAND MILLS",
        "NY"
    ],
    "10931": [
        "HILLBURN",
        "NY"
    ],
    "10932": [
        "HOWELLS",
        "NY"
    ],
    "10933": [
        "JOHNSON",
        "NY"
    ],
    "10940": [
        "MIDDLETOWN",
        "NY"
    ],
    "10941": [
        "MIDDLETOWN",
        "NY"
    ],
    "10949": [
        "MONROE",
        "NY"
    ],
    "10950": [
        "MONROE",
        "NY"
    ],
    "10952": [
        "MONSEY",
        "NY"
    ],
    "10953": [
        "MOUNTAINVILLE",
        "NY"
    ],
    "10954": [
        "NANUET",
        "NY"
    ],
    "10956": [
        "NEW CITY",
        "NY"
    ],
    "10958": [
        "NEW HAMPTON",
        "NY"
    ],
    "10959": [
        "NEW MILFORD",
        "NY"
    ],
    "10960": [
        "NYACK",
        "NY"
    ],
    "10962": [
        "ORANGEBURG",
        "NY"
    ],
    "10963": [
        "OTISVILLE",
        "NY"
    ],
    "10964": [
        "PALISADES",
        "NY"
    ],
    "10965": [
        "PEARL RIVER",
        "NY"
    ],
    "10968": [
        "PIERMONT",
        "NY"
    ],
    "10969": [
        "PINE ISLAND",
        "NY"
    ],
    "10970": [
        "POMONA",
        "NY"
    ],
    "10973": [
        "SLATE HILL",
        "NY"
    ],
    "10974": [
        "SLOATSBURG",
        "NY"
    ],
    "10975": [
        "SOUTHFIELDS",
        "NY"
    ],
    "10976": [
        "SPARKILL",
        "NY"
    ],
    "10977": [
        "SPRING VALLEY",
        "NY"
    ],
    "10979": [
        "STERLING FOREST",
        "NY"
    ],
    "10980": [
        "STONY POINT",
        "NY"
    ],
    "10981": [
        "SUGAR LOAF",
        "NY"
    ],
    "10982": [
        "TALLMAN",
        "NY"
    ],
    "10983": [
        "TAPPAN",
        "NY"
    ],
    "10984": [
        "THIELLS",
        "NY"
    ],
    "10985": [
        "THOMPSON RIDGE",
        "NY"
    ],
    "10986": [
        "TOMKINS COVE",
        "NY"
    ],
    "10987": [
        "TUXEDO PARK",
        "NY"
    ],
    "10988": [
        "UNIONVILLE",
        "NY"
    ],
    "10989": [
        "VALLEY COTTAGE",
        "NY"
    ],
    "10990": [
        "WARWICK",
        "NY"
    ],
    "10992": [
        "WASHINGTONVILLE",
        "NY"
    ],
    "10993": [
        "WEST HAVERSTRAW",
        "NY"
    ],
    "10994": [
        "WEST NYACK",
        "NY"
    ],
    "10996": [
        "WEST POINT",
        "NY"
    ],
    "10998": [
        "WESTTOWN",
        "NY"
    ],
    "11001": [
        "FLORAL PARK",
        "NY"
    ],
    "11002": [
        "FLORAL PARK",
        "NY"
    ],
    "11003": [
        "ELMONT",
        "NY"
    ],
    "11004": [
        "GLEN OAKS",
        "NY"
    ],
    "11005": [
        "FLORAL PARK",
        "NY"
    ],
    "11010": [
        "FRANKLIN SQUARE",
        "NY"
    ],
    "11020": [
        "GREAT NECK",
        "NY"
    ],
    "11021": [
        "GREAT NECK",
        "NY"
    ],
    "11022": [
        "GREAT NECK",
        "NY"
    ],
    "11023": [
        "GREAT NECK",
        "NY"
    ],
    "11024": [
        "GREAT NECK",
        "NY"
    ],
    "11026": [
        "GREAT NECK",
        "NY"
    ],
    "11027": [
        "GREAT NECK",
        "NY"
    ],
    "11030": [
        "MANHASSET",
        "NY"
    ],
    "11040": [
        "NEW HYDE PARK",
        "NY"
    ],
    "11042": [
        "NEW HYDE PARK",
        "NY"
    ],
    "11050": [
        "PORT WASHINGTON",
        "NY"
    ],
    "11051": [
        "PORT WASHINGTON",
        "NY"
    ],
    "11052": [
        "PORT WASHINGTON",
        "NY"
    ],
    "11055": [
        "PORT WASHINGTON",
        "NY"
    ],
    "11096": [
        "INWOOD",
        "NY"
    ],
    "11101": [
        "LONG ISLAND CITY",
        "NY"
    ],
    "11102": [
        "ASTORIA",
        "NY"
    ],
    "11103": [
        "ASTORIA",
        "NY"
    ],
    "11104": [
        "SUNNYSIDE",
        "NY"
    ],
    "11105": [
        "ASTORIA",
        "NY"
    ],
    "11106": [
        "ASTORIA",
        "NY"
    ],
    "11109": [
        "LONG ISLAND CITY",
        "NY"
    ],
    "11120": [
        "LONG ISLAND CITY",
        "NY"
    ],
    "11201": [
        "BROOKLYN",
        "NY"
    ],
    "11202": [
        "BROOKLYN",
        "NY"
    ],
    "11203": [
        "BROOKLYN",
        "NY"
    ],
    "11204": [
        "BROOKLYN",
        "NY"
    ],
    "11205": [
        "BROOKLYN",
        "NY"
    ],
    "11206": [
        "BROOKLYN",
        "NY"
    ],
    "11207": [
        "BROOKLYN",
        "NY"
    ],
    "11208": [
        "BROOKLYN",
        "NY"
    ],
    "11209": [
        "BROOKLYN",
        "NY"
    ],
    "11210": [
        "BROOKLYN",
        "NY"
    ],
    "11211": [
        "BROOKLYN",
        "NY"
    ],
    "11212": [
        "BROOKLYN",
        "NY"
    ],
    "11213": [
        "BROOKLYN",
        "NY"
    ],
    "11214": [
        "BROOKLYN",
        "NY"
    ],
    "11215": [
        "BROOKLYN",
        "NY"
    ],
    "11216": [
        "BROOKLYN",
        "NY"
    ],
    "11217": [
        "BROOKLYN",
        "NY"
    ],
    "11218": [
        "BROOKLYN",
        "NY"
    ],
    "11219": [
        "BROOKLYN",
        "NY"
    ],
    "11220": [
        "BROOKLYN",
        "NY"
    ],
    "11221": [
        "BROOKLYN",
        "NY"
    ],
    "11222": [
        "BROOKLYN",
        "NY"
    ],
    "11223": [
        "BROOKLYN",
        "NY"
    ],
    "11224": [
        "BROOKLYN",
        "NY"
    ],
    "11225": [
        "BROOKLYN",
        "NY"
    ],
    "11226": [
        "BROOKLYN",
        "NY"
    ],
    "11228": [
        "BROOKLYN",
        "NY"
    ],
    "11229": [
        "BROOKLYN",
        "NY"
    ],
    "11230": [
        "BROOKLYN",
        "NY"
    ],
    "11231": [
        "BROOKLYN",
        "NY"
    ],
    "11232": [
        "BROOKLYN",
        "NY"
    ],
    "11233": [
        "BROOKLYN",
        "NY"
    ],
    "11234": [
        "BROOKLYN",
        "NY"
    ],
    "11235": [
        "BROOKLYN",
        "NY"
    ],
    "11236": [
        "BROOKLYN",
        "NY"
    ],
    "11237": [
        "BROOKLYN",
        "NY"
    ],
    "11238": [
        "BROOKLYN",
        "NY"
    ],
    "11239": [
        "BROOKLYN",
        "NY"
    ],
    "11241": [
        "BROOKLYN",
        "NY"
    ],
    "11242": [
        "BROOKLYN",
        "NY"
    ],
    "11243": [
        "BROOKLYN",
        "NY"
    ],
    "11245": [
        "BROOKLYN",
        "NY"
    ],
    "11247": [
        "BROOKLYN",
        "NY"
    ],
    "11249": [
        "BROOKLYN",
        "NY"
    ],
    "11251": [
        "BROOKLYN",
        "NY"
    ],
    "11252": [
        "BROOKLYN",
        "NY"
    ],
    "11256": [
        "BROOKLYN",
        "NY"
    ],
    "11351": [
        "FLUSHING",
        "NY"
    ],
    "11352": [
        "FLUSHING",
        "NY"
    ],
    "11354": [
        "FLUSHING",
        "NY"
    ],
    "11355": [
        "FLUSHING",
        "NY"
    ],
    "11356": [
        "COLLEGE POINT",
        "NY"
    ],
    "11357": [
        "WHITESTONE",
        "NY"
    ],
    "11358": [
        "FLUSHING",
        "NY"
    ],
    "11359": [
        "BAYSIDE",
        "NY"
    ],
    "11360": [
        "BAYSIDE",
        "NY"
    ],
    "11361": [
        "BAYSIDE",
        "NY"
    ],
    "11362": [
        "LITTLE NECK",
        "NY"
    ],
    "11363": [
        "LITTLE NECK",
        "NY"
    ],
    "11364": [
        "OAKLAND GARDENS",
        "NY"
    ],
    "11365": [
        "FRESH MEADOWS",
        "NY"
    ],
    "11366": [
        "FRESH MEADOWS",
        "NY"
    ],
    "11367": [
        "FLUSHING",
        "NY"
    ],
    "11368": [
        "CORONA",
        "NY"
    ],
    "11369": [
        "EAST ELMHURST",
        "NY"
    ],
    "11370": [
        "EAST ELMHURST",
        "NY"
    ],
    "11371": [
        "FLUSHING",
        "NY"
    ],
    "11372": [
        "JACKSON HEIGHTS",
        "NY"
    ],
    "11373": [
        "ELMHURST",
        "NY"
    ],
    "11374": [
        "REGO PARK",
        "NY"
    ],
    "11375": [
        "FOREST HILLS",
        "NY"
    ],
    "11377": [
        "WOODSIDE",
        "NY"
    ],
    "11378": [
        "MASPETH",
        "NY"
    ],
    "11379": [
        "MIDDLE VILLAGE",
        "NY"
    ],
    "11380": [
        "ELMHURST",
        "NY"
    ],
    "11385": [
        "RIDGEWOOD",
        "NY"
    ],
    "11386": [
        "RIDGEWOOD",
        "NY"
    ],
    "11405": [
        "JAMAICA",
        "NY"
    ],
    "11411": [
        "CAMBRIA HEIGHTS",
        "NY"
    ],
    "11412": [
        "SAINT ALBANS",
        "NY"
    ],
    "11413": [
        "SPRINGFIELD GARDENS",
        "NY"
    ],
    "11414": [
        "HOWARD BEACH",
        "NY"
    ],
    "11415": [
        "KEW GARDENS",
        "NY"
    ],
    "11416": [
        "OZONE PARK",
        "NY"
    ],
    "11417": [
        "OZONE PARK",
        "NY"
    ],
    "11418": [
        "RICHMOND HILL",
        "NY"
    ],
    "11419": [
        "SOUTH RICHMOND HILL",
        "NY"
    ],
    "11420": [
        "SOUTH OZONE PARK",
        "NY"
    ],
    "11421": [
        "WOODHAVEN",
        "NY"
    ],
    "11422": [
        "ROSEDALE",
        "NY"
    ],
    "11423": [
        "HOLLIS",
        "NY"
    ],
    "11424": [
        "JAMAICA",
        "NY"
    ],
    "11425": [
        "JAMAICA",
        "NY"
    ],
    "11426": [
        "BELLEROSE",
        "NY"
    ],
    "11427": [
        "QUEENS VILLAGE",
        "NY"
    ],
    "11428": [
        "QUEENS VILLAGE",
        "NY"
    ],
    "11429": [
        "QUEENS VILLAGE",
        "NY"
    ],
    "11430": [
        "JAMAICA",
        "NY"
    ],
    "11431": [
        "JAMAICA",
        "NY"
    ],
    "11432": [
        "JAMAICA",
        "NY"
    ],
    "11433": [
        "JAMAICA",
        "NY"
    ],
    "11434": [
        "JAMAICA",
        "NY"
    ],
    "11435": [
        "JAMAICA",
        "NY"
    ],
    "11436": [
        "JAMAICA",
        "NY"
    ],
    "11439": [
        "JAMAICA",
        "NY"
    ],
    "11451": [
        "JAMAICA",
        "NY"
    ],
    "11501": [
        "MINEOLA",
        "NY"
    ],
    "11507": [
        "ALBERTSON",
        "NY"
    ],
    "11509": [
        "ATLANTIC BEACH",
        "NY"
    ],
    "11510": [
        "BALDWIN",
        "NY"
    ],
    "11514": [
        "CARLE PLACE",
        "NY"
    ],
    "11516": [
        "CEDARHURST",
        "NY"
    ],
    "11518": [
        "EAST ROCKAWAY",
        "NY"
    ],
    "11520": [
        "FREEPORT",
        "NY"
    ],
    "11530": [
        "GARDEN CITY",
        "NY"
    ],
    "11531": [
        "GARDEN CITY",
        "NY"
    ],
    "11542": [
        "GLEN COVE",
        "NY"
    ],
    "11545": [
        "GLEN HEAD",
        "NY"
    ],
    "11547": [
        "GLENWOOD LANDING",
        "NY"
    ],
    "11548": [
        "GREENVALE",
        "NY"
    ],
    "11549": [
        "HEMPSTEAD",
        "NY"
    ],
    "11550": [
        "HEMPSTEAD",
        "NY"
    ],
    "11551": [
        "HEMPSTEAD",
        "NY"
    ],
    "11552": [
        "WEST HEMPSTEAD",
        "NY"
    ],
    "11553": [
        "UNIONDALE",
        "NY"
    ],
    "11554": [
        "EAST MEADOW",
        "NY"
    ],
    "11555": [
        "UNIONDALE",
        "NY"
    ],
    "11556": [
        "UNIONDALE",
        "NY"
    ],
    "11557": [
        "HEWLETT",
        "NY"
    ],
    "11558": [
        "ISLAND PARK",
        "NY"
    ],
    "11559": [
        "LAWRENCE",
        "NY"
    ],
    "11560": [
        "LOCUST VALLEY",
        "NY"
    ],
    "11561": [
        "LONG BEACH",
        "NY"
    ],
    "11563": [
        "LYNBROOK",
        "NY"
    ],
    "11565": [
        "MALVERNE",
        "NY"
    ],
    "11566": [
        "MERRICK",
        "NY"
    ],
    "11568": [
        "OLD WESTBURY",
        "NY"
    ],
    "11569": [
        "POINT LOOKOUT",
        "NY"
    ],
    "11570": [
        "ROCKVILLE CENTRE",
        "NY"
    ],
    "11571": [
        "ROCKVILLE CENTRE",
        "NY"
    ],
    "11572": [
        "OCEANSIDE",
        "NY"
    ],
    "11575": [
        "ROOSEVELT",
        "NY"
    ],
    "11576": [
        "ROSLYN",
        "NY"
    ],
    "11577": [
        "ROSLYN HEIGHTS",
        "NY"
    ],
    "11579": [
        "SEA CLIFF",
        "NY"
    ],
    "11580": [
        "VALLEY STREAM",
        "NY"
    ],
    "11581": [
        "VALLEY STREAM",
        "NY"
    ],
    "11582": [
        "VALLEY STREAM",
        "NY"
    ],
    "11590": [
        "WESTBURY",
        "NY"
    ],
    "11596": [
        "WILLISTON PARK",
        "NY"
    ],
    "11598": [
        "WOODMERE",
        "NY"
    ],
    "11599": [
        "GARDEN CITY",
        "NY"
    ],
    "11690": [
        "FAR ROCKAWAY",
        "NY"
    ],
    "11691": [
        "FAR ROCKAWAY",
        "NY"
    ],
    "11692": [
        "ARVERNE",
        "NY"
    ],
    "11693": [
        "FAR ROCKAWAY",
        "NY"
    ],
    "11694": [
        "ROCKAWAY PARK",
        "NY"
    ],
    "11695": [
        "FAR ROCKAWAY",
        "NY"
    ],
    "11697": [
        "BREEZY POINT",
        "NY"
    ],
    "11701": [
        "AMITYVILLE",
        "NY"
    ],
    "11702": [
        "BABYLON",
        "NY"
    ],
    "11703": [
        "NORTH BABYLON",
        "NY"
    ],
    "11704": [
        "WEST BABYLON",
        "NY"
    ],
    "11705": [
        "BAYPORT",
        "NY"
    ],
    "11706": [
        "BAY SHORE",
        "NY"
    ],
    "11707": [
        "WEST BABYLON",
        "NY"
    ],
    "11709": [
        "BAYVILLE",
        "NY"
    ],
    "11710": [
        "BELLMORE",
        "NY"
    ],
    "11713": [
        "BELLPORT",
        "NY"
    ],
    "11714": [
        "BETHPAGE",
        "NY"
    ],
    "11715": [
        "BLUE POINT",
        "NY"
    ],
    "11716": [
        "BOHEMIA",
        "NY"
    ],
    "11717": [
        "BRENTWOOD",
        "NY"
    ],
    "11718": [
        "BRIGHTWATERS",
        "NY"
    ],
    "11719": [
        "BROOKHAVEN",
        "NY"
    ],
    "11720": [
        "CENTEREACH",
        "NY"
    ],
    "11721": [
        "CENTERPORT",
        "NY"
    ],
    "11722": [
        "CENTRAL ISLIP",
        "NY"
    ],
    "11724": [
        "COLD SPRING HARBOR",
        "NY"
    ],
    "11725": [
        "COMMACK",
        "NY"
    ],
    "11726": [
        "COPIAGUE",
        "NY"
    ],
    "11727": [
        "CORAM",
        "NY"
    ],
    "11729": [
        "DEER PARK",
        "NY"
    ],
    "11730": [
        "EAST ISLIP",
        "NY"
    ],
    "11731": [
        "EAST NORTHPORT",
        "NY"
    ],
    "11732": [
        "EAST NORWICH",
        "NY"
    ],
    "11733": [
        "EAST SETAUKET",
        "NY"
    ],
    "11735": [
        "FARMINGDALE",
        "NY"
    ],
    "11738": [
        "FARMINGVILLE",
        "NY"
    ],
    "11739": [
        "GREAT RIVER",
        "NY"
    ],
    "11740": [
        "GREENLAWN",
        "NY"
    ],
    "11741": [
        "HOLBROOK",
        "NY"
    ],
    "11742": [
        "HOLTSVILLE",
        "NY"
    ],
    "11743": [
        "HUNTINGTON",
        "NY"
    ],
    "11746": [
        "HUNTINGTON STATION",
        "NY"
    ],
    "11747": [
        "MELVILLE",
        "NY"
    ],
    "11749": [
        "ISLANDIA",
        "NY"
    ],
    "11751": [
        "ISLIP",
        "NY"
    ],
    "11752": [
        "ISLIP TERRACE",
        "NY"
    ],
    "11753": [
        "JERICHO",
        "NY"
    ],
    "11754": [
        "KINGS PARK",
        "NY"
    ],
    "11755": [
        "LAKE GROVE",
        "NY"
    ],
    "11756": [
        "LEVITTOWN",
        "NY"
    ],
    "11757": [
        "LINDENHURST",
        "NY"
    ],
    "11758": [
        "MASSAPEQUA",
        "NY"
    ],
    "11760": [
        "MELVILLE",
        "NY"
    ],
    "11762": [
        "MASSAPEQUA PARK",
        "NY"
    ],
    "11763": [
        "MEDFORD",
        "NY"
    ],
    "11764": [
        "MILLER PLACE",
        "NY"
    ],
    "11765": [
        "MILL NECK",
        "NY"
    ],
    "11766": [
        "MOUNT SINAI",
        "NY"
    ],
    "11767": [
        "NESCONSET",
        "NY"
    ],
    "11768": [
        "NORTHPORT",
        "NY"
    ],
    "11769": [
        "OAKDALE",
        "NY"
    ],
    "11770": [
        "OCEAN BEACH",
        "NY"
    ],
    "11771": [
        "OYSTER BAY",
        "NY"
    ],
    "11772": [
        "PATCHOGUE",
        "NY"
    ],
    "11773": [
        "SYOSSET",
        "NY"
    ],
    "11776": [
        "PORT JEFFERSON STATION",
        "NY"
    ],
    "11777": [
        "PORT JEFFERSON",
        "NY"
    ],
    "11778": [
        "ROCKY POINT",
        "NY"
    ],
    "11779": [
        "RONKONKOMA",
        "NY"
    ],
    "11780": [
        "SAINT JAMES",
        "NY"
    ],
    "11782": [
        "SAYVILLE",
        "NY"
    ],
    "11783": [
        "SEAFORD",
        "NY"
    ],
    "11784": [
        "SELDEN",
        "NY"
    ],
    "11786": [
        "SHOREHAM",
        "NY"
    ],
    "11787": [
        "SMITHTOWN",
        "NY"
    ],
    "11788": [
        "HAUPPAUGE",
        "NY"
    ],
    "11789": [
        "SOUND BEACH",
        "NY"
    ],
    "11790": [
        "STONY BROOK",
        "NY"
    ],
    "11791": [
        "SYOSSET",
        "NY"
    ],
    "11792": [
        "WADING RIVER",
        "NY"
    ],
    "11793": [
        "WANTAGH",
        "NY"
    ],
    "11794": [
        "STONY BROOK",
        "NY"
    ],
    "11795": [
        "WEST ISLIP",
        "NY"
    ],
    "11796": [
        "WEST SAYVILLE",
        "NY"
    ],
    "11797": [
        "WOODBURY",
        "NY"
    ],
    "11798": [
        "WYANDANCH",
        "NY"
    ],
    "11801": [
        "HICKSVILLE",
        "NY"
    ],
    "11802": [
        "HICKSVILLE",
        "NY"
    ],
    "11803": [
        "PLAINVIEW",
        "NY"
    ],
    "11804": [
        "OLD BETHPAGE",
        "NY"
    ],
    "11815": [
        "HICKSVILLE",
        "NY"
    ],
    "11853": [
        "JERICHO",
        "NY"
    ],
    "11901": [
        "RIVERHEAD",
        "NY"
    ],
    "11930": [
        "AMAGANSETT",
        "NY"
    ],
    "11931": [
        "AQUEBOGUE",
        "NY"
    ],
    "11932": [
        "BRIDGEHAMPTON",
        "NY"
    ],
    "11933": [
        "CALVERTON",
        "NY"
    ],
    "11934": [
        "CENTER MORICHES",
        "NY"
    ],
    "11935": [
        "CUTCHOGUE",
        "NY"
    ],
    "11937": [
        "EAST HAMPTON",
        "NY"
    ],
    "11939": [
        "EAST MARION",
        "NY"
    ],
    "11940": [
        "EAST MORICHES",
        "NY"
    ],
    "11941": [
        "EASTPORT",
        "NY"
    ],
    "11942": [
        "EAST QUOGUE",
        "NY"
    ],
    "11944": [
        "GREENPORT",
        "NY"
    ],
    "11946": [
        "HAMPTON BAYS",
        "NY"
    ],
    "11947": [
        "JAMESPORT",
        "NY"
    ],
    "11948": [
        "LAUREL",
        "NY"
    ],
    "11949": [
        "MANORVILLE",
        "NY"
    ],
    "11950": [
        "MASTIC",
        "NY"
    ],
    "11951": [
        "MASTIC BEACH",
        "NY"
    ],
    "11952": [
        "MATTITUCK",
        "NY"
    ],
    "11953": [
        "MIDDLE ISLAND",
        "NY"
    ],
    "11954": [
        "MONTAUK",
        "NY"
    ],
    "11955": [
        "MORICHES",
        "NY"
    ],
    "11956": [
        "NEW SUFFOLK",
        "NY"
    ],
    "11957": [
        "ORIENT",
        "NY"
    ],
    "11958": [
        "PECONIC",
        "NY"
    ],
    "11959": [
        "QUOGUE",
        "NY"
    ],
    "11960": [
        "REMSENBURG",
        "NY"
    ],
    "11961": [
        "RIDGE",
        "NY"
    ],
    "11962": [
        "SAGAPONACK",
        "NY"
    ],
    "11963": [
        "SAG HARBOR",
        "NY"
    ],
    "11964": [
        "SHELTER ISLAND",
        "NY"
    ],
    "11965": [
        "SHELTER ISLAND HEIGHTS",
        "NY"
    ],
    "11967": [
        "SHIRLEY",
        "NY"
    ],
    "11968": [
        "SOUTHAMPTON",
        "NY"
    ],
    "11969": [
        "SOUTHAMPTON",
        "NY"
    ],
    "11970": [
        "SOUTH JAMESPORT",
        "NY"
    ],
    "11971": [
        "SOUTHOLD",
        "NY"
    ],
    "11972": [
        "SPEONK",
        "NY"
    ],
    "11973": [
        "UPTON",
        "NY"
    ],
    "11975": [
        "WAINSCOTT",
        "NY"
    ],
    "11976": [
        "WATER MILL",
        "NY"
    ],
    "11977": [
        "WESTHAMPTON",
        "NY"
    ],
    "11978": [
        "WESTHAMPTON BEACH",
        "NY"
    ],
    "11980": [
        "YAPHANK",
        "NY"
    ],
    "12007": [
        "ALCOVE",
        "NY"
    ],
    "12008": [
        "ALPLAUS",
        "NY"
    ],
    "12009": [
        "ALTAMONT",
        "NY"
    ],
    "12010": [
        "AMSTERDAM",
        "NY"
    ],
    "12015": [
        "ATHENS",
        "NY"
    ],
    "12017": [
        "AUSTERLITZ",
        "NY"
    ],
    "12018": [
        "AVERILL PARK",
        "NY"
    ],
    "12019": [
        "BALLSTON LAKE",
        "NY"
    ],
    "12020": [
        "BALLSTON SPA",
        "NY"
    ],
    "12022": [
        "BERLIN",
        "NY"
    ],
    "12023": [
        "BERNE",
        "NY"
    ],
    "12024": [
        "BRAINARD",
        "NY"
    ],
    "12025": [
        "BROADALBIN",
        "NY"
    ],
    "12027": [
        "BURNT HILLS",
        "NY"
    ],
    "12028": [
        "BUSKIRK",
        "NY"
    ],
    "12029": [
        "CANAAN",
        "NY"
    ],
    "12031": [
        "CARLISLE",
        "NY"
    ],
    "12032": [
        "CAROGA LAKE",
        "NY"
    ],
    "12033": [
        "CASTLETON ON HUDSON",
        "NY"
    ],
    "12035": [
        "CENTRAL BRIDGE",
        "NY"
    ],
    "12036": [
        "CHARLOTTEVILLE",
        "NY"
    ],
    "12037": [
        "CHATHAM",
        "NY"
    ],
    "12040": [
        "CHERRY PLAIN",
        "NY"
    ],
    "12041": [
        "CLARKSVILLE",
        "NY"
    ],
    "12042": [
        "CLIMAX",
        "NY"
    ],
    "12043": [
        "COBLESKILL",
        "NY"
    ],
    "12045": [
        "COEYMANS",
        "NY"
    ],
    "12046": [
        "COEYMANS HOLLOW",
        "NY"
    ],
    "12047": [
        "COHOES",
        "NY"
    ],
    "12050": [
        "COLUMBIAVILLE",
        "NY"
    ],
    "12051": [
        "COXSACKIE",
        "NY"
    ],
    "12052": [
        "CROPSEYVILLE",
        "NY"
    ],
    "12053": [
        "DELANSON",
        "NY"
    ],
    "12054": [
        "DELMAR",
        "NY"
    ],
    "12055": [
        "DORMANSVILLE",
        "NY"
    ],
    "12056": [
        "DUANESBURG",
        "NY"
    ],
    "12057": [
        "EAGLE BRIDGE",
        "NY"
    ],
    "12058": [
        "EARLTON",
        "NY"
    ],
    "12059": [
        "EAST BERNE",
        "NY"
    ],
    "12060": [
        "EAST CHATHAM",
        "NY"
    ],
    "12061": [
        "EAST GREENBUSH",
        "NY"
    ],
    "12062": [
        "EAST NASSAU",
        "NY"
    ],
    "12063": [
        "EAST SCHODACK",
        "NY"
    ],
    "12064": [
        "EAST WORCESTER",
        "NY"
    ],
    "12065": [
        "CLIFTON PARK",
        "NY"
    ],
    "12066": [
        "ESPERANCE",
        "NY"
    ],
    "12067": [
        "FEURA BUSH",
        "NY"
    ],
    "12068": [
        "FONDA",
        "NY"
    ],
    "12069": [
        "FORT HUNTER",
        "NY"
    ],
    "12070": [
        "FORT JOHNSON",
        "NY"
    ],
    "12071": [
        "FULTONHAM",
        "NY"
    ],
    "12072": [
        "FULTONVILLE",
        "NY"
    ],
    "12073": [
        "GALLUPVILLE",
        "NY"
    ],
    "12074": [
        "GALWAY",
        "NY"
    ],
    "12075": [
        "GHENT",
        "NY"
    ],
    "12076": [
        "GILBOA",
        "NY"
    ],
    "12077": [
        "GLENMONT",
        "NY"
    ],
    "12078": [
        "GLOVERSVILLE",
        "NY"
    ],
    "12082": [
        "GRAFTON",
        "NY"
    ],
    "12083": [
        "GREENVILLE",
        "NY"
    ],
    "12084": [
        "GUILDERLAND",
        "NY"
    ],
    "12085": [
        "GUILDERLAND CENTER",
        "NY"
    ],
    "12086": [
        "HAGAMAN",
        "NY"
    ],
    "12087": [
        "HANNACROIX",
        "NY"
    ],
    "12089": [
        "HOOSICK",
        "NY"
    ],
    "12090": [
        "HOOSICK FALLS",
        "NY"
    ],
    "12092": [
        "HOWES CAVE",
        "NY"
    ],
    "12093": [
        "JEFFERSON",
        "NY"
    ],
    "12094": [
        "JOHNSONVILLE",
        "NY"
    ],
    "12095": [
        "JOHNSTOWN",
        "NY"
    ],
    "12106": [
        "KINDERHOOK",
        "NY"
    ],
    "12107": [
        "KNOX",
        "NY"
    ],
    "12108": [
        "LAKE PLEASANT",
        "NY"
    ],
    "12110": [
        "LATHAM",
        "NY"
    ],
    "12115": [
        "MALDEN BRIDGE",
        "NY"
    ],
    "12116": [
        "MARYLAND",
        "NY"
    ],
    "12117": [
        "MAYFIELD",
        "NY"
    ],
    "12118": [
        "MECHANICVILLE",
        "NY"
    ],
    "12120": [
        "MEDUSA",
        "NY"
    ],
    "12121": [
        "MELROSE",
        "NY"
    ],
    "12122": [
        "MIDDLEBURGH",
        "NY"
    ],
    "12123": [
        "NASSAU",
        "NY"
    ],
    "12124": [
        "NEW BALTIMORE",
        "NY"
    ],
    "12125": [
        "NEW LEBANON",
        "NY"
    ],
    "12128": [
        "NEWTONVILLE",
        "NY"
    ],
    "12130": [
        "NIVERVILLE",
        "NY"
    ],
    "12131": [
        "NORTH BLENHEIM",
        "NY"
    ],
    "12132": [
        "NORTH CHATHAM",
        "NY"
    ],
    "12133": [
        "NORTH HOOSICK",
        "NY"
    ],
    "12134": [
        "NORTHVILLE",
        "NY"
    ],
    "12136": [
        "OLD CHATHAM",
        "NY"
    ],
    "12137": [
        "PATTERSONVILLE",
        "NY"
    ],
    "12138": [
        "PETERSBURG",
        "NY"
    ],
    "12139": [
        "PISECO",
        "NY"
    ],
    "12140": [
        "POESTENKILL",
        "NY"
    ],
    "12141": [
        "QUAKER STREET",
        "NY"
    ],
    "12143": [
        "RAVENA",
        "NY"
    ],
    "12144": [
        "RENSSELAER",
        "NY"
    ],
    "12147": [
        "RENSSELAERVILLE",
        "NY"
    ],
    "12148": [
        "REXFORD",
        "NY"
    ],
    "12149": [
        "RICHMONDVILLE",
        "NY"
    ],
    "12150": [
        "ROTTERDAM JUNCTION",
        "NY"
    ],
    "12151": [
        "ROUND LAKE",
        "NY"
    ],
    "12153": [
        "SAND LAKE",
        "NY"
    ],
    "12154": [
        "SCHAGHTICOKE",
        "NY"
    ],
    "12155": [
        "SCHENEVUS",
        "NY"
    ],
    "12156": [
        "SCHODACK LANDING",
        "NY"
    ],
    "12157": [
        "SCHOHARIE",
        "NY"
    ],
    "12158": [
        "SELKIRK",
        "NY"
    ],
    "12159": [
        "SLINGERLANDS",
        "NY"
    ],
    "12160": [
        "SLOANSVILLE",
        "NY"
    ],
    "12161": [
        "SOUTH BETHLEHEM",
        "NY"
    ],
    "12164": [
        "SPECULATOR",
        "NY"
    ],
    "12165": [
        "SPENCERTOWN",
        "NY"
    ],
    "12166": [
        "SPRAKERS",
        "NY"
    ],
    "12167": [
        "STAMFORD",
        "NY"
    ],
    "12168": [
        "STEPHENTOWN",
        "NY"
    ],
    "12169": [
        "STEPHENTOWN",
        "NY"
    ],
    "12170": [
        "STILLWATER",
        "NY"
    ],
    "12172": [
        "STOTTVILLE",
        "NY"
    ],
    "12173": [
        "STUYVESANT",
        "NY"
    ],
    "12174": [
        "STUYVESANT FALLS",
        "NY"
    ],
    "12175": [
        "SUMMIT",
        "NY"
    ],
    "12176": [
        "SURPRISE",
        "NY"
    ],
    "12177": [
        "TRIBES HILL",
        "NY"
    ],
    "12180": [
        "TROY",
        "NY"
    ],
    "12181": [
        "TROY",
        "NY"
    ],
    "12182": [
        "TROY",
        "NY"
    ],
    "12183": [
        "TROY",
        "NY"
    ],
    "12184": [
        "VALATIE",
        "NY"
    ],
    "12185": [
        "VALLEY FALLS",
        "NY"
    ],
    "12186": [
        "VOORHEESVILLE",
        "NY"
    ],
    "12187": [
        "WARNERVILLE",
        "NY"
    ],
    "12188": [
        "WATERFORD",
        "NY"
    ],
    "12189": [
        "WATERVLIET",
        "NY"
    ],
    "12190": [
        "WELLS",
        "NY"
    ],
    "12192": [
        "WEST COXSACKIE",
        "NY"
    ],
    "12193": [
        "WESTERLO",
        "NY"
    ],
    "12194": [
        "WEST FULTON",
        "NY"
    ],
    "12195": [
        "WEST LEBANON",
        "NY"
    ],
    "12196": [
        "WEST SAND LAKE",
        "NY"
    ],
    "12197": [
        "WORCESTER",
        "NY"
    ],
    "12198": [
        "WYNANTSKILL",
        "NY"
    ],
    "12201": [
        "ALBANY",
        "NY"
    ],
    "12202": [
        "ALBANY",
        "NY"
    ],
    "12203": [
        "ALBANY",
        "NY"
    ],
    "12204": [
        "ALBANY",
        "NY"
    ],
    "12205": [
        "ALBANY",
        "NY"
    ],
    "12206": [
        "ALBANY",
        "NY"
    ],
    "12207": [
        "ALBANY",
        "NY"
    ],
    "12208": [
        "ALBANY",
        "NY"
    ],
    "12209": [
        "ALBANY",
        "NY"
    ],
    "12210": [
        "ALBANY",
        "NY"
    ],
    "12211": [
        "ALBANY",
        "NY"
    ],
    "12212": [
        "ALBANY",
        "NY"
    ],
    "12220": [
        "ALBANY",
        "NY"
    ],
    "12222": [
        "ALBANY",
        "NY"
    ],
    "12223": [
        "ALBANY",
        "NY"
    ],
    "12224": [
        "ALBANY",
        "NY"
    ],
    "12226": [
        "ALBANY",
        "NY"
    ],
    "12227": [
        "ALBANY",
        "NY"
    ],
    "12228": [
        "ALBANY",
        "NY"
    ],
    "12230": [
        "ALBANY",
        "NY"
    ],
    "12231": [
        "ALBANY",
        "NY"
    ],
    "12233": [
        "ALBANY",
        "NY"
    ],
    "12234": [
        "ALBANY",
        "NY"
    ],
    "12237": [
        "ALBANY",
        "NY"
    ],
    "12240": [
        "ALBANY",
        "NY"
    ],
    "12242": [
        "ALBANY",
        "NY"
    ],
    "12243": [
        "ALBANY",
        "NY"
    ],
    "12246": [
        "ALBANY",
        "NY"
    ],
    "12247": [
        "ALBANY",
        "NY"
    ],
    "12250": [
        "ALBANY",
        "NY"
    ],
    "12256": [
        "ALBANY",
        "NY"
    ],
    "12260": [
        "ALBANY",
        "NY"
    ],
    "12301": [
        "SCHENECTADY",
        "NY"
    ],
    "12302": [
        "SCHENECTADY",
        "NY"
    ],
    "12303": [
        "SCHENECTADY",
        "NY"
    ],
    "12304": [
        "SCHENECTADY",
        "NY"
    ],
    "12305": [
        "SCHENECTADY",
        "NY"
    ],
    "12306": [
        "SCHENECTADY",
        "NY"
    ],
    "12307": [
        "SCHENECTADY",
        "NY"
    ],
    "12308": [
        "SCHENECTADY",
        "NY"
    ],
    "12309": [
        "SCHENECTADY",
        "NY"
    ],
    "12325": [
        "SCHENECTADY",
        "NY"
    ],
    "12345": [
        "SCHENECTADY",
        "NY"
    ],
    "12401": [
        "KINGSTON",
        "NY"
    ],
    "12402": [
        "KINGSTON",
        "NY"
    ],
    "12404": [
        "ACCORD",
        "NY"
    ],
    "12405": [
        "ACRA",
        "NY"
    ],
    "12406": [
        "ARKVILLE",
        "NY"
    ],
    "12407": [
        "ASHLAND",
        "NY"
    ],
    "12409": [
        "BEARSVILLE",
        "NY"
    ],
    "12410": [
        "BIG INDIAN",
        "NY"
    ],
    "12411": [
        "BLOOMINGTON",
        "NY"
    ],
    "12412": [
        "BOICEVILLE",
        "NY"
    ],
    "12413": [
        "CAIRO",
        "NY"
    ],
    "12414": [
        "CATSKILL",
        "NY"
    ],
    "12416": [
        "CHICHESTER",
        "NY"
    ],
    "12417": [
        "CONNELLY",
        "NY"
    ],
    "12418": [
        "CORNWALLVILLE",
        "NY"
    ],
    "12419": [
        "COTTEKILL",
        "NY"
    ],
    "12420": [
        "CRAGSMOOR",
        "NY"
    ],
    "12421": [
        "DENVER",
        "NY"
    ],
    "12422": [
        "DURHAM",
        "NY"
    ],
    "12423": [
        "EAST DURHAM",
        "NY"
    ],
    "12424": [
        "EAST JEWETT",
        "NY"
    ],
    "12427": [
        "ELKA PARK",
        "NY"
    ],
    "12428": [
        "ELLENVILLE",
        "NY"
    ],
    "12429": [
        "ESOPUS",
        "NY"
    ],
    "12430": [
        "FLEISCHMANNS",
        "NY"
    ],
    "12431": [
        "FREEHOLD",
        "NY"
    ],
    "12432": [
        "GLASCO",
        "NY"
    ],
    "12433": [
        "GLENFORD",
        "NY"
    ],
    "12434": [
        "GRAND GORGE",
        "NY"
    ],
    "12435": [
        "GREENFIELD PARK",
        "NY"
    ],
    "12436": [
        "HAINES FALLS",
        "NY"
    ],
    "12438": [
        "HALCOTTSVILLE",
        "NY"
    ],
    "12439": [
        "HENSONVILLE",
        "NY"
    ],
    "12440": [
        "HIGH FALLS",
        "NY"
    ],
    "12441": [
        "HIGHMOUNT",
        "NY"
    ],
    "12442": [
        "HUNTER",
        "NY"
    ],
    "12443": [
        "HURLEY",
        "NY"
    ],
    "12444": [
        "JEWETT",
        "NY"
    ],
    "12446": [
        "KERHONKSON",
        "NY"
    ],
    "12448": [
        "LAKE HILL",
        "NY"
    ],
    "12449": [
        "LAKE KATRINE",
        "NY"
    ],
    "12450": [
        "LANESVILLE",
        "NY"
    ],
    "12451": [
        "LEEDS",
        "NY"
    ],
    "12452": [
        "LEXINGTON",
        "NY"
    ],
    "12453": [
        "MALDEN ON HUDSON",
        "NY"
    ],
    "12454": [
        "MAPLECREST",
        "NY"
    ],
    "12455": [
        "MARGARETVILLE",
        "NY"
    ],
    "12456": [
        "MOUNT MARION",
        "NY"
    ],
    "12457": [
        "MOUNT TREMPER",
        "NY"
    ],
    "12458": [
        "NAPANOCH",
        "NY"
    ],
    "12459": [
        "NEW KINGSTON",
        "NY"
    ],
    "12460": [
        "OAK HILL",
        "NY"
    ],
    "12461": [
        "OLIVEBRIDGE",
        "NY"
    ],
    "12463": [
        "PALENVILLE",
        "NY"
    ],
    "12464": [
        "PHOENICIA",
        "NY"
    ],
    "12465": [
        "PINE HILL",
        "NY"
    ],
    "12466": [
        "PORT EWEN",
        "NY"
    ],
    "12468": [
        "PRATTSVILLE",
        "NY"
    ],
    "12469": [
        "PRESTON HOLLOW",
        "NY"
    ],
    "12470": [
        "PURLING",
        "NY"
    ],
    "12471": [
        "RIFTON",
        "NY"
    ],
    "12472": [
        "ROSENDALE",
        "NY"
    ],
    "12473": [
        "ROUND TOP",
        "NY"
    ],
    "12474": [
        "ROXBURY",
        "NY"
    ],
    "12475": [
        "RUBY",
        "NY"
    ],
    "12477": [
        "SAUGERTIES",
        "NY"
    ],
    "12480": [
        "SHANDAKEN",
        "NY"
    ],
    "12481": [
        "SHOKAN",
        "NY"
    ],
    "12482": [
        "SOUTH CAIRO",
        "NY"
    ],
    "12483": [
        "SPRING GLEN",
        "NY"
    ],
    "12484": [
        "STONE RIDGE",
        "NY"
    ],
    "12485": [
        "TANNERSVILLE",
        "NY"
    ],
    "12486": [
        "TILLSON",
        "NY"
    ],
    "12487": [
        "ULSTER PARK",
        "NY"
    ],
    "12489": [
        "WAWARSING",
        "NY"
    ],
    "12490": [
        "WEST CAMP",
        "NY"
    ],
    "12491": [
        "WEST HURLEY",
        "NY"
    ],
    "12492": [
        "WEST KILL",
        "NY"
    ],
    "12493": [
        "WEST PARK",
        "NY"
    ],
    "12494": [
        "WEST SHOKAN",
        "NY"
    ],
    "12495": [
        "WILLOW",
        "NY"
    ],
    "12496": [
        "WINDHAM",
        "NY"
    ],
    "12498": [
        "WOODSTOCK",
        "NY"
    ],
    "12501": [
        "AMENIA",
        "NY"
    ],
    "12502": [
        "ANCRAM",
        "NY"
    ],
    "12503": [
        "ANCRAMDALE",
        "NY"
    ],
    "12504": [
        "ANNANDALE ON HUDSON",
        "NY"
    ],
    "12506": [
        "BANGALL",
        "NY"
    ],
    "12507": [
        "BARRYTOWN",
        "NY"
    ],
    "12508": [
        "BEACON",
        "NY"
    ],
    "12510": [
        "BILLINGS",
        "NY"
    ],
    "12511": [
        "CASTLE POINT",
        "NY"
    ],
    "12512": [
        "CHELSEA",
        "NY"
    ],
    "12513": [
        "CLAVERACK",
        "NY"
    ],
    "12514": [
        "CLINTON CORNERS",
        "NY"
    ],
    "12515": [
        "CLINTONDALE",
        "NY"
    ],
    "12516": [
        "COPAKE",
        "NY"
    ],
    "12517": [
        "COPAKE FALLS",
        "NY"
    ],
    "12518": [
        "CORNWALL",
        "NY"
    ],
    "12520": [
        "CORNWALL ON HUDSON",
        "NY"
    ],
    "12521": [
        "CRARYVILLE",
        "NY"
    ],
    "12522": [
        "DOVER PLAINS",
        "NY"
    ],
    "12523": [
        "ELIZAVILLE",
        "NY"
    ],
    "12524": [
        "FISHKILL",
        "NY"
    ],
    "12525": [
        "GARDINER",
        "NY"
    ],
    "12526": [
        "GERMANTOWN",
        "NY"
    ],
    "12527": [
        "GLENHAM",
        "NY"
    ],
    "12528": [
        "HIGHLAND",
        "NY"
    ],
    "12529": [
        "HILLSDALE",
        "NY"
    ],
    "12530": [
        "HOLLOWVILLE",
        "NY"
    ],
    "12531": [
        "HOLMES",
        "NY"
    ],
    "12533": [
        "HOPEWELL JUNCTION",
        "NY"
    ],
    "12534": [
        "HUDSON",
        "NY"
    ],
    "12537": [
        "HUGHSONVILLE",
        "NY"
    ],
    "12538": [
        "HYDE PARK",
        "NY"
    ],
    "12540": [
        "LAGRANGEVILLE",
        "NY"
    ],
    "12541": [
        "LIVINGSTON",
        "NY"
    ],
    "12542": [
        "MARLBORO",
        "NY"
    ],
    "12543": [
        "MAYBROOK",
        "NY"
    ],
    "12544": [
        "MELLENVILLE",
        "NY"
    ],
    "12545": [
        "MILLBROOK",
        "NY"
    ],
    "12546": [
        "MILLERTON",
        "NY"
    ],
    "12547": [
        "MILTON",
        "NY"
    ],
    "12548": [
        "MODENA",
        "NY"
    ],
    "12549": [
        "MONTGOMERY",
        "NY"
    ],
    "12550": [
        "NEWBURGH",
        "NY"
    ],
    "12551": [
        "NEWBURGH",
        "NY"
    ],
    "12552": [
        "NEWBURGH",
        "NY"
    ],
    "12553": [
        "NEW WINDSOR",
        "NY"
    ],
    "12555": [
        "NEWBURGH",
        "NY"
    ],
    "12561": [
        "NEW PALTZ",
        "NY"
    ],
    "12563": [
        "PATTERSON",
        "NY"
    ],
    "12564": [
        "PAWLING",
        "NY"
    ],
    "12565": [
        "PHILMONT",
        "NY"
    ],
    "12566": [
        "PINE BUSH",
        "NY"
    ],
    "12567": [
        "PINE PLAINS",
        "NY"
    ],
    "12568": [
        "PLATTEKILL",
        "NY"
    ],
    "12569": [
        "PLEASANT VALLEY",
        "NY"
    ],
    "12570": [
        "POUGHQUAG",
        "NY"
    ],
    "12571": [
        "RED HOOK",
        "NY"
    ],
    "12572": [
        "RHINEBECK",
        "NY"
    ],
    "12574": [
        "RHINECLIFF",
        "NY"
    ],
    "12575": [
        "ROCK TAVERN",
        "NY"
    ],
    "12577": [
        "SALISBURY MILLS",
        "NY"
    ],
    "12578": [
        "SALT POINT",
        "NY"
    ],
    "12580": [
        "STAATSBURG",
        "NY"
    ],
    "12581": [
        "STANFORDVILLE",
        "NY"
    ],
    "12582": [
        "STORMVILLE",
        "NY"
    ],
    "12583": [
        "TIVOLI",
        "NY"
    ],
    "12584": [
        "VAILS GATE",
        "NY"
    ],
    "12585": [
        "VERBANK",
        "NY"
    ],
    "12586": [
        "WALDEN",
        "NY"
    ],
    "12588": [
        "WALKER VALLEY",
        "NY"
    ],
    "12589": [
        "WALLKILL",
        "NY"
    ],
    "12590": [
        "WAPPINGERS FALLS",
        "NY"
    ],
    "12592": [
        "WASSAIC",
        "NY"
    ],
    "12594": [
        "WINGDALE",
        "NY"
    ],
    "12601": [
        "POUGHKEEPSIE",
        "NY"
    ],
    "12602": [
        "POUGHKEEPSIE",
        "NY"
    ],
    "12603": [
        "POUGHKEEPSIE",
        "NY"
    ],
    "12604": [
        "POUGHKEEPSIE",
        "NY"
    ],
    "12701": [
        "MONTICELLO",
        "NY"
    ],
    "12719": [
        "BARRYVILLE",
        "NY"
    ],
    "12720": [
        "BETHEL",
        "NY"
    ],
    "12721": [
        "BLOOMINGBURG",
        "NY"
    ],
    "12722": [
        "BURLINGHAM",
        "NY"
    ],
    "12723": [
        "CALLICOON",
        "NY"
    ],
    "12724": [
        "CALLICOON CENTER",
        "NY"
    ],
    "12725": [
        "CLARYVILLE",
        "NY"
    ],
    "12726": [
        "COCHECTON",
        "NY"
    ],
    "12727": [
        "COCHECTON CENTER",
        "NY"
    ],
    "12729": [
        "CUDDEBACKVILLE",
        "NY"
    ],
    "12732": [
        "ELDRED",
        "NY"
    ],
    "12733": [
        "FALLSBURG",
        "NY"
    ],
    "12734": [
        "FERNDALE",
        "NY"
    ],
    "12736": [
        "FREMONT CENTER",
        "NY"
    ],
    "12737": [
        "GLEN SPEY",
        "NY"
    ],
    "12738": [
        "GLEN WILD",
        "NY"
    ],
    "12740": [
        "GRAHAMSVILLE",
        "NY"
    ],
    "12741": [
        "HANKINS",
        "NY"
    ],
    "12742": [
        "HARRIS",
        "NY"
    ],
    "12743": [
        "HIGHLAND LAKE",
        "NY"
    ],
    "12745": [
        "HORTONVILLE",
        "NY"
    ],
    "12746": [
        "HUGUENOT",
        "NY"
    ],
    "12747": [
        "HURLEYVILLE",
        "NY"
    ],
    "12748": [
        "JEFFERSONVILLE",
        "NY"
    ],
    "12749": [
        "KAUNEONGA LAKE",
        "NY"
    ],
    "12750": [
        "KENOZA LAKE",
        "NY"
    ],
    "12751": [
        "KIAMESHA LAKE",
        "NY"
    ],
    "12752": [
        "LAKE HUNTINGTON",
        "NY"
    ],
    "12754": [
        "LIBERTY",
        "NY"
    ],
    "12758": [
        "LIVINGSTON MANOR",
        "NY"
    ],
    "12759": [
        "LOCH SHELDRAKE",
        "NY"
    ],
    "12760": [
        "LONG EDDY",
        "NY"
    ],
    "12762": [
        "MONGAUP VALLEY",
        "NY"
    ],
    "12763": [
        "MOUNTAIN DALE",
        "NY"
    ],
    "12764": [
        "NARROWSBURG",
        "NY"
    ],
    "12765": [
        "NEVERSINK",
        "NY"
    ],
    "12766": [
        "NORTH BRANCH",
        "NY"
    ],
    "12767": [
        "OBERNBURG",
        "NY"
    ],
    "12768": [
        "PARKSVILLE",
        "NY"
    ],
    "12770": [
        "POND EDDY",
        "NY"
    ],
    "12771": [
        "PORT JERVIS",
        "NY"
    ],
    "12775": [
        "ROCK HILL",
        "NY"
    ],
    "12776": [
        "ROSCOE",
        "NY"
    ],
    "12777": [
        "FORESTBURGH",
        "NY"
    ],
    "12778": [
        "SMALLWOOD",
        "NY"
    ],
    "12779": [
        "SOUTH FALLSBURG",
        "NY"
    ],
    "12780": [
        "SPARROW BUSH",
        "NY"
    ],
    "12781": [
        "SUMMITVILLE",
        "NY"
    ],
    "12783": [
        "SWAN LAKE",
        "NY"
    ],
    "12784": [
        "THOMPSONVILLE",
        "NY"
    ],
    "12785": [
        "WESTBROOKVILLE",
        "NY"
    ],
    "12786": [
        "WHITE LAKE",
        "NY"
    ],
    "12787": [
        "WHITE SULPHUR SPRINGS",
        "NY"
    ],
    "12788": [
        "WOODBOURNE",
        "NY"
    ],
    "12789": [
        "WOODRIDGE",
        "NY"
    ],
    "12790": [
        "WURTSBORO",
        "NY"
    ],
    "12791": [
        "YOUNGSVILLE",
        "NY"
    ],
    "12792": [
        "YULAN",
        "NY"
    ],
    "12801": [
        "GLENS FALLS",
        "NY"
    ],
    "12803": [
        "SOUTH GLENS FALLS",
        "NY"
    ],
    "12804": [
        "QUEENSBURY",
        "NY"
    ],
    "12808": [
        "ADIRONDACK",
        "NY"
    ],
    "12809": [
        "ARGYLE",
        "NY"
    ],
    "12810": [
        "ATHOL",
        "NY"
    ],
    "12811": [
        "BAKERS MILLS",
        "NY"
    ],
    "12812": [
        "BLUE MOUNTAIN LAKE",
        "NY"
    ],
    "12814": [
        "BOLTON LANDING",
        "NY"
    ],
    "12815": [
        "BRANT LAKE",
        "NY"
    ],
    "12816": [
        "CAMBRIDGE",
        "NY"
    ],
    "12817": [
        "CHESTERTOWN",
        "NY"
    ],
    "12819": [
        "CLEMONS",
        "NY"
    ],
    "12820": [
        "CLEVERDALE",
        "NY"
    ],
    "12821": [
        "COMSTOCK",
        "NY"
    ],
    "12822": [
        "CORINTH",
        "NY"
    ],
    "12823": [
        "COSSAYUNA",
        "NY"
    ],
    "12824": [
        "DIAMOND POINT",
        "NY"
    ],
    "12827": [
        "FORT ANN",
        "NY"
    ],
    "12828": [
        "FORT EDWARD",
        "NY"
    ],
    "12831": [
        "GANSEVOORT",
        "NY"
    ],
    "12832": [
        "GRANVILLE",
        "NY"
    ],
    "12833": [
        "GREENFIELD CENTER",
        "NY"
    ],
    "12834": [
        "GREENWICH",
        "NY"
    ],
    "12835": [
        "HADLEY",
        "NY"
    ],
    "12836": [
        "HAGUE",
        "NY"
    ],
    "12837": [
        "HAMPTON",
        "NY"
    ],
    "12838": [
        "HARTFORD",
        "NY"
    ],
    "12839": [
        "HUDSON FALLS",
        "NY"
    ],
    "12841": [
        "HULETTS LANDING",
        "NY"
    ],
    "12842": [
        "INDIAN LAKE",
        "NY"
    ],
    "12843": [
        "JOHNSBURG",
        "NY"
    ],
    "12844": [
        "KATTSKILL BAY",
        "NY"
    ],
    "12845": [
        "LAKE GEORGE",
        "NY"
    ],
    "12846": [
        "LAKE LUZERNE",
        "NY"
    ],
    "12847": [
        "LONG LAKE",
        "NY"
    ],
    "12848": [
        "MIDDLE FALLS",
        "NY"
    ],
    "12849": [
        "MIDDLE GRANVILLE",
        "NY"
    ],
    "12850": [
        "MIDDLE GROVE",
        "NY"
    ],
    "12851": [
        "MINERVA",
        "NY"
    ],
    "12852": [
        "NEWCOMB",
        "NY"
    ],
    "12853": [
        "NORTH CREEK",
        "NY"
    ],
    "12854": [
        "NORTH GRANVILLE",
        "NY"
    ],
    "12855": [
        "NORTH HUDSON",
        "NY"
    ],
    "12856": [
        "NORTH RIVER",
        "NY"
    ],
    "12857": [
        "OLMSTEDVILLE",
        "NY"
    ],
    "12858": [
        "PARADOX",
        "NY"
    ],
    "12859": [
        "PORTER CORNERS",
        "NY"
    ],
    "12860": [
        "POTTERSVILLE",
        "NY"
    ],
    "12861": [
        "PUTNAM STATION",
        "NY"
    ],
    "12862": [
        "RIPARIUS",
        "NY"
    ],
    "12863": [
        "ROCK CITY FALLS",
        "NY"
    ],
    "12864": [
        "SABAEL",
        "NY"
    ],
    "12865": [
        "SALEM",
        "NY"
    ],
    "12866": [
        "SARATOGA SPRINGS",
        "NY"
    ],
    "12870": [
        "SCHROON LAKE",
        "NY"
    ],
    "12871": [
        "SCHUYLERVILLE",
        "NY"
    ],
    "12872": [
        "SEVERANCE",
        "NY"
    ],
    "12873": [
        "SHUSHAN",
        "NY"
    ],
    "12874": [
        "SILVER BAY",
        "NY"
    ],
    "12878": [
        "STONY CREEK",
        "NY"
    ],
    "12883": [
        "TICONDEROGA",
        "NY"
    ],
    "12884": [
        "VICTORY MILLS",
        "NY"
    ],
    "12885": [
        "WARRENSBURG",
        "NY"
    ],
    "12886": [
        "WEVERTOWN",
        "NY"
    ],
    "12887": [
        "WHITEHALL",
        "NY"
    ],
    "12901": [
        "PLATTSBURGH",
        "NY"
    ],
    "12903": [
        "PLATTSBURGH",
        "NY"
    ],
    "12910": [
        "ALTONA",
        "NY"
    ],
    "12911": [
        "KEESEVILLE",
        "NY"
    ],
    "12912": [
        "AU SABLE FORKS",
        "NY"
    ],
    "12913": [
        "BLOOMINGDALE",
        "NY"
    ],
    "12914": [
        "BOMBAY",
        "NY"
    ],
    "12915": [
        "BRAINARDSVILLE",
        "NY"
    ],
    "12916": [
        "BRUSHTON",
        "NY"
    ],
    "12917": [
        "BURKE",
        "NY"
    ],
    "12918": [
        "CADYVILLE",
        "NY"
    ],
    "12919": [
        "CHAMPLAIN",
        "NY"
    ],
    "12920": [
        "CHATEAUGAY",
        "NY"
    ],
    "12921": [
        "CHAZY",
        "NY"
    ],
    "12922": [
        "CHILDWOLD",
        "NY"
    ],
    "12923": [
        "CHURUBUSCO",
        "NY"
    ],
    "12924": [
        "KEESEVILLE",
        "NY"
    ],
    "12926": [
        "CONSTABLE",
        "NY"
    ],
    "12927": [
        "CRANBERRY LAKE",
        "NY"
    ],
    "12928": [
        "CROWN POINT",
        "NY"
    ],
    "12929": [
        "DANNEMORA",
        "NY"
    ],
    "12930": [
        "DICKINSON CENTER",
        "NY"
    ],
    "12932": [
        "ELIZABETHTOWN",
        "NY"
    ],
    "12933": [
        "ELLENBURG",
        "NY"
    ],
    "12934": [
        "ELLENBURG CENTER",
        "NY"
    ],
    "12935": [
        "ELLENBURG DEPOT",
        "NY"
    ],
    "12936": [
        "ESSEX",
        "NY"
    ],
    "12937": [
        "FORT COVINGTON",
        "NY"
    ],
    "12939": [
        "GABRIELS",
        "NY"
    ],
    "12941": [
        "JAY",
        "NY"
    ],
    "12942": [
        "KEENE",
        "NY"
    ],
    "12943": [
        "KEENE VALLEY",
        "NY"
    ],
    "12944": [
        "KEESEVILLE",
        "NY"
    ],
    "12945": [
        "LAKE CLEAR",
        "NY"
    ],
    "12946": [
        "LAKE PLACID",
        "NY"
    ],
    "12949": [
        "LAWRENCEVILLE",
        "NY"
    ],
    "12950": [
        "LEWIS",
        "NY"
    ],
    "12952": [
        "LYON MOUNTAIN",
        "NY"
    ],
    "12953": [
        "MALONE",
        "NY"
    ],
    "12955": [
        "LYON MOUNTAIN",
        "NY"
    ],
    "12956": [
        "MINEVILLE",
        "NY"
    ],
    "12957": [
        "MOIRA",
        "NY"
    ],
    "12958": [
        "MOOERS",
        "NY"
    ],
    "12959": [
        "MOOERS FORKS",
        "NY"
    ],
    "12960": [
        "MORIAH",
        "NY"
    ],
    "12961": [
        "MORIAH CENTER",
        "NY"
    ],
    "12962": [
        "MORRISONVILLE",
        "NY"
    ],
    "12964": [
        "NEW RUSSIA",
        "NY"
    ],
    "12965": [
        "NICHOLVILLE",
        "NY"
    ],
    "12966": [
        "NORTH BANGOR",
        "NY"
    ],
    "12967": [
        "NORTH LAWRENCE",
        "NY"
    ],
    "12969": [
        "OWLS HEAD",
        "NY"
    ],
    "12970": [
        "PAUL SMITHS",
        "NY"
    ],
    "12972": [
        "PERU",
        "NY"
    ],
    "12973": [
        "PIERCEFIELD",
        "NY"
    ],
    "12974": [
        "PORT HENRY",
        "NY"
    ],
    "12975": [
        "PORT KENT",
        "NY"
    ],
    "12976": [
        "RAINBOW LAKE",
        "NY"
    ],
    "12977": [
        "RAY BROOK",
        "NY"
    ],
    "12978": [
        "REDFORD",
        "NY"
    ],
    "12979": [
        "ROUSES POINT",
        "NY"
    ],
    "12980": [
        "SAINT REGIS FALLS",
        "NY"
    ],
    "12981": [
        "SARANAC",
        "NY"
    ],
    "12983": [
        "SARANAC LAKE",
        "NY"
    ],
    "12985": [
        "SCHUYLER FALLS",
        "NY"
    ],
    "12986": [
        "TUPPER LAKE",
        "NY"
    ],
    "12987": [
        "UPPER JAY",
        "NY"
    ],
    "12989": [
        "VERMONTVILLE",
        "NY"
    ],
    "12992": [
        "WEST CHAZY",
        "NY"
    ],
    "12993": [
        "WESTPORT",
        "NY"
    ],
    "12996": [
        "WILLSBORO",
        "NY"
    ],
    "12997": [
        "WILMINGTON",
        "NY"
    ],
    "12998": [
        "WITHERBEE",
        "NY"
    ],
    "13020": [
        "APULIA STATION",
        "NY"
    ],
    "13021": [
        "AUBURN",
        "NY"
    ],
    "13022": [
        "AUBURN",
        "NY"
    ],
    "13024": [
        "AUBURN",
        "NY"
    ],
    "13026": [
        "AURORA",
        "NY"
    ],
    "13027": [
        "BALDWINSVILLE",
        "NY"
    ],
    "13028": [
        "BERNHARDS BAY",
        "NY"
    ],
    "13029": [
        "BREWERTON",
        "NY"
    ],
    "13030": [
        "BRIDGEPORT",
        "NY"
    ],
    "13031": [
        "CAMILLUS",
        "NY"
    ],
    "13032": [
        "CANASTOTA",
        "NY"
    ],
    "13033": [
        "CATO",
        "NY"
    ],
    "13034": [
        "CAYUGA",
        "NY"
    ],
    "13035": [
        "CAZENOVIA",
        "NY"
    ],
    "13036": [
        "CENTRAL SQUARE",
        "NY"
    ],
    "13037": [
        "CHITTENANGO",
        "NY"
    ],
    "13039": [
        "CICERO",
        "NY"
    ],
    "13040": [
        "CINCINNATUS",
        "NY"
    ],
    "13041": [
        "CLAY",
        "NY"
    ],
    "13042": [
        "CLEVELAND",
        "NY"
    ],
    "13044": [
        "CONSTANTIA",
        "NY"
    ],
    "13045": [
        "CORTLAND",
        "NY"
    ],
    "13051": [
        "DELPHI FALLS",
        "NY"
    ],
    "13052": [
        "DE RUYTER",
        "NY"
    ],
    "13053": [
        "DRYDEN",
        "NY"
    ],
    "13054": [
        "DURHAMVILLE",
        "NY"
    ],
    "13057": [
        "EAST SYRACUSE",
        "NY"
    ],
    "13060": [
        "ELBRIDGE",
        "NY"
    ],
    "13061": [
        "ERIEVILLE",
        "NY"
    ],
    "13063": [
        "FABIUS",
        "NY"
    ],
    "13064": [
        "FAIR HAVEN",
        "NY"
    ],
    "13065": [
        "FAYETTE",
        "NY"
    ],
    "13066": [
        "FAYETTEVILLE",
        "NY"
    ],
    "13068": [
        "FREEVILLE",
        "NY"
    ],
    "13069": [
        "FULTON",
        "NY"
    ],
    "13071": [
        "GENOA",
        "NY"
    ],
    "13072": [
        "GEORGETOWN",
        "NY"
    ],
    "13073": [
        "GROTON",
        "NY"
    ],
    "13074": [
        "HANNIBAL",
        "NY"
    ],
    "13076": [
        "HASTINGS",
        "NY"
    ],
    "13077": [
        "HOMER",
        "NY"
    ],
    "13078": [
        "JAMESVILLE",
        "NY"
    ],
    "13080": [
        "JORDAN",
        "NY"
    ],
    "13081": [
        "KING FERRY",
        "NY"
    ],
    "13082": [
        "KIRKVILLE",
        "NY"
    ],
    "13083": [
        "LACONA",
        "NY"
    ],
    "13084": [
        "LA FAYETTE",
        "NY"
    ],
    "13087": [
        "LITTLE YORK",
        "NY"
    ],
    "13088": [
        "LIVERPOOL",
        "NY"
    ],
    "13089": [
        "LIVERPOOL",
        "NY"
    ],
    "13090": [
        "LIVERPOOL",
        "NY"
    ],
    "13092": [
        "LOCKE",
        "NY"
    ],
    "13093": [
        "LYCOMING",
        "NY"
    ],
    "13101": [
        "MC GRAW",
        "NY"
    ],
    "13102": [
        "MC LEAN",
        "NY"
    ],
    "13103": [
        "MALLORY",
        "NY"
    ],
    "13104": [
        "MANLIUS",
        "NY"
    ],
    "13107": [
        "MAPLE VIEW",
        "NY"
    ],
    "13108": [
        "MARCELLUS",
        "NY"
    ],
    "13110": [
        "MARIETTA",
        "NY"
    ],
    "13111": [
        "MARTVILLE",
        "NY"
    ],
    "13112": [
        "MEMPHIS",
        "NY"
    ],
    "13113": [
        "MERIDIAN",
        "NY"
    ],
    "13114": [
        "MEXICO",
        "NY"
    ],
    "13115": [
        "MINETTO",
        "NY"
    ],
    "13116": [
        "MINOA",
        "NY"
    ],
    "13117": [
        "MONTEZUMA",
        "NY"
    ],
    "13118": [
        "MORAVIA",
        "NY"
    ],
    "13119": [
        "MOTTVILLE",
        "NY"
    ],
    "13120": [
        "NEDROW",
        "NY"
    ],
    "13121": [
        "NEW HAVEN",
        "NY"
    ],
    "13122": [
        "NEW WOODSTOCK",
        "NY"
    ],
    "13123": [
        "NORTH BAY",
        "NY"
    ],
    "13124": [
        "NORTH PITCHER",
        "NY"
    ],
    "13126": [
        "OSWEGO",
        "NY"
    ],
    "13131": [
        "PARISH",
        "NY"
    ],
    "13132": [
        "PENNELLVILLE",
        "NY"
    ],
    "13135": [
        "PHOENIX",
        "NY"
    ],
    "13136": [
        "PITCHER",
        "NY"
    ],
    "13137": [
        "PLAINVILLE",
        "NY"
    ],
    "13138": [
        "POMPEY",
        "NY"
    ],
    "13139": [
        "POPLAR RIDGE",
        "NY"
    ],
    "13140": [
        "PORT BYRON",
        "NY"
    ],
    "13141": [
        "PREBLE",
        "NY"
    ],
    "13142": [
        "PULASKI",
        "NY"
    ],
    "13143": [
        "RED CREEK",
        "NY"
    ],
    "13144": [
        "RICHLAND",
        "NY"
    ],
    "13145": [
        "SANDY CREEK",
        "NY"
    ],
    "13146": [
        "SAVANNAH",
        "NY"
    ],
    "13147": [
        "SCIPIO CENTER",
        "NY"
    ],
    "13148": [
        "SENECA FALLS",
        "NY"
    ],
    "13152": [
        "SKANEATELES",
        "NY"
    ],
    "13153": [
        "SKANEATELES FALLS",
        "NY"
    ],
    "13154": [
        "SOUTH BUTLER",
        "NY"
    ],
    "13155": [
        "SOUTH OTSELIC",
        "NY"
    ],
    "13156": [
        "STERLING",
        "NY"
    ],
    "13157": [
        "SYLVAN BEACH",
        "NY"
    ],
    "13158": [
        "TRUXTON",
        "NY"
    ],
    "13159": [
        "TULLY",
        "NY"
    ],
    "13160": [
        "UNION SPRINGS",
        "NY"
    ],
    "13162": [
        "VERONA BEACH",
        "NY"
    ],
    "13163": [
        "WAMPSVILLE",
        "NY"
    ],
    "13164": [
        "WARNERS",
        "NY"
    ],
    "13165": [
        "WATERLOO",
        "NY"
    ],
    "13166": [
        "WEEDSPORT",
        "NY"
    ],
    "13167": [
        "WEST MONROE",
        "NY"
    ],
    "13201": [
        "SYRACUSE",
        "NY"
    ],
    "13202": [
        "SYRACUSE",
        "NY"
    ],
    "13203": [
        "SYRACUSE",
        "NY"
    ],
    "13204": [
        "SYRACUSE",
        "NY"
    ],
    "13205": [
        "SYRACUSE",
        "NY"
    ],
    "13206": [
        "SYRACUSE",
        "NY"
    ],
    "13207": [
        "SYRACUSE",
        "NY"
    ],
    "13208": [
        "SYRACUSE",
        "NY"
    ],
    "13209": [
        "SYRACUSE",
        "NY"
    ],
    "13210": [
        "SYRACUSE",
        "NY"
    ],
    "13211": [
        "SYRACUSE",
        "NY"
    ],
    "13212": [
        "SYRACUSE",
        "NY"
    ],
    "13214": [
        "SYRACUSE",
        "NY"
    ],
    "13215": [
        "SYRACUSE",
        "NY"
    ],
    "13217": [
        "SYRACUSE",
        "NY"
    ],
    "13218": [
        "SYRACUSE",
        "NY"
    ],
    "13219": [
        "SYRACUSE",
        "NY"
    ],
    "13220": [
        "SYRACUSE",
        "NY"
    ],
    "13221": [
        "SYRACUSE",
        "NY"
    ],
    "13224": [
        "SYRACUSE",
        "NY"
    ],
    "13235": [
        "SYRACUSE",
        "NY"
    ],
    "13244": [
        "SYRACUSE",
        "NY"
    ],
    "13250": [
        "SYRACUSE",
        "NY"
    ],
    "13261": [
        "SYRACUSE",
        "NY"
    ],
    "13290": [
        "SYRACUSE",
        "NY"
    ],
    "13301": [
        "ALDER CREEK",
        "NY"
    ],
    "13302": [
        "ALTMAR",
        "NY"
    ],
    "13303": [
        "AVA",
        "NY"
    ],
    "13304": [
        "BARNEVELD",
        "NY"
    ],
    "13305": [
        "BEAVER FALLS",
        "NY"
    ],
    "13308": [
        "BLOSSVALE",
        "NY"
    ],
    "13309": [
        "BOONVILLE",
        "NY"
    ],
    "13310": [
        "BOUCKVILLE",
        "NY"
    ],
    "13312": [
        "BRANTINGHAM",
        "NY"
    ],
    "13313": [
        "BRIDGEWATER",
        "NY"
    ],
    "13314": [
        "BROOKFIELD",
        "NY"
    ],
    "13315": [
        "BURLINGTON FLATS",
        "NY"
    ],
    "13316": [
        "CAMDEN",
        "NY"
    ],
    "13317": [
        "CANAJOHARIE",
        "NY"
    ],
    "13318": [
        "CASSVILLE",
        "NY"
    ],
    "13319": [
        "CHADWICKS",
        "NY"
    ],
    "13320": [
        "CHERRY VALLEY",
        "NY"
    ],
    "13321": [
        "CLARK MILLS",
        "NY"
    ],
    "13322": [
        "CLAYVILLE",
        "NY"
    ],
    "13323": [
        "CLINTON",
        "NY"
    ],
    "13324": [
        "COLD BROOK",
        "NY"
    ],
    "13325": [
        "CONSTABLEVILLE",
        "NY"
    ],
    "13326": [
        "COOPERSTOWN",
        "NY"
    ],
    "13327": [
        "CROGHAN",
        "NY"
    ],
    "13328": [
        "DEANSBORO",
        "NY"
    ],
    "13329": [
        "DOLGEVILLE",
        "NY"
    ],
    "13331": [
        "EAGLE BAY",
        "NY"
    ],
    "13332": [
        "EARLVILLE",
        "NY"
    ],
    "13333": [
        "EAST SPRINGFIELD",
        "NY"
    ],
    "13334": [
        "EATON",
        "NY"
    ],
    "13335": [
        "EDMESTON",
        "NY"
    ],
    "13337": [
        "FLY CREEK",
        "NY"
    ],
    "13338": [
        "FORESTPORT",
        "NY"
    ],
    "13339": [
        "FORT PLAIN",
        "NY"
    ],
    "13340": [
        "FRANKFORT",
        "NY"
    ],
    "13341": [
        "FRANKLIN SPRINGS",
        "NY"
    ],
    "13342": [
        "GARRATTSVILLE",
        "NY"
    ],
    "13343": [
        "GLENFIELD",
        "NY"
    ],
    "13345": [
        "GREIG",
        "NY"
    ],
    "13346": [
        "HAMILTON",
        "NY"
    ],
    "13348": [
        "HARTWICK",
        "NY"
    ],
    "13350": [
        "HERKIMER",
        "NY"
    ],
    "13352": [
        "HINCKLEY",
        "NY"
    ],
    "13353": [
        "HOFFMEISTER",
        "NY"
    ],
    "13354": [
        "HOLLAND PATENT",
        "NY"
    ],
    "13355": [
        "HUBBARDSVILLE",
        "NY"
    ],
    "13357": [
        "ILION",
        "NY"
    ],
    "13360": [
        "INLET",
        "NY"
    ],
    "13361": [
        "JORDANVILLE",
        "NY"
    ],
    "13362": [
        "KNOXBORO",
        "NY"
    ],
    "13363": [
        "LEE CENTER",
        "NY"
    ],
    "13364": [
        "LEONARDSVILLE",
        "NY"
    ],
    "13365": [
        "LITTLE FALLS",
        "NY"
    ],
    "13367": [
        "LOWVILLE",
        "NY"
    ],
    "13368": [
        "LYONS FALLS",
        "NY"
    ],
    "13401": [
        "MC CONNELLSVILLE",
        "NY"
    ],
    "13402": [
        "MADISON",
        "NY"
    ],
    "13403": [
        "MARCY",
        "NY"
    ],
    "13404": [
        "MARTINSBURG",
        "NY"
    ],
    "13406": [
        "MIDDLEVILLE",
        "NY"
    ],
    "13407": [
        "MOHAWK",
        "NY"
    ],
    "13408": [
        "MORRISVILLE",
        "NY"
    ],
    "13409": [
        "MUNNSVILLE",
        "NY"
    ],
    "13410": [
        "NELLISTON",
        "NY"
    ],
    "13411": [
        "NEW BERLIN",
        "NY"
    ],
    "13413": [
        "NEW HARTFORD",
        "NY"
    ],
    "13416": [
        "NEWPORT",
        "NY"
    ],
    "13417": [
        "NEW YORK MILLS",
        "NY"
    ],
    "13418": [
        "NORTH BROOKFIELD",
        "NY"
    ],
    "13420": [
        "OLD FORGE",
        "NY"
    ],
    "13421": [
        "ONEIDA",
        "NY"
    ],
    "13424": [
        "ORISKANY",
        "NY"
    ],
    "13425": [
        "ORISKANY FALLS",
        "NY"
    ],
    "13426": [
        "ORWELL",
        "NY"
    ],
    "13428": [
        "PALATINE BRIDGE",
        "NY"
    ],
    "13431": [
        "POLAND",
        "NY"
    ],
    "13433": [
        "PORT LEYDEN",
        "NY"
    ],
    "13435": [
        "PROSPECT",
        "NY"
    ],
    "13436": [
        "RAQUETTE LAKE",
        "NY"
    ],
    "13437": [
        "REDFIELD",
        "NY"
    ],
    "13438": [
        "REMSEN",
        "NY"
    ],
    "13439": [
        "RICHFIELD SPRINGS",
        "NY"
    ],
    "13440": [
        "ROME",
        "NY"
    ],
    "13441": [
        "ROME",
        "NY"
    ],
    "13442": [
        "ROME",
        "NY"
    ],
    "13449": [
        "ROME",
        "NY"
    ],
    "13450": [
        "ROSEBOOM",
        "NY"
    ],
    "13452": [
        "SAINT JOHNSVILLE",
        "NY"
    ],
    "13454": [
        "SALISBURY CENTER",
        "NY"
    ],
    "13455": [
        "SANGERFIELD",
        "NY"
    ],
    "13456": [
        "SAUQUOIT",
        "NY"
    ],
    "13457": [
        "SCHUYLER LAKE",
        "NY"
    ],
    "13459": [
        "SHARON SPRINGS",
        "NY"
    ],
    "13460": [
        "SHERBURNE",
        "NY"
    ],
    "13461": [
        "SHERRILL",
        "NY"
    ],
    "13464": [
        "SMYRNA",
        "NY"
    ],
    "13465": [
        "SOLSVILLE",
        "NY"
    ],
    "13468": [
        "SPRINGFIELD CENTER",
        "NY"
    ],
    "13469": [
        "STITTVILLE",
        "NY"
    ],
    "13470": [
        "STRATFORD",
        "NY"
    ],
    "13471": [
        "TABERG",
        "NY"
    ],
    "13472": [
        "THENDARA",
        "NY"
    ],
    "13473": [
        "TURIN",
        "NY"
    ],
    "13475": [
        "VAN HORNESVILLE",
        "NY"
    ],
    "13476": [
        "VERNON",
        "NY"
    ],
    "13477": [
        "VERNON CENTER",
        "NY"
    ],
    "13478": [
        "VERONA",
        "NY"
    ],
    "13479": [
        "WASHINGTON MILLS",
        "NY"
    ],
    "13480": [
        "WATERVILLE",
        "NY"
    ],
    "13482": [
        "WEST BURLINGTON",
        "NY"
    ],
    "13483": [
        "WESTDALE",
        "NY"
    ],
    "13484": [
        "WEST EATON",
        "NY"
    ],
    "13485": [
        "WEST EDMESTON",
        "NY"
    ],
    "13486": [
        "WESTERNVILLE",
        "NY"
    ],
    "13488": [
        "WESTFORD",
        "NY"
    ],
    "13489": [
        "WEST LEYDEN",
        "NY"
    ],
    "13490": [
        "WESTMORELAND",
        "NY"
    ],
    "13491": [
        "WEST WINFIELD",
        "NY"
    ],
    "13492": [
        "WHITESBORO",
        "NY"
    ],
    "13493": [
        "WILLIAMSTOWN",
        "NY"
    ],
    "13494": [
        "WOODGATE",
        "NY"
    ],
    "13495": [
        "YORKVILLE",
        "NY"
    ],
    "13501": [
        "UTICA",
        "NY"
    ],
    "13502": [
        "UTICA",
        "NY"
    ],
    "13503": [
        "UTICA",
        "NY"
    ],
    "13504": [
        "UTICA",
        "NY"
    ],
    "13601": [
        "WATERTOWN",
        "NY"
    ],
    "13602": [
        "FORT DRUM",
        "NY"
    ],
    "13603": [
        "WATERTOWN",
        "NY"
    ],
    "13605": [
        "ADAMS",
        "NY"
    ],
    "13606": [
        "ADAMS CENTER",
        "NY"
    ],
    "13607": [
        "ALEXANDRIA BAY",
        "NY"
    ],
    "13608": [
        "ANTWERP",
        "NY"
    ],
    "13611": [
        "BELLEVILLE",
        "NY"
    ],
    "13612": [
        "BLACK RIVER",
        "NY"
    ],
    "13613": [
        "BRASHER FALLS",
        "NY"
    ],
    "13614": [
        "BRIER HILL",
        "NY"
    ],
    "13615": [
        "BROWNVILLE",
        "NY"
    ],
    "13616": [
        "CALCIUM",
        "NY"
    ],
    "13617": [
        "CANTON",
        "NY"
    ],
    "13618": [
        "CAPE VINCENT",
        "NY"
    ],
    "13619": [
        "CARTHAGE",
        "NY"
    ],
    "13620": [
        "CASTORLAND",
        "NY"
    ],
    "13621": [
        "CHASE MILLS",
        "NY"
    ],
    "13622": [
        "CHAUMONT",
        "NY"
    ],
    "13623": [
        "CHIPPEWA BAY",
        "NY"
    ],
    "13624": [
        "CLAYTON",
        "NY"
    ],
    "13625": [
        "COLTON",
        "NY"
    ],
    "13626": [
        "COPENHAGEN",
        "NY"
    ],
    "13627": [
        "DEER RIVER",
        "NY"
    ],
    "13628": [
        "DEFERIET",
        "NY"
    ],
    "13630": [
        "DE KALB JUNCTION",
        "NY"
    ],
    "13631": [
        "DENMARK",
        "NY"
    ],
    "13632": [
        "DEPAUVILLE",
        "NY"
    ],
    "13633": [
        "DE PEYSTER",
        "NY"
    ],
    "13634": [
        "DEXTER",
        "NY"
    ],
    "13635": [
        "EDWARDS",
        "NY"
    ],
    "13636": [
        "ELLISBURG",
        "NY"
    ],
    "13637": [
        "EVANS MILLS",
        "NY"
    ],
    "13638": [
        "FELTS MILLS",
        "NY"
    ],
    "13639": [
        "FINE",
        "NY"
    ],
    "13640": [
        "WELLESLEY ISLAND",
        "NY"
    ],
    "13641": [
        "FISHERS LANDING",
        "NY"
    ],
    "13642": [
        "GOUVERNEUR",
        "NY"
    ],
    "13643": [
        "GREAT BEND",
        "NY"
    ],
    "13645": [
        "HAILESBORO",
        "NY"
    ],
    "13646": [
        "HAMMOND",
        "NY"
    ],
    "13647": [
        "HANNAWA FALLS",
        "NY"
    ],
    "13648": [
        "HARRISVILLE",
        "NY"
    ],
    "13649": [
        "HELENA",
        "NY"
    ],
    "13650": [
        "HENDERSON",
        "NY"
    ],
    "13651": [
        "HENDERSON HARBOR",
        "NY"
    ],
    "13652": [
        "HERMON",
        "NY"
    ],
    "13654": [
        "HEUVELTON",
        "NY"
    ],
    "13655": [
        "HOGANSBURG",
        "NY"
    ],
    "13656": [
        "LA FARGEVILLE",
        "NY"
    ],
    "13658": [
        "LISBON",
        "NY"
    ],
    "13659": [
        "LORRAINE",
        "NY"
    ],
    "13660": [
        "MADRID",
        "NY"
    ],
    "13661": [
        "MANNSVILLE",
        "NY"
    ],
    "13662": [
        "MASSENA",
        "NY"
    ],
    "13664": [
        "MORRISTOWN",
        "NY"
    ],
    "13665": [
        "NATURAL BRIDGE",
        "NY"
    ],
    "13666": [
        "NEWTON FALLS",
        "NY"
    ],
    "13667": [
        "NORFOLK",
        "NY"
    ],
    "13668": [
        "NORWOOD",
        "NY"
    ],
    "13669": [
        "OGDENSBURG",
        "NY"
    ],
    "13670": [
        "OSWEGATCHIE",
        "NY"
    ],
    "13671": [
        "OXBOW",
        "NY"
    ],
    "13672": [
        "PARISHVILLE",
        "NY"
    ],
    "13673": [
        "PHILADELPHIA",
        "NY"
    ],
    "13674": [
        "PIERREPONT MANOR",
        "NY"
    ],
    "13675": [
        "PLESSIS",
        "NY"
    ],
    "13676": [
        "POTSDAM",
        "NY"
    ],
    "13678": [
        "RAYMONDVILLE",
        "NY"
    ],
    "13679": [
        "REDWOOD",
        "NY"
    ],
    "13680": [
        "RENSSELAER FALLS",
        "NY"
    ],
    "13681": [
        "RICHVILLE",
        "NY"
    ],
    "13682": [
        "RODMAN",
        "NY"
    ],
    "13683": [
        "ROOSEVELTOWN",
        "NY"
    ],
    "13684": [
        "RUSSELL",
        "NY"
    ],
    "13685": [
        "SACKETS HARBOR",
        "NY"
    ],
    "13687": [
        "SOUTH COLTON",
        "NY"
    ],
    "13690": [
        "STAR LAKE",
        "NY"
    ],
    "13691": [
        "THERESA",
        "NY"
    ],
    "13692": [
        "THOUSAND ISLAND PARK",
        "NY"
    ],
    "13693": [
        "THREE MILE BAY",
        "NY"
    ],
    "13694": [
        "WADDINGTON",
        "NY"
    ],
    "13695": [
        "WANAKENA",
        "NY"
    ],
    "13696": [
        "WEST STOCKHOLM",
        "NY"
    ],
    "13697": [
        "WINTHROP",
        "NY"
    ],
    "13699": [
        "POTSDAM",
        "NY"
    ],
    "13730": [
        "AFTON",
        "NY"
    ],
    "13731": [
        "ANDES",
        "NY"
    ],
    "13732": [
        "APALACHIN",
        "NY"
    ],
    "13733": [
        "BAINBRIDGE",
        "NY"
    ],
    "13734": [
        "BARTON",
        "NY"
    ],
    "13736": [
        "BERKSHIRE",
        "NY"
    ],
    "13738": [
        "BLODGETT MILLS",
        "NY"
    ],
    "13739": [
        "BLOOMVILLE",
        "NY"
    ],
    "13740": [
        "BOVINA CENTER",
        "NY"
    ],
    "13743": [
        "CANDOR",
        "NY"
    ],
    "13744": [
        "CASTLE CREEK",
        "NY"
    ],
    "13745": [
        "CHENANGO BRIDGE",
        "NY"
    ],
    "13746": [
        "CHENANGO FORKS",
        "NY"
    ],
    "13747": [
        "COLLIERSVILLE",
        "NY"
    ],
    "13748": [
        "CONKLIN",
        "NY"
    ],
    "13750": [
        "DAVENPORT",
        "NY"
    ],
    "13751": [
        "DAVENPORT CENTER",
        "NY"
    ],
    "13752": [
        "DELANCEY",
        "NY"
    ],
    "13753": [
        "DELHI",
        "NY"
    ],
    "13754": [
        "DEPOSIT",
        "NY"
    ],
    "13755": [
        "DOWNSVILLE",
        "NY"
    ],
    "13756": [
        "EAST BRANCH",
        "NY"
    ],
    "13757": [
        "EAST MEREDITH",
        "NY"
    ],
    "13760": [
        "ENDICOTT",
        "NY"
    ],
    "13761": [
        "ENDICOTT",
        "NY"
    ],
    "13762": [
        "ENDWELL",
        "NY"
    ],
    "13763": [
        "ENDICOTT",
        "NY"
    ],
    "13774": [
        "FISHS EDDY",
        "NY"
    ],
    "13775": [
        "FRANKLIN",
        "NY"
    ],
    "13776": [
        "GILBERTSVILLE",
        "NY"
    ],
    "13777": [
        "GLEN AUBREY",
        "NY"
    ],
    "13778": [
        "GREENE",
        "NY"
    ],
    "13780": [
        "GUILFORD",
        "NY"
    ],
    "13782": [
        "HAMDEN",
        "NY"
    ],
    "13783": [
        "HANCOCK",
        "NY"
    ],
    "13784": [
        "HARFORD",
        "NY"
    ],
    "13786": [
        "HARPERSFIELD",
        "NY"
    ],
    "13787": [
        "HARPURSVILLE",
        "NY"
    ],
    "13788": [
        "HOBART",
        "NY"
    ],
    "13790": [
        "JOHNSON CITY",
        "NY"
    ],
    "13794": [
        "KILLAWOG",
        "NY"
    ],
    "13795": [
        "KIRKWOOD",
        "NY"
    ],
    "13796": [
        "LAURENS",
        "NY"
    ],
    "13797": [
        "LISLE",
        "NY"
    ],
    "13801": [
        "MC DONOUGH",
        "NY"
    ],
    "13802": [
        "MAINE",
        "NY"
    ],
    "13803": [
        "MARATHON",
        "NY"
    ],
    "13804": [
        "MASONVILLE",
        "NY"
    ],
    "13806": [
        "MERIDALE",
        "NY"
    ],
    "13807": [
        "MILFORD",
        "NY"
    ],
    "13808": [
        "MORRIS",
        "NY"
    ],
    "13809": [
        "MOUNT UPTON",
        "NY"
    ],
    "13810": [
        "MOUNT VISION",
        "NY"
    ],
    "13811": [
        "NEWARK VALLEY",
        "NY"
    ],
    "13812": [
        "NICHOLS",
        "NY"
    ],
    "13813": [
        "NINEVEH",
        "NY"
    ],
    "13814": [
        "NORTH NORWICH",
        "NY"
    ],
    "13815": [
        "NORWICH",
        "NY"
    ],
    "13820": [
        "ONEONTA",
        "NY"
    ],
    "13825": [
        "OTEGO",
        "NY"
    ],
    "13826": [
        "OUAQUAGA",
        "NY"
    ],
    "13827": [
        "OWEGO",
        "NY"
    ],
    "13830": [
        "OXFORD",
        "NY"
    ],
    "13832": [
        "PLYMOUTH",
        "NY"
    ],
    "13833": [
        "PORT CRANE",
        "NY"
    ],
    "13834": [
        "PORTLANDVILLE",
        "NY"
    ],
    "13835": [
        "RICHFORD",
        "NY"
    ],
    "13838": [
        "SIDNEY",
        "NY"
    ],
    "13839": [
        "SIDNEY CENTER",
        "NY"
    ],
    "13840": [
        "SMITHBORO",
        "NY"
    ],
    "13841": [
        "SMITHVILLE FLATS",
        "NY"
    ],
    "13842": [
        "SOUTH KORTRIGHT",
        "NY"
    ],
    "13843": [
        "SOUTH NEW BERLIN",
        "NY"
    ],
    "13844": [
        "SOUTH PLYMOUTH",
        "NY"
    ],
    "13845": [
        "TIOGA CENTER",
        "NY"
    ],
    "13846": [
        "TREADWELL",
        "NY"
    ],
    "13847": [
        "TROUT CREEK",
        "NY"
    ],
    "13848": [
        "TUNNEL",
        "NY"
    ],
    "13849": [
        "UNADILLA",
        "NY"
    ],
    "13850": [
        "VESTAL",
        "NY"
    ],
    "13851": [
        "VESTAL",
        "NY"
    ],
    "13856": [
        "WALTON",
        "NY"
    ],
    "13859": [
        "WELLS BRIDGE",
        "NY"
    ],
    "13860": [
        "WEST DAVENPORT",
        "NY"
    ],
    "13861": [
        "WEST ONEONTA",
        "NY"
    ],
    "13862": [
        "WHITNEY POINT",
        "NY"
    ],
    "13863": [
        "WILLET",
        "NY"
    ],
    "13864": [
        "WILLSEYVILLE",
        "NY"
    ],
    "13865": [
        "WINDSOR",
        "NY"
    ],
    "13901": [
        "BINGHAMTON",
        "NY"
    ],
    "13902": [
        "BINGHAMTON",
        "NY"
    ],
    "13903": [
        "BINGHAMTON",
        "NY"
    ],
    "13904": [
        "BINGHAMTON",
        "NY"
    ],
    "13905": [
        "BINGHAMTON",
        "NY"
    ],
    "14001": [
        "AKRON",
        "NY"
    ],
    "14004": [
        "ALDEN",
        "NY"
    ],
    "14005": [
        "ALEXANDER",
        "NY"
    ],
    "14006": [
        "ANGOLA",
        "NY"
    ],
    "14008": [
        "APPLETON",
        "NY"
    ],
    "14009": [
        "ARCADE",
        "NY"
    ],
    "14010": [
        "ATHOL SPRINGS",
        "NY"
    ],
    "14011": [
        "ATTICA",
        "NY"
    ],
    "14012": [
        "BARKER",
        "NY"
    ],
    "14013": [
        "BASOM",
        "NY"
    ],
    "14020": [
        "BATAVIA",
        "NY"
    ],
    "14021": [
        "BATAVIA",
        "NY"
    ],
    "14024": [
        "BLISS",
        "NY"
    ],
    "14025": [
        "BOSTON",
        "NY"
    ],
    "14026": [
        "BOWMANSVILLE",
        "NY"
    ],
    "14027": [
        "BRANT",
        "NY"
    ],
    "14028": [
        "BURT",
        "NY"
    ],
    "14029": [
        "CENTERVILLE",
        "NY"
    ],
    "14030": [
        "CHAFFEE",
        "NY"
    ],
    "14031": [
        "CLARENCE",
        "NY"
    ],
    "14032": [
        "CLARENCE CENTER",
        "NY"
    ],
    "14033": [
        "COLDEN",
        "NY"
    ],
    "14034": [
        "COLLINS",
        "NY"
    ],
    "14035": [
        "COLLINS CENTER",
        "NY"
    ],
    "14036": [
        "CORFU",
        "NY"
    ],
    "14037": [
        "COWLESVILLE",
        "NY"
    ],
    "14038": [
        "CRITTENDEN",
        "NY"
    ],
    "14039": [
        "DALE",
        "NY"
    ],
    "14040": [
        "DARIEN CENTER",
        "NY"
    ],
    "14041": [
        "DAYTON",
        "NY"
    ],
    "14042": [
        "DELEVAN",
        "NY"
    ],
    "14043": [
        "DEPEW",
        "NY"
    ],
    "14047": [
        "DERBY",
        "NY"
    ],
    "14048": [
        "DUNKIRK",
        "NY"
    ],
    "14051": [
        "EAST AMHERST",
        "NY"
    ],
    "14052": [
        "EAST AURORA",
        "NY"
    ],
    "14054": [
        "EAST BETHANY",
        "NY"
    ],
    "14055": [
        "EAST CONCORD",
        "NY"
    ],
    "14056": [
        "EAST PEMBROKE",
        "NY"
    ],
    "14057": [
        "EDEN",
        "NY"
    ],
    "14058": [
        "ELBA",
        "NY"
    ],
    "14059": [
        "ELMA",
        "NY"
    ],
    "14060": [
        "FARMERSVILLE STATION",
        "NY"
    ],
    "14061": [
        "FARNHAM",
        "NY"
    ],
    "14062": [
        "FORESTVILLE",
        "NY"
    ],
    "14063": [
        "FREDONIA",
        "NY"
    ],
    "14065": [
        "FREEDOM",
        "NY"
    ],
    "14066": [
        "GAINESVILLE",
        "NY"
    ],
    "14067": [
        "GASPORT",
        "NY"
    ],
    "14068": [
        "GETZVILLE",
        "NY"
    ],
    "14069": [
        "GLENWOOD",
        "NY"
    ],
    "14070": [
        "GOWANDA",
        "NY"
    ],
    "14072": [
        "GRAND ISLAND",
        "NY"
    ],
    "14075": [
        "HAMBURG",
        "NY"
    ],
    "14080": [
        "HOLLAND",
        "NY"
    ],
    "14081": [
        "IRVING",
        "NY"
    ],
    "14082": [
        "JAVA CENTER",
        "NY"
    ],
    "14083": [
        "JAVA VILLAGE",
        "NY"
    ],
    "14085": [
        "LAKE VIEW",
        "NY"
    ],
    "14086": [
        "LANCASTER",
        "NY"
    ],
    "14091": [
        "LAWTONS",
        "NY"
    ],
    "14092": [
        "LEWISTON",
        "NY"
    ],
    "14094": [
        "LOCKPORT",
        "NY"
    ],
    "14095": [
        "LOCKPORT",
        "NY"
    ],
    "14098": [
        "LYNDONVILLE",
        "NY"
    ],
    "14101": [
        "MACHIAS",
        "NY"
    ],
    "14102": [
        "MARILLA",
        "NY"
    ],
    "14103": [
        "MEDINA",
        "NY"
    ],
    "14105": [
        "MIDDLEPORT",
        "NY"
    ],
    "14107": [
        "MODEL CITY",
        "NY"
    ],
    "14108": [
        "NEWFANE",
        "NY"
    ],
    "14109": [
        "NIAGARA UNIVERSITY",
        "NY"
    ],
    "14110": [
        "NORTH BOSTON",
        "NY"
    ],
    "14111": [
        "NORTH COLLINS",
        "NY"
    ],
    "14112": [
        "NORTH EVANS",
        "NY"
    ],
    "14113": [
        "NORTH JAVA",
        "NY"
    ],
    "14120": [
        "NORTH TONAWANDA",
        "NY"
    ],
    "14125": [
        "OAKFIELD",
        "NY"
    ],
    "14126": [
        "OLCOTT",
        "NY"
    ],
    "14127": [
        "ORCHARD PARK",
        "NY"
    ],
    "14129": [
        "PERRYSBURG",
        "NY"
    ],
    "14130": [
        "PIKE",
        "NY"
    ],
    "14131": [
        "RANSOMVILLE",
        "NY"
    ],
    "14132": [
        "SANBORN",
        "NY"
    ],
    "14133": [
        "SANDUSKY",
        "NY"
    ],
    "14134": [
        "SARDINIA",
        "NY"
    ],
    "14135": [
        "SHERIDAN",
        "NY"
    ],
    "14136": [
        "SILVER CREEK",
        "NY"
    ],
    "14138": [
        "SOUTH DAYTON",
        "NY"
    ],
    "14139": [
        "SOUTH WALES",
        "NY"
    ],
    "14140": [
        "SPRING BROOK",
        "NY"
    ],
    "14141": [
        "SPRINGVILLE",
        "NY"
    ],
    "14143": [
        "STAFFORD",
        "NY"
    ],
    "14144": [
        "STELLA NIAGARA",
        "NY"
    ],
    "14145": [
        "STRYKERSVILLE",
        "NY"
    ],
    "14150": [
        "TONAWANDA",
        "NY"
    ],
    "14151": [
        "TONAWANDA",
        "NY"
    ],
    "14166": [
        "VAN BUREN POINT",
        "NY"
    ],
    "14167": [
        "VARYSBURG",
        "NY"
    ],
    "14169": [
        "WALES CENTER",
        "NY"
    ],
    "14170": [
        "WEST FALLS",
        "NY"
    ],
    "14171": [
        "WEST VALLEY",
        "NY"
    ],
    "14172": [
        "WILSON",
        "NY"
    ],
    "14173": [
        "YORKSHIRE",
        "NY"
    ],
    "14174": [
        "YOUNGSTOWN",
        "NY"
    ],
    "14201": [
        "BUFFALO",
        "NY"
    ],
    "14202": [
        "BUFFALO",
        "NY"
    ],
    "14203": [
        "BUFFALO",
        "NY"
    ],
    "14204": [
        "BUFFALO",
        "NY"
    ],
    "14205": [
        "BUFFALO",
        "NY"
    ],
    "14206": [
        "BUFFALO",
        "NY"
    ],
    "14207": [
        "BUFFALO",
        "NY"
    ],
    "14208": [
        "BUFFALO",
        "NY"
    ],
    "14209": [
        "BUFFALO",
        "NY"
    ],
    "14210": [
        "BUFFALO",
        "NY"
    ],
    "14211": [
        "BUFFALO",
        "NY"
    ],
    "14212": [
        "BUFFALO",
        "NY"
    ],
    "14213": [
        "BUFFALO",
        "NY"
    ],
    "14214": [
        "BUFFALO",
        "NY"
    ],
    "14215": [
        "BUFFALO",
        "NY"
    ],
    "14216": [
        "BUFFALO",
        "NY"
    ],
    "14217": [
        "BUFFALO",
        "NY"
    ],
    "14218": [
        "BUFFALO",
        "NY"
    ],
    "14219": [
        "BUFFALO",
        "NY"
    ],
    "14220": [
        "BUFFALO",
        "NY"
    ],
    "14221": [
        "BUFFALO",
        "NY"
    ],
    "14222": [
        "BUFFALO",
        "NY"
    ],
    "14223": [
        "BUFFALO",
        "NY"
    ],
    "14224": [
        "BUFFALO",
        "NY"
    ],
    "14225": [
        "BUFFALO",
        "NY"
    ],
    "14226": [
        "BUFFALO",
        "NY"
    ],
    "14227": [
        "BUFFALO",
        "NY"
    ],
    "14228": [
        "BUFFALO",
        "NY"
    ],
    "14231": [
        "BUFFALO",
        "NY"
    ],
    "14240": [
        "BUFFALO",
        "NY"
    ],
    "14260": [
        "BUFFALO",
        "NY"
    ],
    "14261": [
        "BUFFALO",
        "NY"
    ],
    "14263": [
        "BUFFALO",
        "NY"
    ],
    "14264": [
        "BUFFALO",
        "NY"
    ],
    "14267": [
        "BUFFALO",
        "NY"
    ],
    "14270": [
        "BUFFALO",
        "NY"
    ],
    "14272": [
        "BUFFALO",
        "NY"
    ],
    "14273": [
        "BUFFALO",
        "NY"
    ],
    "14301": [
        "NIAGARA FALLS",
        "NY"
    ],
    "14302": [
        "NIAGARA FALLS",
        "NY"
    ],
    "14303": [
        "NIAGARA FALLS",
        "NY"
    ],
    "14304": [
        "NIAGARA FALLS",
        "NY"
    ],
    "14305": [
        "NIAGARA FALLS",
        "NY"
    ],
    "14410": [
        "ADAMS BASIN",
        "NY"
    ],
    "14411": [
        "ALBION",
        "NY"
    ],
    "14413": [
        "ALTON",
        "NY"
    ],
    "14414": [
        "AVON",
        "NY"
    ],
    "14415": [
        "BELLONA",
        "NY"
    ],
    "14416": [
        "BERGEN",
        "NY"
    ],
    "14418": [
        "BRANCHPORT",
        "NY"
    ],
    "14420": [
        "BROCKPORT",
        "NY"
    ],
    "14422": [
        "BYRON",
        "NY"
    ],
    "14423": [
        "CALEDONIA",
        "NY"
    ],
    "14424": [
        "CANANDAIGUA",
        "NY"
    ],
    "14425": [
        "FARMINGTON",
        "NY"
    ],
    "14427": [
        "CASTILE",
        "NY"
    ],
    "14428": [
        "CHURCHVILLE",
        "NY"
    ],
    "14429": [
        "CLARENDON",
        "NY"
    ],
    "14430": [
        "CLARKSON",
        "NY"
    ],
    "14432": [
        "CLIFTON SPRINGS",
        "NY"
    ],
    "14433": [
        "CLYDE",
        "NY"
    ],
    "14435": [
        "CONESUS",
        "NY"
    ],
    "14437": [
        "DANSVILLE",
        "NY"
    ],
    "14441": [
        "DRESDEN",
        "NY"
    ],
    "14443": [
        "EAST BLOOMFIELD",
        "NY"
    ],
    "14445": [
        "EAST ROCHESTER",
        "NY"
    ],
    "14449": [
        "EAST WILLIAMSON",
        "NY"
    ],
    "14450": [
        "FAIRPORT",
        "NY"
    ],
    "14452": [
        "FANCHER",
        "NY"
    ],
    "14453": [
        "FISHERS",
        "NY"
    ],
    "14454": [
        "GENESEO",
        "NY"
    ],
    "14456": [
        "GENEVA",
        "NY"
    ],
    "14461": [
        "GORHAM",
        "NY"
    ],
    "14462": [
        "GROVELAND",
        "NY"
    ],
    "14463": [
        "HALL",
        "NY"
    ],
    "14464": [
        "HAMLIN",
        "NY"
    ],
    "14466": [
        "HEMLOCK",
        "NY"
    ],
    "14467": [
        "HENRIETTA",
        "NY"
    ],
    "14468": [
        "HILTON",
        "NY"
    ],
    "14469": [
        "BLOOMFIELD",
        "NY"
    ],
    "14470": [
        "HOLLEY",
        "NY"
    ],
    "14471": [
        "HONEOYE",
        "NY"
    ],
    "14472": [
        "HONEOYE FALLS",
        "NY"
    ],
    "14475": [
        "IONIA",
        "NY"
    ],
    "14476": [
        "KENDALL",
        "NY"
    ],
    "14477": [
        "KENT",
        "NY"
    ],
    "14478": [
        "KEUKA PARK",
        "NY"
    ],
    "14479": [
        "KNOWLESVILLE",
        "NY"
    ],
    "14480": [
        "LAKEVILLE",
        "NY"
    ],
    "14481": [
        "LEICESTER",
        "NY"
    ],
    "14482": [
        "LE ROY",
        "NY"
    ],
    "14485": [
        "LIMA",
        "NY"
    ],
    "14486": [
        "LINWOOD",
        "NY"
    ],
    "14487": [
        "LIVONIA",
        "NY"
    ],
    "14489": [
        "LYONS",
        "NY"
    ],
    "14502": [
        "MACEDON",
        "NY"
    ],
    "14504": [
        "MANCHESTER",
        "NY"
    ],
    "14505": [
        "MARION",
        "NY"
    ],
    "14506": [
        "MENDON",
        "NY"
    ],
    "14507": [
        "MIDDLESEX",
        "NY"
    ],
    "14508": [
        "MORTON",
        "NY"
    ],
    "14510": [
        "MOUNT MORRIS",
        "NY"
    ],
    "14511": [
        "MUMFORD",
        "NY"
    ],
    "14512": [
        "NAPLES",
        "NY"
    ],
    "14513": [
        "NEWARK",
        "NY"
    ],
    "14514": [
        "NORTH CHILI",
        "NY"
    ],
    "14515": [
        "NORTH GREECE",
        "NY"
    ],
    "14516": [
        "NORTH ROSE",
        "NY"
    ],
    "14517": [
        "NUNDA",
        "NY"
    ],
    "14518": [
        "OAKS CORNERS",
        "NY"
    ],
    "14519": [
        "ONTARIO",
        "NY"
    ],
    "14520": [
        "ONTARIO CENTER",
        "NY"
    ],
    "14521": [
        "OVID",
        "NY"
    ],
    "14522": [
        "PALMYRA",
        "NY"
    ],
    "14525": [
        "PAVILION",
        "NY"
    ],
    "14526": [
        "PENFIELD",
        "NY"
    ],
    "14527": [
        "PENN YAN",
        "NY"
    ],
    "14529": [
        "PERKINSVILLE",
        "NY"
    ],
    "14530": [
        "PERRY",
        "NY"
    ],
    "14532": [
        "PHELPS",
        "NY"
    ],
    "14533": [
        "PIFFARD",
        "NY"
    ],
    "14534": [
        "PITTSFORD",
        "NY"
    ],
    "14536": [
        "PORTAGEVILLE",
        "NY"
    ],
    "14537": [
        "PORT GIBSON",
        "NY"
    ],
    "14538": [
        "PULTNEYVILLE",
        "NY"
    ],
    "14539": [
        "RETSOF",
        "NY"
    ],
    "14541": [
        "ROMULUS",
        "NY"
    ],
    "14542": [
        "ROSE",
        "NY"
    ],
    "14543": [
        "RUSH",
        "NY"
    ],
    "14544": [
        "RUSHVILLE",
        "NY"
    ],
    "14545": [
        "SCOTTSBURG",
        "NY"
    ],
    "14546": [
        "SCOTTSVILLE",
        "NY"
    ],
    "14547": [
        "SENECA CASTLE",
        "NY"
    ],
    "14548": [
        "SHORTSVILLE",
        "NY"
    ],
    "14549": [
        "SILVER LAKE",
        "NY"
    ],
    "14550": [
        "SILVER SPRINGS",
        "NY"
    ],
    "14551": [
        "SODUS",
        "NY"
    ],
    "14555": [
        "SODUS POINT",
        "NY"
    ],
    "14556": [
        "SONYEA",
        "NY"
    ],
    "14557": [
        "SOUTH BYRON",
        "NY"
    ],
    "14558": [
        "SOUTH LIMA",
        "NY"
    ],
    "14559": [
        "SPENCERPORT",
        "NY"
    ],
    "14560": [
        "SPRINGWATER",
        "NY"
    ],
    "14561": [
        "STANLEY",
        "NY"
    ],
    "14563": [
        "UNION HILL",
        "NY"
    ],
    "14564": [
        "VICTOR",
        "NY"
    ],
    "14568": [
        "WALWORTH",
        "NY"
    ],
    "14569": [
        "WARSAW",
        "NY"
    ],
    "14571": [
        "WATERPORT",
        "NY"
    ],
    "14572": [
        "WAYLAND",
        "NY"
    ],
    "14580": [
        "WEBSTER",
        "NY"
    ],
    "14585": [
        "WEST BLOOMFIELD",
        "NY"
    ],
    "14586": [
        "WEST HENRIETTA",
        "NY"
    ],
    "14588": [
        "WILLARD",
        "NY"
    ],
    "14589": [
        "WILLIAMSON",
        "NY"
    ],
    "14590": [
        "WOLCOTT",
        "NY"
    ],
    "14591": [
        "WYOMING",
        "NY"
    ],
    "14592": [
        "YORK",
        "NY"
    ],
    "14602": [
        "ROCHESTER",
        "NY"
    ],
    "14603": [
        "ROCHESTER",
        "NY"
    ],
    "14604": [
        "ROCHESTER",
        "NY"
    ],
    "14605": [
        "ROCHESTER",
        "NY"
    ],
    "14606": [
        "ROCHESTER",
        "NY"
    ],
    "14607": [
        "ROCHESTER",
        "NY"
    ],
    "14608": [
        "ROCHESTER",
        "NY"
    ],
    "14609": [
        "ROCHESTER",
        "NY"
    ],
    "14610": [
        "ROCHESTER",
        "NY"
    ],
    "14611": [
        "ROCHESTER",
        "NY"
    ],
    "14612": [
        "ROCHESTER",
        "NY"
    ],
    "14613": [
        "ROCHESTER",
        "NY"
    ],
    "14614": [
        "ROCHESTER",
        "NY"
    ],
    "14615": [
        "ROCHESTER",
        "NY"
    ],
    "14616": [
        "ROCHESTER",
        "NY"
    ],
    "14617": [
        "ROCHESTER",
        "NY"
    ],
    "14618": [
        "ROCHESTER",
        "NY"
    ],
    "14619": [
        "ROCHESTER",
        "NY"
    ],
    "14620": [
        "ROCHESTER",
        "NY"
    ],
    "14621": [
        "ROCHESTER",
        "NY"
    ],
    "14622": [
        "ROCHESTER",
        "NY"
    ],
    "14623": [
        "ROCHESTER",
        "NY"
    ],
    "14624": [
        "ROCHESTER",
        "NY"
    ],
    "14625": [
        "ROCHESTER",
        "NY"
    ],
    "14626": [
        "ROCHESTER",
        "NY"
    ],
    "14627": [
        "ROCHESTER",
        "NY"
    ],
    "14638": [
        "ROCHESTER",
        "NY"
    ],
    "14639": [
        "ROCHESTER",
        "NY"
    ],
    "14642": [
        "ROCHESTER",
        "NY"
    ],
    "14643": [
        "ROCHESTER",
        "NY"
    ],
    "14644": [
        "ROCHESTER",
        "NY"
    ],
    "14646": [
        "ROCHESTER",
        "NY"
    ],
    "14647": [
        "ROCHESTER",
        "NY"
    ],
    "14649": [
        "ROCHESTER",
        "NY"
    ],
    "14650": [
        "ROCHESTER",
        "NY"
    ],
    "14652": [
        "ROCHESTER",
        "NY"
    ],
    "14653": [
        "ROCHESTER",
        "NY"
    ],
    "14692": [
        "ROCHESTER",
        "NY"
    ],
    "14694": [
        "ROCHESTER",
        "NY"
    ],
    "14701": [
        "JAMESTOWN",
        "NY"
    ],
    "14702": [
        "JAMESTOWN",
        "NY"
    ],
    "14706": [
        "ALLEGANY",
        "NY"
    ],
    "14709": [
        "ANGELICA",
        "NY"
    ],
    "14710": [
        "ASHVILLE",
        "NY"
    ],
    "14711": [
        "BELFAST",
        "NY"
    ],
    "14712": [
        "BEMUS POINT",
        "NY"
    ],
    "14714": [
        "BLACK CREEK",
        "NY"
    ],
    "14715": [
        "BOLIVAR",
        "NY"
    ],
    "14716": [
        "BROCTON",
        "NY"
    ],
    "14717": [
        "CANEADEA",
        "NY"
    ],
    "14718": [
        "CASSADAGA",
        "NY"
    ],
    "14719": [
        "CATTARAUGUS",
        "NY"
    ],
    "14720": [
        "CELORON",
        "NY"
    ],
    "14721": [
        "CERES",
        "NY"
    ],
    "14722": [
        "CHAUTAUQUA",
        "NY"
    ],
    "14723": [
        "CHERRY CREEK",
        "NY"
    ],
    "14724": [
        "CLYMER",
        "NY"
    ],
    "14726": [
        "CONEWANGO VALLEY",
        "NY"
    ],
    "14727": [
        "CUBA",
        "NY"
    ],
    "14728": [
        "DEWITTVILLE",
        "NY"
    ],
    "14729": [
        "EAST OTTO",
        "NY"
    ],
    "14730": [
        "EAST RANDOLPH",
        "NY"
    ],
    "14731": [
        "ELLICOTTVILLE",
        "NY"
    ],
    "14732": [
        "ELLINGTON",
        "NY"
    ],
    "14733": [
        "FALCONER",
        "NY"
    ],
    "14735": [
        "FILLMORE",
        "NY"
    ],
    "14736": [
        "FINDLEY LAKE",
        "NY"
    ],
    "14737": [
        "FRANKLINVILLE",
        "NY"
    ],
    "14738": [
        "FREWSBURG",
        "NY"
    ],
    "14739": [
        "FRIENDSHIP",
        "NY"
    ],
    "14740": [
        "GERRY",
        "NY"
    ],
    "14741": [
        "GREAT VALLEY",
        "NY"
    ],
    "14742": [
        "GREENHURST",
        "NY"
    ],
    "14743": [
        "HINSDALE",
        "NY"
    ],
    "14744": [
        "HOUGHTON",
        "NY"
    ],
    "14745": [
        "HUME",
        "NY"
    ],
    "14747": [
        "KENNEDY",
        "NY"
    ],
    "14748": [
        "KILL BUCK",
        "NY"
    ],
    "14750": [
        "LAKEWOOD",
        "NY"
    ],
    "14751": [
        "LEON",
        "NY"
    ],
    "14752": [
        "LILY DALE",
        "NY"
    ],
    "14753": [
        "LIMESTONE",
        "NY"
    ],
    "14754": [
        "LITTLE GENESEE",
        "NY"
    ],
    "14755": [
        "LITTLE VALLEY",
        "NY"
    ],
    "14756": [
        "MAPLE SPRINGS",
        "NY"
    ],
    "14757": [
        "MAYVILLE",
        "NY"
    ],
    "14760": [
        "OLEAN",
        "NY"
    ],
    "14766": [
        "OTTO",
        "NY"
    ],
    "14767": [
        "PANAMA",
        "NY"
    ],
    "14769": [
        "PORTLAND",
        "NY"
    ],
    "14770": [
        "PORTVILLE",
        "NY"
    ],
    "14772": [
        "RANDOLPH",
        "NY"
    ],
    "14774": [
        "RICHBURG",
        "NY"
    ],
    "14775": [
        "RIPLEY",
        "NY"
    ],
    "14777": [
        "RUSHFORD",
        "NY"
    ],
    "14778": [
        "SAINT BONAVENTURE",
        "NY"
    ],
    "14779": [
        "SALAMANCA",
        "NY"
    ],
    "14781": [
        "SHERMAN",
        "NY"
    ],
    "14782": [
        "SINCLAIRVILLE",
        "NY"
    ],
    "14783": [
        "STEAMBURG",
        "NY"
    ],
    "14784": [
        "STOCKTON",
        "NY"
    ],
    "14785": [
        "STOW",
        "NY"
    ],
    "14786": [
        "WEST CLARKSVILLE",
        "NY"
    ],
    "14787": [
        "WESTFIELD",
        "NY"
    ],
    "14788": [
        "WESTONS MILLS",
        "NY"
    ],
    "14801": [
        "ADDISON",
        "NY"
    ],
    "14802": [
        "ALFRED",
        "NY"
    ],
    "14803": [
        "ALFRED STATION",
        "NY"
    ],
    "14804": [
        "ALMOND",
        "NY"
    ],
    "14805": [
        "ALPINE",
        "NY"
    ],
    "14806": [
        "ANDOVER",
        "NY"
    ],
    "14807": [
        "ARKPORT",
        "NY"
    ],
    "14808": [
        "ATLANTA",
        "NY"
    ],
    "14809": [
        "AVOCA",
        "NY"
    ],
    "14810": [
        "BATH",
        "NY"
    ],
    "14812": [
        "BEAVER DAMS",
        "NY"
    ],
    "14813": [
        "BELMONT",
        "NY"
    ],
    "14814": [
        "BIG FLATS",
        "NY"
    ],
    "14815": [
        "BRADFORD",
        "NY"
    ],
    "14816": [
        "BREESPORT",
        "NY"
    ],
    "14817": [
        "BROOKTONDALE",
        "NY"
    ],
    "14818": [
        "BURDETT",
        "NY"
    ],
    "14820": [
        "CAMERON MILLS",
        "NY"
    ],
    "14821": [
        "CAMPBELL",
        "NY"
    ],
    "14822": [
        "CANASERAGA",
        "NY"
    ],
    "14823": [
        "CANISTEO",
        "NY"
    ],
    "14824": [
        "CAYUTA",
        "NY"
    ],
    "14825": [
        "CHEMUNG",
        "NY"
    ],
    "14826": [
        "COHOCTON",
        "NY"
    ],
    "14827": [
        "COOPERS PLAINS",
        "NY"
    ],
    "14830": [
        "CORNING",
        "NY"
    ],
    "14831": [
        "CORNING",
        "NY"
    ],
    "14836": [
        "DALTON",
        "NY"
    ],
    "14837": [
        "DUNDEE",
        "NY"
    ],
    "14838": [
        "ERIN",
        "NY"
    ],
    "14839": [
        "GREENWOOD",
        "NY"
    ],
    "14840": [
        "HAMMONDSPORT",
        "NY"
    ],
    "14841": [
        "HECTOR",
        "NY"
    ],
    "14842": [
        "HIMROD",
        "NY"
    ],
    "14843": [
        "HORNELL",
        "NY"
    ],
    "14845": [
        "HORSEHEADS",
        "NY"
    ],
    "14846": [
        "HUNT",
        "NY"
    ],
    "14847": [
        "INTERLAKEN",
        "NY"
    ],
    "14850": [
        "ITHACA",
        "NY"
    ],
    "14851": [
        "ITHACA",
        "NY"
    ],
    "14852": [
        "ITHACA",
        "NY"
    ],
    "14853": [
        "ITHACA",
        "NY"
    ],
    "14854": [
        "JACKSONVILLE",
        "NY"
    ],
    "14855": [
        "JASPER",
        "NY"
    ],
    "14856": [
        "KANONA",
        "NY"
    ],
    "14857": [
        "LAKEMONT",
        "NY"
    ],
    "14858": [
        "LINDLEY",
        "NY"
    ],
    "14859": [
        "LOCKWOOD",
        "NY"
    ],
    "14860": [
        "LODI",
        "NY"
    ],
    "14861": [
        "LOWMAN",
        "NY"
    ],
    "14864": [
        "MILLPORT",
        "NY"
    ],
    "14865": [
        "MONTOUR FALLS",
        "NY"
    ],
    "14867": [
        "NEWFIELD",
        "NY"
    ],
    "14869": [
        "ODESSA",
        "NY"
    ],
    "14870": [
        "PAINTED POST",
        "NY"
    ],
    "14871": [
        "PINE CITY",
        "NY"
    ],
    "14872": [
        "PINE VALLEY",
        "NY"
    ],
    "14873": [
        "PRATTSBURGH",
        "NY"
    ],
    "14874": [
        "PULTENEY",
        "NY"
    ],
    "14876": [
        "READING CENTER",
        "NY"
    ],
    "14877": [
        "REXVILLE",
        "NY"
    ],
    "14878": [
        "ROCK STREAM",
        "NY"
    ],
    "14879": [
        "SAVONA",
        "NY"
    ],
    "14880": [
        "SCIO",
        "NY"
    ],
    "14881": [
        "SLATERVILLE SPRINGS",
        "NY"
    ],
    "14882": [
        "LANSING",
        "NY"
    ],
    "14883": [
        "SPENCER",
        "NY"
    ],
    "14884": [
        "SWAIN",
        "NY"
    ],
    "14885": [
        "TROUPSBURG",
        "NY"
    ],
    "14886": [
        "TRUMANSBURG",
        "NY"
    ],
    "14887": [
        "TYRONE",
        "NY"
    ],
    "14889": [
        "VAN ETTEN",
        "NY"
    ],
    "14891": [
        "WATKINS GLEN",
        "NY"
    ],
    "14892": [
        "WAVERLY",
        "NY"
    ],
    "14893": [
        "WAYNE",
        "NY"
    ],
    "14894": [
        "WELLSBURG",
        "NY"
    ],
    "14895": [
        "WELLSVILLE",
        "NY"
    ],
    "14897": [
        "WHITESVILLE",
        "NY"
    ],
    "14898": [
        "WOODHULL",
        "NY"
    ],
    "14901": [
        "ELMIRA",
        "NY"
    ],
    "14902": [
        "ELMIRA",
        "NY"
    ],
    "14903": [
        "ELMIRA",
        "NY"
    ],
    "14904": [
        "ELMIRA",
        "NY"
    ],
    "14905": [
        "ELMIRA",
        "NY"
    ],
    "15001": [
        "ALIQUIPPA",
        "PA"
    ],
    "15003": [
        "AMBRIDGE",
        "PA"
    ],
    "15004": [
        "ATLASBURG",
        "PA"
    ],
    "15005": [
        "BADEN",
        "PA"
    ],
    "15006": [
        "BAIRDFORD",
        "PA"
    ],
    "15007": [
        "BAKERSTOWN",
        "PA"
    ],
    "15009": [
        "BEAVER",
        "PA"
    ],
    "15010": [
        "BEAVER FALLS",
        "PA"
    ],
    "15012": [
        "BELLE VERNON",
        "PA"
    ],
    "15014": [
        "BRACKENRIDGE",
        "PA"
    ],
    "15015": [
        "BRADFORDWOODS",
        "PA"
    ],
    "15017": [
        "BRIDGEVILLE",
        "PA"
    ],
    "15018": [
        "BUENA VISTA",
        "PA"
    ],
    "15019": [
        "BULGER",
        "PA"
    ],
    "15020": [
        "BUNOLA",
        "PA"
    ],
    "15021": [
        "BURGETTSTOWN",
        "PA"
    ],
    "15022": [
        "CHARLEROI",
        "PA"
    ],
    "15024": [
        "CHESWICK",
        "PA"
    ],
    "15025": [
        "CLAIRTON",
        "PA"
    ],
    "15026": [
        "CLINTON",
        "PA"
    ],
    "15027": [
        "CONWAY",
        "PA"
    ],
    "15028": [
        "COULTERS",
        "PA"
    ],
    "15030": [
        "CREIGHTON",
        "PA"
    ],
    "15031": [
        "CUDDY",
        "PA"
    ],
    "15032": [
        "CURTISVILLE",
        "PA"
    ],
    "15033": [
        "DONORA",
        "PA"
    ],
    "15034": [
        "DRAVOSBURG",
        "PA"
    ],
    "15035": [
        "EAST MC KEESPORT",
        "PA"
    ],
    "15037": [
        "ELIZABETH",
        "PA"
    ],
    "15038": [
        "ELRAMA",
        "PA"
    ],
    "15042": [
        "FREEDOM",
        "PA"
    ],
    "15043": [
        "GEORGETOWN",
        "PA"
    ],
    "15044": [
        "GIBSONIA",
        "PA"
    ],
    "15045": [
        "GLASSPORT",
        "PA"
    ],
    "15046": [
        "CRESCENT",
        "PA"
    ],
    "15047": [
        "GREENOCK",
        "PA"
    ],
    "15049": [
        "HARWICK",
        "PA"
    ],
    "15050": [
        "HOOKSTOWN",
        "PA"
    ],
    "15051": [
        "INDIANOLA",
        "PA"
    ],
    "15052": [
        "INDUSTRY",
        "PA"
    ],
    "15053": [
        "JOFFRE",
        "PA"
    ],
    "15054": [
        "LANGELOTH",
        "PA"
    ],
    "15055": [
        "LAWRENCE",
        "PA"
    ],
    "15056": [
        "LEETSDALE",
        "PA"
    ],
    "15057": [
        "MC DONALD",
        "PA"
    ],
    "15059": [
        "MIDLAND",
        "PA"
    ],
    "15060": [
        "MIDWAY",
        "PA"
    ],
    "15061": [
        "MONACA",
        "PA"
    ],
    "15062": [
        "MONESSEN",
        "PA"
    ],
    "15063": [
        "MONONGAHELA",
        "PA"
    ],
    "15064": [
        "MORGAN",
        "PA"
    ],
    "15065": [
        "NATRONA HEIGHTS",
        "PA"
    ],
    "15066": [
        "NEW BRIGHTON",
        "PA"
    ],
    "15067": [
        "NEW EAGLE",
        "PA"
    ],
    "15068": [
        "NEW KENSINGTON",
        "PA"
    ],
    "15069": [
        "NEW KENSINGTON",
        "PA"
    ],
    "15071": [
        "OAKDALE",
        "PA"
    ],
    "15072": [
        "PRICEDALE",
        "PA"
    ],
    "15074": [
        "ROCHESTER",
        "PA"
    ],
    "15075": [
        "RURAL RIDGE",
        "PA"
    ],
    "15076": [
        "RUSSELLTON",
        "PA"
    ],
    "15077": [
        "SHIPPINGPORT",
        "PA"
    ],
    "15078": [
        "SLOVAN",
        "PA"
    ],
    "15081": [
        "SOUTH HEIGHTS",
        "PA"
    ],
    "15082": [
        "STURGEON",
        "PA"
    ],
    "15083": [
        "SUTERSVILLE",
        "PA"
    ],
    "15084": [
        "TARENTUM",
        "PA"
    ],
    "15085": [
        "TRAFFORD",
        "PA"
    ],
    "15086": [
        "WARRENDALE",
        "PA"
    ],
    "15087": [
        "WEBSTER",
        "PA"
    ],
    "15088": [
        "WEST ELIZABETH",
        "PA"
    ],
    "15089": [
        "WEST NEWTON",
        "PA"
    ],
    "15090": [
        "WEXFORD",
        "PA"
    ],
    "15091": [
        "WILDWOOD",
        "PA"
    ],
    "15095": [
        "WARRENDALE",
        "PA"
    ],
    "15096": [
        "WARRENDALE",
        "PA"
    ],
    "15101": [
        "ALLISON PARK",
        "PA"
    ],
    "15102": [
        "BETHEL PARK",
        "PA"
    ],
    "15104": [
        "BRADDOCK",
        "PA"
    ],
    "15106": [
        "CARNEGIE",
        "PA"
    ],
    "15108": [
        "CORAOPOLIS",
        "PA"
    ],
    "15110": [
        "DUQUESNE",
        "PA"
    ],
    "15112": [
        "EAST PITTSBURGH",
        "PA"
    ],
    "15116": [
        "GLENSHAW",
        "PA"
    ],
    "15120": [
        "HOMESTEAD",
        "PA"
    ],
    "15122": [
        "WEST MIFFLIN",
        "PA"
    ],
    "15123": [
        "WEST MIFFLIN",
        "PA"
    ],
    "15126": [
        "IMPERIAL",
        "PA"
    ],
    "15127": [
        "INGOMAR",
        "PA"
    ],
    "15129": [
        "SOUTH PARK",
        "PA"
    ],
    "15131": [
        "MCKEESPORT",
        "PA"
    ],
    "15132": [
        "MCKEESPORT",
        "PA"
    ],
    "15133": [
        "MCKEESPORT",
        "PA"
    ],
    "15134": [
        "MCKEESPORT",
        "PA"
    ],
    "15135": [
        "MCKEESPORT",
        "PA"
    ],
    "15136": [
        "MC KEES ROCKS",
        "PA"
    ],
    "15137": [
        "NORTH VERSAILLES",
        "PA"
    ],
    "15139": [
        "OAKMONT",
        "PA"
    ],
    "15140": [
        "PITCAIRN",
        "PA"
    ],
    "15142": [
        "PRESTO",
        "PA"
    ],
    "15143": [
        "SEWICKLEY",
        "PA"
    ],
    "15144": [
        "SPRINGDALE",
        "PA"
    ],
    "15145": [
        "TURTLE CREEK",
        "PA"
    ],
    "15146": [
        "MONROEVILLE",
        "PA"
    ],
    "15147": [
        "VERONA",
        "PA"
    ],
    "15148": [
        "WILMERDING",
        "PA"
    ],
    "15201": [
        "PITTSBURGH",
        "PA"
    ],
    "15202": [
        "PITTSBURGH",
        "PA"
    ],
    "15203": [
        "PITTSBURGH",
        "PA"
    ],
    "15204": [
        "PITTSBURGH",
        "PA"
    ],
    "15205": [
        "PITTSBURGH",
        "PA"
    ],
    "15206": [
        "PITTSBURGH",
        "PA"
    ],
    "15207": [
        "PITTSBURGH",
        "PA"
    ],
    "15208": [
        "PITTSBURGH",
        "PA"
    ],
    "15209": [
        "PITTSBURGH",
        "PA"
    ],
    "15210": [
        "PITTSBURGH",
        "PA"
    ],
    "15211": [
        "PITTSBURGH",
        "PA"
    ],
    "15212": [
        "PITTSBURGH",
        "PA"
    ],
    "15213": [
        "PITTSBURGH",
        "PA"
    ],
    "15214": [
        "PITTSBURGH",
        "PA"
    ],
    "15215": [
        "PITTSBURGH",
        "PA"
    ],
    "15216": [
        "PITTSBURGH",
        "PA"
    ],
    "15217": [
        "PITTSBURGH",
        "PA"
    ],
    "15218": [
        "PITTSBURGH",
        "PA"
    ],
    "15219": [
        "PITTSBURGH",
        "PA"
    ],
    "15220": [
        "PITTSBURGH",
        "PA"
    ],
    "15221": [
        "PITTSBURGH",
        "PA"
    ],
    "15222": [
        "PITTSBURGH",
        "PA"
    ],
    "15223": [
        "PITTSBURGH",
        "PA"
    ],
    "15224": [
        "PITTSBURGH",
        "PA"
    ],
    "15225": [
        "PITTSBURGH",
        "PA"
    ],
    "15226": [
        "PITTSBURGH",
        "PA"
    ],
    "15227": [
        "PITTSBURGH",
        "PA"
    ],
    "15228": [
        "PITTSBURGH",
        "PA"
    ],
    "15229": [
        "PITTSBURGH",
        "PA"
    ],
    "15230": [
        "PITTSBURGH",
        "PA"
    ],
    "15231": [
        "PITTSBURGH",
        "PA"
    ],
    "15232": [
        "PITTSBURGH",
        "PA"
    ],
    "15233": [
        "PITTSBURGH",
        "PA"
    ],
    "15234": [
        "PITTSBURGH",
        "PA"
    ],
    "15235": [
        "PITTSBURGH",
        "PA"
    ],
    "15236": [
        "PITTSBURGH",
        "PA"
    ],
    "15237": [
        "PITTSBURGH",
        "PA"
    ],
    "15238": [
        "PITTSBURGH",
        "PA"
    ],
    "15239": [
        "PITTSBURGH",
        "PA"
    ],
    "15240": [
        "PITTSBURGH",
        "PA"
    ],
    "15241": [
        "PITTSBURGH",
        "PA"
    ],
    "15242": [
        "PITTSBURGH",
        "PA"
    ],
    "15243": [
        "PITTSBURGH",
        "PA"
    ],
    "15244": [
        "PITTSBURGH",
        "PA"
    ],
    "15258": [
        "PITTSBURGH",
        "PA"
    ],
    "15259": [
        "PITTSBURGH",
        "PA"
    ],
    "15260": [
        "PITTSBURGH",
        "PA"
    ],
    "15261": [
        "PITTSBURGH",
        "PA"
    ],
    "15262": [
        "PITTSBURGH",
        "PA"
    ],
    "15272": [
        "PITTSBURGH",
        "PA"
    ],
    "15275": [
        "PITTSBURGH",
        "PA"
    ],
    "15276": [
        "PITTSBURGH",
        "PA"
    ],
    "15278": [
        "PITTSBURGH",
        "PA"
    ],
    "15282": [
        "PITTSBURGH",
        "PA"
    ],
    "15289": [
        "PITTSBURGH",
        "PA"
    ],
    "15290": [
        "PITTSBURGH",
        "PA"
    ],
    "15301": [
        "WASHINGTON",
        "PA"
    ],
    "15310": [
        "ALEPPO",
        "PA"
    ],
    "15311": [
        "AMITY",
        "PA"
    ],
    "15312": [
        "AVELLA",
        "PA"
    ],
    "15313": [
        "BEALLSVILLE",
        "PA"
    ],
    "15314": [
        "BENTLEYVILLE",
        "PA"
    ],
    "15315": [
        "BOBTOWN",
        "PA"
    ],
    "15316": [
        "BRAVE",
        "PA"
    ],
    "15317": [
        "CANONSBURG",
        "PA"
    ],
    "15320": [
        "CARMICHAELS",
        "PA"
    ],
    "15321": [
        "CECIL",
        "PA"
    ],
    "15322": [
        "CLARKSVILLE",
        "PA"
    ],
    "15323": [
        "CLAYSVILLE",
        "PA"
    ],
    "15324": [
        "COKEBURG",
        "PA"
    ],
    "15325": [
        "CRUCIBLE",
        "PA"
    ],
    "15327": [
        "DILLINER",
        "PA"
    ],
    "15329": [
        "PROSPERITY",
        "PA"
    ],
    "15330": [
        "EIGHTY FOUR",
        "PA"
    ],
    "15331": [
        "ELLSWORTH",
        "PA"
    ],
    "15332": [
        "FINLEYVILLE",
        "PA"
    ],
    "15333": [
        "FREDERICKTOWN",
        "PA"
    ],
    "15334": [
        "GARARDS FORT",
        "PA"
    ],
    "15336": [
        "GASTONVILLE",
        "PA"
    ],
    "15337": [
        "GRAYSVILLE",
        "PA"
    ],
    "15338": [
        "GREENSBORO",
        "PA"
    ],
    "15339": [
        "HENDERSONVILLE",
        "PA"
    ],
    "15340": [
        "HICKORY",
        "PA"
    ],
    "15341": [
        "HOLBROOK",
        "PA"
    ],
    "15342": [
        "HOUSTON",
        "PA"
    ],
    "15344": [
        "JEFFERSON",
        "PA"
    ],
    "15345": [
        "MARIANNA",
        "PA"
    ],
    "15346": [
        "MATHER",
        "PA"
    ],
    "15347": [
        "MEADOW LANDS",
        "PA"
    ],
    "15348": [
        "MILLSBORO",
        "PA"
    ],
    "15349": [
        "MOUNT MORRIS",
        "PA"
    ],
    "15350": [
        "MUSE",
        "PA"
    ],
    "15351": [
        "NEMACOLIN",
        "PA"
    ],
    "15352": [
        "NEW FREEPORT",
        "PA"
    ],
    "15353": [
        "NINEVEH",
        "PA"
    ],
    "15357": [
        "RICES LANDING",
        "PA"
    ],
    "15358": [
        "RICHEYVILLE",
        "PA"
    ],
    "15359": [
        "ROGERSVILLE",
        "PA"
    ],
    "15360": [
        "SCENERY HILL",
        "PA"
    ],
    "15362": [
        "SPRAGGS",
        "PA"
    ],
    "15363": [
        "STRABANE",
        "PA"
    ],
    "15364": [
        "SYCAMORE",
        "PA"
    ],
    "15365": [
        "TAYLORSTOWN",
        "PA"
    ],
    "15366": [
        "VAN VOORHIS",
        "PA"
    ],
    "15367": [
        "VENETIA",
        "PA"
    ],
    "15368": [
        "VESTABURG",
        "PA"
    ],
    "15370": [
        "WAYNESBURG",
        "PA"
    ],
    "15376": [
        "WEST ALEXANDER",
        "PA"
    ],
    "15377": [
        "WEST FINLEY",
        "PA"
    ],
    "15378": [
        "WESTLAND",
        "PA"
    ],
    "15379": [
        "WEST MIDDLETOWN",
        "PA"
    ],
    "15380": [
        "WIND RIDGE",
        "PA"
    ],
    "15401": [
        "UNIONTOWN",
        "PA"
    ],
    "15410": [
        "ADAH",
        "PA"
    ],
    "15411": [
        "ADDISON",
        "PA"
    ],
    "15412": [
        "ALLENPORT",
        "PA"
    ],
    "15413": [
        "ALLISON",
        "PA"
    ],
    "15415": [
        "BRIER HILL",
        "PA"
    ],
    "15416": [
        "BROWNFIELD",
        "PA"
    ],
    "15417": [
        "BROWNSVILLE",
        "PA"
    ],
    "15419": [
        "CALIFORNIA",
        "PA"
    ],
    "15420": [
        "CARDALE",
        "PA"
    ],
    "15421": [
        "CHALK HILL",
        "PA"
    ],
    "15422": [
        "CHESTNUT RIDGE",
        "PA"
    ],
    "15423": [
        "COAL CENTER",
        "PA"
    ],
    "15424": [
        "CONFLUENCE",
        "PA"
    ],
    "15425": [
        "CONNELLSVILLE",
        "PA"
    ],
    "15427": [
        "DAISYTOWN",
        "PA"
    ],
    "15428": [
        "DAWSON",
        "PA"
    ],
    "15430": [
        "DICKERSON RUN",
        "PA"
    ],
    "15431": [
        "DUNBAR",
        "PA"
    ],
    "15432": [
        "DUNLEVY",
        "PA"
    ],
    "15433": [
        "EAST MILLSBORO",
        "PA"
    ],
    "15434": [
        "ELCO",
        "PA"
    ],
    "15435": [
        "FAIRBANK",
        "PA"
    ],
    "15436": [
        "FAIRCHANCE",
        "PA"
    ],
    "15437": [
        "FARMINGTON",
        "PA"
    ],
    "15438": [
        "FAYETTE CITY",
        "PA"
    ],
    "15440": [
        "GIBBON GLADE",
        "PA"
    ],
    "15442": [
        "GRINDSTONE",
        "PA"
    ],
    "15443": [
        "HIBBS",
        "PA"
    ],
    "15444": [
        "HILLER",
        "PA"
    ],
    "15445": [
        "HOPWOOD",
        "PA"
    ],
    "15446": [
        "INDIAN HEAD",
        "PA"
    ],
    "15448": [
        "JACOBS CREEK",
        "PA"
    ],
    "15449": [
        "KEISTERVILLE",
        "PA"
    ],
    "15450": [
        "LA BELLE",
        "PA"
    ],
    "15451": [
        "LAKE LYNN",
        "PA"
    ],
    "15454": [
        "LECKRONE",
        "PA"
    ],
    "15455": [
        "LEISENRING",
        "PA"
    ],
    "15456": [
        "LEMONT FURNACE",
        "PA"
    ],
    "15458": [
        "MC CLELLANDTOWN",
        "PA"
    ],
    "15459": [
        "MARKLEYSBURG",
        "PA"
    ],
    "15460": [
        "MARTIN",
        "PA"
    ],
    "15461": [
        "MASONTOWN",
        "PA"
    ],
    "15462": [
        "MELCROFT",
        "PA"
    ],
    "15463": [
        "MERRITTSTOWN",
        "PA"
    ],
    "15464": [
        "MILL RUN",
        "PA"
    ],
    "15465": [
        "MOUNT BRADDOCK",
        "PA"
    ],
    "15466": [
        "NEWELL",
        "PA"
    ],
    "15467": [
        "NEW GENEVA",
        "PA"
    ],
    "15468": [
        "NEW SALEM",
        "PA"
    ],
    "15469": [
        "NORMALVILLE",
        "PA"
    ],
    "15470": [
        "OHIOPYLE",
        "PA"
    ],
    "15472": [
        "OLIVER",
        "PA"
    ],
    "15473": [
        "PERRYOPOLIS",
        "PA"
    ],
    "15474": [
        "POINT MARION",
        "PA"
    ],
    "15475": [
        "REPUBLIC",
        "PA"
    ],
    "15477": [
        "ROSCOE",
        "PA"
    ],
    "15478": [
        "SMITHFIELD",
        "PA"
    ],
    "15479": [
        "SMITHTON",
        "PA"
    ],
    "15480": [
        "SMOCK",
        "PA"
    ],
    "15482": [
        "STAR JUNCTION",
        "PA"
    ],
    "15483": [
        "STOCKDALE",
        "PA"
    ],
    "15484": [
        "ULEDI",
        "PA"
    ],
    "15485": [
        "URSINA",
        "PA"
    ],
    "15486": [
        "VANDERBILT",
        "PA"
    ],
    "15488": [
        "WALTERSBURG",
        "PA"
    ],
    "15489": [
        "WEST LEISENRING",
        "PA"
    ],
    "15490": [
        "WHITE",
        "PA"
    ],
    "15501": [
        "SOMERSET",
        "PA"
    ],
    "15502": [
        "HIDDEN VALLEY",
        "PA"
    ],
    "15520": [
        "ACOSTA",
        "PA"
    ],
    "15521": [
        "ALUM BANK",
        "PA"
    ],
    "15522": [
        "BEDFORD",
        "PA"
    ],
    "15530": [
        "BERLIN",
        "PA"
    ],
    "15531": [
        "BOSWELL",
        "PA"
    ],
    "15532": [
        "BOYNTON",
        "PA"
    ],
    "15533": [
        "BREEZEWOOD",
        "PA"
    ],
    "15534": [
        "BUFFALO MILLS",
        "PA"
    ],
    "15535": [
        "CLEARVILLE",
        "PA"
    ],
    "15536": [
        "CRYSTAL SPRING",
        "PA"
    ],
    "15537": [
        "EVERETT",
        "PA"
    ],
    "15538": [
        "FAIRHOPE",
        "PA"
    ],
    "15539": [
        "FISHERTOWN",
        "PA"
    ],
    "15540": [
        "FORT HILL",
        "PA"
    ],
    "15541": [
        "FRIEDENS",
        "PA"
    ],
    "15542": [
        "GARRETT",
        "PA"
    ],
    "15545": [
        "HYNDMAN",
        "PA"
    ],
    "15546": [
        "JENNERS",
        "PA"
    ],
    "15547": [
        "JENNERSTOWN",
        "PA"
    ],
    "15549": [
        "LISTIE",
        "PA"
    ],
    "15550": [
        "MANNS CHOICE",
        "PA"
    ],
    "15551": [
        "MARKLETON",
        "PA"
    ],
    "15552": [
        "MEYERSDALE",
        "PA"
    ],
    "15553": [
        "NEW BALTIMORE",
        "PA"
    ],
    "15554": [
        "NEW PARIS",
        "PA"
    ],
    "15557": [
        "ROCKWOOD",
        "PA"
    ],
    "15558": [
        "SALISBURY",
        "PA"
    ],
    "15559": [
        "SCHELLSBURG",
        "PA"
    ],
    "15560": [
        "SHANKSVILLE",
        "PA"
    ],
    "15561": [
        "SIPESVILLE",
        "PA"
    ],
    "15562": [
        "SPRINGS",
        "PA"
    ],
    "15563": [
        "STOYSTOWN",
        "PA"
    ],
    "15564": [
        "WELLERSBURG",
        "PA"
    ],
    "15565": [
        "WEST SALISBURY",
        "PA"
    ],
    "15601": [
        "GREENSBURG",
        "PA"
    ],
    "15605": [
        "GREENSBURG",
        "PA"
    ],
    "15610": [
        "ACME",
        "PA"
    ],
    "15611": [
        "ADAMSBURG",
        "PA"
    ],
    "15612": [
        "ALVERTON",
        "PA"
    ],
    "15613": [
        "APOLLO",
        "PA"
    ],
    "15615": [
        "ARDARA",
        "PA"
    ],
    "15616": [
        "ARMBRUST",
        "PA"
    ],
    "15617": [
        "ARONA",
        "PA"
    ],
    "15618": [
        "AVONMORE",
        "PA"
    ],
    "15619": [
        "BOVARD",
        "PA"
    ],
    "15620": [
        "BRADENVILLE",
        "PA"
    ],
    "15621": [
        "CALUMET",
        "PA"
    ],
    "15622": [
        "CHAMPION",
        "PA"
    ],
    "15623": [
        "CLARIDGE",
        "PA"
    ],
    "15624": [
        "CRABTREE",
        "PA"
    ],
    "15625": [
        "DARRAGH",
        "PA"
    ],
    "15626": [
        "DELMONT",
        "PA"
    ],
    "15627": [
        "DERRY",
        "PA"
    ],
    "15628": [
        "DONEGAL",
        "PA"
    ],
    "15629": [
        "EAST VANDERGRIFT",
        "PA"
    ],
    "15631": [
        "EVERSON",
        "PA"
    ],
    "15632": [
        "EXPORT",
        "PA"
    ],
    "15633": [
        "FORBES ROAD",
        "PA"
    ],
    "15634": [
        "GRAPEVILLE",
        "PA"
    ],
    "15635": [
        "HANNASTOWN",
        "PA"
    ],
    "15636": [
        "HARRISON CITY",
        "PA"
    ],
    "15637": [
        "HERMINIE",
        "PA"
    ],
    "15638": [
        "HOSTETTER",
        "PA"
    ],
    "15639": [
        "HUNKER",
        "PA"
    ],
    "15641": [
        "HYDE PARK",
        "PA"
    ],
    "15642": [
        "IRWIN",
        "PA"
    ],
    "15644": [
        "JEANNETTE",
        "PA"
    ],
    "15646": [
        "JONES MILLS",
        "PA"
    ],
    "15647": [
        "LARIMER",
        "PA"
    ],
    "15650": [
        "LATROBE",
        "PA"
    ],
    "15655": [
        "LAUGHLINTOWN",
        "PA"
    ],
    "15656": [
        "LEECHBURG",
        "PA"
    ],
    "15658": [
        "LIGONIER",
        "PA"
    ],
    "15660": [
        "LOWBER",
        "PA"
    ],
    "15661": [
        "LOYALHANNA",
        "PA"
    ],
    "15662": [
        "LUXOR",
        "PA"
    ],
    "15663": [
        "MADISON",
        "PA"
    ],
    "15664": [
        "MAMMOTH",
        "PA"
    ],
    "15665": [
        "MANOR",
        "PA"
    ],
    "15666": [
        "MOUNT PLEASANT",
        "PA"
    ],
    "15668": [
        "MURRYSVILLE",
        "PA"
    ],
    "15670": [
        "NEW ALEXANDRIA",
        "PA"
    ],
    "15671": [
        "NEW DERRY",
        "PA"
    ],
    "15672": [
        "NEW STANTON",
        "PA"
    ],
    "15673": [
        "NORTH APOLLO",
        "PA"
    ],
    "15674": [
        "NORVELT",
        "PA"
    ],
    "15675": [
        "PENN",
        "PA"
    ],
    "15676": [
        "PLEASANT UNITY",
        "PA"
    ],
    "15677": [
        "RECTOR",
        "PA"
    ],
    "15678": [
        "RILLTON",
        "PA"
    ],
    "15679": [
        "RUFFS DALE",
        "PA"
    ],
    "15680": [
        "SALINA",
        "PA"
    ],
    "15681": [
        "SALTSBURG",
        "PA"
    ],
    "15682": [
        "SCHENLEY",
        "PA"
    ],
    "15683": [
        "SCOTTDALE",
        "PA"
    ],
    "15684": [
        "SLICKVILLE",
        "PA"
    ],
    "15685": [
        "SOUTHWEST",
        "PA"
    ],
    "15686": [
        "SPRING CHURCH",
        "PA"
    ],
    "15687": [
        "STAHLSTOWN",
        "PA"
    ],
    "15688": [
        "TARRS",
        "PA"
    ],
    "15689": [
        "UNITED",
        "PA"
    ],
    "15690": [
        "VANDERGRIFT",
        "PA"
    ],
    "15691": [
        "WENDEL",
        "PA"
    ],
    "15692": [
        "WESTMORELAND CITY",
        "PA"
    ],
    "15693": [
        "WHITNEY",
        "PA"
    ],
    "15695": [
        "WYANO",
        "PA"
    ],
    "15696": [
        "YOUNGSTOWN",
        "PA"
    ],
    "15697": [
        "YOUNGWOOD",
        "PA"
    ],
    "15698": [
        "YUKON",
        "PA"
    ],
    "15701": [
        "INDIANA",
        "PA"
    ],
    "15705": [
        "INDIANA",
        "PA"
    ],
    "15710": [
        "ALVERDA",
        "PA"
    ],
    "15711": [
        "ANITA",
        "PA"
    ],
    "15712": [
        "ARCADIA",
        "PA"
    ],
    "15713": [
        "AULTMAN",
        "PA"
    ],
    "15714": [
        "NORTHERN CAMBRIA",
        "PA"
    ],
    "15715": [
        "BIG RUN",
        "PA"
    ],
    "15716": [
        "BLACK LICK",
        "PA"
    ],
    "15717": [
        "BLAIRSVILLE",
        "PA"
    ],
    "15720": [
        "BRUSH VALLEY",
        "PA"
    ],
    "15721": [
        "BURNSIDE",
        "PA"
    ],
    "15722": [
        "CARROLLTOWN",
        "PA"
    ],
    "15723": [
        "CHAMBERSVILLE",
        "PA"
    ],
    "15724": [
        "CHERRY TREE",
        "PA"
    ],
    "15725": [
        "CLARKSBURG",
        "PA"
    ],
    "15728": [
        "CLYMER",
        "PA"
    ],
    "15729": [
        "COMMODORE",
        "PA"
    ],
    "15730": [
        "COOLSPRING",
        "PA"
    ],
    "15731": [
        "CORAL",
        "PA"
    ],
    "15732": [
        "CREEKSIDE",
        "PA"
    ],
    "15733": [
        "DE LANCEY",
        "PA"
    ],
    "15734": [
        "DIXONVILLE",
        "PA"
    ],
    "15736": [
        "ELDERTON",
        "PA"
    ],
    "15737": [
        "ELMORA",
        "PA"
    ],
    "15738": [
        "EMEIGH",
        "PA"
    ],
    "15741": [
        "GIPSY",
        "PA"
    ],
    "15742": [
        "GLEN CAMPBELL",
        "PA"
    ],
    "15744": [
        "HAMILTON",
        "PA"
    ],
    "15745": [
        "HEILWOOD",
        "PA"
    ],
    "15746": [
        "HILLSDALE",
        "PA"
    ],
    "15747": [
        "HOME",
        "PA"
    ],
    "15748": [
        "HOMER CITY",
        "PA"
    ],
    "15750": [
        "JOSEPHINE",
        "PA"
    ],
    "15752": [
        "KENT",
        "PA"
    ],
    "15753": [
        "LA JOSE",
        "PA"
    ],
    "15754": [
        "LUCERNEMINES",
        "PA"
    ],
    "15756": [
        "MC INTYRE",
        "PA"
    ],
    "15757": [
        "MAHAFFEY",
        "PA"
    ],
    "15759": [
        "MARION CENTER",
        "PA"
    ],
    "15760": [
        "MARSTELLER",
        "PA"
    ],
    "15761": [
        "MENTCLE",
        "PA"
    ],
    "15762": [
        "NICKTOWN",
        "PA"
    ],
    "15763": [
        "NORTHPOINT",
        "PA"
    ],
    "15764": [
        "OLIVEBURG",
        "PA"
    ],
    "15765": [
        "PENN RUN",
        "PA"
    ],
    "15767": [
        "PUNXSUTAWNEY",
        "PA"
    ],
    "15770": [
        "RINGGOLD",
        "PA"
    ],
    "15771": [
        "ROCHESTER MILLS",
        "PA"
    ],
    "15772": [
        "ROSSITER",
        "PA"
    ],
    "15773": [
        "SAINT BENEDICT",
        "PA"
    ],
    "15774": [
        "SHELOCTA",
        "PA"
    ],
    "15775": [
        "SPANGLER",
        "PA"
    ],
    "15776": [
        "SPRANKLE MILLS",
        "PA"
    ],
    "15777": [
        "STARFORD",
        "PA"
    ],
    "15779": [
        "TORRANCE",
        "PA"
    ],
    "15780": [
        "VALIER",
        "PA"
    ],
    "15781": [
        "WALSTON",
        "PA"
    ],
    "15783": [
        "WEST LEBANON",
        "PA"
    ],
    "15784": [
        "WORTHVILLE",
        "PA"
    ],
    "15801": [
        "DU BOIS",
        "PA"
    ],
    "15821": [
        "BENEZETT",
        "PA"
    ],
    "15822": [
        "BRANDY CAMP",
        "PA"
    ],
    "15823": [
        "BROCKPORT",
        "PA"
    ],
    "15824": [
        "BROCKWAY",
        "PA"
    ],
    "15825": [
        "BROOKVILLE",
        "PA"
    ],
    "15827": [
        "BYRNEDALE",
        "PA"
    ],
    "15828": [
        "CLARINGTON",
        "PA"
    ],
    "15829": [
        "CORSICA",
        "PA"
    ],
    "15831": [
        "DAGUS MINES",
        "PA"
    ],
    "15832": [
        "DRIFTWOOD",
        "PA"
    ],
    "15834": [
        "EMPORIUM",
        "PA"
    ],
    "15840": [
        "FALLS CREEK",
        "PA"
    ],
    "15841": [
        "FORCE",
        "PA"
    ],
    "15845": [
        "JOHNSONBURG",
        "PA"
    ],
    "15846": [
        "KERSEY",
        "PA"
    ],
    "15847": [
        "KNOX DALE",
        "PA"
    ],
    "15848": [
        "LUTHERSBURG",
        "PA"
    ],
    "15849": [
        "PENFIELD",
        "PA"
    ],
    "15851": [
        "REYNOLDSVILLE",
        "PA"
    ],
    "15853": [
        "RIDGWAY",
        "PA"
    ],
    "15856": [
        "ROCKTON",
        "PA"
    ],
    "15857": [
        "SAINT MARYS",
        "PA"
    ],
    "15860": [
        "SIGEL",
        "PA"
    ],
    "15861": [
        "SINNAMAHONING",
        "PA"
    ],
    "15863": [
        "STUMP CREEK",
        "PA"
    ],
    "15864": [
        "SUMMERVILLE",
        "PA"
    ],
    "15865": [
        "SYKESVILLE",
        "PA"
    ],
    "15866": [
        "TROUTVILLE",
        "PA"
    ],
    "15868": [
        "WEEDVILLE",
        "PA"
    ],
    "15870": [
        "WILCOX",
        "PA"
    ],
    "15901": [
        "JOHNSTOWN",
        "PA"
    ],
    "15902": [
        "JOHNSTOWN",
        "PA"
    ],
    "15904": [
        "JOHNSTOWN",
        "PA"
    ],
    "15905": [
        "JOHNSTOWN",
        "PA"
    ],
    "15906": [
        "JOHNSTOWN",
        "PA"
    ],
    "15907": [
        "JOHNSTOWN",
        "PA"
    ],
    "15909": [
        "JOHNSTOWN",
        "PA"
    ],
    "15920": [
        "ARMAGH",
        "PA"
    ],
    "15921": [
        "BEAVERDALE",
        "PA"
    ],
    "15922": [
        "BELSANO",
        "PA"
    ],
    "15923": [
        "BOLIVAR",
        "PA"
    ],
    "15924": [
        "CAIRNBROOK",
        "PA"
    ],
    "15926": [
        "CENTRAL CITY",
        "PA"
    ],
    "15927": [
        "COLVER",
        "PA"
    ],
    "15928": [
        "DAVIDSVILLE",
        "PA"
    ],
    "15929": [
        "DILLTOWN",
        "PA"
    ],
    "15930": [
        "DUNLO",
        "PA"
    ],
    "15931": [
        "EBENSBURG",
        "PA"
    ],
    "15934": [
        "ELTON",
        "PA"
    ],
    "15935": [
        "HOLLSOPPLE",
        "PA"
    ],
    "15936": [
        "HOOVERSVILLE",
        "PA"
    ],
    "15937": [
        "JEROME",
        "PA"
    ],
    "15938": [
        "LILLY",
        "PA"
    ],
    "15940": [
        "LORETTO",
        "PA"
    ],
    "15942": [
        "MINERAL POINT",
        "PA"
    ],
    "15943": [
        "NANTY GLO",
        "PA"
    ],
    "15944": [
        "NEW FLORENCE",
        "PA"
    ],
    "15945": [
        "PARKHILL",
        "PA"
    ],
    "15946": [
        "PORTAGE",
        "PA"
    ],
    "15948": [
        "REVLOC",
        "PA"
    ],
    "15949": [
        "ROBINSON",
        "PA"
    ],
    "15951": [
        "SAINT MICHAEL",
        "PA"
    ],
    "15952": [
        "SALIX",
        "PA"
    ],
    "15953": [
        "SEANOR",
        "PA"
    ],
    "15954": [
        "SEWARD",
        "PA"
    ],
    "15955": [
        "SIDMAN",
        "PA"
    ],
    "15956": [
        "SOUTH FORK",
        "PA"
    ],
    "15957": [
        "STRONGSTOWN",
        "PA"
    ],
    "15958": [
        "SUMMERHILL",
        "PA"
    ],
    "15959": [
        "TIRE HILL",
        "PA"
    ],
    "15960": [
        "TWIN ROCKS",
        "PA"
    ],
    "15961": [
        "VINTONDALE",
        "PA"
    ],
    "15962": [
        "WILMORE",
        "PA"
    ],
    "15963": [
        "WINDBER",
        "PA"
    ],
    "16001": [
        "BUTLER",
        "PA"
    ],
    "16002": [
        "BUTLER",
        "PA"
    ],
    "16003": [
        "BUTLER",
        "PA"
    ],
    "16016": [
        "BOYERS",
        "PA"
    ],
    "16018": [
        "BOYERS",
        "PA"
    ],
    "16020": [
        "BOYERS",
        "PA"
    ],
    "16021": [
        "BRANCHTON",
        "PA"
    ],
    "16022": [
        "BRUIN",
        "PA"
    ],
    "16023": [
        "CABOT",
        "PA"
    ],
    "16024": [
        "CALLERY",
        "PA"
    ],
    "16025": [
        "CHICORA",
        "PA"
    ],
    "16027": [
        "CONNOQUENESSING",
        "PA"
    ],
    "16028": [
        "EAST BRADY",
        "PA"
    ],
    "16029": [
        "EAST BUTLER",
        "PA"
    ],
    "16030": [
        "EAU CLAIRE",
        "PA"
    ],
    "16033": [
        "EVANS CITY",
        "PA"
    ],
    "16034": [
        "FENELTON",
        "PA"
    ],
    "16035": [
        "FORESTVILLE",
        "PA"
    ],
    "16036": [
        "FOXBURG",
        "PA"
    ],
    "16037": [
        "HARMONY",
        "PA"
    ],
    "16038": [
        "HARRISVILLE",
        "PA"
    ],
    "16039": [
        "HERMAN",
        "PA"
    ],
    "16040": [
        "HILLIARDS",
        "PA"
    ],
    "16041": [
        "KARNS CITY",
        "PA"
    ],
    "16045": [
        "LYNDORA",
        "PA"
    ],
    "16046": [
        "MARS",
        "PA"
    ],
    "16048": [
        "NORTH WASHINGTON",
        "PA"
    ],
    "16049": [
        "PARKER",
        "PA"
    ],
    "16050": [
        "PETROLIA",
        "PA"
    ],
    "16051": [
        "PORTERSVILLE",
        "PA"
    ],
    "16052": [
        "PROSPECT",
        "PA"
    ],
    "16053": [
        "RENFREW",
        "PA"
    ],
    "16054": [
        "SAINT PETERSBURG",
        "PA"
    ],
    "16055": [
        "SARVER",
        "PA"
    ],
    "16056": [
        "SAXONBURG",
        "PA"
    ],
    "16057": [
        "SLIPPERY ROCK",
        "PA"
    ],
    "16058": [
        "TURKEY CITY",
        "PA"
    ],
    "16059": [
        "VALENCIA",
        "PA"
    ],
    "16061": [
        "WEST SUNBURY",
        "PA"
    ],
    "16063": [
        "ZELIENOPLE",
        "PA"
    ],
    "16066": [
        "CRANBERRY TOWNSHIP",
        "PA"
    ],
    "16101": [
        "NEW CASTLE",
        "PA"
    ],
    "16102": [
        "NEW CASTLE",
        "PA"
    ],
    "16103": [
        "NEW CASTLE",
        "PA"
    ],
    "16105": [
        "NEW CASTLE",
        "PA"
    ],
    "16107": [
        "NEW CASTLE",
        "PA"
    ],
    "16108": [
        "NEW CASTLE",
        "PA"
    ],
    "16110": [
        "ADAMSVILLE",
        "PA"
    ],
    "16111": [
        "ATLANTIC",
        "PA"
    ],
    "16112": [
        "BESSEMER",
        "PA"
    ],
    "16113": [
        "CLARK",
        "PA"
    ],
    "16114": [
        "CLARKS MILLS",
        "PA"
    ],
    "16115": [
        "DARLINGTON",
        "PA"
    ],
    "16116": [
        "EDINBURG",
        "PA"
    ],
    "16117": [
        "ELLWOOD CITY",
        "PA"
    ],
    "16120": [
        "ENON VALLEY",
        "PA"
    ],
    "16121": [
        "FARRELL",
        "PA"
    ],
    "16123": [
        "FOMBELL",
        "PA"
    ],
    "16124": [
        "FREDONIA",
        "PA"
    ],
    "16125": [
        "GREENVILLE",
        "PA"
    ],
    "16127": [
        "GROVE CITY",
        "PA"
    ],
    "16130": [
        "HADLEY",
        "PA"
    ],
    "16131": [
        "HARTSTOWN",
        "PA"
    ],
    "16132": [
        "HILLSVILLE",
        "PA"
    ],
    "16133": [
        "JACKSON CENTER",
        "PA"
    ],
    "16134": [
        "JAMESTOWN",
        "PA"
    ],
    "16136": [
        "KOPPEL",
        "PA"
    ],
    "16137": [
        "MERCER",
        "PA"
    ],
    "16140": [
        "NEW BEDFORD",
        "PA"
    ],
    "16141": [
        "NEW GALILEE",
        "PA"
    ],
    "16142": [
        "NEW WILMINGTON",
        "PA"
    ],
    "16143": [
        "PULASKI",
        "PA"
    ],
    "16145": [
        "SANDY LAKE",
        "PA"
    ],
    "16146": [
        "SHARON",
        "PA"
    ],
    "16148": [
        "HERMITAGE",
        "PA"
    ],
    "16150": [
        "SHARPSVILLE",
        "PA"
    ],
    "16151": [
        "SHEAKLEYVILLE",
        "PA"
    ],
    "16153": [
        "STONEBORO",
        "PA"
    ],
    "16154": [
        "TRANSFER",
        "PA"
    ],
    "16155": [
        "VILLA MARIA",
        "PA"
    ],
    "16156": [
        "VOLANT",
        "PA"
    ],
    "16157": [
        "WAMPUM",
        "PA"
    ],
    "16159": [
        "WEST MIDDLESEX",
        "PA"
    ],
    "16160": [
        "WEST PITTSBURG",
        "PA"
    ],
    "16161": [
        "WHEATLAND",
        "PA"
    ],
    "16172": [
        "NEW WILMINGTON",
        "PA"
    ],
    "16201": [
        "KITTANNING",
        "PA"
    ],
    "16210": [
        "ADRIAN",
        "PA"
    ],
    "16211": [
        "BEYER",
        "PA"
    ],
    "16212": [
        "CADOGAN",
        "PA"
    ],
    "16213": [
        "CALLENSBURG",
        "PA"
    ],
    "16214": [
        "CLARION",
        "PA"
    ],
    "16217": [
        "COOKSBURG",
        "PA"
    ],
    "16218": [
        "COWANSVILLE",
        "PA"
    ],
    "16220": [
        "CROWN",
        "PA"
    ],
    "16222": [
        "DAYTON",
        "PA"
    ],
    "16223": [
        "DISTANT",
        "PA"
    ],
    "16224": [
        "FAIRMOUNT CITY",
        "PA"
    ],
    "16226": [
        "FORD CITY",
        "PA"
    ],
    "16228": [
        "FORD CLIFF",
        "PA"
    ],
    "16229": [
        "FREEPORT",
        "PA"
    ],
    "16230": [
        "HAWTHORN",
        "PA"
    ],
    "16232": [
        "KNOX",
        "PA"
    ],
    "16233": [
        "LEEPER",
        "PA"
    ],
    "16234": [
        "LIMESTONE",
        "PA"
    ],
    "16235": [
        "LUCINDA",
        "PA"
    ],
    "16236": [
        "MC GRANN",
        "PA"
    ],
    "16238": [
        "MANORVILLE",
        "PA"
    ],
    "16239": [
        "MARIENVILLE",
        "PA"
    ],
    "16240": [
        "MAYPORT",
        "PA"
    ],
    "16242": [
        "NEW BETHLEHEM",
        "PA"
    ],
    "16244": [
        "NU MINE",
        "PA"
    ],
    "16245": [
        "OAK RIDGE",
        "PA"
    ],
    "16246": [
        "PLUMVILLE",
        "PA"
    ],
    "16248": [
        "RIMERSBURG",
        "PA"
    ],
    "16249": [
        "RURAL VALLEY",
        "PA"
    ],
    "16250": [
        "SAGAMORE",
        "PA"
    ],
    "16253": [
        "SEMINOLE",
        "PA"
    ],
    "16254": [
        "SHIPPENVILLE",
        "PA"
    ],
    "16255": [
        "SLIGO",
        "PA"
    ],
    "16256": [
        "SMICKSBURG",
        "PA"
    ],
    "16258": [
        "STRATTANVILLE",
        "PA"
    ],
    "16259": [
        "TEMPLETON",
        "PA"
    ],
    "16260": [
        "VOWINCKEL",
        "PA"
    ],
    "16262": [
        "WORTHINGTON",
        "PA"
    ],
    "16263": [
        "YATESBORO",
        "PA"
    ],
    "16301": [
        "OIL CITY",
        "PA"
    ],
    "16311": [
        "CARLTON",
        "PA"
    ],
    "16312": [
        "CHANDLERS VALLEY",
        "PA"
    ],
    "16313": [
        "CLARENDON",
        "PA"
    ],
    "16314": [
        "COCHRANTON",
        "PA"
    ],
    "16316": [
        "CONNEAUT LAKE",
        "PA"
    ],
    "16317": [
        "COOPERSTOWN",
        "PA"
    ],
    "16319": [
        "CRANBERRY",
        "PA"
    ],
    "16321": [
        "EAST HICKORY",
        "PA"
    ],
    "16322": [
        "ENDEAVOR",
        "PA"
    ],
    "16323": [
        "FRANKLIN",
        "PA"
    ],
    "16326": [
        "FRYBURG",
        "PA"
    ],
    "16327": [
        "GUYS MILLS",
        "PA"
    ],
    "16328": [
        "HYDETOWN",
        "PA"
    ],
    "16329": [
        "IRVINE",
        "PA"
    ],
    "16331": [
        "KOSSUTH",
        "PA"
    ],
    "16332": [
        "LICKINGVILLE",
        "PA"
    ],
    "16333": [
        "LUDLOW",
        "PA"
    ],
    "16334": [
        "MARBLE",
        "PA"
    ],
    "16335": [
        "MEADVILLE",
        "PA"
    ],
    "16340": [
        "PITTSFIELD",
        "PA"
    ],
    "16341": [
        "PLEASANTVILLE",
        "PA"
    ],
    "16342": [
        "POLK",
        "PA"
    ],
    "16343": [
        "RENO",
        "PA"
    ],
    "16344": [
        "ROUSEVILLE",
        "PA"
    ],
    "16345": [
        "RUSSELL",
        "PA"
    ],
    "16346": [
        "SENECA",
        "PA"
    ],
    "16347": [
        "SHEFFIELD",
        "PA"
    ],
    "16350": [
        "SUGAR GROVE",
        "PA"
    ],
    "16351": [
        "TIDIOUTE",
        "PA"
    ],
    "16352": [
        "TIONA",
        "PA"
    ],
    "16353": [
        "TIONESTA",
        "PA"
    ],
    "16354": [
        "TITUSVILLE",
        "PA"
    ],
    "16360": [
        "TOWNVILLE",
        "PA"
    ],
    "16361": [
        "TYLERSBURG",
        "PA"
    ],
    "16362": [
        "UTICA",
        "PA"
    ],
    "16364": [
        "VENUS",
        "PA"
    ],
    "16365": [
        "WARREN",
        "PA"
    ],
    "16370": [
        "WEST HICKORY",
        "PA"
    ],
    "16371": [
        "YOUNGSVILLE",
        "PA"
    ],
    "16372": [
        "CLINTONVILLE",
        "PA"
    ],
    "16373": [
        "EMLENTON",
        "PA"
    ],
    "16374": [
        "KENNERDELL",
        "PA"
    ],
    "16375": [
        "LAMARTINE",
        "PA"
    ],
    "16401": [
        "ALBION",
        "PA"
    ],
    "16402": [
        "BEAR LAKE",
        "PA"
    ],
    "16403": [
        "CAMBRIDGE SPRINGS",
        "PA"
    ],
    "16404": [
        "CENTERVILLE",
        "PA"
    ],
    "16405": [
        "COLUMBUS",
        "PA"
    ],
    "16406": [
        "CONNEAUTVILLE",
        "PA"
    ],
    "16407": [
        "CORRY",
        "PA"
    ],
    "16410": [
        "CRANESVILLE",
        "PA"
    ],
    "16411": [
        "EAST SPRINGFIELD",
        "PA"
    ],
    "16412": [
        "EDINBORO",
        "PA"
    ],
    "16415": [
        "FAIRVIEW",
        "PA"
    ],
    "16416": [
        "GARLAND",
        "PA"
    ],
    "16417": [
        "GIRARD",
        "PA"
    ],
    "16420": [
        "GRAND VALLEY",
        "PA"
    ],
    "16421": [
        "HARBORCREEK",
        "PA"
    ],
    "16422": [
        "HARMONSBURG",
        "PA"
    ],
    "16423": [
        "LAKE CITY",
        "PA"
    ],
    "16424": [
        "LINESVILLE",
        "PA"
    ],
    "16426": [
        "MC KEAN",
        "PA"
    ],
    "16427": [
        "MILL VILLAGE",
        "PA"
    ],
    "16428": [
        "NORTH EAST",
        "PA"
    ],
    "16430": [
        "NORTH SPRINGFIELD",
        "PA"
    ],
    "16433": [
        "SAEGERTOWN",
        "PA"
    ],
    "16434": [
        "SPARTANSBURG",
        "PA"
    ],
    "16435": [
        "SPRINGBORO",
        "PA"
    ],
    "16436": [
        "SPRING CREEK",
        "PA"
    ],
    "16438": [
        "UNION CITY",
        "PA"
    ],
    "16440": [
        "VENANGO",
        "PA"
    ],
    "16441": [
        "WATERFORD",
        "PA"
    ],
    "16442": [
        "WATTSBURG",
        "PA"
    ],
    "16443": [
        "WEST SPRINGFIELD",
        "PA"
    ],
    "16444": [
        "EDINBORO",
        "PA"
    ],
    "16501": [
        "ERIE",
        "PA"
    ],
    "16502": [
        "ERIE",
        "PA"
    ],
    "16503": [
        "ERIE",
        "PA"
    ],
    "16504": [
        "ERIE",
        "PA"
    ],
    "16505": [
        "ERIE",
        "PA"
    ],
    "16506": [
        "ERIE",
        "PA"
    ],
    "16507": [
        "ERIE",
        "PA"
    ],
    "16508": [
        "ERIE",
        "PA"
    ],
    "16509": [
        "ERIE",
        "PA"
    ],
    "16510": [
        "ERIE",
        "PA"
    ],
    "16511": [
        "ERIE",
        "PA"
    ],
    "16512": [
        "ERIE",
        "PA"
    ],
    "16514": [
        "ERIE",
        "PA"
    ],
    "16515": [
        "ERIE",
        "PA"
    ],
    "16530": [
        "ERIE",
        "PA"
    ],
    "16531": [
        "ERIE",
        "PA"
    ],
    "16534": [
        "ERIE",
        "PA"
    ],
    "16541": [
        "ERIE",
        "PA"
    ],
    "16544": [
        "ERIE",
        "PA"
    ],
    "16546": [
        "ERIE",
        "PA"
    ],
    "16550": [
        "ERIE",
        "PA"
    ],
    "16563": [
        "ERIE",
        "PA"
    ],
    "16565": [
        "ERIE",
        "PA"
    ],
    "16601": [
        "ALTOONA",
        "PA"
    ],
    "16602": [
        "ALTOONA",
        "PA"
    ],
    "16603": [
        "ALTOONA",
        "PA"
    ],
    "16611": [
        "ALEXANDRIA",
        "PA"
    ],
    "16613": [
        "ASHVILLE",
        "PA"
    ],
    "16616": [
        "BECCARIA",
        "PA"
    ],
    "16617": [
        "BELLWOOD",
        "PA"
    ],
    "16619": [
        "BLANDBURG",
        "PA"
    ],
    "16620": [
        "BRISBIN",
        "PA"
    ],
    "16621": [
        "BROAD TOP",
        "PA"
    ],
    "16622": [
        "CALVIN",
        "PA"
    ],
    "16623": [
        "CASSVILLE",
        "PA"
    ],
    "16624": [
        "CHEST SPRINGS",
        "PA"
    ],
    "16625": [
        "CLAYSBURG",
        "PA"
    ],
    "16627": [
        "COALPORT",
        "PA"
    ],
    "16629": [
        "COUPON",
        "PA"
    ],
    "16630": [
        "CRESSON",
        "PA"
    ],
    "16631": [
        "CURRYVILLE",
        "PA"
    ],
    "16633": [
        "DEFIANCE",
        "PA"
    ],
    "16634": [
        "DUDLEY",
        "PA"
    ],
    "16635": [
        "DUNCANSVILLE",
        "PA"
    ],
    "16636": [
        "DYSART",
        "PA"
    ],
    "16637": [
        "EAST FREEDOM",
        "PA"
    ],
    "16638": [
        "ENTRIKEN",
        "PA"
    ],
    "16639": [
        "FALLENTIMBER",
        "PA"
    ],
    "16640": [
        "FLINTON",
        "PA"
    ],
    "16641": [
        "GALLITZIN",
        "PA"
    ],
    "16644": [
        "GLASGOW",
        "PA"
    ],
    "16645": [
        "GLEN HOPE",
        "PA"
    ],
    "16646": [
        "HASTINGS",
        "PA"
    ],
    "16647": [
        "HESSTON",
        "PA"
    ],
    "16648": [
        "HOLLIDAYSBURG",
        "PA"
    ],
    "16650": [
        "HOPEWELL",
        "PA"
    ],
    "16651": [
        "HOUTZDALE",
        "PA"
    ],
    "16652": [
        "HUNTINGDON",
        "PA"
    ],
    "16654": [
        "HUNTINGDON",
        "PA"
    ],
    "16655": [
        "IMLER",
        "PA"
    ],
    "16656": [
        "IRVONA",
        "PA"
    ],
    "16657": [
        "JAMES CREEK",
        "PA"
    ],
    "16659": [
        "LOYSBURG",
        "PA"
    ],
    "16660": [
        "MC CONNELLSTOWN",
        "PA"
    ],
    "16661": [
        "MADERA",
        "PA"
    ],
    "16662": [
        "MARTINSBURG",
        "PA"
    ],
    "16663": [
        "MORANN",
        "PA"
    ],
    "16664": [
        "NEW ENTERPRISE",
        "PA"
    ],
    "16665": [
        "NEWRY",
        "PA"
    ],
    "16666": [
        "OSCEOLA MILLS",
        "PA"
    ],
    "16667": [
        "OSTERBURG",
        "PA"
    ],
    "16668": [
        "PATTON",
        "PA"
    ],
    "16669": [
        "PETERSBURG",
        "PA"
    ],
    "16671": [
        "RAMEY",
        "PA"
    ],
    "16672": [
        "RIDDLESBURG",
        "PA"
    ],
    "16673": [
        "ROARING SPRING",
        "PA"
    ],
    "16674": [
        "ROBERTSDALE",
        "PA"
    ],
    "16675": [
        "SAINT BONIFACE",
        "PA"
    ],
    "16677": [
        "SANDY RIDGE",
        "PA"
    ],
    "16678": [
        "SAXTON",
        "PA"
    ],
    "16679": [
        "SIX MILE RUN",
        "PA"
    ],
    "16680": [
        "SMITHMILL",
        "PA"
    ],
    "16681": [
        "SMOKERUN",
        "PA"
    ],
    "16683": [
        "SPRUCE CREEK",
        "PA"
    ],
    "16684": [
        "TIPTON",
        "PA"
    ],
    "16685": [
        "TODD",
        "PA"
    ],
    "16686": [
        "TYRONE",
        "PA"
    ],
    "16689": [
        "WATERFALL",
        "PA"
    ],
    "16692": [
        "WESTOVER",
        "PA"
    ],
    "16693": [
        "WILLIAMSBURG",
        "PA"
    ],
    "16695": [
        "WOODBURY",
        "PA"
    ],
    "16698": [
        "HOUTZDALE",
        "PA"
    ],
    "16699": [
        "CRESSON",
        "PA"
    ],
    "16701": [
        "BRADFORD",
        "PA"
    ],
    "16720": [
        "AUSTIN",
        "PA"
    ],
    "16724": [
        "CROSBY",
        "PA"
    ],
    "16725": [
        "CUSTER CITY",
        "PA"
    ],
    "16726": [
        "CYCLONE",
        "PA"
    ],
    "16727": [
        "DERRICK CITY",
        "PA"
    ],
    "16729": [
        "DUKE CENTER",
        "PA"
    ],
    "16730": [
        "EAST SMETHPORT",
        "PA"
    ],
    "16731": [
        "ELDRED",
        "PA"
    ],
    "16732": [
        "GIFFORD",
        "PA"
    ],
    "16733": [
        "HAZEL HURST",
        "PA"
    ],
    "16734": [
        "JAMES CITY",
        "PA"
    ],
    "16735": [
        "KANE",
        "PA"
    ],
    "16738": [
        "LEWIS RUN",
        "PA"
    ],
    "16740": [
        "MOUNT JEWETT",
        "PA"
    ],
    "16743": [
        "PORT ALLEGANY",
        "PA"
    ],
    "16744": [
        "REW",
        "PA"
    ],
    "16745": [
        "RIXFORD",
        "PA"
    ],
    "16746": [
        "ROULETTE",
        "PA"
    ],
    "16748": [
        "SHINGLEHOUSE",
        "PA"
    ],
    "16749": [
        "SMETHPORT",
        "PA"
    ],
    "16750": [
        "TURTLEPOINT",
        "PA"
    ],
    "16801": [
        "STATE COLLEGE",
        "PA"
    ],
    "16802": [
        "UNIVERSITY PARK",
        "PA"
    ],
    "16803": [
        "STATE COLLEGE",
        "PA"
    ],
    "16804": [
        "STATE COLLEGE",
        "PA"
    ],
    "16820": [
        "AARONSBURG",
        "PA"
    ],
    "16821": [
        "ALLPORT",
        "PA"
    ],
    "16822": [
        "BEECH CREEK",
        "PA"
    ],
    "16823": [
        "BELLEFONTE",
        "PA"
    ],
    "16825": [
        "BIGLER",
        "PA"
    ],
    "16826": [
        "BLANCHARD",
        "PA"
    ],
    "16827": [
        "BOALSBURG",
        "PA"
    ],
    "16828": [
        "CENTRE HALL",
        "PA"
    ],
    "16829": [
        "CLARENCE",
        "PA"
    ],
    "16830": [
        "CLEARFIELD",
        "PA"
    ],
    "16832": [
        "COBURN",
        "PA"
    ],
    "16833": [
        "CURWENSVILLE",
        "PA"
    ],
    "16834": [
        "DRIFTING",
        "PA"
    ],
    "16835": [
        "FLEMING",
        "PA"
    ],
    "16836": [
        "FRENCHVILLE",
        "PA"
    ],
    "16837": [
        "GLEN RICHEY",
        "PA"
    ],
    "16838": [
        "GRAMPIAN",
        "PA"
    ],
    "16839": [
        "GRASSFLAT",
        "PA"
    ],
    "16840": [
        "HAWK RUN",
        "PA"
    ],
    "16841": [
        "HOWARD",
        "PA"
    ],
    "16843": [
        "HYDE",
        "PA"
    ],
    "16844": [
        "JULIAN",
        "PA"
    ],
    "16845": [
        "KARTHAUS",
        "PA"
    ],
    "16847": [
        "KYLERTOWN",
        "PA"
    ],
    "16848": [
        "LAMAR",
        "PA"
    ],
    "16849": [
        "LANSE",
        "PA"
    ],
    "16851": [
        "LEMONT",
        "PA"
    ],
    "16852": [
        "MADISONBURG",
        "PA"
    ],
    "16853": [
        "MILESBURG",
        "PA"
    ],
    "16854": [
        "MILLHEIM",
        "PA"
    ],
    "16855": [
        "MINERAL SPRINGS",
        "PA"
    ],
    "16856": [
        "MINGOVILLE",
        "PA"
    ],
    "16858": [
        "MORRISDALE",
        "PA"
    ],
    "16859": [
        "MOSHANNON",
        "PA"
    ],
    "16860": [
        "MUNSON",
        "PA"
    ],
    "16861": [
        "NEW MILLPORT",
        "PA"
    ],
    "16863": [
        "OLANTA",
        "PA"
    ],
    "16865": [
        "PENNSYLVANIA FURNACE",
        "PA"
    ],
    "16866": [
        "PHILIPSBURG",
        "PA"
    ],
    "16868": [
        "PINE GROVE MILLS",
        "PA"
    ],
    "16870": [
        "PORT MATILDA",
        "PA"
    ],
    "16872": [
        "REBERSBURG",
        "PA"
    ],
    "16873": [
        "SHAWVILLE",
        "PA"
    ],
    "16874": [
        "SNOW SHOE",
        "PA"
    ],
    "16875": [
        "SPRING MILLS",
        "PA"
    ],
    "16876": [
        "WALLACETON",
        "PA"
    ],
    "16877": [
        "WARRIORS MARK",
        "PA"
    ],
    "16878": [
        "WEST DECATUR",
        "PA"
    ],
    "16879": [
        "WINBURNE",
        "PA"
    ],
    "16881": [
        "WOODLAND",
        "PA"
    ],
    "16882": [
        "WOODWARD",
        "PA"
    ],
    "16901": [
        "WELLSBORO",
        "PA"
    ],
    "16911": [
        "ARNOT",
        "PA"
    ],
    "16912": [
        "BLOSSBURG",
        "PA"
    ],
    "16914": [
        "COLUMBIA CROSS ROADS",
        "PA"
    ],
    "16915": [
        "COUDERSPORT",
        "PA"
    ],
    "16917": [
        "COVINGTON",
        "PA"
    ],
    "16920": [
        "ELKLAND",
        "PA"
    ],
    "16921": [
        "GAINES",
        "PA"
    ],
    "16922": [
        "GALETON",
        "PA"
    ],
    "16923": [
        "GENESEE",
        "PA"
    ],
    "16925": [
        "GILLETT",
        "PA"
    ],
    "16926": [
        "GRANVILLE SUMMIT",
        "PA"
    ],
    "16927": [
        "HARRISON VALLEY",
        "PA"
    ],
    "16928": [
        "KNOXVILLE",
        "PA"
    ],
    "16929": [
        "LAWRENCEVILLE",
        "PA"
    ],
    "16930": [
        "LIBERTY",
        "PA"
    ],
    "16932": [
        "MAINESBURG",
        "PA"
    ],
    "16933": [
        "MANSFIELD",
        "PA"
    ],
    "16935": [
        "MIDDLEBURY CENTER",
        "PA"
    ],
    "16936": [
        "MILLERTON",
        "PA"
    ],
    "16937": [
        "MILLS",
        "PA"
    ],
    "16938": [
        "MORRIS",
        "PA"
    ],
    "16939": [
        "MORRIS RUN",
        "PA"
    ],
    "16940": [
        "NELSON",
        "PA"
    ],
    "16941": [
        "GENESEE",
        "PA"
    ],
    "16942": [
        "OSCEOLA",
        "PA"
    ],
    "16943": [
        "SABINSVILLE",
        "PA"
    ],
    "16945": [
        "SYLVANIA",
        "PA"
    ],
    "16946": [
        "TIOGA",
        "PA"
    ],
    "16947": [
        "TROY",
        "PA"
    ],
    "16948": [
        "ULYSSES",
        "PA"
    ],
    "16950": [
        "WESTFIELD",
        "PA"
    ],
    "17001": [
        "CAMP HILL",
        "PA"
    ],
    "17002": [
        "ALLENSVILLE",
        "PA"
    ],
    "17003": [
        "ANNVILLE",
        "PA"
    ],
    "17004": [
        "BELLEVILLE",
        "PA"
    ],
    "17005": [
        "BERRYSBURG",
        "PA"
    ],
    "17006": [
        "BLAIN",
        "PA"
    ],
    "17007": [
        "BOILING SPRINGS",
        "PA"
    ],
    "17009": [
        "BURNHAM",
        "PA"
    ],
    "17010": [
        "CAMPBELLTOWN",
        "PA"
    ],
    "17011": [
        "CAMP HILL",
        "PA"
    ],
    "17012": [
        "CAMP HILL",
        "PA"
    ],
    "17013": [
        "CARLISLE",
        "PA"
    ],
    "17014": [
        "COCOLAMUS",
        "PA"
    ],
    "17015": [
        "CARLISLE",
        "PA"
    ],
    "17016": [
        "CORNWALL",
        "PA"
    ],
    "17017": [
        "DALMATIA",
        "PA"
    ],
    "17018": [
        "DAUPHIN",
        "PA"
    ],
    "17019": [
        "DILLSBURG",
        "PA"
    ],
    "17020": [
        "DUNCANNON",
        "PA"
    ],
    "17021": [
        "EAST WATERFORD",
        "PA"
    ],
    "17022": [
        "ELIZABETHTOWN",
        "PA"
    ],
    "17023": [
        "ELIZABETHVILLE",
        "PA"
    ],
    "17024": [
        "ELLIOTTSBURG",
        "PA"
    ],
    "17025": [
        "ENOLA",
        "PA"
    ],
    "17026": [
        "FREDERICKSBURG",
        "PA"
    ],
    "17027": [
        "GRANTHAM",
        "PA"
    ],
    "17028": [
        "GRANTVILLE",
        "PA"
    ],
    "17029": [
        "GRANVILLE",
        "PA"
    ],
    "17030": [
        "GRATZ",
        "PA"
    ],
    "17032": [
        "HALIFAX",
        "PA"
    ],
    "17033": [
        "HERSHEY",
        "PA"
    ],
    "17034": [
        "HIGHSPIRE",
        "PA"
    ],
    "17035": [
        "HONEY GROVE",
        "PA"
    ],
    "17036": [
        "HUMMELSTOWN",
        "PA"
    ],
    "17037": [
        "ICKESBURG",
        "PA"
    ],
    "17038": [
        "JONESTOWN",
        "PA"
    ],
    "17039": [
        "KLEINFELTERSVILLE",
        "PA"
    ],
    "17040": [
        "LANDISBURG",
        "PA"
    ],
    "17041": [
        "LAWN",
        "PA"
    ],
    "17042": [
        "LEBANON",
        "PA"
    ],
    "17043": [
        "LEMOYNE",
        "PA"
    ],
    "17044": [
        "LEWISTOWN",
        "PA"
    ],
    "17045": [
        "LIVERPOOL",
        "PA"
    ],
    "17046": [
        "LEBANON",
        "PA"
    ],
    "17047": [
        "LOYSVILLE",
        "PA"
    ],
    "17048": [
        "LYKENS",
        "PA"
    ],
    "17049": [
        "MC ALISTERVILLE",
        "PA"
    ],
    "17050": [
        "MECHANICSBURG",
        "PA"
    ],
    "17051": [
        "MC VEYTOWN",
        "PA"
    ],
    "17052": [
        "MAPLETON DEPOT",
        "PA"
    ],
    "17053": [
        "MARYSVILLE",
        "PA"
    ],
    "17054": [
        "MATTAWANA",
        "PA"
    ],
    "17055": [
        "MECHANICSBURG",
        "PA"
    ],
    "17056": [
        "MEXICO",
        "PA"
    ],
    "17057": [
        "MIDDLETOWN",
        "PA"
    ],
    "17058": [
        "MIFFLIN",
        "PA"
    ],
    "17059": [
        "MIFFLINTOWN",
        "PA"
    ],
    "17060": [
        "MILL CREEK",
        "PA"
    ],
    "17061": [
        "MILLERSBURG",
        "PA"
    ],
    "17062": [
        "MILLERSTOWN",
        "PA"
    ],
    "17063": [
        "MILROY",
        "PA"
    ],
    "17064": [
        "MOUNT GRETNA",
        "PA"
    ],
    "17065": [
        "MOUNT HOLLY SPRINGS",
        "PA"
    ],
    "17066": [
        "MOUNT UNION",
        "PA"
    ],
    "17067": [
        "MYERSTOWN",
        "PA"
    ],
    "17068": [
        "NEW BLOOMFIELD",
        "PA"
    ],
    "17069": [
        "NEW BUFFALO",
        "PA"
    ],
    "17070": [
        "NEW CUMBERLAND",
        "PA"
    ],
    "17072": [
        "NEW KINGSTOWN",
        "PA"
    ],
    "17073": [
        "NEWMANSTOWN",
        "PA"
    ],
    "17074": [
        "NEWPORT",
        "PA"
    ],
    "17075": [
        "NEWTON HAMILTON",
        "PA"
    ],
    "17076": [
        "OAKLAND MILLS",
        "PA"
    ],
    "17077": [
        "ONO",
        "PA"
    ],
    "17078": [
        "PALMYRA",
        "PA"
    ],
    "17080": [
        "PILLOW",
        "PA"
    ],
    "17081": [
        "PLAINFIELD",
        "PA"
    ],
    "17082": [
        "PORT ROYAL",
        "PA"
    ],
    "17083": [
        "QUENTIN",
        "PA"
    ],
    "17084": [
        "REEDSVILLE",
        "PA"
    ],
    "17085": [
        "REXMONT",
        "PA"
    ],
    "17086": [
        "RICHFIELD",
        "PA"
    ],
    "17087": [
        "RICHLAND",
        "PA"
    ],
    "17088": [
        "SCHAEFFERSTOWN",
        "PA"
    ],
    "17089": [
        "CAMP HILL",
        "PA"
    ],
    "17090": [
        "SHERMANS DALE",
        "PA"
    ],
    "17093": [
        "SUMMERDALE",
        "PA"
    ],
    "17094": [
        "THOMPSONTOWN",
        "PA"
    ],
    "17097": [
        "WICONISCO",
        "PA"
    ],
    "17098": [
        "WILLIAMSTOWN",
        "PA"
    ],
    "17099": [
        "YEAGERTOWN",
        "PA"
    ],
    "17101": [
        "HARRISBURG",
        "PA"
    ],
    "17102": [
        "HARRISBURG",
        "PA"
    ],
    "17103": [
        "HARRISBURG",
        "PA"
    ],
    "17104": [
        "HARRISBURG",
        "PA"
    ],
    "17105": [
        "HARRISBURG",
        "PA"
    ],
    "17106": [
        "HARRISBURG",
        "PA"
    ],
    "17107": [
        "HARRISBURG",
        "PA"
    ],
    "17108": [
        "HARRISBURG",
        "PA"
    ],
    "17109": [
        "HARRISBURG",
        "PA"
    ],
    "17110": [
        "HARRISBURG",
        "PA"
    ],
    "17111": [
        "HARRISBURG",
        "PA"
    ],
    "17112": [
        "HARRISBURG",
        "PA"
    ],
    "17113": [
        "HARRISBURG",
        "PA"
    ],
    "17120": [
        "HARRISBURG",
        "PA"
    ],
    "17122": [
        "HARRISBURG",
        "PA"
    ],
    "17123": [
        "HARRISBURG",
        "PA"
    ],
    "17125": [
        "HARRISBURG",
        "PA"
    ],
    "17126": [
        "HARRISBURG",
        "PA"
    ],
    "17140": [
        "HARRISBURG",
        "PA"
    ],
    "17177": [
        "HARRISBURG",
        "PA"
    ],
    "17201": [
        "CHAMBERSBURG",
        "PA"
    ],
    "17202": [
        "CHAMBERSBURG",
        "PA"
    ],
    "17211": [
        "ARTEMAS",
        "PA"
    ],
    "17212": [
        "BIG COVE TANNERY",
        "PA"
    ],
    "17213": [
        "BLAIRS MILLS",
        "PA"
    ],
    "17214": [
        "BLUE RIDGE SUMMIT",
        "PA"
    ],
    "17215": [
        "BURNT CABINS",
        "PA"
    ],
    "17217": [
        "CONCORD",
        "PA"
    ],
    "17219": [
        "DOYLESBURG",
        "PA"
    ],
    "17220": [
        "DRY RUN",
        "PA"
    ],
    "17221": [
        "FANNETTSBURG",
        "PA"
    ],
    "17222": [
        "FAYETTEVILLE",
        "PA"
    ],
    "17223": [
        "FORT LITTLETON",
        "PA"
    ],
    "17224": [
        "FORT LOUDON",
        "PA"
    ],
    "17225": [
        "GREENCASTLE",
        "PA"
    ],
    "17228": [
        "HARRISONVILLE",
        "PA"
    ],
    "17229": [
        "HUSTONTOWN",
        "PA"
    ],
    "17231": [
        "LEMASTERS",
        "PA"
    ],
    "17232": [
        "LURGAN",
        "PA"
    ],
    "17233": [
        "MC CONNELLSBURG",
        "PA"
    ],
    "17235": [
        "MARION",
        "PA"
    ],
    "17236": [
        "MERCERSBURG",
        "PA"
    ],
    "17237": [
        "MONT ALTO",
        "PA"
    ],
    "17238": [
        "NEEDMORE",
        "PA"
    ],
    "17239": [
        "NEELYTON",
        "PA"
    ],
    "17240": [
        "NEWBURG",
        "PA"
    ],
    "17241": [
        "NEWVILLE",
        "PA"
    ],
    "17243": [
        "ORBISONIA",
        "PA"
    ],
    "17244": [
        "ORRSTOWN",
        "PA"
    ],
    "17246": [
        "PLEASANT HALL",
        "PA"
    ],
    "17247": [
        "QUINCY",
        "PA"
    ],
    "17249": [
        "ROCKHILL FURNACE",
        "PA"
    ],
    "17250": [
        "ROUZERVILLE",
        "PA"
    ],
    "17251": [
        "ROXBURY",
        "PA"
    ],
    "17252": [
        "SAINT THOMAS",
        "PA"
    ],
    "17253": [
        "SALTILLO",
        "PA"
    ],
    "17254": [
        "SCOTLAND",
        "PA"
    ],
    "17255": [
        "SHADE GAP",
        "PA"
    ],
    "17256": [
        "SHADY GROVE",
        "PA"
    ],
    "17257": [
        "SHIPPENSBURG",
        "PA"
    ],
    "17260": [
        "SHIRLEYSBURG",
        "PA"
    ],
    "17261": [
        "SOUTH MOUNTAIN",
        "PA"
    ],
    "17262": [
        "SPRING RUN",
        "PA"
    ],
    "17263": [
        "STATE LINE",
        "PA"
    ],
    "17264": [
        "THREE SPRINGS",
        "PA"
    ],
    "17265": [
        "UPPERSTRASBURG",
        "PA"
    ],
    "17266": [
        "WALNUT BOTTOM",
        "PA"
    ],
    "17267": [
        "WARFORDSBURG",
        "PA"
    ],
    "17268": [
        "WAYNESBORO",
        "PA"
    ],
    "17271": [
        "WILLOW HILL",
        "PA"
    ],
    "17272": [
        "ZULLINGER",
        "PA"
    ],
    "17301": [
        "ABBOTTSTOWN",
        "PA"
    ],
    "17302": [
        "AIRVILLE",
        "PA"
    ],
    "17303": [
        "ARENDTSVILLE",
        "PA"
    ],
    "17304": [
        "ASPERS",
        "PA"
    ],
    "17306": [
        "BENDERSVILLE",
        "PA"
    ],
    "17307": [
        "BIGLERVILLE",
        "PA"
    ],
    "17309": [
        "BROGUE",
        "PA"
    ],
    "17310": [
        "CASHTOWN",
        "PA"
    ],
    "17311": [
        "CODORUS",
        "PA"
    ],
    "17312": [
        "CRALEY",
        "PA"
    ],
    "17313": [
        "DALLASTOWN",
        "PA"
    ],
    "17314": [
        "DELTA",
        "PA"
    ],
    "17315": [
        "DOVER",
        "PA"
    ],
    "17316": [
        "EAST BERLIN",
        "PA"
    ],
    "17317": [
        "EAST PROSPECT",
        "PA"
    ],
    "17318": [
        "EMIGSVILLE",
        "PA"
    ],
    "17319": [
        "ETTERS",
        "PA"
    ],
    "17320": [
        "FAIRFIELD",
        "PA"
    ],
    "17321": [
        "FAWN GROVE",
        "PA"
    ],
    "17322": [
        "FELTON",
        "PA"
    ],
    "17323": [
        "FRANKLINTOWN",
        "PA"
    ],
    "17324": [
        "GARDNERS",
        "PA"
    ],
    "17325": [
        "GETTYSBURG",
        "PA"
    ],
    "17327": [
        "GLEN ROCK",
        "PA"
    ],
    "17329": [
        "GLENVILLE",
        "PA"
    ],
    "17331": [
        "HANOVER",
        "PA"
    ],
    "17334": [
        "HANOVER",
        "PA"
    ],
    "17339": [
        "LEWISBERRY",
        "PA"
    ],
    "17340": [
        "LITTLESTOWN",
        "PA"
    ],
    "17342": [
        "LOGANVILLE",
        "PA"
    ],
    "17343": [
        "MC KNIGHTSTOWN",
        "PA"
    ],
    "17344": [
        "MC SHERRYSTOWN",
        "PA"
    ],
    "17345": [
        "MANCHESTER",
        "PA"
    ],
    "17347": [
        "MOUNT WOLF",
        "PA"
    ],
    "17349": [
        "NEW FREEDOM",
        "PA"
    ],
    "17350": [
        "NEW OXFORD",
        "PA"
    ],
    "17352": [
        "NEW PARK",
        "PA"
    ],
    "17353": [
        "ORRTANNA",
        "PA"
    ],
    "17355": [
        "RAILROAD",
        "PA"
    ],
    "17356": [
        "RED LION",
        "PA"
    ],
    "17358": [
        "ROSSVILLE",
        "PA"
    ],
    "17360": [
        "SEVEN VALLEYS",
        "PA"
    ],
    "17361": [
        "SHREWSBURY",
        "PA"
    ],
    "17362": [
        "SPRING GROVE",
        "PA"
    ],
    "17363": [
        "STEWARTSTOWN",
        "PA"
    ],
    "17364": [
        "THOMASVILLE",
        "PA"
    ],
    "17365": [
        "WELLSVILLE",
        "PA"
    ],
    "17366": [
        "WINDSOR",
        "PA"
    ],
    "17368": [
        "WRIGHTSVILLE",
        "PA"
    ],
    "17370": [
        "YORK HAVEN",
        "PA"
    ],
    "17371": [
        "YORK NEW SALEM",
        "PA"
    ],
    "17372": [
        "YORK SPRINGS",
        "PA"
    ],
    "17375": [
        "PEACH GLEN",
        "PA"
    ],
    "17401": [
        "YORK",
        "PA"
    ],
    "17402": [
        "YORK",
        "PA"
    ],
    "17403": [
        "YORK",
        "PA"
    ],
    "17404": [
        "YORK",
        "PA"
    ],
    "17405": [
        "YORK",
        "PA"
    ],
    "17406": [
        "YORK",
        "PA"
    ],
    "17407": [
        "YORK",
        "PA"
    ],
    "17408": [
        "YORK",
        "PA"
    ],
    "17501": [
        "AKRON",
        "PA"
    ],
    "17502": [
        "BAINBRIDGE",
        "PA"
    ],
    "17503": [
        "BART",
        "PA"
    ],
    "17505": [
        "BIRD IN HAND",
        "PA"
    ],
    "17506": [
        "BLUE BALL",
        "PA"
    ],
    "17507": [
        "BOWMANSVILLE",
        "PA"
    ],
    "17508": [
        "BROWNSTOWN",
        "PA"
    ],
    "17509": [
        "CHRISTIANA",
        "PA"
    ],
    "17512": [
        "COLUMBIA",
        "PA"
    ],
    "17516": [
        "CONESTOGA",
        "PA"
    ],
    "17517": [
        "DENVER",
        "PA"
    ],
    "17518": [
        "DRUMORE",
        "PA"
    ],
    "17519": [
        "EAST EARL",
        "PA"
    ],
    "17520": [
        "EAST PETERSBURG",
        "PA"
    ],
    "17521": [
        "ELM",
        "PA"
    ],
    "17522": [
        "EPHRATA",
        "PA"
    ],
    "17527": [
        "GAP",
        "PA"
    ],
    "17528": [
        "GOODVILLE",
        "PA"
    ],
    "17529": [
        "GORDONVILLE",
        "PA"
    ],
    "17532": [
        "HOLTWOOD",
        "PA"
    ],
    "17533": [
        "HOPELAND",
        "PA"
    ],
    "17534": [
        "INTERCOURSE",
        "PA"
    ],
    "17535": [
        "KINZERS",
        "PA"
    ],
    "17536": [
        "KIRKWOOD",
        "PA"
    ],
    "17537": [
        "LAMPETER",
        "PA"
    ],
    "17538": [
        "LANDISVILLE",
        "PA"
    ],
    "17540": [
        "LEOLA",
        "PA"
    ],
    "17543": [
        "LITITZ",
        "PA"
    ],
    "17545": [
        "MANHEIM",
        "PA"
    ],
    "17547": [
        "MARIETTA",
        "PA"
    ],
    "17549": [
        "MARTINDALE",
        "PA"
    ],
    "17550": [
        "MAYTOWN",
        "PA"
    ],
    "17551": [
        "MILLERSVILLE",
        "PA"
    ],
    "17552": [
        "MOUNT JOY",
        "PA"
    ],
    "17554": [
        "MOUNTVILLE",
        "PA"
    ],
    "17555": [
        "NARVON",
        "PA"
    ],
    "17557": [
        "NEW HOLLAND",
        "PA"
    ],
    "17560": [
        "NEW PROVIDENCE",
        "PA"
    ],
    "17562": [
        "PARADISE",
        "PA"
    ],
    "17563": [
        "PEACH BOTTOM",
        "PA"
    ],
    "17564": [
        "PENRYN",
        "PA"
    ],
    "17565": [
        "PEQUEA",
        "PA"
    ],
    "17566": [
        "QUARRYVILLE",
        "PA"
    ],
    "17567": [
        "REAMSTOWN",
        "PA"
    ],
    "17568": [
        "REFTON",
        "PA"
    ],
    "17569": [
        "REINHOLDS",
        "PA"
    ],
    "17570": [
        "RHEEMS",
        "PA"
    ],
    "17572": [
        "RONKS",
        "PA"
    ],
    "17575": [
        "SILVER SPRING",
        "PA"
    ],
    "17576": [
        "SMOKETOWN",
        "PA"
    ],
    "17578": [
        "STEVENS",
        "PA"
    ],
    "17579": [
        "STRASBURG",
        "PA"
    ],
    "17580": [
        "TALMAGE",
        "PA"
    ],
    "17581": [
        "TERRE HILL",
        "PA"
    ],
    "17582": [
        "WASHINGTON BORO",
        "PA"
    ],
    "17583": [
        "WEST WILLOW",
        "PA"
    ],
    "17584": [
        "WILLOW STREET",
        "PA"
    ],
    "17585": [
        "WITMER",
        "PA"
    ],
    "17601": [
        "LANCASTER",
        "PA"
    ],
    "17602": [
        "LANCASTER",
        "PA"
    ],
    "17603": [
        "LANCASTER",
        "PA"
    ],
    "17604": [
        "LANCASTER",
        "PA"
    ],
    "17605": [
        "LANCASTER",
        "PA"
    ],
    "17606": [
        "LANCASTER",
        "PA"
    ],
    "17607": [
        "LANCASTER",
        "PA"
    ],
    "17608": [
        "LANCASTER",
        "PA"
    ],
    "17701": [
        "WILLIAMSPORT",
        "PA"
    ],
    "17702": [
        "WILLIAMSPORT",
        "PA"
    ],
    "17703": [
        "WILLIAMSPORT",
        "PA"
    ],
    "17705": [
        "WILLIAMSPORT",
        "PA"
    ],
    "17720": [
        "ANTES FORT",
        "PA"
    ],
    "17721": [
        "AVIS",
        "PA"
    ],
    "17724": [
        "CANTON",
        "PA"
    ],
    "17726": [
        "CASTANEA",
        "PA"
    ],
    "17727": [
        "CEDAR RUN",
        "PA"
    ],
    "17728": [
        "COGAN STATION",
        "PA"
    ],
    "17729": [
        "CROSS FORK",
        "PA"
    ],
    "17730": [
        "DEWART",
        "PA"
    ],
    "17731": [
        "EAGLES MERE",
        "PA"
    ],
    "17737": [
        "HUGHESVILLE",
        "PA"
    ],
    "17740": [
        "JERSEY SHORE",
        "PA"
    ],
    "17742": [
        "LAIRDSVILLE",
        "PA"
    ],
    "17744": [
        "LINDEN",
        "PA"
    ],
    "17745": [
        "LOCK HAVEN",
        "PA"
    ],
    "17747": [
        "LOGANTON",
        "PA"
    ],
    "17748": [
        "MC ELHATTAN",
        "PA"
    ],
    "17749": [
        "MC EWENSVILLE",
        "PA"
    ],
    "17750": [
        "MACKEYVILLE",
        "PA"
    ],
    "17751": [
        "MILL HALL",
        "PA"
    ],
    "17752": [
        "MONTGOMERY",
        "PA"
    ],
    "17754": [
        "MONTOURSVILLE",
        "PA"
    ],
    "17756": [
        "MUNCY",
        "PA"
    ],
    "17758": [
        "MUNCY VALLEY",
        "PA"
    ],
    "17760": [
        "NORTH BEND",
        "PA"
    ],
    "17762": [
        "PICTURE ROCKS",
        "PA"
    ],
    "17763": [
        "RALSTON",
        "PA"
    ],
    "17764": [
        "RENOVO",
        "PA"
    ],
    "17765": [
        "ROARING BRANCH",
        "PA"
    ],
    "17768": [
        "SHUNK",
        "PA"
    ],
    "17769": [
        "SLATE RUN",
        "PA"
    ],
    "17771": [
        "TROUT RUN",
        "PA"
    ],
    "17772": [
        "TURBOTVILLE",
        "PA"
    ],
    "17774": [
        "UNITYVILLE",
        "PA"
    ],
    "17776": [
        "WATERVILLE",
        "PA"
    ],
    "17777": [
        "WATSONTOWN",
        "PA"
    ],
    "17778": [
        "WESTPORT",
        "PA"
    ],
    "17779": [
        "WOOLRICH",
        "PA"
    ],
    "17801": [
        "SUNBURY",
        "PA"
    ],
    "17810": [
        "ALLENWOOD",
        "PA"
    ],
    "17812": [
        "BEAVER SPRINGS",
        "PA"
    ],
    "17813": [
        "BEAVERTOWN",
        "PA"
    ],
    "17814": [
        "BENTON",
        "PA"
    ],
    "17815": [
        "BLOOMSBURG",
        "PA"
    ],
    "17820": [
        "CATAWISSA",
        "PA"
    ],
    "17821": [
        "DANVILLE",
        "PA"
    ],
    "17822": [
        "DANVILLE",
        "PA"
    ],
    "17823": [
        "DORNSIFE",
        "PA"
    ],
    "17824": [
        "ELYSBURG",
        "PA"
    ],
    "17827": [
        "FREEBURG",
        "PA"
    ],
    "17829": [
        "HARTLETON",
        "PA"
    ],
    "17830": [
        "HERNDON",
        "PA"
    ],
    "17831": [
        "HUMMELS WHARF",
        "PA"
    ],
    "17832": [
        "MARION HEIGHTS",
        "PA"
    ],
    "17833": [
        "KREAMER",
        "PA"
    ],
    "17834": [
        "KULPMONT",
        "PA"
    ],
    "17835": [
        "LAURELTON",
        "PA"
    ],
    "17836": [
        "LECK KILL",
        "PA"
    ],
    "17837": [
        "LEWISBURG",
        "PA"
    ],
    "17839": [
        "LIGHTSTREET",
        "PA"
    ],
    "17840": [
        "LOCUST GAP",
        "PA"
    ],
    "17841": [
        "MC CLURE",
        "PA"
    ],
    "17842": [
        "MIDDLEBURG",
        "PA"
    ],
    "17844": [
        "MIFFLINBURG",
        "PA"
    ],
    "17845": [
        "MILLMONT",
        "PA"
    ],
    "17846": [
        "MILLVILLE",
        "PA"
    ],
    "17847": [
        "MILTON",
        "PA"
    ],
    "17850": [
        "MONTANDON",
        "PA"
    ],
    "17851": [
        "MOUNT CARMEL",
        "PA"
    ],
    "17853": [
        "MOUNT PLEASANT MILLS",
        "PA"
    ],
    "17855": [
        "NEW BERLIN",
        "PA"
    ],
    "17856": [
        "NEW COLUMBIA",
        "PA"
    ],
    "17857": [
        "NORTHUMBERLAND",
        "PA"
    ],
    "17858": [
        "NUMIDIA",
        "PA"
    ],
    "17859": [
        "ORANGEVILLE",
        "PA"
    ],
    "17860": [
        "PAXINOS",
        "PA"
    ],
    "17861": [
        "PAXTONVILLE",
        "PA"
    ],
    "17862": [
        "PENNS CREEK",
        "PA"
    ],
    "17864": [
        "PORT TREVORTON",
        "PA"
    ],
    "17865": [
        "POTTS GROVE",
        "PA"
    ],
    "17866": [
        "COAL TOWNSHIP",
        "PA"
    ],
    "17867": [
        "REBUCK",
        "PA"
    ],
    "17868": [
        "RIVERSIDE",
        "PA"
    ],
    "17870": [
        "SELINSGROVE",
        "PA"
    ],
    "17872": [
        "SHAMOKIN",
        "PA"
    ],
    "17876": [
        "SHAMOKIN DAM",
        "PA"
    ],
    "17877": [
        "SNYDERTOWN",
        "PA"
    ],
    "17878": [
        "STILLWATER",
        "PA"
    ],
    "17880": [
        "SWENGEL",
        "PA"
    ],
    "17881": [
        "TREVORTON",
        "PA"
    ],
    "17883": [
        "VICKSBURG",
        "PA"
    ],
    "17884": [
        "WASHINGTONVILLE",
        "PA"
    ],
    "17885": [
        "WEIKERT",
        "PA"
    ],
    "17886": [
        "WEST MILTON",
        "PA"
    ],
    "17887": [
        "WHITE DEER",
        "PA"
    ],
    "17888": [
        "WILBURTON",
        "PA"
    ],
    "17889": [
        "WINFIELD",
        "PA"
    ],
    "17901": [
        "POTTSVILLE",
        "PA"
    ],
    "17920": [
        "ARISTES",
        "PA"
    ],
    "17921": [
        "ASHLAND",
        "PA"
    ],
    "17922": [
        "AUBURN",
        "PA"
    ],
    "17923": [
        "BRANCHDALE",
        "PA"
    ],
    "17925": [
        "BROCKTON",
        "PA"
    ],
    "17929": [
        "CRESSONA",
        "PA"
    ],
    "17930": [
        "CUMBOLA",
        "PA"
    ],
    "17931": [
        "FRACKVILLE",
        "PA"
    ],
    "17933": [
        "FRIEDENSBURG",
        "PA"
    ],
    "17934": [
        "GILBERTON",
        "PA"
    ],
    "17935": [
        "GIRARDVILLE",
        "PA"
    ],
    "17936": [
        "GORDON",
        "PA"
    ],
    "17938": [
        "HEGINS",
        "PA"
    ],
    "17941": [
        "KLINGERSTOWN",
        "PA"
    ],
    "17943": [
        "LAVELLE",
        "PA"
    ],
    "17944": [
        "LLEWELLYN",
        "PA"
    ],
    "17945": [
        "LOCUSTDALE",
        "PA"
    ],
    "17948": [
        "MAHANOY CITY",
        "PA"
    ],
    "17949": [
        "MAHANOY PLANE",
        "PA"
    ],
    "17951": [
        "MAR LIN",
        "PA"
    ],
    "17952": [
        "MARY D",
        "PA"
    ],
    "17953": [
        "MIDDLEPORT",
        "PA"
    ],
    "17954": [
        "MINERSVILLE",
        "PA"
    ],
    "17957": [
        "MUIR",
        "PA"
    ],
    "17959": [
        "NEW PHILADELPHIA",
        "PA"
    ],
    "17960": [
        "NEW RINGGOLD",
        "PA"
    ],
    "17961": [
        "ORWIGSBURG",
        "PA"
    ],
    "17963": [
        "PINE GROVE",
        "PA"
    ],
    "17964": [
        "PITMAN",
        "PA"
    ],
    "17965": [
        "PORT CARBON",
        "PA"
    ],
    "17967": [
        "RINGTOWN",
        "PA"
    ],
    "17968": [
        "SACRAMENTO",
        "PA"
    ],
    "17970": [
        "SAINT CLAIR",
        "PA"
    ],
    "17972": [
        "SCHUYLKILL HAVEN",
        "PA"
    ],
    "17974": [
        "SELTZER",
        "PA"
    ],
    "17976": [
        "SHENANDOAH",
        "PA"
    ],
    "17978": [
        "SPRING GLEN",
        "PA"
    ],
    "17979": [
        "SUMMIT STATION",
        "PA"
    ],
    "17980": [
        "TOWER CITY",
        "PA"
    ],
    "17981": [
        "TREMONT",
        "PA"
    ],
    "17982": [
        "TUSCARORA",
        "PA"
    ],
    "17983": [
        "VALLEY VIEW",
        "PA"
    ],
    "17985": [
        "ZION GROVE",
        "PA"
    ],
    "18001": [
        "LEHIGH VALLEY",
        "PA"
    ],
    "18002": [
        "LEHIGH VALLEY",
        "PA"
    ],
    "18003": [
        "LEHIGH VALLEY",
        "PA"
    ],
    "18010": [
        "ACKERMANVILLE",
        "PA"
    ],
    "18011": [
        "ALBURTIS",
        "PA"
    ],
    "18013": [
        "BANGOR",
        "PA"
    ],
    "18014": [
        "BATH",
        "PA"
    ],
    "18015": [
        "BETHLEHEM",
        "PA"
    ],
    "18016": [
        "BETHLEHEM",
        "PA"
    ],
    "18017": [
        "BETHLEHEM",
        "PA"
    ],
    "18018": [
        "BETHLEHEM",
        "PA"
    ],
    "18020": [
        "BETHLEHEM",
        "PA"
    ],
    "18025": [
        "BETHLEHEM",
        "PA"
    ],
    "18030": [
        "BOWMANSTOWN",
        "PA"
    ],
    "18031": [
        "BREINIGSVILLE",
        "PA"
    ],
    "18032": [
        "CATASAUQUA",
        "PA"
    ],
    "18034": [
        "CENTER VALLEY",
        "PA"
    ],
    "18035": [
        "CHERRYVILLE",
        "PA"
    ],
    "18036": [
        "COOPERSBURG",
        "PA"
    ],
    "18037": [
        "COPLAY",
        "PA"
    ],
    "18038": [
        "DANIELSVILLE",
        "PA"
    ],
    "18039": [
        "DURHAM",
        "PA"
    ],
    "18040": [
        "EASTON",
        "PA"
    ],
    "18041": [
        "EAST GREENVILLE",
        "PA"
    ],
    "18042": [
        "EASTON",
        "PA"
    ],
    "18043": [
        "EASTON",
        "PA"
    ],
    "18044": [
        "EASTON",
        "PA"
    ],
    "18045": [
        "EASTON",
        "PA"
    ],
    "18046": [
        "EAST TEXAS",
        "PA"
    ],
    "18049": [
        "EMMAUS",
        "PA"
    ],
    "18050": [
        "FLICKSVILLE",
        "PA"
    ],
    "18051": [
        "FOGELSVILLE",
        "PA"
    ],
    "18052": [
        "WHITEHALL",
        "PA"
    ],
    "18053": [
        "GERMANSVILLE",
        "PA"
    ],
    "18054": [
        "GREEN LANE",
        "PA"
    ],
    "18055": [
        "HELLERTOWN",
        "PA"
    ],
    "18056": [
        "HEREFORD",
        "PA"
    ],
    "18058": [
        "KUNKLETOWN",
        "PA"
    ],
    "18059": [
        "LAURYS STATION",
        "PA"
    ],
    "18060": [
        "LIMEPORT",
        "PA"
    ],
    "18062": [
        "MACUNGIE",
        "PA"
    ],
    "18063": [
        "MARTINS CREEK",
        "PA"
    ],
    "18064": [
        "NAZARETH",
        "PA"
    ],
    "18065": [
        "NEFFS",
        "PA"
    ],
    "18066": [
        "NEW TRIPOLI",
        "PA"
    ],
    "18067": [
        "NORTHAMPTON",
        "PA"
    ],
    "18068": [
        "OLD ZIONSVILLE",
        "PA"
    ],
    "18069": [
        "OREFIELD",
        "PA"
    ],
    "18070": [
        "PALM",
        "PA"
    ],
    "18071": [
        "PALMERTON",
        "PA"
    ],
    "18072": [
        "PEN ARGYL",
        "PA"
    ],
    "18073": [
        "PENNSBURG",
        "PA"
    ],
    "18074": [
        "PERKIOMENVILLE",
        "PA"
    ],
    "18076": [
        "RED HILL",
        "PA"
    ],
    "18077": [
        "RIEGELSVILLE",
        "PA"
    ],
    "18078": [
        "SCHNECKSVILLE",
        "PA"
    ],
    "18079": [
        "SLATEDALE",
        "PA"
    ],
    "18080": [
        "SLATINGTON",
        "PA"
    ],
    "18081": [
        "SPRINGTOWN",
        "PA"
    ],
    "18083": [
        "STOCKERTOWN",
        "PA"
    ],
    "18084": [
        "SUMNEYTOWN",
        "PA"
    ],
    "18085": [
        "TATAMY",
        "PA"
    ],
    "18086": [
        "TREICHLERS",
        "PA"
    ],
    "18087": [
        "TREXLERTOWN",
        "PA"
    ],
    "18088": [
        "WALNUTPORT",
        "PA"
    ],
    "18091": [
        "WIND GAP",
        "PA"
    ],
    "18092": [
        "ZIONSVILLE",
        "PA"
    ],
    "18098": [
        "EMMAUS",
        "PA"
    ],
    "18101": [
        "ALLENTOWN",
        "PA"
    ],
    "18102": [
        "ALLENTOWN",
        "PA"
    ],
    "18103": [
        "ALLENTOWN",
        "PA"
    ],
    "18104": [
        "ALLENTOWN",
        "PA"
    ],
    "18105": [
        "ALLENTOWN",
        "PA"
    ],
    "18106": [
        "ALLENTOWN",
        "PA"
    ],
    "18109": [
        "ALLENTOWN",
        "PA"
    ],
    "18195": [
        "ALLENTOWN",
        "PA"
    ],
    "18201": [
        "HAZLETON",
        "PA"
    ],
    "18202": [
        "HAZLETON",
        "PA"
    ],
    "18210": [
        "ALBRIGHTSVILLE",
        "PA"
    ],
    "18211": [
        "ANDREAS",
        "PA"
    ],
    "18212": [
        "ASHFIELD",
        "PA"
    ],
    "18214": [
        "BARNESVILLE",
        "PA"
    ],
    "18216": [
        "BEAVER MEADOWS",
        "PA"
    ],
    "18218": [
        "COALDALE",
        "PA"
    ],
    "18219": [
        "CONYNGHAM",
        "PA"
    ],
    "18220": [
        "DELANO",
        "PA"
    ],
    "18221": [
        "DRIFTON",
        "PA"
    ],
    "18222": [
        "DRUMS",
        "PA"
    ],
    "18223": [
        "EBERVALE",
        "PA"
    ],
    "18224": [
        "FREELAND",
        "PA"
    ],
    "18225": [
        "HARLEIGH",
        "PA"
    ],
    "18229": [
        "JIM THORPE",
        "PA"
    ],
    "18231": [
        "KELAYRES",
        "PA"
    ],
    "18232": [
        "LANSFORD",
        "PA"
    ],
    "18234": [
        "LATTIMER MINES",
        "PA"
    ],
    "18235": [
        "LEHIGHTON",
        "PA"
    ],
    "18237": [
        "MCADOO",
        "PA"
    ],
    "18239": [
        "MILNESVILLE",
        "PA"
    ],
    "18240": [
        "NESQUEHONING",
        "PA"
    ],
    "18241": [
        "NUREMBERG",
        "PA"
    ],
    "18244": [
        "PARRYVILLE",
        "PA"
    ],
    "18245": [
        "QUAKAKE",
        "PA"
    ],
    "18246": [
        "ROCK GLEN",
        "PA"
    ],
    "18247": [
        "SAINT JOHNS",
        "PA"
    ],
    "18248": [
        "SHEPPTON",
        "PA"
    ],
    "18249": [
        "SUGARLOAF",
        "PA"
    ],
    "18250": [
        "SUMMIT HILL",
        "PA"
    ],
    "18251": [
        "SYBERTSVILLE",
        "PA"
    ],
    "18252": [
        "TAMAQUA",
        "PA"
    ],
    "18254": [
        "TRESCKOW",
        "PA"
    ],
    "18255": [
        "WEATHERLY",
        "PA"
    ],
    "18256": [
        "WESTON",
        "PA"
    ],
    "18301": [
        "EAST STROUDSBURG",
        "PA"
    ],
    "18302": [
        "EAST STROUDSBURG",
        "PA"
    ],
    "18320": [
        "ANALOMINK",
        "PA"
    ],
    "18321": [
        "BARTONSVILLE",
        "PA"
    ],
    "18322": [
        "BRODHEADSVILLE",
        "PA"
    ],
    "18323": [
        "BUCK HILL FALLS",
        "PA"
    ],
    "18324": [
        "BUSHKILL",
        "PA"
    ],
    "18325": [
        "CANADENSIS",
        "PA"
    ],
    "18326": [
        "CRESCO",
        "PA"
    ],
    "18327": [
        "DELAWARE WATER GAP",
        "PA"
    ],
    "18328": [
        "DINGMANS FERRY",
        "PA"
    ],
    "18330": [
        "EFFORT",
        "PA"
    ],
    "18331": [
        "GILBERT",
        "PA"
    ],
    "18332": [
        "HENRYVILLE",
        "PA"
    ],
    "18333": [
        "KRESGEVILLE",
        "PA"
    ],
    "18334": [
        "LONG POND",
        "PA"
    ],
    "18335": [
        "MARSHALLS CREEK",
        "PA"
    ],
    "18336": [
        "MATAMORAS",
        "PA"
    ],
    "18337": [
        "MILFORD",
        "PA"
    ],
    "18340": [
        "MILLRIFT",
        "PA"
    ],
    "18341": [
        "MINISINK HILLS",
        "PA"
    ],
    "18342": [
        "MOUNTAINHOME",
        "PA"
    ],
    "18343": [
        "MOUNT BETHEL",
        "PA"
    ],
    "18344": [
        "MOUNT POCONO",
        "PA"
    ],
    "18346": [
        "POCONO SUMMIT",
        "PA"
    ],
    "18347": [
        "POCONO LAKE",
        "PA"
    ],
    "18348": [
        "POCONO LAKE PRESERVE",
        "PA"
    ],
    "18349": [
        "POCONO MANOR",
        "PA"
    ],
    "18350": [
        "POCONO PINES",
        "PA"
    ],
    "18351": [
        "PORTLAND",
        "PA"
    ],
    "18352": [
        "REEDERS",
        "PA"
    ],
    "18353": [
        "SAYLORSBURG",
        "PA"
    ],
    "18354": [
        "SCIOTA",
        "PA"
    ],
    "18355": [
        "SCOTRUN",
        "PA"
    ],
    "18356": [
        "SHAWNEE ON DELAWARE",
        "PA"
    ],
    "18357": [
        "SKYTOP",
        "PA"
    ],
    "18360": [
        "STROUDSBURG",
        "PA"
    ],
    "18370": [
        "SWIFTWATER",
        "PA"
    ],
    "18371": [
        "TAMIMENT",
        "PA"
    ],
    "18372": [
        "TANNERSVILLE",
        "PA"
    ],
    "18403": [
        "ARCHBALD",
        "PA"
    ],
    "18405": [
        "BEACH LAKE",
        "PA"
    ],
    "18407": [
        "CARBONDALE",
        "PA"
    ],
    "18410": [
        "CHINCHILLA",
        "PA"
    ],
    "18411": [
        "CLARKS SUMMIT",
        "PA"
    ],
    "18413": [
        "CLIFFORD",
        "PA"
    ],
    "18414": [
        "DALTON",
        "PA"
    ],
    "18415": [
        "DAMASCUS",
        "PA"
    ],
    "18416": [
        "ELMHURST",
        "PA"
    ],
    "18417": [
        "EQUINUNK",
        "PA"
    ],
    "18419": [
        "FACTORYVILLE",
        "PA"
    ],
    "18420": [
        "FLEETVILLE",
        "PA"
    ],
    "18421": [
        "FOREST CITY",
        "PA"
    ],
    "18424": [
        "GOULDSBORO",
        "PA"
    ],
    "18425": [
        "GREELEY",
        "PA"
    ],
    "18426": [
        "GREENTOWN",
        "PA"
    ],
    "18427": [
        "HAMLIN",
        "PA"
    ],
    "18428": [
        "HAWLEY",
        "PA"
    ],
    "18431": [
        "HONESDALE",
        "PA"
    ],
    "18433": [
        "JERMYN",
        "PA"
    ],
    "18434": [
        "JESSUP",
        "PA"
    ],
    "18435": [
        "LACKAWAXEN",
        "PA"
    ],
    "18436": [
        "LAKE ARIEL",
        "PA"
    ],
    "18437": [
        "LAKE COMO",
        "PA"
    ],
    "18438": [
        "LAKEVILLE",
        "PA"
    ],
    "18439": [
        "LAKEWOOD",
        "PA"
    ],
    "18440": [
        "LA PLUME",
        "PA"
    ],
    "18441": [
        "LENOXVILLE",
        "PA"
    ],
    "18443": [
        "MILANVILLE",
        "PA"
    ],
    "18444": [
        "MOSCOW",
        "PA"
    ],
    "18445": [
        "NEWFOUNDLAND",
        "PA"
    ],
    "18446": [
        "NICHOLSON",
        "PA"
    ],
    "18447": [
        "OLYPHANT",
        "PA"
    ],
    "18448": [
        "OLYPHANT",
        "PA"
    ],
    "18449": [
        "ORSON",
        "PA"
    ],
    "18451": [
        "PAUPACK",
        "PA"
    ],
    "18452": [
        "PECKVILLE",
        "PA"
    ],
    "18453": [
        "PLEASANT MOUNT",
        "PA"
    ],
    "18454": [
        "POYNTELLE",
        "PA"
    ],
    "18455": [
        "PRESTON PARK",
        "PA"
    ],
    "18456": [
        "PROMPTON",
        "PA"
    ],
    "18457": [
        "ROWLAND",
        "PA"
    ],
    "18458": [
        "SHOHOLA",
        "PA"
    ],
    "18459": [
        "SOUTH CANAAN",
        "PA"
    ],
    "18460": [
        "SOUTH STERLING",
        "PA"
    ],
    "18461": [
        "STARLIGHT",
        "PA"
    ],
    "18462": [
        "STARRUCCA",
        "PA"
    ],
    "18463": [
        "STERLING",
        "PA"
    ],
    "18464": [
        "TAFTON",
        "PA"
    ],
    "18465": [
        "THOMPSON",
        "PA"
    ],
    "18466": [
        "TOBYHANNA",
        "PA"
    ],
    "18469": [
        "TYLER HILL",
        "PA"
    ],
    "18470": [
        "UNION DALE",
        "PA"
    ],
    "18471": [
        "WAVERLY",
        "PA"
    ],
    "18472": [
        "WAYMART",
        "PA"
    ],
    "18473": [
        "WHITE MILLS",
        "PA"
    ],
    "18501": [
        "SCRANTON",
        "PA"
    ],
    "18502": [
        "SCRANTON",
        "PA"
    ],
    "18503": [
        "SCRANTON",
        "PA"
    ],
    "18504": [
        "SCRANTON",
        "PA"
    ],
    "18505": [
        "SCRANTON",
        "PA"
    ],
    "18507": [
        "MOOSIC",
        "PA"
    ],
    "18508": [
        "SCRANTON",
        "PA"
    ],
    "18509": [
        "SCRANTON",
        "PA"
    ],
    "18510": [
        "SCRANTON",
        "PA"
    ],
    "18512": [
        "SCRANTON",
        "PA"
    ],
    "18515": [
        "SCRANTON",
        "PA"
    ],
    "18517": [
        "TAYLOR",
        "PA"
    ],
    "18518": [
        "OLD FORGE",
        "PA"
    ],
    "18519": [
        "SCRANTON",
        "PA"
    ],
    "18601": [
        "BEACH HAVEN",
        "PA"
    ],
    "18602": [
        "BEAR CREEK",
        "PA"
    ],
    "18603": [
        "BERWICK",
        "PA"
    ],
    "18610": [
        "BLAKESLEE",
        "PA"
    ],
    "18611": [
        "CAMBRA",
        "PA"
    ],
    "18612": [
        "DALLAS",
        "PA"
    ],
    "18614": [
        "DUSHORE",
        "PA"
    ],
    "18615": [
        "FALLS",
        "PA"
    ],
    "18616": [
        "FORKSVILLE",
        "PA"
    ],
    "18617": [
        "GLEN LYON",
        "PA"
    ],
    "18618": [
        "HARVEYS LAKE",
        "PA"
    ],
    "18619": [
        "HILLSGROVE",
        "PA"
    ],
    "18621": [
        "HUNLOCK CREEK",
        "PA"
    ],
    "18622": [
        "HUNTINGTON MILLS",
        "PA"
    ],
    "18623": [
        "LACEYVILLE",
        "PA"
    ],
    "18624": [
        "LAKE HARMONY",
        "PA"
    ],
    "18625": [
        "LAKE WINOLA",
        "PA"
    ],
    "18626": [
        "LAPORTE",
        "PA"
    ],
    "18627": [
        "LEHMAN",
        "PA"
    ],
    "18628": [
        "LOPEZ",
        "PA"
    ],
    "18629": [
        "MEHOOPANY",
        "PA"
    ],
    "18630": [
        "MESHOPPEN",
        "PA"
    ],
    "18631": [
        "MIFFLINVILLE",
        "PA"
    ],
    "18632": [
        "MILDRED",
        "PA"
    ],
    "18634": [
        "NANTICOKE",
        "PA"
    ],
    "18635": [
        "NESCOPECK",
        "PA"
    ],
    "18636": [
        "NOXEN",
        "PA"
    ],
    "18640": [
        "PITTSTON",
        "PA"
    ],
    "18641": [
        "PITTSTON",
        "PA"
    ],
    "18642": [
        "DURYEA",
        "PA"
    ],
    "18643": [
        "PITTSTON",
        "PA"
    ],
    "18644": [
        "WYOMING",
        "PA"
    ],
    "18651": [
        "PLYMOUTH",
        "PA"
    ],
    "18654": [
        "SHAWANESE",
        "PA"
    ],
    "18655": [
        "SHICKSHINNY",
        "PA"
    ],
    "18656": [
        "SWEET VALLEY",
        "PA"
    ],
    "18657": [
        "TUNKHANNOCK",
        "PA"
    ],
    "18660": [
        "WAPWALLOPEN",
        "PA"
    ],
    "18661": [
        "WHITE HAVEN",
        "PA"
    ],
    "18701": [
        "WILKES BARRE",
        "PA"
    ],
    "18702": [
        "WILKES BARRE",
        "PA"
    ],
    "18703": [
        "WILKES BARRE",
        "PA"
    ],
    "18704": [
        "KINGSTON",
        "PA"
    ],
    "18705": [
        "WILKES BARRE",
        "PA"
    ],
    "18706": [
        "WILKES BARRE",
        "PA"
    ],
    "18707": [
        "MOUNTAIN TOP",
        "PA"
    ],
    "18708": [
        "SHAVERTOWN",
        "PA"
    ],
    "18709": [
        "LUZERNE",
        "PA"
    ],
    "18710": [
        "WILKES BARRE",
        "PA"
    ],
    "18711": [
        "WILKES BARRE",
        "PA"
    ],
    "18762": [
        "WILKES BARRE",
        "PA"
    ],
    "18764": [
        "WILKES BARRE",
        "PA"
    ],
    "18765": [
        "WILKES BARRE",
        "PA"
    ],
    "18766": [
        "WILKES BARRE",
        "PA"
    ],
    "18773": [
        "WILKES BARRE",
        "PA"
    ],
    "18801": [
        "MONTROSE",
        "PA"
    ],
    "18810": [
        "ATHENS",
        "PA"
    ],
    "18812": [
        "BRACKNEY",
        "PA"
    ],
    "18813": [
        "BROOKLYN",
        "PA"
    ],
    "18814": [
        "BURLINGTON",
        "PA"
    ],
    "18815": [
        "CAMPTOWN",
        "PA"
    ],
    "18816": [
        "DIMOCK",
        "PA"
    ],
    "18817": [
        "EAST SMITHFIELD",
        "PA"
    ],
    "18818": [
        "FRIENDSVILLE",
        "PA"
    ],
    "18821": [
        "GREAT BEND",
        "PA"
    ],
    "18822": [
        "HALLSTEAD",
        "PA"
    ],
    "18823": [
        "HARFORD",
        "PA"
    ],
    "18824": [
        "HOP BOTTOM",
        "PA"
    ],
    "18825": [
        "JACKSON",
        "PA"
    ],
    "18826": [
        "KINGSLEY",
        "PA"
    ],
    "18827": [
        "LANESBORO",
        "PA"
    ],
    "18828": [
        "LAWTON",
        "PA"
    ],
    "18829": [
        "LE RAYSVILLE",
        "PA"
    ],
    "18830": [
        "LITTLE MEADOWS",
        "PA"
    ],
    "18831": [
        "MILAN",
        "PA"
    ],
    "18832": [
        "MONROETON",
        "PA"
    ],
    "18833": [
        "NEW ALBANY",
        "PA"
    ],
    "18834": [
        "NEW MILFORD",
        "PA"
    ],
    "18837": [
        "ROME",
        "PA"
    ],
    "18840": [
        "SAYRE",
        "PA"
    ],
    "18842": [
        "SOUTH GIBSON",
        "PA"
    ],
    "18843": [
        "SOUTH MONTROSE",
        "PA"
    ],
    "18844": [
        "SPRINGVILLE",
        "PA"
    ],
    "18845": [
        "STEVENSVILLE",
        "PA"
    ],
    "18846": [
        "SUGAR RUN",
        "PA"
    ],
    "18847": [
        "SUSQUEHANNA",
        "PA"
    ],
    "18848": [
        "TOWANDA",
        "PA"
    ],
    "18850": [
        "ULSTER",
        "PA"
    ],
    "18851": [
        "WARREN CENTER",
        "PA"
    ],
    "18853": [
        "WYALUSING",
        "PA"
    ],
    "18854": [
        "WYSOX",
        "PA"
    ],
    "18901": [
        "DOYLESTOWN",
        "PA"
    ],
    "18902": [
        "DOYLESTOWN",
        "PA"
    ],
    "18910": [
        "BEDMINSTER",
        "PA"
    ],
    "18911": [
        "BLOOMING GLEN",
        "PA"
    ],
    "18912": [
        "BUCKINGHAM",
        "PA"
    ],
    "18913": [
        "CARVERSVILLE",
        "PA"
    ],
    "18914": [
        "CHALFONT",
        "PA"
    ],
    "18915": [
        "COLMAR",
        "PA"
    ],
    "18916": [
        "DANBORO",
        "PA"
    ],
    "18917": [
        "DUBLIN",
        "PA"
    ],
    "18918": [
        "EARLINGTON",
        "PA"
    ],
    "18920": [
        "ERWINNA",
        "PA"
    ],
    "18921": [
        "FERNDALE",
        "PA"
    ],
    "18922": [
        "FOREST GROVE",
        "PA"
    ],
    "18923": [
        "FOUNTAINVILLE",
        "PA"
    ],
    "18924": [
        "FRANCONIA",
        "PA"
    ],
    "18925": [
        "FURLONG",
        "PA"
    ],
    "18927": [
        "HILLTOWN",
        "PA"
    ],
    "18928": [
        "HOLICONG",
        "PA"
    ],
    "18929": [
        "JAMISON",
        "PA"
    ],
    "18930": [
        "KINTNERSVILLE",
        "PA"
    ],
    "18931": [
        "LAHASKA",
        "PA"
    ],
    "18932": [
        "LINE LEXINGTON",
        "PA"
    ],
    "18933": [
        "LUMBERVILLE",
        "PA"
    ],
    "18934": [
        "MECHANICSVILLE",
        "PA"
    ],
    "18935": [
        "MILFORD SQUARE",
        "PA"
    ],
    "18936": [
        "MONTGOMERYVILLE",
        "PA"
    ],
    "18938": [
        "NEW HOPE",
        "PA"
    ],
    "18940": [
        "NEWTOWN",
        "PA"
    ],
    "18942": [
        "OTTSVILLE",
        "PA"
    ],
    "18943": [
        "PENNS PARK",
        "PA"
    ],
    "18944": [
        "PERKASIE",
        "PA"
    ],
    "18946": [
        "PINEVILLE",
        "PA"
    ],
    "18947": [
        "PIPERSVILLE",
        "PA"
    ],
    "18949": [
        "PLUMSTEADVILLE",
        "PA"
    ],
    "18950": [
        "POINT PLEASANT",
        "PA"
    ],
    "18951": [
        "QUAKERTOWN",
        "PA"
    ],
    "18953": [
        "REVERE",
        "PA"
    ],
    "18954": [
        "RICHBORO",
        "PA"
    ],
    "18955": [
        "RICHLANDTOWN",
        "PA"
    ],
    "18956": [
        "RUSHLAND",
        "PA"
    ],
    "18957": [
        "SALFORD",
        "PA"
    ],
    "18958": [
        "SALFORDVILLE",
        "PA"
    ],
    "18960": [
        "SELLERSVILLE",
        "PA"
    ],
    "18962": [
        "SILVERDALE",
        "PA"
    ],
    "18963": [
        "SOLEBURY",
        "PA"
    ],
    "18964": [
        "SOUDERTON",
        "PA"
    ],
    "18966": [
        "SOUTHAMPTON",
        "PA"
    ],
    "18968": [
        "SPINNERSTOWN",
        "PA"
    ],
    "18969": [
        "TELFORD",
        "PA"
    ],
    "18970": [
        "TRUMBAUERSVILLE",
        "PA"
    ],
    "18971": [
        "TYLERSPORT",
        "PA"
    ],
    "18972": [
        "UPPER BLACK EDDY",
        "PA"
    ],
    "18974": [
        "WARMINSTER",
        "PA"
    ],
    "18976": [
        "WARRINGTON",
        "PA"
    ],
    "18977": [
        "WASHINGTON CROSSING",
        "PA"
    ],
    "18979": [
        "WOXALL",
        "PA"
    ],
    "18980": [
        "WYCOMBE",
        "PA"
    ],
    "18981": [
        "ZIONHILL",
        "PA"
    ],
    "18991": [
        "WARMINSTER",
        "PA"
    ],
    "19001": [
        "ABINGTON",
        "PA"
    ],
    "19002": [
        "AMBLER",
        "PA"
    ],
    "19003": [
        "ARDMORE",
        "PA"
    ],
    "19004": [
        "BALA CYNWYD",
        "PA"
    ],
    "19006": [
        "HUNTINGDON VALLEY",
        "PA"
    ],
    "19007": [
        "BRISTOL",
        "PA"
    ],
    "19008": [
        "BROOMALL",
        "PA"
    ],
    "19009": [
        "BRYN ATHYN",
        "PA"
    ],
    "19010": [
        "BRYN MAWR",
        "PA"
    ],
    "19012": [
        "CHELTENHAM",
        "PA"
    ],
    "19013": [
        "CHESTER",
        "PA"
    ],
    "19014": [
        "ASTON",
        "PA"
    ],
    "19015": [
        "BROOKHAVEN",
        "PA"
    ],
    "19016": [
        "CHESTER",
        "PA"
    ],
    "19017": [
        "CHESTER HEIGHTS",
        "PA"
    ],
    "19018": [
        "CLIFTON HEIGHTS",
        "PA"
    ],
    "19019": [
        "PHILADELPHIA",
        "PA"
    ],
    "19020": [
        "BENSALEM",
        "PA"
    ],
    "19021": [
        "CROYDON",
        "PA"
    ],
    "19022": [
        "CRUM LYNNE",
        "PA"
    ],
    "19023": [
        "DARBY",
        "PA"
    ],
    "19025": [
        "DRESHER",
        "PA"
    ],
    "19026": [
        "DREXEL HILL",
        "PA"
    ],
    "19027": [
        "ELKINS PARK",
        "PA"
    ],
    "19028": [
        "EDGEMONT",
        "PA"
    ],
    "19029": [
        "ESSINGTON",
        "PA"
    ],
    "19030": [
        "FAIRLESS HILLS",
        "PA"
    ],
    "19031": [
        "FLOURTOWN",
        "PA"
    ],
    "19032": [
        "FOLCROFT",
        "PA"
    ],
    "19033": [
        "FOLSOM",
        "PA"
    ],
    "19034": [
        "FORT WASHINGTON",
        "PA"
    ],
    "19035": [
        "GLADWYNE",
        "PA"
    ],
    "19036": [
        "GLENOLDEN",
        "PA"
    ],
    "19037": [
        "GLEN RIDDLE LIMA",
        "PA"
    ],
    "19038": [
        "GLENSIDE",
        "PA"
    ],
    "19039": [
        "GRADYVILLE",
        "PA"
    ],
    "19040": [
        "HATBORO",
        "PA"
    ],
    "19041": [
        "HAVERFORD",
        "PA"
    ],
    "19043": [
        "HOLMES",
        "PA"
    ],
    "19044": [
        "HORSHAM",
        "PA"
    ],
    "19046": [
        "JENKINTOWN",
        "PA"
    ],
    "19047": [
        "LANGHORNE",
        "PA"
    ],
    "19050": [
        "LANSDOWNE",
        "PA"
    ],
    "19052": [
        "LENNI",
        "PA"
    ],
    "19053": [
        "FEASTERVILLE TREVOSE",
        "PA"
    ],
    "19054": [
        "LEVITTOWN",
        "PA"
    ],
    "19055": [
        "LEVITTOWN",
        "PA"
    ],
    "19056": [
        "LEVITTOWN",
        "PA"
    ],
    "19057": [
        "LEVITTOWN",
        "PA"
    ],
    "19058": [
        "LEVITTOWN",
        "PA"
    ],
    "19060": [
        "GARNET VALLEY",
        "PA"
    ],
    "19061": [
        "MARCUS HOOK",
        "PA"
    ],
    "19063": [
        "MEDIA",
        "PA"
    ],
    "19064": [
        "SPRINGFIELD",
        "PA"
    ],
    "19065": [
        "MEDIA",
        "PA"
    ],
    "19066": [
        "MERION STATION",
        "PA"
    ],
    "19067": [
        "MORRISVILLE",
        "PA"
    ],
    "19070": [
        "MORTON",
        "PA"
    ],
    "19072": [
        "NARBERTH",
        "PA"
    ],
    "19073": [
        "NEWTOWN SQUARE",
        "PA"
    ],
    "19074": [
        "NORWOOD",
        "PA"
    ],
    "19075": [
        "ORELAND",
        "PA"
    ],
    "19076": [
        "PROSPECT PARK",
        "PA"
    ],
    "19078": [
        "RIDLEY PARK",
        "PA"
    ],
    "19079": [
        "SHARON HILL",
        "PA"
    ],
    "19080": [
        "WAYNE",
        "PA"
    ],
    "19081": [
        "SWARTHMORE",
        "PA"
    ],
    "19082": [
        "UPPER DARBY",
        "PA"
    ],
    "19083": [
        "HAVERTOWN",
        "PA"
    ],
    "19085": [
        "VILLANOVA",
        "PA"
    ],
    "19086": [
        "WALLINGFORD",
        "PA"
    ],
    "19087": [
        "WAYNE",
        "PA"
    ],
    "19088": [
        "WAYNE",
        "PA"
    ],
    "19090": [
        "WILLOW GROVE",
        "PA"
    ],
    "19091": [
        "MEDIA",
        "PA"
    ],
    "19094": [
        "WOODLYN",
        "PA"
    ],
    "19095": [
        "WYNCOTE",
        "PA"
    ],
    "19096": [
        "WYNNEWOOD",
        "PA"
    ],
    "19101": [
        "PHILADELPHIA",
        "PA"
    ],
    "19102": [
        "PHILADELPHIA",
        "PA"
    ],
    "19103": [
        "PHILADELPHIA",
        "PA"
    ],
    "19104": [
        "PHILADELPHIA",
        "PA"
    ],
    "19105": [
        "PHILADELPHIA",
        "PA"
    ],
    "19106": [
        "PHILADELPHIA",
        "PA"
    ],
    "19107": [
        "PHILADELPHIA",
        "PA"
    ],
    "19108": [
        "PHILADELPHIA",
        "PA"
    ],
    "19109": [
        "PHILADELPHIA",
        "PA"
    ],
    "19110": [
        "PHILADELPHIA",
        "PA"
    ],
    "19111": [
        "PHILADELPHIA",
        "PA"
    ],
    "19112": [
        "PHILADELPHIA",
        "PA"
    ],
    "19113": [
        "PHILADELPHIA",
        "PA"
    ],
    "19114": [
        "PHILADELPHIA",
        "PA"
    ],
    "19115": [
        "PHILADELPHIA",
        "PA"
    ],
    "19116": [
        "PHILADELPHIA",
        "PA"
    ],
    "19118": [
        "PHILADELPHIA",
        "PA"
    ],
    "19119": [
        "PHILADELPHIA",
        "PA"
    ],
    "19120": [
        "PHILADELPHIA",
        "PA"
    ],
    "19121": [
        "PHILADELPHIA",
        "PA"
    ],
    "19122": [
        "PHILADELPHIA",
        "PA"
    ],
    "19123": [
        "PHILADELPHIA",
        "PA"
    ],
    "19124": [
        "PHILADELPHIA",
        "PA"
    ],
    "19125": [
        "PHILADELPHIA",
        "PA"
    ],
    "19126": [
        "PHILADELPHIA",
        "PA"
    ],
    "19127": [
        "PHILADELPHIA",
        "PA"
    ],
    "19128": [
        "PHILADELPHIA",
        "PA"
    ],
    "19129": [
        "PHILADELPHIA",
        "PA"
    ],
    "19130": [
        "PHILADELPHIA",
        "PA"
    ],
    "19131": [
        "PHILADELPHIA",
        "PA"
    ],
    "19132": [
        "PHILADELPHIA",
        "PA"
    ],
    "19133": [
        "PHILADELPHIA",
        "PA"
    ],
    "19134": [
        "PHILADELPHIA",
        "PA"
    ],
    "19135": [
        "PHILADELPHIA",
        "PA"
    ],
    "19136": [
        "PHILADELPHIA",
        "PA"
    ],
    "19137": [
        "PHILADELPHIA",
        "PA"
    ],
    "19138": [
        "PHILADELPHIA",
        "PA"
    ],
    "19139": [
        "PHILADELPHIA",
        "PA"
    ],
    "19140": [
        "PHILADELPHIA",
        "PA"
    ],
    "19141": [
        "PHILADELPHIA",
        "PA"
    ],
    "19142": [
        "PHILADELPHIA",
        "PA"
    ],
    "19143": [
        "PHILADELPHIA",
        "PA"
    ],
    "19144": [
        "PHILADELPHIA",
        "PA"
    ],
    "19145": [
        "PHILADELPHIA",
        "PA"
    ],
    "19146": [
        "PHILADELPHIA",
        "PA"
    ],
    "19147": [
        "PHILADELPHIA",
        "PA"
    ],
    "19148": [
        "PHILADELPHIA",
        "PA"
    ],
    "19149": [
        "PHILADELPHIA",
        "PA"
    ],
    "19150": [
        "PHILADELPHIA",
        "PA"
    ],
    "19151": [
        "PHILADELPHIA",
        "PA"
    ],
    "19152": [
        "PHILADELPHIA",
        "PA"
    ],
    "19153": [
        "PHILADELPHIA",
        "PA"
    ],
    "19154": [
        "PHILADELPHIA",
        "PA"
    ],
    "19155": [
        "PHILADELPHIA",
        "PA"
    ],
    "19160": [
        "PHILADELPHIA",
        "PA"
    ],
    "19170": [
        "PHILADELPHIA",
        "PA"
    ],
    "19176": [
        "PHILADELPHIA",
        "PA"
    ],
    "19181": [
        "PHILADELPHIA",
        "PA"
    ],
    "19182": [
        "PHILADELPHIA",
        "PA"
    ],
    "19187": [
        "PHILADELPHIA",
        "PA"
    ],
    "19192": [
        "PHILADELPHIA",
        "PA"
    ],
    "19194": [
        "PHILADELPHIA",
        "PA"
    ],
    "19255": [
        "PHILADELPHIA",
        "PA"
    ],
    "19301": [
        "PAOLI",
        "PA"
    ],
    "19310": [
        "ATGLEN",
        "PA"
    ],
    "19311": [
        "AVONDALE",
        "PA"
    ],
    "19312": [
        "BERWYN",
        "PA"
    ],
    "19316": [
        "BRANDAMORE",
        "PA"
    ],
    "19317": [
        "CHADDS FORD",
        "PA"
    ],
    "19318": [
        "CHATHAM",
        "PA"
    ],
    "19319": [
        "CHEYNEY",
        "PA"
    ],
    "19320": [
        "COATESVILLE",
        "PA"
    ],
    "19330": [
        "COCHRANVILLE",
        "PA"
    ],
    "19331": [
        "CONCORDVILLE",
        "PA"
    ],
    "19333": [
        "DEVON",
        "PA"
    ],
    "19335": [
        "DOWNINGTOWN",
        "PA"
    ],
    "19339": [
        "CONCORDVILLE",
        "PA"
    ],
    "19341": [
        "EXTON",
        "PA"
    ],
    "19342": [
        "GLEN MILLS",
        "PA"
    ],
    "19343": [
        "GLENMOORE",
        "PA"
    ],
    "19344": [
        "HONEY BROOK",
        "PA"
    ],
    "19345": [
        "IMMACULATA",
        "PA"
    ],
    "19346": [
        "KELTON",
        "PA"
    ],
    "19347": [
        "KEMBLESVILLE",
        "PA"
    ],
    "19348": [
        "KENNETT SQUARE",
        "PA"
    ],
    "19350": [
        "LANDENBERG",
        "PA"
    ],
    "19351": [
        "LEWISVILLE",
        "PA"
    ],
    "19352": [
        "LINCOLN UNIVERSITY",
        "PA"
    ],
    "19353": [
        "LIONVILLE",
        "PA"
    ],
    "19354": [
        "LYNDELL",
        "PA"
    ],
    "19355": [
        "MALVERN",
        "PA"
    ],
    "19357": [
        "MENDENHALL",
        "PA"
    ],
    "19358": [
        "MODENA",
        "PA"
    ],
    "19360": [
        "NEW LONDON",
        "PA"
    ],
    "19362": [
        "NOTTINGHAM",
        "PA"
    ],
    "19363": [
        "OXFORD",
        "PA"
    ],
    "19365": [
        "PARKESBURG",
        "PA"
    ],
    "19366": [
        "POCOPSON",
        "PA"
    ],
    "19367": [
        "POMEROY",
        "PA"
    ],
    "19369": [
        "SADSBURYVILLE",
        "PA"
    ],
    "19372": [
        "THORNDALE",
        "PA"
    ],
    "19373": [
        "THORNTON",
        "PA"
    ],
    "19374": [
        "TOUGHKENAMON",
        "PA"
    ],
    "19375": [
        "UNIONVILLE",
        "PA"
    ],
    "19376": [
        "WAGONTOWN",
        "PA"
    ],
    "19380": [
        "WEST CHESTER",
        "PA"
    ],
    "19381": [
        "WEST CHESTER",
        "PA"
    ],
    "19382": [
        "WEST CHESTER",
        "PA"
    ],
    "19383": [
        "WEST CHESTER",
        "PA"
    ],
    "19390": [
        "WEST GROVE",
        "PA"
    ],
    "19395": [
        "WESTTOWN",
        "PA"
    ],
    "19399": [
        "SOUTHEASTERN",
        "PA"
    ],
    "19401": [
        "NORRISTOWN",
        "PA"
    ],
    "19403": [
        "NORRISTOWN",
        "PA"
    ],
    "19404": [
        "NORRISTOWN",
        "PA"
    ],
    "19405": [
        "BRIDGEPORT",
        "PA"
    ],
    "19406": [
        "KING OF PRUSSIA",
        "PA"
    ],
    "19407": [
        "AUDUBON",
        "PA"
    ],
    "19408": [
        "EAGLEVILLE",
        "PA"
    ],
    "19409": [
        "FAIRVIEW VILLAGE",
        "PA"
    ],
    "19421": [
        "BIRCHRUNVILLE",
        "PA"
    ],
    "19422": [
        "BLUE BELL",
        "PA"
    ],
    "19423": [
        "CEDARS",
        "PA"
    ],
    "19425": [
        "CHESTER SPRINGS",
        "PA"
    ],
    "19426": [
        "COLLEGEVILLE",
        "PA"
    ],
    "19428": [
        "CONSHOHOCKEN",
        "PA"
    ],
    "19429": [
        "CONSHOHOCKEN",
        "PA"
    ],
    "19430": [
        "CREAMERY",
        "PA"
    ],
    "19432": [
        "DEVAULT",
        "PA"
    ],
    "19435": [
        "FREDERICK",
        "PA"
    ],
    "19436": [
        "GWYNEDD",
        "PA"
    ],
    "19437": [
        "GWYNEDD VALLEY",
        "PA"
    ],
    "19438": [
        "HARLEYSVILLE",
        "PA"
    ],
    "19440": [
        "HATFIELD",
        "PA"
    ],
    "19442": [
        "KIMBERTON",
        "PA"
    ],
    "19443": [
        "KULPSVILLE",
        "PA"
    ],
    "19444": [
        "LAFAYETTE HILL",
        "PA"
    ],
    "19446": [
        "LANSDALE",
        "PA"
    ],
    "19450": [
        "LEDERACH",
        "PA"
    ],
    "19451": [
        "MAINLAND",
        "PA"
    ],
    "19453": [
        "MONT CLARE",
        "PA"
    ],
    "19454": [
        "NORTH WALES",
        "PA"
    ],
    "19456": [
        "OAKS",
        "PA"
    ],
    "19457": [
        "PARKER FORD",
        "PA"
    ],
    "19460": [
        "PHOENIXVILLE",
        "PA"
    ],
    "19462": [
        "PLYMOUTH MEETING",
        "PA"
    ],
    "19464": [
        "POTTSTOWN",
        "PA"
    ],
    "19465": [
        "POTTSTOWN",
        "PA"
    ],
    "19468": [
        "ROYERSFORD",
        "PA"
    ],
    "19470": [
        "SAINT PETERS",
        "PA"
    ],
    "19472": [
        "SASSAMANSVILLE",
        "PA"
    ],
    "19473": [
        "SCHWENKSVILLE",
        "PA"
    ],
    "19474": [
        "SKIPPACK",
        "PA"
    ],
    "19475": [
        "SPRING CITY",
        "PA"
    ],
    "19477": [
        "SPRING HOUSE",
        "PA"
    ],
    "19478": [
        "SPRING MOUNT",
        "PA"
    ],
    "19480": [
        "UWCHLAND",
        "PA"
    ],
    "19481": [
        "VALLEY FORGE",
        "PA"
    ],
    "19482": [
        "VALLEY FORGE",
        "PA"
    ],
    "19486": [
        "WEST POINT",
        "PA"
    ],
    "19490": [
        "WORCESTER",
        "PA"
    ],
    "19492": [
        "ZIEGLERVILLE",
        "PA"
    ],
    "19501": [
        "ADAMSTOWN",
        "PA"
    ],
    "19503": [
        "BALLY",
        "PA"
    ],
    "19504": [
        "BARTO",
        "PA"
    ],
    "19505": [
        "BECHTELSVILLE",
        "PA"
    ],
    "19506": [
        "BERNVILLE",
        "PA"
    ],
    "19507": [
        "BETHEL",
        "PA"
    ],
    "19508": [
        "BIRDSBORO",
        "PA"
    ],
    "19510": [
        "BLANDON",
        "PA"
    ],
    "19511": [
        "BOWERS",
        "PA"
    ],
    "19512": [
        "BOYERTOWN",
        "PA"
    ],
    "19516": [
        "CENTERPORT",
        "PA"
    ],
    "19518": [
        "DOUGLASSVILLE",
        "PA"
    ],
    "19519": [
        "EARLVILLE",
        "PA"
    ],
    "19520": [
        "ELVERSON",
        "PA"
    ],
    "19522": [
        "FLEETWOOD",
        "PA"
    ],
    "19523": [
        "GEIGERTOWN",
        "PA"
    ],
    "19525": [
        "GILBERTSVILLE",
        "PA"
    ],
    "19526": [
        "HAMBURG",
        "PA"
    ],
    "19529": [
        "KEMPTON",
        "PA"
    ],
    "19530": [
        "KUTZTOWN",
        "PA"
    ],
    "19533": [
        "LEESPORT",
        "PA"
    ],
    "19534": [
        "LENHARTSVILLE",
        "PA"
    ],
    "19535": [
        "LIMEKILN",
        "PA"
    ],
    "19536": [
        "LYON STATION",
        "PA"
    ],
    "19538": [
        "MAXATAWNY",
        "PA"
    ],
    "19539": [
        "MERTZTOWN",
        "PA"
    ],
    "19540": [
        "MOHNTON",
        "PA"
    ],
    "19541": [
        "MOHRSVILLE",
        "PA"
    ],
    "19542": [
        "MONOCACY STATION",
        "PA"
    ],
    "19543": [
        "MORGANTOWN",
        "PA"
    ],
    "19544": [
        "MOUNT AETNA",
        "PA"
    ],
    "19545": [
        "NEW BERLINVILLE",
        "PA"
    ],
    "19547": [
        "OLEY",
        "PA"
    ],
    "19548": [
        "PINE FORGE",
        "PA"
    ],
    "19549": [
        "PORT CLINTON",
        "PA"
    ],
    "19550": [
        "REHRERSBURG",
        "PA"
    ],
    "19551": [
        "ROBESONIA",
        "PA"
    ],
    "19554": [
        "SHARTLESVILLE",
        "PA"
    ],
    "19555": [
        "SHOEMAKERSVILLE",
        "PA"
    ],
    "19559": [
        "STRAUSSTOWN",
        "PA"
    ],
    "19560": [
        "TEMPLE",
        "PA"
    ],
    "19562": [
        "TOPTON",
        "PA"
    ],
    "19564": [
        "VIRGINVILLE",
        "PA"
    ],
    "19565": [
        "WERNERSVILLE",
        "PA"
    ],
    "19567": [
        "WOMELSDORF",
        "PA"
    ],
    "19601": [
        "READING",
        "PA"
    ],
    "19602": [
        "READING",
        "PA"
    ],
    "19603": [
        "READING",
        "PA"
    ],
    "19604": [
        "READING",
        "PA"
    ],
    "19605": [
        "READING",
        "PA"
    ],
    "19606": [
        "READING",
        "PA"
    ],
    "19607": [
        "READING",
        "PA"
    ],
    "19608": [
        "READING",
        "PA"
    ],
    "19609": [
        "READING",
        "PA"
    ],
    "19610": [
        "READING",
        "PA"
    ],
    "19611": [
        "READING",
        "PA"
    ],
    "19612": [
        "READING",
        "PA"
    ],
    "19701": [
        "BEAR",
        "DE"
    ],
    "19702": [
        "NEWARK",
        "DE"
    ],
    "19703": [
        "CLAYMONT",
        "DE"
    ],
    "19706": [
        "DELAWARE CITY",
        "DE"
    ],
    "19707": [
        "HOCKESSIN",
        "DE"
    ],
    "19708": [
        "KIRKWOOD",
        "DE"
    ],
    "19709": [
        "MIDDLETOWN",
        "DE"
    ],
    "19710": [
        "MONTCHANIN",
        "DE"
    ],
    "19711": [
        "NEWARK",
        "DE"
    ],
    "19713": [
        "NEWARK",
        "DE"
    ],
    "19714": [
        "NEWARK",
        "DE"
    ],
    "19715": [
        "NEWARK",
        "DE"
    ],
    "19716": [
        "NEWARK",
        "DE"
    ],
    "19717": [
        "NEWARK",
        "DE"
    ],
    "19718": [
        "NEWARK",
        "DE"
    ],
    "19720": [
        "NEW CASTLE",
        "DE"
    ],
    "19721": [
        "NEW CASTLE",
        "DE"
    ],
    "19726": [
        "NEWARK",
        "DE"
    ],
    "19730": [
        "ODESSA",
        "DE"
    ],
    "19731": [
        "PORT PENN",
        "DE"
    ],
    "19732": [
        "ROCKLAND",
        "DE"
    ],
    "19733": [
        "SAINT GEORGES",
        "DE"
    ],
    "19734": [
        "TOWNSEND",
        "DE"
    ],
    "19735": [
        "WINTERTHUR",
        "DE"
    ],
    "19736": [
        "YORKLYN",
        "DE"
    ],
    "19801": [
        "WILMINGTON",
        "DE"
    ],
    "19802": [
        "WILMINGTON",
        "DE"
    ],
    "19803": [
        "WILMINGTON",
        "DE"
    ],
    "19804": [
        "WILMINGTON",
        "DE"
    ],
    "19805": [
        "WILMINGTON",
        "DE"
    ],
    "19806": [
        "WILMINGTON",
        "DE"
    ],
    "19807": [
        "WILMINGTON",
        "DE"
    ],
    "19808": [
        "WILMINGTON",
        "DE"
    ],
    "19809": [
        "WILMINGTON",
        "DE"
    ],
    "19810": [
        "WILMINGTON",
        "DE"
    ],
    "19850": [
        "WILMINGTON",
        "DE"
    ],
    "19880": [
        "WILMINGTON",
        "DE"
    ],
    "19884": [
        "WILMINGTON",
        "DE"
    ],
    "19890": [
        "WILMINGTON",
        "DE"
    ],
    "19894": [
        "WILMINGTON",
        "DE"
    ],
    "19897": [
        "WILMINGTON",
        "DE"
    ],
    "19898": [
        "WILMINGTON",
        "DE"
    ],
    "19899": [
        "WILMINGTON",
        "DE"
    ],
    "19901": [
        "DOVER",
        "DE"
    ],
    "19902": [
        "DOVER AFB",
        "DE"
    ],
    "19903": [
        "DOVER",
        "DE"
    ],
    "19904": [
        "DOVER",
        "DE"
    ],
    "19905": [
        "DOVER",
        "DE"
    ],
    "19930": [
        "BETHANY BEACH",
        "DE"
    ],
    "19931": [
        "BETHEL",
        "DE"
    ],
    "19933": [
        "BRIDGEVILLE",
        "DE"
    ],
    "19934": [
        "CAMDEN WYOMING",
        "DE"
    ],
    "19936": [
        "CHESWOLD",
        "DE"
    ],
    "19938": [
        "CLAYTON",
        "DE"
    ],
    "19939": [
        "DAGSBORO",
        "DE"
    ],
    "19940": [
        "DELMAR",
        "DE"
    ],
    "19941": [
        "ELLENDALE",
        "DE"
    ],
    "19943": [
        "FELTON",
        "DE"
    ],
    "19944": [
        "FENWICK ISLAND",
        "DE"
    ],
    "19945": [
        "FRANKFORD",
        "DE"
    ],
    "19946": [
        "FREDERICA",
        "DE"
    ],
    "19947": [
        "GEORGETOWN",
        "DE"
    ],
    "19950": [
        "GREENWOOD",
        "DE"
    ],
    "19951": [
        "HARBESON",
        "DE"
    ],
    "19952": [
        "HARRINGTON",
        "DE"
    ],
    "19953": [
        "HARTLY",
        "DE"
    ],
    "19954": [
        "HOUSTON",
        "DE"
    ],
    "19955": [
        "KENTON",
        "DE"
    ],
    "19956": [
        "LAUREL",
        "DE"
    ],
    "19958": [
        "LEWES",
        "DE"
    ],
    "19960": [
        "LINCOLN",
        "DE"
    ],
    "19961": [
        "LITTLE CREEK",
        "DE"
    ],
    "19962": [
        "MAGNOLIA",
        "DE"
    ],
    "19963": [
        "MILFORD",
        "DE"
    ],
    "19964": [
        "MARYDEL",
        "DE"
    ],
    "19966": [
        "MILLSBORO",
        "DE"
    ],
    "19967": [
        "MILLVILLE",
        "DE"
    ],
    "19968": [
        "MILTON",
        "DE"
    ],
    "19969": [
        "NASSAU",
        "DE"
    ],
    "19970": [
        "OCEAN VIEW",
        "DE"
    ],
    "19971": [
        "REHOBOTH BEACH",
        "DE"
    ],
    "19973": [
        "SEAFORD",
        "DE"
    ],
    "19975": [
        "SELBYVILLE",
        "DE"
    ],
    "19977": [
        "SMYRNA",
        "DE"
    ],
    "19979": [
        "VIOLA",
        "DE"
    ],
    "19980": [
        "WOODSIDE",
        "DE"
    ],
    "20001": [
        "WASHINGTON",
        "DC"
    ],
    "20002": [
        "WASHINGTON",
        "DC"
    ],
    "20003": [
        "WASHINGTON",
        "DC"
    ],
    "20004": [
        "WASHINGTON",
        "DC"
    ],
    "20005": [
        "WASHINGTON",
        "DC"
    ],
    "20006": [
        "WASHINGTON",
        "DC"
    ],
    "20007": [
        "WASHINGTON",
        "DC"
    ],
    "20008": [
        "WASHINGTON",
        "DC"
    ],
    "20009": [
        "WASHINGTON",
        "DC"
    ],
    "20010": [
        "WASHINGTON",
        "DC"
    ],
    "20011": [
        "WASHINGTON",
        "DC"
    ],
    "20012": [
        "WASHINGTON",
        "DC"
    ],
    "20013": [
        "WASHINGTON",
        "DC"
    ],
    "20015": [
        "WASHINGTON",
        "DC"
    ],
    "20016": [
        "WASHINGTON",
        "DC"
    ],
    "20017": [
        "WASHINGTON",
        "DC"
    ],
    "20018": [
        "WASHINGTON",
        "DC"
    ],
    "20019": [
        "WASHINGTON",
        "DC"
    ],
    "20020": [
        "WASHINGTON",
        "DC"
    ],
    "20022": [
        "WASHINGTON",
        "DC"
    ],
    "20024": [
        "WASHINGTON",
        "DC"
    ],
    "20026": [
        "WASHINGTON",
        "DC"
    ],
    "20027": [
        "WASHINGTON",
        "DC"
    ],
    "20030": [
        "WASHINGTON",
        "DC"
    ],
    "20032": [
        "WASHINGTON",
        "DC"
    ],
    "20035": [
        "WASHINGTON",
        "DC"
    ],
    "20036": [
        "WASHINGTON",
        "DC"
    ],
    "20037": [
        "WASHINGTON",
        "DC"
    ],
    "20038": [
        "WASHINGTON",
        "DC"
    ],
    "20039": [
        "WASHINGTON",
        "DC"
    ],
    "20040": [
        "WASHINGTON",
        "DC"
    ],
    "20041": [
        "WASHINGTON",
        "DC"
    ],
    "20042": [
        "WASHINGTON",
        "DC"
    ],
    "20043": [
        "WASHINGTON",
        "DC"
    ],
    "20044": [
        "WASHINGTON",
        "DC"
    ],
    "20045": [
        "WASHINGTON",
        "DC"
    ],
    "20046": [
        "WASHINGTON",
        "DC"
    ],
    "20049": [
        "WASHINGTON",
        "DC"
    ],
    "20050": [
        "WASHINGTON",
        "DC"
    ],
    "20052": [
        "WASHINGTON",
        "DC"
    ],
    "20056": [
        "WASHINGTON",
        "DC"
    ],
    "20057": [
        "WASHINGTON",
        "DC"
    ],
    "20058": [
        "WASHINGTON",
        "DC"
    ],
    "20059": [
        "WASHINGTON",
        "DC"
    ],
    "20060": [
        "WASHINGTON",
        "DC"
    ],
    "20062": [
        "WASHINGTON",
        "DC"
    ],
    "20064": [
        "WASHINGTON",
        "DC"
    ],
    "20065": [
        "WASHINGTON",
        "DC"
    ],
    "20066": [
        "WASHINGTON",
        "DC"
    ],
    "20068": [
        "WASHINGTON",
        "DC"
    ],
    "20070": [
        "WASHINGTON",
        "DC"
    ],
    "20071": [
        "WASHINGTON",
        "DC"
    ],
    "20076": [
        "WASHINGTON",
        "DC"
    ],
    "20080": [
        "WASHINGTON",
        "DC"
    ],
    "20082": [
        "WASHINGTON",
        "DC"
    ],
    "20090": [
        "WASHINGTON",
        "DC"
    ],
    "20091": [
        "WASHINGTON",
        "DC"
    ],
    "20101": [
        "DULLES",
        "VA"
    ],
    "20102": [
        "DULLES",
        "VA"
    ],
    "20103": [
        "DULLES",
        "VA"
    ],
    "20104": [
        "DULLES",
        "VA"
    ],
    "20105": [
        "ALDIE",
        "VA"
    ],
    "20106": [
        "AMISSVILLE",
        "VA"
    ],
    "20108": [
        "MANASSAS",
        "VA"
    ],
    "20109": [
        "MANASSAS",
        "VA"
    ],
    "20110": [
        "MANASSAS",
        "VA"
    ],
    "20111": [
        "MANASSAS",
        "VA"
    ],
    "20112": [
        "MANASSAS",
        "VA"
    ],
    "20113": [
        "MANASSAS",
        "VA"
    ],
    "20115": [
        "MARSHALL",
        "VA"
    ],
    "20116": [
        "MARSHALL",
        "VA"
    ],
    "20117": [
        "MIDDLEBURG",
        "VA"
    ],
    "20118": [
        "MIDDLEBURG",
        "VA"
    ],
    "20119": [
        "CATLETT",
        "VA"
    ],
    "20120": [
        "CENTREVILLE",
        "VA"
    ],
    "20121": [
        "CENTREVILLE",
        "VA"
    ],
    "20122": [
        "CENTREVILLE",
        "VA"
    ],
    "20124": [
        "CLIFTON",
        "VA"
    ],
    "20128": [
        "ORLEAN",
        "VA"
    ],
    "20129": [
        "PAEONIAN SPRINGS",
        "VA"
    ],
    "20130": [
        "PARIS",
        "VA"
    ],
    "20131": [
        "PHILOMONT",
        "VA"
    ],
    "20132": [
        "PURCELLVILLE",
        "VA"
    ],
    "20134": [
        "PURCELLVILLE",
        "VA"
    ],
    "20135": [
        "BLUEMONT",
        "VA"
    ],
    "20136": [
        "BRISTOW",
        "VA"
    ],
    "20137": [
        "BROAD RUN",
        "VA"
    ],
    "20138": [
        "CALVERTON",
        "VA"
    ],
    "20139": [
        "CASANOVA",
        "VA"
    ],
    "20140": [
        "RECTORTOWN",
        "VA"
    ],
    "20141": [
        "ROUND HILL",
        "VA"
    ],
    "20142": [
        "ROUND HILL",
        "VA"
    ],
    "20143": [
        "CATHARPIN",
        "VA"
    ],
    "20144": [
        "DELAPLANE",
        "VA"
    ],
    "20146": [
        "ASHBURN",
        "VA"
    ],
    "20147": [
        "ASHBURN",
        "VA"
    ],
    "20148": [
        "ASHBURN",
        "VA"
    ],
    "20151": [
        "CHANTILLY",
        "VA"
    ],
    "20152": [
        "CHANTILLY",
        "VA"
    ],
    "20153": [
        "CHANTILLY",
        "VA"
    ],
    "20155": [
        "GAINESVILLE",
        "VA"
    ],
    "20156": [
        "GAINESVILLE",
        "VA"
    ],
    "20158": [
        "HAMILTON",
        "VA"
    ],
    "20159": [
        "HAMILTON",
        "VA"
    ],
    "20160": [
        "LINCOLN",
        "VA"
    ],
    "20164": [
        "STERLING",
        "VA"
    ],
    "20165": [
        "STERLING",
        "VA"
    ],
    "20166": [
        "STERLING",
        "VA"
    ],
    "20167": [
        "STERLING",
        "VA"
    ],
    "20168": [
        "HAYMARKET",
        "VA"
    ],
    "20169": [
        "HAYMARKET",
        "VA"
    ],
    "20170": [
        "HERNDON",
        "VA"
    ],
    "20171": [
        "HERNDON",
        "VA"
    ],
    "20172": [
        "HERNDON",
        "VA"
    ],
    "20175": [
        "LEESBURG",
        "VA"
    ],
    "20176": [
        "LEESBURG",
        "VA"
    ],
    "20177": [
        "LEESBURG",
        "VA"
    ],
    "20178": [
        "LEESBURG",
        "VA"
    ],
    "20180": [
        "LOVETTSVILLE",
        "VA"
    ],
    "20181": [
        "NOKESVILLE",
        "VA"
    ],
    "20182": [
        "NOKESVILLE",
        "VA"
    ],
    "20184": [
        "UPPERVILLE",
        "VA"
    ],
    "20185": [
        "UPPERVILLE",
        "VA"
    ],
    "20186": [
        "WARRENTON",
        "VA"
    ],
    "20187": [
        "WARRENTON",
        "VA"
    ],
    "20188": [
        "WARRENTON",
        "VA"
    ],
    "20189": [
        "DULLES",
        "VA"
    ],
    "20190": [
        "RESTON",
        "VA"
    ],
    "20191": [
        "RESTON",
        "VA"
    ],
    "20192": [
        "HERNDON",
        "VA"
    ],
    "20194": [
        "RESTON",
        "VA"
    ],
    "20195": [
        "RESTON",
        "VA"
    ],
    "20196": [
        "RESTON",
        "VA"
    ],
    "20197": [
        "WATERFORD",
        "VA"
    ],
    "20198": [
        "THE PLAINS",
        "VA"
    ],
    "20201": [
        "WASHINGTON",
        "DC"
    ],
    "20202": [
        "WASHINGTON",
        "DC"
    ],
    "20206": [
        "WASHINGTON",
        "DC"
    ],
    "20207": [
        "WASHINGTON",
        "DC"
    ],
    "20210": [
        "WASHINGTON",
        "DC"
    ],
    "20212": [
        "WASHINGTON",
        "DC"
    ],
    "20213": [
        "WASHINGTON",
        "DC"
    ],
    "20214": [
        "WASHINGTON",
        "DC"
    ],
    "20219": [
        "WASHINGTON",
        "DC"
    ],
    "20220": [
        "WASHINGTON",
        "DC"
    ],
    "20223": [
        "WASHINGTON",
        "DC"
    ],
    "20224": [
        "WASHINGTON",
        "DC"
    ],
    "20226": [
        "WASHINGTON",
        "DC"
    ],
    "20228": [
        "WASHINGTON",
        "DC"
    ],
    "20229": [
        "WASHINGTON",
        "DC"
    ],
    "20230": [
        "WASHINGTON",
        "DC"
    ],
    "20233": [
        "WASHINGTON",
        "DC"
    ],
    "20237": [
        "WASHINGTON",
        "DC"
    ],
    "20240": [
        "WASHINGTON",
        "DC"
    ],
    "20242": [
        "WASHINGTON",
        "DC"
    ],
    "20250": [
        "WASHINGTON",
        "DC"
    ],
    "20260": [
        "WASHINGTON",
        "DC"
    ],
    "20301": [
        "WASHINGTON",
        "DC"
    ],
    "20303": [
        "WASHINGTON",
        "DC"
    ],
    "20310": [
        "WASHINGTON",
        "DC"
    ],
    "20317": [
        "WASHINGTON",
        "DC"
    ],
    "20318": [
        "WASHINGTON",
        "DC"
    ],
    "20319": [
        "WASHINGTON",
        "DC"
    ],
    "20330": [
        "WASHINGTON",
        "DC"
    ],
    "20340": [
        "WASHINGTON",
        "DC"
    ],
    "20350": [
        "WASHINGTON",
        "DC"
    ],
    "20370": [
        "WASHINGTON",
        "DC"
    ],
    "20372": [
        "WASHINGTON",
        "DC"
    ],
    "20373": [
        "NAVAL ANACOST ANNEX",
        "DC"
    ],
    "20374": [
        "WASHINGTON NAVY YARD",
        "DC"
    ],
    "20375": [
        "WASHINGTON",
        "DC"
    ],
    "20376": [
        "WASHINGTON NAVY YARD",
        "DC"
    ],
    "20380": [
        "WASHINGTON",
        "DC"
    ],
    "20388": [
        "WASHINGTON NAVY YARD",
        "DC"
    ],
    "20391": [
        "WASHINGTON NAVY YARD",
        "DC"
    ],
    "20392": [
        "WASHINGTON",
        "DC"
    ],
    "20393": [
        "WASHINGTON",
        "DC"
    ],
    "20395": [
        "WASHINGTON",
        "DC"
    ],
    "20398": [
        "WASHINGTON NAVY YARD",
        "DC"
    ],
    "20401": [
        "WASHINGTON",
        "DC"
    ],
    "20405": [
        "WASHINGTON",
        "DC"
    ],
    "20407": [
        "WASHINGTON",
        "DC"
    ],
    "20408": [
        "WASHINGTON",
        "DC"
    ],
    "20410": [
        "WASHINGTON",
        "DC"
    ],
    "20413": [
        "WASHINGTON",
        "DC"
    ],
    "20415": [
        "WASHINGTON",
        "DC"
    ],
    "20416": [
        "WASHINGTON",
        "DC"
    ],
    "20418": [
        "WASHINGTON",
        "DC"
    ],
    "20420": [
        "WASHINGTON",
        "DC"
    ],
    "20421": [
        "WASHINGTON",
        "DC"
    ],
    "20422": [
        "WASHINGTON",
        "DC"
    ],
    "20426": [
        "WASHINGTON",
        "DC"
    ],
    "20429": [
        "WASHINGTON",
        "DC"
    ],
    "20431": [
        "WASHINGTON",
        "DC"
    ],
    "20433": [
        "WASHINGTON",
        "DC"
    ],
    "20435": [
        "WASHINGTON",
        "DC"
    ],
    "20436": [
        "WASHINGTON",
        "DC"
    ],
    "20439": [
        "WASHINGTON",
        "DC"
    ],
    "20447": [
        "WASHINGTON",
        "DC"
    ],
    "20451": [
        "WASHINGTON",
        "DC"
    ],
    "20460": [
        "WASHINGTON",
        "DC"
    ],
    "20463": [
        "WASHINGTON",
        "DC"
    ],
    "20472": [
        "WASHINGTON",
        "DC"
    ],
    "20500": [
        "WASHINGTON",
        "DC"
    ],
    "20501": [
        "WASHINGTON",
        "DC"
    ],
    "20502": [
        "WASHINGTON",
        "DC"
    ],
    "20503": [
        "WASHINGTON",
        "DC"
    ],
    "20505": [
        "WASHINGTON",
        "DC"
    ],
    "20506": [
        "WASHINGTON",
        "DC"
    ],
    "20507": [
        "WASHINGTON",
        "DC"
    ],
    "20508": [
        "WASHINGTON",
        "DC"
    ],
    "20510": [
        "WASHINGTON",
        "DC"
    ],
    "20515": [
        "WASHINGTON",
        "DC"
    ],
    "20520": [
        "WASHINGTON",
        "DC"
    ],
    "20521": [
        "WASHINGTON",
        "DC"
    ],
    "20522": [
        "WASHINGTON",
        "DC"
    ],
    "20523": [
        "WASHINGTON",
        "DC"
    ],
    "20525": [
        "WASHINGTON",
        "DC"
    ],
    "20526": [
        "WASHINGTON",
        "DC"
    ],
    "20527": [
        "WASHINGTON",
        "DC"
    ],
    "20528": [
        "WASHINGTON",
        "DC"
    ],
    "20529": [
        "WASHINGTON",
        "DC"
    ],
    "20530": [
        "WASHINGTON",
        "DC"
    ],
    "20534": [
        "WASHINGTON",
        "DC"
    ],
    "20535": [
        "WASHINGTON",
        "DC"
    ],
    "20536": [
        "WASHINGTON",
        "DC"
    ],
    "20538": [
        "WASHINGTON",
        "DC"
    ],
    "20540": [
        "WASHINGTON",
        "DC"
    ],
    "20543": [
        "WASHINGTON",
        "DC"
    ],
    "20544": [
        "WASHINGTON",
        "DC"
    ],
    "20546": [
        "WASHINGTON",
        "DC"
    ],
    "20547": [
        "WASHINGTON",
        "DC"
    ],
    "20548": [
        "WASHINGTON",
        "DC"
    ],
    "20549": [
        "WASHINGTON",
        "DC"
    ],
    "20551": [
        "WASHINGTON",
        "DC"
    ],
    "20552": [
        "WASHINGTON",
        "DC"
    ],
    "20553": [
        "WASHINGTON",
        "DC"
    ],
    "20554": [
        "WASHINGTON",
        "DC"
    ],
    "20560": [
        "WASHINGTON",
        "DC"
    ],
    "20565": [
        "WASHINGTON",
        "DC"
    ],
    "20566": [
        "WASHINGTON",
        "DC"
    ],
    "20571": [
        "WASHINGTON",
        "DC"
    ],
    "20577": [
        "WASHINGTON",
        "DC"
    ],
    "20579": [
        "WASHINGTON",
        "DC"
    ],
    "20580": [
        "WASHINGTON",
        "DC"
    ],
    "20581": [
        "WASHINGTON",
        "DC"
    ],
    "20585": [
        "WASHINGTON",
        "DC"
    ],
    "20590": [
        "WASHINGTON",
        "DC"
    ],
    "20591": [
        "WASHINGTON",
        "DC"
    ],
    "20593": [
        "WASHINGTON",
        "DC"
    ],
    "20598": [
        "DHS",
        "VA"
    ],
    "20601": [
        "WALDORF",
        "MD"
    ],
    "20602": [
        "WALDORF",
        "MD"
    ],
    "20603": [
        "WALDORF",
        "MD"
    ],
    "20604": [
        "WALDORF",
        "MD"
    ],
    "20607": [
        "ACCOKEEK",
        "MD"
    ],
    "20608": [
        "AQUASCO",
        "MD"
    ],
    "20609": [
        "AVENUE",
        "MD"
    ],
    "20610": [
        "BARSTOW",
        "MD"
    ],
    "20611": [
        "BEL ALTON",
        "MD"
    ],
    "20612": [
        "BENEDICT",
        "MD"
    ],
    "20613": [
        "BRANDYWINE",
        "MD"
    ],
    "20615": [
        "BROOMES ISLAND",
        "MD"
    ],
    "20616": [
        "BRYANS ROAD",
        "MD"
    ],
    "20617": [
        "BRYANTOWN",
        "MD"
    ],
    "20618": [
        "BUSHWOOD",
        "MD"
    ],
    "20619": [
        "CALIFORNIA",
        "MD"
    ],
    "20620": [
        "CALLAWAY",
        "MD"
    ],
    "20621": [
        "CHAPTICO",
        "MD"
    ],
    "20622": [
        "CHARLOTTE HALL",
        "MD"
    ],
    "20623": [
        "CHELTENHAM",
        "MD"
    ],
    "20624": [
        "CLEMENTS",
        "MD"
    ],
    "20625": [
        "COBB ISLAND",
        "MD"
    ],
    "20626": [
        "COLTONS POINT",
        "MD"
    ],
    "20627": [
        "COMPTON",
        "MD"
    ],
    "20628": [
        "DAMERON",
        "MD"
    ],
    "20629": [
        "DOWELL",
        "MD"
    ],
    "20630": [
        "DRAYDEN",
        "MD"
    ],
    "20632": [
        "FAULKNER",
        "MD"
    ],
    "20634": [
        "GREAT MILLS",
        "MD"
    ],
    "20635": [
        "HELEN",
        "MD"
    ],
    "20636": [
        "HOLLYWOOD",
        "MD"
    ],
    "20637": [
        "HUGHESVILLE",
        "MD"
    ],
    "20639": [
        "HUNTINGTOWN",
        "MD"
    ],
    "20640": [
        "INDIAN HEAD",
        "MD"
    ],
    "20645": [
        "ISSUE",
        "MD"
    ],
    "20646": [
        "LA PLATA",
        "MD"
    ],
    "20650": [
        "LEONARDTOWN",
        "MD"
    ],
    "20653": [
        "LEXINGTON PARK",
        "MD"
    ],
    "20656": [
        "LOVEVILLE",
        "MD"
    ],
    "20657": [
        "LUSBY",
        "MD"
    ],
    "20658": [
        "MARBURY",
        "MD"
    ],
    "20659": [
        "MECHANICSVILLE",
        "MD"
    ],
    "20660": [
        "MORGANZA",
        "MD"
    ],
    "20661": [
        "MOUNT VICTORIA",
        "MD"
    ],
    "20662": [
        "NANJEMOY",
        "MD"
    ],
    "20664": [
        "NEWBURG",
        "MD"
    ],
    "20667": [
        "PARK HALL",
        "MD"
    ],
    "20670": [
        "PATUXENT RIVER",
        "MD"
    ],
    "20674": [
        "PINEY POINT",
        "MD"
    ],
    "20675": [
        "POMFRET",
        "MD"
    ],
    "20676": [
        "PORT REPUBLIC",
        "MD"
    ],
    "20677": [
        "PORT TOBACCO",
        "MD"
    ],
    "20678": [
        "PRINCE FREDERICK",
        "MD"
    ],
    "20680": [
        "RIDGE",
        "MD"
    ],
    "20684": [
        "SAINT INIGOES",
        "MD"
    ],
    "20685": [
        "SAINT LEONARD",
        "MD"
    ],
    "20686": [
        "SAINT MARYS CITY",
        "MD"
    ],
    "20687": [
        "SCOTLAND",
        "MD"
    ],
    "20688": [
        "SOLOMONS",
        "MD"
    ],
    "20689": [
        "SUNDERLAND",
        "MD"
    ],
    "20690": [
        "TALL TIMBERS",
        "MD"
    ],
    "20692": [
        "VALLEY LEE",
        "MD"
    ],
    "20693": [
        "WELCOME",
        "MD"
    ],
    "20695": [
        "WHITE PLAINS",
        "MD"
    ],
    "20701": [
        "ANNAPOLIS JUNCTION",
        "MD"
    ],
    "20703": [
        "LANHAM",
        "MD"
    ],
    "20704": [
        "BELTSVILLE",
        "MD"
    ],
    "20705": [
        "BELTSVILLE",
        "MD"
    ],
    "20706": [
        "LANHAM",
        "MD"
    ],
    "20707": [
        "LAUREL",
        "MD"
    ],
    "20708": [
        "LAUREL",
        "MD"
    ],
    "20709": [
        "LAUREL",
        "MD"
    ],
    "20710": [
        "BLADENSBURG",
        "MD"
    ],
    "20711": [
        "LOTHIAN",
        "MD"
    ],
    "20712": [
        "MOUNT RAINIER",
        "MD"
    ],
    "20714": [
        "NORTH BEACH",
        "MD"
    ],
    "20715": [
        "BOWIE",
        "MD"
    ],
    "20716": [
        "BOWIE",
        "MD"
    ],
    "20717": [
        "BOWIE",
        "MD"
    ],
    "20718": [
        "BOWIE",
        "MD"
    ],
    "20719": [
        "BOWIE",
        "MD"
    ],
    "20720": [
        "BOWIE",
        "MD"
    ],
    "20721": [
        "BOWIE",
        "MD"
    ],
    "20722": [
        "BRENTWOOD",
        "MD"
    ],
    "20723": [
        "LAUREL",
        "MD"
    ],
    "20724": [
        "LAUREL",
        "MD"
    ],
    "20725": [
        "LAUREL",
        "MD"
    ],
    "20726": [
        "LAUREL",
        "MD"
    ],
    "20731": [
        "CAPITOL HEIGHTS",
        "MD"
    ],
    "20732": [
        "CHESAPEAKE BEACH",
        "MD"
    ],
    "20733": [
        "CHURCHTON",
        "MD"
    ],
    "20735": [
        "CLINTON",
        "MD"
    ],
    "20736": [
        "OWINGS",
        "MD"
    ],
    "20737": [
        "RIVERDALE",
        "MD"
    ],
    "20738": [
        "RIVERDALE",
        "MD"
    ],
    "20740": [
        "COLLEGE PARK",
        "MD"
    ],
    "20741": [
        "COLLEGE PARK",
        "MD"
    ],
    "20742": [
        "COLLEGE PARK",
        "MD"
    ],
    "20743": [
        "CAPITOL HEIGHTS",
        "MD"
    ],
    "20744": [
        "FORT WASHINGTON",
        "MD"
    ],
    "20745": [
        "OXON HILL",
        "MD"
    ],
    "20746": [
        "SUITLAND",
        "MD"
    ],
    "20747": [
        "DISTRICT HEIGHTS",
        "MD"
    ],
    "20748": [
        "TEMPLE HILLS",
        "MD"
    ],
    "20749": [
        "FORT WASHINGTON",
        "MD"
    ],
    "20751": [
        "DEALE",
        "MD"
    ],
    "20752": [
        "SUITLAND",
        "MD"
    ],
    "20753": [
        "DISTRICT HEIGHTS",
        "MD"
    ],
    "20754": [
        "DUNKIRK",
        "MD"
    ],
    "20755": [
        "FORT GEORGE G MEADE",
        "MD"
    ],
    "20757": [
        "TEMPLE HILLS",
        "MD"
    ],
    "20758": [
        "FRIENDSHIP",
        "MD"
    ],
    "20759": [
        "FULTON",
        "MD"
    ],
    "20762": [
        "ANDREWS AIR FORCE BASE",
        "MD"
    ],
    "20763": [
        "SAVAGE",
        "MD"
    ],
    "20764": [
        "SHADY SIDE",
        "MD"
    ],
    "20765": [
        "GALESVILLE",
        "MD"
    ],
    "20768": [
        "GREENBELT",
        "MD"
    ],
    "20769": [
        "GLENN DALE",
        "MD"
    ],
    "20770": [
        "GREENBELT",
        "MD"
    ],
    "20771": [
        "GREENBELT",
        "MD"
    ],
    "20772": [
        "UPPER MARLBORO",
        "MD"
    ],
    "20773": [
        "UPPER MARLBORO",
        "MD"
    ],
    "20774": [
        "UPPER MARLBORO",
        "MD"
    ],
    "20775": [
        "UPPER MARLBORO",
        "MD"
    ],
    "20776": [
        "HARWOOD",
        "MD"
    ],
    "20777": [
        "HIGHLAND",
        "MD"
    ],
    "20778": [
        "WEST RIVER",
        "MD"
    ],
    "20779": [
        "TRACYS LANDING",
        "MD"
    ],
    "20781": [
        "HYATTSVILLE",
        "MD"
    ],
    "20782": [
        "HYATTSVILLE",
        "MD"
    ],
    "20783": [
        "HYATTSVILLE",
        "MD"
    ],
    "20784": [
        "HYATTSVILLE",
        "MD"
    ],
    "20785": [
        "HYATTSVILLE",
        "MD"
    ],
    "20787": [
        "HYATTSVILLE",
        "MD"
    ],
    "20788": [
        "HYATTSVILLE",
        "MD"
    ],
    "20790": [
        "CAPITOL HEIGHTS",
        "MD"
    ],
    "20791": [
        "CAPITOL HEIGHTS",
        "MD"
    ],
    "20792": [
        "UPPER MARLBORO",
        "MD"
    ],
    "20794": [
        "JESSUP",
        "MD"
    ],
    "20797": [
        "SOUTHERN MD FACILITY",
        "MD"
    ],
    "20799": [
        "CAPITOL HEIGHTS",
        "MD"
    ],
    "20810": [
        "BETHESDA",
        "MD"
    ],
    "20812": [
        "GLEN ECHO",
        "MD"
    ],
    "20813": [
        "BETHESDA",
        "MD"
    ],
    "20814": [
        "BETHESDA",
        "MD"
    ],
    "20815": [
        "CHEVY CHASE",
        "MD"
    ],
    "20816": [
        "BETHESDA",
        "MD"
    ],
    "20817": [
        "BETHESDA",
        "MD"
    ],
    "20818": [
        "CABIN JOHN",
        "MD"
    ],
    "20824": [
        "BETHESDA",
        "MD"
    ],
    "20825": [
        "CHEVY CHASE",
        "MD"
    ],
    "20827": [
        "BETHESDA",
        "MD"
    ],
    "20830": [
        "OLNEY",
        "MD"
    ],
    "20832": [
        "OLNEY",
        "MD"
    ],
    "20833": [
        "BROOKEVILLE",
        "MD"
    ],
    "20837": [
        "POOLESVILLE",
        "MD"
    ],
    "20838": [
        "BARNESVILLE",
        "MD"
    ],
    "20839": [
        "BEALLSVILLE",
        "MD"
    ],
    "20841": [
        "BOYDS",
        "MD"
    ],
    "20842": [
        "DICKERSON",
        "MD"
    ],
    "20847": [
        "ROCKVILLE",
        "MD"
    ],
    "20848": [
        "ROCKVILLE",
        "MD"
    ],
    "20849": [
        "ROCKVILLE",
        "MD"
    ],
    "20850": [
        "ROCKVILLE",
        "MD"
    ],
    "20851": [
        "ROCKVILLE",
        "MD"
    ],
    "20852": [
        "ROCKVILLE",
        "MD"
    ],
    "20853": [
        "ROCKVILLE",
        "MD"
    ],
    "20854": [
        "POTOMAC",
        "MD"
    ],
    "20855": [
        "DERWOOD",
        "MD"
    ],
    "20857": [
        "ROCKVILLE",
        "MD"
    ],
    "20859": [
        "POTOMAC",
        "MD"
    ],
    "20860": [
        "SANDY SPRING",
        "MD"
    ],
    "20861": [
        "ASHTON",
        "MD"
    ],
    "20862": [
        "BRINKLOW",
        "MD"
    ],
    "20866": [
        "BURTONSVILLE",
        "MD"
    ],
    "20868": [
        "SPENCERVILLE",
        "MD"
    ],
    "20871": [
        "CLARKSBURG",
        "MD"
    ],
    "20872": [
        "DAMASCUS",
        "MD"
    ],
    "20874": [
        "GERMANTOWN",
        "MD"
    ],
    "20875": [
        "GERMANTOWN",
        "MD"
    ],
    "20876": [
        "GERMANTOWN",
        "MD"
    ],
    "20877": [
        "GAITHERSBURG",
        "MD"
    ],
    "20878": [
        "GAITHERSBURG",
        "MD"
    ],
    "20879": [
        "GAITHERSBURG",
        "MD"
    ],
    "20880": [
        "WASHINGTON GROVE",
        "MD"
    ],
    "20882": [
        "GAITHERSBURG",
        "MD"
    ],
    "20883": [
        "GAITHERSBURG",
        "MD"
    ],
    "20884": [
        "GAITHERSBURG",
        "MD"
    ],
    "20885": [
        "GAITHERSBURG",
        "MD"
    ],
    "20886": [
        "MONTGOMERY VILLAGE",
        "MD"
    ],
    "20889": [
        "BETHESDA",
        "MD"
    ],
    "20891": [
        "KENSINGTON",
        "MD"
    ],
    "20892": [
        "BETHESDA",
        "MD"
    ],
    "20894": [
        "BETHESDA",
        "MD"
    ],
    "20895": [
        "KENSINGTON",
        "MD"
    ],
    "20896": [
        "GARRETT PARK",
        "MD"
    ],
    "20897": [
        "SUBURB MARYLAND FAC",
        "MD"
    ],
    "20898": [
        "GAITHERSBURG",
        "MD"
    ],
    "20899": [
        "GAITHERSBURG",
        "MD"
    ],
    "20901": [
        "SILVER SPRING",
        "MD"
    ],
    "20902": [
        "SILVER SPRING",
        "MD"
    ],
    "20903": [
        "SILVER SPRING",
        "MD"
    ],
    "20904": [
        "SILVER SPRING",
        "MD"
    ],
    "20905": [
        "SILVER SPRING",
        "MD"
    ],
    "20906": [
        "SILVER SPRING",
        "MD"
    ],
    "20907": [
        "SILVER SPRING",
        "MD"
    ],
    "20908": [
        "SILVER SPRING",
        "MD"
    ],
    "20910": [
        "SILVER SPRING",
        "MD"
    ],
    "20911": [
        "SILVER SPRING",
        "MD"
    ],
    "20912": [
        "TAKOMA PARK",
        "MD"
    ],
    "20913": [
        "TAKOMA PARK",
        "MD"
    ],
    "20914": [
        "SILVER SPRING",
        "MD"
    ],
    "20915": [
        "SILVER SPRING",
        "MD"
    ],
    "20916": [
        "SILVER SPRING",
        "MD"
    ],
    "20918": [
        "SILVER SPRING",
        "MD"
    ],
    "20993": [
        "SILVER SPRING",
        "MD"
    ],
    "21001": [
        "ABERDEEN",
        "MD"
    ],
    "21005": [
        "ABERDEEN PROVING GROUND",
        "MD"
    ],
    "21009": [
        "ABINGDON",
        "MD"
    ],
    "21010": [
        "GUNPOWDER",
        "MD"
    ],
    "21012": [
        "ARNOLD",
        "MD"
    ],
    "21013": [
        "BALDWIN",
        "MD"
    ],
    "21014": [
        "BEL AIR",
        "MD"
    ],
    "21015": [
        "BEL AIR",
        "MD"
    ],
    "21017": [
        "BELCAMP",
        "MD"
    ],
    "21020": [
        "BORING",
        "MD"
    ],
    "21022": [
        "BROOKLANDVILLE",
        "MD"
    ],
    "21023": [
        "BUTLER",
        "MD"
    ],
    "21027": [
        "CHASE",
        "MD"
    ],
    "21028": [
        "CHURCHVILLE",
        "MD"
    ],
    "21029": [
        "CLARKSVILLE",
        "MD"
    ],
    "21030": [
        "COCKEYSVILLE",
        "MD"
    ],
    "21031": [
        "HUNT VALLEY",
        "MD"
    ],
    "21032": [
        "CROWNSVILLE",
        "MD"
    ],
    "21034": [
        "DARLINGTON",
        "MD"
    ],
    "21035": [
        "DAVIDSONVILLE",
        "MD"
    ],
    "21036": [
        "DAYTON",
        "MD"
    ],
    "21037": [
        "EDGEWATER",
        "MD"
    ],
    "21040": [
        "EDGEWOOD",
        "MD"
    ],
    "21041": [
        "ELLICOTT CITY",
        "MD"
    ],
    "21042": [
        "ELLICOTT CITY",
        "MD"
    ],
    "21043": [
        "ELLICOTT CITY",
        "MD"
    ],
    "21044": [
        "COLUMBIA",
        "MD"
    ],
    "21045": [
        "COLUMBIA",
        "MD"
    ],
    "21046": [
        "COLUMBIA",
        "MD"
    ],
    "21047": [
        "FALLSTON",
        "MD"
    ],
    "21048": [
        "FINKSBURG",
        "MD"
    ],
    "21050": [
        "FOREST HILL",
        "MD"
    ],
    "21051": [
        "FORK",
        "MD"
    ],
    "21052": [
        "FORT HOWARD",
        "MD"
    ],
    "21053": [
        "FREELAND",
        "MD"
    ],
    "21054": [
        "GAMBRILLS",
        "MD"
    ],
    "21056": [
        "GIBSON ISLAND",
        "MD"
    ],
    "21057": [
        "GLEN ARM",
        "MD"
    ],
    "21060": [
        "GLEN BURNIE",
        "MD"
    ],
    "21061": [
        "GLEN BURNIE",
        "MD"
    ],
    "21062": [
        "GLEN BURNIE",
        "MD"
    ],
    "21065": [
        "HUNT VALLEY",
        "MD"
    ],
    "21071": [
        "GLYNDON",
        "MD"
    ],
    "21074": [
        "HAMPSTEAD",
        "MD"
    ],
    "21075": [
        "ELKRIDGE",
        "MD"
    ],
    "21076": [
        "HANOVER",
        "MD"
    ],
    "21077": [
        "HARMANS",
        "MD"
    ],
    "21078": [
        "HAVRE DE GRACE",
        "MD"
    ],
    "21082": [
        "HYDES",
        "MD"
    ],
    "21084": [
        "JARRETTSVILLE",
        "MD"
    ],
    "21085": [
        "JOPPA",
        "MD"
    ],
    "21087": [
        "KINGSVILLE",
        "MD"
    ],
    "21088": [
        "LINEBORO",
        "MD"
    ],
    "21090": [
        "LINTHICUM HEIGHTS",
        "MD"
    ],
    "21092": [
        "LONG GREEN",
        "MD"
    ],
    "21093": [
        "LUTHERVILLE TIMONIUM",
        "MD"
    ],
    "21094": [
        "LUTHERVILLE TIMONIUM",
        "MD"
    ],
    "21102": [
        "MANCHESTER",
        "MD"
    ],
    "21104": [
        "MARRIOTTSVILLE",
        "MD"
    ],
    "21105": [
        "MARYLAND LINE",
        "MD"
    ],
    "21106": [
        "MAYO",
        "MD"
    ],
    "21108": [
        "MILLERSVILLE",
        "MD"
    ],
    "21111": [
        "MONKTON",
        "MD"
    ],
    "21113": [
        "ODENTON",
        "MD"
    ],
    "21114": [
        "CROFTON",
        "MD"
    ],
    "21117": [
        "OWINGS MILLS",
        "MD"
    ],
    "21120": [
        "PARKTON",
        "MD"
    ],
    "21122": [
        "PASADENA",
        "MD"
    ],
    "21123": [
        "PASADENA",
        "MD"
    ],
    "21128": [
        "PERRY HALL",
        "MD"
    ],
    "21130": [
        "PERRYMAN",
        "MD"
    ],
    "21131": [
        "PHOENIX",
        "MD"
    ],
    "21132": [
        "PYLESVILLE",
        "MD"
    ],
    "21133": [
        "RANDALLSTOWN",
        "MD"
    ],
    "21136": [
        "REISTERSTOWN",
        "MD"
    ],
    "21139": [
        "RIDERWOOD",
        "MD"
    ],
    "21140": [
        "RIVA",
        "MD"
    ],
    "21144": [
        "SEVERN",
        "MD"
    ],
    "21146": [
        "SEVERNA PARK",
        "MD"
    ],
    "21150": [
        "SIMPSONVILLE",
        "MD"
    ],
    "21152": [
        "SPARKS GLENCOE",
        "MD"
    ],
    "21153": [
        "STEVENSON",
        "MD"
    ],
    "21154": [
        "STREET",
        "MD"
    ],
    "21155": [
        "UPPERCO",
        "MD"
    ],
    "21156": [
        "UPPER FALLS",
        "MD"
    ],
    "21157": [
        "WESTMINSTER",
        "MD"
    ],
    "21158": [
        "WESTMINSTER",
        "MD"
    ],
    "21160": [
        "WHITEFORD",
        "MD"
    ],
    "21161": [
        "WHITE HALL",
        "MD"
    ],
    "21162": [
        "WHITE MARSH",
        "MD"
    ],
    "21163": [
        "WOODSTOCK",
        "MD"
    ],
    "21201": [
        "BALTIMORE",
        "MD"
    ],
    "21202": [
        "BALTIMORE",
        "MD"
    ],
    "21203": [
        "BALTIMORE",
        "MD"
    ],
    "21204": [
        "TOWSON",
        "MD"
    ],
    "21205": [
        "BALTIMORE",
        "MD"
    ],
    "21206": [
        "BALTIMORE",
        "MD"
    ],
    "21207": [
        "GWYNN OAK",
        "MD"
    ],
    "21208": [
        "PIKESVILLE",
        "MD"
    ],
    "21209": [
        "BALTIMORE",
        "MD"
    ],
    "21210": [
        "BALTIMORE",
        "MD"
    ],
    "21211": [
        "BALTIMORE",
        "MD"
    ],
    "21212": [
        "BALTIMORE",
        "MD"
    ],
    "21213": [
        "BALTIMORE",
        "MD"
    ],
    "21214": [
        "BALTIMORE",
        "MD"
    ],
    "21215": [
        "BALTIMORE",
        "MD"
    ],
    "21216": [
        "BALTIMORE",
        "MD"
    ],
    "21217": [
        "BALTIMORE",
        "MD"
    ],
    "21218": [
        "BALTIMORE",
        "MD"
    ],
    "21219": [
        "SPARROWS POINT",
        "MD"
    ],
    "21220": [
        "MIDDLE RIVER",
        "MD"
    ],
    "21221": [
        "ESSEX",
        "MD"
    ],
    "21222": [
        "DUNDALK",
        "MD"
    ],
    "21223": [
        "BALTIMORE",
        "MD"
    ],
    "21224": [
        "BALTIMORE",
        "MD"
    ],
    "21225": [
        "BROOKLYN",
        "MD"
    ],
    "21226": [
        "CURTIS BAY",
        "MD"
    ],
    "21227": [
        "HALETHORPE",
        "MD"
    ],
    "21228": [
        "CATONSVILLE",
        "MD"
    ],
    "21229": [
        "BALTIMORE",
        "MD"
    ],
    "21230": [
        "BALTIMORE",
        "MD"
    ],
    "21231": [
        "BALTIMORE",
        "MD"
    ],
    "21233": [
        "BALTIMORE",
        "MD"
    ],
    "21234": [
        "PARKVILLE",
        "MD"
    ],
    "21235": [
        "BALTIMORE",
        "MD"
    ],
    "21236": [
        "NOTTINGHAM",
        "MD"
    ],
    "21237": [
        "ROSEDALE",
        "MD"
    ],
    "21239": [
        "BALTIMORE",
        "MD"
    ],
    "21240": [
        "BALTIMORE",
        "MD"
    ],
    "21241": [
        "BALTIMORE",
        "MD"
    ],
    "21244": [
        "WINDSOR MILL",
        "MD"
    ],
    "21250": [
        "BALTIMORE",
        "MD"
    ],
    "21251": [
        "BALTIMORE",
        "MD"
    ],
    "21252": [
        "TOWSON",
        "MD"
    ],
    "21278": [
        "BALTIMORE",
        "MD"
    ],
    "21281": [
        "BALTIMORE",
        "MD"
    ],
    "21282": [
        "PIKESVILLE",
        "MD"
    ],
    "21284": [
        "TOWSON",
        "MD"
    ],
    "21285": [
        "TOWSON",
        "MD"
    ],
    "21286": [
        "TOWSON",
        "MD"
    ],
    "21287": [
        "BALTIMORE",
        "MD"
    ],
    "21290": [
        "BALTIMORE",
        "MD"
    ],
    "21297": [
        "BALTIMORE",
        "MD"
    ],
    "21401": [
        "ANNAPOLIS",
        "MD"
    ],
    "21402": [
        "ANNAPOLIS",
        "MD"
    ],
    "21403": [
        "ANNAPOLIS",
        "MD"
    ],
    "21404": [
        "ANNAPOLIS",
        "MD"
    ],
    "21405": [
        "ANNAPOLIS",
        "MD"
    ],
    "21409": [
        "ANNAPOLIS",
        "MD"
    ],
    "21411": [
        "ANNAPOLIS",
        "MD"
    ],
    "21501": [
        "CUMBERLAND",
        "MD"
    ],
    "21502": [
        "CUMBERLAND",
        "MD"
    ],
    "21503": [
        "CUMBERLAND",
        "MD"
    ],
    "21504": [
        "CUMBERLAND",
        "MD"
    ],
    "21505": [
        "CUMBERLAND",
        "MD"
    ],
    "21520": [
        "ACCIDENT",
        "MD"
    ],
    "21521": [
        "BARTON",
        "MD"
    ],
    "21522": [
        "BITTINGER",
        "MD"
    ],
    "21523": [
        "BLOOMINGTON",
        "MD"
    ],
    "21524": [
        "CORRIGANVILLE",
        "MD"
    ],
    "21528": [
        "ECKHART MINES",
        "MD"
    ],
    "21529": [
        "ELLERSLIE",
        "MD"
    ],
    "21530": [
        "FLINTSTONE",
        "MD"
    ],
    "21531": [
        "FRIENDSVILLE",
        "MD"
    ],
    "21532": [
        "FROSTBURG",
        "MD"
    ],
    "21536": [
        "GRANTSVILLE",
        "MD"
    ],
    "21538": [
        "KITZMILLER",
        "MD"
    ],
    "21539": [
        "LONACONING",
        "MD"
    ],
    "21540": [
        "LUKE",
        "MD"
    ],
    "21541": [
        "MC HENRY",
        "MD"
    ],
    "21542": [
        "MIDLAND",
        "MD"
    ],
    "21543": [
        "MIDLOTHIAN",
        "MD"
    ],
    "21545": [
        "MOUNT SAVAGE",
        "MD"
    ],
    "21550": [
        "OAKLAND",
        "MD"
    ],
    "21555": [
        "OLDTOWN",
        "MD"
    ],
    "21556": [
        "PINTO",
        "MD"
    ],
    "21557": [
        "RAWLINGS",
        "MD"
    ],
    "21561": [
        "SWANTON",
        "MD"
    ],
    "21562": [
        "WESTERNPORT",
        "MD"
    ],
    "21601": [
        "EASTON",
        "MD"
    ],
    "21607": [
        "BARCLAY",
        "MD"
    ],
    "21609": [
        "BETHLEHEM",
        "MD"
    ],
    "21610": [
        "BETTERTON",
        "MD"
    ],
    "21612": [
        "BOZMAN",
        "MD"
    ],
    "21613": [
        "CAMBRIDGE",
        "MD"
    ],
    "21617": [
        "CENTREVILLE",
        "MD"
    ],
    "21619": [
        "CHESTER",
        "MD"
    ],
    "21620": [
        "CHESTERTOWN",
        "MD"
    ],
    "21622": [
        "CHURCH CREEK",
        "MD"
    ],
    "21623": [
        "CHURCH HILL",
        "MD"
    ],
    "21624": [
        "CLAIBORNE",
        "MD"
    ],
    "21625": [
        "CORDOVA",
        "MD"
    ],
    "21628": [
        "CRUMPTON",
        "MD"
    ],
    "21629": [
        "DENTON",
        "MD"
    ],
    "21631": [
        "EAST NEW MARKET",
        "MD"
    ],
    "21632": [
        "FEDERALSBURG",
        "MD"
    ],
    "21634": [
        "FISHING CREEK",
        "MD"
    ],
    "21635": [
        "GALENA",
        "MD"
    ],
    "21636": [
        "GOLDSBORO",
        "MD"
    ],
    "21638": [
        "GRASONVILLE",
        "MD"
    ],
    "21639": [
        "GREENSBORO",
        "MD"
    ],
    "21640": [
        "HENDERSON",
        "MD"
    ],
    "21641": [
        "HILLSBORO",
        "MD"
    ],
    "21643": [
        "HURLOCK",
        "MD"
    ],
    "21644": [
        "INGLESIDE",
        "MD"
    ],
    "21645": [
        "KENNEDYVILLE",
        "MD"
    ],
    "21647": [
        "MCDANIEL",
        "MD"
    ],
    "21648": [
        "MADISON",
        "MD"
    ],
    "21649": [
        "MARYDEL",
        "MD"
    ],
    "21650": [
        "MASSEY",
        "MD"
    ],
    "21651": [
        "MILLINGTON",
        "MD"
    ],
    "21652": [
        "NEAVITT",
        "MD"
    ],
    "21653": [
        "NEWCOMB",
        "MD"
    ],
    "21654": [
        "OXFORD",
        "MD"
    ],
    "21655": [
        "PRESTON",
        "MD"
    ],
    "21657": [
        "QUEEN ANNE",
        "MD"
    ],
    "21658": [
        "QUEENSTOWN",
        "MD"
    ],
    "21659": [
        "RHODESDALE",
        "MD"
    ],
    "21660": [
        "RIDGELY",
        "MD"
    ],
    "21661": [
        "ROCK HALL",
        "MD"
    ],
    "21662": [
        "ROYAL OAK",
        "MD"
    ],
    "21663": [
        "SAINT MICHAELS",
        "MD"
    ],
    "21664": [
        "SECRETARY",
        "MD"
    ],
    "21665": [
        "SHERWOOD",
        "MD"
    ],
    "21666": [
        "STEVENSVILLE",
        "MD"
    ],
    "21667": [
        "STILL POND",
        "MD"
    ],
    "21668": [
        "SUDLERSVILLE",
        "MD"
    ],
    "21669": [
        "TAYLORS ISLAND",
        "MD"
    ],
    "21671": [
        "TILGHMAN",
        "MD"
    ],
    "21672": [
        "TODDVILLE",
        "MD"
    ],
    "21673": [
        "TRAPPE",
        "MD"
    ],
    "21676": [
        "WITTMAN",
        "MD"
    ],
    "21677": [
        "WOOLFORD",
        "MD"
    ],
    "21678": [
        "WORTON",
        "MD"
    ],
    "21679": [
        "WYE MILLS",
        "MD"
    ],
    "21701": [
        "FREDERICK",
        "MD"
    ],
    "21702": [
        "FREDERICK",
        "MD"
    ],
    "21703": [
        "FREDERICK",
        "MD"
    ],
    "21704": [
        "FREDERICK",
        "MD"
    ],
    "21705": [
        "FREDERICK",
        "MD"
    ],
    "21709": [
        "FREDERICK",
        "MD"
    ],
    "21710": [
        "ADAMSTOWN",
        "MD"
    ],
    "21711": [
        "BIG POOL",
        "MD"
    ],
    "21713": [
        "BOONSBORO",
        "MD"
    ],
    "21714": [
        "BRADDOCK HEIGHTS",
        "MD"
    ],
    "21715": [
        "BROWNSVILLE",
        "MD"
    ],
    "21716": [
        "BRUNSWICK",
        "MD"
    ],
    "21717": [
        "BUCKEYSTOWN",
        "MD"
    ],
    "21718": [
        "BURKITTSVILLE",
        "MD"
    ],
    "21719": [
        "CASCADE",
        "MD"
    ],
    "21720": [
        "CAVETOWN",
        "MD"
    ],
    "21721": [
        "CHEWSVILLE",
        "MD"
    ],
    "21722": [
        "CLEAR SPRING",
        "MD"
    ],
    "21723": [
        "COOKSVILLE",
        "MD"
    ],
    "21727": [
        "EMMITSBURG",
        "MD"
    ],
    "21733": [
        "FAIRPLAY",
        "MD"
    ],
    "21734": [
        "FUNKSTOWN",
        "MD"
    ],
    "21737": [
        "GLENELG",
        "MD"
    ],
    "21738": [
        "GLENWOOD",
        "MD"
    ],
    "21740": [
        "HAGERSTOWN",
        "MD"
    ],
    "21741": [
        "HAGERSTOWN",
        "MD"
    ],
    "21742": [
        "HAGERSTOWN",
        "MD"
    ],
    "21746": [
        "HAGERSTOWN",
        "MD"
    ],
    "21750": [
        "HANCOCK",
        "MD"
    ],
    "21754": [
        "IJAMSVILLE",
        "MD"
    ],
    "21755": [
        "JEFFERSON",
        "MD"
    ],
    "21756": [
        "KEEDYSVILLE",
        "MD"
    ],
    "21757": [
        "KEYMAR",
        "MD"
    ],
    "21758": [
        "KNOXVILLE",
        "MD"
    ],
    "21762": [
        "LIBERTYTOWN",
        "MD"
    ],
    "21765": [
        "LISBON",
        "MD"
    ],
    "21766": [
        "LITTLE ORLEANS",
        "MD"
    ],
    "21767": [
        "MAUGANSVILLE",
        "MD"
    ],
    "21769": [
        "MIDDLETOWN",
        "MD"
    ],
    "21770": [
        "MONROVIA",
        "MD"
    ],
    "21771": [
        "MOUNT AIRY",
        "MD"
    ],
    "21773": [
        "MYERSVILLE",
        "MD"
    ],
    "21774": [
        "NEW MARKET",
        "MD"
    ],
    "21775": [
        "NEW MIDWAY",
        "MD"
    ],
    "21776": [
        "NEW WINDSOR",
        "MD"
    ],
    "21777": [
        "POINT OF ROCKS",
        "MD"
    ],
    "21778": [
        "ROCKY RIDGE",
        "MD"
    ],
    "21779": [
        "ROHRERSVILLE",
        "MD"
    ],
    "21780": [
        "SABILLASVILLE",
        "MD"
    ],
    "21781": [
        "SAINT JAMES",
        "MD"
    ],
    "21782": [
        "SHARPSBURG",
        "MD"
    ],
    "21783": [
        "SMITHSBURG",
        "MD"
    ],
    "21784": [
        "SYKESVILLE",
        "MD"
    ],
    "21787": [
        "TANEYTOWN",
        "MD"
    ],
    "21788": [
        "THURMONT",
        "MD"
    ],
    "21790": [
        "TUSCARORA",
        "MD"
    ],
    "21791": [
        "UNION BRIDGE",
        "MD"
    ],
    "21792": [
        "UNIONVILLE",
        "MD"
    ],
    "21793": [
        "WALKERSVILLE",
        "MD"
    ],
    "21794": [
        "WEST FRIENDSHIP",
        "MD"
    ],
    "21795": [
        "WILLIAMSPORT",
        "MD"
    ],
    "21797": [
        "WOODBINE",
        "MD"
    ],
    "21798": [
        "WOODSBORO",
        "MD"
    ],
    "21801": [
        "SALISBURY",
        "MD"
    ],
    "21802": [
        "SALISBURY",
        "MD"
    ],
    "21803": [
        "SALISBURY",
        "MD"
    ],
    "21804": [
        "SALISBURY",
        "MD"
    ],
    "21810": [
        "ALLEN",
        "MD"
    ],
    "21811": [
        "BERLIN",
        "MD"
    ],
    "21813": [
        "BISHOPVILLE",
        "MD"
    ],
    "21814": [
        "BIVALVE",
        "MD"
    ],
    "21817": [
        "CRISFIELD",
        "MD"
    ],
    "21821": [
        "DEAL ISLAND",
        "MD"
    ],
    "21822": [
        "EDEN",
        "MD"
    ],
    "21824": [
        "EWELL",
        "MD"
    ],
    "21826": [
        "FRUITLAND",
        "MD"
    ],
    "21829": [
        "GIRDLETREE",
        "MD"
    ],
    "21830": [
        "HEBRON",
        "MD"
    ],
    "21835": [
        "LINKWOOD",
        "MD"
    ],
    "21837": [
        "MARDELA SPRINGS",
        "MD"
    ],
    "21838": [
        "MARION STATION",
        "MD"
    ],
    "21840": [
        "NANTICOKE",
        "MD"
    ],
    "21841": [
        "NEWARK",
        "MD"
    ],
    "21842": [
        "OCEAN CITY",
        "MD"
    ],
    "21843": [
        "OCEAN CITY",
        "MD"
    ],
    "21849": [
        "PARSONSBURG",
        "MD"
    ],
    "21850": [
        "PITTSVILLE",
        "MD"
    ],
    "21851": [
        "POCOMOKE CITY",
        "MD"
    ],
    "21852": [
        "POWELLVILLE",
        "MD"
    ],
    "21853": [
        "PRINCESS ANNE",
        "MD"
    ],
    "21856": [
        "QUANTICO",
        "MD"
    ],
    "21857": [
        "REHOBETH",
        "MD"
    ],
    "21861": [
        "SHARPTOWN",
        "MD"
    ],
    "21862": [
        "SHOWELL",
        "MD"
    ],
    "21863": [
        "SNOW HILL",
        "MD"
    ],
    "21864": [
        "STOCKTON",
        "MD"
    ],
    "21865": [
        "TYASKIN",
        "MD"
    ],
    "21866": [
        "TYLERTON",
        "MD"
    ],
    "21867": [
        "UPPER FAIRMOUNT",
        "MD"
    ],
    "21869": [
        "VIENNA",
        "MD"
    ],
    "21871": [
        "WESTOVER",
        "MD"
    ],
    "21872": [
        "WHALEYVILLE",
        "MD"
    ],
    "21874": [
        "WILLARDS",
        "MD"
    ],
    "21875": [
        "DELMAR",
        "MD"
    ],
    "21890": [
        "WESTOVER",
        "MD"
    ],
    "21901": [
        "NORTH EAST",
        "MD"
    ],
    "21902": [
        "PERRY POINT",
        "MD"
    ],
    "21903": [
        "PERRYVILLE",
        "MD"
    ],
    "21904": [
        "PORT DEPOSIT",
        "MD"
    ],
    "21911": [
        "RISING SUN",
        "MD"
    ],
    "21912": [
        "WARWICK",
        "MD"
    ],
    "21913": [
        "CECILTON",
        "MD"
    ],
    "21914": [
        "CHARLESTOWN",
        "MD"
    ],
    "21915": [
        "CHESAPEAKE CITY",
        "MD"
    ],
    "21916": [
        "CHILDS",
        "MD"
    ],
    "21917": [
        "COLORA",
        "MD"
    ],
    "21918": [
        "CONOWINGO",
        "MD"
    ],
    "21919": [
        "EARLEVILLE",
        "MD"
    ],
    "21920": [
        "ELK MILLS",
        "MD"
    ],
    "21921": [
        "ELKTON",
        "MD"
    ],
    "21922": [
        "ELKTON",
        "MD"
    ],
    "21930": [
        "GEORGETOWN",
        "MD"
    ],
    "22003": [
        "ANNANDALE",
        "VA"
    ],
    "22009": [
        "BURKE",
        "VA"
    ],
    "22015": [
        "BURKE",
        "VA"
    ],
    "22025": [
        "DUMFRIES",
        "VA"
    ],
    "22026": [
        "DUMFRIES",
        "VA"
    ],
    "22027": [
        "DUNN LORING",
        "VA"
    ],
    "22030": [
        "FAIRFAX",
        "VA"
    ],
    "22031": [
        "FAIRFAX",
        "VA"
    ],
    "22032": [
        "FAIRFAX",
        "VA"
    ],
    "22033": [
        "FAIRFAX",
        "VA"
    ],
    "22034": [
        "FAIRFAX",
        "VA"
    ],
    "22035": [
        "FAIRFAX",
        "VA"
    ],
    "22036": [
        "FAIRFAX",
        "VA"
    ],
    "22037": [
        "FAIRFAX",
        "VA"
    ],
    "22038": [
        "FAIRFAX",
        "VA"
    ],
    "22039": [
        "FAIRFAX STATION",
        "VA"
    ],
    "22040": [
        "FALLS CHURCH",
        "VA"
    ],
    "22041": [
        "FALLS CHURCH",
        "VA"
    ],
    "22042": [
        "FALLS CHURCH",
        "VA"
    ],
    "22043": [
        "FALLS CHURCH",
        "VA"
    ],
    "22044": [
        "FALLS CHURCH",
        "VA"
    ],
    "22046": [
        "FALLS CHURCH",
        "VA"
    ],
    "22060": [
        "FORT BELVOIR",
        "VA"
    ],
    "22066": [
        "GREAT FALLS",
        "VA"
    ],
    "22079": [
        "LORTON",
        "VA"
    ],
    "22082": [
        "MERRIFIELD",
        "VA"
    ],
    "22096": [
        "RESTON",
        "VA"
    ],
    "22101": [
        "MC LEAN",
        "VA"
    ],
    "22102": [
        "MC LEAN",
        "VA"
    ],
    "22103": [
        "WEST MCLEAN",
        "VA"
    ],
    "22106": [
        "MC LEAN",
        "VA"
    ],
    "22107": [
        "MC LEAN",
        "VA"
    ],
    "22108": [
        "MC LEAN",
        "VA"
    ],
    "22109": [
        "MC LEAN",
        "VA"
    ],
    "22116": [
        "MERRIFIELD",
        "VA"
    ],
    "22121": [
        "MOUNT VERNON",
        "VA"
    ],
    "22122": [
        "NEWINGTON",
        "VA"
    ],
    "22124": [
        "OAKTON",
        "VA"
    ],
    "22125": [
        "OCCOQUAN",
        "VA"
    ],
    "22134": [
        "QUANTICO",
        "VA"
    ],
    "22135": [
        "QUANTICO",
        "VA"
    ],
    "22150": [
        "SPRINGFIELD",
        "VA"
    ],
    "22151": [
        "SPRINGFIELD",
        "VA"
    ],
    "22152": [
        "SPRINGFIELD",
        "VA"
    ],
    "22153": [
        "SPRINGFIELD",
        "VA"
    ],
    "22156": [
        "SPRINGFIELD",
        "VA"
    ],
    "22159": [
        "SPRINGFIELD",
        "VA"
    ],
    "22161": [
        "SPRINGFIELD",
        "VA"
    ],
    "22172": [
        "TRIANGLE",
        "VA"
    ],
    "22180": [
        "VIENNA",
        "VA"
    ],
    "22181": [
        "VIENNA",
        "VA"
    ],
    "22182": [
        "VIENNA",
        "VA"
    ],
    "22183": [
        "VIENNA",
        "VA"
    ],
    "22185": [
        "VIENNA",
        "VA"
    ],
    "22191": [
        "WOODBRIDGE",
        "VA"
    ],
    "22192": [
        "WOODBRIDGE",
        "VA"
    ],
    "22193": [
        "WOODBRIDGE",
        "VA"
    ],
    "22194": [
        "WOODBRIDGE",
        "VA"
    ],
    "22195": [
        "WOODBRIDGE",
        "VA"
    ],
    "22199": [
        "LORTON",
        "VA"
    ],
    "22201": [
        "ARLINGTON",
        "VA"
    ],
    "22202": [
        "ARLINGTON",
        "VA"
    ],
    "22203": [
        "ARLINGTON",
        "VA"
    ],
    "22204": [
        "ARLINGTON",
        "VA"
    ],
    "22205": [
        "ARLINGTON",
        "VA"
    ],
    "22206": [
        "ARLINGTON",
        "VA"
    ],
    "22207": [
        "ARLINGTON",
        "VA"
    ],
    "22209": [
        "ARLINGTON",
        "VA"
    ],
    "22210": [
        "ARLINGTON",
        "VA"
    ],
    "22211": [
        "FORT MYER",
        "VA"
    ],
    "22212": [
        "ARLINGTON",
        "VA"
    ],
    "22213": [
        "ARLINGTON",
        "VA"
    ],
    "22214": [
        "ARLINGTON",
        "VA"
    ],
    "22215": [
        "ARLINGTON",
        "VA"
    ],
    "22216": [
        "ARLINGTON",
        "VA"
    ],
    "22217": [
        "ARLINGTON",
        "VA"
    ],
    "22219": [
        "ARLINGTON",
        "VA"
    ],
    "22226": [
        "ARLINGTON",
        "VA"
    ],
    "22227": [
        "ARLINGTON",
        "VA"
    ],
    "22230": [
        "ARLINGTON",
        "VA"
    ],
    "22240": [
        "ARLINGTON",
        "VA"
    ],
    "22301": [
        "ALEXANDRIA",
        "VA"
    ],
    "22302": [
        "ALEXANDRIA",
        "VA"
    ],
    "22303": [
        "ALEXANDRIA",
        "VA"
    ],
    "22304": [
        "ALEXANDRIA",
        "VA"
    ],
    "22305": [
        "ALEXANDRIA",
        "VA"
    ],
    "22306": [
        "ALEXANDRIA",
        "VA"
    ],
    "22307": [
        "ALEXANDRIA",
        "VA"
    ],
    "22308": [
        "ALEXANDRIA",
        "VA"
    ],
    "22309": [
        "ALEXANDRIA",
        "VA"
    ],
    "22310": [
        "ALEXANDRIA",
        "VA"
    ],
    "22311": [
        "ALEXANDRIA",
        "VA"
    ],
    "22312": [
        "ALEXANDRIA",
        "VA"
    ],
    "22313": [
        "ALEXANDRIA",
        "VA"
    ],
    "22314": [
        "ALEXANDRIA",
        "VA"
    ],
    "22315": [
        "ALEXANDRIA",
        "VA"
    ],
    "22320": [
        "ALEXANDRIA",
        "VA"
    ],
    "22331": [
        "ALEXANDRIA",
        "VA"
    ],
    "22332": [
        "ALEXANDRIA",
        "VA"
    ],
    "22350": [
        "ALEXANDRIA",
        "VA"
    ],
    "22401": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22402": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22403": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22404": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22405": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22406": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22407": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22408": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22412": [
        "FREDERICKSBURG",
        "VA"
    ],
    "22427": [
        "BOWLING GREEN",
        "VA"
    ],
    "22432": [
        "BURGESS",
        "VA"
    ],
    "22433": [
        "BURR HILL",
        "VA"
    ],
    "22435": [
        "CALLAO",
        "VA"
    ],
    "22436": [
        "CARET",
        "VA"
    ],
    "22437": [
        "CENTER CROSS",
        "VA"
    ],
    "22438": [
        "CHAMPLAIN",
        "VA"
    ],
    "22442": [
        "COLES POINT",
        "VA"
    ],
    "22443": [
        "COLONIAL BEACH",
        "VA"
    ],
    "22446": [
        "CORBIN",
        "VA"
    ],
    "22448": [
        "DAHLGREN",
        "VA"
    ],
    "22454": [
        "DUNNSVILLE",
        "VA"
    ],
    "22456": [
        "EDWARDSVILLE",
        "VA"
    ],
    "22460": [
        "FARNHAM",
        "VA"
    ],
    "22463": [
        "GARRISONVILLE",
        "VA"
    ],
    "22469": [
        "HAGUE",
        "VA"
    ],
    "22471": [
        "HARTWOOD",
        "VA"
    ],
    "22472": [
        "HAYNESVILLE",
        "VA"
    ],
    "22473": [
        "HEATHSVILLE",
        "VA"
    ],
    "22476": [
        "HUSTLE",
        "VA"
    ],
    "22480": [
        "IRVINGTON",
        "VA"
    ],
    "22481": [
        "JERSEY",
        "VA"
    ],
    "22482": [
        "KILMARNOCK",
        "VA"
    ],
    "22485": [
        "KING GEORGE",
        "VA"
    ],
    "22488": [
        "KINSALE",
        "VA"
    ],
    "22501": [
        "LADYSMITH",
        "VA"
    ],
    "22503": [
        "LANCASTER",
        "VA"
    ],
    "22504": [
        "LANEVIEW",
        "VA"
    ],
    "22507": [
        "LIVELY",
        "VA"
    ],
    "22508": [
        "LOCUST GROVE",
        "VA"
    ],
    "22509": [
        "LORETTO",
        "VA"
    ],
    "22511": [
        "LOTTSBURG",
        "VA"
    ],
    "22514": [
        "MILFORD",
        "VA"
    ],
    "22517": [
        "MOLLUSK",
        "VA"
    ],
    "22520": [
        "MONTROSS",
        "VA"
    ],
    "22523": [
        "MORATTICO",
        "VA"
    ],
    "22524": [
        "MOUNT HOLLY",
        "VA"
    ],
    "22526": [
        "NINDE",
        "VA"
    ],
    "22529": [
        "OLDHAMS",
        "VA"
    ],
    "22530": [
        "OPHELIA",
        "VA"
    ],
    "22534": [
        "PARTLOW",
        "VA"
    ],
    "22535": [
        "PORT ROYAL",
        "VA"
    ],
    "22538": [
        "RAPPAHANNOCK ACADEMY",
        "VA"
    ],
    "22539": [
        "REEDVILLE",
        "VA"
    ],
    "22542": [
        "RHOADESVILLE",
        "VA"
    ],
    "22544": [
        "ROLLINS FORK",
        "VA"
    ],
    "22545": [
        "RUBY",
        "VA"
    ],
    "22546": [
        "RUTHER GLEN",
        "VA"
    ],
    "22547": [
        "SEALSTON",
        "VA"
    ],
    "22548": [
        "SHARPS",
        "VA"
    ],
    "22551": [
        "SPOTSYLVANIA",
        "VA"
    ],
    "22552": [
        "SPARTA",
        "VA"
    ],
    "22553": [
        "SPOTSYLVANIA",
        "VA"
    ],
    "22554": [
        "STAFFORD",
        "VA"
    ],
    "22555": [
        "STAFFORD",
        "VA"
    ],
    "22556": [
        "STAFFORD",
        "VA"
    ],
    "22558": [
        "STRATFORD",
        "VA"
    ],
    "22560": [
        "TAPPAHANNOCK",
        "VA"
    ],
    "22565": [
        "THORNBURG",
        "VA"
    ],
    "22567": [
        "UNIONVILLE",
        "VA"
    ],
    "22570": [
        "VILLAGE",
        "VA"
    ],
    "22572": [
        "WARSAW",
        "VA"
    ],
    "22576": [
        "WEEMS",
        "VA"
    ],
    "22578": [
        "WHITE STONE",
        "VA"
    ],
    "22579": [
        "WICOMICO CHURCH",
        "VA"
    ],
    "22580": [
        "WOODFORD",
        "VA"
    ],
    "22601": [
        "WINCHESTER",
        "VA"
    ],
    "22602": [
        "WINCHESTER",
        "VA"
    ],
    "22603": [
        "WINCHESTER",
        "VA"
    ],
    "22604": [
        "WINCHESTER",
        "VA"
    ],
    "22610": [
        "BENTONVILLE",
        "VA"
    ],
    "22611": [
        "BERRYVILLE",
        "VA"
    ],
    "22620": [
        "BOYCE",
        "VA"
    ],
    "22623": [
        "CHESTER GAP",
        "VA"
    ],
    "22624": [
        "CLEAR BROOK",
        "VA"
    ],
    "22625": [
        "CROSS JUNCTION",
        "VA"
    ],
    "22626": [
        "FISHERS HILL",
        "VA"
    ],
    "22627": [
        "FLINT HILL",
        "VA"
    ],
    "22630": [
        "FRONT ROYAL",
        "VA"
    ],
    "22637": [
        "GORE",
        "VA"
    ],
    "22639": [
        "HUME",
        "VA"
    ],
    "22640": [
        "HUNTLY",
        "VA"
    ],
    "22641": [
        "STRASBURG",
        "VA"
    ],
    "22642": [
        "LINDEN",
        "VA"
    ],
    "22643": [
        "MARKHAM",
        "VA"
    ],
    "22644": [
        "MAURERTOWN",
        "VA"
    ],
    "22645": [
        "MIDDLETOWN",
        "VA"
    ],
    "22646": [
        "MILLWOOD",
        "VA"
    ],
    "22649": [
        "MIDDLETOWN",
        "VA"
    ],
    "22650": [
        "RILEYVILLE",
        "VA"
    ],
    "22652": [
        "FORT VALLEY",
        "VA"
    ],
    "22654": [
        "STAR TANNERY",
        "VA"
    ],
    "22655": [
        "STEPHENS CITY",
        "VA"
    ],
    "22656": [
        "STEPHENSON",
        "VA"
    ],
    "22657": [
        "STRASBURG",
        "VA"
    ],
    "22660": [
        "TOMS BROOK",
        "VA"
    ],
    "22663": [
        "WHITE POST",
        "VA"
    ],
    "22664": [
        "WOODSTOCK",
        "VA"
    ],
    "22701": [
        "CULPEPER",
        "VA"
    ],
    "22709": [
        "ARODA",
        "VA"
    ],
    "22712": [
        "BEALETON",
        "VA"
    ],
    "22713": [
        "BOSTON",
        "VA"
    ],
    "22714": [
        "BRANDY STATION",
        "VA"
    ],
    "22715": [
        "BRIGHTWOOD",
        "VA"
    ],
    "22716": [
        "CASTLETON",
        "VA"
    ],
    "22718": [
        "ELKWOOD",
        "VA"
    ],
    "22719": [
        "ETLAN",
        "VA"
    ],
    "22720": [
        "GOLDVEIN",
        "VA"
    ],
    "22722": [
        "HAYWOOD",
        "VA"
    ],
    "22723": [
        "HOOD",
        "VA"
    ],
    "22724": [
        "JEFFERSONTON",
        "VA"
    ],
    "22725": [
        "LEON",
        "VA"
    ],
    "22726": [
        "LIGNUM",
        "VA"
    ],
    "22727": [
        "MADISON",
        "VA"
    ],
    "22728": [
        "MIDLAND",
        "VA"
    ],
    "22729": [
        "MITCHELLS",
        "VA"
    ],
    "22730": [
        "OAKPARK",
        "VA"
    ],
    "22731": [
        "PRATTS",
        "VA"
    ],
    "22732": [
        "RADIANT",
        "VA"
    ],
    "22733": [
        "RAPIDAN",
        "VA"
    ],
    "22734": [
        "REMINGTON",
        "VA"
    ],
    "22735": [
        "REVA",
        "VA"
    ],
    "22736": [
        "RICHARDSVILLE",
        "VA"
    ],
    "22737": [
        "RIXEYVILLE",
        "VA"
    ],
    "22738": [
        "ROCHELLE",
        "VA"
    ],
    "22740": [
        "SPERRYVILLE",
        "VA"
    ],
    "22741": [
        "STEVENSBURG",
        "VA"
    ],
    "22742": [
        "SUMERDUCK",
        "VA"
    ],
    "22743": [
        "SYRIA",
        "VA"
    ],
    "22746": [
        "VIEWTOWN",
        "VA"
    ],
    "22747": [
        "WASHINGTON",
        "VA"
    ],
    "22748": [
        "WOLFTOWN",
        "VA"
    ],
    "22749": [
        "WOODVILLE",
        "VA"
    ],
    "22801": [
        "HARRISONBURG",
        "VA"
    ],
    "22802": [
        "HARRISONBURG",
        "VA"
    ],
    "22803": [
        "HARRISONBURG",
        "VA"
    ],
    "22807": [
        "HARRISONBURG",
        "VA"
    ],
    "22810": [
        "BASYE",
        "VA"
    ],
    "22811": [
        "BERGTON",
        "VA"
    ],
    "22812": [
        "BRIDGEWATER",
        "VA"
    ],
    "22815": [
        "BROADWAY",
        "VA"
    ],
    "22820": [
        "CRIDERS",
        "VA"
    ],
    "22821": [
        "DAYTON",
        "VA"
    ],
    "22824": [
        "EDINBURG",
        "VA"
    ],
    "22827": [
        "ELKTON",
        "VA"
    ],
    "22830": [
        "FULKS RUN",
        "VA"
    ],
    "22831": [
        "HINTON",
        "VA"
    ],
    "22832": [
        "KEEZLETOWN",
        "VA"
    ],
    "22833": [
        "LACEY SPRING",
        "VA"
    ],
    "22834": [
        "LINVILLE",
        "VA"
    ],
    "22835": [
        "LURAY",
        "VA"
    ],
    "22840": [
        "MC GAHEYSVILLE",
        "VA"
    ],
    "22841": [
        "MOUNT CRAWFORD",
        "VA"
    ],
    "22842": [
        "MOUNT JACKSON",
        "VA"
    ],
    "22843": [
        "MOUNT SOLON",
        "VA"
    ],
    "22844": [
        "NEW MARKET",
        "VA"
    ],
    "22845": [
        "ORKNEY SPRINGS",
        "VA"
    ],
    "22846": [
        "PENN LAIRD",
        "VA"
    ],
    "22847": [
        "QUICKSBURG",
        "VA"
    ],
    "22849": [
        "SHENANDOAH",
        "VA"
    ],
    "22850": [
        "SINGERS GLEN",
        "VA"
    ],
    "22851": [
        "STANLEY",
        "VA"
    ],
    "22853": [
        "TIMBERVILLE",
        "VA"
    ],
    "22901": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22902": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22903": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22904": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22905": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22906": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22908": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22909": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22911": [
        "CHARLOTTESVILLE",
        "VA"
    ],
    "22920": [
        "AFTON",
        "VA"
    ],
    "22922": [
        "ARRINGTON",
        "VA"
    ],
    "22923": [
        "BARBOURSVILLE",
        "VA"
    ],
    "22924": [
        "BATESVILLE",
        "VA"
    ],
    "22931": [
        "COVESVILLE",
        "VA"
    ],
    "22932": [
        "CROZET",
        "VA"
    ],
    "22935": [
        "DYKE",
        "VA"
    ],
    "22936": [
        "EARLYSVILLE",
        "VA"
    ],
    "22937": [
        "ESMONT",
        "VA"
    ],
    "22938": [
        "FABER",
        "VA"
    ],
    "22939": [
        "FISHERSVILLE",
        "VA"
    ],
    "22940": [
        "FREE UNION",
        "VA"
    ],
    "22942": [
        "GORDONSVILLE",
        "VA"
    ],
    "22943": [
        "GREENWOOD",
        "VA"
    ],
    "22945": [
        "IVY",
        "VA"
    ],
    "22946": [
        "KEENE",
        "VA"
    ],
    "22947": [
        "KESWICK",
        "VA"
    ],
    "22948": [
        "LOCUST DALE",
        "VA"
    ],
    "22949": [
        "LOVINGSTON",
        "VA"
    ],
    "22952": [
        "LYNDHURST",
        "VA"
    ],
    "22957": [
        "MONTPELIER STATION",
        "VA"
    ],
    "22958": [
        "NELLYSFORD",
        "VA"
    ],
    "22959": [
        "NORTH GARDEN",
        "VA"
    ],
    "22960": [
        "ORANGE",
        "VA"
    ],
    "22963": [
        "PALMYRA",
        "VA"
    ],
    "22964": [
        "PINEY RIVER",
        "VA"
    ],
    "22965": [
        "QUINQUE",
        "VA"
    ],
    "22967": [
        "ROSELAND",
        "VA"
    ],
    "22968": [
        "RUCKERSVILLE",
        "VA"
    ],
    "22969": [
        "SCHUYLER",
        "VA"
    ],
    "22971": [
        "SHIPMAN",
        "VA"
    ],
    "22972": [
        "SOMERSET",
        "VA"
    ],
    "22973": [
        "STANARDSVILLE",
        "VA"
    ],
    "22974": [
        "TROY",
        "VA"
    ],
    "22976": [
        "TYRO",
        "VA"
    ],
    "22980": [
        "WAYNESBORO",
        "VA"
    ],
    "22987": [
        "WHITE HALL",
        "VA"
    ],
    "22989": [
        "WOODBERRY FOREST",
        "VA"
    ],
    "23001": [
        "ACHILLES",
        "VA"
    ],
    "23002": [
        "AMELIA COURT HOUSE",
        "VA"
    ],
    "23003": [
        "ARK",
        "VA"
    ],
    "23004": [
        "ARVONIA",
        "VA"
    ],
    "23005": [
        "ASHLAND",
        "VA"
    ],
    "23009": [
        "AYLETT",
        "VA"
    ],
    "23011": [
        "BARHAMSVILLE",
        "VA"
    ],
    "23015": [
        "BEAVERDAM",
        "VA"
    ],
    "23018": [
        "BENA",
        "VA"
    ],
    "23021": [
        "BOHANNON",
        "VA"
    ],
    "23022": [
        "BREMO BLUFF",
        "VA"
    ],
    "23023": [
        "BRUINGTON",
        "VA"
    ],
    "23024": [
        "BUMPASS",
        "VA"
    ],
    "23025": [
        "CARDINAL",
        "VA"
    ],
    "23027": [
        "CARTERSVILLE",
        "VA"
    ],
    "23030": [
        "CHARLES CITY",
        "VA"
    ],
    "23031": [
        "CHRISTCHURCH",
        "VA"
    ],
    "23032": [
        "CHURCH VIEW",
        "VA"
    ],
    "23035": [
        "COBBS CREEK",
        "VA"
    ],
    "23038": [
        "COLUMBIA",
        "VA"
    ],
    "23039": [
        "CROZIER",
        "VA"
    ],
    "23040": [
        "CUMBERLAND",
        "VA"
    ],
    "23043": [
        "DELTAVILLE",
        "VA"
    ],
    "23045": [
        "DIGGS",
        "VA"
    ],
    "23047": [
        "DOSWELL",
        "VA"
    ],
    "23050": [
        "DUTTON",
        "VA"
    ],
    "23055": [
        "FORK UNION",
        "VA"
    ],
    "23056": [
        "FOSTER",
        "VA"
    ],
    "23058": [
        "GLEN ALLEN",
        "VA"
    ],
    "23059": [
        "GLEN ALLEN",
        "VA"
    ],
    "23060": [
        "GLEN ALLEN",
        "VA"
    ],
    "23061": [
        "GLOUCESTER",
        "VA"
    ],
    "23062": [
        "GLOUCESTER POINT",
        "VA"
    ],
    "23063": [
        "GOOCHLAND",
        "VA"
    ],
    "23064": [
        "GRIMSTEAD",
        "VA"
    ],
    "23065": [
        "GUM SPRING",
        "VA"
    ],
    "23066": [
        "GWYNN",
        "VA"
    ],
    "23067": [
        "HADENSVILLE",
        "VA"
    ],
    "23069": [
        "HANOVER",
        "VA"
    ],
    "23070": [
        "HARDYVILLE",
        "VA"
    ],
    "23071": [
        "HARTFIELD",
        "VA"
    ],
    "23072": [
        "HAYES",
        "VA"
    ],
    "23075": [
        "HENRICO",
        "VA"
    ],
    "23076": [
        "HUDGINS",
        "VA"
    ],
    "23079": [
        "JAMAICA",
        "VA"
    ],
    "23081": [
        "JAMESTOWN",
        "VA"
    ],
    "23083": [
        "JETERSVILLE",
        "VA"
    ],
    "23084": [
        "KENTS STORE",
        "VA"
    ],
    "23085": [
        "KING AND QUEEN COURT HOUSE",
        "VA"
    ],
    "23086": [
        "KING WILLIAM",
        "VA"
    ],
    "23089": [
        "LANEXA",
        "VA"
    ],
    "23090": [
        "LIGHTFOOT",
        "VA"
    ],
    "23091": [
        "LITTLE PLYMOUTH",
        "VA"
    ],
    "23092": [
        "LOCUST HILL",
        "VA"
    ],
    "23093": [
        "LOUISA",
        "VA"
    ],
    "23102": [
        "MAIDENS",
        "VA"
    ],
    "23103": [
        "MANAKIN SABOT",
        "VA"
    ],
    "23105": [
        "MANNBORO",
        "VA"
    ],
    "23106": [
        "MANQUIN",
        "VA"
    ],
    "23108": [
        "MASCOT",
        "VA"
    ],
    "23109": [
        "MATHEWS",
        "VA"
    ],
    "23110": [
        "MATTAPONI",
        "VA"
    ],
    "23111": [
        "MECHANICSVILLE",
        "VA"
    ],
    "23112": [
        "MIDLOTHIAN",
        "VA"
    ],
    "23113": [
        "MIDLOTHIAN",
        "VA"
    ],
    "23114": [
        "MIDLOTHIAN",
        "VA"
    ],
    "23115": [
        "MILLERS TAVERN",
        "VA"
    ],
    "23116": [
        "MECHANICSVILLE",
        "VA"
    ],
    "23117": [
        "MINERAL",
        "VA"
    ],
    "23119": [
        "MOON",
        "VA"
    ],
    "23120": [
        "MOSELEY",
        "VA"
    ],
    "23123": [
        "NEW CANTON",
        "VA"
    ],
    "23124": [
        "NEW KENT",
        "VA"
    ],
    "23125": [
        "NEW POINT",
        "VA"
    ],
    "23126": [
        "NEWTOWN",
        "VA"
    ],
    "23127": [
        "NORGE",
        "VA"
    ],
    "23128": [
        "NORTH",
        "VA"
    ],
    "23129": [
        "OILVILLE",
        "VA"
    ],
    "23130": [
        "ONEMO",
        "VA"
    ],
    "23131": [
        "ORDINARY",
        "VA"
    ],
    "23138": [
        "PORT HAYWOOD",
        "VA"
    ],
    "23139": [
        "POWHATAN",
        "VA"
    ],
    "23140": [
        "PROVIDENCE FORGE",
        "VA"
    ],
    "23141": [
        "QUINTON",
        "VA"
    ],
    "23146": [
        "ROCKVILLE",
        "VA"
    ],
    "23148": [
        "SAINT STEPHENS CHURCH",
        "VA"
    ],
    "23149": [
        "SALUDA",
        "VA"
    ],
    "23150": [
        "SANDSTON",
        "VA"
    ],
    "23153": [
        "SANDY HOOK",
        "VA"
    ],
    "23154": [
        "SCHLEY",
        "VA"
    ],
    "23156": [
        "SHACKLEFORDS",
        "VA"
    ],
    "23160": [
        "STATE FARM",
        "VA"
    ],
    "23161": [
        "STEVENSVILLE",
        "VA"
    ],
    "23162": [
        "STUDLEY",
        "VA"
    ],
    "23163": [
        "SUSAN",
        "VA"
    ],
    "23168": [
        "TOANO",
        "VA"
    ],
    "23169": [
        "TOPPING",
        "VA"
    ],
    "23170": [
        "TREVILIANS",
        "VA"
    ],
    "23173": [
        "RICHMOND",
        "VA"
    ],
    "23175": [
        "URBANNA",
        "VA"
    ],
    "23176": [
        "WAKE",
        "VA"
    ],
    "23177": [
        "WALKERTON",
        "VA"
    ],
    "23178": [
        "WARE NECK",
        "VA"
    ],
    "23180": [
        "WATER VIEW",
        "VA"
    ],
    "23181": [
        "WEST POINT",
        "VA"
    ],
    "23183": [
        "WHITE MARSH",
        "VA"
    ],
    "23184": [
        "WICOMICO",
        "VA"
    ],
    "23185": [
        "WILLIAMSBURG",
        "VA"
    ],
    "23186": [
        "WILLIAMSBURG",
        "VA"
    ],
    "23187": [
        "WILLIAMSBURG",
        "VA"
    ],
    "23188": [
        "WILLIAMSBURG",
        "VA"
    ],
    "23190": [
        "WOODS CROSS ROADS",
        "VA"
    ],
    "23192": [
        "MONTPELIER",
        "VA"
    ],
    "23218": [
        "RICHMOND",
        "VA"
    ],
    "23219": [
        "RICHMOND",
        "VA"
    ],
    "23220": [
        "RICHMOND",
        "VA"
    ],
    "23221": [
        "RICHMOND",
        "VA"
    ],
    "23222": [
        "RICHMOND",
        "VA"
    ],
    "23223": [
        "RICHMOND",
        "VA"
    ],
    "23224": [
        "RICHMOND",
        "VA"
    ],
    "23225": [
        "RICHMOND",
        "VA"
    ],
    "23226": [
        "RICHMOND",
        "VA"
    ],
    "23227": [
        "RICHMOND",
        "VA"
    ],
    "23228": [
        "HENRICO",
        "VA"
    ],
    "23229": [
        "HENRICO",
        "VA"
    ],
    "23230": [
        "RICHMOND",
        "VA"
    ],
    "23231": [
        "HENRICO",
        "VA"
    ],
    "23232": [
        "RICHMOND",
        "VA"
    ],
    "23233": [
        "HENRICO",
        "VA"
    ],
    "23234": [
        "RICHMOND",
        "VA"
    ],
    "23235": [
        "RICHMOND",
        "VA"
    ],
    "23236": [
        "RICHMOND",
        "VA"
    ],
    "23237": [
        "RICHMOND",
        "VA"
    ],
    "23238": [
        "HENRICO",
        "VA"
    ],
    "23241": [
        "RICHMOND",
        "VA"
    ],
    "23242": [
        "HENRICO",
        "VA"
    ],
    "23249": [
        "RICHMOND",
        "VA"
    ],
    "23250": [
        "RICHMOND",
        "VA"
    ],
    "23255": [
        "HENRICO",
        "VA"
    ],
    "23260": [
        "RICHMOND",
        "VA"
    ],
    "23261": [
        "RICHMOND",
        "VA"
    ],
    "23273": [
        "HENRICO",
        "VA"
    ],
    "23284": [
        "RICHMOND",
        "VA"
    ],
    "23285": [
        "RICHMOND",
        "VA"
    ],
    "23288": [
        "HENRICO",
        "VA"
    ],
    "23291": [
        "RICHMOND",
        "VA"
    ],
    "23294": [
        "HENRICO",
        "VA"
    ],
    "23297": [
        "RICHMOND",
        "VA"
    ],
    "23298": [
        "RICHMOND",
        "VA"
    ],
    "23301": [
        "ACCOMAC",
        "VA"
    ],
    "23302": [
        "ASSAWOMAN",
        "VA"
    ],
    "23303": [
        "ATLANTIC",
        "VA"
    ],
    "23304": [
        "BATTERY PARK",
        "VA"
    ],
    "23306": [
        "BELLE HAVEN",
        "VA"
    ],
    "23307": [
        "BIRDSNEST",
        "VA"
    ],
    "23308": [
        "BLOXOM",
        "VA"
    ],
    "23310": [
        "CAPE CHARLES",
        "VA"
    ],
    "23313": [
        "CAPEVILLE",
        "VA"
    ],
    "23314": [
        "CARROLLTON",
        "VA"
    ],
    "23315": [
        "CARRSVILLE",
        "VA"
    ],
    "23316": [
        "CHERITON",
        "VA"
    ],
    "23320": [
        "CHESAPEAKE",
        "VA"
    ],
    "23321": [
        "CHESAPEAKE",
        "VA"
    ],
    "23322": [
        "CHESAPEAKE",
        "VA"
    ],
    "23323": [
        "CHESAPEAKE",
        "VA"
    ],
    "23324": [
        "CHESAPEAKE",
        "VA"
    ],
    "23325": [
        "CHESAPEAKE",
        "VA"
    ],
    "23326": [
        "CHESAPEAKE",
        "VA"
    ],
    "23327": [
        "CHESAPEAKE",
        "VA"
    ],
    "23328": [
        "CHESAPEAKE",
        "VA"
    ],
    "23336": [
        "CHINCOTEAGUE ISLAND",
        "VA"
    ],
    "23337": [
        "WALLOPS ISLAND",
        "VA"
    ],
    "23341": [
        "CRADDOCKVILLE",
        "VA"
    ],
    "23347": [
        "EASTVILLE",
        "VA"
    ],
    "23350": [
        "EXMORE",
        "VA"
    ],
    "23354": [
        "FRANKTOWN",
        "VA"
    ],
    "23356": [
        "GREENBACKVILLE",
        "VA"
    ],
    "23357": [
        "GREENBUSH",
        "VA"
    ],
    "23358": [
        "HACKSNECK",
        "VA"
    ],
    "23359": [
        "HALLWOOD",
        "VA"
    ],
    "23389": [
        "HARBORTON",
        "VA"
    ],
    "23395": [
        "HORNTOWN",
        "VA"
    ],
    "23397": [
        "ISLE OF WIGHT",
        "VA"
    ],
    "23398": [
        "JAMESVILLE",
        "VA"
    ],
    "23401": [
        "KELLER",
        "VA"
    ],
    "23404": [
        "LOCUSTVILLE",
        "VA"
    ],
    "23405": [
        "MACHIPONGO",
        "VA"
    ],
    "23407": [
        "MAPPSVILLE",
        "VA"
    ],
    "23408": [
        "MARIONVILLE",
        "VA"
    ],
    "23409": [
        "MEARS",
        "VA"
    ],
    "23410": [
        "MELFA",
        "VA"
    ],
    "23413": [
        "NASSAWADOX",
        "VA"
    ],
    "23414": [
        "NELSONIA",
        "VA"
    ],
    "23415": [
        "NEW CHURCH",
        "VA"
    ],
    "23416": [
        "OAK HALL",
        "VA"
    ],
    "23417": [
        "ONANCOCK",
        "VA"
    ],
    "23418": [
        "ONLEY",
        "VA"
    ],
    "23419": [
        "OYSTER",
        "VA"
    ],
    "23420": [
        "PAINTER",
        "VA"
    ],
    "23421": [
        "PARKSLEY",
        "VA"
    ],
    "23422": [
        "PUNGOTEAGUE",
        "VA"
    ],
    "23423": [
        "QUINBY",
        "VA"
    ],
    "23424": [
        "RESCUE",
        "VA"
    ],
    "23426": [
        "SANFORD",
        "VA"
    ],
    "23427": [
        "SAXIS",
        "VA"
    ],
    "23430": [
        "SMITHFIELD",
        "VA"
    ],
    "23431": [
        "SMITHFIELD",
        "VA"
    ],
    "23432": [
        "SUFFOLK",
        "VA"
    ],
    "23433": [
        "SUFFOLK",
        "VA"
    ],
    "23434": [
        "SUFFOLK",
        "VA"
    ],
    "23435": [
        "SUFFOLK",
        "VA"
    ],
    "23436": [
        "SUFFOLK",
        "VA"
    ],
    "23437": [
        "SUFFOLK",
        "VA"
    ],
    "23438": [
        "SUFFOLK",
        "VA"
    ],
    "23439": [
        "SUFFOLK",
        "VA"
    ],
    "23440": [
        "TANGIER",
        "VA"
    ],
    "23441": [
        "TASLEY",
        "VA"
    ],
    "23442": [
        "TEMPERANCEVILLE",
        "VA"
    ],
    "23443": [
        "TOWNSEND",
        "VA"
    ],
    "23450": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23451": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23452": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23453": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23454": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23455": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23456": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23457": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23458": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23459": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23460": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23461": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23462": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23463": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23464": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23465": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23466": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23467": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23471": [
        "VIRGINIA BEACH",
        "VA"
    ],
    "23480": [
        "WACHAPREAGUE",
        "VA"
    ],
    "23482": [
        "WARDTOWN",
        "VA"
    ],
    "23483": [
        "WATTSVILLE",
        "VA"
    ],
    "23486": [
        "WILLIS WHARF",
        "VA"
    ],
    "23487": [
        "WINDSOR",
        "VA"
    ],
    "23501": [
        "NORFOLK",
        "VA"
    ],
    "23502": [
        "NORFOLK",
        "VA"
    ],
    "23503": [
        "NORFOLK",
        "VA"
    ],
    "23504": [
        "NORFOLK",
        "VA"
    ],
    "23505": [
        "NORFOLK",
        "VA"
    ],
    "23506": [
        "NORFOLK",
        "VA"
    ],
    "23507": [
        "NORFOLK",
        "VA"
    ],
    "23508": [
        "NORFOLK",
        "VA"
    ],
    "23509": [
        "NORFOLK",
        "VA"
    ],
    "23510": [
        "NORFOLK",
        "VA"
    ],
    "23511": [
        "NORFOLK",
        "VA"
    ],
    "23513": [
        "NORFOLK",
        "VA"
    ],
    "23514": [
        "NORFOLK",
        "VA"
    ],
    "23515": [
        "NORFOLK",
        "VA"
    ],
    "23517": [
        "NORFOLK",
        "VA"
    ],
    "23518": [
        "NORFOLK",
        "VA"
    ],
    "23520": [
        "NORFOLK",
        "VA"
    ],
    "23521": [
        "NORFOLK",
        "VA"
    ],
    "23523": [
        "NORFOLK",
        "VA"
    ],
    "23529": [
        "NORFOLK",
        "VA"
    ],
    "23541": [
        "NORFOLK",
        "VA"
    ],
    "23551": [
        "NORFOLK",
        "VA"
    ],
    "23601": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23602": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23603": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23604": [
        "FORT EUSTIS",
        "VA"
    ],
    "23605": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23606": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23607": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23608": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23609": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23612": [
        "NEWPORT NEWS",
        "VA"
    ],
    "23630": [
        "HAMPTON",
        "VA"
    ],
    "23651": [
        "FORT MONROE",
        "VA"
    ],
    "23661": [
        "HAMPTON",
        "VA"
    ],
    "23662": [
        "POQUOSON",
        "VA"
    ],
    "23663": [
        "HAMPTON",
        "VA"
    ],
    "23664": [
        "HAMPTON",
        "VA"
    ],
    "23665": [
        "HAMPTON",
        "VA"
    ],
    "23666": [
        "HAMPTON",
        "VA"
    ],
    "23667": [
        "HAMPTON",
        "VA"
    ],
    "23668": [
        "HAMPTON",
        "VA"
    ],
    "23669": [
        "HAMPTON",
        "VA"
    ],
    "23670": [
        "HAMPTON",
        "VA"
    ],
    "23681": [
        "HAMPTON",
        "VA"
    ],
    "23690": [
        "YORKTOWN",
        "VA"
    ],
    "23691": [
        "YORKTOWN",
        "VA"
    ],
    "23692": [
        "YORKTOWN",
        "VA"
    ],
    "23693": [
        "YORKTOWN",
        "VA"
    ],
    "23694": [
        "LACKEY",
        "VA"
    ],
    "23696": [
        "SEAFORD",
        "VA"
    ],
    "23701": [
        "PORTSMOUTH",
        "VA"
    ],
    "23702": [
        "PORTSMOUTH",
        "VA"
    ],
    "23703": [
        "PORTSMOUTH",
        "VA"
    ],
    "23704": [
        "PORTSMOUTH",
        "VA"
    ],
    "23705": [
        "PORTSMOUTH",
        "VA"
    ],
    "23707": [
        "PORTSMOUTH",
        "VA"
    ],
    "23708": [
        "PORTSMOUTH",
        "VA"
    ],
    "23709": [
        "PORTSMOUTH",
        "VA"
    ],
    "23801": [
        "FORT LEE",
        "VA"
    ],
    "23803": [
        "PETERSBURG",
        "VA"
    ],
    "23804": [
        "PETERSBURG",
        "VA"
    ],
    "23805": [
        "PETERSBURG",
        "VA"
    ],
    "23806": [
        "VIRGINIA STATE UNIVERSITY",
        "VA"
    ],
    "23821": [
        "ALBERTA",
        "VA"
    ],
    "23824": [
        "BLACKSTONE",
        "VA"
    ],
    "23827": [
        "BOYKINS",
        "VA"
    ],
    "23828": [
        "BRANCHVILLE",
        "VA"
    ],
    "23829": [
        "CAPRON",
        "VA"
    ],
    "23830": [
        "CARSON",
        "VA"
    ],
    "23831": [
        "CHESTER",
        "VA"
    ],
    "23832": [
        "CHESTERFIELD",
        "VA"
    ],
    "23833": [
        "CHURCH ROAD",
        "VA"
    ],
    "23834": [
        "COLONIAL HEIGHTS",
        "VA"
    ],
    "23836": [
        "CHESTER",
        "VA"
    ],
    "23837": [
        "COURTLAND",
        "VA"
    ],
    "23838": [
        "CHESTERFIELD",
        "VA"
    ],
    "23839": [
        "DENDRON",
        "VA"
    ],
    "23840": [
        "DEWITT",
        "VA"
    ],
    "23841": [
        "DINWIDDIE",
        "VA"
    ],
    "23842": [
        "DISPUTANTA",
        "VA"
    ],
    "23843": [
        "DOLPHIN",
        "VA"
    ],
    "23844": [
        "DREWRYVILLE",
        "VA"
    ],
    "23845": [
        "EBONY",
        "VA"
    ],
    "23846": [
        "ELBERON",
        "VA"
    ],
    "23847": [
        "EMPORIA",
        "VA"
    ],
    "23850": [
        "FORD",
        "VA"
    ],
    "23851": [
        "FRANKLIN",
        "VA"
    ],
    "23856": [
        "FREEMAN",
        "VA"
    ],
    "23857": [
        "GASBURG",
        "VA"
    ],
    "23860": [
        "HOPEWELL",
        "VA"
    ],
    "23866": [
        "IVOR",
        "VA"
    ],
    "23867": [
        "JARRATT",
        "VA"
    ],
    "23868": [
        "LAWRENCEVILLE",
        "VA"
    ],
    "23870": [
        "JARRATT",
        "VA"
    ],
    "23872": [
        "MC KENNEY",
        "VA"
    ],
    "23874": [
        "NEWSOMS",
        "VA"
    ],
    "23875": [
        "PRINCE GEORGE",
        "VA"
    ],
    "23876": [
        "RAWLINGS",
        "VA"
    ],
    "23878": [
        "SEDLEY",
        "VA"
    ],
    "23879": [
        "SKIPPERS",
        "VA"
    ],
    "23881": [
        "SPRING GROVE",
        "VA"
    ],
    "23882": [
        "STONY CREEK",
        "VA"
    ],
    "23883": [
        "SURRY",
        "VA"
    ],
    "23884": [
        "SUSSEX",
        "VA"
    ],
    "23885": [
        "SUTHERLAND",
        "VA"
    ],
    "23887": [
        "VALENTINES",
        "VA"
    ],
    "23888": [
        "WAKEFIELD",
        "VA"
    ],
    "23889": [
        "WARFIELD",
        "VA"
    ],
    "23890": [
        "WAVERLY",
        "VA"
    ],
    "23891": [
        "WAVERLY",
        "VA"
    ],
    "23893": [
        "WHITE PLAINS",
        "VA"
    ],
    "23894": [
        "WILSONS",
        "VA"
    ],
    "23897": [
        "YALE",
        "VA"
    ],
    "23898": [
        "ZUNI",
        "VA"
    ],
    "23899": [
        "CLAREMONT",
        "VA"
    ],
    "23901": [
        "FARMVILLE",
        "VA"
    ],
    "23909": [
        "FARMVILLE",
        "VA"
    ],
    "23915": [
        "BASKERVILLE",
        "VA"
    ],
    "23917": [
        "BOYDTON",
        "VA"
    ],
    "23919": [
        "BRACEY",
        "VA"
    ],
    "23920": [
        "BRODNAX",
        "VA"
    ],
    "23921": [
        "BUCKINGHAM",
        "VA"
    ],
    "23922": [
        "BURKEVILLE",
        "VA"
    ],
    "23923": [
        "CHARLOTTE COURT HOUSE",
        "VA"
    ],
    "23924": [
        "CHASE CITY",
        "VA"
    ],
    "23927": [
        "CLARKSVILLE",
        "VA"
    ],
    "23930": [
        "CREWE",
        "VA"
    ],
    "23934": [
        "CULLEN",
        "VA"
    ],
    "23936": [
        "DILLWYN",
        "VA"
    ],
    "23937": [
        "DRAKES BRANCH",
        "VA"
    ],
    "23938": [
        "DUNDAS",
        "VA"
    ],
    "23939": [
        "EVERGREEN",
        "VA"
    ],
    "23942": [
        "GREEN BAY",
        "VA"
    ],
    "23943": [
        "HAMPDEN SYDNEY",
        "VA"
    ],
    "23944": [
        "KENBRIDGE",
        "VA"
    ],
    "23947": [
        "KEYSVILLE",
        "VA"
    ],
    "23950": [
        "LA CROSSE",
        "VA"
    ],
    "23952": [
        "LUNENBURG",
        "VA"
    ],
    "23954": [
        "MEHERRIN",
        "VA"
    ],
    "23955": [
        "NOTTOWAY",
        "VA"
    ],
    "23958": [
        "PAMPLIN",
        "VA"
    ],
    "23959": [
        "PHENIX",
        "VA"
    ],
    "23960": [
        "PROSPECT",
        "VA"
    ],
    "23962": [
        "RANDOLPH",
        "VA"
    ],
    "23963": [
        "RED HOUSE",
        "VA"
    ],
    "23964": [
        "RED OAK",
        "VA"
    ],
    "23966": [
        "RICE",
        "VA"
    ],
    "23967": [
        "SAXE",
        "VA"
    ],
    "23968": [
        "SKIPWITH",
        "VA"
    ],
    "23970": [
        "SOUTH HILL",
        "VA"
    ],
    "23974": [
        "VICTORIA",
        "VA"
    ],
    "23976": [
        "WYLLIESBURG",
        "VA"
    ],
    "24001": [
        "ROANOKE",
        "VA"
    ],
    "24002": [
        "ROANOKE",
        "VA"
    ],
    "24006": [
        "ROANOKE",
        "VA"
    ],
    "24007": [
        "ROANOKE",
        "VA"
    ],
    "24008": [
        "ROANOKE",
        "VA"
    ],
    "24010": [
        "ROANOKE",
        "VA"
    ],
    "24011": [
        "ROANOKE",
        "VA"
    ],
    "24012": [
        "ROANOKE",
        "VA"
    ],
    "24013": [
        "ROANOKE",
        "VA"
    ],
    "24014": [
        "ROANOKE",
        "VA"
    ],
    "24015": [
        "ROANOKE",
        "VA"
    ],
    "24016": [
        "ROANOKE",
        "VA"
    ],
    "24017": [
        "ROANOKE",
        "VA"
    ],
    "24018": [
        "ROANOKE",
        "VA"
    ],
    "24019": [
        "ROANOKE",
        "VA"
    ],
    "24020": [
        "ROANOKE",
        "VA"
    ],
    "24022": [
        "ROANOKE",
        "VA"
    ],
    "24023": [
        "ROANOKE",
        "VA"
    ],
    "24024": [
        "ROANOKE",
        "VA"
    ],
    "24025": [
        "ROANOKE",
        "VA"
    ],
    "24026": [
        "ROANOKE",
        "VA"
    ],
    "24027": [
        "ROANOKE",
        "VA"
    ],
    "24028": [
        "ROANOKE",
        "VA"
    ],
    "24033": [
        "ROANOKE",
        "VA"
    ],
    "24034": [
        "ROANOKE",
        "VA"
    ],
    "24035": [
        "ROANOKE",
        "VA"
    ],
    "24037": [
        "ROANOKE",
        "VA"
    ],
    "24038": [
        "ROANOKE",
        "VA"
    ],
    "24040": [
        "ROANOKE",
        "VA"
    ],
    "24043": [
        "ROANOKE",
        "VA"
    ],
    "24053": [
        "ARARAT",
        "VA"
    ],
    "24054": [
        "AXTON",
        "VA"
    ],
    "24055": [
        "BASSETT",
        "VA"
    ],
    "24058": [
        "BELSPRING",
        "VA"
    ],
    "24059": [
        "BENT MOUNTAIN",
        "VA"
    ],
    "24060": [
        "BLACKSBURG",
        "VA"
    ],
    "24061": [
        "BLACKSBURG",
        "VA"
    ],
    "24062": [
        "BLACKSBURG",
        "VA"
    ],
    "24063": [
        "BLACKSBURG",
        "VA"
    ],
    "24064": [
        "BLUE RIDGE",
        "VA"
    ],
    "24065": [
        "BOONES MILL",
        "VA"
    ],
    "24066": [
        "BUCHANAN",
        "VA"
    ],
    "24067": [
        "CALLAWAY",
        "VA"
    ],
    "24068": [
        "CHRISTIANSBURG",
        "VA"
    ],
    "24069": [
        "CASCADE",
        "VA"
    ],
    "24070": [
        "CATAWBA",
        "VA"
    ],
    "24072": [
        "CHECK",
        "VA"
    ],
    "24073": [
        "CHRISTIANSBURG",
        "VA"
    ],
    "24076": [
        "CLAUDVILLE",
        "VA"
    ],
    "24077": [
        "CLOVERDALE",
        "VA"
    ],
    "24078": [
        "COLLINSVILLE",
        "VA"
    ],
    "24079": [
        "COPPER HILL",
        "VA"
    ],
    "24082": [
        "CRITZ",
        "VA"
    ],
    "24083": [
        "DALEVILLE",
        "VA"
    ],
    "24084": [
        "DUBLIN",
        "VA"
    ],
    "24085": [
        "EAGLE ROCK",
        "VA"
    ],
    "24086": [
        "EGGLESTON",
        "VA"
    ],
    "24087": [
        "ELLISTON",
        "VA"
    ],
    "24088": [
        "FERRUM",
        "VA"
    ],
    "24089": [
        "FIELDALE",
        "VA"
    ],
    "24090": [
        "FINCASTLE",
        "VA"
    ],
    "24091": [
        "FLOYD",
        "VA"
    ],
    "24092": [
        "GLADE HILL",
        "VA"
    ],
    "24093": [
        "GLEN LYN",
        "VA"
    ],
    "24095": [
        "GOODVIEW",
        "VA"
    ],
    "24101": [
        "HARDY",
        "VA"
    ],
    "24102": [
        "HENRY",
        "VA"
    ],
    "24104": [
        "HUDDLESTON",
        "VA"
    ],
    "24105": [
        "INDIAN VALLEY",
        "VA"
    ],
    "24111": [
        "MC COY",
        "VA"
    ],
    "24112": [
        "MARTINSVILLE",
        "VA"
    ],
    "24113": [
        "MARTINSVILLE",
        "VA"
    ],
    "24114": [
        "MARTINSVILLE",
        "VA"
    ],
    "24115": [
        "MARTINSVILLE",
        "VA"
    ],
    "24120": [
        "MEADOWS OF DAN",
        "VA"
    ],
    "24121": [
        "MONETA",
        "VA"
    ],
    "24122": [
        "MONTVALE",
        "VA"
    ],
    "24124": [
        "NARROWS",
        "VA"
    ],
    "24126": [
        "NEWBERN",
        "VA"
    ],
    "24127": [
        "NEW CASTLE",
        "VA"
    ],
    "24128": [
        "NEWPORT",
        "VA"
    ],
    "24129": [
        "NEW RIVER",
        "VA"
    ],
    "24131": [
        "PAINT BANK",
        "VA"
    ],
    "24132": [
        "PARROTT",
        "VA"
    ],
    "24133": [
        "PATRICK SPRINGS",
        "VA"
    ],
    "24134": [
        "PEARISBURG",
        "VA"
    ],
    "24136": [
        "PEMBROKE",
        "VA"
    ],
    "24137": [
        "PENHOOK",
        "VA"
    ],
    "24138": [
        "PILOT",
        "VA"
    ],
    "24139": [
        "PITTSVILLE",
        "VA"
    ],
    "24141": [
        "RADFORD",
        "VA"
    ],
    "24142": [
        "RADFORD",
        "VA"
    ],
    "24143": [
        "RADFORD",
        "VA"
    ],
    "24147": [
        "RICH CREEK",
        "VA"
    ],
    "24148": [
        "RIDGEWAY",
        "VA"
    ],
    "24149": [
        "RINER",
        "VA"
    ],
    "24150": [
        "RIPPLEMEAD",
        "VA"
    ],
    "24151": [
        "ROCKY MOUNT",
        "VA"
    ],
    "24153": [
        "SALEM",
        "VA"
    ],
    "24155": [
        "ROANOKE",
        "VA"
    ],
    "24161": [
        "SANDY LEVEL",
        "VA"
    ],
    "24162": [
        "SHAWSVILLE",
        "VA"
    ],
    "24165": [
        "SPENCER",
        "VA"
    ],
    "24168": [
        "STANLEYTOWN",
        "VA"
    ],
    "24171": [
        "STUART",
        "VA"
    ],
    "24174": [
        "THAXTON",
        "VA"
    ],
    "24175": [
        "TROUTVILLE",
        "VA"
    ],
    "24176": [
        "UNION HALL",
        "VA"
    ],
    "24177": [
        "VESTA",
        "VA"
    ],
    "24179": [
        "VINTON",
        "VA"
    ],
    "24184": [
        "WIRTZ",
        "VA"
    ],
    "24185": [
        "WOOLWINE",
        "VA"
    ],
    "24201": [
        "BRISTOL",
        "VA"
    ],
    "24202": [
        "BRISTOL",
        "VA"
    ],
    "24203": [
        "BRISTOL",
        "VA"
    ],
    "24209": [
        "BRISTOL",
        "VA"
    ],
    "24210": [
        "ABINGDON",
        "VA"
    ],
    "24211": [
        "ABINGDON",
        "VA"
    ],
    "24212": [
        "ABINGDON",
        "VA"
    ],
    "24216": [
        "APPALACHIA",
        "VA"
    ],
    "24217": [
        "BEE",
        "VA"
    ],
    "24218": [
        "BEN HUR",
        "VA"
    ],
    "24219": [
        "BIG STONE GAP",
        "VA"
    ],
    "24220": [
        "BIRCHLEAF",
        "VA"
    ],
    "24221": [
        "BLACKWATER",
        "VA"
    ],
    "24224": [
        "CASTLEWOOD",
        "VA"
    ],
    "24225": [
        "CLEVELAND",
        "VA"
    ],
    "24226": [
        "CLINCHCO",
        "VA"
    ],
    "24228": [
        "CLINTWOOD",
        "VA"
    ],
    "24230": [
        "COEBURN",
        "VA"
    ],
    "24236": [
        "DAMASCUS",
        "VA"
    ],
    "24237": [
        "DANTE",
        "VA"
    ],
    "24239": [
        "DAVENPORT",
        "VA"
    ],
    "24243": [
        "DRYDEN",
        "VA"
    ],
    "24244": [
        "DUFFIELD",
        "VA"
    ],
    "24245": [
        "DUNGANNON",
        "VA"
    ],
    "24246": [
        "EAST STONE GAP",
        "VA"
    ],
    "24248": [
        "EWING",
        "VA"
    ],
    "24250": [
        "FORT BLACKMORE",
        "VA"
    ],
    "24251": [
        "GATE CITY",
        "VA"
    ],
    "24256": [
        "HAYSI",
        "VA"
    ],
    "24258": [
        "HILTONS",
        "VA"
    ],
    "24260": [
        "HONAKER",
        "VA"
    ],
    "24263": [
        "JONESVILLE",
        "VA"
    ],
    "24265": [
        "KEOKEE",
        "VA"
    ],
    "24266": [
        "LEBANON",
        "VA"
    ],
    "24269": [
        "MC CLURE",
        "VA"
    ],
    "24270": [
        "MENDOTA",
        "VA"
    ],
    "24271": [
        "NICKELSVILLE",
        "VA"
    ],
    "24272": [
        "NORA",
        "VA"
    ],
    "24273": [
        "NORTON",
        "VA"
    ],
    "24277": [
        "PENNINGTON GAP",
        "VA"
    ],
    "24279": [
        "POUND",
        "VA"
    ],
    "24280": [
        "ROSEDALE",
        "VA"
    ],
    "24281": [
        "ROSE HILL",
        "VA"
    ],
    "24282": [
        "SAINT CHARLES",
        "VA"
    ],
    "24283": [
        "SAINT PAUL",
        "VA"
    ],
    "24290": [
        "WEBER CITY",
        "VA"
    ],
    "24292": [
        "WHITETOP",
        "VA"
    ],
    "24293": [
        "WISE",
        "VA"
    ],
    "24301": [
        "PULASKI",
        "VA"
    ],
    "24311": [
        "ATKINS",
        "VA"
    ],
    "24312": [
        "AUSTINVILLE",
        "VA"
    ],
    "24313": [
        "BARREN SPRINGS",
        "VA"
    ],
    "24314": [
        "BASTIAN",
        "VA"
    ],
    "24315": [
        "BLAND",
        "VA"
    ],
    "24317": [
        "CANA",
        "VA"
    ],
    "24318": [
        "CERES",
        "VA"
    ],
    "24319": [
        "CHILHOWIE",
        "VA"
    ],
    "24323": [
        "CROCKETT",
        "VA"
    ],
    "24324": [
        "DRAPER",
        "VA"
    ],
    "24325": [
        "DUGSPUR",
        "VA"
    ],
    "24326": [
        "ELK CREEK",
        "VA"
    ],
    "24327": [
        "EMORY",
        "VA"
    ],
    "24328": [
        "FANCY GAP",
        "VA"
    ],
    "24330": [
        "FRIES",
        "VA"
    ],
    "24333": [
        "GALAX",
        "VA"
    ],
    "24340": [
        "GLADE SPRING",
        "VA"
    ],
    "24343": [
        "HILLSVILLE",
        "VA"
    ],
    "24347": [
        "HIWASSEE",
        "VA"
    ],
    "24348": [
        "INDEPENDENCE",
        "VA"
    ],
    "24350": [
        "IVANHOE",
        "VA"
    ],
    "24351": [
        "LAMBSBURG",
        "VA"
    ],
    "24352": [
        "LAUREL FORK",
        "VA"
    ],
    "24354": [
        "MARION",
        "VA"
    ],
    "24360": [
        "MAX MEADOWS",
        "VA"
    ],
    "24361": [
        "MEADOWVIEW",
        "VA"
    ],
    "24363": [
        "MOUTH OF WILSON",
        "VA"
    ],
    "24366": [
        "ROCKY GAP",
        "VA"
    ],
    "24368": [
        "RURAL RETREAT",
        "VA"
    ],
    "24370": [
        "SALTVILLE",
        "VA"
    ],
    "24374": [
        "SPEEDWELL",
        "VA"
    ],
    "24375": [
        "SUGAR GROVE",
        "VA"
    ],
    "24377": [
        "TANNERSVILLE",
        "VA"
    ],
    "24378": [
        "TROUTDALE",
        "VA"
    ],
    "24380": [
        "WILLIS",
        "VA"
    ],
    "24381": [
        "WOODLAWN",
        "VA"
    ],
    "24382": [
        "WYTHEVILLE",
        "VA"
    ],
    "24401": [
        "STAUNTON",
        "VA"
    ],
    "24402": [
        "STAUNTON",
        "VA"
    ],
    "24411": [
        "AUGUSTA SPRINGS",
        "VA"
    ],
    "24413": [
        "BLUE GRASS",
        "VA"
    ],
    "24415": [
        "BROWNSBURG",
        "VA"
    ],
    "24416": [
        "BUENA VISTA",
        "VA"
    ],
    "24421": [
        "CHURCHVILLE",
        "VA"
    ],
    "24422": [
        "CLIFTON FORGE",
        "VA"
    ],
    "24426": [
        "COVINGTON",
        "VA"
    ],
    "24430": [
        "CRAIGSVILLE",
        "VA"
    ],
    "24431": [
        "CRIMORA",
        "VA"
    ],
    "24432": [
        "DEERFIELD",
        "VA"
    ],
    "24433": [
        "DOE HILL",
        "VA"
    ],
    "24435": [
        "FAIRFIELD",
        "VA"
    ],
    "24437": [
        "FORT DEFIANCE",
        "VA"
    ],
    "24439": [
        "GOSHEN",
        "VA"
    ],
    "24440": [
        "GREENVILLE",
        "VA"
    ],
    "24441": [
        "GROTTOES",
        "VA"
    ],
    "24442": [
        "HEAD WATERS",
        "VA"
    ],
    "24445": [
        "HOT SPRINGS",
        "VA"
    ],
    "24448": [
        "IRON GATE",
        "VA"
    ],
    "24450": [
        "LEXINGTON",
        "VA"
    ],
    "24457": [
        "LOW MOOR",
        "VA"
    ],
    "24458": [
        "MC DOWELL",
        "VA"
    ],
    "24459": [
        "MIDDLEBROOK",
        "VA"
    ],
    "24460": [
        "MILLBORO",
        "VA"
    ],
    "24463": [
        "MINT SPRING",
        "VA"
    ],
    "24464": [
        "MONTEBELLO",
        "VA"
    ],
    "24465": [
        "MONTEREY",
        "VA"
    ],
    "24467": [
        "MOUNT SIDNEY",
        "VA"
    ],
    "24468": [
        "MUSTOE",
        "VA"
    ],
    "24469": [
        "NEW HOPE",
        "VA"
    ],
    "24471": [
        "PORT REPUBLIC",
        "VA"
    ],
    "24472": [
        "RAPHINE",
        "VA"
    ],
    "24473": [
        "ROCKBRIDGE BATHS",
        "VA"
    ],
    "24474": [
        "SELMA",
        "VA"
    ],
    "24476": [
        "STEELES TAVERN",
        "VA"
    ],
    "24477": [
        "STUARTS DRAFT",
        "VA"
    ],
    "24479": [
        "SWOOPE",
        "VA"
    ],
    "24482": [
        "VERONA",
        "VA"
    ],
    "24483": [
        "VESUVIUS",
        "VA"
    ],
    "24484": [
        "WARM SPRINGS",
        "VA"
    ],
    "24485": [
        "WEST AUGUSTA",
        "VA"
    ],
    "24486": [
        "WEYERS CAVE",
        "VA"
    ],
    "24487": [
        "WILLIAMSVILLE",
        "VA"
    ],
    "24501": [
        "LYNCHBURG",
        "VA"
    ],
    "24502": [
        "LYNCHBURG",
        "VA"
    ],
    "24503": [
        "LYNCHBURG",
        "VA"
    ],
    "24504": [
        "LYNCHBURG",
        "VA"
    ],
    "24505": [
        "LYNCHBURG",
        "VA"
    ],
    "24506": [
        "LYNCHBURG",
        "VA"
    ],
    "24514": [
        "LYNCHBURG",
        "VA"
    ],
    "24517": [
        "ALTAVISTA",
        "VA"
    ],
    "24520": [
        "ALTON",
        "VA"
    ],
    "24521": [
        "AMHERST",
        "VA"
    ],
    "24522": [
        "APPOMATTOX",
        "VA"
    ],
    "24523": [
        "BEDFORD",
        "VA"
    ],
    "24526": [
        "BIG ISLAND",
        "VA"
    ],
    "24527": [
        "BLAIRS",
        "VA"
    ],
    "24528": [
        "BROOKNEAL",
        "VA"
    ],
    "24529": [
        "BUFFALO JUNCTION",
        "VA"
    ],
    "24530": [
        "CALLANDS",
        "VA"
    ],
    "24531": [
        "CHATHAM",
        "VA"
    ],
    "24533": [
        "CLIFFORD",
        "VA"
    ],
    "24534": [
        "CLOVER",
        "VA"
    ],
    "24535": [
        "CLUSTER SPRINGS",
        "VA"
    ],
    "24536": [
        "COLEMAN FALLS",
        "VA"
    ],
    "24538": [
        "CONCORD",
        "VA"
    ],
    "24539": [
        "CRYSTAL HILL",
        "VA"
    ],
    "24540": [
        "DANVILLE",
        "VA"
    ],
    "24541": [
        "DANVILLE",
        "VA"
    ],
    "24543": [
        "DANVILLE",
        "VA"
    ],
    "24549": [
        "DRY FORK",
        "VA"
    ],
    "24550": [
        "EVINGTON",
        "VA"
    ],
    "24551": [
        "FOREST",
        "VA"
    ],
    "24553": [
        "GLADSTONE",
        "VA"
    ],
    "24554": [
        "GLADYS",
        "VA"
    ],
    "24555": [
        "GLASGOW",
        "VA"
    ],
    "24556": [
        "GOODE",
        "VA"
    ],
    "24557": [
        "GRETNA",
        "VA"
    ],
    "24558": [
        "HALIFAX",
        "VA"
    ],
    "24562": [
        "HOWARDSVILLE",
        "VA"
    ],
    "24563": [
        "HURT",
        "VA"
    ],
    "24565": [
        "JAVA",
        "VA"
    ],
    "24566": [
        "KEELING",
        "VA"
    ],
    "24569": [
        "LONG ISLAND",
        "VA"
    ],
    "24570": [
        "LOWRY",
        "VA"
    ],
    "24571": [
        "LYNCH STATION",
        "VA"
    ],
    "24572": [
        "MADISON HEIGHTS",
        "VA"
    ],
    "24574": [
        "MONROE",
        "VA"
    ],
    "24577": [
        "NATHALIE",
        "VA"
    ],
    "24578": [
        "NATURAL BRIDGE",
        "VA"
    ],
    "24579": [
        "NATURAL BRIDGE STATION",
        "VA"
    ],
    "24580": [
        "NELSON",
        "VA"
    ],
    "24581": [
        "NORWOOD",
        "VA"
    ],
    "24586": [
        "RINGGOLD",
        "VA"
    ],
    "24588": [
        "RUSTBURG",
        "VA"
    ],
    "24589": [
        "SCOTTSBURG",
        "VA"
    ],
    "24590": [
        "SCOTTSVILLE",
        "VA"
    ],
    "24592": [
        "SOUTH BOSTON",
        "VA"
    ],
    "24593": [
        "SPOUT SPRING",
        "VA"
    ],
    "24594": [
        "SUTHERLIN",
        "VA"
    ],
    "24595": [
        "SWEET BRIAR",
        "VA"
    ],
    "24597": [
        "VERNON HILL",
        "VA"
    ],
    "24598": [
        "VIRGILINA",
        "VA"
    ],
    "24599": [
        "WINGINA",
        "VA"
    ],
    "24601": [
        "AMONATE",
        "VA"
    ],
    "24602": [
        "BANDY",
        "VA"
    ],
    "24603": [
        "BIG ROCK",
        "VA"
    ],
    "24604": [
        "BISHOP",
        "VA"
    ],
    "24605": [
        "BLUEFIELD",
        "VA"
    ],
    "24606": [
        "BOISSEVAIN",
        "VA"
    ],
    "24607": [
        "BREAKS",
        "VA"
    ],
    "24608": [
        "BURKES GARDEN",
        "VA"
    ],
    "24609": [
        "CEDAR BLUFF",
        "VA"
    ],
    "24612": [
        "DORAN",
        "VA"
    ],
    "24613": [
        "FALLS MILLS",
        "VA"
    ],
    "24614": [
        "GRUNDY",
        "VA"
    ],
    "24620": [
        "HURLEY",
        "VA"
    ],
    "24622": [
        "JEWELL RIDGE",
        "VA"
    ],
    "24624": [
        "KEEN MOUNTAIN",
        "VA"
    ],
    "24627": [
        "MAVISDALE",
        "VA"
    ],
    "24628": [
        "MAXIE",
        "VA"
    ],
    "24630": [
        "NORTH TAZEWELL",
        "VA"
    ],
    "24631": [
        "OAKWOOD",
        "VA"
    ],
    "24634": [
        "PILGRIMS KNOB",
        "VA"
    ],
    "24635": [
        "POCAHONTAS",
        "VA"
    ],
    "24637": [
        "POUNDING MILL",
        "VA"
    ],
    "24639": [
        "RAVEN",
        "VA"
    ],
    "24640": [
        "RED ASH",
        "VA"
    ],
    "24641": [
        "RICHLANDS",
        "VA"
    ],
    "24646": [
        "ROWE",
        "VA"
    ],
    "24647": [
        "SHORTT GAP",
        "VA"
    ],
    "24649": [
        "SWORDS CREEK",
        "VA"
    ],
    "24651": [
        "TAZEWELL",
        "VA"
    ],
    "24656": [
        "VANSANT",
        "VA"
    ],
    "24657": [
        "WHITEWOOD",
        "VA"
    ],
    "24701": [
        "BLUEFIELD",
        "WV"
    ],
    "24712": [
        "ATHENS",
        "WV"
    ],
    "24714": [
        "BEESON",
        "WV"
    ],
    "24715": [
        "BRAMWELL",
        "WV"
    ],
    "24716": [
        "BUD",
        "WV"
    ],
    "24724": [
        "FREEMAN",
        "WV"
    ],
    "24726": [
        "HERNDON",
        "WV"
    ],
    "24729": [
        "HIAWATHA",
        "WV"
    ],
    "24731": [
        "KEGLEY",
        "WV"
    ],
    "24732": [
        "KELLYSVILLE",
        "WV"
    ],
    "24733": [
        "LASHMEET",
        "WV"
    ],
    "24736": [
        "MATOAKA",
        "WV"
    ],
    "24737": [
        "MONTCALM",
        "WV"
    ],
    "24739": [
        "PRINCETON",
        "WV"
    ],
    "24740": [
        "PRINCETON",
        "WV"
    ],
    "24747": [
        "ROCK",
        "WV"
    ],
    "24751": [
        "WOLFE",
        "WV"
    ],
    "24801": [
        "WELCH",
        "WV"
    ],
    "24808": [
        "ANAWALT",
        "WV"
    ],
    "24811": [
        "AVONDALE",
        "WV"
    ],
    "24813": [
        "BARTLEY",
        "WV"
    ],
    "24815": [
        "BERWIND",
        "WV"
    ],
    "24816": [
        "BIG SANDY",
        "WV"
    ],
    "24817": [
        "BRADSHAW",
        "WV"
    ],
    "24818": [
        "BRENTON",
        "WV"
    ],
    "24822": [
        "CLEAR FORK",
        "WV"
    ],
    "24823": [
        "COAL MOUNTAIN",
        "WV"
    ],
    "24826": [
        "CUCUMBER",
        "WV"
    ],
    "24827": [
        "CYCLONE",
        "WV"
    ],
    "24828": [
        "DAVY",
        "WV"
    ],
    "24829": [
        "ECKMAN",
        "WV"
    ],
    "24831": [
        "ELKHORN",
        "WV"
    ],
    "24836": [
        "GARY",
        "WV"
    ],
    "24839": [
        "HANOVER",
        "WV"
    ],
    "24844": [
        "IAEGER",
        "WV"
    ],
    "24845": [
        "IKES FORK",
        "WV"
    ],
    "24847": [
        "ITMANN",
        "WV"
    ],
    "24849": [
        "JESSE",
        "WV"
    ],
    "24850": [
        "JOLO",
        "WV"
    ],
    "24851": [
        "JUSTICE",
        "WV"
    ],
    "24853": [
        "KIMBALL",
        "WV"
    ],
    "24854": [
        "KOPPERSTON",
        "WV"
    ],
    "24857": [
        "LYNCO",
        "WV"
    ],
    "24859": [
        "MARIANNA",
        "WV"
    ],
    "24860": [
        "MATHENY",
        "WV"
    ],
    "24861": [
        "MAYBEURY",
        "WV"
    ],
    "24862": [
        "MOHAWK",
        "WV"
    ],
    "24866": [
        "NEWHALL",
        "WV"
    ],
    "24867": [
        "NEW RICHMOND",
        "WV"
    ],
    "24868": [
        "NORTHFORK",
        "WV"
    ],
    "24869": [
        "NORTH SPRING",
        "WV"
    ],
    "24870": [
        "OCEANA",
        "WV"
    ],
    "24872": [
        "PANTHER",
        "WV"
    ],
    "24873": [
        "PAYNESVILLE",
        "WV"
    ],
    "24874": [
        "PINEVILLE",
        "WV"
    ],
    "24878": [
        "PREMIER",
        "WV"
    ],
    "24879": [
        "RAYSAL",
        "WV"
    ],
    "24880": [
        "ROCK VIEW",
        "WV"
    ],
    "24881": [
        "RODERFIELD",
        "WV"
    ],
    "24882": [
        "SIMON",
        "WV"
    ],
    "24884": [
        "SQUIRE",
        "WV"
    ],
    "24888": [
        "THORPE",
        "WV"
    ],
    "24892": [
        "WAR",
        "WV"
    ],
    "24901": [
        "LEWISBURG",
        "WV"
    ],
    "24902": [
        "FAIRLEA",
        "WV"
    ],
    "24910": [
        "ALDERSON",
        "WV"
    ],
    "24915": [
        "ARBOVALE",
        "WV"
    ],
    "24916": [
        "ASBURY",
        "WV"
    ],
    "24918": [
        "BALLARD",
        "WV"
    ],
    "24920": [
        "BARTOW",
        "WV"
    ],
    "24924": [
        "BUCKEYE",
        "WV"
    ],
    "24925": [
        "CALDWELL",
        "WV"
    ],
    "24927": [
        "CASS",
        "WV"
    ],
    "24931": [
        "CRAWLEY",
        "WV"
    ],
    "24934": [
        "DUNMORE",
        "WV"
    ],
    "24935": [
        "FOREST HILL",
        "WV"
    ],
    "24938": [
        "FRANKFORD",
        "WV"
    ],
    "24941": [
        "GAP MILLS",
        "WV"
    ],
    "24944": [
        "GREEN BANK",
        "WV"
    ],
    "24945": [
        "GREENVILLE",
        "WV"
    ],
    "24946": [
        "HILLSBORO",
        "WV"
    ],
    "24951": [
        "LINDSIDE",
        "WV"
    ],
    "24954": [
        "MARLINTON",
        "WV"
    ],
    "24957": [
        "MAXWELTON",
        "WV"
    ],
    "24962": [
        "PENCE SPRINGS",
        "WV"
    ],
    "24963": [
        "PETERSTOWN",
        "WV"
    ],
    "24966": [
        "RENICK",
        "WV"
    ],
    "24970": [
        "RONCEVERTE",
        "WV"
    ],
    "24974": [
        "SECONDCREEK",
        "WV"
    ],
    "24976": [
        "SINKS GROVE",
        "WV"
    ],
    "24977": [
        "SMOOT",
        "WV"
    ],
    "24981": [
        "TALCOTT",
        "WV"
    ],
    "24983": [
        "UNION",
        "WV"
    ],
    "24985": [
        "WAYSIDE",
        "WV"
    ],
    "24986": [
        "WHITE SULPHUR SPRINGS",
        "WV"
    ],
    "24991": [
        "WILLIAMSBURG",
        "WV"
    ],
    "24993": [
        "WOLFCREEK",
        "WV"
    ],
    "25002": [
        "ALLOY",
        "WV"
    ],
    "25003": [
        "ALUM CREEK",
        "WV"
    ],
    "25005": [
        "AMMA",
        "WV"
    ],
    "25009": [
        "ASHFORD",
        "WV"
    ],
    "25011": [
        "BANCROFT",
        "WV"
    ],
    "25015": [
        "BELLE",
        "WV"
    ],
    "25019": [
        "BICKMORE",
        "WV"
    ],
    "25021": [
        "BIM",
        "WV"
    ],
    "25024": [
        "BLOOMINGROSE",
        "WV"
    ],
    "25026": [
        "BLUE CREEK",
        "WV"
    ],
    "25030": [
        "BOMONT",
        "WV"
    ],
    "25031": [
        "BOOMER",
        "WV"
    ],
    "25033": [
        "BUFFALO",
        "WV"
    ],
    "25035": [
        "CABIN CREEK",
        "WV"
    ],
    "25036": [
        "CANNELTON",
        "WV"
    ],
    "25039": [
        "CEDAR GROVE",
        "WV"
    ],
    "25040": [
        "CHARLTON HEIGHTS",
        "WV"
    ],
    "25043": [
        "CLAY",
        "WV"
    ],
    "25044": [
        "CLEAR CREEK",
        "WV"
    ],
    "25045": [
        "CLENDENIN",
        "WV"
    ],
    "25047": [
        "CLOTHIER",
        "WV"
    ],
    "25048": [
        "COLCORD",
        "WV"
    ],
    "25049": [
        "COMFORT",
        "WV"
    ],
    "25053": [
        "DANVILLE",
        "WV"
    ],
    "25054": [
        "DAWES",
        "WV"
    ],
    "25059": [
        "DIXIE",
        "WV"
    ],
    "25062": [
        "DRY CREEK",
        "WV"
    ],
    "25063": [
        "DUCK",
        "WV"
    ],
    "25064": [
        "DUNBAR",
        "WV"
    ],
    "25067": [
        "EAST BANK",
        "WV"
    ],
    "25070": [
        "ELEANOR",
        "WV"
    ],
    "25071": [
        "ELKVIEW",
        "WV"
    ],
    "25075": [
        "ESKDALE",
        "WV"
    ],
    "25076": [
        "ETHEL",
        "WV"
    ],
    "25081": [
        "FOSTER",
        "WV"
    ],
    "25082": [
        "FRAZIERS BOTTOM",
        "WV"
    ],
    "25083": [
        "GALLAGHER",
        "WV"
    ],
    "25085": [
        "GAULEY BRIDGE",
        "WV"
    ],
    "25086": [
        "GLASGOW",
        "WV"
    ],
    "25088": [
        "GLEN",
        "WV"
    ],
    "25090": [
        "GLEN FERRIS",
        "WV"
    ],
    "25102": [
        "HANDLEY",
        "WV"
    ],
    "25103": [
        "HANSFORD",
        "WV"
    ],
    "25106": [
        "HENDERSON",
        "WV"
    ],
    "25107": [
        "HERNSHAW",
        "WV"
    ],
    "25108": [
        "HEWETT",
        "WV"
    ],
    "25109": [
        "HOMETOWN",
        "WV"
    ],
    "25110": [
        "HUGHESTON",
        "WV"
    ],
    "25111": [
        "INDORE",
        "WV"
    ],
    "25112": [
        "INSTITUTE",
        "WV"
    ],
    "25113": [
        "IVYDALE",
        "WV"
    ],
    "25114": [
        "JEFFREY",
        "WV"
    ],
    "25115": [
        "KANAWHA FALLS",
        "WV"
    ],
    "25118": [
        "KIMBERLY",
        "WV"
    ],
    "25119": [
        "KINCAID",
        "WV"
    ],
    "25121": [
        "LAKE",
        "WV"
    ],
    "25123": [
        "LEON",
        "WV"
    ],
    "25124": [
        "LIBERTY",
        "WV"
    ],
    "25125": [
        "LIZEMORES",
        "WV"
    ],
    "25126": [
        "LONDON",
        "WV"
    ],
    "25130": [
        "MADISON",
        "WV"
    ],
    "25132": [
        "MAMMOTH",
        "WV"
    ],
    "25133": [
        "MAYSEL",
        "WV"
    ],
    "25134": [
        "MIAMI",
        "WV"
    ],
    "25136": [
        "MONTGOMERY",
        "WV"
    ],
    "25139": [
        "MOUNT CARBON",
        "WV"
    ],
    "25140": [
        "NAOMA",
        "WV"
    ],
    "25141": [
        "NEBO",
        "WV"
    ],
    "25143": [
        "NITRO",
        "WV"
    ],
    "25148": [
        "ORGAS",
        "WV"
    ],
    "25154": [
        "PEYTONA",
        "WV"
    ],
    "25156": [
        "PINCH",
        "WV"
    ],
    "25159": [
        "POCA",
        "WV"
    ],
    "25160": [
        "POND GAP",
        "WV"
    ],
    "25161": [
        "POWELLTON",
        "WV"
    ],
    "25162": [
        "PRATT",
        "WV"
    ],
    "25164": [
        "PROCIOUS",
        "WV"
    ],
    "25165": [
        "RACINE",
        "WV"
    ],
    "25168": [
        "RED HOUSE",
        "WV"
    ],
    "25173": [
        "ROBSON",
        "WV"
    ],
    "25177": [
        "SAINT ALBANS",
        "WV"
    ],
    "25181": [
        "SETH",
        "WV"
    ],
    "25183": [
        "SHARPLES",
        "WV"
    ],
    "25185": [
        "MOUNT OLIVE",
        "WV"
    ],
    "25186": [
        "SMITHERS",
        "WV"
    ],
    "25187": [
        "SOUTHSIDE",
        "WV"
    ],
    "25193": [
        "SYLVESTER",
        "WV"
    ],
    "25201": [
        "TAD",
        "WV"
    ],
    "25202": [
        "TORNADO",
        "WV"
    ],
    "25203": [
        "TURTLE CREEK",
        "WV"
    ],
    "25205": [
        "UNEEDA",
        "WV"
    ],
    "25206": [
        "VAN",
        "WV"
    ],
    "25208": [
        "WHARTON",
        "WV"
    ],
    "25209": [
        "WHITESVILLE",
        "WV"
    ],
    "25213": [
        "WINFIELD",
        "WV"
    ],
    "25214": [
        "WINIFREDE",
        "WV"
    ],
    "25234": [
        "ARNOLDSBURG",
        "WV"
    ],
    "25235": [
        "CHLOE",
        "WV"
    ],
    "25239": [
        "COTTAGEVILLE",
        "WV"
    ],
    "25241": [
        "EVANS",
        "WV"
    ],
    "25243": [
        "GANDEEVILLE",
        "WV"
    ],
    "25244": [
        "GAY",
        "WV"
    ],
    "25245": [
        "GIVEN",
        "WV"
    ],
    "25247": [
        "HARTFORD",
        "WV"
    ],
    "25248": [
        "KENNA",
        "WV"
    ],
    "25251": [
        "LEFT HAND",
        "WV"
    ],
    "25252": [
        "LE ROY",
        "WV"
    ],
    "25253": [
        "LETART",
        "WV"
    ],
    "25259": [
        "LOONEYVILLE",
        "WV"
    ],
    "25260": [
        "MASON",
        "WV"
    ],
    "25261": [
        "MILLSTONE",
        "WV"
    ],
    "25262": [
        "MILLWOOD",
        "WV"
    ],
    "25264": [
        "MOUNT ALTO",
        "WV"
    ],
    "25265": [
        "NEW HAVEN",
        "WV"
    ],
    "25266": [
        "NEWTON",
        "WV"
    ],
    "25267": [
        "NORMANTOWN",
        "WV"
    ],
    "25268": [
        "ORMA",
        "WV"
    ],
    "25270": [
        "REEDY",
        "WV"
    ],
    "25271": [
        "RIPLEY",
        "WV"
    ],
    "25275": [
        "SANDYVILLE",
        "WV"
    ],
    "25276": [
        "SPENCER",
        "WV"
    ],
    "25285": [
        "WALLBACK",
        "WV"
    ],
    "25286": [
        "WALTON",
        "WV"
    ],
    "25287": [
        "WEST COLUMBIA",
        "WV"
    ],
    "25301": [
        "CHARLESTON",
        "WV"
    ],
    "25302": [
        "CHARLESTON",
        "WV"
    ],
    "25303": [
        "CHARLESTON",
        "WV"
    ],
    "25304": [
        "CHARLESTON",
        "WV"
    ],
    "25305": [
        "CHARLESTON",
        "WV"
    ],
    "25306": [
        "CHARLESTON",
        "WV"
    ],
    "25309": [
        "CHARLESTON",
        "WV"
    ],
    "25311": [
        "CHARLESTON",
        "WV"
    ],
    "25312": [
        "CHARLESTON",
        "WV"
    ],
    "25313": [
        "CHARLESTON",
        "WV"
    ],
    "25314": [
        "CHARLESTON",
        "WV"
    ],
    "25315": [
        "CHARLESTON",
        "WV"
    ],
    "25317": [
        "CHARLESTON",
        "WV"
    ],
    "25320": [
        "CHARLESTON",
        "WV"
    ],
    "25321": [
        "CHARLESTON",
        "WV"
    ],
    "25322": [
        "CHARLESTON",
        "WV"
    ],
    "25323": [
        "CHARLESTON",
        "WV"
    ],
    "25324": [
        "CHARLESTON",
        "WV"
    ],
    "25325": [
        "CHARLESTON",
        "WV"
    ],
    "25326": [
        "CHARLESTON",
        "WV"
    ],
    "25327": [
        "CHARLESTON",
        "WV"
    ],
    "25328": [
        "CHARLESTON",
        "WV"
    ],
    "25329": [
        "CHARLESTON",
        "WV"
    ],
    "25330": [
        "CHARLESTON",
        "WV"
    ],
    "25331": [
        "CHARLESTON",
        "WV"
    ],
    "25332": [
        "CHARLESTON",
        "WV"
    ],
    "25333": [
        "CHARLESTON",
        "WV"
    ],
    "25334": [
        "CHARLESTON",
        "WV"
    ],
    "25337": [
        "CHARLESTON",
        "WV"
    ],
    "25339": [
        "CHARLESTON",
        "WV"
    ],
    "25350": [
        "CHARLESTON",
        "WV"
    ],
    "25356": [
        "CHARLESTON",
        "WV"
    ],
    "25357": [
        "CHARLESTON",
        "WV"
    ],
    "25358": [
        "CHARLESTON",
        "WV"
    ],
    "25360": [
        "CHARLESTON",
        "WV"
    ],
    "25361": [
        "CHARLESTON",
        "WV"
    ],
    "25362": [
        "CHARLESTON",
        "WV"
    ],
    "25364": [
        "CHARLESTON",
        "WV"
    ],
    "25365": [
        "CHARLESTON",
        "WV"
    ],
    "25387": [
        "CHARLESTON",
        "WV"
    ],
    "25389": [
        "CHARLESTON",
        "WV"
    ],
    "25396": [
        "CHARLESTON",
        "WV"
    ],
    "25401": [
        "MARTINSBURG",
        "WV"
    ],
    "25402": [
        "MARTINSBURG",
        "WV"
    ],
    "25403": [
        "MARTINSBURG",
        "WV"
    ],
    "25404": [
        "MARTINSBURG",
        "WV"
    ],
    "25405": [
        "MARTINSBURG",
        "WV"
    ],
    "25411": [
        "BERKELEY SPRINGS",
        "WV"
    ],
    "25413": [
        "BUNKER HILL",
        "WV"
    ],
    "25414": [
        "CHARLES TOWN",
        "WV"
    ],
    "25419": [
        "FALLING WATERS",
        "WV"
    ],
    "25420": [
        "GERRARDSTOWN",
        "WV"
    ],
    "25421": [
        "GLENGARY",
        "WV"
    ],
    "25422": [
        "GREAT CACAPON",
        "WV"
    ],
    "25423": [
        "HALLTOWN",
        "WV"
    ],
    "25425": [
        "HARPERS FERRY",
        "WV"
    ],
    "25427": [
        "HEDGESVILLE",
        "WV"
    ],
    "25428": [
        "INWOOD",
        "WV"
    ],
    "25430": [
        "KEARNEYSVILLE",
        "WV"
    ],
    "25431": [
        "LEVELS",
        "WV"
    ],
    "25432": [
        "MILLVILLE",
        "WV"
    ],
    "25434": [
        "PAW PAW",
        "WV"
    ],
    "25438": [
        "RANSON",
        "WV"
    ],
    "25440": [
        "RIDGEWAY",
        "WV"
    ],
    "25441": [
        "RIPPON",
        "WV"
    ],
    "25442": [
        "SHENANDOAH JUNCTION",
        "WV"
    ],
    "25443": [
        "SHEPHERDSTOWN",
        "WV"
    ],
    "25444": [
        "SLANESVILLE",
        "WV"
    ],
    "25446": [
        "SUMMIT POINT",
        "WV"
    ],
    "25501": [
        "ALKOL",
        "WV"
    ],
    "25502": [
        "APPLE GROVE",
        "WV"
    ],
    "25503": [
        "ASHTON",
        "WV"
    ],
    "25504": [
        "BARBOURSVILLE",
        "WV"
    ],
    "25505": [
        "BIG CREEK",
        "WV"
    ],
    "25506": [
        "BRANCHLAND",
        "WV"
    ],
    "25507": [
        "CEREDO",
        "WV"
    ],
    "25508": [
        "CHAPMANVILLE",
        "WV"
    ],
    "25510": [
        "CULLODEN",
        "WV"
    ],
    "25511": [
        "DUNLOW",
        "WV"
    ],
    "25512": [
        "EAST LYNN",
        "WV"
    ],
    "25514": [
        "FORT GAY",
        "WV"
    ],
    "25515": [
        "GALLIPOLIS FERRY",
        "WV"
    ],
    "25517": [
        "GENOA",
        "WV"
    ],
    "25520": [
        "GLENWOOD",
        "WV"
    ],
    "25521": [
        "GRIFFITHSVILLE",
        "WV"
    ],
    "25523": [
        "HAMLIN",
        "WV"
    ],
    "25524": [
        "HARTS",
        "WV"
    ],
    "25526": [
        "HURRICANE",
        "WV"
    ],
    "25529": [
        "JULIAN",
        "WV"
    ],
    "25530": [
        "KENOVA",
        "WV"
    ],
    "25534": [
        "KIAHSVILLE",
        "WV"
    ],
    "25535": [
        "LAVALETTE",
        "WV"
    ],
    "25537": [
        "LESAGE",
        "WV"
    ],
    "25540": [
        "MIDKIFF",
        "WV"
    ],
    "25541": [
        "MILTON",
        "WV"
    ],
    "25545": [
        "ONA",
        "WV"
    ],
    "25547": [
        "PECKS MILL",
        "WV"
    ],
    "25550": [
        "POINT PLEASANT",
        "WV"
    ],
    "25555": [
        "PRICHARD",
        "WV"
    ],
    "25557": [
        "RANGER",
        "WV"
    ],
    "25559": [
        "SALT ROCK",
        "WV"
    ],
    "25560": [
        "SCOTT DEPOT",
        "WV"
    ],
    "25564": [
        "SOD",
        "WV"
    ],
    "25565": [
        "SPURLOCKVILLE",
        "WV"
    ],
    "25567": [
        "SUMERCO",
        "WV"
    ],
    "25569": [
        "TEAYS",
        "WV"
    ],
    "25570": [
        "WAYNE",
        "WV"
    ],
    "25571": [
        "WEST HAMLIN",
        "WV"
    ],
    "25573": [
        "YAWKEY",
        "WV"
    ],
    "25601": [
        "LOGAN",
        "WV"
    ],
    "25606": [
        "ACCOVILLE",
        "WV"
    ],
    "25607": [
        "AMHERSTDALE",
        "WV"
    ],
    "25611": [
        "BRUNO",
        "WV"
    ],
    "25612": [
        "CHAUNCEY",
        "WV"
    ],
    "25614": [
        "CORA",
        "WV"
    ],
    "25617": [
        "DAVIN",
        "WV"
    ],
    "25621": [
        "GILBERT",
        "WV"
    ],
    "25625": [
        "HOLDEN",
        "WV"
    ],
    "25628": [
        "KISTLER",
        "WV"
    ],
    "25630": [
        "LORADO",
        "WV"
    ],
    "25632": [
        "LYBURN",
        "WV"
    ],
    "25634": [
        "MALLORY",
        "WV"
    ],
    "25635": [
        "MAN",
        "WV"
    ],
    "25637": [
        "MOUNT GAY",
        "WV"
    ],
    "25638": [
        "OMAR",
        "WV"
    ],
    "25639": [
        "PEACH CREEK",
        "WV"
    ],
    "25646": [
        "STOLLINGS",
        "WV"
    ],
    "25647": [
        "SWITZER",
        "WV"
    ],
    "25649": [
        "VERDUNVILLE",
        "WV"
    ],
    "25650": [
        "VERNER",
        "WV"
    ],
    "25651": [
        "WHARNCLIFFE",
        "WV"
    ],
    "25652": [
        "WHITMAN",
        "WV"
    ],
    "25653": [
        "WILKINSON",
        "WV"
    ],
    "25654": [
        "YOLYN",
        "WV"
    ],
    "25661": [
        "WILLIAMSON",
        "WV"
    ],
    "25665": [
        "BORDERLAND",
        "WV"
    ],
    "25666": [
        "BREEDEN",
        "WV"
    ],
    "25667": [
        "CHATTAROY",
        "WV"
    ],
    "25669": [
        "CRUM",
        "WV"
    ],
    "25670": [
        "DELBARTON",
        "WV"
    ],
    "25671": [
        "DINGESS",
        "WV"
    ],
    "25672": [
        "EDGARTON",
        "WV"
    ],
    "25674": [
        "KERMIT",
        "WV"
    ],
    "25676": [
        "LENORE",
        "WV"
    ],
    "25678": [
        "MATEWAN",
        "WV"
    ],
    "25685": [
        "NAUGATUCK",
        "WV"
    ],
    "25686": [
        "NEWTOWN",
        "WV"
    ],
    "25688": [
        "NORTH MATEWAN",
        "WV"
    ],
    "25690": [
        "RAGLAND",
        "WV"
    ],
    "25691": [
        "RAWL",
        "WV"
    ],
    "25692": [
        "RED JACKET",
        "WV"
    ],
    "25696": [
        "VARNEY",
        "WV"
    ],
    "25701": [
        "HUNTINGTON",
        "WV"
    ],
    "25702": [
        "HUNTINGTON",
        "WV"
    ],
    "25703": [
        "HUNTINGTON",
        "WV"
    ],
    "25704": [
        "HUNTINGTON",
        "WV"
    ],
    "25705": [
        "HUNTINGTON",
        "WV"
    ],
    "25706": [
        "HUNTINGTON",
        "WV"
    ],
    "25707": [
        "HUNTINGTON",
        "WV"
    ],
    "25708": [
        "HUNTINGTON",
        "WV"
    ],
    "25709": [
        "HUNTINGTON",
        "WV"
    ],
    "25710": [
        "HUNTINGTON",
        "WV"
    ],
    "25713": [
        "HUNTINGTON",
        "WV"
    ],
    "25714": [
        "HUNTINGTON",
        "WV"
    ],
    "25715": [
        "HUNTINGTON",
        "WV"
    ],
    "25716": [
        "HUNTINGTON",
        "WV"
    ],
    "25717": [
        "HUNTINGTON",
        "WV"
    ],
    "25718": [
        "HUNTINGTON",
        "WV"
    ],
    "25719": [
        "HUNTINGTON",
        "WV"
    ],
    "25721": [
        "HUNTINGTON",
        "WV"
    ],
    "25722": [
        "HUNTINGTON",
        "WV"
    ],
    "25723": [
        "HUNTINGTON",
        "WV"
    ],
    "25724": [
        "HUNTINGTON",
        "WV"
    ],
    "25725": [
        "HUNTINGTON",
        "WV"
    ],
    "25726": [
        "HUNTINGTON",
        "WV"
    ],
    "25727": [
        "HUNTINGTON",
        "WV"
    ],
    "25728": [
        "HUNTINGTON",
        "WV"
    ],
    "25729": [
        "HUNTINGTON",
        "WV"
    ],
    "25755": [
        "HUNTINGTON",
        "WV"
    ],
    "25771": [
        "HUNTINGTON",
        "WV"
    ],
    "25772": [
        "HUNTINGTON",
        "WV"
    ],
    "25773": [
        "HUNTINGTON",
        "WV"
    ],
    "25776": [
        "HUNTINGTON",
        "WV"
    ],
    "25778": [
        "HUNTINGTON",
        "WV"
    ],
    "25779": [
        "HUNTINGTON",
        "WV"
    ],
    "25801": [
        "BECKLEY",
        "WV"
    ],
    "25802": [
        "BECKLEY",
        "WV"
    ],
    "25810": [
        "ALLEN JUNCTION",
        "WV"
    ],
    "25811": [
        "AMIGO",
        "WV"
    ],
    "25812": [
        "ANSTED",
        "WV"
    ],
    "25813": [
        "BEAVER",
        "WV"
    ],
    "25817": [
        "BOLT",
        "WV"
    ],
    "25818": [
        "BRADLEY",
        "WV"
    ],
    "25820": [
        "CAMP CREEK",
        "WV"
    ],
    "25823": [
        "COAL CITY",
        "WV"
    ],
    "25825": [
        "COOL RIDGE",
        "WV"
    ],
    "25826": [
        "CORINNE",
        "WV"
    ],
    "25827": [
        "CRAB ORCHARD",
        "WV"
    ],
    "25831": [
        "DANESE",
        "WV"
    ],
    "25832": [
        "DANIELS",
        "WV"
    ],
    "25833": [
        "DOTHAN",
        "WV"
    ],
    "25836": [
        "ECCLES",
        "WV"
    ],
    "25837": [
        "EDMOND",
        "WV"
    ],
    "25839": [
        "FAIRDALE",
        "WV"
    ],
    "25840": [
        "FAYETTEVILLE",
        "WV"
    ],
    "25841": [
        "FLAT TOP",
        "WV"
    ],
    "25843": [
        "GHENT",
        "WV"
    ],
    "25844": [
        "GLEN DANIEL",
        "WV"
    ],
    "25845": [
        "GLEN FORK",
        "WV"
    ],
    "25846": [
        "GLEN JEAN",
        "WV"
    ],
    "25848": [
        "GLEN ROGERS",
        "WV"
    ],
    "25849": [
        "GLEN WHITE",
        "WV"
    ],
    "25851": [
        "HARPER",
        "WV"
    ],
    "25854": [
        "HICO",
        "WV"
    ],
    "25855": [
        "HILLTOP",
        "WV"
    ],
    "25860": [
        "LANARK",
        "WV"
    ],
    "25862": [
        "LANSING",
        "WV"
    ],
    "25864": [
        "LAYLAND",
        "WV"
    ],
    "25865": [
        "LESTER",
        "WV"
    ],
    "25866": [
        "LOCHGELLY",
        "WV"
    ],
    "25868": [
        "LOOKOUT",
        "WV"
    ],
    "25870": [
        "MABEN",
        "WV"
    ],
    "25871": [
        "MABSCOTT",
        "WV"
    ],
    "25873": [
        "MAC ARTHUR",
        "WV"
    ],
    "25876": [
        "SAULSVILLE",
        "WV"
    ],
    "25878": [
        "MIDWAY",
        "WV"
    ],
    "25879": [
        "MINDEN",
        "WV"
    ],
    "25880": [
        "MOUNT HOPE",
        "WV"
    ],
    "25882": [
        "MULLENS",
        "WV"
    ],
    "25901": [
        "OAK HILL",
        "WV"
    ],
    "25904": [
        "PAX",
        "WV"
    ],
    "25906": [
        "PINEY VIEW",
        "WV"
    ],
    "25909": [
        "PROSPERITY",
        "WV"
    ],
    "25911": [
        "RALEIGH",
        "WV"
    ],
    "25913": [
        "RAVENCLIFF",
        "WV"
    ],
    "25915": [
        "RHODELL",
        "WV"
    ],
    "25917": [
        "SCARBRO",
        "WV"
    ],
    "25918": [
        "SHADY SPRING",
        "WV"
    ],
    "25919": [
        "SKELTON",
        "WV"
    ],
    "25920": [
        "SLAB FORK",
        "WV"
    ],
    "25921": [
        "SOPHIA",
        "WV"
    ],
    "25922": [
        "SPANISHBURG",
        "WV"
    ],
    "25927": [
        "STANAFORD",
        "WV"
    ],
    "25928": [
        "STEPHENSON",
        "WV"
    ],
    "25932": [
        "SURVEYOR",
        "WV"
    ],
    "25936": [
        "THURMOND",
        "WV"
    ],
    "25938": [
        "VICTOR",
        "WV"
    ],
    "25942": [
        "WINONA",
        "WV"
    ],
    "25951": [
        "HINTON",
        "WV"
    ],
    "25958": [
        "CHARMCO",
        "WV"
    ],
    "25962": [
        "RAINELLE",
        "WV"
    ],
    "25966": [
        "GREEN SULPHUR SPRINGS",
        "WV"
    ],
    "25969": [
        "JUMPING BRANCH",
        "WV"
    ],
    "25971": [
        "LERONA",
        "WV"
    ],
    "25976": [
        "MEADOW BRIDGE",
        "WV"
    ],
    "25977": [
        "MEADOW CREEK",
        "WV"
    ],
    "25978": [
        "NIMITZ",
        "WV"
    ],
    "25979": [
        "PIPESTEM",
        "WV"
    ],
    "25981": [
        "QUINWOOD",
        "WV"
    ],
    "25984": [
        "RUPERT",
        "WV"
    ],
    "25985": [
        "SANDSTONE",
        "WV"
    ],
    "25986": [
        "SPRING DALE",
        "WV"
    ],
    "25989": [
        "WHITE OAK",
        "WV"
    ],
    "26003": [
        "WHEELING",
        "WV"
    ],
    "26030": [
        "BEECH BOTTOM",
        "WV"
    ],
    "26031": [
        "BENWOOD",
        "WV"
    ],
    "26032": [
        "BETHANY",
        "WV"
    ],
    "26033": [
        "CAMERON",
        "WV"
    ],
    "26034": [
        "CHESTER",
        "WV"
    ],
    "26035": [
        "COLLIERS",
        "WV"
    ],
    "26036": [
        "DALLAS",
        "WV"
    ],
    "26037": [
        "FOLLANSBEE",
        "WV"
    ],
    "26038": [
        "GLEN DALE",
        "WV"
    ],
    "26039": [
        "GLEN EASTON",
        "WV"
    ],
    "26040": [
        "MCMECHEN",
        "WV"
    ],
    "26041": [
        "MOUNDSVILLE",
        "WV"
    ],
    "26047": [
        "NEW CUMBERLAND",
        "WV"
    ],
    "26050": [
        "NEWELL",
        "WV"
    ],
    "26055": [
        "PROCTOR",
        "WV"
    ],
    "26056": [
        "NEW MANCHESTER",
        "WV"
    ],
    "26058": [
        "SHORT CREEK",
        "WV"
    ],
    "26059": [
        "TRIADELPHIA",
        "WV"
    ],
    "26060": [
        "VALLEY GROVE",
        "WV"
    ],
    "26062": [
        "WEIRTON",
        "WV"
    ],
    "26070": [
        "WELLSBURG",
        "WV"
    ],
    "26074": [
        "WEST LIBERTY",
        "WV"
    ],
    "26075": [
        "WINDSOR HEIGHTS",
        "WV"
    ],
    "26101": [
        "PARKERSBURG",
        "WV"
    ],
    "26102": [
        "PARKERSBURG",
        "WV"
    ],
    "26103": [
        "PARKERSBURG",
        "WV"
    ],
    "26104": [
        "PARKERSBURG",
        "WV"
    ],
    "26105": [
        "VIENNA",
        "WV"
    ],
    "26106": [
        "PARKERSBURG",
        "WV"
    ],
    "26120": [
        "MINERAL WELLS",
        "WV"
    ],
    "26121": [
        "MINERAL WELLS",
        "WV"
    ],
    "26133": [
        "BELLEVILLE",
        "WV"
    ],
    "26134": [
        "BELMONT",
        "WV"
    ],
    "26136": [
        "BIG BEND",
        "WV"
    ],
    "26137": [
        "BIG SPRINGS",
        "WV"
    ],
    "26141": [
        "CRESTON",
        "WV"
    ],
    "26142": [
        "DAVISVILLE",
        "WV"
    ],
    "26143": [
        "ELIZABETH",
        "WV"
    ],
    "26146": [
        "FRIENDLY",
        "WV"
    ],
    "26147": [
        "GRANTSVILLE",
        "WV"
    ],
    "26148": [
        "MACFARLAN",
        "WV"
    ],
    "26149": [
        "MIDDLEBOURNE",
        "WV"
    ],
    "26150": [
        "MINERAL WELLS",
        "WV"
    ],
    "26151": [
        "MOUNT ZION",
        "WV"
    ],
    "26152": [
        "MUNDAY",
        "WV"
    ],
    "26155": [
        "NEW MARTINSVILLE",
        "WV"
    ],
    "26159": [
        "PADEN CITY",
        "WV"
    ],
    "26160": [
        "PALESTINE",
        "WV"
    ],
    "26161": [
        "PETROLEUM",
        "WV"
    ],
    "26162": [
        "PORTERS FALLS",
        "WV"
    ],
    "26164": [
        "RAVENSWOOD",
        "WV"
    ],
    "26167": [
        "READER",
        "WV"
    ],
    "26169": [
        "ROCKPORT",
        "WV"
    ],
    "26170": [
        "SAINT MARYS",
        "WV"
    ],
    "26175": [
        "SISTERSVILLE",
        "WV"
    ],
    "26178": [
        "SMITHVILLE",
        "WV"
    ],
    "26180": [
        "WALKER",
        "WV"
    ],
    "26181": [
        "WASHINGTON",
        "WV"
    ],
    "26184": [
        "WAVERLY",
        "WV"
    ],
    "26187": [
        "WILLIAMSTOWN",
        "WV"
    ],
    "26201": [
        "BUCKHANNON",
        "WV"
    ],
    "26202": [
        "FENWICK",
        "WV"
    ],
    "26203": [
        "ERBACON",
        "WV"
    ],
    "26205": [
        "CRAIGSVILLE",
        "WV"
    ],
    "26206": [
        "COWEN",
        "WV"
    ],
    "26208": [
        "CAMDEN ON GAULEY",
        "WV"
    ],
    "26209": [
        "SNOWSHOE",
        "WV"
    ],
    "26210": [
        "ADRIAN",
        "WV"
    ],
    "26215": [
        "CLEVELAND",
        "WV"
    ],
    "26217": [
        "DIANA",
        "WV"
    ],
    "26218": [
        "FRENCH CREEK",
        "WV"
    ],
    "26222": [
        "HACKER VALLEY",
        "WV"
    ],
    "26224": [
        "HELVETIA",
        "WV"
    ],
    "26228": [
        "KANAWHA HEAD",
        "WV"
    ],
    "26234": [
        "ROCK CAVE",
        "WV"
    ],
    "26237": [
        "TALLMANSVILLE",
        "WV"
    ],
    "26238": [
        "VOLGA",
        "WV"
    ],
    "26241": [
        "ELKINS",
        "WV"
    ],
    "26250": [
        "BELINGTON",
        "WV"
    ],
    "26253": [
        "BEVERLY",
        "WV"
    ],
    "26254": [
        "BOWDEN",
        "WV"
    ],
    "26257": [
        "COALTON",
        "WV"
    ],
    "26259": [
        "DAILEY",
        "WV"
    ],
    "26260": [
        "DAVIS",
        "WV"
    ],
    "26261": [
        "RICHWOOD",
        "WV"
    ],
    "26263": [
        "DRYFORK",
        "WV"
    ],
    "26264": [
        "DURBIN",
        "WV"
    ],
    "26266": [
        "UPPERGLADE",
        "WV"
    ],
    "26267": [
        "ELLAMORE",
        "WV"
    ],
    "26268": [
        "GLADY",
        "WV"
    ],
    "26269": [
        "HAMBLETON",
        "WV"
    ],
    "26270": [
        "HARMAN",
        "WV"
    ],
    "26271": [
        "HENDRICKS",
        "WV"
    ],
    "26273": [
        "HUTTONSVILLE",
        "WV"
    ],
    "26275": [
        "JUNIOR",
        "WV"
    ],
    "26276": [
        "KERENS",
        "WV"
    ],
    "26278": [
        "MABIE",
        "WV"
    ],
    "26280": [
        "MILL CREEK",
        "WV"
    ],
    "26282": [
        "MONTERVILLE",
        "WV"
    ],
    "26283": [
        "MONTROSE",
        "WV"
    ],
    "26285": [
        "NORTON",
        "WV"
    ],
    "26287": [
        "PARSONS",
        "WV"
    ],
    "26288": [
        "WEBSTER SPRINGS",
        "WV"
    ],
    "26291": [
        "SLATYFORK",
        "WV"
    ],
    "26292": [
        "THOMAS",
        "WV"
    ],
    "26293": [
        "VALLEY BEND",
        "WV"
    ],
    "26294": [
        "VALLEY HEAD",
        "WV"
    ],
    "26296": [
        "WHITMER",
        "WV"
    ],
    "26301": [
        "CLARKSBURG",
        "WV"
    ],
    "26302": [
        "CLARKSBURG",
        "WV"
    ],
    "26306": [
        "CLARKSBURG",
        "WV"
    ],
    "26320": [
        "ALMA",
        "WV"
    ],
    "26321": [
        "ALUM BRIDGE",
        "WV"
    ],
    "26323": [
        "ANMOORE",
        "WV"
    ],
    "26325": [
        "AUBURN",
        "WV"
    ],
    "26327": [
        "BEREA",
        "WV"
    ],
    "26330": [
        "BRIDGEPORT",
        "WV"
    ],
    "26335": [
        "BURNSVILLE",
        "WV"
    ],
    "26337": [
        "CAIRO",
        "WV"
    ],
    "26338": [
        "CAMDEN",
        "WV"
    ],
    "26339": [
        "CENTER POINT",
        "WV"
    ],
    "26342": [
        "COXS MILLS",
        "WV"
    ],
    "26343": [
        "CRAWFORD",
        "WV"
    ],
    "26346": [
        "ELLENBORO",
        "WV"
    ],
    "26347": [
        "FLEMINGTON",
        "WV"
    ],
    "26348": [
        "FOLSOM",
        "WV"
    ],
    "26349": [
        "GALLOWAY",
        "WV"
    ],
    "26351": [
        "GLENVILLE",
        "WV"
    ],
    "26354": [
        "GRAFTON",
        "WV"
    ],
    "26361": [
        "GYPSY",
        "WV"
    ],
    "26362": [
        "HARRISVILLE",
        "WV"
    ],
    "26366": [
        "HAYWOOD",
        "WV"
    ],
    "26369": [
        "HEPZIBAH",
        "WV"
    ],
    "26372": [
        "HORNER",
        "WV"
    ],
    "26374": [
        "INDEPENDENCE",
        "WV"
    ],
    "26376": [
        "IRELAND",
        "WV"
    ],
    "26377": [
        "JACKSONBURG",
        "WV"
    ],
    "26378": [
        "JANE LEW",
        "WV"
    ],
    "26384": [
        "LINN",
        "WV"
    ],
    "26385": [
        "LOST CREEK",
        "WV"
    ],
    "26386": [
        "LUMBERPORT",
        "WV"
    ],
    "26404": [
        "MEADOWBROOK",
        "WV"
    ],
    "26405": [
        "MOATSVILLE",
        "WV"
    ],
    "26408": [
        "MOUNT CLARE",
        "WV"
    ],
    "26410": [
        "NEWBURG",
        "WV"
    ],
    "26411": [
        "NEW MILTON",
        "WV"
    ],
    "26415": [
        "PENNSBORO",
        "WV"
    ],
    "26416": [
        "PHILIPPI",
        "WV"
    ],
    "26419": [
        "PINE GROVE",
        "WV"
    ],
    "26421": [
        "PULLMAN",
        "WV"
    ],
    "26422": [
        "REYNOLDSVILLE",
        "WV"
    ],
    "26425": [
        "ROWLESBURG",
        "WV"
    ],
    "26426": [
        "SALEM",
        "WV"
    ],
    "26430": [
        "SAND FORK",
        "WV"
    ],
    "26431": [
        "SHINNSTON",
        "WV"
    ],
    "26435": [
        "SIMPSON",
        "WV"
    ],
    "26436": [
        "SMITHBURG",
        "WV"
    ],
    "26437": [
        "SMITHFIELD",
        "WV"
    ],
    "26438": [
        "SPELTER",
        "WV"
    ],
    "26440": [
        "THORNTON",
        "WV"
    ],
    "26443": [
        "TROY",
        "WV"
    ],
    "26444": [
        "TUNNELTON",
        "WV"
    ],
    "26447": [
        "WALKERSVILLE",
        "WV"
    ],
    "26448": [
        "WALLACE",
        "WV"
    ],
    "26451": [
        "WEST MILFORD",
        "WV"
    ],
    "26452": [
        "WESTON",
        "WV"
    ],
    "26456": [
        "WEST UNION",
        "WV"
    ],
    "26501": [
        "MORGANTOWN",
        "WV"
    ],
    "26502": [
        "MORGANTOWN",
        "WV"
    ],
    "26504": [
        "MORGANTOWN",
        "WV"
    ],
    "26505": [
        "MORGANTOWN",
        "WV"
    ],
    "26506": [
        "MORGANTOWN",
        "WV"
    ],
    "26507": [
        "MORGANTOWN",
        "WV"
    ],
    "26508": [
        "MORGANTOWN",
        "WV"
    ],
    "26519": [
        "ALBRIGHT",
        "WV"
    ],
    "26520": [
        "ARTHURDALE",
        "WV"
    ],
    "26521": [
        "BLACKSVILLE",
        "WV"
    ],
    "26524": [
        "BRETZ",
        "WV"
    ],
    "26525": [
        "BRUCETON MILLS",
        "WV"
    ],
    "26527": [
        "CASSVILLE",
        "WV"
    ],
    "26531": [
        "DELLSLOW",
        "WV"
    ],
    "26534": [
        "GRANVILLE",
        "WV"
    ],
    "26537": [
        "KINGWOOD",
        "WV"
    ],
    "26541": [
        "MAIDSVILLE",
        "WV"
    ],
    "26542": [
        "MASONTOWN",
        "WV"
    ],
    "26543": [
        "OSAGE",
        "WV"
    ],
    "26544": [
        "PENTRESS",
        "WV"
    ],
    "26546": [
        "PURSGLOVE",
        "WV"
    ],
    "26547": [
        "REEDSVILLE",
        "WV"
    ],
    "26554": [
        "FAIRMONT",
        "WV"
    ],
    "26555": [
        "FAIRMONT",
        "WV"
    ],
    "26559": [
        "BARRACKVILLE",
        "WV"
    ],
    "26560": [
        "BAXTER",
        "WV"
    ],
    "26562": [
        "BURTON",
        "WV"
    ],
    "26568": [
        "ENTERPRISE",
        "WV"
    ],
    "26570": [
        "FAIRVIEW",
        "WV"
    ],
    "26571": [
        "FARMINGTON",
        "WV"
    ],
    "26574": [
        "GRANT TOWN",
        "WV"
    ],
    "26575": [
        "HUNDRED",
        "WV"
    ],
    "26576": [
        "IDAMAY",
        "WV"
    ],
    "26578": [
        "KINGMONT",
        "WV"
    ],
    "26581": [
        "LITTLETON",
        "WV"
    ],
    "26582": [
        "MANNINGTON",
        "WV"
    ],
    "26585": [
        "METZ",
        "WV"
    ],
    "26586": [
        "MONTANA MINES",
        "WV"
    ],
    "26587": [
        "RACHEL",
        "WV"
    ],
    "26588": [
        "RIVESVILLE",
        "WV"
    ],
    "26590": [
        "WANA",
        "WV"
    ],
    "26591": [
        "WORTHINGTON",
        "WV"
    ],
    "26601": [
        "SUTTON",
        "WV"
    ],
    "26610": [
        "BIRCH RIVER",
        "WV"
    ],
    "26611": [
        "CEDARVILLE",
        "WV"
    ],
    "26615": [
        "COPEN",
        "WV"
    ],
    "26619": [
        "EXCHANGE",
        "WV"
    ],
    "26621": [
        "FLATWOODS",
        "WV"
    ],
    "26623": [
        "FRAMETOWN",
        "WV"
    ],
    "26624": [
        "GASSAWAY",
        "WV"
    ],
    "26627": [
        "HEATERS",
        "WV"
    ],
    "26629": [
        "LITTLE BIRCH",
        "WV"
    ],
    "26636": [
        "ROSEDALE",
        "WV"
    ],
    "26638": [
        "SHOCK",
        "WV"
    ],
    "26651": [
        "SUMMERSVILLE",
        "WV"
    ],
    "26656": [
        "BELVA",
        "WV"
    ],
    "26660": [
        "CALVIN",
        "WV"
    ],
    "26662": [
        "CANVAS",
        "WV"
    ],
    "26667": [
        "DRENNEN",
        "WV"
    ],
    "26671": [
        "GILBOA",
        "WV"
    ],
    "26675": [
        "KESLERS CROSS LANES",
        "WV"
    ],
    "26676": [
        "LEIVASY",
        "WV"
    ],
    "26678": [
        "MOUNT LOOKOUT",
        "WV"
    ],
    "26679": [
        "MOUNT NEBO",
        "WV"
    ],
    "26680": [
        "NALLEN",
        "WV"
    ],
    "26681": [
        "NETTIE",
        "WV"
    ],
    "26684": [
        "POOL",
        "WV"
    ],
    "26690": [
        "SWISS",
        "WV"
    ],
    "26704": [
        "AUGUSTA",
        "WV"
    ],
    "26705": [
        "AURORA",
        "WV"
    ],
    "26707": [
        "BAYARD",
        "WV"
    ],
    "26710": [
        "BURLINGTON",
        "WV"
    ],
    "26711": [
        "CAPON BRIDGE",
        "WV"
    ],
    "26714": [
        "DELRAY",
        "WV"
    ],
    "26716": [
        "EGLON",
        "WV"
    ],
    "26717": [
        "ELK GARDEN",
        "WV"
    ],
    "26719": [
        "FORT ASHBY",
        "WV"
    ],
    "26720": [
        "GORMANIA",
        "WV"
    ],
    "26722": [
        "GREEN SPRING",
        "WV"
    ],
    "26726": [
        "KEYSER",
        "WV"
    ],
    "26731": [
        "LAHMANSVILLE",
        "WV"
    ],
    "26739": [
        "MOUNT STORM",
        "WV"
    ],
    "26743": [
        "NEW CREEK",
        "WV"
    ],
    "26750": [
        "PIEDMONT",
        "WV"
    ],
    "26753": [
        "RIDGELEY",
        "WV"
    ],
    "26755": [
        "RIO",
        "WV"
    ],
    "26757": [
        "ROMNEY",
        "WV"
    ],
    "26761": [
        "SHANKS",
        "WV"
    ],
    "26763": [
        "SPRINGFIELD",
        "WV"
    ],
    "26764": [
        "TERRA ALTA",
        "WV"
    ],
    "26767": [
        "WILEY FORD",
        "WV"
    ],
    "26801": [
        "BAKER",
        "WV"
    ],
    "26802": [
        "BRANDYWINE",
        "WV"
    ],
    "26804": [
        "CIRCLEVILLE",
        "WV"
    ],
    "26807": [
        "FRANKLIN",
        "WV"
    ],
    "26808": [
        "HIGH VIEW",
        "WV"
    ],
    "26810": [
        "LOST CITY",
        "WV"
    ],
    "26812": [
        "MATHIAS",
        "WV"
    ],
    "26814": [
        "RIVERTON",
        "WV"
    ],
    "26815": [
        "SUGAR GROVE",
        "WV"
    ],
    "26817": [
        "BLOOMERY",
        "WV"
    ],
    "26818": [
        "FISHER",
        "WV"
    ],
    "26823": [
        "CAPON SPRINGS",
        "WV"
    ],
    "26833": [
        "MAYSVILLE",
        "WV"
    ],
    "26836": [
        "MOOREFIELD",
        "WV"
    ],
    "26845": [
        "OLD FIELDS",
        "WV"
    ],
    "26847": [
        "PETERSBURG",
        "WV"
    ],
    "26851": [
        "WARDENSVILLE",
        "WV"
    ],
    "26852": [
        "PURGITSVILLE",
        "WV"
    ],
    "26855": [
        "CABINS",
        "WV"
    ],
    "26865": [
        "YELLOW SPRING",
        "WV"
    ],
    "26866": [
        "UPPER TRACT",
        "WV"
    ],
    "26884": [
        "SENECA ROCKS",
        "WV"
    ],
    "26886": [
        "ONEGO",
        "WV"
    ],
    "27006": [
        "ADVANCE",
        "NC"
    ],
    "27007": [
        "ARARAT",
        "NC"
    ],
    "27009": [
        "BELEWS CREEK",
        "NC"
    ],
    "27010": [
        "BETHANIA",
        "NC"
    ],
    "27011": [
        "BOONVILLE",
        "NC"
    ],
    "27012": [
        "CLEMMONS",
        "NC"
    ],
    "27013": [
        "CLEVELAND",
        "NC"
    ],
    "27014": [
        "COOLEEMEE",
        "NC"
    ],
    "27016": [
        "DANBURY",
        "NC"
    ],
    "27017": [
        "DOBSON",
        "NC"
    ],
    "27018": [
        "EAST BEND",
        "NC"
    ],
    "27019": [
        "GERMANTON",
        "NC"
    ],
    "27020": [
        "HAMPTONVILLE",
        "NC"
    ],
    "27021": [
        "KING",
        "NC"
    ],
    "27022": [
        "LAWSONVILLE",
        "NC"
    ],
    "27023": [
        "LEWISVILLE",
        "NC"
    ],
    "27024": [
        "LOWGAP",
        "NC"
    ],
    "27025": [
        "MADISON",
        "NC"
    ],
    "27027": [
        "MAYODAN",
        "NC"
    ],
    "27028": [
        "MOCKSVILLE",
        "NC"
    ],
    "27030": [
        "MOUNT AIRY",
        "NC"
    ],
    "27031": [
        "WHITE PLAINS",
        "NC"
    ],
    "27040": [
        "PFAFFTOWN",
        "NC"
    ],
    "27041": [
        "PILOT MOUNTAIN",
        "NC"
    ],
    "27042": [
        "PINE HALL",
        "NC"
    ],
    "27043": [
        "PINNACLE",
        "NC"
    ],
    "27045": [
        "RURAL HALL",
        "NC"
    ],
    "27046": [
        "SANDY RIDGE",
        "NC"
    ],
    "27047": [
        "SILOAM",
        "NC"
    ],
    "27048": [
        "STONEVILLE",
        "NC"
    ],
    "27049": [
        "TOAST",
        "NC"
    ],
    "27050": [
        "TOBACCOVILLE",
        "NC"
    ],
    "27051": [
        "WALKERTOWN",
        "NC"
    ],
    "27052": [
        "WALNUT COVE",
        "NC"
    ],
    "27053": [
        "WESTFIELD",
        "NC"
    ],
    "27054": [
        "WOODLEAF",
        "NC"
    ],
    "27055": [
        "YADKINVILLE",
        "NC"
    ],
    "27094": [
        "RURAL HALL",
        "NC"
    ],
    "27101": [
        "WINSTON SALEM",
        "NC"
    ],
    "27102": [
        "WINSTON SALEM",
        "NC"
    ],
    "27103": [
        "WINSTON SALEM",
        "NC"
    ],
    "27104": [
        "WINSTON SALEM",
        "NC"
    ],
    "27105": [
        "WINSTON SALEM",
        "NC"
    ],
    "27106": [
        "WINSTON SALEM",
        "NC"
    ],
    "27107": [
        "WINSTON SALEM",
        "NC"
    ],
    "27108": [
        "WINSTON SALEM",
        "NC"
    ],
    "27109": [
        "WINSTON SALEM",
        "NC"
    ],
    "27110": [
        "WINSTON SALEM",
        "NC"
    ],
    "27113": [
        "WINSTON SALEM",
        "NC"
    ],
    "27114": [
        "WINSTON SALEM",
        "NC"
    ],
    "27115": [
        "WINSTON SALEM",
        "NC"
    ],
    "27116": [
        "WINSTON SALEM",
        "NC"
    ],
    "27117": [
        "WINSTON SALEM",
        "NC"
    ],
    "27120": [
        "WINSTON SALEM",
        "NC"
    ],
    "27127": [
        "WINSTON SALEM",
        "NC"
    ],
    "27150": [
        "WINSTON SALEM",
        "NC"
    ],
    "27152": [
        "WINSTON SALEM",
        "NC"
    ],
    "27155": [
        "WINSTON SALEM",
        "NC"
    ],
    "27157": [
        "WINSTON SALEM",
        "NC"
    ],
    "27199": [
        "WINSTON SALEM",
        "NC"
    ],
    "27201": [
        "ALAMANCE",
        "NC"
    ],
    "27202": [
        "ALTAMAHAW",
        "NC"
    ],
    "27203": [
        "ASHEBORO",
        "NC"
    ],
    "27204": [
        "ASHEBORO",
        "NC"
    ],
    "27205": [
        "ASHEBORO",
        "NC"
    ],
    "27207": [
        "BEAR CREEK",
        "NC"
    ],
    "27208": [
        "BENNETT",
        "NC"
    ],
    "27209": [
        "BISCOE",
        "NC"
    ],
    "27212": [
        "BLANCH",
        "NC"
    ],
    "27213": [
        "BONLEE",
        "NC"
    ],
    "27214": [
        "BROWNS SUMMIT",
        "NC"
    ],
    "27215": [
        "BURLINGTON",
        "NC"
    ],
    "27216": [
        "BURLINGTON",
        "NC"
    ],
    "27217": [
        "BURLINGTON",
        "NC"
    ],
    "27229": [
        "CANDOR",
        "NC"
    ],
    "27230": [
        "CEDAR FALLS",
        "NC"
    ],
    "27231": [
        "CEDAR GROVE",
        "NC"
    ],
    "27233": [
        "CLIMAX",
        "NC"
    ],
    "27235": [
        "COLFAX",
        "NC"
    ],
    "27237": [
        "CUMNOCK",
        "NC"
    ],
    "27239": [
        "DENTON",
        "NC"
    ],
    "27242": [
        "EAGLE SPRINGS",
        "NC"
    ],
    "27243": [
        "EFLAND",
        "NC"
    ],
    "27244": [
        "ELON",
        "NC"
    ],
    "27247": [
        "ETHER",
        "NC"
    ],
    "27248": [
        "FRANKLINVILLE",
        "NC"
    ],
    "27249": [
        "GIBSONVILLE",
        "NC"
    ],
    "27252": [
        "GOLDSTON",
        "NC"
    ],
    "27253": [
        "GRAHAM",
        "NC"
    ],
    "27256": [
        "GULF",
        "NC"
    ],
    "27258": [
        "HAW RIVER",
        "NC"
    ],
    "27259": [
        "HIGHFALLS",
        "NC"
    ],
    "27260": [
        "HIGH POINT",
        "NC"
    ],
    "27261": [
        "HIGH POINT",
        "NC"
    ],
    "27262": [
        "HIGH POINT",
        "NC"
    ],
    "27263": [
        "HIGH POINT",
        "NC"
    ],
    "27264": [
        "HIGH POINT",
        "NC"
    ],
    "27265": [
        "HIGH POINT",
        "NC"
    ],
    "27278": [
        "HILLSBOROUGH",
        "NC"
    ],
    "27281": [
        "JACKSON SPRINGS",
        "NC"
    ],
    "27282": [
        "JAMESTOWN",
        "NC"
    ],
    "27283": [
        "JULIAN",
        "NC"
    ],
    "27284": [
        "KERNERSVILLE",
        "NC"
    ],
    "27285": [
        "KERNERSVILLE",
        "NC"
    ],
    "27288": [
        "EDEN",
        "NC"
    ],
    "27289": [
        "EDEN",
        "NC"
    ],
    "27291": [
        "LEASBURG",
        "NC"
    ],
    "27292": [
        "LEXINGTON",
        "NC"
    ],
    "27293": [
        "LEXINGTON",
        "NC"
    ],
    "27295": [
        "LEXINGTON",
        "NC"
    ],
    "27298": [
        "LIBERTY",
        "NC"
    ],
    "27299": [
        "LINWOOD",
        "NC"
    ],
    "27301": [
        "MC LEANSVILLE",
        "NC"
    ],
    "27302": [
        "MEBANE",
        "NC"
    ],
    "27305": [
        "MILTON",
        "NC"
    ],
    "27306": [
        "MOUNT GILEAD",
        "NC"
    ],
    "27310": [
        "OAK RIDGE",
        "NC"
    ],
    "27311": [
        "PELHAM",
        "NC"
    ],
    "27312": [
        "PITTSBORO",
        "NC"
    ],
    "27313": [
        "PLEASANT GARDEN",
        "NC"
    ],
    "27314": [
        "PROSPECT HILL",
        "NC"
    ],
    "27315": [
        "PROVIDENCE",
        "NC"
    ],
    "27316": [
        "RAMSEUR",
        "NC"
    ],
    "27317": [
        "RANDLEMAN",
        "NC"
    ],
    "27320": [
        "REIDSVILLE",
        "NC"
    ],
    "27323": [
        "REIDSVILLE",
        "NC"
    ],
    "27325": [
        "ROBBINS",
        "NC"
    ],
    "27326": [
        "RUFFIN",
        "NC"
    ],
    "27330": [
        "SANFORD",
        "NC"
    ],
    "27331": [
        "SANFORD",
        "NC"
    ],
    "27332": [
        "SANFORD",
        "NC"
    ],
    "27340": [
        "SAXAPAHAW",
        "NC"
    ],
    "27341": [
        "SEAGROVE",
        "NC"
    ],
    "27342": [
        "SEDALIA",
        "NC"
    ],
    "27343": [
        "SEMORA",
        "NC"
    ],
    "27344": [
        "SILER CITY",
        "NC"
    ],
    "27349": [
        "SNOW CAMP",
        "NC"
    ],
    "27350": [
        "SOPHIA",
        "NC"
    ],
    "27351": [
        "SOUTHMONT",
        "NC"
    ],
    "27355": [
        "STALEY",
        "NC"
    ],
    "27356": [
        "STAR",
        "NC"
    ],
    "27357": [
        "STOKESDALE",
        "NC"
    ],
    "27358": [
        "SUMMERFIELD",
        "NC"
    ],
    "27359": [
        "SWEPSONVILLE",
        "NC"
    ],
    "27360": [
        "THOMASVILLE",
        "NC"
    ],
    "27361": [
        "THOMASVILLE",
        "NC"
    ],
    "27370": [
        "TRINITY",
        "NC"
    ],
    "27371": [
        "TROY",
        "NC"
    ],
    "27373": [
        "WALLBURG",
        "NC"
    ],
    "27374": [
        "WELCOME",
        "NC"
    ],
    "27375": [
        "WENTWORTH",
        "NC"
    ],
    "27376": [
        "WEST END",
        "NC"
    ],
    "27377": [
        "WHITSETT",
        "NC"
    ],
    "27379": [
        "YANCEYVILLE",
        "NC"
    ],
    "27401": [
        "GREENSBORO",
        "NC"
    ],
    "27402": [
        "GREENSBORO",
        "NC"
    ],
    "27403": [
        "GREENSBORO",
        "NC"
    ],
    "27404": [
        "GREENSBORO",
        "NC"
    ],
    "27405": [
        "GREENSBORO",
        "NC"
    ],
    "27406": [
        "GREENSBORO",
        "NC"
    ],
    "27407": [
        "GREENSBORO",
        "NC"
    ],
    "27408": [
        "GREENSBORO",
        "NC"
    ],
    "27409": [
        "GREENSBORO",
        "NC"
    ],
    "27410": [
        "GREENSBORO",
        "NC"
    ],
    "27411": [
        "GREENSBORO",
        "NC"
    ],
    "27412": [
        "GREENSBORO",
        "NC"
    ],
    "27415": [
        "GREENSBORO",
        "NC"
    ],
    "27416": [
        "GREENSBORO",
        "NC"
    ],
    "27417": [
        "GREENSBORO",
        "NC"
    ],
    "27419": [
        "GREENSBORO",
        "NC"
    ],
    "27420": [
        "GREENSBORO",
        "NC"
    ],
    "27425": [
        "GREENSBORO",
        "NC"
    ],
    "27427": [
        "GREENSBORO",
        "NC"
    ],
    "27429": [
        "GREENSBORO",
        "NC"
    ],
    "27435": [
        "GREENSBORO",
        "NC"
    ],
    "27438": [
        "GREENSBORO",
        "NC"
    ],
    "27455": [
        "GREENSBORO",
        "NC"
    ],
    "27495": [
        "GREENSBORO",
        "NC"
    ],
    "27497": [
        "GREENSBORO",
        "NC"
    ],
    "27501": [
        "ANGIER",
        "NC"
    ],
    "27502": [
        "APEX",
        "NC"
    ],
    "27503": [
        "BAHAMA",
        "NC"
    ],
    "27504": [
        "BENSON",
        "NC"
    ],
    "27505": [
        "BROADWAY",
        "NC"
    ],
    "27506": [
        "BUIES CREEK",
        "NC"
    ],
    "27507": [
        "BULLOCK",
        "NC"
    ],
    "27508": [
        "BUNN",
        "NC"
    ],
    "27509": [
        "BUTNER",
        "NC"
    ],
    "27510": [
        "CARRBORO",
        "NC"
    ],
    "27511": [
        "CARY",
        "NC"
    ],
    "27512": [
        "CARY",
        "NC"
    ],
    "27513": [
        "CARY",
        "NC"
    ],
    "27514": [
        "CHAPEL HILL",
        "NC"
    ],
    "27515": [
        "CHAPEL HILL",
        "NC"
    ],
    "27516": [
        "CHAPEL HILL",
        "NC"
    ],
    "27517": [
        "CHAPEL HILL",
        "NC"
    ],
    "27518": [
        "CARY",
        "NC"
    ],
    "27519": [
        "CARY",
        "NC"
    ],
    "27520": [
        "CLAYTON",
        "NC"
    ],
    "27521": [
        "COATS",
        "NC"
    ],
    "27522": [
        "CREEDMOOR",
        "NC"
    ],
    "27523": [
        "APEX",
        "NC"
    ],
    "27524": [
        "FOUR OAKS",
        "NC"
    ],
    "27525": [
        "FRANKLINTON",
        "NC"
    ],
    "27526": [
        "FUQUAY VARINA",
        "NC"
    ],
    "27527": [
        "CLAYTON",
        "NC"
    ],
    "27528": [
        "CLAYTON",
        "NC"
    ],
    "27529": [
        "GARNER",
        "NC"
    ],
    "27530": [
        "GOLDSBORO",
        "NC"
    ],
    "27531": [
        "GOLDSBORO",
        "NC"
    ],
    "27532": [
        "GOLDSBORO",
        "NC"
    ],
    "27533": [
        "GOLDSBORO",
        "NC"
    ],
    "27534": [
        "GOLDSBORO",
        "NC"
    ],
    "27536": [
        "HENDERSON",
        "NC"
    ],
    "27537": [
        "HENDERSON",
        "NC"
    ],
    "27539": [
        "APEX",
        "NC"
    ],
    "27540": [
        "HOLLY SPRINGS",
        "NC"
    ],
    "27541": [
        "HURDLE MILLS",
        "NC"
    ],
    "27542": [
        "KENLY",
        "NC"
    ],
    "27543": [
        "KIPLING",
        "NC"
    ],
    "27544": [
        "KITTRELL",
        "NC"
    ],
    "27545": [
        "KNIGHTDALE",
        "NC"
    ],
    "27546": [
        "LILLINGTON",
        "NC"
    ],
    "27549": [
        "LOUISBURG",
        "NC"
    ],
    "27551": [
        "MACON",
        "NC"
    ],
    "27552": [
        "MAMERS",
        "NC"
    ],
    "27553": [
        "MANSON",
        "NC"
    ],
    "27555": [
        "MICRO",
        "NC"
    ],
    "27556": [
        "MIDDLEBURG",
        "NC"
    ],
    "27557": [
        "MIDDLESEX",
        "NC"
    ],
    "27559": [
        "MONCURE",
        "NC"
    ],
    "27560": [
        "MORRISVILLE",
        "NC"
    ],
    "27562": [
        "NEW HILL",
        "NC"
    ],
    "27563": [
        "NORLINA",
        "NC"
    ],
    "27565": [
        "OXFORD",
        "NC"
    ],
    "27568": [
        "PINE LEVEL",
        "NC"
    ],
    "27569": [
        "PRINCETON",
        "NC"
    ],
    "27570": [
        "RIDGEWAY",
        "NC"
    ],
    "27571": [
        "ROLESVILLE",
        "NC"
    ],
    "27572": [
        "ROUGEMONT",
        "NC"
    ],
    "27573": [
        "ROXBORO",
        "NC"
    ],
    "27574": [
        "ROXBORO",
        "NC"
    ],
    "27576": [
        "SELMA",
        "NC"
    ],
    "27577": [
        "SMITHFIELD",
        "NC"
    ],
    "27581": [
        "STEM",
        "NC"
    ],
    "27582": [
        "STOVALL",
        "NC"
    ],
    "27583": [
        "TIMBERLAKE",
        "NC"
    ],
    "27584": [
        "TOWNSVILLE",
        "NC"
    ],
    "27586": [
        "VAUGHAN",
        "NC"
    ],
    "27587": [
        "WAKE FOREST",
        "NC"
    ],
    "27588": [
        "WAKE FOREST",
        "NC"
    ],
    "27589": [
        "WARRENTON",
        "NC"
    ],
    "27591": [
        "WENDELL",
        "NC"
    ],
    "27592": [
        "WILLOW SPRING",
        "NC"
    ],
    "27593": [
        "WILSONS MILLS",
        "NC"
    ],
    "27594": [
        "WISE",
        "NC"
    ],
    "27596": [
        "YOUNGSVILLE",
        "NC"
    ],
    "27597": [
        "ZEBULON",
        "NC"
    ],
    "27599": [
        "CHAPEL HILL",
        "NC"
    ],
    "27601": [
        "RALEIGH",
        "NC"
    ],
    "27602": [
        "RALEIGH",
        "NC"
    ],
    "27603": [
        "RALEIGH",
        "NC"
    ],
    "27604": [
        "RALEIGH",
        "NC"
    ],
    "27605": [
        "RALEIGH",
        "NC"
    ],
    "27606": [
        "RALEIGH",
        "NC"
    ],
    "27607": [
        "RALEIGH",
        "NC"
    ],
    "27608": [
        "RALEIGH",
        "NC"
    ],
    "27609": [
        "RALEIGH",
        "NC"
    ],
    "27610": [
        "RALEIGH",
        "NC"
    ],
    "27611": [
        "RALEIGH",
        "NC"
    ],
    "27612": [
        "RALEIGH",
        "NC"
    ],
    "27613": [
        "RALEIGH",
        "NC"
    ],
    "27614": [
        "RALEIGH",
        "NC"
    ],
    "27615": [
        "RALEIGH",
        "NC"
    ],
    "27616": [
        "RALEIGH",
        "NC"
    ],
    "27617": [
        "RALEIGH",
        "NC"
    ],
    "27619": [
        "RALEIGH",
        "NC"
    ],
    "27620": [
        "RALEIGH",
        "NC"
    ],
    "27622": [
        "RALEIGH",
        "NC"
    ],
    "27623": [
        "RALEIGH",
        "NC"
    ],
    "27624": [
        "RALEIGH",
        "NC"
    ],
    "27625": [
        "RALEIGH",
        "NC"
    ],
    "27627": [
        "RALEIGH",
        "NC"
    ],
    "27628": [
        "RALEIGH",
        "NC"
    ],
    "27629": [
        "RALEIGH",
        "NC"
    ],
    "27635": [
        "RALEIGH",
        "NC"
    ],
    "27636": [
        "RALEIGH",
        "NC"
    ],
    "27650": [
        "RALEIGH",
        "NC"
    ],
    "27656": [
        "RALEIGH",
        "NC"
    ],
    "27658": [
        "RALEIGH",
        "NC"
    ],
    "27661": [
        "RALEIGH",
        "NC"
    ],
    "27668": [
        "RALEIGH",
        "NC"
    ],
    "27675": [
        "RALEIGH",
        "NC"
    ],
    "27676": [
        "RALEIGH",
        "NC"
    ],
    "27695": [
        "RALEIGH",
        "NC"
    ],
    "27697": [
        "RALEIGH",
        "NC"
    ],
    "27699": [
        "RALEIGH",
        "NC"
    ],
    "27701": [
        "DURHAM",
        "NC"
    ],
    "27702": [
        "DURHAM",
        "NC"
    ],
    "27703": [
        "DURHAM",
        "NC"
    ],
    "27704": [
        "DURHAM",
        "NC"
    ],
    "27705": [
        "DURHAM",
        "NC"
    ],
    "27706": [
        "DURHAM",
        "NC"
    ],
    "27707": [
        "DURHAM",
        "NC"
    ],
    "27708": [
        "DURHAM",
        "NC"
    ],
    "27709": [
        "DURHAM",
        "NC"
    ],
    "27710": [
        "DURHAM",
        "NC"
    ],
    "27711": [
        "DURHAM",
        "NC"
    ],
    "27712": [
        "DURHAM",
        "NC"
    ],
    "27713": [
        "DURHAM",
        "NC"
    ],
    "27715": [
        "DURHAM",
        "NC"
    ],
    "27717": [
        "DURHAM",
        "NC"
    ],
    "27722": [
        "DURHAM",
        "NC"
    ],
    "27801": [
        "ROCKY MOUNT",
        "NC"
    ],
    "27802": [
        "ROCKY MOUNT",
        "NC"
    ],
    "27803": [
        "ROCKY MOUNT",
        "NC"
    ],
    "27804": [
        "ROCKY MOUNT",
        "NC"
    ],
    "27805": [
        "AULANDER",
        "NC"
    ],
    "27806": [
        "AURORA",
        "NC"
    ],
    "27807": [
        "BAILEY",
        "NC"
    ],
    "27808": [
        "BATH",
        "NC"
    ],
    "27809": [
        "BATTLEBORO",
        "NC"
    ],
    "27810": [
        "BELHAVEN",
        "NC"
    ],
    "27811": [
        "BELLARTHUR",
        "NC"
    ],
    "27812": [
        "BETHEL",
        "NC"
    ],
    "27813": [
        "BLACK CREEK",
        "NC"
    ],
    "27814": [
        "BLOUNTS CREEK",
        "NC"
    ],
    "27816": [
        "CASTALIA",
        "NC"
    ],
    "27817": [
        "CHOCOWINITY",
        "NC"
    ],
    "27818": [
        "COMO",
        "NC"
    ],
    "27819": [
        "CONETOE",
        "NC"
    ],
    "27820": [
        "CONWAY",
        "NC"
    ],
    "27821": [
        "EDWARD",
        "NC"
    ],
    "27822": [
        "ELM CITY",
        "NC"
    ],
    "27823": [
        "ENFIELD",
        "NC"
    ],
    "27824": [
        "ENGELHARD",
        "NC"
    ],
    "27825": [
        "EVERETTS",
        "NC"
    ],
    "27826": [
        "FAIRFIELD",
        "NC"
    ],
    "27827": [
        "FALKLAND",
        "NC"
    ],
    "27828": [
        "FARMVILLE",
        "NC"
    ],
    "27829": [
        "FOUNTAIN",
        "NC"
    ],
    "27830": [
        "FREMONT",
        "NC"
    ],
    "27831": [
        "GARYSBURG",
        "NC"
    ],
    "27832": [
        "GASTON",
        "NC"
    ],
    "27833": [
        "GREENVILLE",
        "NC"
    ],
    "27834": [
        "GREENVILLE",
        "NC"
    ],
    "27835": [
        "GREENVILLE",
        "NC"
    ],
    "27836": [
        "GREENVILLE",
        "NC"
    ],
    "27837": [
        "GRIMESLAND",
        "NC"
    ],
    "27839": [
        "HALIFAX",
        "NC"
    ],
    "27840": [
        "HAMILTON",
        "NC"
    ],
    "27841": [
        "HASSELL",
        "NC"
    ],
    "27842": [
        "HENRICO",
        "NC"
    ],
    "27843": [
        "HOBGOOD",
        "NC"
    ],
    "27844": [
        "HOLLISTER",
        "NC"
    ],
    "27845": [
        "JACKSON",
        "NC"
    ],
    "27846": [
        "JAMESVILLE",
        "NC"
    ],
    "27847": [
        "KELFORD",
        "NC"
    ],
    "27849": [
        "LEWISTON WOODVILLE",
        "NC"
    ],
    "27850": [
        "LITTLETON",
        "NC"
    ],
    "27851": [
        "LUCAMA",
        "NC"
    ],
    "27852": [
        "MACCLESFIELD",
        "NC"
    ],
    "27853": [
        "MARGARETTSVILLE",
        "NC"
    ],
    "27855": [
        "MURFREESBORO",
        "NC"
    ],
    "27856": [
        "NASHVILLE",
        "NC"
    ],
    "27857": [
        "OAK CITY",
        "NC"
    ],
    "27858": [
        "GREENVILLE",
        "NC"
    ],
    "27860": [
        "PANTEGO",
        "NC"
    ],
    "27862": [
        "PENDLETON",
        "NC"
    ],
    "27863": [
        "PIKEVILLE",
        "NC"
    ],
    "27864": [
        "PINETOPS",
        "NC"
    ],
    "27865": [
        "PINETOWN",
        "NC"
    ],
    "27866": [
        "PLEASANT HILL",
        "NC"
    ],
    "27867": [
        "POTECASI",
        "NC"
    ],
    "27868": [
        "RED OAK",
        "NC"
    ],
    "27869": [
        "RICH SQUARE",
        "NC"
    ],
    "27870": [
        "ROANOKE RAPIDS",
        "NC"
    ],
    "27871": [
        "ROBERSONVILLE",
        "NC"
    ],
    "27872": [
        "ROXOBEL",
        "NC"
    ],
    "27873": [
        "SARATOGA",
        "NC"
    ],
    "27874": [
        "SCOTLAND NECK",
        "NC"
    ],
    "27875": [
        "SCRANTON",
        "NC"
    ],
    "27876": [
        "SEABOARD",
        "NC"
    ],
    "27877": [
        "SEVERN",
        "NC"
    ],
    "27878": [
        "SHARPSBURG",
        "NC"
    ],
    "27879": [
        "SIMPSON",
        "NC"
    ],
    "27880": [
        "SIMS",
        "NC"
    ],
    "27881": [
        "SPEED",
        "NC"
    ],
    "27882": [
        "SPRING HOPE",
        "NC"
    ],
    "27883": [
        "STANTONSBURG",
        "NC"
    ],
    "27884": [
        "STOKES",
        "NC"
    ],
    "27885": [
        "SWANQUARTER",
        "NC"
    ],
    "27886": [
        "TARBORO",
        "NC"
    ],
    "27887": [
        "TILLERY",
        "NC"
    ],
    "27888": [
        "WALSTONBURG",
        "NC"
    ],
    "27889": [
        "WASHINGTON",
        "NC"
    ],
    "27890": [
        "WELDON",
        "NC"
    ],
    "27891": [
        "WHITAKERS",
        "NC"
    ],
    "27892": [
        "WILLIAMSTON",
        "NC"
    ],
    "27893": [
        "WILSON",
        "NC"
    ],
    "27894": [
        "WILSON",
        "NC"
    ],
    "27895": [
        "WILSON",
        "NC"
    ],
    "27896": [
        "WILSON",
        "NC"
    ],
    "27897": [
        "WOODLAND",
        "NC"
    ],
    "27906": [
        "ELIZABETH CITY",
        "NC"
    ],
    "27907": [
        "ELIZABETH CITY",
        "NC"
    ],
    "27909": [
        "ELIZABETH CITY",
        "NC"
    ],
    "27910": [
        "AHOSKIE",
        "NC"
    ],
    "27915": [
        "AVON",
        "NC"
    ],
    "27916": [
        "AYDLETT",
        "NC"
    ],
    "27917": [
        "BARCO",
        "NC"
    ],
    "27919": [
        "BELVIDERE",
        "NC"
    ],
    "27920": [
        "BUXTON",
        "NC"
    ],
    "27921": [
        "CAMDEN",
        "NC"
    ],
    "27922": [
        "COFIELD",
        "NC"
    ],
    "27923": [
        "COINJOCK",
        "NC"
    ],
    "27924": [
        "COLERAIN",
        "NC"
    ],
    "27925": [
        "COLUMBIA",
        "NC"
    ],
    "27926": [
        "CORAPEAKE",
        "NC"
    ],
    "27927": [
        "COROLLA",
        "NC"
    ],
    "27928": [
        "CRESWELL",
        "NC"
    ],
    "27929": [
        "CURRITUCK",
        "NC"
    ],
    "27930": [
        "DURANTS NECK",
        "NC"
    ],
    "27932": [
        "EDENTON",
        "NC"
    ],
    "27935": [
        "EURE",
        "NC"
    ],
    "27936": [
        "FRISCO",
        "NC"
    ],
    "27937": [
        "GATES",
        "NC"
    ],
    "27938": [
        "GATESVILLE",
        "NC"
    ],
    "27939": [
        "GRANDY",
        "NC"
    ],
    "27941": [
        "HARBINGER",
        "NC"
    ],
    "27942": [
        "HARRELLSVILLE",
        "NC"
    ],
    "27943": [
        "HATTERAS",
        "NC"
    ],
    "27944": [
        "HERTFORD",
        "NC"
    ],
    "27946": [
        "HOBBSVILLE",
        "NC"
    ],
    "27947": [
        "JARVISBURG",
        "NC"
    ],
    "27948": [
        "KILL DEVIL HILLS",
        "NC"
    ],
    "27949": [
        "KITTY HAWK",
        "NC"
    ],
    "27950": [
        "KNOTTS ISLAND",
        "NC"
    ],
    "27953": [
        "MANNS HARBOR",
        "NC"
    ],
    "27954": [
        "MANTEO",
        "NC"
    ],
    "27956": [
        "MAPLE",
        "NC"
    ],
    "27957": [
        "MERRY HILL",
        "NC"
    ],
    "27958": [
        "MOYOCK",
        "NC"
    ],
    "27959": [
        "NAGS HEAD",
        "NC"
    ],
    "27960": [
        "OCRACOKE",
        "NC"
    ],
    "27962": [
        "PLYMOUTH",
        "NC"
    ],
    "27964": [
        "POINT HARBOR",
        "NC"
    ],
    "27965": [
        "POPLAR BRANCH",
        "NC"
    ],
    "27966": [
        "POWELLS POINT",
        "NC"
    ],
    "27967": [
        "POWELLSVILLE",
        "NC"
    ],
    "27968": [
        "RODANTHE",
        "NC"
    ],
    "27970": [
        "ROPER",
        "NC"
    ],
    "27972": [
        "SALVO",
        "NC"
    ],
    "27973": [
        "SHAWBORO",
        "NC"
    ],
    "27974": [
        "SHILOH",
        "NC"
    ],
    "27976": [
        "SOUTH MILLS",
        "NC"
    ],
    "27978": [
        "STUMPY POINT",
        "NC"
    ],
    "27979": [
        "SUNBURY",
        "NC"
    ],
    "27980": [
        "TYNER",
        "NC"
    ],
    "27981": [
        "WANCHESE",
        "NC"
    ],
    "27982": [
        "WAVES",
        "NC"
    ],
    "27983": [
        "WINDSOR",
        "NC"
    ],
    "27985": [
        "WINFALL",
        "NC"
    ],
    "27986": [
        "WINTON",
        "NC"
    ],
    "28001": [
        "ALBEMARLE",
        "NC"
    ],
    "28002": [
        "ALBEMARLE",
        "NC"
    ],
    "28006": [
        "ALEXIS",
        "NC"
    ],
    "28007": [
        "ANSONVILLE",
        "NC"
    ],
    "28009": [
        "BADIN",
        "NC"
    ],
    "28010": [
        "BARIUM SPRINGS",
        "NC"
    ],
    "28012": [
        "BELMONT",
        "NC"
    ],
    "28016": [
        "BESSEMER CITY",
        "NC"
    ],
    "28017": [
        "BOILING SPRINGS",
        "NC"
    ],
    "28018": [
        "BOSTIC",
        "NC"
    ],
    "28019": [
        "CAROLEEN",
        "NC"
    ],
    "28020": [
        "CASAR",
        "NC"
    ],
    "28021": [
        "CHERRYVILLE",
        "NC"
    ],
    "28023": [
        "CHINA GROVE",
        "NC"
    ],
    "28024": [
        "CLIFFSIDE",
        "NC"
    ],
    "28025": [
        "CONCORD",
        "NC"
    ],
    "28026": [
        "CONCORD",
        "NC"
    ],
    "28027": [
        "CONCORD",
        "NC"
    ],
    "28031": [
        "CORNELIUS",
        "NC"
    ],
    "28032": [
        "CRAMERTON",
        "NC"
    ],
    "28033": [
        "CROUSE",
        "NC"
    ],
    "28034": [
        "DALLAS",
        "NC"
    ],
    "28035": [
        "DAVIDSON",
        "NC"
    ],
    "28036": [
        "DAVIDSON",
        "NC"
    ],
    "28037": [
        "DENVER",
        "NC"
    ],
    "28038": [
        "EARL",
        "NC"
    ],
    "28039": [
        "EAST SPENCER",
        "NC"
    ],
    "28040": [
        "ELLENBORO",
        "NC"
    ],
    "28041": [
        "FAITH",
        "NC"
    ],
    "28042": [
        "FALLSTON",
        "NC"
    ],
    "28043": [
        "FOREST CITY",
        "NC"
    ],
    "28052": [
        "GASTONIA",
        "NC"
    ],
    "28053": [
        "GASTONIA",
        "NC"
    ],
    "28054": [
        "GASTONIA",
        "NC"
    ],
    "28055": [
        "GASTONIA",
        "NC"
    ],
    "28056": [
        "GASTONIA",
        "NC"
    ],
    "28070": [
        "HUNTERSVILLE",
        "NC"
    ],
    "28071": [
        "GOLD HILL",
        "NC"
    ],
    "28072": [
        "GRANITE QUARRY",
        "NC"
    ],
    "28073": [
        "GROVER",
        "NC"
    ],
    "28074": [
        "HARRIS",
        "NC"
    ],
    "28075": [
        "HARRISBURG",
        "NC"
    ],
    "28076": [
        "HENRIETTA",
        "NC"
    ],
    "28077": [
        "HIGH SHOALS",
        "NC"
    ],
    "28078": [
        "HUNTERSVILLE",
        "NC"
    ],
    "28079": [
        "INDIAN TRAIL",
        "NC"
    ],
    "28080": [
        "IRON STATION",
        "NC"
    ],
    "28081": [
        "KANNAPOLIS",
        "NC"
    ],
    "28082": [
        "KANNAPOLIS",
        "NC"
    ],
    "28083": [
        "KANNAPOLIS",
        "NC"
    ],
    "28086": [
        "KINGS MOUNTAIN",
        "NC"
    ],
    "28088": [
        "LANDIS",
        "NC"
    ],
    "28089": [
        "LATTIMORE",
        "NC"
    ],
    "28090": [
        "LAWNDALE",
        "NC"
    ],
    "28091": [
        "LILESVILLE",
        "NC"
    ],
    "28092": [
        "LINCOLNTON",
        "NC"
    ],
    "28093": [
        "LINCOLNTON",
        "NC"
    ],
    "28097": [
        "LOCUST",
        "NC"
    ],
    "28098": [
        "LOWELL",
        "NC"
    ],
    "28101": [
        "MC ADENVILLE",
        "NC"
    ],
    "28102": [
        "MC FARLAN",
        "NC"
    ],
    "28103": [
        "MARSHVILLE",
        "NC"
    ],
    "28104": [
        "MATTHEWS",
        "NC"
    ],
    "28105": [
        "MATTHEWS",
        "NC"
    ],
    "28106": [
        "MATTHEWS",
        "NC"
    ],
    "28107": [
        "MIDLAND",
        "NC"
    ],
    "28108": [
        "MINERAL SPRINGS",
        "NC"
    ],
    "28109": [
        "MISENHEIMER",
        "NC"
    ],
    "28110": [
        "MONROE",
        "NC"
    ],
    "28111": [
        "MONROE",
        "NC"
    ],
    "28112": [
        "MONROE",
        "NC"
    ],
    "28114": [
        "MOORESBORO",
        "NC"
    ],
    "28115": [
        "MOORESVILLE",
        "NC"
    ],
    "28117": [
        "MOORESVILLE",
        "NC"
    ],
    "28119": [
        "MORVEN",
        "NC"
    ],
    "28120": [
        "MOUNT HOLLY",
        "NC"
    ],
    "28123": [
        "MOUNT MOURNE",
        "NC"
    ],
    "28124": [
        "MOUNT PLEASANT",
        "NC"
    ],
    "28125": [
        "MOUNT ULLA",
        "NC"
    ],
    "28126": [
        "NEWELL",
        "NC"
    ],
    "28127": [
        "NEW LONDON",
        "NC"
    ],
    "28128": [
        "NORWOOD",
        "NC"
    ],
    "28129": [
        "OAKBORO",
        "NC"
    ],
    "28130": [
        "PAW CREEK",
        "NC"
    ],
    "28133": [
        "PEACHLAND",
        "NC"
    ],
    "28134": [
        "PINEVILLE",
        "NC"
    ],
    "28135": [
        "POLKTON",
        "NC"
    ],
    "28136": [
        "POLKVILLE",
        "NC"
    ],
    "28137": [
        "RICHFIELD",
        "NC"
    ],
    "28138": [
        "ROCKWELL",
        "NC"
    ],
    "28139": [
        "RUTHERFORDTON",
        "NC"
    ],
    "28144": [
        "SALISBURY",
        "NC"
    ],
    "28145": [
        "SALISBURY",
        "NC"
    ],
    "28146": [
        "SALISBURY",
        "NC"
    ],
    "28147": [
        "SALISBURY",
        "NC"
    ],
    "28150": [
        "SHELBY",
        "NC"
    ],
    "28151": [
        "SHELBY",
        "NC"
    ],
    "28152": [
        "SHELBY",
        "NC"
    ],
    "28159": [
        "SPENCER",
        "NC"
    ],
    "28160": [
        "SPINDALE",
        "NC"
    ],
    "28163": [
        "STANFIELD",
        "NC"
    ],
    "28164": [
        "STANLEY",
        "NC"
    ],
    "28166": [
        "TROUTMAN",
        "NC"
    ],
    "28167": [
        "UNION MILLS",
        "NC"
    ],
    "28168": [
        "VALE",
        "NC"
    ],
    "28169": [
        "WACO",
        "NC"
    ],
    "28170": [
        "WADESBORO",
        "NC"
    ],
    "28173": [
        "WAXHAW",
        "NC"
    ],
    "28174": [
        "WINGATE",
        "NC"
    ],
    "28201": [
        "CHARLOTTE",
        "NC"
    ],
    "28202": [
        "CHARLOTTE",
        "NC"
    ],
    "28203": [
        "CHARLOTTE",
        "NC"
    ],
    "28204": [
        "CHARLOTTE",
        "NC"
    ],
    "28205": [
        "CHARLOTTE",
        "NC"
    ],
    "28206": [
        "CHARLOTTE",
        "NC"
    ],
    "28207": [
        "CHARLOTTE",
        "NC"
    ],
    "28208": [
        "CHARLOTTE",
        "NC"
    ],
    "28209": [
        "CHARLOTTE",
        "NC"
    ],
    "28210": [
        "CHARLOTTE",
        "NC"
    ],
    "28211": [
        "CHARLOTTE",
        "NC"
    ],
    "28212": [
        "CHARLOTTE",
        "NC"
    ],
    "28213": [
        "CHARLOTTE",
        "NC"
    ],
    "28214": [
        "CHARLOTTE",
        "NC"
    ],
    "28215": [
        "CHARLOTTE",
        "NC"
    ],
    "28216": [
        "CHARLOTTE",
        "NC"
    ],
    "28217": [
        "CHARLOTTE",
        "NC"
    ],
    "28218": [
        "CHARLOTTE",
        "NC"
    ],
    "28219": [
        "CHARLOTTE",
        "NC"
    ],
    "28220": [
        "CHARLOTTE",
        "NC"
    ],
    "28221": [
        "CHARLOTTE",
        "NC"
    ],
    "28222": [
        "CHARLOTTE",
        "NC"
    ],
    "28223": [
        "CHARLOTTE",
        "NC"
    ],
    "28224": [
        "CHARLOTTE",
        "NC"
    ],
    "28226": [
        "CHARLOTTE",
        "NC"
    ],
    "28227": [
        "CHARLOTTE",
        "NC"
    ],
    "28228": [
        "CHARLOTTE",
        "NC"
    ],
    "28229": [
        "CHARLOTTE",
        "NC"
    ],
    "28230": [
        "CHARLOTTE",
        "NC"
    ],
    "28231": [
        "CHARLOTTE",
        "NC"
    ],
    "28232": [
        "CHARLOTTE",
        "NC"
    ],
    "28233": [
        "CHARLOTTE",
        "NC"
    ],
    "28234": [
        "CHARLOTTE",
        "NC"
    ],
    "28235": [
        "CHARLOTTE",
        "NC"
    ],
    "28236": [
        "CHARLOTTE",
        "NC"
    ],
    "28237": [
        "CHARLOTTE",
        "NC"
    ],
    "28241": [
        "CHARLOTTE",
        "NC"
    ],
    "28244": [
        "CHARLOTTE",
        "NC"
    ],
    "28246": [
        "CHARLOTTE",
        "NC"
    ],
    "28247": [
        "CHARLOTTE",
        "NC"
    ],
    "28253": [
        "CHARLOTTE",
        "NC"
    ],
    "28254": [
        "CHARLOTTE",
        "NC"
    ],
    "28255": [
        "CHARLOTTE",
        "NC"
    ],
    "28256": [
        "CHARLOTTE",
        "NC"
    ],
    "28260": [
        "CHARLOTTE",
        "NC"
    ],
    "28262": [
        "CHARLOTTE",
        "NC"
    ],
    "28263": [
        "CHARLOTTE",
        "NC"
    ],
    "28265": [
        "CHARLOTTE",
        "NC"
    ],
    "28266": [
        "CHARLOTTE",
        "NC"
    ],
    "28269": [
        "CHARLOTTE",
        "NC"
    ],
    "28270": [
        "CHARLOTTE",
        "NC"
    ],
    "28271": [
        "CHARLOTTE",
        "NC"
    ],
    "28272": [
        "CHARLOTTE",
        "NC"
    ],
    "28273": [
        "CHARLOTTE",
        "NC"
    ],
    "28274": [
        "CHARLOTTE",
        "NC"
    ],
    "28277": [
        "CHARLOTTE",
        "NC"
    ],
    "28278": [
        "CHARLOTTE",
        "NC"
    ],
    "28280": [
        "CHARLOTTE",
        "NC"
    ],
    "28281": [
        "CHARLOTTE",
        "NC"
    ],
    "28282": [
        "CHARLOTTE",
        "NC"
    ],
    "28284": [
        "CHARLOTTE",
        "NC"
    ],
    "28285": [
        "CHARLOTTE",
        "NC"
    ],
    "28287": [
        "CHARLOTTE",
        "NC"
    ],
    "28288": [
        "CHARLOTTE",
        "NC"
    ],
    "28297": [
        "CHARLOTTE",
        "NC"
    ],
    "28299": [
        "CHARLOTTE",
        "NC"
    ],
    "28301": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28302": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28303": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28304": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28305": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28306": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28307": [
        "FORT BRAGG",
        "NC"
    ],
    "28308": [
        "POPE ARMY AIRFIELD",
        "NC"
    ],
    "28309": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28310": [
        "FORT BRAGG",
        "NC"
    ],
    "28311": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28312": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28314": [
        "FAYETTEVILLE",
        "NC"
    ],
    "28315": [
        "ABERDEEN",
        "NC"
    ],
    "28318": [
        "AUTRYVILLE",
        "NC"
    ],
    "28319": [
        "BARNESVILLE",
        "NC"
    ],
    "28320": [
        "BLADENBORO",
        "NC"
    ],
    "28323": [
        "BUNNLEVEL",
        "NC"
    ],
    "28325": [
        "CALYPSO",
        "NC"
    ],
    "28326": [
        "CAMERON",
        "NC"
    ],
    "28327": [
        "CARTHAGE",
        "NC"
    ],
    "28328": [
        "CLINTON",
        "NC"
    ],
    "28329": [
        "CLINTON",
        "NC"
    ],
    "28330": [
        "CORDOVA",
        "NC"
    ],
    "28331": [
        "CUMBERLAND",
        "NC"
    ],
    "28332": [
        "DUBLIN",
        "NC"
    ],
    "28333": [
        "DUDLEY",
        "NC"
    ],
    "28334": [
        "DUNN",
        "NC"
    ],
    "28335": [
        "DUNN",
        "NC"
    ],
    "28337": [
        "ELIZABETHTOWN",
        "NC"
    ],
    "28338": [
        "ELLERBE",
        "NC"
    ],
    "28339": [
        "ERWIN",
        "NC"
    ],
    "28340": [
        "FAIRMONT",
        "NC"
    ],
    "28341": [
        "FAISON",
        "NC"
    ],
    "28342": [
        "FALCON",
        "NC"
    ],
    "28343": [
        "GIBSON",
        "NC"
    ],
    "28344": [
        "GODWIN",
        "NC"
    ],
    "28345": [
        "HAMLET",
        "NC"
    ],
    "28347": [
        "HOFFMAN",
        "NC"
    ],
    "28348": [
        "HOPE MILLS",
        "NC"
    ],
    "28349": [
        "KENANSVILLE",
        "NC"
    ],
    "28350": [
        "LAKEVIEW",
        "NC"
    ],
    "28351": [
        "LAUREL HILL",
        "NC"
    ],
    "28352": [
        "LAURINBURG",
        "NC"
    ],
    "28353": [
        "LAURINBURG",
        "NC"
    ],
    "28355": [
        "LEMON SPRINGS",
        "NC"
    ],
    "28356": [
        "LINDEN",
        "NC"
    ],
    "28357": [
        "LUMBER BRIDGE",
        "NC"
    ],
    "28358": [
        "LUMBERTON",
        "NC"
    ],
    "28359": [
        "LUMBERTON",
        "NC"
    ],
    "28360": [
        "LUMBERTON",
        "NC"
    ],
    "28362": [
        "MARIETTA",
        "NC"
    ],
    "28363": [
        "MARSTON",
        "NC"
    ],
    "28364": [
        "MAXTON",
        "NC"
    ],
    "28365": [
        "MOUNT OLIVE",
        "NC"
    ],
    "28366": [
        "NEWTON GROVE",
        "NC"
    ],
    "28367": [
        "NORMAN",
        "NC"
    ],
    "28368": [
        "OLIVIA",
        "NC"
    ],
    "28369": [
        "ORRUM",
        "NC"
    ],
    "28370": [
        "PINEHURST",
        "NC"
    ],
    "28371": [
        "PARKTON",
        "NC"
    ],
    "28372": [
        "PEMBROKE",
        "NC"
    ],
    "28373": [
        "PINEBLUFF",
        "NC"
    ],
    "28374": [
        "PINEHURST",
        "NC"
    ],
    "28375": [
        "PROCTORVILLE",
        "NC"
    ],
    "28376": [
        "RAEFORD",
        "NC"
    ],
    "28377": [
        "RED SPRINGS",
        "NC"
    ],
    "28378": [
        "REX",
        "NC"
    ],
    "28379": [
        "ROCKINGHAM",
        "NC"
    ],
    "28380": [
        "ROCKINGHAM",
        "NC"
    ],
    "28382": [
        "ROSEBORO",
        "NC"
    ],
    "28383": [
        "ROWLAND",
        "NC"
    ],
    "28384": [
        "SAINT PAULS",
        "NC"
    ],
    "28385": [
        "SALEMBURG",
        "NC"
    ],
    "28386": [
        "SHANNON",
        "NC"
    ],
    "28387": [
        "SOUTHERN PINES",
        "NC"
    ],
    "28388": [
        "SOUTHERN PINES",
        "NC"
    ],
    "28390": [
        "SPRING LAKE",
        "NC"
    ],
    "28391": [
        "STEDMAN",
        "NC"
    ],
    "28392": [
        "TAR HEEL",
        "NC"
    ],
    "28393": [
        "TURKEY",
        "NC"
    ],
    "28394": [
        "VASS",
        "NC"
    ],
    "28395": [
        "WADE",
        "NC"
    ],
    "28396": [
        "WAGRAM",
        "NC"
    ],
    "28398": [
        "WARSAW",
        "NC"
    ],
    "28399": [
        "WHITE OAK",
        "NC"
    ],
    "28401": [
        "WILMINGTON",
        "NC"
    ],
    "28402": [
        "WILMINGTON",
        "NC"
    ],
    "28403": [
        "WILMINGTON",
        "NC"
    ],
    "28404": [
        "WILMINGTON",
        "NC"
    ],
    "28405": [
        "WILMINGTON",
        "NC"
    ],
    "28406": [
        "WILMINGTON",
        "NC"
    ],
    "28407": [
        "WILMINGTON",
        "NC"
    ],
    "28408": [
        "WILMINGTON",
        "NC"
    ],
    "28409": [
        "WILMINGTON",
        "NC"
    ],
    "28411": [
        "WILMINGTON",
        "NC"
    ],
    "28412": [
        "WILMINGTON",
        "NC"
    ],
    "28420": [
        "ASH",
        "NC"
    ],
    "28421": [
        "ATKINSON",
        "NC"
    ],
    "28422": [
        "BOLIVIA",
        "NC"
    ],
    "28423": [
        "BOLTON",
        "NC"
    ],
    "28424": [
        "BRUNSWICK",
        "NC"
    ],
    "28425": [
        "BURGAW",
        "NC"
    ],
    "28428": [
        "CAROLINA BEACH",
        "NC"
    ],
    "28429": [
        "CASTLE HAYNE",
        "NC"
    ],
    "28430": [
        "CERRO GORDO",
        "NC"
    ],
    "28431": [
        "CHADBOURN",
        "NC"
    ],
    "28432": [
        "CLARENDON",
        "NC"
    ],
    "28433": [
        "CLARKTON",
        "NC"
    ],
    "28434": [
        "COUNCIL",
        "NC"
    ],
    "28435": [
        "CURRIE",
        "NC"
    ],
    "28436": [
        "DELCO",
        "NC"
    ],
    "28438": [
        "EVERGREEN",
        "NC"
    ],
    "28439": [
        "FAIR BLUFF",
        "NC"
    ],
    "28441": [
        "GARLAND",
        "NC"
    ],
    "28442": [
        "HALLSBORO",
        "NC"
    ],
    "28443": [
        "HAMPSTEAD",
        "NC"
    ],
    "28444": [
        "HARRELLS",
        "NC"
    ],
    "28445": [
        "HOLLY RIDGE",
        "NC"
    ],
    "28447": [
        "IVANHOE",
        "NC"
    ],
    "28448": [
        "KELLY",
        "NC"
    ],
    "28449": [
        "KURE BEACH",
        "NC"
    ],
    "28450": [
        "LAKE WACCAMAW",
        "NC"
    ],
    "28451": [
        "LELAND",
        "NC"
    ],
    "28452": [
        "LONGWOOD",
        "NC"
    ],
    "28453": [
        "MAGNOLIA",
        "NC"
    ],
    "28454": [
        "MAPLE HILL",
        "NC"
    ],
    "28455": [
        "NAKINA",
        "NC"
    ],
    "28456": [
        "RIEGELWOOD",
        "NC"
    ],
    "28457": [
        "ROCKY POINT",
        "NC"
    ],
    "28458": [
        "ROSE HILL",
        "NC"
    ],
    "28459": [
        "SHALLOTTE",
        "NC"
    ],
    "28460": [
        "SNEADS FERRY",
        "NC"
    ],
    "28461": [
        "SOUTHPORT",
        "NC"
    ],
    "28462": [
        "SUPPLY",
        "NC"
    ],
    "28463": [
        "TABOR CITY",
        "NC"
    ],
    "28464": [
        "TEACHEY",
        "NC"
    ],
    "28465": [
        "OAK ISLAND",
        "NC"
    ],
    "28466": [
        "WALLACE",
        "NC"
    ],
    "28467": [
        "CALABASH",
        "NC"
    ],
    "28468": [
        "SUNSET BEACH",
        "NC"
    ],
    "28469": [
        "OCEAN ISLE BEACH",
        "NC"
    ],
    "28470": [
        "SHALLOTTE",
        "NC"
    ],
    "28472": [
        "WHITEVILLE",
        "NC"
    ],
    "28478": [
        "WILLARD",
        "NC"
    ],
    "28479": [
        "WINNABOW",
        "NC"
    ],
    "28480": [
        "WRIGHTSVILLE BEACH",
        "NC"
    ],
    "28501": [
        "KINSTON",
        "NC"
    ],
    "28502": [
        "KINSTON",
        "NC"
    ],
    "28503": [
        "KINSTON",
        "NC"
    ],
    "28504": [
        "KINSTON",
        "NC"
    ],
    "28508": [
        "ALBERTSON",
        "NC"
    ],
    "28509": [
        "ALLIANCE",
        "NC"
    ],
    "28510": [
        "ARAPAHOE",
        "NC"
    ],
    "28511": [
        "ATLANTIC",
        "NC"
    ],
    "28512": [
        "ATLANTIC BEACH",
        "NC"
    ],
    "28513": [
        "AYDEN",
        "NC"
    ],
    "28515": [
        "BAYBORO",
        "NC"
    ],
    "28516": [
        "BEAUFORT",
        "NC"
    ],
    "28518": [
        "BEULAVILLE",
        "NC"
    ],
    "28519": [
        "BRIDGETON",
        "NC"
    ],
    "28520": [
        "CEDAR ISLAND",
        "NC"
    ],
    "28521": [
        "CHINQUAPIN",
        "NC"
    ],
    "28523": [
        "COVE CITY",
        "NC"
    ],
    "28524": [
        "DAVIS",
        "NC"
    ],
    "28525": [
        "DEEP RUN",
        "NC"
    ],
    "28526": [
        "DOVER",
        "NC"
    ],
    "28527": [
        "ERNUL",
        "NC"
    ],
    "28528": [
        "GLOUCESTER",
        "NC"
    ],
    "28529": [
        "GRANTSBORO",
        "NC"
    ],
    "28530": [
        "GRIFTON",
        "NC"
    ],
    "28531": [
        "HARKERS ISLAND",
        "NC"
    ],
    "28532": [
        "HAVELOCK",
        "NC"
    ],
    "28533": [
        "CHERRY POINT",
        "NC"
    ],
    "28537": [
        "HOBUCKEN",
        "NC"
    ],
    "28538": [
        "HOOKERTON",
        "NC"
    ],
    "28539": [
        "HUBERT",
        "NC"
    ],
    "28540": [
        "JACKSONVILLE",
        "NC"
    ],
    "28541": [
        "JACKSONVILLE",
        "NC"
    ],
    "28542": [
        "CAMP LEJEUNE",
        "NC"
    ],
    "28543": [
        "TARAWA TERRACE",
        "NC"
    ],
    "28544": [
        "MIDWAY PARK",
        "NC"
    ],
    "28545": [
        "MCCUTCHEON FIELD",
        "NC"
    ],
    "28546": [
        "JACKSONVILLE",
        "NC"
    ],
    "28547": [
        "CAMP LEJEUNE",
        "NC"
    ],
    "28551": [
        "LA GRANGE",
        "NC"
    ],
    "28552": [
        "LOWLAND",
        "NC"
    ],
    "28553": [
        "MARSHALLBERG",
        "NC"
    ],
    "28554": [
        "MAURY",
        "NC"
    ],
    "28555": [
        "MAYSVILLE",
        "NC"
    ],
    "28556": [
        "MERRITT",
        "NC"
    ],
    "28557": [
        "MOREHEAD CITY",
        "NC"
    ],
    "28560": [
        "NEW BERN",
        "NC"
    ],
    "28561": [
        "NEW BERN",
        "NC"
    ],
    "28562": [
        "NEW BERN",
        "NC"
    ],
    "28563": [
        "NEW BERN",
        "NC"
    ],
    "28564": [
        "NEW BERN",
        "NC"
    ],
    "28570": [
        "NEWPORT",
        "NC"
    ],
    "28571": [
        "ORIENTAL",
        "NC"
    ],
    "28572": [
        "PINK HILL",
        "NC"
    ],
    "28573": [
        "POLLOCKSVILLE",
        "NC"
    ],
    "28574": [
        "RICHLANDS",
        "NC"
    ],
    "28575": [
        "SALTER PATH",
        "NC"
    ],
    "28577": [
        "SEALEVEL",
        "NC"
    ],
    "28578": [
        "SEVEN SPRINGS",
        "NC"
    ],
    "28579": [
        "SMYRNA",
        "NC"
    ],
    "28580": [
        "SNOW HILL",
        "NC"
    ],
    "28581": [
        "STACY",
        "NC"
    ],
    "28582": [
        "STELLA",
        "NC"
    ],
    "28583": [
        "STONEWALL",
        "NC"
    ],
    "28584": [
        "SWANSBORO",
        "NC"
    ],
    "28585": [
        "TRENTON",
        "NC"
    ],
    "28586": [
        "VANCEBORO",
        "NC"
    ],
    "28587": [
        "VANDEMERE",
        "NC"
    ],
    "28589": [
        "WILLISTON",
        "NC"
    ],
    "28590": [
        "WINTERVILLE",
        "NC"
    ],
    "28594": [
        "EMERALD ISLE",
        "NC"
    ],
    "28601": [
        "HICKORY",
        "NC"
    ],
    "28602": [
        "HICKORY",
        "NC"
    ],
    "28603": [
        "HICKORY",
        "NC"
    ],
    "28604": [
        "BANNER ELK",
        "NC"
    ],
    "28605": [
        "BLOWING ROCK",
        "NC"
    ],
    "28606": [
        "BOOMER",
        "NC"
    ],
    "28607": [
        "BOONE",
        "NC"
    ],
    "28608": [
        "BOONE",
        "NC"
    ],
    "28609": [
        "CATAWBA",
        "NC"
    ],
    "28610": [
        "CLAREMONT",
        "NC"
    ],
    "28611": [
        "COLLETTSVILLE",
        "NC"
    ],
    "28612": [
        "CONNELLY SPRINGS",
        "NC"
    ],
    "28613": [
        "CONOVER",
        "NC"
    ],
    "28615": [
        "CRESTON",
        "NC"
    ],
    "28616": [
        "CROSSNORE",
        "NC"
    ],
    "28617": [
        "CRUMPLER",
        "NC"
    ],
    "28618": [
        "DEEP GAP",
        "NC"
    ],
    "28619": [
        "DREXEL",
        "NC"
    ],
    "28621": [
        "ELKIN",
        "NC"
    ],
    "28622": [
        "ELK PARK",
        "NC"
    ],
    "28623": [
        "ENNICE",
        "NC"
    ],
    "28624": [
        "FERGUSON",
        "NC"
    ],
    "28625": [
        "STATESVILLE",
        "NC"
    ],
    "28626": [
        "FLEETWOOD",
        "NC"
    ],
    "28627": [
        "GLADE VALLEY",
        "NC"
    ],
    "28628": [
        "GLEN ALPINE",
        "NC"
    ],
    "28629": [
        "GLENDALE SPRINGS",
        "NC"
    ],
    "28630": [
        "GRANITE FALLS",
        "NC"
    ],
    "28631": [
        "GRASSY CREEK",
        "NC"
    ],
    "28633": [
        "LENOIR",
        "NC"
    ],
    "28634": [
        "HARMONY",
        "NC"
    ],
    "28635": [
        "HAYS",
        "NC"
    ],
    "28636": [
        "HIDDENITE",
        "NC"
    ],
    "28637": [
        "HILDEBRAN",
        "NC"
    ],
    "28638": [
        "HUDSON",
        "NC"
    ],
    "28640": [
        "JEFFERSON",
        "NC"
    ],
    "28641": [
        "JONAS RIDGE",
        "NC"
    ],
    "28642": [
        "JONESVILLE",
        "NC"
    ],
    "28643": [
        "LANSING",
        "NC"
    ],
    "28644": [
        "LAUREL SPRINGS",
        "NC"
    ],
    "28645": [
        "LENOIR",
        "NC"
    ],
    "28646": [
        "LINVILLE",
        "NC"
    ],
    "28647": [
        "LINVILLE FALLS",
        "NC"
    ],
    "28649": [
        "MC GRADY",
        "NC"
    ],
    "28650": [
        "MAIDEN",
        "NC"
    ],
    "28651": [
        "MILLERS CREEK",
        "NC"
    ],
    "28652": [
        "MINNEAPOLIS",
        "NC"
    ],
    "28653": [
        "MONTEZUMA",
        "NC"
    ],
    "28654": [
        "MORAVIAN FALLS",
        "NC"
    ],
    "28655": [
        "MORGANTON",
        "NC"
    ],
    "28656": [
        "NORTH WILKESBORO",
        "NC"
    ],
    "28657": [
        "NEWLAND",
        "NC"
    ],
    "28658": [
        "NEWTON",
        "NC"
    ],
    "28659": [
        "NORTH WILKESBORO",
        "NC"
    ],
    "28660": [
        "OLIN",
        "NC"
    ],
    "28661": [
        "PATTERSON",
        "NC"
    ],
    "28662": [
        "PINEOLA",
        "NC"
    ],
    "28663": [
        "PINEY CREEK",
        "NC"
    ],
    "28664": [
        "PLUMTREE",
        "NC"
    ],
    "28665": [
        "PURLEAR",
        "NC"
    ],
    "28666": [
        "ICARD",
        "NC"
    ],
    "28667": [
        "RHODHISS",
        "NC"
    ],
    "28668": [
        "ROARING GAP",
        "NC"
    ],
    "28669": [
        "ROARING RIVER",
        "NC"
    ],
    "28670": [
        "RONDA",
        "NC"
    ],
    "28671": [
        "RUTHERFORD COLLEGE",
        "NC"
    ],
    "28672": [
        "SCOTTVILLE",
        "NC"
    ],
    "28673": [
        "SHERRILLS FORD",
        "NC"
    ],
    "28675": [
        "SPARTA",
        "NC"
    ],
    "28676": [
        "STATE ROAD",
        "NC"
    ],
    "28677": [
        "STATESVILLE",
        "NC"
    ],
    "28678": [
        "STONY POINT",
        "NC"
    ],
    "28679": [
        "SUGAR GROVE",
        "NC"
    ],
    "28680": [
        "MORGANTON",
        "NC"
    ],
    "28681": [
        "TAYLORSVILLE",
        "NC"
    ],
    "28682": [
        "TERRELL",
        "NC"
    ],
    "28683": [
        "THURMOND",
        "NC"
    ],
    "28684": [
        "TODD",
        "NC"
    ],
    "28685": [
        "TRAPHILL",
        "NC"
    ],
    "28687": [
        "STATESVILLE",
        "NC"
    ],
    "28689": [
        "UNION GROVE",
        "NC"
    ],
    "28690": [
        "VALDESE",
        "NC"
    ],
    "28691": [
        "VALLE CRUCIS",
        "NC"
    ],
    "28692": [
        "VILAS",
        "NC"
    ],
    "28693": [
        "WARRENSVILLE",
        "NC"
    ],
    "28694": [
        "WEST JEFFERSON",
        "NC"
    ],
    "28697": [
        "WILKESBORO",
        "NC"
    ],
    "28698": [
        "ZIONVILLE",
        "NC"
    ],
    "28699": [
        "SCOTTS",
        "NC"
    ],
    "28701": [
        "ALEXANDER",
        "NC"
    ],
    "28702": [
        "ALMOND",
        "NC"
    ],
    "28704": [
        "ARDEN",
        "NC"
    ],
    "28705": [
        "BAKERSVILLE",
        "NC"
    ],
    "28707": [
        "BALSAM",
        "NC"
    ],
    "28708": [
        "BALSAM GROVE",
        "NC"
    ],
    "28709": [
        "BARNARDSVILLE",
        "NC"
    ],
    "28710": [
        "BAT CAVE",
        "NC"
    ],
    "28711": [
        "BLACK MOUNTAIN",
        "NC"
    ],
    "28712": [
        "BREVARD",
        "NC"
    ],
    "28713": [
        "BRYSON CITY",
        "NC"
    ],
    "28714": [
        "BURNSVILLE",
        "NC"
    ],
    "28715": [
        "CANDLER",
        "NC"
    ],
    "28716": [
        "CANTON",
        "NC"
    ],
    "28717": [
        "CASHIERS",
        "NC"
    ],
    "28718": [
        "CEDAR MOUNTAIN",
        "NC"
    ],
    "28719": [
        "CHEROKEE",
        "NC"
    ],
    "28720": [
        "CHIMNEY ROCK",
        "NC"
    ],
    "28721": [
        "CLYDE",
        "NC"
    ],
    "28722": [
        "COLUMBUS",
        "NC"
    ],
    "28723": [
        "CULLOWHEE",
        "NC"
    ],
    "28724": [
        "DANA",
        "NC"
    ],
    "28725": [
        "DILLSBORO",
        "NC"
    ],
    "28726": [
        "EAST FLAT ROCK",
        "NC"
    ],
    "28727": [
        "EDNEYVILLE",
        "NC"
    ],
    "28728": [
        "ENKA",
        "NC"
    ],
    "28729": [
        "ETOWAH",
        "NC"
    ],
    "28730": [
        "FAIRVIEW",
        "NC"
    ],
    "28731": [
        "FLAT ROCK",
        "NC"
    ],
    "28732": [
        "FLETCHER",
        "NC"
    ],
    "28733": [
        "FONTANA DAM",
        "NC"
    ],
    "28734": [
        "FRANKLIN",
        "NC"
    ],
    "28735": [
        "GERTON",
        "NC"
    ],
    "28736": [
        "GLENVILLE",
        "NC"
    ],
    "28738": [
        "HAZELWOOD",
        "NC"
    ],
    "28739": [
        "HENDERSONVILLE",
        "NC"
    ],
    "28740": [
        "GREEN MOUNTAIN",
        "NC"
    ],
    "28741": [
        "HIGHLANDS",
        "NC"
    ],
    "28742": [
        "HORSE SHOE",
        "NC"
    ],
    "28743": [
        "HOT SPRINGS",
        "NC"
    ],
    "28744": [
        "FRANKLIN",
        "NC"
    ],
    "28745": [
        "LAKE JUNALUSKA",
        "NC"
    ],
    "28746": [
        "LAKE LURE",
        "NC"
    ],
    "28747": [
        "LAKE TOXAWAY",
        "NC"
    ],
    "28748": [
        "LEICESTER",
        "NC"
    ],
    "28749": [
        "LITTLE SWITZERLAND",
        "NC"
    ],
    "28750": [
        "LYNN",
        "NC"
    ],
    "28751": [
        "MAGGIE VALLEY",
        "NC"
    ],
    "28752": [
        "MARION",
        "NC"
    ],
    "28753": [
        "MARSHALL",
        "NC"
    ],
    "28754": [
        "MARS HILL",
        "NC"
    ],
    "28755": [
        "MICAVILLE",
        "NC"
    ],
    "28756": [
        "MILL SPRING",
        "NC"
    ],
    "28757": [
        "MONTREAT",
        "NC"
    ],
    "28758": [
        "MOUNTAIN HOME",
        "NC"
    ],
    "28759": [
        "MILLS RIVER",
        "NC"
    ],
    "28760": [
        "NAPLES",
        "NC"
    ],
    "28761": [
        "NEBO",
        "NC"
    ],
    "28762": [
        "OLD FORT",
        "NC"
    ],
    "28763": [
        "OTTO",
        "NC"
    ],
    "28765": [
        "PENLAND",
        "NC"
    ],
    "28766": [
        "PENROSE",
        "NC"
    ],
    "28768": [
        "PISGAH FOREST",
        "NC"
    ],
    "28770": [
        "RIDGECREST",
        "NC"
    ],
    "28771": [
        "ROBBINSVILLE",
        "NC"
    ],
    "28772": [
        "ROSMAN",
        "NC"
    ],
    "28773": [
        "SALUDA",
        "NC"
    ],
    "28774": [
        "SAPPHIRE",
        "NC"
    ],
    "28775": [
        "SCALY MOUNTAIN",
        "NC"
    ],
    "28776": [
        "SKYLAND",
        "NC"
    ],
    "28777": [
        "SPRUCE PINE",
        "NC"
    ],
    "28778": [
        "SWANNANOA",
        "NC"
    ],
    "28779": [
        "SYLVA",
        "NC"
    ],
    "28781": [
        "TOPTON",
        "NC"
    ],
    "28782": [
        "TRYON",
        "NC"
    ],
    "28783": [
        "TUCKASEGEE",
        "NC"
    ],
    "28784": [
        "TUXEDO",
        "NC"
    ],
    "28785": [
        "WAYNESVILLE",
        "NC"
    ],
    "28786": [
        "WAYNESVILLE",
        "NC"
    ],
    "28787": [
        "WEAVERVILLE",
        "NC"
    ],
    "28788": [
        "WEBSTER",
        "NC"
    ],
    "28789": [
        "WHITTIER",
        "NC"
    ],
    "28790": [
        "ZIRCONIA",
        "NC"
    ],
    "28791": [
        "HENDERSONVILLE",
        "NC"
    ],
    "28792": [
        "HENDERSONVILLE",
        "NC"
    ],
    "28793": [
        "HENDERSONVILLE",
        "NC"
    ],
    "28801": [
        "ASHEVILLE",
        "NC"
    ],
    "28802": [
        "ASHEVILLE",
        "NC"
    ],
    "28803": [
        "ASHEVILLE",
        "NC"
    ],
    "28804": [
        "ASHEVILLE",
        "NC"
    ],
    "28805": [
        "ASHEVILLE",
        "NC"
    ],
    "28806": [
        "ASHEVILLE",
        "NC"
    ],
    "28810": [
        "ASHEVILLE",
        "NC"
    ],
    "28813": [
        "ASHEVILLE",
        "NC"
    ],
    "28814": [
        "ASHEVILLE",
        "NC"
    ],
    "28815": [
        "ASHEVILLE",
        "NC"
    ],
    "28816": [
        "ASHEVILLE",
        "NC"
    ],
    "28901": [
        "ANDREWS",
        "NC"
    ],
    "28902": [
        "BRASSTOWN",
        "NC"
    ],
    "28904": [
        "HAYESVILLE",
        "NC"
    ],
    "28905": [
        "MARBLE",
        "NC"
    ],
    "28906": [
        "MURPHY",
        "NC"
    ],
    "28909": [
        "WARNE",
        "NC"
    ],
    "29001": [
        "ALCOLU",
        "SC"
    ],
    "29002": [
        "BALLENTINE",
        "SC"
    ],
    "29003": [
        "BAMBERG",
        "SC"
    ],
    "29006": [
        "BATESBURG",
        "SC"
    ],
    "29009": [
        "BETHUNE",
        "SC"
    ],
    "29010": [
        "BISHOPVILLE",
        "SC"
    ],
    "29014": [
        "BLACKSTOCK",
        "SC"
    ],
    "29015": [
        "BLAIR",
        "SC"
    ],
    "29016": [
        "BLYTHEWOOD",
        "SC"
    ],
    "29018": [
        "BOWMAN",
        "SC"
    ],
    "29020": [
        "CAMDEN",
        "SC"
    ],
    "29021": [
        "CAMDEN",
        "SC"
    ],
    "29030": [
        "CAMERON",
        "SC"
    ],
    "29031": [
        "CARLISLE",
        "SC"
    ],
    "29032": [
        "CASSATT",
        "SC"
    ],
    "29033": [
        "CAYCE",
        "SC"
    ],
    "29036": [
        "CHAPIN",
        "SC"
    ],
    "29037": [
        "CHAPPELLS",
        "SC"
    ],
    "29038": [
        "COPE",
        "SC"
    ],
    "29039": [
        "CORDOVA",
        "SC"
    ],
    "29040": [
        "DALZELL",
        "SC"
    ],
    "29041": [
        "DAVIS STATION",
        "SC"
    ],
    "29042": [
        "DENMARK",
        "SC"
    ],
    "29044": [
        "EASTOVER",
        "SC"
    ],
    "29045": [
        "ELGIN",
        "SC"
    ],
    "29047": [
        "ELLOREE",
        "SC"
    ],
    "29048": [
        "EUTAWVILLE",
        "SC"
    ],
    "29051": [
        "GABLE",
        "SC"
    ],
    "29052": [
        "GADSDEN",
        "SC"
    ],
    "29053": [
        "GASTON",
        "SC"
    ],
    "29054": [
        "GILBERT",
        "SC"
    ],
    "29055": [
        "GREAT FALLS",
        "SC"
    ],
    "29056": [
        "GREELEYVILLE",
        "SC"
    ],
    "29058": [
        "HEATH SPRINGS",
        "SC"
    ],
    "29059": [
        "HOLLY HILL",
        "SC"
    ],
    "29061": [
        "HOPKINS",
        "SC"
    ],
    "29062": [
        "HORATIO",
        "SC"
    ],
    "29063": [
        "IRMO",
        "SC"
    ],
    "29065": [
        "JENKINSVILLE",
        "SC"
    ],
    "29067": [
        "KERSHAW",
        "SC"
    ],
    "29069": [
        "LAMAR",
        "SC"
    ],
    "29070": [
        "LEESVILLE",
        "SC"
    ],
    "29071": [
        "LEXINGTON",
        "SC"
    ],
    "29072": [
        "LEXINGTON",
        "SC"
    ],
    "29073": [
        "LEXINGTON",
        "SC"
    ],
    "29074": [
        "LIBERTY HILL",
        "SC"
    ],
    "29075": [
        "LITTLE MOUNTAIN",
        "SC"
    ],
    "29078": [
        "LUGOFF",
        "SC"
    ],
    "29079": [
        "LYDIA",
        "SC"
    ],
    "29080": [
        "LYNCHBURG",
        "SC"
    ],
    "29081": [
        "EHRHARDT",
        "SC"
    ],
    "29082": [
        "LODGE",
        "SC"
    ],
    "29101": [
        "MC BEE",
        "SC"
    ],
    "29102": [
        "MANNING",
        "SC"
    ],
    "29104": [
        "MAYESVILLE",
        "SC"
    ],
    "29105": [
        "MONETTA",
        "SC"
    ],
    "29107": [
        "NEESES",
        "SC"
    ],
    "29108": [
        "NEWBERRY",
        "SC"
    ],
    "29111": [
        "NEW ZION",
        "SC"
    ],
    "29112": [
        "NORTH",
        "SC"
    ],
    "29113": [
        "NORWAY",
        "SC"
    ],
    "29114": [
        "OLANTA",
        "SC"
    ],
    "29115": [
        "ORANGEBURG",
        "SC"
    ],
    "29116": [
        "ORANGEBURG",
        "SC"
    ],
    "29117": [
        "ORANGEBURG",
        "SC"
    ],
    "29118": [
        "ORANGEBURG",
        "SC"
    ],
    "29122": [
        "PEAK",
        "SC"
    ],
    "29123": [
        "PELION",
        "SC"
    ],
    "29125": [
        "PINEWOOD",
        "SC"
    ],
    "29126": [
        "POMARIA",
        "SC"
    ],
    "29127": [
        "PROSPERITY",
        "SC"
    ],
    "29128": [
        "REMBERT",
        "SC"
    ],
    "29129": [
        "RIDGE SPRING",
        "SC"
    ],
    "29130": [
        "RIDGEWAY",
        "SC"
    ],
    "29132": [
        "RION",
        "SC"
    ],
    "29133": [
        "ROWESVILLE",
        "SC"
    ],
    "29135": [
        "SAINT MATTHEWS",
        "SC"
    ],
    "29137": [
        "SALLEY",
        "SC"
    ],
    "29138": [
        "SALUDA",
        "SC"
    ],
    "29142": [
        "SANTEE",
        "SC"
    ],
    "29145": [
        "SILVERSTREET",
        "SC"
    ],
    "29146": [
        "SPRINGFIELD",
        "SC"
    ],
    "29147": [
        "STATE PARK",
        "SC"
    ],
    "29148": [
        "SUMMERTON",
        "SC"
    ],
    "29150": [
        "SUMTER",
        "SC"
    ],
    "29151": [
        "SUMTER",
        "SC"
    ],
    "29152": [
        "SHAW AFB",
        "SC"
    ],
    "29153": [
        "SUMTER",
        "SC"
    ],
    "29154": [
        "SUMTER",
        "SC"
    ],
    "29160": [
        "SWANSEA",
        "SC"
    ],
    "29161": [
        "TIMMONSVILLE",
        "SC"
    ],
    "29162": [
        "TURBEVILLE",
        "SC"
    ],
    "29163": [
        "VANCE",
        "SC"
    ],
    "29164": [
        "WAGENER",
        "SC"
    ],
    "29166": [
        "WARD",
        "SC"
    ],
    "29168": [
        "WEDGEFIELD",
        "SC"
    ],
    "29169": [
        "WEST COLUMBIA",
        "SC"
    ],
    "29170": [
        "WEST COLUMBIA",
        "SC"
    ],
    "29171": [
        "WEST COLUMBIA",
        "SC"
    ],
    "29172": [
        "WEST COLUMBIA",
        "SC"
    ],
    "29175": [
        "WESTVILLE",
        "SC"
    ],
    "29177": [
        "WHITE ROCK",
        "SC"
    ],
    "29178": [
        "WHITMIRE",
        "SC"
    ],
    "29180": [
        "WINNSBORO",
        "SC"
    ],
    "29201": [
        "COLUMBIA",
        "SC"
    ],
    "29202": [
        "COLUMBIA",
        "SC"
    ],
    "29203": [
        "COLUMBIA",
        "SC"
    ],
    "29204": [
        "COLUMBIA",
        "SC"
    ],
    "29205": [
        "COLUMBIA",
        "SC"
    ],
    "29206": [
        "COLUMBIA",
        "SC"
    ],
    "29207": [
        "COLUMBIA",
        "SC"
    ],
    "29208": [
        "COLUMBIA",
        "SC"
    ],
    "29209": [
        "COLUMBIA",
        "SC"
    ],
    "29210": [
        "COLUMBIA",
        "SC"
    ],
    "29211": [
        "COLUMBIA",
        "SC"
    ],
    "29212": [
        "COLUMBIA",
        "SC"
    ],
    "29214": [
        "COLUMBIA",
        "SC"
    ],
    "29215": [
        "COLUMBIA",
        "SC"
    ],
    "29216": [
        "COLUMBIA",
        "SC"
    ],
    "29217": [
        "COLUMBIA",
        "SC"
    ],
    "29218": [
        "COLUMBIA",
        "SC"
    ],
    "29219": [
        "COLUMBIA",
        "SC"
    ],
    "29220": [
        "COLUMBIA",
        "SC"
    ],
    "29221": [
        "COLUMBIA",
        "SC"
    ],
    "29222": [
        "COLUMBIA",
        "SC"
    ],
    "29223": [
        "COLUMBIA",
        "SC"
    ],
    "29224": [
        "COLUMBIA",
        "SC"
    ],
    "29225": [
        "COLUMBIA",
        "SC"
    ],
    "29226": [
        "COLUMBIA",
        "SC"
    ],
    "29228": [
        "COLUMBIA",
        "SC"
    ],
    "29229": [
        "COLUMBIA",
        "SC"
    ],
    "29230": [
        "COLUMBIA",
        "SC"
    ],
    "29240": [
        "COLUMBIA",
        "SC"
    ],
    "29250": [
        "COLUMBIA",
        "SC"
    ],
    "29260": [
        "COLUMBIA",
        "SC"
    ],
    "29290": [
        "COLUMBIA",
        "SC"
    ],
    "29301": [
        "SPARTANBURG",
        "SC"
    ],
    "29302": [
        "SPARTANBURG",
        "SC"
    ],
    "29303": [
        "SPARTANBURG",
        "SC"
    ],
    "29304": [
        "SPARTANBURG",
        "SC"
    ],
    "29305": [
        "SPARTANBURG",
        "SC"
    ],
    "29306": [
        "SPARTANBURG",
        "SC"
    ],
    "29307": [
        "SPARTANBURG",
        "SC"
    ],
    "29316": [
        "BOILING SPRINGS",
        "SC"
    ],
    "29319": [
        "SPARTANBURG",
        "SC"
    ],
    "29320": [
        "ARCADIA",
        "SC"
    ],
    "29321": [
        "BUFFALO",
        "SC"
    ],
    "29322": [
        "CAMPOBELLO",
        "SC"
    ],
    "29323": [
        "CHESNEE",
        "SC"
    ],
    "29324": [
        "CLIFTON",
        "SC"
    ],
    "29325": [
        "CLINTON",
        "SC"
    ],
    "29329": [
        "CONVERSE",
        "SC"
    ],
    "29330": [
        "COWPENS",
        "SC"
    ],
    "29331": [
        "CROSS ANCHOR",
        "SC"
    ],
    "29332": [
        "CROSS HILL",
        "SC"
    ],
    "29333": [
        "DRAYTON",
        "SC"
    ],
    "29334": [
        "DUNCAN",
        "SC"
    ],
    "29335": [
        "ENOREE",
        "SC"
    ],
    "29336": [
        "FAIRFOREST",
        "SC"
    ],
    "29338": [
        "FINGERVILLE",
        "SC"
    ],
    "29340": [
        "GAFFNEY",
        "SC"
    ],
    "29341": [
        "GAFFNEY",
        "SC"
    ],
    "29342": [
        "GAFFNEY",
        "SC"
    ],
    "29346": [
        "GLENDALE",
        "SC"
    ],
    "29348": [
        "GRAMLING",
        "SC"
    ],
    "29349": [
        "INMAN",
        "SC"
    ],
    "29351": [
        "JOANNA",
        "SC"
    ],
    "29353": [
        "JONESVILLE",
        "SC"
    ],
    "29355": [
        "KINARDS",
        "SC"
    ],
    "29356": [
        "LANDRUM",
        "SC"
    ],
    "29360": [
        "LAURENS",
        "SC"
    ],
    "29364": [
        "LOCKHART",
        "SC"
    ],
    "29365": [
        "LYMAN",
        "SC"
    ],
    "29368": [
        "MAYO",
        "SC"
    ],
    "29369": [
        "MOORE",
        "SC"
    ],
    "29370": [
        "MOUNTVILLE",
        "SC"
    ],
    "29372": [
        "PACOLET",
        "SC"
    ],
    "29373": [
        "PACOLET MILLS",
        "SC"
    ],
    "29374": [
        "PAULINE",
        "SC"
    ],
    "29375": [
        "REIDVILLE",
        "SC"
    ],
    "29376": [
        "ROEBUCK",
        "SC"
    ],
    "29377": [
        "STARTEX",
        "SC"
    ],
    "29378": [
        "UNA",
        "SC"
    ],
    "29379": [
        "UNION",
        "SC"
    ],
    "29384": [
        "WATERLOO",
        "SC"
    ],
    "29385": [
        "WELLFORD",
        "SC"
    ],
    "29386": [
        "WHITE STONE",
        "SC"
    ],
    "29388": [
        "WOODRUFF",
        "SC"
    ],
    "29395": [
        "JONESVILLE",
        "SC"
    ],
    "29401": [
        "CHARLESTON",
        "SC"
    ],
    "29402": [
        "CHARLESTON",
        "SC"
    ],
    "29403": [
        "CHARLESTON",
        "SC"
    ],
    "29404": [
        "CHARLESTON AFB",
        "SC"
    ],
    "29405": [
        "NORTH CHARLESTON",
        "SC"
    ],
    "29406": [
        "CHARLESTON",
        "SC"
    ],
    "29407": [
        "CHARLESTON",
        "SC"
    ],
    "29409": [
        "CHARLESTON",
        "SC"
    ],
    "29410": [
        "HANAHAN",
        "SC"
    ],
    "29412": [
        "CHARLESTON",
        "SC"
    ],
    "29413": [
        "CHARLESTON",
        "SC"
    ],
    "29414": [
        "CHARLESTON",
        "SC"
    ],
    "29415": [
        "NORTH CHARLESTON",
        "SC"
    ],
    "29416": [
        "CHARLESTON",
        "SC"
    ],
    "29417": [
        "CHARLESTON",
        "SC"
    ],
    "29418": [
        "NORTH CHARLESTON",
        "SC"
    ],
    "29419": [
        "NORTH CHARLESTON",
        "SC"
    ],
    "29420": [
        "NORTH CHARLESTON",
        "SC"
    ],
    "29422": [
        "CHARLESTON",
        "SC"
    ],
    "29423": [
        "CHARLESTON",
        "SC"
    ],
    "29424": [
        "CHARLESTON",
        "SC"
    ],
    "29425": [
        "CHARLESTON",
        "SC"
    ],
    "29426": [
        "ADAMS RUN",
        "SC"
    ],
    "29429": [
        "AWENDAW",
        "SC"
    ],
    "29431": [
        "BONNEAU",
        "SC"
    ],
    "29432": [
        "BRANCHVILLE",
        "SC"
    ],
    "29433": [
        "CANADYS",
        "SC"
    ],
    "29434": [
        "CORDESVILLE",
        "SC"
    ],
    "29435": [
        "COTTAGEVILLE",
        "SC"
    ],
    "29436": [
        "CROSS",
        "SC"
    ],
    "29437": [
        "DORCHESTER",
        "SC"
    ],
    "29438": [
        "EDISTO ISLAND",
        "SC"
    ],
    "29439": [
        "FOLLY BEACH",
        "SC"
    ],
    "29440": [
        "GEORGETOWN",
        "SC"
    ],
    "29442": [
        "GEORGETOWN",
        "SC"
    ],
    "29445": [
        "GOOSE CREEK",
        "SC"
    ],
    "29446": [
        "GREEN POND",
        "SC"
    ],
    "29448": [
        "HARLEYVILLE",
        "SC"
    ],
    "29449": [
        "HOLLYWOOD",
        "SC"
    ],
    "29450": [
        "HUGER",
        "SC"
    ],
    "29451": [
        "ISLE OF PALMS",
        "SC"
    ],
    "29452": [
        "JACKSONBORO",
        "SC"
    ],
    "29453": [
        "JAMESTOWN",
        "SC"
    ],
    "29455": [
        "JOHNS ISLAND",
        "SC"
    ],
    "29456": [
        "LADSON",
        "SC"
    ],
    "29457": [
        "JOHNS ISLAND",
        "SC"
    ],
    "29458": [
        "MC CLELLANVILLE",
        "SC"
    ],
    "29461": [
        "MONCKS CORNER",
        "SC"
    ],
    "29464": [
        "MOUNT PLEASANT",
        "SC"
    ],
    "29465": [
        "MOUNT PLEASANT",
        "SC"
    ],
    "29466": [
        "MOUNT PLEASANT",
        "SC"
    ],
    "29468": [
        "PINEVILLE",
        "SC"
    ],
    "29469": [
        "PINOPOLIS",
        "SC"
    ],
    "29470": [
        "RAVENEL",
        "SC"
    ],
    "29471": [
        "REEVESVILLE",
        "SC"
    ],
    "29472": [
        "RIDGEVILLE",
        "SC"
    ],
    "29474": [
        "ROUND O",
        "SC"
    ],
    "29475": [
        "RUFFIN",
        "SC"
    ],
    "29476": [
        "RUSSELLVILLE",
        "SC"
    ],
    "29477": [
        "SAINT GEORGE",
        "SC"
    ],
    "29479": [
        "SAINT STEPHEN",
        "SC"
    ],
    "29481": [
        "SMOAKS",
        "SC"
    ],
    "29482": [
        "SULLIVANS ISLAND",
        "SC"
    ],
    "29483": [
        "SUMMERVILLE",
        "SC"
    ],
    "29484": [
        "SUMMERVILLE",
        "SC"
    ],
    "29485": [
        "SUMMERVILLE",
        "SC"
    ],
    "29487": [
        "WADMALAW ISLAND",
        "SC"
    ],
    "29488": [
        "WALTERBORO",
        "SC"
    ],
    "29492": [
        "CHARLESTON",
        "SC"
    ],
    "29493": [
        "WILLIAMS",
        "SC"
    ],
    "29501": [
        "FLORENCE",
        "SC"
    ],
    "29502": [
        "FLORENCE",
        "SC"
    ],
    "29503": [
        "FLORENCE",
        "SC"
    ],
    "29504": [
        "FLORENCE",
        "SC"
    ],
    "29505": [
        "FLORENCE",
        "SC"
    ],
    "29506": [
        "FLORENCE",
        "SC"
    ],
    "29510": [
        "ANDREWS",
        "SC"
    ],
    "29511": [
        "AYNOR",
        "SC"
    ],
    "29512": [
        "BENNETTSVILLE",
        "SC"
    ],
    "29516": [
        "BLENHEIM",
        "SC"
    ],
    "29518": [
        "CADES",
        "SC"
    ],
    "29519": [
        "CENTENARY",
        "SC"
    ],
    "29520": [
        "CHERAW",
        "SC"
    ],
    "29525": [
        "CLIO",
        "SC"
    ],
    "29526": [
        "CONWAY",
        "SC"
    ],
    "29527": [
        "CONWAY",
        "SC"
    ],
    "29528": [
        "CONWAY",
        "SC"
    ],
    "29530": [
        "COWARD",
        "SC"
    ],
    "29532": [
        "DARLINGTON",
        "SC"
    ],
    "29536": [
        "DILLON",
        "SC"
    ],
    "29540": [
        "DARLINGTON",
        "SC"
    ],
    "29541": [
        "EFFINGHAM",
        "SC"
    ],
    "29543": [
        "FORK",
        "SC"
    ],
    "29544": [
        "GALIVANTS FERRY",
        "SC"
    ],
    "29545": [
        "GREEN SEA",
        "SC"
    ],
    "29546": [
        "GRESHAM",
        "SC"
    ],
    "29547": [
        "HAMER",
        "SC"
    ],
    "29550": [
        "HARTSVILLE",
        "SC"
    ],
    "29551": [
        "HARTSVILLE",
        "SC"
    ],
    "29554": [
        "HEMINGWAY",
        "SC"
    ],
    "29555": [
        "JOHNSONVILLE",
        "SC"
    ],
    "29556": [
        "KINGSTREE",
        "SC"
    ],
    "29560": [
        "LAKE CITY",
        "SC"
    ],
    "29563": [
        "LAKE VIEW",
        "SC"
    ],
    "29564": [
        "LANE",
        "SC"
    ],
    "29565": [
        "LATTA",
        "SC"
    ],
    "29566": [
        "LITTLE RIVER",
        "SC"
    ],
    "29567": [
        "LITTLE ROCK",
        "SC"
    ],
    "29568": [
        "LONGS",
        "SC"
    ],
    "29569": [
        "LORIS",
        "SC"
    ],
    "29570": [
        "MC COLL",
        "SC"
    ],
    "29571": [
        "MARION",
        "SC"
    ],
    "29572": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29574": [
        "MULLINS",
        "SC"
    ],
    "29575": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29576": [
        "MURRELLS INLET",
        "SC"
    ],
    "29577": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29578": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29579": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29580": [
        "NESMITH",
        "SC"
    ],
    "29581": [
        "NICHOLS",
        "SC"
    ],
    "29582": [
        "NORTH MYRTLE BEACH",
        "SC"
    ],
    "29583": [
        "PAMPLICO",
        "SC"
    ],
    "29584": [
        "PATRICK",
        "SC"
    ],
    "29585": [
        "PAWLEYS ISLAND",
        "SC"
    ],
    "29587": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29588": [
        "MYRTLE BEACH",
        "SC"
    ],
    "29590": [
        "SALTERS",
        "SC"
    ],
    "29591": [
        "SCRANTON",
        "SC"
    ],
    "29592": [
        "SELLERS",
        "SC"
    ],
    "29593": [
        "SOCIETY HILL",
        "SC"
    ],
    "29594": [
        "TATUM",
        "SC"
    ],
    "29596": [
        "WALLACE",
        "SC"
    ],
    "29597": [
        "NORTH MYRTLE BEACH",
        "SC"
    ],
    "29598": [
        "NORTH MYRTLE BEACH",
        "SC"
    ],
    "29601": [
        "GREENVILLE",
        "SC"
    ],
    "29602": [
        "GREENVILLE",
        "SC"
    ],
    "29603": [
        "GREENVILLE",
        "SC"
    ],
    "29604": [
        "GREENVILLE",
        "SC"
    ],
    "29605": [
        "GREENVILLE",
        "SC"
    ],
    "29606": [
        "GREENVILLE",
        "SC"
    ],
    "29607": [
        "GREENVILLE",
        "SC"
    ],
    "29608": [
        "GREENVILLE",
        "SC"
    ],
    "29609": [
        "GREENVILLE",
        "SC"
    ],
    "29610": [
        "GREENVILLE",
        "SC"
    ],
    "29611": [
        "GREENVILLE",
        "SC"
    ],
    "29612": [
        "GREENVILLE",
        "SC"
    ],
    "29613": [
        "GREENVILLE",
        "SC"
    ],
    "29614": [
        "GREENVILLE",
        "SC"
    ],
    "29615": [
        "GREENVILLE",
        "SC"
    ],
    "29616": [
        "GREENVILLE",
        "SC"
    ],
    "29617": [
        "GREENVILLE",
        "SC"
    ],
    "29620": [
        "ABBEVILLE",
        "SC"
    ],
    "29621": [
        "ANDERSON",
        "SC"
    ],
    "29622": [
        "ANDERSON",
        "SC"
    ],
    "29623": [
        "ANDERSON",
        "SC"
    ],
    "29624": [
        "ANDERSON",
        "SC"
    ],
    "29625": [
        "ANDERSON",
        "SC"
    ],
    "29626": [
        "ANDERSON",
        "SC"
    ],
    "29627": [
        "BELTON",
        "SC"
    ],
    "29628": [
        "CALHOUN FALLS",
        "SC"
    ],
    "29630": [
        "CENTRAL",
        "SC"
    ],
    "29631": [
        "CLEMSON",
        "SC"
    ],
    "29632": [
        "CLEMSON",
        "SC"
    ],
    "29633": [
        "CLEMSON",
        "SC"
    ],
    "29634": [
        "CLEMSON",
        "SC"
    ],
    "29635": [
        "CLEVELAND",
        "SC"
    ],
    "29636": [
        "CONESTEE",
        "SC"
    ],
    "29638": [
        "DONALDS",
        "SC"
    ],
    "29639": [
        "DUE WEST",
        "SC"
    ],
    "29640": [
        "EASLEY",
        "SC"
    ],
    "29641": [
        "EASLEY",
        "SC"
    ],
    "29642": [
        "EASLEY",
        "SC"
    ],
    "29643": [
        "FAIR PLAY",
        "SC"
    ],
    "29644": [
        "FOUNTAIN INN",
        "SC"
    ],
    "29645": [
        "GRAY COURT",
        "SC"
    ],
    "29646": [
        "GREENWOOD",
        "SC"
    ],
    "29647": [
        "GREENWOOD",
        "SC"
    ],
    "29648": [
        "GREENWOOD",
        "SC"
    ],
    "29649": [
        "GREENWOOD",
        "SC"
    ],
    "29650": [
        "GREER",
        "SC"
    ],
    "29651": [
        "GREER",
        "SC"
    ],
    "29652": [
        "GREER",
        "SC"
    ],
    "29653": [
        "HODGES",
        "SC"
    ],
    "29654": [
        "HONEA PATH",
        "SC"
    ],
    "29655": [
        "IVA",
        "SC"
    ],
    "29656": [
        "LA FRANCE",
        "SC"
    ],
    "29657": [
        "LIBERTY",
        "SC"
    ],
    "29658": [
        "LONG CREEK",
        "SC"
    ],
    "29661": [
        "MARIETTA",
        "SC"
    ],
    "29662": [
        "MAULDIN",
        "SC"
    ],
    "29664": [
        "MOUNTAIN REST",
        "SC"
    ],
    "29665": [
        "NEWRY",
        "SC"
    ],
    "29666": [
        "NINETY SIX",
        "SC"
    ],
    "29667": [
        "NORRIS",
        "SC"
    ],
    "29669": [
        "PELZER",
        "SC"
    ],
    "29670": [
        "PENDLETON",
        "SC"
    ],
    "29671": [
        "PICKENS",
        "SC"
    ],
    "29672": [
        "SENECA",
        "SC"
    ],
    "29673": [
        "PIEDMONT",
        "SC"
    ],
    "29675": [
        "RICHLAND",
        "SC"
    ],
    "29676": [
        "SALEM",
        "SC"
    ],
    "29677": [
        "SANDY SPRINGS",
        "SC"
    ],
    "29678": [
        "SENECA",
        "SC"
    ],
    "29679": [
        "SENECA",
        "SC"
    ],
    "29680": [
        "SIMPSONVILLE",
        "SC"
    ],
    "29681": [
        "SIMPSONVILLE",
        "SC"
    ],
    "29682": [
        "SIX MILE",
        "SC"
    ],
    "29683": [
        "SLATER",
        "SC"
    ],
    "29684": [
        "STARR",
        "SC"
    ],
    "29685": [
        "SUNSET",
        "SC"
    ],
    "29686": [
        "TAMASSEE",
        "SC"
    ],
    "29687": [
        "TAYLORS",
        "SC"
    ],
    "29688": [
        "TIGERVILLE",
        "SC"
    ],
    "29689": [
        "TOWNVILLE",
        "SC"
    ],
    "29690": [
        "TRAVELERS REST",
        "SC"
    ],
    "29691": [
        "WALHALLA",
        "SC"
    ],
    "29692": [
        "WARE SHOALS",
        "SC"
    ],
    "29693": [
        "WESTMINSTER",
        "SC"
    ],
    "29696": [
        "WEST UNION",
        "SC"
    ],
    "29697": [
        "WILLIAMSTON",
        "SC"
    ],
    "29702": [
        "BLACKSBURG",
        "SC"
    ],
    "29703": [
        "BOWLING GREEN",
        "SC"
    ],
    "29704": [
        "CATAWBA",
        "SC"
    ],
    "29706": [
        "CHESTER",
        "SC"
    ],
    "29707": [
        "FORT MILL",
        "SC"
    ],
    "29708": [
        "FORT MILL",
        "SC"
    ],
    "29709": [
        "CHESTERFIELD",
        "SC"
    ],
    "29710": [
        "CLOVER",
        "SC"
    ],
    "29712": [
        "EDGEMOOR",
        "SC"
    ],
    "29714": [
        "FORT LAWN",
        "SC"
    ],
    "29715": [
        "FORT MILL",
        "SC"
    ],
    "29716": [
        "FORT MILL",
        "SC"
    ],
    "29717": [
        "HICKORY GROVE",
        "SC"
    ],
    "29718": [
        "JEFFERSON",
        "SC"
    ],
    "29720": [
        "LANCASTER",
        "SC"
    ],
    "29721": [
        "LANCASTER",
        "SC"
    ],
    "29726": [
        "MC CONNELLS",
        "SC"
    ],
    "29727": [
        "MOUNT CROGHAN",
        "SC"
    ],
    "29728": [
        "PAGELAND",
        "SC"
    ],
    "29729": [
        "RICHBURG",
        "SC"
    ],
    "29730": [
        "ROCK HILL",
        "SC"
    ],
    "29731": [
        "ROCK HILL",
        "SC"
    ],
    "29732": [
        "ROCK HILL",
        "SC"
    ],
    "29733": [
        "ROCK HILL",
        "SC"
    ],
    "29741": [
        "RUBY",
        "SC"
    ],
    "29742": [
        "SHARON",
        "SC"
    ],
    "29743": [
        "SMYRNA",
        "SC"
    ],
    "29744": [
        "VAN WYCK",
        "SC"
    ],
    "29745": [
        "YORK",
        "SC"
    ],
    "29801": [
        "AIKEN",
        "SC"
    ],
    "29802": [
        "AIKEN",
        "SC"
    ],
    "29803": [
        "AIKEN",
        "SC"
    ],
    "29804": [
        "AIKEN",
        "SC"
    ],
    "29805": [
        "AIKEN",
        "SC"
    ],
    "29808": [
        "AIKEN",
        "SC"
    ],
    "29809": [
        "NEW ELLENTON",
        "SC"
    ],
    "29810": [
        "ALLENDALE",
        "SC"
    ],
    "29812": [
        "BARNWELL",
        "SC"
    ],
    "29813": [
        "HILDA",
        "SC"
    ],
    "29816": [
        "BATH",
        "SC"
    ],
    "29817": [
        "BLACKVILLE",
        "SC"
    ],
    "29819": [
        "BRADLEY",
        "SC"
    ],
    "29821": [
        "CLARKS HILL",
        "SC"
    ],
    "29822": [
        "CLEARWATER",
        "SC"
    ],
    "29824": [
        "EDGEFIELD",
        "SC"
    ],
    "29826": [
        "ELKO",
        "SC"
    ],
    "29827": [
        "FAIRFAX",
        "SC"
    ],
    "29828": [
        "GLOVERVILLE",
        "SC"
    ],
    "29829": [
        "GRANITEVILLE",
        "SC"
    ],
    "29831": [
        "JACKSON",
        "SC"
    ],
    "29832": [
        "JOHNSTON",
        "SC"
    ],
    "29834": [
        "LANGLEY",
        "SC"
    ],
    "29835": [
        "MC CORMICK",
        "SC"
    ],
    "29836": [
        "MARTIN",
        "SC"
    ],
    "29838": [
        "MODOC",
        "SC"
    ],
    "29839": [
        "MONTMORENCI",
        "SC"
    ],
    "29840": [
        "MOUNT CARMEL",
        "SC"
    ],
    "29841": [
        "NORTH AUGUSTA",
        "SC"
    ],
    "29842": [
        "BEECH ISLAND",
        "SC"
    ],
    "29843": [
        "OLAR",
        "SC"
    ],
    "29844": [
        "PARKSVILLE",
        "SC"
    ],
    "29845": [
        "PLUM BRANCH",
        "SC"
    ],
    "29846": [
        "SYCAMORE",
        "SC"
    ],
    "29847": [
        "TRENTON",
        "SC"
    ],
    "29848": [
        "TROY",
        "SC"
    ],
    "29849": [
        "ULMER",
        "SC"
    ],
    "29851": [
        "WARRENVILLE",
        "SC"
    ],
    "29853": [
        "WILLISTON",
        "SC"
    ],
    "29856": [
        "WINDSOR",
        "SC"
    ],
    "29860": [
        "NORTH AUGUSTA",
        "SC"
    ],
    "29861": [
        "NORTH AUGUSTA",
        "SC"
    ],
    "29901": [
        "BEAUFORT",
        "SC"
    ],
    "29902": [
        "BEAUFORT",
        "SC"
    ],
    "29903": [
        "BEAUFORT",
        "SC"
    ],
    "29904": [
        "BEAUFORT",
        "SC"
    ],
    "29905": [
        "PARRIS ISLAND",
        "SC"
    ],
    "29906": [
        "BEAUFORT",
        "SC"
    ],
    "29907": [
        "BEAUFORT",
        "SC"
    ],
    "29909": [
        "OKATIE",
        "SC"
    ],
    "29910": [
        "BLUFFTON",
        "SC"
    ],
    "29911": [
        "BRUNSON",
        "SC"
    ],
    "29912": [
        "COOSAWHATCHIE",
        "SC"
    ],
    "29914": [
        "DALE",
        "SC"
    ],
    "29915": [
        "DAUFUSKIE ISLAND",
        "SC"
    ],
    "29916": [
        "EARLY BRANCH",
        "SC"
    ],
    "29918": [
        "ESTILL",
        "SC"
    ],
    "29920": [
        "SAINT HELENA ISLAND",
        "SC"
    ],
    "29921": [
        "FURMAN",
        "SC"
    ],
    "29922": [
        "GARNETT",
        "SC"
    ],
    "29923": [
        "GIFFORD",
        "SC"
    ],
    "29924": [
        "HAMPTON",
        "SC"
    ],
    "29925": [
        "HILTON HEAD ISLAND",
        "SC"
    ],
    "29926": [
        "HILTON HEAD ISLAND",
        "SC"
    ],
    "29927": [
        "HARDEEVILLE",
        "SC"
    ],
    "29928": [
        "HILTON HEAD ISLAND",
        "SC"
    ],
    "29929": [
        "ISLANDTON",
        "SC"
    ],
    "29931": [
        "LOBECO",
        "SC"
    ],
    "29932": [
        "LURAY",
        "SC"
    ],
    "29934": [
        "PINELAND",
        "SC"
    ],
    "29935": [
        "PORT ROYAL",
        "SC"
    ],
    "29936": [
        "RIDGELAND",
        "SC"
    ],
    "29938": [
        "HILTON HEAD ISLAND",
        "SC"
    ],
    "29939": [
        "SCOTIA",
        "SC"
    ],
    "29940": [
        "SEABROOK",
        "SC"
    ],
    "29941": [
        "SHELDON",
        "SC"
    ],
    "29943": [
        "TILLMAN",
        "SC"
    ],
    "29944": [
        "VARNVILLE",
        "SC"
    ],
    "29945": [
        "YEMASSEE",
        "SC"
    ],
    "30002": [
        "AVONDALE ESTATES",
        "GA"
    ],
    "30003": [
        "NORCROSS",
        "GA"
    ],
    "30004": [
        "ALPHARETTA",
        "GA"
    ],
    "30005": [
        "ALPHARETTA",
        "GA"
    ],
    "30006": [
        "MARIETTA",
        "GA"
    ],
    "30007": [
        "MARIETTA",
        "GA"
    ],
    "30008": [
        "MARIETTA",
        "GA"
    ],
    "30009": [
        "ALPHARETTA",
        "GA"
    ],
    "30010": [
        "NORCROSS",
        "GA"
    ],
    "30011": [
        "AUBURN",
        "GA"
    ],
    "30012": [
        "CONYERS",
        "GA"
    ],
    "30013": [
        "CONYERS",
        "GA"
    ],
    "30014": [
        "COVINGTON",
        "GA"
    ],
    "30015": [
        "COVINGTON",
        "GA"
    ],
    "30016": [
        "COVINGTON",
        "GA"
    ],
    "30017": [
        "GRAYSON",
        "GA"
    ],
    "30018": [
        "JERSEY",
        "GA"
    ],
    "30019": [
        "DACULA",
        "GA"
    ],
    "30021": [
        "CLARKSTON",
        "GA"
    ],
    "30022": [
        "ALPHARETTA",
        "GA"
    ],
    "30023": [
        "ALPHARETTA",
        "GA"
    ],
    "30024": [
        "SUWANEE",
        "GA"
    ],
    "30025": [
        "SOCIAL CIRCLE",
        "GA"
    ],
    "30026": [
        "NORTH METRO",
        "GA"
    ],
    "30028": [
        "CUMMING",
        "GA"
    ],
    "30029": [
        "NORTH METRO",
        "GA"
    ],
    "30030": [
        "DECATUR",
        "GA"
    ],
    "30031": [
        "DECATUR",
        "GA"
    ],
    "30032": [
        "DECATUR",
        "GA"
    ],
    "30033": [
        "DECATUR",
        "GA"
    ],
    "30034": [
        "DECATUR",
        "GA"
    ],
    "30035": [
        "DECATUR",
        "GA"
    ],
    "30036": [
        "DECATUR",
        "GA"
    ],
    "30037": [
        "DECATUR",
        "GA"
    ],
    "30038": [
        "LITHONIA",
        "GA"
    ],
    "30039": [
        "SNELLVILLE",
        "GA"
    ],
    "30040": [
        "CUMMING",
        "GA"
    ],
    "30041": [
        "CUMMING",
        "GA"
    ],
    "30042": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30043": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30044": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30045": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30046": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30047": [
        "LILBURN",
        "GA"
    ],
    "30048": [
        "LILBURN",
        "GA"
    ],
    "30049": [
        "LAWRENCEVILLE",
        "GA"
    ],
    "30052": [
        "LOGANVILLE",
        "GA"
    ],
    "30054": [
        "OXFORD",
        "GA"
    ],
    "30055": [
        "MANSFIELD",
        "GA"
    ],
    "30056": [
        "NEWBORN",
        "GA"
    ],
    "30058": [
        "LITHONIA",
        "GA"
    ],
    "30060": [
        "MARIETTA",
        "GA"
    ],
    "30061": [
        "MARIETTA",
        "GA"
    ],
    "30062": [
        "MARIETTA",
        "GA"
    ],
    "30063": [
        "MARIETTA",
        "GA"
    ],
    "30064": [
        "MARIETTA",
        "GA"
    ],
    "30065": [
        "MARIETTA",
        "GA"
    ],
    "30066": [
        "MARIETTA",
        "GA"
    ],
    "30067": [
        "MARIETTA",
        "GA"
    ],
    "30068": [
        "MARIETTA",
        "GA"
    ],
    "30069": [
        "MARIETTA",
        "GA"
    ],
    "30070": [
        "PORTERDALE",
        "GA"
    ],
    "30071": [
        "NORCROSS",
        "GA"
    ],
    "30072": [
        "PINE LAKE",
        "GA"
    ],
    "30074": [
        "REDAN",
        "GA"
    ],
    "30075": [
        "ROSWELL",
        "GA"
    ],
    "30076": [
        "ROSWELL",
        "GA"
    ],
    "30077": [
        "ROSWELL",
        "GA"
    ],
    "30078": [
        "SNELLVILLE",
        "GA"
    ],
    "30079": [
        "SCOTTDALE",
        "GA"
    ],
    "30080": [
        "SMYRNA",
        "GA"
    ],
    "30081": [
        "SMYRNA",
        "GA"
    ],
    "30082": [
        "SMYRNA",
        "GA"
    ],
    "30083": [
        "STONE MOUNTAIN",
        "GA"
    ],
    "30084": [
        "TUCKER",
        "GA"
    ],
    "30085": [
        "TUCKER",
        "GA"
    ],
    "30086": [
        "STONE MOUNTAIN",
        "GA"
    ],
    "30087": [
        "STONE MOUNTAIN",
        "GA"
    ],
    "30088": [
        "STONE MOUNTAIN",
        "GA"
    ],
    "30090": [
        "MARIETTA",
        "GA"
    ],
    "30091": [
        "NORCROSS",
        "GA"
    ],
    "30092": [
        "NORCROSS",
        "GA"
    ],
    "30093": [
        "NORCROSS",
        "GA"
    ],
    "30094": [
        "CONYERS",
        "GA"
    ],
    "30095": [
        "DULUTH",
        "GA"
    ],
    "30096": [
        "DULUTH",
        "GA"
    ],
    "30097": [
        "DULUTH",
        "GA"
    ],
    "30098": [
        "DULUTH",
        "GA"
    ],
    "30099": [
        "DULUTH",
        "GA"
    ],
    "30101": [
        "ACWORTH",
        "GA"
    ],
    "30102": [
        "ACWORTH",
        "GA"
    ],
    "30103": [
        "ADAIRSVILLE",
        "GA"
    ],
    "30104": [
        "ARAGON",
        "GA"
    ],
    "30105": [
        "ARMUCHEE",
        "GA"
    ],
    "30106": [
        "AUSTELL",
        "GA"
    ],
    "30107": [
        "BALL GROUND",
        "GA"
    ],
    "30108": [
        "BOWDON",
        "GA"
    ],
    "30109": [
        "BOWDON JUNCTION",
        "GA"
    ],
    "30110": [
        "BREMEN",
        "GA"
    ],
    "30111": [
        "CLARKDALE",
        "GA"
    ],
    "30112": [
        "CARROLLTON",
        "GA"
    ],
    "30113": [
        "BUCHANAN",
        "GA"
    ],
    "30114": [
        "CANTON",
        "GA"
    ],
    "30115": [
        "CANTON",
        "GA"
    ],
    "30116": [
        "CARROLLTON",
        "GA"
    ],
    "30117": [
        "CARROLLTON",
        "GA"
    ],
    "30118": [
        "CARROLLTON",
        "GA"
    ],
    "30119": [
        "CARROLLTON",
        "GA"
    ],
    "30120": [
        "CARTERSVILLE",
        "GA"
    ],
    "30121": [
        "CARTERSVILLE",
        "GA"
    ],
    "30122": [
        "LITHIA SPRINGS",
        "GA"
    ],
    "30123": [
        "CASSVILLE",
        "GA"
    ],
    "30124": [
        "CAVE SPRING",
        "GA"
    ],
    "30125": [
        "CEDARTOWN",
        "GA"
    ],
    "30126": [
        "MABLETON",
        "GA"
    ],
    "30127": [
        "POWDER SPRINGS",
        "GA"
    ],
    "30129": [
        "COOSA",
        "GA"
    ],
    "30132": [
        "DALLAS",
        "GA"
    ],
    "30133": [
        "DOUGLASVILLE",
        "GA"
    ],
    "30134": [
        "DOUGLASVILLE",
        "GA"
    ],
    "30135": [
        "DOUGLASVILLE",
        "GA"
    ],
    "30137": [
        "EMERSON",
        "GA"
    ],
    "30138": [
        "ESOM HILL",
        "GA"
    ],
    "30139": [
        "FAIRMOUNT",
        "GA"
    ],
    "30140": [
        "FELTON",
        "GA"
    ],
    "30141": [
        "HIRAM",
        "GA"
    ],
    "30142": [
        "HOLLY SPRINGS",
        "GA"
    ],
    "30143": [
        "JASPER",
        "GA"
    ],
    "30144": [
        "KENNESAW",
        "GA"
    ],
    "30145": [
        "KINGSTON",
        "GA"
    ],
    "30146": [
        "LEBANON",
        "GA"
    ],
    "30147": [
        "LINDALE",
        "GA"
    ],
    "30148": [
        "MARBLE HILL",
        "GA"
    ],
    "30149": [
        "MOUNT BERRY",
        "GA"
    ],
    "30150": [
        "MOUNT ZION",
        "GA"
    ],
    "30151": [
        "NELSON",
        "GA"
    ],
    "30152": [
        "KENNESAW",
        "GA"
    ],
    "30153": [
        "ROCKMART",
        "GA"
    ],
    "30154": [
        "DOUGLASVILLE",
        "GA"
    ],
    "30156": [
        "KENNESAW",
        "GA"
    ],
    "30157": [
        "DALLAS",
        "GA"
    ],
    "30160": [
        "KENNESAW",
        "GA"
    ],
    "30161": [
        "ROME",
        "GA"
    ],
    "30162": [
        "ROME",
        "GA"
    ],
    "30163": [
        "ROME",
        "GA"
    ],
    "30164": [
        "ROME",
        "GA"
    ],
    "30165": [
        "ROME",
        "GA"
    ],
    "30168": [
        "AUSTELL",
        "GA"
    ],
    "30169": [
        "CANTON",
        "GA"
    ],
    "30170": [
        "ROOPVILLE",
        "GA"
    ],
    "30171": [
        "RYDAL",
        "GA"
    ],
    "30172": [
        "SHANNON",
        "GA"
    ],
    "30173": [
        "SILVER CREEK",
        "GA"
    ],
    "30175": [
        "TALKING ROCK",
        "GA"
    ],
    "30176": [
        "TALLAPOOSA",
        "GA"
    ],
    "30177": [
        "TATE",
        "GA"
    ],
    "30178": [
        "TAYLORSVILLE",
        "GA"
    ],
    "30179": [
        "TEMPLE",
        "GA"
    ],
    "30180": [
        "VILLA RICA",
        "GA"
    ],
    "30182": [
        "WACO",
        "GA"
    ],
    "30183": [
        "WALESKA",
        "GA"
    ],
    "30184": [
        "WHITE",
        "GA"
    ],
    "30185": [
        "WHITESBURG",
        "GA"
    ],
    "30187": [
        "WINSTON",
        "GA"
    ],
    "30188": [
        "WOODSTOCK",
        "GA"
    ],
    "30189": [
        "WOODSTOCK",
        "GA"
    ],
    "30204": [
        "BARNESVILLE",
        "GA"
    ],
    "30205": [
        "BROOKS",
        "GA"
    ],
    "30206": [
        "CONCORD",
        "GA"
    ],
    "30212": [
        "EXPERIMENT",
        "GA"
    ],
    "30213": [
        "FAIRBURN",
        "GA"
    ],
    "30214": [
        "FAYETTEVILLE",
        "GA"
    ],
    "30215": [
        "FAYETTEVILLE",
        "GA"
    ],
    "30216": [
        "FLOVILLA",
        "GA"
    ],
    "30217": [
        "FRANKLIN",
        "GA"
    ],
    "30218": [
        "GAY",
        "GA"
    ],
    "30220": [
        "GRANTVILLE",
        "GA"
    ],
    "30222": [
        "GREENVILLE",
        "GA"
    ],
    "30223": [
        "GRIFFIN",
        "GA"
    ],
    "30224": [
        "GRIFFIN",
        "GA"
    ],
    "30228": [
        "HAMPTON",
        "GA"
    ],
    "30229": [
        "HARALSON",
        "GA"
    ],
    "30230": [
        "HOGANSVILLE",
        "GA"
    ],
    "30233": [
        "JACKSON",
        "GA"
    ],
    "30234": [
        "JENKINSBURG",
        "GA"
    ],
    "30236": [
        "JONESBORO",
        "GA"
    ],
    "30237": [
        "JONESBORO",
        "GA"
    ],
    "30238": [
        "JONESBORO",
        "GA"
    ],
    "30240": [
        "LAGRANGE",
        "GA"
    ],
    "30241": [
        "LAGRANGE",
        "GA"
    ],
    "30248": [
        "LOCUST GROVE",
        "GA"
    ],
    "30250": [
        "LOVEJOY",
        "GA"
    ],
    "30251": [
        "LUTHERSVILLE",
        "GA"
    ],
    "30252": [
        "MCDONOUGH",
        "GA"
    ],
    "30253": [
        "MCDONOUGH",
        "GA"
    ],
    "30256": [
        "MEANSVILLE",
        "GA"
    ],
    "30257": [
        "MILNER",
        "GA"
    ],
    "30258": [
        "MOLENA",
        "GA"
    ],
    "30259": [
        "MORELAND",
        "GA"
    ],
    "30260": [
        "MORROW",
        "GA"
    ],
    "30261": [
        "LAGRANGE",
        "GA"
    ],
    "30263": [
        "NEWNAN",
        "GA"
    ],
    "30264": [
        "NEWNAN",
        "GA"
    ],
    "30265": [
        "NEWNAN",
        "GA"
    ],
    "30266": [
        "ORCHARD HILL",
        "GA"
    ],
    "30268": [
        "PALMETTO",
        "GA"
    ],
    "30269": [
        "PEACHTREE CITY",
        "GA"
    ],
    "30271": [
        "NEWNAN",
        "GA"
    ],
    "30272": [
        "RED OAK",
        "GA"
    ],
    "30273": [
        "REX",
        "GA"
    ],
    "30274": [
        "RIVERDALE",
        "GA"
    ],
    "30275": [
        "SARGENT",
        "GA"
    ],
    "30276": [
        "SENOIA",
        "GA"
    ],
    "30277": [
        "SHARPSBURG",
        "GA"
    ],
    "30281": [
        "STOCKBRIDGE",
        "GA"
    ],
    "30284": [
        "SUNNY SIDE",
        "GA"
    ],
    "30285": [
        "THE ROCK",
        "GA"
    ],
    "30286": [
        "THOMASTON",
        "GA"
    ],
    "30287": [
        "MORROW",
        "GA"
    ],
    "30288": [
        "CONLEY",
        "GA"
    ],
    "30289": [
        "TURIN",
        "GA"
    ],
    "30290": [
        "TYRONE",
        "GA"
    ],
    "30291": [
        "UNION CITY",
        "GA"
    ],
    "30292": [
        "WILLIAMSON",
        "GA"
    ],
    "30293": [
        "WOODBURY",
        "GA"
    ],
    "30294": [
        "ELLENWOOD",
        "GA"
    ],
    "30295": [
        "ZEBULON",
        "GA"
    ],
    "30296": [
        "RIVERDALE",
        "GA"
    ],
    "30297": [
        "FOREST PARK",
        "GA"
    ],
    "30298": [
        "FOREST PARK",
        "GA"
    ],
    "30301": [
        "ATLANTA",
        "GA"
    ],
    "30302": [
        "ATLANTA",
        "GA"
    ],
    "30303": [
        "ATLANTA",
        "GA"
    ],
    "30304": [
        "ATLANTA",
        "GA"
    ],
    "30305": [
        "ATLANTA",
        "GA"
    ],
    "30306": [
        "ATLANTA",
        "GA"
    ],
    "30307": [
        "ATLANTA",
        "GA"
    ],
    "30308": [
        "ATLANTA",
        "GA"
    ],
    "30309": [
        "ATLANTA",
        "GA"
    ],
    "30310": [
        "ATLANTA",
        "GA"
    ],
    "30311": [
        "ATLANTA",
        "GA"
    ],
    "30312": [
        "ATLANTA",
        "GA"
    ],
    "30313": [
        "ATLANTA",
        "GA"
    ],
    "30314": [
        "ATLANTA",
        "GA"
    ],
    "30315": [
        "ATLANTA",
        "GA"
    ],
    "30316": [
        "ATLANTA",
        "GA"
    ],
    "30317": [
        "ATLANTA",
        "GA"
    ],
    "30318": [
        "ATLANTA",
        "GA"
    ],
    "30319": [
        "ATLANTA",
        "GA"
    ],
    "30320": [
        "ATLANTA",
        "GA"
    ],
    "30321": [
        "ATLANTA",
        "GA"
    ],
    "30322": [
        "ATLANTA",
        "GA"
    ],
    "30324": [
        "ATLANTA",
        "GA"
    ],
    "30325": [
        "ATLANTA",
        "GA"
    ],
    "30326": [
        "ATLANTA",
        "GA"
    ],
    "30327": [
        "ATLANTA",
        "GA"
    ],
    "30328": [
        "ATLANTA",
        "GA"
    ],
    "30329": [
        "ATLANTA",
        "GA"
    ],
    "30331": [
        "ATLANTA",
        "GA"
    ],
    "30332": [
        "ATLANTA",
        "GA"
    ],
    "30333": [
        "ATLANTA",
        "GA"
    ],
    "30334": [
        "ATLANTA",
        "GA"
    ],
    "30336": [
        "ATLANTA",
        "GA"
    ],
    "30337": [
        "ATLANTA",
        "GA"
    ],
    "30338": [
        "ATLANTA",
        "GA"
    ],
    "30339": [
        "ATLANTA",
        "GA"
    ],
    "30340": [
        "ATLANTA",
        "GA"
    ],
    "30341": [
        "ATLANTA",
        "GA"
    ],
    "30342": [
        "ATLANTA",
        "GA"
    ],
    "30343": [
        "ATLANTA",
        "GA"
    ],
    "30344": [
        "ATLANTA",
        "GA"
    ],
    "30345": [
        "ATLANTA",
        "GA"
    ],
    "30346": [
        "ATLANTA",
        "GA"
    ],
    "30348": [
        "ATLANTA",
        "GA"
    ],
    "30349": [
        "ATLANTA",
        "GA"
    ],
    "30350": [
        "ATLANTA",
        "GA"
    ],
    "30354": [
        "ATLANTA",
        "GA"
    ],
    "30355": [
        "ATLANTA",
        "GA"
    ],
    "30356": [
        "ATLANTA",
        "GA"
    ],
    "30357": [
        "ATLANTA",
        "GA"
    ],
    "30358": [
        "ATLANTA",
        "GA"
    ],
    "30359": [
        "ATLANTA",
        "GA"
    ],
    "30360": [
        "ATLANTA",
        "GA"
    ],
    "30361": [
        "ATLANTA",
        "GA"
    ],
    "30362": [
        "ATLANTA",
        "GA"
    ],
    "30363": [
        "ATLANTA",
        "GA"
    ],
    "30364": [
        "ATLANTA",
        "GA"
    ],
    "30366": [
        "ATLANTA",
        "GA"
    ],
    "30368": [
        "ATLANTA",
        "GA"
    ],
    "30371": [
        "ATLANTA",
        "GA"
    ],
    "30375": [
        "ATLANTA",
        "GA"
    ],
    "30377": [
        "ATLANTA",
        "GA"
    ],
    "30380": [
        "ATLANTA",
        "GA"
    ],
    "30392": [
        "ATLANTA",
        "GA"
    ],
    "30396": [
        "ATLANTA",
        "GA"
    ],
    "30401": [
        "SWAINSBORO",
        "GA"
    ],
    "30410": [
        "AILEY",
        "GA"
    ],
    "30411": [
        "ALAMO",
        "GA"
    ],
    "30412": [
        "ALSTON",
        "GA"
    ],
    "30413": [
        "BARTOW",
        "GA"
    ],
    "30414": [
        "BELLVILLE",
        "GA"
    ],
    "30415": [
        "BROOKLET",
        "GA"
    ],
    "30417": [
        "CLAXTON",
        "GA"
    ],
    "30420": [
        "COBBTOWN",
        "GA"
    ],
    "30421": [
        "COLLINS",
        "GA"
    ],
    "30423": [
        "DAISY",
        "GA"
    ],
    "30424": [
        "DOVER",
        "GA"
    ],
    "30425": [
        "GARFIELD",
        "GA"
    ],
    "30426": [
        "GIRARD",
        "GA"
    ],
    "30427": [
        "GLENNVILLE",
        "GA"
    ],
    "30428": [
        "GLENWOOD",
        "GA"
    ],
    "30429": [
        "HAGAN",
        "GA"
    ],
    "30434": [
        "LOUISVILLE",
        "GA"
    ],
    "30436": [
        "LYONS",
        "GA"
    ],
    "30438": [
        "MANASSAS",
        "GA"
    ],
    "30439": [
        "METTER",
        "GA"
    ],
    "30441": [
        "MIDVILLE",
        "GA"
    ],
    "30442": [
        "MILLEN",
        "GA"
    ],
    "30445": [
        "MOUNT VERNON",
        "GA"
    ],
    "30446": [
        "NEWINGTON",
        "GA"
    ],
    "30448": [
        "NUNEZ",
        "GA"
    ],
    "30449": [
        "OLIVER",
        "GA"
    ],
    "30450": [
        "PORTAL",
        "GA"
    ],
    "30451": [
        "PULASKI",
        "GA"
    ],
    "30452": [
        "REGISTER",
        "GA"
    ],
    "30453": [
        "REIDSVILLE",
        "GA"
    ],
    "30454": [
        "ROCKLEDGE",
        "GA"
    ],
    "30455": [
        "ROCKY FORD",
        "GA"
    ],
    "30456": [
        "SARDIS",
        "GA"
    ],
    "30457": [
        "SOPERTON",
        "GA"
    ],
    "30458": [
        "STATESBORO",
        "GA"
    ],
    "30459": [
        "STATESBORO",
        "GA"
    ],
    "30460": [
        "STATESBORO",
        "GA"
    ],
    "30461": [
        "STATESBORO",
        "GA"
    ],
    "30464": [
        "STILLMORE",
        "GA"
    ],
    "30467": [
        "SYLVANIA",
        "GA"
    ],
    "30470": [
        "TARRYTOWN",
        "GA"
    ],
    "30471": [
        "TWIN CITY",
        "GA"
    ],
    "30473": [
        "UVALDA",
        "GA"
    ],
    "30474": [
        "VIDALIA",
        "GA"
    ],
    "30475": [
        "VIDALIA",
        "GA"
    ],
    "30477": [
        "WADLEY",
        "GA"
    ],
    "30501": [
        "GAINESVILLE",
        "GA"
    ],
    "30502": [
        "CHESTNUT MOUNTAIN",
        "GA"
    ],
    "30503": [
        "GAINESVILLE",
        "GA"
    ],
    "30504": [
        "GAINESVILLE",
        "GA"
    ],
    "30506": [
        "GAINESVILLE",
        "GA"
    ],
    "30507": [
        "GAINESVILLE",
        "GA"
    ],
    "30510": [
        "ALTO",
        "GA"
    ],
    "30511": [
        "BALDWIN",
        "GA"
    ],
    "30512": [
        "BLAIRSVILLE",
        "GA"
    ],
    "30513": [
        "BLUE RIDGE",
        "GA"
    ],
    "30514": [
        "BLAIRSVILLE",
        "GA"
    ],
    "30515": [
        "BUFORD",
        "GA"
    ],
    "30516": [
        "BOWERSVILLE",
        "GA"
    ],
    "30517": [
        "BRASELTON",
        "GA"
    ],
    "30518": [
        "BUFORD",
        "GA"
    ],
    "30519": [
        "BUFORD",
        "GA"
    ],
    "30520": [
        "CANON",
        "GA"
    ],
    "30521": [
        "CARNESVILLE",
        "GA"
    ],
    "30522": [
        "CHERRY LOG",
        "GA"
    ],
    "30523": [
        "CLARKESVILLE",
        "GA"
    ],
    "30525": [
        "CLAYTON",
        "GA"
    ],
    "30527": [
        "CLERMONT",
        "GA"
    ],
    "30528": [
        "CLEVELAND",
        "GA"
    ],
    "30529": [
        "COMMERCE",
        "GA"
    ],
    "30530": [
        "COMMERCE",
        "GA"
    ],
    "30531": [
        "CORNELIA",
        "GA"
    ],
    "30533": [
        "DAHLONEGA",
        "GA"
    ],
    "30534": [
        "DAWSONVILLE",
        "GA"
    ],
    "30535": [
        "DEMOREST",
        "GA"
    ],
    "30536": [
        "ELLIJAY",
        "GA"
    ],
    "30537": [
        "DILLARD",
        "GA"
    ],
    "30538": [
        "EASTANOLLEE",
        "GA"
    ],
    "30539": [
        "EAST ELLIJAY",
        "GA"
    ],
    "30540": [
        "ELLIJAY",
        "GA"
    ],
    "30541": [
        "EPWORTH",
        "GA"
    ],
    "30542": [
        "FLOWERY BRANCH",
        "GA"
    ],
    "30543": [
        "GILLSVILLE",
        "GA"
    ],
    "30545": [
        "HELEN",
        "GA"
    ],
    "30546": [
        "HIAWASSEE",
        "GA"
    ],
    "30547": [
        "HOMER",
        "GA"
    ],
    "30548": [
        "HOSCHTON",
        "GA"
    ],
    "30549": [
        "JEFFERSON",
        "GA"
    ],
    "30552": [
        "LAKEMONT",
        "GA"
    ],
    "30553": [
        "LAVONIA",
        "GA"
    ],
    "30554": [
        "LULA",
        "GA"
    ],
    "30555": [
        "MC CAYSVILLE",
        "GA"
    ],
    "30557": [
        "MARTIN",
        "GA"
    ],
    "30558": [
        "MAYSVILLE",
        "GA"
    ],
    "30559": [
        "MINERAL BLUFF",
        "GA"
    ],
    "30560": [
        "MORGANTON",
        "GA"
    ],
    "30562": [
        "MOUNTAIN CITY",
        "GA"
    ],
    "30563": [
        "MOUNT AIRY",
        "GA"
    ],
    "30564": [
        "MURRAYVILLE",
        "GA"
    ],
    "30565": [
        "NICHOLSON",
        "GA"
    ],
    "30566": [
        "OAKWOOD",
        "GA"
    ],
    "30567": [
        "PENDERGRASS",
        "GA"
    ],
    "30568": [
        "RABUN GAP",
        "GA"
    ],
    "30571": [
        "SAUTEE NACOOCHEE",
        "GA"
    ],
    "30572": [
        "SUCHES",
        "GA"
    ],
    "30573": [
        "TALLULAH FALLS",
        "GA"
    ],
    "30575": [
        "TALMO",
        "GA"
    ],
    "30576": [
        "TIGER",
        "GA"
    ],
    "30577": [
        "TOCCOA",
        "GA"
    ],
    "30580": [
        "TURNERVILLE",
        "GA"
    ],
    "30581": [
        "WILEY",
        "GA"
    ],
    "30582": [
        "YOUNG HARRIS",
        "GA"
    ],
    "30597": [
        "DAHLONEGA",
        "GA"
    ],
    "30598": [
        "TOCCOA FALLS",
        "GA"
    ],
    "30601": [
        "ATHENS",
        "GA"
    ],
    "30602": [
        "ATHENS",
        "GA"
    ],
    "30603": [
        "ATHENS",
        "GA"
    ],
    "30604": [
        "ATHENS",
        "GA"
    ],
    "30605": [
        "ATHENS",
        "GA"
    ],
    "30606": [
        "ATHENS",
        "GA"
    ],
    "30607": [
        "ATHENS",
        "GA"
    ],
    "30608": [
        "ATHENS",
        "GA"
    ],
    "30612": [
        "ATHENS",
        "GA"
    ],
    "30619": [
        "ARNOLDSVILLE",
        "GA"
    ],
    "30620": [
        "BETHLEHEM",
        "GA"
    ],
    "30621": [
        "BISHOP",
        "GA"
    ],
    "30622": [
        "BOGART",
        "GA"
    ],
    "30623": [
        "BOSTWICK",
        "GA"
    ],
    "30624": [
        "BOWMAN",
        "GA"
    ],
    "30625": [
        "BUCKHEAD",
        "GA"
    ],
    "30627": [
        "CARLTON",
        "GA"
    ],
    "30628": [
        "COLBERT",
        "GA"
    ],
    "30629": [
        "COMER",
        "GA"
    ],
    "30630": [
        "CRAWFORD",
        "GA"
    ],
    "30631": [
        "CRAWFORDVILLE",
        "GA"
    ],
    "30633": [
        "DANIELSVILLE",
        "GA"
    ],
    "30634": [
        "DEWY ROSE",
        "GA"
    ],
    "30635": [
        "ELBERTON",
        "GA"
    ],
    "30638": [
        "FARMINGTON",
        "GA"
    ],
    "30639": [
        "FRANKLIN SPRINGS",
        "GA"
    ],
    "30641": [
        "GOOD HOPE",
        "GA"
    ],
    "30642": [
        "GREENSBORO",
        "GA"
    ],
    "30643": [
        "HARTWELL",
        "GA"
    ],
    "30645": [
        "HIGH SHOALS",
        "GA"
    ],
    "30646": [
        "HULL",
        "GA"
    ],
    "30647": [
        "ILA",
        "GA"
    ],
    "30648": [
        "LEXINGTON",
        "GA"
    ],
    "30650": [
        "MADISON",
        "GA"
    ],
    "30655": [
        "MONROE",
        "GA"
    ],
    "30656": [
        "MONROE",
        "GA"
    ],
    "30660": [
        "RAYLE",
        "GA"
    ],
    "30662": [
        "ROYSTON",
        "GA"
    ],
    "30663": [
        "RUTLEDGE",
        "GA"
    ],
    "30664": [
        "SHARON",
        "GA"
    ],
    "30665": [
        "SILOAM",
        "GA"
    ],
    "30666": [
        "STATHAM",
        "GA"
    ],
    "30667": [
        "STEPHENS",
        "GA"
    ],
    "30668": [
        "TIGNALL",
        "GA"
    ],
    "30669": [
        "UNION POINT",
        "GA"
    ],
    "30671": [
        "MAXEY",
        "GA"
    ],
    "30673": [
        "WASHINGTON",
        "GA"
    ],
    "30677": [
        "WATKINSVILLE",
        "GA"
    ],
    "30678": [
        "WHITE PLAINS",
        "GA"
    ],
    "30680": [
        "WINDER",
        "GA"
    ],
    "30683": [
        "WINTERVILLE",
        "GA"
    ],
    "30701": [
        "CALHOUN",
        "GA"
    ],
    "30703": [
        "CALHOUN",
        "GA"
    ],
    "30705": [
        "CHATSWORTH",
        "GA"
    ],
    "30707": [
        "CHICKAMAUGA",
        "GA"
    ],
    "30708": [
        "CISCO",
        "GA"
    ],
    "30710": [
        "COHUTTA",
        "GA"
    ],
    "30711": [
        "CRANDALL",
        "GA"
    ],
    "30719": [
        "DALTON",
        "GA"
    ],
    "30720": [
        "DALTON",
        "GA"
    ],
    "30721": [
        "DALTON",
        "GA"
    ],
    "30722": [
        "DALTON",
        "GA"
    ],
    "30724": [
        "ETON",
        "GA"
    ],
    "30725": [
        "FLINTSTONE",
        "GA"
    ],
    "30726": [
        "GRAYSVILLE",
        "GA"
    ],
    "30728": [
        "LA FAYETTE",
        "GA"
    ],
    "30730": [
        "LYERLY",
        "GA"
    ],
    "30731": [
        "MENLO",
        "GA"
    ],
    "30732": [
        "OAKMAN",
        "GA"
    ],
    "30733": [
        "PLAINVILLE",
        "GA"
    ],
    "30734": [
        "RANGER",
        "GA"
    ],
    "30735": [
        "RESACA",
        "GA"
    ],
    "30736": [
        "RINGGOLD",
        "GA"
    ],
    "30738": [
        "RISING FAWN",
        "GA"
    ],
    "30739": [
        "ROCK SPRING",
        "GA"
    ],
    "30740": [
        "ROCKY FACE",
        "GA"
    ],
    "30741": [
        "ROSSVILLE",
        "GA"
    ],
    "30742": [
        "FORT OGLETHORPE",
        "GA"
    ],
    "30746": [
        "SUGAR VALLEY",
        "GA"
    ],
    "30747": [
        "SUMMERVILLE",
        "GA"
    ],
    "30750": [
        "LOOKOUT MOUNTAIN",
        "GA"
    ],
    "30751": [
        "TENNGA",
        "GA"
    ],
    "30752": [
        "TRENTON",
        "GA"
    ],
    "30753": [
        "TRION",
        "GA"
    ],
    "30755": [
        "TUNNEL HILL",
        "GA"
    ],
    "30756": [
        "VARNELL",
        "GA"
    ],
    "30757": [
        "WILDWOOD",
        "GA"
    ],
    "30802": [
        "APPLING",
        "GA"
    ],
    "30803": [
        "AVERA",
        "GA"
    ],
    "30805": [
        "BLYTHE",
        "GA"
    ],
    "30806": [
        "BONEVILLE",
        "GA"
    ],
    "30807": [
        "CAMAK",
        "GA"
    ],
    "30808": [
        "DEARING",
        "GA"
    ],
    "30809": [
        "EVANS",
        "GA"
    ],
    "30810": [
        "GIBSON",
        "GA"
    ],
    "30812": [
        "GRACEWOOD",
        "GA"
    ],
    "30813": [
        "GROVETOWN",
        "GA"
    ],
    "30814": [
        "HARLEM",
        "GA"
    ],
    "30815": [
        "HEPHZIBAH",
        "GA"
    ],
    "30816": [
        "KEYSVILLE",
        "GA"
    ],
    "30817": [
        "LINCOLNTON",
        "GA"
    ],
    "30818": [
        "MATTHEWS",
        "GA"
    ],
    "30820": [
        "MITCHELL",
        "GA"
    ],
    "30821": [
        "NORWOOD",
        "GA"
    ],
    "30822": [
        "PERKINS",
        "GA"
    ],
    "30823": [
        "STAPLETON",
        "GA"
    ],
    "30824": [
        "THOMSON",
        "GA"
    ],
    "30828": [
        "WARRENTON",
        "GA"
    ],
    "30830": [
        "WAYNESBORO",
        "GA"
    ],
    "30833": [
        "WRENS",
        "GA"
    ],
    "30901": [
        "AUGUSTA",
        "GA"
    ],
    "30903": [
        "AUGUSTA",
        "GA"
    ],
    "30904": [
        "AUGUSTA",
        "GA"
    ],
    "30905": [
        "AUGUSTA",
        "GA"
    ],
    "30906": [
        "AUGUSTA",
        "GA"
    ],
    "30907": [
        "AUGUSTA",
        "GA"
    ],
    "30909": [
        "AUGUSTA",
        "GA"
    ],
    "30912": [
        "AUGUSTA",
        "GA"
    ],
    "30914": [
        "AUGUSTA",
        "GA"
    ],
    "30916": [
        "AUGUSTA",
        "GA"
    ],
    "30917": [
        "AUGUSTA",
        "GA"
    ],
    "30919": [
        "AUGUSTA",
        "GA"
    ],
    "31001": [
        "ABBEVILLE",
        "GA"
    ],
    "31002": [
        "ADRIAN",
        "GA"
    ],
    "31003": [
        "ALLENTOWN",
        "GA"
    ],
    "31004": [
        "BOLINGBROKE",
        "GA"
    ],
    "31005": [
        "BONAIRE",
        "GA"
    ],
    "31006": [
        "BUTLER",
        "GA"
    ],
    "31007": [
        "BYROMVILLE",
        "GA"
    ],
    "31008": [
        "BYRON",
        "GA"
    ],
    "31009": [
        "CADWELL",
        "GA"
    ],
    "31010": [
        "CORDELE",
        "GA"
    ],
    "31011": [
        "CHAUNCEY",
        "GA"
    ],
    "31012": [
        "CHESTER",
        "GA"
    ],
    "31013": [
        "CLINCHFIELD",
        "GA"
    ],
    "31014": [
        "COCHRAN",
        "GA"
    ],
    "31015": [
        "CORDELE",
        "GA"
    ],
    "31016": [
        "CULLODEN",
        "GA"
    ],
    "31017": [
        "DANVILLE",
        "GA"
    ],
    "31018": [
        "DAVISBORO",
        "GA"
    ],
    "31019": [
        "DEXTER",
        "GA"
    ],
    "31020": [
        "DRY BRANCH",
        "GA"
    ],
    "31021": [
        "DUBLIN",
        "GA"
    ],
    "31022": [
        "DUDLEY",
        "GA"
    ],
    "31023": [
        "EASTMAN",
        "GA"
    ],
    "31024": [
        "EATONTON",
        "GA"
    ],
    "31025": [
        "ELKO",
        "GA"
    ],
    "31027": [
        "EAST DUBLIN",
        "GA"
    ],
    "31028": [
        "CENTERVILLE",
        "GA"
    ],
    "31029": [
        "FORSYTH",
        "GA"
    ],
    "31030": [
        "FORT VALLEY",
        "GA"
    ],
    "31031": [
        "GORDON",
        "GA"
    ],
    "31032": [
        "GRAY",
        "GA"
    ],
    "31033": [
        "HADDOCK",
        "GA"
    ],
    "31034": [
        "HARDWICK",
        "GA"
    ],
    "31035": [
        "HARRISON",
        "GA"
    ],
    "31036": [
        "HAWKINSVILLE",
        "GA"
    ],
    "31037": [
        "HELENA",
        "GA"
    ],
    "31038": [
        "HILLSBORO",
        "GA"
    ],
    "31039": [
        "HOWARD",
        "GA"
    ],
    "31040": [
        "DUBLIN",
        "GA"
    ],
    "31041": [
        "IDEAL",
        "GA"
    ],
    "31042": [
        "IRWINTON",
        "GA"
    ],
    "31044": [
        "JEFFERSONVILLE",
        "GA"
    ],
    "31045": [
        "JEWELL",
        "GA"
    ],
    "31046": [
        "JULIETTE",
        "GA"
    ],
    "31047": [
        "KATHLEEN",
        "GA"
    ],
    "31049": [
        "KITE",
        "GA"
    ],
    "31050": [
        "KNOXVILLE",
        "GA"
    ],
    "31051": [
        "LILLY",
        "GA"
    ],
    "31052": [
        "LIZELLA",
        "GA"
    ],
    "31054": [
        "MC INTYRE",
        "GA"
    ],
    "31055": [
        "MC RAE",
        "GA"
    ],
    "31057": [
        "MARSHALLVILLE",
        "GA"
    ],
    "31058": [
        "MAUK",
        "GA"
    ],
    "31059": [
        "MILLEDGEVILLE",
        "GA"
    ],
    "31060": [
        "MILAN",
        "GA"
    ],
    "31061": [
        "MILLEDGEVILLE",
        "GA"
    ],
    "31062": [
        "MILLEDGEVILLE",
        "GA"
    ],
    "31063": [
        "MONTEZUMA",
        "GA"
    ],
    "31064": [
        "MONTICELLO",
        "GA"
    ],
    "31065": [
        "MONTROSE",
        "GA"
    ],
    "31066": [
        "MUSELLA",
        "GA"
    ],
    "31067": [
        "OCONEE",
        "GA"
    ],
    "31068": [
        "OGLETHORPE",
        "GA"
    ],
    "31069": [
        "PERRY",
        "GA"
    ],
    "31070": [
        "PINEHURST",
        "GA"
    ],
    "31071": [
        "PINEVIEW",
        "GA"
    ],
    "31072": [
        "PITTS",
        "GA"
    ],
    "31075": [
        "RENTZ",
        "GA"
    ],
    "31076": [
        "REYNOLDS",
        "GA"
    ],
    "31077": [
        "RHINE",
        "GA"
    ],
    "31078": [
        "ROBERTA",
        "GA"
    ],
    "31079": [
        "ROCHELLE",
        "GA"
    ],
    "31081": [
        "RUPERT",
        "GA"
    ],
    "31082": [
        "SANDERSVILLE",
        "GA"
    ],
    "31083": [
        "SCOTLAND",
        "GA"
    ],
    "31085": [
        "SHADY DALE",
        "GA"
    ],
    "31086": [
        "SMARR",
        "GA"
    ],
    "31087": [
        "SPARTA",
        "GA"
    ],
    "31088": [
        "WARNER ROBINS",
        "GA"
    ],
    "31089": [
        "TENNILLE",
        "GA"
    ],
    "31090": [
        "TOOMSBORO",
        "GA"
    ],
    "31091": [
        "UNADILLA",
        "GA"
    ],
    "31092": [
        "VIENNA",
        "GA"
    ],
    "31093": [
        "WARNER ROBINS",
        "GA"
    ],
    "31094": [
        "WARTHEN",
        "GA"
    ],
    "31095": [
        "WARNER ROBINS",
        "GA"
    ],
    "31096": [
        "WRIGHTSVILLE",
        "GA"
    ],
    "31097": [
        "YATESVILLE",
        "GA"
    ],
    "31098": [
        "WARNER ROBINS",
        "GA"
    ],
    "31099": [
        "WARNER ROBINS",
        "GA"
    ],
    "31106": [
        "ATLANTA",
        "GA"
    ],
    "31107": [
        "ATLANTA",
        "GA"
    ],
    "31119": [
        "ATLANTA",
        "GA"
    ],
    "31126": [
        "ATLANTA",
        "GA"
    ],
    "31131": [
        "ATLANTA",
        "GA"
    ],
    "31139": [
        "ATLANTA",
        "GA"
    ],
    "31141": [
        "ATLANTA",
        "GA"
    ],
    "31145": [
        "ATLANTA",
        "GA"
    ],
    "31146": [
        "ATLANTA",
        "GA"
    ],
    "31150": [
        "ATLANTA",
        "GA"
    ],
    "31156": [
        "ATLANTA",
        "GA"
    ],
    "31201": [
        "MACON",
        "GA"
    ],
    "31202": [
        "MACON",
        "GA"
    ],
    "31203": [
        "MACON",
        "GA"
    ],
    "31204": [
        "MACON",
        "GA"
    ],
    "31205": [
        "MACON",
        "GA"
    ],
    "31206": [
        "MACON",
        "GA"
    ],
    "31207": [
        "MACON",
        "GA"
    ],
    "31208": [
        "MACON",
        "GA"
    ],
    "31209": [
        "MACON",
        "GA"
    ],
    "31210": [
        "MACON",
        "GA"
    ],
    "31211": [
        "MACON",
        "GA"
    ],
    "31213": [
        "MACON",
        "GA"
    ],
    "31216": [
        "MACON",
        "GA"
    ],
    "31217": [
        "MACON",
        "GA"
    ],
    "31220": [
        "MACON",
        "GA"
    ],
    "31221": [
        "MACON",
        "GA"
    ],
    "31295": [
        "MACON",
        "GA"
    ],
    "31296": [
        "MACON",
        "GA"
    ],
    "31297": [
        "MACON",
        "GA"
    ],
    "31301": [
        "ALLENHURST",
        "GA"
    ],
    "31302": [
        "BLOOMINGDALE",
        "GA"
    ],
    "31303": [
        "CLYO",
        "GA"
    ],
    "31304": [
        "CRESCENT",
        "GA"
    ],
    "31305": [
        "DARIEN",
        "GA"
    ],
    "31307": [
        "EDEN",
        "GA"
    ],
    "31308": [
        "ELLABELL",
        "GA"
    ],
    "31309": [
        "FLEMING",
        "GA"
    ],
    "31310": [
        "HINESVILLE",
        "GA"
    ],
    "31312": [
        "GUYTON",
        "GA"
    ],
    "31313": [
        "HINESVILLE",
        "GA"
    ],
    "31314": [
        "FORT STEWART",
        "GA"
    ],
    "31315": [
        "FORT STEWART",
        "GA"
    ],
    "31316": [
        "LUDOWICI",
        "GA"
    ],
    "31318": [
        "MELDRIM",
        "GA"
    ],
    "31319": [
        "MERIDIAN",
        "GA"
    ],
    "31320": [
        "MIDWAY",
        "GA"
    ],
    "31321": [
        "PEMBROKE",
        "GA"
    ],
    "31322": [
        "POOLER",
        "GA"
    ],
    "31323": [
        "RICEBORO",
        "GA"
    ],
    "31324": [
        "RICHMOND HILL",
        "GA"
    ],
    "31326": [
        "RINCON",
        "GA"
    ],
    "31328": [
        "TYBEE ISLAND",
        "GA"
    ],
    "31329": [
        "SPRINGFIELD",
        "GA"
    ],
    "31331": [
        "TOWNSEND",
        "GA"
    ],
    "31333": [
        "WALTHOURVILLE",
        "GA"
    ],
    "31401": [
        "SAVANNAH",
        "GA"
    ],
    "31402": [
        "SAVANNAH",
        "GA"
    ],
    "31403": [
        "SAVANNAH",
        "GA"
    ],
    "31404": [
        "SAVANNAH",
        "GA"
    ],
    "31405": [
        "SAVANNAH",
        "GA"
    ],
    "31406": [
        "SAVANNAH",
        "GA"
    ],
    "31407": [
        "PORT WENTWORTH",
        "GA"
    ],
    "31408": [
        "SAVANNAH",
        "GA"
    ],
    "31409": [
        "SAVANNAH",
        "GA"
    ],
    "31410": [
        "SAVANNAH",
        "GA"
    ],
    "31411": [
        "SAVANNAH",
        "GA"
    ],
    "31412": [
        "SAVANNAH",
        "GA"
    ],
    "31414": [
        "SAVANNAH",
        "GA"
    ],
    "31415": [
        "SAVANNAH",
        "GA"
    ],
    "31416": [
        "SAVANNAH",
        "GA"
    ],
    "31418": [
        "SAVANNAH",
        "GA"
    ],
    "31419": [
        "SAVANNAH",
        "GA"
    ],
    "31420": [
        "SAVANNAH",
        "GA"
    ],
    "31421": [
        "SAVANNAH",
        "GA"
    ],
    "31501": [
        "WAYCROSS",
        "GA"
    ],
    "31502": [
        "WAYCROSS",
        "GA"
    ],
    "31503": [
        "WAYCROSS",
        "GA"
    ],
    "31510": [
        "ALMA",
        "GA"
    ],
    "31512": [
        "AMBROSE",
        "GA"
    ],
    "31513": [
        "BAXLEY",
        "GA"
    ],
    "31515": [
        "BAXLEY",
        "GA"
    ],
    "31516": [
        "BLACKSHEAR",
        "GA"
    ],
    "31518": [
        "BRISTOL",
        "GA"
    ],
    "31519": [
        "BROXTON",
        "GA"
    ],
    "31520": [
        "BRUNSWICK",
        "GA"
    ],
    "31521": [
        "BRUNSWICK",
        "GA"
    ],
    "31522": [
        "SAINT SIMONS ISLAND",
        "GA"
    ],
    "31523": [
        "BRUNSWICK",
        "GA"
    ],
    "31524": [
        "BRUNSWICK",
        "GA"
    ],
    "31525": [
        "BRUNSWICK",
        "GA"
    ],
    "31527": [
        "JEKYLL ISLAND",
        "GA"
    ],
    "31532": [
        "DENTON",
        "GA"
    ],
    "31533": [
        "DOUGLAS",
        "GA"
    ],
    "31534": [
        "DOUGLAS",
        "GA"
    ],
    "31535": [
        "DOUGLAS",
        "GA"
    ],
    "31537": [
        "FOLKSTON",
        "GA"
    ],
    "31539": [
        "HAZLEHURST",
        "GA"
    ],
    "31542": [
        "HOBOKEN",
        "GA"
    ],
    "31543": [
        "HORTENSE",
        "GA"
    ],
    "31544": [
        "JACKSONVILLE",
        "GA"
    ],
    "31545": [
        "JESUP",
        "GA"
    ],
    "31546": [
        "JESUP",
        "GA"
    ],
    "31547": [
        "KINGS BAY",
        "GA"
    ],
    "31548": [
        "KINGSLAND",
        "GA"
    ],
    "31549": [
        "LUMBER CITY",
        "GA"
    ],
    "31550": [
        "MANOR",
        "GA"
    ],
    "31551": [
        "MERSHON",
        "GA"
    ],
    "31552": [
        "MILLWOOD",
        "GA"
    ],
    "31553": [
        "NAHUNTA",
        "GA"
    ],
    "31554": [
        "NICHOLLS",
        "GA"
    ],
    "31555": [
        "ODUM",
        "GA"
    ],
    "31556": [
        "OFFERMAN",
        "GA"
    ],
    "31557": [
        "PATTERSON",
        "GA"
    ],
    "31558": [
        "SAINT MARYS",
        "GA"
    ],
    "31560": [
        "SCREVEN",
        "GA"
    ],
    "31561": [
        "SEA ISLAND",
        "GA"
    ],
    "31562": [
        "SAINT GEORGE",
        "GA"
    ],
    "31563": [
        "SURRENCY",
        "GA"
    ],
    "31565": [
        "WAVERLY",
        "GA"
    ],
    "31566": [
        "WAYNESVILLE",
        "GA"
    ],
    "31567": [
        "WEST GREEN",
        "GA"
    ],
    "31568": [
        "WHITE OAK",
        "GA"
    ],
    "31569": [
        "WOODBINE",
        "GA"
    ],
    "31598": [
        "JESUP",
        "GA"
    ],
    "31601": [
        "VALDOSTA",
        "GA"
    ],
    "31602": [
        "VALDOSTA",
        "GA"
    ],
    "31603": [
        "VALDOSTA",
        "GA"
    ],
    "31604": [
        "VALDOSTA",
        "GA"
    ],
    "31605": [
        "VALDOSTA",
        "GA"
    ],
    "31606": [
        "VALDOSTA",
        "GA"
    ],
    "31620": [
        "ADEL",
        "GA"
    ],
    "31622": [
        "ALAPAHA",
        "GA"
    ],
    "31623": [
        "ARGYLE",
        "GA"
    ],
    "31624": [
        "AXSON",
        "GA"
    ],
    "31625": [
        "BARNEY",
        "GA"
    ],
    "31626": [
        "BOSTON",
        "GA"
    ],
    "31627": [
        "CECIL",
        "GA"
    ],
    "31629": [
        "DIXIE",
        "GA"
    ],
    "31630": [
        "DU PONT",
        "GA"
    ],
    "31631": [
        "FARGO",
        "GA"
    ],
    "31632": [
        "HAHIRA",
        "GA"
    ],
    "31634": [
        "HOMERVILLE",
        "GA"
    ],
    "31635": [
        "LAKELAND",
        "GA"
    ],
    "31636": [
        "LAKE PARK",
        "GA"
    ],
    "31637": [
        "LENOX",
        "GA"
    ],
    "31638": [
        "MORVEN",
        "GA"
    ],
    "31639": [
        "NASHVILLE",
        "GA"
    ],
    "31641": [
        "NAYLOR",
        "GA"
    ],
    "31642": [
        "PEARSON",
        "GA"
    ],
    "31643": [
        "QUITMAN",
        "GA"
    ],
    "31645": [
        "RAY CITY",
        "GA"
    ],
    "31647": [
        "SPARKS",
        "GA"
    ],
    "31648": [
        "STATENVILLE",
        "GA"
    ],
    "31649": [
        "STOCKTON",
        "GA"
    ],
    "31650": [
        "WILLACOOCHEE",
        "GA"
    ],
    "31698": [
        "VALDOSTA",
        "GA"
    ],
    "31699": [
        "MOODY AFB",
        "GA"
    ],
    "31701": [
        "ALBANY",
        "GA"
    ],
    "31702": [
        "ALBANY",
        "GA"
    ],
    "31703": [
        "ALBANY",
        "GA"
    ],
    "31704": [
        "ALBANY",
        "GA"
    ],
    "31705": [
        "ALBANY",
        "GA"
    ],
    "31706": [
        "ALBANY",
        "GA"
    ],
    "31707": [
        "ALBANY",
        "GA"
    ],
    "31708": [
        "ALBANY",
        "GA"
    ],
    "31709": [
        "AMERICUS",
        "GA"
    ],
    "31711": [
        "ANDERSONVILLE",
        "GA"
    ],
    "31712": [
        "ARABI",
        "GA"
    ],
    "31714": [
        "ASHBURN",
        "GA"
    ],
    "31716": [
        "BACONTON",
        "GA"
    ],
    "31719": [
        "AMERICUS",
        "GA"
    ],
    "31720": [
        "BARWICK",
        "GA"
    ],
    "31721": [
        "ALBANY",
        "GA"
    ],
    "31722": [
        "BERLIN",
        "GA"
    ],
    "31727": [
        "BROOKFIELD",
        "GA"
    ],
    "31730": [
        "CAMILLA",
        "GA"
    ],
    "31733": [
        "CHULA",
        "GA"
    ],
    "31735": [
        "COBB",
        "GA"
    ],
    "31738": [
        "COOLIDGE",
        "GA"
    ],
    "31743": [
        "DE SOTO",
        "GA"
    ],
    "31744": [
        "DOERUN",
        "GA"
    ],
    "31747": [
        "ELLENTON",
        "GA"
    ],
    "31749": [
        "ENIGMA",
        "GA"
    ],
    "31750": [
        "FITZGERALD",
        "GA"
    ],
    "31753": [
        "FUNSTON",
        "GA"
    ],
    "31756": [
        "HARTSFIELD",
        "GA"
    ],
    "31757": [
        "THOMASVILLE",
        "GA"
    ],
    "31758": [
        "THOMASVILLE",
        "GA"
    ],
    "31760": [
        "IRWINVILLE",
        "GA"
    ],
    "31763": [
        "LEESBURG",
        "GA"
    ],
    "31764": [
        "LESLIE",
        "GA"
    ],
    "31765": [
        "MEIGS",
        "GA"
    ],
    "31768": [
        "MOULTRIE",
        "GA"
    ],
    "31769": [
        "MYSTIC",
        "GA"
    ],
    "31771": [
        "NORMAN PARK",
        "GA"
    ],
    "31772": [
        "OAKFIELD",
        "GA"
    ],
    "31773": [
        "OCHLOCKNEE",
        "GA"
    ],
    "31774": [
        "OCILLA",
        "GA"
    ],
    "31775": [
        "OMEGA",
        "GA"
    ],
    "31776": [
        "MOULTRIE",
        "GA"
    ],
    "31778": [
        "PAVO",
        "GA"
    ],
    "31779": [
        "PELHAM",
        "GA"
    ],
    "31780": [
        "PLAINS",
        "GA"
    ],
    "31781": [
        "POULAN",
        "GA"
    ],
    "31783": [
        "REBECCA",
        "GA"
    ],
    "31784": [
        "SALE CITY",
        "GA"
    ],
    "31787": [
        "SMITHVILLE",
        "GA"
    ],
    "31788": [
        "MOULTRIE",
        "GA"
    ],
    "31789": [
        "SUMNER",
        "GA"
    ],
    "31790": [
        "SYCAMORE",
        "GA"
    ],
    "31791": [
        "SYLVESTER",
        "GA"
    ],
    "31792": [
        "THOMASVILLE",
        "GA"
    ],
    "31793": [
        "TIFTON",
        "GA"
    ],
    "31794": [
        "TIFTON",
        "GA"
    ],
    "31795": [
        "TY TY",
        "GA"
    ],
    "31796": [
        "WARWICK",
        "GA"
    ],
    "31798": [
        "WRAY",
        "GA"
    ],
    "31799": [
        "THOMASVILLE",
        "GA"
    ],
    "31801": [
        "BOX SPRINGS",
        "GA"
    ],
    "31803": [
        "BUENA VISTA",
        "GA"
    ],
    "31804": [
        "CATAULA",
        "GA"
    ],
    "31805": [
        "CUSSETA",
        "GA"
    ],
    "31806": [
        "ELLAVILLE",
        "GA"
    ],
    "31807": [
        "ELLERSLIE",
        "GA"
    ],
    "31808": [
        "FORTSON",
        "GA"
    ],
    "31810": [
        "GENEVA",
        "GA"
    ],
    "31811": [
        "HAMILTON",
        "GA"
    ],
    "31812": [
        "JUNCTION CITY",
        "GA"
    ],
    "31815": [
        "LUMPKIN",
        "GA"
    ],
    "31816": [
        "MANCHESTER",
        "GA"
    ],
    "31820": [
        "MIDLAND",
        "GA"
    ],
    "31821": [
        "OMAHA",
        "GA"
    ],
    "31822": [
        "PINE MOUNTAIN",
        "GA"
    ],
    "31823": [
        "PINE MOUNTAIN VALLEY",
        "GA"
    ],
    "31824": [
        "PRESTON",
        "GA"
    ],
    "31825": [
        "RICHLAND",
        "GA"
    ],
    "31826": [
        "SHILOH",
        "GA"
    ],
    "31827": [
        "TALBOTTON",
        "GA"
    ],
    "31829": [
        "UPATOI",
        "GA"
    ],
    "31830": [
        "WARM SPRINGS",
        "GA"
    ],
    "31831": [
        "WAVERLY HALL",
        "GA"
    ],
    "31832": [
        "WESTON",
        "GA"
    ],
    "31833": [
        "WEST POINT",
        "GA"
    ],
    "31836": [
        "WOODLAND",
        "GA"
    ],
    "31901": [
        "COLUMBUS",
        "GA"
    ],
    "31902": [
        "COLUMBUS",
        "GA"
    ],
    "31903": [
        "COLUMBUS",
        "GA"
    ],
    "31904": [
        "COLUMBUS",
        "GA"
    ],
    "31905": [
        "FORT BENNING",
        "GA"
    ],
    "31906": [
        "COLUMBUS",
        "GA"
    ],
    "31907": [
        "COLUMBUS",
        "GA"
    ],
    "31908": [
        "COLUMBUS",
        "GA"
    ],
    "31909": [
        "COLUMBUS",
        "GA"
    ],
    "31914": [
        "COLUMBUS",
        "GA"
    ],
    "31917": [
        "COLUMBUS",
        "GA"
    ],
    "31993": [
        "COLUMBUS",
        "GA"
    ],
    "31995": [
        "FORT BENNING",
        "GA"
    ],
    "31999": [
        "COLUMBUS",
        "GA"
    ],
    "32003": [
        "FLEMING ISLAND",
        "FL"
    ],
    "32004": [
        "PONTE VEDRA BEACH",
        "FL"
    ],
    "32006": [
        "FLEMING ISLAND",
        "FL"
    ],
    "32007": [
        "BOSTWICK",
        "FL"
    ],
    "32008": [
        "BRANFORD",
        "FL"
    ],
    "32009": [
        "BRYCEVILLE",
        "FL"
    ],
    "32011": [
        "CALLAHAN",
        "FL"
    ],
    "32013": [
        "DAY",
        "FL"
    ],
    "32024": [
        "LAKE CITY",
        "FL"
    ],
    "32025": [
        "LAKE CITY",
        "FL"
    ],
    "32026": [
        "RAIFORD",
        "FL"
    ],
    "32033": [
        "ELKTON",
        "FL"
    ],
    "32034": [
        "FERNANDINA BEACH",
        "FL"
    ],
    "32035": [
        "FERNANDINA BEACH",
        "FL"
    ],
    "32038": [
        "FORT WHITE",
        "FL"
    ],
    "32040": [
        "GLEN SAINT MARY",
        "FL"
    ],
    "32041": [
        "YULEE",
        "FL"
    ],
    "32042": [
        "GRAHAM",
        "FL"
    ],
    "32043": [
        "GREEN COVE SPRINGS",
        "FL"
    ],
    "32044": [
        "HAMPTON",
        "FL"
    ],
    "32046": [
        "HILLIARD",
        "FL"
    ],
    "32050": [
        "MIDDLEBURG",
        "FL"
    ],
    "32052": [
        "JASPER",
        "FL"
    ],
    "32053": [
        "JENNINGS",
        "FL"
    ],
    "32054": [
        "LAKE BUTLER",
        "FL"
    ],
    "32055": [
        "LAKE CITY",
        "FL"
    ],
    "32056": [
        "LAKE CITY",
        "FL"
    ],
    "32058": [
        "LAWTEY",
        "FL"
    ],
    "32059": [
        "LEE",
        "FL"
    ],
    "32060": [
        "LIVE OAK",
        "FL"
    ],
    "32061": [
        "LULU",
        "FL"
    ],
    "32062": [
        "MC ALPIN",
        "FL"
    ],
    "32063": [
        "MACCLENNY",
        "FL"
    ],
    "32064": [
        "LIVE OAK",
        "FL"
    ],
    "32065": [
        "ORANGE PARK",
        "FL"
    ],
    "32066": [
        "MAYO",
        "FL"
    ],
    "32067": [
        "ORANGE PARK",
        "FL"
    ],
    "32068": [
        "MIDDLEBURG",
        "FL"
    ],
    "32071": [
        "O BRIEN",
        "FL"
    ],
    "32072": [
        "OLUSTEE",
        "FL"
    ],
    "32073": [
        "ORANGE PARK",
        "FL"
    ],
    "32079": [
        "PENNEY FARMS",
        "FL"
    ],
    "32080": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32081": [
        "PONTE VEDRA",
        "FL"
    ],
    "32082": [
        "PONTE VEDRA BEACH",
        "FL"
    ],
    "32083": [
        "RAIFORD",
        "FL"
    ],
    "32084": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32085": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32086": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32087": [
        "SANDERSON",
        "FL"
    ],
    "32091": [
        "STARKE",
        "FL"
    ],
    "32092": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32094": [
        "WELLBORN",
        "FL"
    ],
    "32095": [
        "SAINT AUGUSTINE",
        "FL"
    ],
    "32096": [
        "WHITE SPRINGS",
        "FL"
    ],
    "32097": [
        "YULEE",
        "FL"
    ],
    "32099": [
        "JACKSONVILLE",
        "FL"
    ],
    "32102": [
        "ASTOR",
        "FL"
    ],
    "32105": [
        "BARBERVILLE",
        "FL"
    ],
    "32110": [
        "BUNNELL",
        "FL"
    ],
    "32111": [
        "CANDLER",
        "FL"
    ],
    "32112": [
        "CRESCENT CITY",
        "FL"
    ],
    "32113": [
        "CITRA",
        "FL"
    ],
    "32114": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32115": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32116": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32117": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32118": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32119": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32120": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32121": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32122": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32123": [
        "PORT ORANGE",
        "FL"
    ],
    "32124": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32125": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32126": [
        "DAYTONA BEACH",
        "FL"
    ],
    "32127": [
        "PORT ORANGE",
        "FL"
    ],
    "32128": [
        "PORT ORANGE",
        "FL"
    ],
    "32129": [
        "PORT ORANGE",
        "FL"
    ],
    "32130": [
        "DE LEON SPRINGS",
        "FL"
    ],
    "32131": [
        "EAST PALATKA",
        "FL"
    ],
    "32132": [
        "EDGEWATER",
        "FL"
    ],
    "32133": [
        "EASTLAKE WEIR",
        "FL"
    ],
    "32134": [
        "FORT MC COY",
        "FL"
    ],
    "32135": [
        "PALM COAST",
        "FL"
    ],
    "32136": [
        "FLAGLER BEACH",
        "FL"
    ],
    "32137": [
        "PALM COAST",
        "FL"
    ],
    "32138": [
        "GRANDIN",
        "FL"
    ],
    "32139": [
        "GEORGETOWN",
        "FL"
    ],
    "32140": [
        "FLORAHOME",
        "FL"
    ],
    "32141": [
        "EDGEWATER",
        "FL"
    ],
    "32142": [
        "PALM COAST",
        "FL"
    ],
    "32145": [
        "HASTINGS",
        "FL"
    ],
    "32147": [
        "HOLLISTER",
        "FL"
    ],
    "32148": [
        "INTERLACHEN",
        "FL"
    ],
    "32157": [
        "LAKE COMO",
        "FL"
    ],
    "32158": [
        "LADY LAKE",
        "FL"
    ],
    "32159": [
        "LADY LAKE",
        "FL"
    ],
    "32160": [
        "LAKE GENEVA",
        "FL"
    ],
    "32162": [
        "THE VILLAGES",
        "FL"
    ],
    "32163": [
        "THE VILLAGES",
        "FL"
    ],
    "32164": [
        "PALM COAST",
        "FL"
    ],
    "32168": [
        "NEW SMYRNA BEACH",
        "FL"
    ],
    "32169": [
        "NEW SMYRNA BEACH",
        "FL"
    ],
    "32170": [
        "NEW SMYRNA BEACH",
        "FL"
    ],
    "32173": [
        "ORMOND BEACH",
        "FL"
    ],
    "32174": [
        "ORMOND BEACH",
        "FL"
    ],
    "32175": [
        "ORMOND BEACH",
        "FL"
    ],
    "32176": [
        "ORMOND BEACH",
        "FL"
    ],
    "32177": [
        "PALATKA",
        "FL"
    ],
    "32178": [
        "PALATKA",
        "FL"
    ],
    "32179": [
        "OCKLAWAHA",
        "FL"
    ],
    "32180": [
        "PIERSON",
        "FL"
    ],
    "32181": [
        "POMONA PARK",
        "FL"
    ],
    "32182": [
        "ORANGE SPRINGS",
        "FL"
    ],
    "32183": [
        "OCKLAWAHA",
        "FL"
    ],
    "32185": [
        "PUTNAM HALL",
        "FL"
    ],
    "32187": [
        "SAN MATEO",
        "FL"
    ],
    "32189": [
        "SATSUMA",
        "FL"
    ],
    "32190": [
        "SEVILLE",
        "FL"
    ],
    "32192": [
        "SPARR",
        "FL"
    ],
    "32193": [
        "WELAKA",
        "FL"
    ],
    "32195": [
        "WEIRSDALE",
        "FL"
    ],
    "32201": [
        "JACKSONVILLE",
        "FL"
    ],
    "32202": [
        "JACKSONVILLE",
        "FL"
    ],
    "32203": [
        "JACKSONVILLE",
        "FL"
    ],
    "32204": [
        "JACKSONVILLE",
        "FL"
    ],
    "32205": [
        "JACKSONVILLE",
        "FL"
    ],
    "32206": [
        "JACKSONVILLE",
        "FL"
    ],
    "32207": [
        "JACKSONVILLE",
        "FL"
    ],
    "32208": [
        "JACKSONVILLE",
        "FL"
    ],
    "32209": [
        "JACKSONVILLE",
        "FL"
    ],
    "32210": [
        "JACKSONVILLE",
        "FL"
    ],
    "32211": [
        "JACKSONVILLE",
        "FL"
    ],
    "32212": [
        "JACKSONVILLE",
        "FL"
    ],
    "32214": [
        "JACKSONVILLE",
        "FL"
    ],
    "32216": [
        "JACKSONVILLE",
        "FL"
    ],
    "32217": [
        "JACKSONVILLE",
        "FL"
    ],
    "32218": [
        "JACKSONVILLE",
        "FL"
    ],
    "32219": [
        "JACKSONVILLE",
        "FL"
    ],
    "32220": [
        "JACKSONVILLE",
        "FL"
    ],
    "32221": [
        "JACKSONVILLE",
        "FL"
    ],
    "32222": [
        "JACKSONVILLE",
        "FL"
    ],
    "32223": [
        "JACKSONVILLE",
        "FL"
    ],
    "32224": [
        "JACKSONVILLE",
        "FL"
    ],
    "32225": [
        "JACKSONVILLE",
        "FL"
    ],
    "32226": [
        "JACKSONVILLE",
        "FL"
    ],
    "32227": [
        "JACKSONVILLE",
        "FL"
    ],
    "32228": [
        "JACKSONVILLE",
        "FL"
    ],
    "32229": [
        "JACKSONVILLE",
        "FL"
    ],
    "32231": [
        "JACKSONVILLE",
        "FL"
    ],
    "32233": [
        "ATLANTIC BEACH",
        "FL"
    ],
    "32234": [
        "JACKSONVILLE",
        "FL"
    ],
    "32235": [
        "JACKSONVILLE",
        "FL"
    ],
    "32236": [
        "JACKSONVILLE",
        "FL"
    ],
    "32238": [
        "JACKSONVILLE",
        "FL"
    ],
    "32239": [
        "JACKSONVILLE",
        "FL"
    ],
    "32240": [
        "JACKSONVILLE BEACH",
        "FL"
    ],
    "32241": [
        "JACKSONVILLE",
        "FL"
    ],
    "32244": [
        "JACKSONVILLE",
        "FL"
    ],
    "32245": [
        "JACKSONVILLE",
        "FL"
    ],
    "32246": [
        "JACKSONVILLE",
        "FL"
    ],
    "32247": [
        "JACKSONVILLE",
        "FL"
    ],
    "32250": [
        "JACKSONVILLE BEACH",
        "FL"
    ],
    "32254": [
        "JACKSONVILLE",
        "FL"
    ],
    "32255": [
        "JACKSONVILLE",
        "FL"
    ],
    "32256": [
        "JACKSONVILLE",
        "FL"
    ],
    "32257": [
        "JACKSONVILLE",
        "FL"
    ],
    "32258": [
        "JACKSONVILLE",
        "FL"
    ],
    "32259": [
        "SAINT JOHNS",
        "FL"
    ],
    "32260": [
        "JACKSONVILLE",
        "FL"
    ],
    "32266": [
        "NEPTUNE BEACH",
        "FL"
    ],
    "32277": [
        "JACKSONVILLE",
        "FL"
    ],
    "32301": [
        "TALLAHASSEE",
        "FL"
    ],
    "32302": [
        "TALLAHASSEE",
        "FL"
    ],
    "32303": [
        "TALLAHASSEE",
        "FL"
    ],
    "32304": [
        "TALLAHASSEE",
        "FL"
    ],
    "32305": [
        "TALLAHASSEE",
        "FL"
    ],
    "32306": [
        "TALLAHASSEE",
        "FL"
    ],
    "32307": [
        "TALLAHASSEE",
        "FL"
    ],
    "32308": [
        "TALLAHASSEE",
        "FL"
    ],
    "32309": [
        "TALLAHASSEE",
        "FL"
    ],
    "32310": [
        "TALLAHASSEE",
        "FL"
    ],
    "32311": [
        "TALLAHASSEE",
        "FL"
    ],
    "32312": [
        "TALLAHASSEE",
        "FL"
    ],
    "32313": [
        "TALLAHASSEE",
        "FL"
    ],
    "32314": [
        "TALLAHASSEE",
        "FL"
    ],
    "32315": [
        "TALLAHASSEE",
        "FL"
    ],
    "32316": [
        "TALLAHASSEE",
        "FL"
    ],
    "32317": [
        "TALLAHASSEE",
        "FL"
    ],
    "32318": [
        "TALLAHASSEE",
        "FL"
    ],
    "32320": [
        "APALACHICOLA",
        "FL"
    ],
    "32321": [
        "BRISTOL",
        "FL"
    ],
    "32322": [
        "CARRABELLE",
        "FL"
    ],
    "32323": [
        "LANARK VILLAGE",
        "FL"
    ],
    "32324": [
        "CHATTAHOOCHEE",
        "FL"
    ],
    "32326": [
        "CRAWFORDVILLE",
        "FL"
    ],
    "32327": [
        "CRAWFORDVILLE",
        "FL"
    ],
    "32328": [
        "EASTPOINT",
        "FL"
    ],
    "32329": [
        "APALACHICOLA",
        "FL"
    ],
    "32330": [
        "GREENSBORO",
        "FL"
    ],
    "32331": [
        "GREENVILLE",
        "FL"
    ],
    "32332": [
        "GRETNA",
        "FL"
    ],
    "32333": [
        "HAVANA",
        "FL"
    ],
    "32334": [
        "HOSFORD",
        "FL"
    ],
    "32335": [
        "SUMATRA",
        "FL"
    ],
    "32336": [
        "LAMONT",
        "FL"
    ],
    "32337": [
        "LLOYD",
        "FL"
    ],
    "32340": [
        "MADISON",
        "FL"
    ],
    "32341": [
        "MADISON",
        "FL"
    ],
    "32343": [
        "MIDWAY",
        "FL"
    ],
    "32344": [
        "MONTICELLO",
        "FL"
    ],
    "32345": [
        "MONTICELLO",
        "FL"
    ],
    "32346": [
        "PANACEA",
        "FL"
    ],
    "32347": [
        "PERRY",
        "FL"
    ],
    "32348": [
        "PERRY",
        "FL"
    ],
    "32350": [
        "PINETTA",
        "FL"
    ],
    "32351": [
        "QUINCY",
        "FL"
    ],
    "32352": [
        "QUINCY",
        "FL"
    ],
    "32353": [
        "QUINCY",
        "FL"
    ],
    "32355": [
        "SAINT MARKS",
        "FL"
    ],
    "32356": [
        "SALEM",
        "FL"
    ],
    "32357": [
        "SHADY GROVE",
        "FL"
    ],
    "32358": [
        "SOPCHOPPY",
        "FL"
    ],
    "32359": [
        "STEINHATCHEE",
        "FL"
    ],
    "32360": [
        "TELOGIA",
        "FL"
    ],
    "32361": [
        "WACISSA",
        "FL"
    ],
    "32362": [
        "WOODVILLE",
        "FL"
    ],
    "32395": [
        "TALLAHASSEE",
        "FL"
    ],
    "32399": [
        "TALLAHASSEE",
        "FL"
    ],
    "32401": [
        "PANAMA CITY",
        "FL"
    ],
    "32402": [
        "PANAMA CITY",
        "FL"
    ],
    "32403": [
        "PANAMA CITY",
        "FL"
    ],
    "32404": [
        "PANAMA CITY",
        "FL"
    ],
    "32405": [
        "PANAMA CITY",
        "FL"
    ],
    "32406": [
        "PANAMA CITY",
        "FL"
    ],
    "32407": [
        "PANAMA CITY BEACH",
        "FL"
    ],
    "32408": [
        "PANAMA CITY",
        "FL"
    ],
    "32409": [
        "PANAMA CITY",
        "FL"
    ],
    "32410": [
        "MEXICO BEACH",
        "FL"
    ],
    "32411": [
        "PANAMA CITY",
        "FL"
    ],
    "32412": [
        "PANAMA CITY",
        "FL"
    ],
    "32413": [
        "PANAMA CITY BEACH",
        "FL"
    ],
    "32417": [
        "PANAMA CITY",
        "FL"
    ],
    "32420": [
        "ALFORD",
        "FL"
    ],
    "32421": [
        "ALTHA",
        "FL"
    ],
    "32422": [
        "ARGYLE",
        "FL"
    ],
    "32423": [
        "BASCOM",
        "FL"
    ],
    "32424": [
        "BLOUNTSTOWN",
        "FL"
    ],
    "32425": [
        "BONIFAY",
        "FL"
    ],
    "32426": [
        "CAMPBELLTON",
        "FL"
    ],
    "32427": [
        "CARYVILLE",
        "FL"
    ],
    "32428": [
        "CHIPLEY",
        "FL"
    ],
    "32430": [
        "CLARKSVILLE",
        "FL"
    ],
    "32431": [
        "COTTONDALE",
        "FL"
    ],
    "32433": [
        "DEFUNIAK SPRINGS",
        "FL"
    ],
    "32434": [
        "MOSSY HEAD",
        "FL"
    ],
    "32435": [
        "DEFUNIAK SPRINGS",
        "FL"
    ],
    "32437": [
        "EBRO",
        "FL"
    ],
    "32438": [
        "FOUNTAIN",
        "FL"
    ],
    "32439": [
        "FREEPORT",
        "FL"
    ],
    "32440": [
        "GRACEVILLE",
        "FL"
    ],
    "32442": [
        "GRAND RIDGE",
        "FL"
    ],
    "32443": [
        "GREENWOOD",
        "FL"
    ],
    "32444": [
        "LYNN HAVEN",
        "FL"
    ],
    "32445": [
        "MALONE",
        "FL"
    ],
    "32446": [
        "MARIANNA",
        "FL"
    ],
    "32447": [
        "MARIANNA",
        "FL"
    ],
    "32448": [
        "MARIANNA",
        "FL"
    ],
    "32449": [
        "WEWAHITCHKA",
        "FL"
    ],
    "32452": [
        "NOMA",
        "FL"
    ],
    "32455": [
        "PONCE DE LEON",
        "FL"
    ],
    "32456": [
        "PORT SAINT JOE",
        "FL"
    ],
    "32457": [
        "PORT SAINT JOE",
        "FL"
    ],
    "32459": [
        "SANTA ROSA BEACH",
        "FL"
    ],
    "32460": [
        "SNEADS",
        "FL"
    ],
    "32461": [
        "ROSEMARY BEACH",
        "FL"
    ],
    "32462": [
        "VERNON",
        "FL"
    ],
    "32463": [
        "WAUSAU",
        "FL"
    ],
    "32464": [
        "WESTVILLE",
        "FL"
    ],
    "32465": [
        "WEWAHITCHKA",
        "FL"
    ],
    "32466": [
        "YOUNGSTOWN",
        "FL"
    ],
    "32501": [
        "PENSACOLA",
        "FL"
    ],
    "32502": [
        "PENSACOLA",
        "FL"
    ],
    "32503": [
        "PENSACOLA",
        "FL"
    ],
    "32504": [
        "PENSACOLA",
        "FL"
    ],
    "32505": [
        "PENSACOLA",
        "FL"
    ],
    "32506": [
        "PENSACOLA",
        "FL"
    ],
    "32507": [
        "PENSACOLA",
        "FL"
    ],
    "32508": [
        "PENSACOLA",
        "FL"
    ],
    "32509": [
        "PENSACOLA",
        "FL"
    ],
    "32511": [
        "PENSACOLA",
        "FL"
    ],
    "32512": [
        "PENSACOLA",
        "FL"
    ],
    "32513": [
        "PENSACOLA",
        "FL"
    ],
    "32514": [
        "PENSACOLA",
        "FL"
    ],
    "32516": [
        "PENSACOLA",
        "FL"
    ],
    "32520": [
        "PENSACOLA",
        "FL"
    ],
    "32521": [
        "PENSACOLA",
        "FL"
    ],
    "32522": [
        "PENSACOLA",
        "FL"
    ],
    "32523": [
        "PENSACOLA",
        "FL"
    ],
    "32524": [
        "PENSACOLA",
        "FL"
    ],
    "32526": [
        "PENSACOLA",
        "FL"
    ],
    "32530": [
        "BAGDAD",
        "FL"
    ],
    "32531": [
        "BAKER",
        "FL"
    ],
    "32533": [
        "CANTONMENT",
        "FL"
    ],
    "32534": [
        "PENSACOLA",
        "FL"
    ],
    "32535": [
        "CENTURY",
        "FL"
    ],
    "32536": [
        "CRESTVIEW",
        "FL"
    ],
    "32537": [
        "MILLIGAN",
        "FL"
    ],
    "32538": [
        "PAXTON",
        "FL"
    ],
    "32539": [
        "CRESTVIEW",
        "FL"
    ],
    "32540": [
        "DESTIN",
        "FL"
    ],
    "32541": [
        "DESTIN",
        "FL"
    ],
    "32542": [
        "EGLIN AFB",
        "FL"
    ],
    "32544": [
        "HURLBURT FIELD",
        "FL"
    ],
    "32547": [
        "FORT WALTON BEACH",
        "FL"
    ],
    "32548": [
        "FORT WALTON BEACH",
        "FL"
    ],
    "32549": [
        "FORT WALTON BEACH",
        "FL"
    ],
    "32550": [
        "MIRAMAR BEACH",
        "FL"
    ],
    "32560": [
        "GONZALEZ",
        "FL"
    ],
    "32561": [
        "GULF BREEZE",
        "FL"
    ],
    "32562": [
        "GULF BREEZE",
        "FL"
    ],
    "32563": [
        "GULF BREEZE",
        "FL"
    ],
    "32564": [
        "HOLT",
        "FL"
    ],
    "32565": [
        "JAY",
        "FL"
    ],
    "32566": [
        "NAVARRE",
        "FL"
    ],
    "32567": [
        "LAUREL HILL",
        "FL"
    ],
    "32568": [
        "MC DAVID",
        "FL"
    ],
    "32569": [
        "MARY ESTHER",
        "FL"
    ],
    "32570": [
        "MILTON",
        "FL"
    ],
    "32571": [
        "MILTON",
        "FL"
    ],
    "32572": [
        "MILTON",
        "FL"
    ],
    "32577": [
        "MOLINO",
        "FL"
    ],
    "32578": [
        "NICEVILLE",
        "FL"
    ],
    "32579": [
        "SHALIMAR",
        "FL"
    ],
    "32580": [
        "VALPARAISO",
        "FL"
    ],
    "32583": [
        "MILTON",
        "FL"
    ],
    "32588": [
        "NICEVILLE",
        "FL"
    ],
    "32591": [
        "PENSACOLA",
        "FL"
    ],
    "32601": [
        "GAINESVILLE",
        "FL"
    ],
    "32602": [
        "GAINESVILLE",
        "FL"
    ],
    "32603": [
        "GAINESVILLE",
        "FL"
    ],
    "32604": [
        "GAINESVILLE",
        "FL"
    ],
    "32605": [
        "GAINESVILLE",
        "FL"
    ],
    "32606": [
        "GAINESVILLE",
        "FL"
    ],
    "32607": [
        "GAINESVILLE",
        "FL"
    ],
    "32608": [
        "GAINESVILLE",
        "FL"
    ],
    "32609": [
        "GAINESVILLE",
        "FL"
    ],
    "32610": [
        "GAINESVILLE",
        "FL"
    ],
    "32611": [
        "GAINESVILLE",
        "FL"
    ],
    "32614": [
        "GAINESVILLE",
        "FL"
    ],
    "32615": [
        "ALACHUA",
        "FL"
    ],
    "32616": [
        "ALACHUA",
        "FL"
    ],
    "32617": [
        "ANTHONY",
        "FL"
    ],
    "32618": [
        "ARCHER",
        "FL"
    ],
    "32619": [
        "BELL",
        "FL"
    ],
    "32621": [
        "BRONSON",
        "FL"
    ],
    "32622": [
        "BROOKER",
        "FL"
    ],
    "32625": [
        "CEDAR KEY",
        "FL"
    ],
    "32626": [
        "CHIEFLAND",
        "FL"
    ],
    "32627": [
        "GAINESVILLE",
        "FL"
    ],
    "32628": [
        "CROSS CITY",
        "FL"
    ],
    "32631": [
        "EARLETON",
        "FL"
    ],
    "32634": [
        "FAIRFIELD",
        "FL"
    ],
    "32635": [
        "GAINESVILLE",
        "FL"
    ],
    "32639": [
        "GULF HAMMOCK",
        "FL"
    ],
    "32640": [
        "HAWTHORNE",
        "FL"
    ],
    "32641": [
        "GAINESVILLE",
        "FL"
    ],
    "32643": [
        "HIGH SPRINGS",
        "FL"
    ],
    "32644": [
        "CHIEFLAND",
        "FL"
    ],
    "32648": [
        "HORSESHOE BEACH",
        "FL"
    ],
    "32653": [
        "GAINESVILLE",
        "FL"
    ],
    "32654": [
        "ISLAND GROVE",
        "FL"
    ],
    "32655": [
        "HIGH SPRINGS",
        "FL"
    ],
    "32656": [
        "KEYSTONE HEIGHTS",
        "FL"
    ],
    "32658": [
        "LA CROSSE",
        "FL"
    ],
    "32663": [
        "LOWELL",
        "FL"
    ],
    "32664": [
        "MC INTOSH",
        "FL"
    ],
    "32666": [
        "MELROSE",
        "FL"
    ],
    "32667": [
        "MICANOPY",
        "FL"
    ],
    "32668": [
        "MORRISTON",
        "FL"
    ],
    "32669": [
        "NEWBERRY",
        "FL"
    ],
    "32680": [
        "OLD TOWN",
        "FL"
    ],
    "32681": [
        "ORANGE LAKE",
        "FL"
    ],
    "32683": [
        "OTTER CREEK",
        "FL"
    ],
    "32686": [
        "REDDICK",
        "FL"
    ],
    "32692": [
        "SUWANNEE",
        "FL"
    ],
    "32693": [
        "TRENTON",
        "FL"
    ],
    "32694": [
        "WALDO",
        "FL"
    ],
    "32696": [
        "WILLISTON",
        "FL"
    ],
    "32697": [
        "WORTHINGTON SPRINGS",
        "FL"
    ],
    "32701": [
        "ALTAMONTE SPRINGS",
        "FL"
    ],
    "32702": [
        "ALTOONA",
        "FL"
    ],
    "32703": [
        "APOPKA",
        "FL"
    ],
    "32704": [
        "APOPKA",
        "FL"
    ],
    "32706": [
        "CASSADAGA",
        "FL"
    ],
    "32707": [
        "CASSELBERRY",
        "FL"
    ],
    "32708": [
        "WINTER SPRINGS",
        "FL"
    ],
    "32709": [
        "CHRISTMAS",
        "FL"
    ],
    "32710": [
        "CLARCONA",
        "FL"
    ],
    "32712": [
        "APOPKA",
        "FL"
    ],
    "32713": [
        "DEBARY",
        "FL"
    ],
    "32714": [
        "ALTAMONTE SPRINGS",
        "FL"
    ],
    "32715": [
        "ALTAMONTE SPRINGS",
        "FL"
    ],
    "32716": [
        "ALTAMONTE SPRINGS",
        "FL"
    ],
    "32718": [
        "CASSELBERRY",
        "FL"
    ],
    "32719": [
        "WINTER SPRINGS",
        "FL"
    ],
    "32720": [
        "DELAND",
        "FL"
    ],
    "32721": [
        "DELAND",
        "FL"
    ],
    "32722": [
        "GLENWOOD",
        "FL"
    ],
    "32723": [
        "DELAND",
        "FL"
    ],
    "32724": [
        "DELAND",
        "FL"
    ],
    "32725": [
        "DELTONA",
        "FL"
    ],
    "32726": [
        "EUSTIS",
        "FL"
    ],
    "32727": [
        "EUSTIS",
        "FL"
    ],
    "32728": [
        "DELTONA",
        "FL"
    ],
    "32730": [
        "CASSELBERRY",
        "FL"
    ],
    "32732": [
        "GENEVA",
        "FL"
    ],
    "32733": [
        "GOLDENROD",
        "FL"
    ],
    "32735": [
        "GRAND ISLAND",
        "FL"
    ],
    "32736": [
        "EUSTIS",
        "FL"
    ],
    "32738": [
        "DELTONA",
        "FL"
    ],
    "32739": [
        "DELTONA",
        "FL"
    ],
    "32744": [
        "LAKE HELEN",
        "FL"
    ],
    "32745": [
        "MID FLORIDA",
        "FL"
    ],
    "32746": [
        "LAKE MARY",
        "FL"
    ],
    "32747": [
        "LAKE MONROE",
        "FL"
    ],
    "32750": [
        "LONGWOOD",
        "FL"
    ],
    "32751": [
        "MAITLAND",
        "FL"
    ],
    "32752": [
        "LONGWOOD",
        "FL"
    ],
    "32753": [
        "DEBARY",
        "FL"
    ],
    "32754": [
        "MIMS",
        "FL"
    ],
    "32756": [
        "MOUNT DORA",
        "FL"
    ],
    "32757": [
        "MOUNT DORA",
        "FL"
    ],
    "32759": [
        "OAK HILL",
        "FL"
    ],
    "32762": [
        "OVIEDO",
        "FL"
    ],
    "32763": [
        "ORANGE CITY",
        "FL"
    ],
    "32764": [
        "OSTEEN",
        "FL"
    ],
    "32765": [
        "OVIEDO",
        "FL"
    ],
    "32766": [
        "OVIEDO",
        "FL"
    ],
    "32767": [
        "PAISLEY",
        "FL"
    ],
    "32768": [
        "PLYMOUTH",
        "FL"
    ],
    "32771": [
        "SANFORD",
        "FL"
    ],
    "32772": [
        "SANFORD",
        "FL"
    ],
    "32773": [
        "SANFORD",
        "FL"
    ],
    "32774": [
        "ORANGE CITY",
        "FL"
    ],
    "32775": [
        "SCOTTSMOOR",
        "FL"
    ],
    "32776": [
        "SORRENTO",
        "FL"
    ],
    "32777": [
        "TANGERINE",
        "FL"
    ],
    "32778": [
        "TAVARES",
        "FL"
    ],
    "32779": [
        "LONGWOOD",
        "FL"
    ],
    "32780": [
        "TITUSVILLE",
        "FL"
    ],
    "32781": [
        "TITUSVILLE",
        "FL"
    ],
    "32783": [
        "TITUSVILLE",
        "FL"
    ],
    "32784": [
        "UMATILLA",
        "FL"
    ],
    "32789": [
        "WINTER PARK",
        "FL"
    ],
    "32790": [
        "WINTER PARK",
        "FL"
    ],
    "32791": [
        "LONGWOOD",
        "FL"
    ],
    "32792": [
        "WINTER PARK",
        "FL"
    ],
    "32793": [
        "WINTER PARK",
        "FL"
    ],
    "32794": [
        "MAITLAND",
        "FL"
    ],
    "32795": [
        "LAKE MARY",
        "FL"
    ],
    "32796": [
        "TITUSVILLE",
        "FL"
    ],
    "32798": [
        "ZELLWOOD",
        "FL"
    ],
    "32799": [
        "MID FLORIDA",
        "FL"
    ],
    "32801": [
        "ORLANDO",
        "FL"
    ],
    "32802": [
        "ORLANDO",
        "FL"
    ],
    "32803": [
        "ORLANDO",
        "FL"
    ],
    "32804": [
        "ORLANDO",
        "FL"
    ],
    "32805": [
        "ORLANDO",
        "FL"
    ],
    "32806": [
        "ORLANDO",
        "FL"
    ],
    "32807": [
        "ORLANDO",
        "FL"
    ],
    "32808": [
        "ORLANDO",
        "FL"
    ],
    "32809": [
        "ORLANDO",
        "FL"
    ],
    "32810": [
        "ORLANDO",
        "FL"
    ],
    "32811": [
        "ORLANDO",
        "FL"
    ],
    "32812": [
        "ORLANDO",
        "FL"
    ],
    "32814": [
        "ORLANDO",
        "FL"
    ],
    "32815": [
        "ORLANDO",
        "FL"
    ],
    "32816": [
        "ORLANDO",
        "FL"
    ],
    "32817": [
        "ORLANDO",
        "FL"
    ],
    "32818": [
        "ORLANDO",
        "FL"
    ],
    "32819": [
        "ORLANDO",
        "FL"
    ],
    "32820": [
        "ORLANDO",
        "FL"
    ],
    "32821": [
        "ORLANDO",
        "FL"
    ],
    "32822": [
        "ORLANDO",
        "FL"
    ],
    "32824": [
        "ORLANDO",
        "FL"
    ],
    "32825": [
        "ORLANDO",
        "FL"
    ],
    "32826": [
        "ORLANDO",
        "FL"
    ],
    "32827": [
        "ORLANDO",
        "FL"
    ],
    "32828": [
        "ORLANDO",
        "FL"
    ],
    "32829": [
        "ORLANDO",
        "FL"
    ],
    "32830": [
        "ORLANDO",
        "FL"
    ],
    "32831": [
        "ORLANDO",
        "FL"
    ],
    "32832": [
        "ORLANDO",
        "FL"
    ],
    "32833": [
        "ORLANDO",
        "FL"
    ],
    "32834": [
        "ORLANDO",
        "FL"
    ],
    "32835": [
        "ORLANDO",
        "FL"
    ],
    "32836": [
        "ORLANDO",
        "FL"
    ],
    "32837": [
        "ORLANDO",
        "FL"
    ],
    "32839": [
        "ORLANDO",
        "FL"
    ],
    "32853": [
        "ORLANDO",
        "FL"
    ],
    "32854": [
        "ORLANDO",
        "FL"
    ],
    "32855": [
        "ORLANDO",
        "FL"
    ],
    "32856": [
        "ORLANDO",
        "FL"
    ],
    "32857": [
        "ORLANDO",
        "FL"
    ],
    "32858": [
        "ORLANDO",
        "FL"
    ],
    "32859": [
        "ORLANDO",
        "FL"
    ],
    "32860": [
        "ORLANDO",
        "FL"
    ],
    "32861": [
        "ORLANDO",
        "FL"
    ],
    "32862": [
        "ORLANDO",
        "FL"
    ],
    "32867": [
        "ORLANDO",
        "FL"
    ],
    "32868": [
        "ORLANDO",
        "FL"
    ],
    "32869": [
        "ORLANDO",
        "FL"
    ],
    "32872": [
        "ORLANDO",
        "FL"
    ],
    "32877": [
        "ORLANDO",
        "FL"
    ],
    "32878": [
        "ORLANDO",
        "FL"
    ],
    "32885": [
        "ORLANDO",
        "FL"
    ],
    "32887": [
        "ORLANDO",
        "FL"
    ],
    "32897": [
        "ORLANDO",
        "FL"
    ],
    "32899": [
        "ORLANDO",
        "FL"
    ],
    "32901": [
        "MELBOURNE",
        "FL"
    ],
    "32902": [
        "MELBOURNE",
        "FL"
    ],
    "32903": [
        "INDIALANTIC",
        "FL"
    ],
    "32904": [
        "MELBOURNE",
        "FL"
    ],
    "32905": [
        "PALM BAY",
        "FL"
    ],
    "32906": [
        "PALM BAY",
        "FL"
    ],
    "32907": [
        "PALM BAY",
        "FL"
    ],
    "32908": [
        "PALM BAY",
        "FL"
    ],
    "32909": [
        "PALM BAY",
        "FL"
    ],
    "32910": [
        "PALM BAY",
        "FL"
    ],
    "32911": [
        "PALM BAY",
        "FL"
    ],
    "32912": [
        "MELBOURNE",
        "FL"
    ],
    "32919": [
        "MELBOURNE",
        "FL"
    ],
    "32920": [
        "CAPE CANAVERAL",
        "FL"
    ],
    "32922": [
        "COCOA",
        "FL"
    ],
    "32923": [
        "COCOA",
        "FL"
    ],
    "32924": [
        "COCOA",
        "FL"
    ],
    "32925": [
        "PATRICK AFB",
        "FL"
    ],
    "32926": [
        "COCOA",
        "FL"
    ],
    "32927": [
        "COCOA",
        "FL"
    ],
    "32931": [
        "COCOA BEACH",
        "FL"
    ],
    "32932": [
        "COCOA BEACH",
        "FL"
    ],
    "32934": [
        "MELBOURNE",
        "FL"
    ],
    "32935": [
        "MELBOURNE",
        "FL"
    ],
    "32936": [
        "MELBOURNE",
        "FL"
    ],
    "32937": [
        "SATELLITE BEACH",
        "FL"
    ],
    "32940": [
        "MELBOURNE",
        "FL"
    ],
    "32941": [
        "MELBOURNE",
        "FL"
    ],
    "32948": [
        "FELLSMERE",
        "FL"
    ],
    "32949": [
        "GRANT",
        "FL"
    ],
    "32950": [
        "MALABAR",
        "FL"
    ],
    "32951": [
        "MELBOURNE BEACH",
        "FL"
    ],
    "32952": [
        "MERRITT ISLAND",
        "FL"
    ],
    "32953": [
        "MERRITT ISLAND",
        "FL"
    ],
    "32954": [
        "MERRITT ISLAND",
        "FL"
    ],
    "32955": [
        "ROCKLEDGE",
        "FL"
    ],
    "32956": [
        "ROCKLEDGE",
        "FL"
    ],
    "32957": [
        "ROSELAND",
        "FL"
    ],
    "32958": [
        "SEBASTIAN",
        "FL"
    ],
    "32959": [
        "SHARPES",
        "FL"
    ],
    "32960": [
        "VERO BEACH",
        "FL"
    ],
    "32961": [
        "VERO BEACH",
        "FL"
    ],
    "32962": [
        "VERO BEACH",
        "FL"
    ],
    "32963": [
        "VERO BEACH",
        "FL"
    ],
    "32964": [
        "VERO BEACH",
        "FL"
    ],
    "32965": [
        "VERO BEACH",
        "FL"
    ],
    "32966": [
        "VERO BEACH",
        "FL"
    ],
    "32967": [
        "VERO BEACH",
        "FL"
    ],
    "32968": [
        "VERO BEACH",
        "FL"
    ],
    "32969": [
        "VERO BEACH",
        "FL"
    ],
    "32970": [
        "WABASSO",
        "FL"
    ],
    "32971": [
        "WINTER BEACH",
        "FL"
    ],
    "32976": [
        "SEBASTIAN",
        "FL"
    ],
    "32978": [
        "SEBASTIAN",
        "FL"
    ],
    "33001": [
        "LONG KEY",
        "FL"
    ],
    "33002": [
        "HIALEAH",
        "FL"
    ],
    "33004": [
        "DANIA",
        "FL"
    ],
    "33008": [
        "HALLANDALE",
        "FL"
    ],
    "33009": [
        "HALLANDALE",
        "FL"
    ],
    "33010": [
        "HIALEAH",
        "FL"
    ],
    "33011": [
        "HIALEAH",
        "FL"
    ],
    "33012": [
        "HIALEAH",
        "FL"
    ],
    "33013": [
        "HIALEAH",
        "FL"
    ],
    "33014": [
        "HIALEAH",
        "FL"
    ],
    "33015": [
        "HIALEAH",
        "FL"
    ],
    "33016": [
        "HIALEAH",
        "FL"
    ],
    "33017": [
        "HIALEAH",
        "FL"
    ],
    "33018": [
        "HIALEAH",
        "FL"
    ],
    "33019": [
        "HOLLYWOOD",
        "FL"
    ],
    "33020": [
        "HOLLYWOOD",
        "FL"
    ],
    "33021": [
        "HOLLYWOOD",
        "FL"
    ],
    "33022": [
        "HOLLYWOOD",
        "FL"
    ],
    "33023": [
        "HOLLYWOOD",
        "FL"
    ],
    "33024": [
        "HOLLYWOOD",
        "FL"
    ],
    "33025": [
        "HOLLYWOOD",
        "FL"
    ],
    "33026": [
        "HOLLYWOOD",
        "FL"
    ],
    "33027": [
        "HOLLYWOOD",
        "FL"
    ],
    "33028": [
        "PEMBROKE PINES",
        "FL"
    ],
    "33029": [
        "HOLLYWOOD",
        "FL"
    ],
    "33030": [
        "HOMESTEAD",
        "FL"
    ],
    "33031": [
        "HOMESTEAD",
        "FL"
    ],
    "33032": [
        "HOMESTEAD",
        "FL"
    ],
    "33033": [
        "HOMESTEAD",
        "FL"
    ],
    "33034": [
        "HOMESTEAD",
        "FL"
    ],
    "33035": [
        "HOMESTEAD",
        "FL"
    ],
    "33036": [
        "ISLAMORADA",
        "FL"
    ],
    "33037": [
        "KEY LARGO",
        "FL"
    ],
    "33039": [
        "HOMESTEAD",
        "FL"
    ],
    "33040": [
        "KEY WEST",
        "FL"
    ],
    "33041": [
        "KEY WEST",
        "FL"
    ],
    "33042": [
        "SUMMERLAND KEY",
        "FL"
    ],
    "33043": [
        "BIG PINE KEY",
        "FL"
    ],
    "33045": [
        "KEY WEST",
        "FL"
    ],
    "33050": [
        "MARATHON",
        "FL"
    ],
    "33051": [
        "KEY COLONY BEACH",
        "FL"
    ],
    "33052": [
        "MARATHON SHORES",
        "FL"
    ],
    "33054": [
        "OPA LOCKA",
        "FL"
    ],
    "33055": [
        "OPA LOCKA",
        "FL"
    ],
    "33056": [
        "MIAMI GARDENS",
        "FL"
    ],
    "33060": [
        "POMPANO BEACH",
        "FL"
    ],
    "33061": [
        "POMPANO BEACH",
        "FL"
    ],
    "33062": [
        "POMPANO BEACH",
        "FL"
    ],
    "33063": [
        "POMPANO BEACH",
        "FL"
    ],
    "33064": [
        "POMPANO BEACH",
        "FL"
    ],
    "33065": [
        "POMPANO BEACH",
        "FL"
    ],
    "33066": [
        "POMPANO BEACH",
        "FL"
    ],
    "33067": [
        "POMPANO BEACH",
        "FL"
    ],
    "33068": [
        "POMPANO BEACH",
        "FL"
    ],
    "33069": [
        "POMPANO BEACH",
        "FL"
    ],
    "33070": [
        "TAVERNIER",
        "FL"
    ],
    "33071": [
        "POMPANO BEACH",
        "FL"
    ],
    "33072": [
        "POMPANO BEACH",
        "FL"
    ],
    "33073": [
        "POMPANO BEACH",
        "FL"
    ],
    "33074": [
        "POMPANO BEACH",
        "FL"
    ],
    "33075": [
        "CORAL SPRINGS",
        "FL"
    ],
    "33076": [
        "POMPANO BEACH",
        "FL"
    ],
    "33077": [
        "POMPANO BEACH",
        "FL"
    ],
    "33081": [
        "HOLLYWOOD",
        "FL"
    ],
    "33082": [
        "PEMBROKE PINES",
        "FL"
    ],
    "33083": [
        "HOLLYWOOD",
        "FL"
    ],
    "33084": [
        "HOLLYWOOD",
        "FL"
    ],
    "33090": [
        "HOMESTEAD",
        "FL"
    ],
    "33092": [
        "HOMESTEAD",
        "FL"
    ],
    "33093": [
        "MARGATE",
        "FL"
    ],
    "33097": [
        "COCONUT CREEK",
        "FL"
    ],
    "33101": [
        "MIAMI",
        "FL"
    ],
    "33102": [
        "MIAMI",
        "FL"
    ],
    "33106": [
        "MIAMI",
        "FL"
    ],
    "33109": [
        "MIAMI BEACH",
        "FL"
    ],
    "33111": [
        "MIAMI",
        "FL"
    ],
    "33112": [
        "MIAMI",
        "FL"
    ],
    "33114": [
        "CORAL GABLES",
        "FL"
    ],
    "33116": [
        "MIAMI",
        "FL"
    ],
    "33119": [
        "MIAMI BEACH",
        "FL"
    ],
    "33122": [
        "MIAMI",
        "FL"
    ],
    "33124": [
        "MIAMI",
        "FL"
    ],
    "33125": [
        "MIAMI",
        "FL"
    ],
    "33126": [
        "MIAMI",
        "FL"
    ],
    "33127": [
        "MIAMI",
        "FL"
    ],
    "33128": [
        "MIAMI",
        "FL"
    ],
    "33129": [
        "MIAMI",
        "FL"
    ],
    "33130": [
        "MIAMI",
        "FL"
    ],
    "33131": [
        "MIAMI",
        "FL"
    ],
    "33132": [
        "MIAMI",
        "FL"
    ],
    "33133": [
        "MIAMI",
        "FL"
    ],
    "33134": [
        "MIAMI",
        "FL"
    ],
    "33135": [
        "MIAMI",
        "FL"
    ],
    "33136": [
        "MIAMI",
        "FL"
    ],
    "33137": [
        "MIAMI",
        "FL"
    ],
    "33138": [
        "MIAMI",
        "FL"
    ],
    "33139": [
        "MIAMI BEACH",
        "FL"
    ],
    "33140": [
        "MIAMI BEACH",
        "FL"
    ],
    "33141": [
        "MIAMI BEACH",
        "FL"
    ],
    "33142": [
        "MIAMI",
        "FL"
    ],
    "33143": [
        "MIAMI",
        "FL"
    ],
    "33144": [
        "MIAMI",
        "FL"
    ],
    "33145": [
        "MIAMI",
        "FL"
    ],
    "33146": [
        "MIAMI",
        "FL"
    ],
    "33147": [
        "MIAMI",
        "FL"
    ],
    "33149": [
        "KEY BISCAYNE",
        "FL"
    ],
    "33150": [
        "MIAMI",
        "FL"
    ],
    "33151": [
        "MIAMI",
        "FL"
    ],
    "33152": [
        "MIAMI",
        "FL"
    ],
    "33153": [
        "MIAMI",
        "FL"
    ],
    "33154": [
        "MIAMI BEACH",
        "FL"
    ],
    "33155": [
        "MIAMI",
        "FL"
    ],
    "33156": [
        "MIAMI",
        "FL"
    ],
    "33157": [
        "MIAMI",
        "FL"
    ],
    "33158": [
        "MIAMI",
        "FL"
    ],
    "33159": [
        "MIAMI",
        "FL"
    ],
    "33160": [
        "NORTH MIAMI BEACH",
        "FL"
    ],
    "33161": [
        "MIAMI",
        "FL"
    ],
    "33162": [
        "MIAMI",
        "FL"
    ],
    "33163": [
        "MIAMI",
        "FL"
    ],
    "33164": [
        "MIAMI",
        "FL"
    ],
    "33165": [
        "MIAMI",
        "FL"
    ],
    "33166": [
        "MIAMI",
        "FL"
    ],
    "33167": [
        "MIAMI",
        "FL"
    ],
    "33168": [
        "MIAMI",
        "FL"
    ],
    "33169": [
        "MIAMI",
        "FL"
    ],
    "33170": [
        "MIAMI",
        "FL"
    ],
    "33172": [
        "MIAMI",
        "FL"
    ],
    "33173": [
        "MIAMI",
        "FL"
    ],
    "33174": [
        "MIAMI",
        "FL"
    ],
    "33175": [
        "MIAMI",
        "FL"
    ],
    "33176": [
        "MIAMI",
        "FL"
    ],
    "33177": [
        "MIAMI",
        "FL"
    ],
    "33178": [
        "MIAMI",
        "FL"
    ],
    "33179": [
        "MIAMI",
        "FL"
    ],
    "33180": [
        "MIAMI",
        "FL"
    ],
    "33181": [
        "MIAMI",
        "FL"
    ],
    "33182": [
        "MIAMI",
        "FL"
    ],
    "33183": [
        "MIAMI",
        "FL"
    ],
    "33184": [
        "MIAMI",
        "FL"
    ],
    "33185": [
        "MIAMI",
        "FL"
    ],
    "33186": [
        "MIAMI",
        "FL"
    ],
    "33187": [
        "MIAMI",
        "FL"
    ],
    "33188": [
        "MIAMI",
        "FL"
    ],
    "33189": [
        "MIAMI",
        "FL"
    ],
    "33190": [
        "MIAMI",
        "FL"
    ],
    "33193": [
        "MIAMI",
        "FL"
    ],
    "33194": [
        "MIAMI",
        "FL"
    ],
    "33196": [
        "MIAMI",
        "FL"
    ],
    "33197": [
        "MIAMI",
        "FL"
    ],
    "33199": [
        "MIAMI",
        "FL"
    ],
    "33222": [
        "MIAMI",
        "FL"
    ],
    "33231": [
        "MIAMI",
        "FL"
    ],
    "33233": [
        "MIAMI",
        "FL"
    ],
    "33234": [
        "MIAMI",
        "FL"
    ],
    "33238": [
        "MIAMI",
        "FL"
    ],
    "33239": [
        "MIAMI BEACH",
        "FL"
    ],
    "33243": [
        "MIAMI",
        "FL"
    ],
    "33245": [
        "MIAMI",
        "FL"
    ],
    "33247": [
        "MIAMI",
        "FL"
    ],
    "33255": [
        "MIAMI",
        "FL"
    ],
    "33256": [
        "MIAMI",
        "FL"
    ],
    "33257": [
        "MIAMI",
        "FL"
    ],
    "33261": [
        "MIAMI",
        "FL"
    ],
    "33265": [
        "MIAMI",
        "FL"
    ],
    "33266": [
        "MIAMI",
        "FL"
    ],
    "33269": [
        "MIAMI",
        "FL"
    ],
    "33280": [
        "MIAMI",
        "FL"
    ],
    "33283": [
        "MIAMI",
        "FL"
    ],
    "33296": [
        "MIAMI",
        "FL"
    ],
    "33299": [
        "MIAMI",
        "FL"
    ],
    "33301": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33302": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33303": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33304": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33305": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33306": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33307": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33308": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33309": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33310": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33311": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33312": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33313": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33314": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33315": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33316": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33317": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33318": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33319": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33320": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33321": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33322": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33323": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33324": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33325": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33326": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33327": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33328": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33329": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33330": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33331": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33332": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33334": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33335": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33336": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33337": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33338": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33339": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33345": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33346": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33348": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33351": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33355": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33359": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33388": [
        "PLANTATION",
        "FL"
    ],
    "33394": [
        "FORT LAUDERDALE",
        "FL"
    ],
    "33401": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33402": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33403": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33404": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33405": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33406": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33407": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33408": [
        "NORTH PALM BEACH",
        "FL"
    ],
    "33409": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33410": [
        "PALM BEACH GARDENS",
        "FL"
    ],
    "33411": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33412": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33413": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33414": [
        "WELLINGTON",
        "FL"
    ],
    "33415": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33416": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33417": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33418": [
        "PALM BEACH GARDENS",
        "FL"
    ],
    "33419": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33420": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33421": [
        "ROYAL PALM BEACH",
        "FL"
    ],
    "33422": [
        "WEST PALM BEACH",
        "FL"
    ],
    "33424": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33425": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33426": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33427": [
        "BOCA RATON",
        "FL"
    ],
    "33428": [
        "BOCA RATON",
        "FL"
    ],
    "33429": [
        "BOCA RATON",
        "FL"
    ],
    "33430": [
        "BELLE GLADE",
        "FL"
    ],
    "33431": [
        "BOCA RATON",
        "FL"
    ],
    "33432": [
        "BOCA RATON",
        "FL"
    ],
    "33433": [
        "BOCA RATON",
        "FL"
    ],
    "33434": [
        "BOCA RATON",
        "FL"
    ],
    "33435": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33436": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33437": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33438": [
        "CANAL POINT",
        "FL"
    ],
    "33440": [
        "CLEWISTON",
        "FL"
    ],
    "33441": [
        "DEERFIELD BEACH",
        "FL"
    ],
    "33442": [
        "DEERFIELD BEACH",
        "FL"
    ],
    "33443": [
        "DEERFIELD BEACH",
        "FL"
    ],
    "33444": [
        "DELRAY BEACH",
        "FL"
    ],
    "33445": [
        "DELRAY BEACH",
        "FL"
    ],
    "33446": [
        "DELRAY BEACH",
        "FL"
    ],
    "33448": [
        "DELRAY BEACH",
        "FL"
    ],
    "33449": [
        "LAKE WORTH",
        "FL"
    ],
    "33454": [
        "GREENACRES",
        "FL"
    ],
    "33455": [
        "HOBE SOUND",
        "FL"
    ],
    "33458": [
        "JUPITER",
        "FL"
    ],
    "33459": [
        "LAKE HARBOR",
        "FL"
    ],
    "33460": [
        "LAKE WORTH",
        "FL"
    ],
    "33461": [
        "LAKE WORTH",
        "FL"
    ],
    "33462": [
        "LAKE WORTH",
        "FL"
    ],
    "33463": [
        "LAKE WORTH",
        "FL"
    ],
    "33464": [
        "BOCA RATON",
        "FL"
    ],
    "33465": [
        "LAKE WORTH",
        "FL"
    ],
    "33466": [
        "LAKE WORTH",
        "FL"
    ],
    "33467": [
        "LAKE WORTH",
        "FL"
    ],
    "33468": [
        "JUPITER",
        "FL"
    ],
    "33469": [
        "JUPITER",
        "FL"
    ],
    "33470": [
        "LOXAHATCHEE",
        "FL"
    ],
    "33471": [
        "MOORE HAVEN",
        "FL"
    ],
    "33472": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33473": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33474": [
        "BOYNTON BEACH",
        "FL"
    ],
    "33475": [
        "HOBE SOUND",
        "FL"
    ],
    "33476": [
        "PAHOKEE",
        "FL"
    ],
    "33477": [
        "JUPITER",
        "FL"
    ],
    "33478": [
        "JUPITER",
        "FL"
    ],
    "33480": [
        "PALM BEACH",
        "FL"
    ],
    "33481": [
        "BOCA RATON",
        "FL"
    ],
    "33482": [
        "DELRAY BEACH",
        "FL"
    ],
    "33483": [
        "DELRAY BEACH",
        "FL"
    ],
    "33484": [
        "DELRAY BEACH",
        "FL"
    ],
    "33486": [
        "BOCA RATON",
        "FL"
    ],
    "33487": [
        "BOCA RATON",
        "FL"
    ],
    "33488": [
        "BOCA RATON",
        "FL"
    ],
    "33493": [
        "SOUTH BAY",
        "FL"
    ],
    "33496": [
        "BOCA RATON",
        "FL"
    ],
    "33497": [
        "BOCA RATON",
        "FL"
    ],
    "33498": [
        "BOCA RATON",
        "FL"
    ],
    "33499": [
        "BOCA RATON",
        "FL"
    ],
    "33503": [
        "BALM",
        "FL"
    ],
    "33508": [
        "BRANDON",
        "FL"
    ],
    "33509": [
        "BRANDON",
        "FL"
    ],
    "33510": [
        "BRANDON",
        "FL"
    ],
    "33511": [
        "BRANDON",
        "FL"
    ],
    "33513": [
        "BUSHNELL",
        "FL"
    ],
    "33514": [
        "CENTER HILL",
        "FL"
    ],
    "33521": [
        "COLEMAN",
        "FL"
    ],
    "33523": [
        "DADE CITY",
        "FL"
    ],
    "33524": [
        "CRYSTAL SPRINGS",
        "FL"
    ],
    "33525": [
        "DADE CITY",
        "FL"
    ],
    "33526": [
        "DADE CITY",
        "FL"
    ],
    "33527": [
        "DOVER",
        "FL"
    ],
    "33530": [
        "DURANT",
        "FL"
    ],
    "33534": [
        "GIBSONTON",
        "FL"
    ],
    "33537": [
        "LACOOCHEE",
        "FL"
    ],
    "33538": [
        "LAKE PANASOFFKEE",
        "FL"
    ],
    "33539": [
        "ZEPHYRHILLS",
        "FL"
    ],
    "33540": [
        "ZEPHYRHILLS",
        "FL"
    ],
    "33541": [
        "ZEPHYRHILLS",
        "FL"
    ],
    "33542": [
        "ZEPHYRHILLS",
        "FL"
    ],
    "33543": [
        "WESLEY CHAPEL",
        "FL"
    ],
    "33544": [
        "WESLEY CHAPEL",
        "FL"
    ],
    "33545": [
        "WESLEY CHAPEL",
        "FL"
    ],
    "33547": [
        "LITHIA",
        "FL"
    ],
    "33548": [
        "LUTZ",
        "FL"
    ],
    "33549": [
        "LUTZ",
        "FL"
    ],
    "33550": [
        "MANGO",
        "FL"
    ],
    "33556": [
        "ODESSA",
        "FL"
    ],
    "33558": [
        "LUTZ",
        "FL"
    ],
    "33559": [
        "LUTZ",
        "FL"
    ],
    "33563": [
        "PLANT CITY",
        "FL"
    ],
    "33564": [
        "PLANT CITY",
        "FL"
    ],
    "33565": [
        "PLANT CITY",
        "FL"
    ],
    "33566": [
        "PLANT CITY",
        "FL"
    ],
    "33567": [
        "PLANT CITY",
        "FL"
    ],
    "33568": [
        "RIVERVIEW",
        "FL"
    ],
    "33569": [
        "RIVERVIEW",
        "FL"
    ],
    "33570": [
        "RUSKIN",
        "FL"
    ],
    "33571": [
        "SUN CITY CENTER",
        "FL"
    ],
    "33572": [
        "APOLLO BEACH",
        "FL"
    ],
    "33573": [
        "SUN CITY CENTER",
        "FL"
    ],
    "33574": [
        "SAINT LEO",
        "FL"
    ],
    "33575": [
        "RUSKIN",
        "FL"
    ],
    "33576": [
        "SAN ANTONIO",
        "FL"
    ],
    "33578": [
        "RIVERVIEW",
        "FL"
    ],
    "33579": [
        "RIVERVIEW",
        "FL"
    ],
    "33583": [
        "SEFFNER",
        "FL"
    ],
    "33584": [
        "SEFFNER",
        "FL"
    ],
    "33585": [
        "SUMTERVILLE",
        "FL"
    ],
    "33586": [
        "SUN CITY",
        "FL"
    ],
    "33587": [
        "SYDNEY",
        "FL"
    ],
    "33592": [
        "THONOTOSASSA",
        "FL"
    ],
    "33593": [
        "TRILBY",
        "FL"
    ],
    "33594": [
        "VALRICO",
        "FL"
    ],
    "33595": [
        "VALRICO",
        "FL"
    ],
    "33596": [
        "VALRICO",
        "FL"
    ],
    "33597": [
        "WEBSTER",
        "FL"
    ],
    "33598": [
        "WIMAUMA",
        "FL"
    ],
    "33601": [
        "TAMPA",
        "FL"
    ],
    "33602": [
        "TAMPA",
        "FL"
    ],
    "33603": [
        "TAMPA",
        "FL"
    ],
    "33604": [
        "TAMPA",
        "FL"
    ],
    "33605": [
        "TAMPA",
        "FL"
    ],
    "33606": [
        "TAMPA",
        "FL"
    ],
    "33607": [
        "TAMPA",
        "FL"
    ],
    "33608": [
        "TAMPA",
        "FL"
    ],
    "33609": [
        "TAMPA",
        "FL"
    ],
    "33610": [
        "TAMPA",
        "FL"
    ],
    "33611": [
        "TAMPA",
        "FL"
    ],
    "33612": [
        "TAMPA",
        "FL"
    ],
    "33613": [
        "TAMPA",
        "FL"
    ],
    "33614": [
        "TAMPA",
        "FL"
    ],
    "33615": [
        "TAMPA",
        "FL"
    ],
    "33616": [
        "TAMPA",
        "FL"
    ],
    "33617": [
        "TAMPA",
        "FL"
    ],
    "33618": [
        "TAMPA",
        "FL"
    ],
    "33619": [
        "TAMPA",
        "FL"
    ],
    "33620": [
        "TAMPA",
        "FL"
    ],
    "33621": [
        "TAMPA",
        "FL"
    ],
    "33622": [
        "TAMPA",
        "FL"
    ],
    "33623": [
        "TAMPA",
        "FL"
    ],
    "33624": [
        "TAMPA",
        "FL"
    ],
    "33625": [
        "TAMPA",
        "FL"
    ],
    "33626": [
        "TAMPA",
        "FL"
    ],
    "33629": [
        "TAMPA",
        "FL"
    ],
    "33630": [
        "TAMPA",
        "FL"
    ],
    "33631": [
        "TAMPA",
        "FL"
    ],
    "33633": [
        "TAMPA",
        "FL"
    ],
    "33634": [
        "TAMPA",
        "FL"
    ],
    "33635": [
        "TAMPA",
        "FL"
    ],
    "33637": [
        "TAMPA",
        "FL"
    ],
    "33646": [
        "TAMPA",
        "FL"
    ],
    "33647": [
        "TAMPA",
        "FL"
    ],
    "33661": [
        "TAMPA",
        "FL"
    ],
    "33672": [
        "TAMPA",
        "FL"
    ],
    "33673": [
        "TAMPA",
        "FL"
    ],
    "33674": [
        "TAMPA",
        "FL"
    ],
    "33675": [
        "TAMPA",
        "FL"
    ],
    "33677": [
        "TAMPA",
        "FL"
    ],
    "33679": [
        "TAMPA",
        "FL"
    ],
    "33680": [
        "TAMPA",
        "FL"
    ],
    "33681": [
        "TAMPA",
        "FL"
    ],
    "33682": [
        "TAMPA",
        "FL"
    ],
    "33684": [
        "TAMPA",
        "FL"
    ],
    "33685": [
        "TAMPA",
        "FL"
    ],
    "33686": [
        "TAMPA",
        "FL"
    ],
    "33687": [
        "TAMPA",
        "FL"
    ],
    "33688": [
        "TAMPA",
        "FL"
    ],
    "33689": [
        "TAMPA",
        "FL"
    ],
    "33694": [
        "TAMPA",
        "FL"
    ],
    "33701": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33702": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33703": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33704": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33705": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33706": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33707": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33708": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33709": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33710": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33711": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33712": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33713": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33714": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33715": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33716": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33729": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33731": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33732": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33733": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33734": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33736": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33737": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33738": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33741": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33742": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33743": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33744": [
        "BAY PINES",
        "FL"
    ],
    "33747": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33755": [
        "CLEARWATER",
        "FL"
    ],
    "33756": [
        "CLEARWATER",
        "FL"
    ],
    "33757": [
        "CLEARWATER",
        "FL"
    ],
    "33758": [
        "CLEARWATER",
        "FL"
    ],
    "33759": [
        "CLEARWATER",
        "FL"
    ],
    "33760": [
        "CLEARWATER",
        "FL"
    ],
    "33761": [
        "CLEARWATER",
        "FL"
    ],
    "33762": [
        "CLEARWATER",
        "FL"
    ],
    "33763": [
        "CLEARWATER",
        "FL"
    ],
    "33764": [
        "CLEARWATER",
        "FL"
    ],
    "33765": [
        "CLEARWATER",
        "FL"
    ],
    "33766": [
        "CLEARWATER",
        "FL"
    ],
    "33767": [
        "CLEARWATER BEACH",
        "FL"
    ],
    "33769": [
        "CLEARWATER",
        "FL"
    ],
    "33770": [
        "LARGO",
        "FL"
    ],
    "33771": [
        "LARGO",
        "FL"
    ],
    "33772": [
        "SEMINOLE",
        "FL"
    ],
    "33773": [
        "LARGO",
        "FL"
    ],
    "33774": [
        "LARGO",
        "FL"
    ],
    "33775": [
        "SEMINOLE",
        "FL"
    ],
    "33776": [
        "SEMINOLE",
        "FL"
    ],
    "33777": [
        "SEMINOLE",
        "FL"
    ],
    "33778": [
        "LARGO",
        "FL"
    ],
    "33779": [
        "LARGO",
        "FL"
    ],
    "33780": [
        "PINELLAS PARK",
        "FL"
    ],
    "33781": [
        "PINELLAS PARK",
        "FL"
    ],
    "33782": [
        "PINELLAS PARK",
        "FL"
    ],
    "33784": [
        "SAINT PETERSBURG",
        "FL"
    ],
    "33785": [
        "INDIAN ROCKS BEACH",
        "FL"
    ],
    "33786": [
        "BELLEAIR BEACH",
        "FL"
    ],
    "33801": [
        "LAKELAND",
        "FL"
    ],
    "33802": [
        "LAKELAND",
        "FL"
    ],
    "33803": [
        "LAKELAND",
        "FL"
    ],
    "33804": [
        "LAKELAND",
        "FL"
    ],
    "33805": [
        "LAKELAND",
        "FL"
    ],
    "33806": [
        "LAKELAND",
        "FL"
    ],
    "33807": [
        "LAKELAND",
        "FL"
    ],
    "33809": [
        "LAKELAND",
        "FL"
    ],
    "33810": [
        "LAKELAND",
        "FL"
    ],
    "33811": [
        "LAKELAND",
        "FL"
    ],
    "33812": [
        "LAKELAND",
        "FL"
    ],
    "33813": [
        "LAKELAND",
        "FL"
    ],
    "33815": [
        "LAKELAND",
        "FL"
    ],
    "33820": [
        "ALTURAS",
        "FL"
    ],
    "33823": [
        "AUBURNDALE",
        "FL"
    ],
    "33825": [
        "AVON PARK",
        "FL"
    ],
    "33826": [
        "AVON PARK",
        "FL"
    ],
    "33827": [
        "BABSON PARK",
        "FL"
    ],
    "33830": [
        "BARTOW",
        "FL"
    ],
    "33831": [
        "BARTOW",
        "FL"
    ],
    "33834": [
        "BOWLING GREEN",
        "FL"
    ],
    "33835": [
        "BRADLEY",
        "FL"
    ],
    "33836": [
        "DAVENPORT",
        "FL"
    ],
    "33837": [
        "DAVENPORT",
        "FL"
    ],
    "33838": [
        "DUNDEE",
        "FL"
    ],
    "33839": [
        "EAGLE LAKE",
        "FL"
    ],
    "33840": [
        "EATON PARK",
        "FL"
    ],
    "33841": [
        "FORT MEADE",
        "FL"
    ],
    "33843": [
        "FROSTPROOF",
        "FL"
    ],
    "33844": [
        "HAINES CITY",
        "FL"
    ],
    "33845": [
        "HAINES CITY",
        "FL"
    ],
    "33846": [
        "HIGHLAND CITY",
        "FL"
    ],
    "33847": [
        "HOMELAND",
        "FL"
    ],
    "33848": [
        "INTERCESSION CITY",
        "FL"
    ],
    "33849": [
        "KATHLEEN",
        "FL"
    ],
    "33850": [
        "LAKE ALFRED",
        "FL"
    ],
    "33851": [
        "LAKE HAMILTON",
        "FL"
    ],
    "33852": [
        "LAKE PLACID",
        "FL"
    ],
    "33853": [
        "LAKE WALES",
        "FL"
    ],
    "33854": [
        "LAKESHORE",
        "FL"
    ],
    "33855": [
        "INDIAN LAKE ESTATES",
        "FL"
    ],
    "33856": [
        "NALCREST",
        "FL"
    ],
    "33857": [
        "LORIDA",
        "FL"
    ],
    "33858": [
        "LOUGHMAN",
        "FL"
    ],
    "33859": [
        "LAKE WALES",
        "FL"
    ],
    "33860": [
        "MULBERRY",
        "FL"
    ],
    "33862": [
        "LAKE PLACID",
        "FL"
    ],
    "33863": [
        "NICHOLS",
        "FL"
    ],
    "33865": [
        "ONA",
        "FL"
    ],
    "33867": [
        "RIVER RANCH",
        "FL"
    ],
    "33868": [
        "POLK CITY",
        "FL"
    ],
    "33870": [
        "SEBRING",
        "FL"
    ],
    "33871": [
        "SEBRING",
        "FL"
    ],
    "33872": [
        "SEBRING",
        "FL"
    ],
    "33873": [
        "WAUCHULA",
        "FL"
    ],
    "33875": [
        "SEBRING",
        "FL"
    ],
    "33876": [
        "SEBRING",
        "FL"
    ],
    "33877": [
        "WAVERLY",
        "FL"
    ],
    "33880": [
        "WINTER HAVEN",
        "FL"
    ],
    "33881": [
        "WINTER HAVEN",
        "FL"
    ],
    "33882": [
        "WINTER HAVEN",
        "FL"
    ],
    "33883": [
        "WINTER HAVEN",
        "FL"
    ],
    "33884": [
        "WINTER HAVEN",
        "FL"
    ],
    "33885": [
        "WINTER HAVEN",
        "FL"
    ],
    "33888": [
        "WINTER HAVEN",
        "FL"
    ],
    "33890": [
        "ZOLFO SPRINGS",
        "FL"
    ],
    "33896": [
        "DAVENPORT",
        "FL"
    ],
    "33897": [
        "DAVENPORT",
        "FL"
    ],
    "33898": [
        "LAKE WALES",
        "FL"
    ],
    "33901": [
        "FORT MYERS",
        "FL"
    ],
    "33902": [
        "FORT MYERS",
        "FL"
    ],
    "33903": [
        "NORTH FORT MYERS",
        "FL"
    ],
    "33904": [
        "CAPE CORAL",
        "FL"
    ],
    "33905": [
        "FORT MYERS",
        "FL"
    ],
    "33906": [
        "FORT MYERS",
        "FL"
    ],
    "33907": [
        "FORT MYERS",
        "FL"
    ],
    "33908": [
        "FORT MYERS",
        "FL"
    ],
    "33909": [
        "CAPE CORAL",
        "FL"
    ],
    "33910": [
        "CAPE CORAL",
        "FL"
    ],
    "33911": [
        "FORT MYERS",
        "FL"
    ],
    "33912": [
        "FORT MYERS",
        "FL"
    ],
    "33913": [
        "FORT MYERS",
        "FL"
    ],
    "33914": [
        "CAPE CORAL",
        "FL"
    ],
    "33915": [
        "CAPE CORAL",
        "FL"
    ],
    "33916": [
        "FORT MYERS",
        "FL"
    ],
    "33917": [
        "NORTH FORT MYERS",
        "FL"
    ],
    "33918": [
        "NORTH FORT MYERS",
        "FL"
    ],
    "33919": [
        "FORT MYERS",
        "FL"
    ],
    "33920": [
        "ALVA",
        "FL"
    ],
    "33921": [
        "BOCA GRANDE",
        "FL"
    ],
    "33922": [
        "BOKEELIA",
        "FL"
    ],
    "33924": [
        "CAPTIVA",
        "FL"
    ],
    "33928": [
        "ESTERO",
        "FL"
    ],
    "33929": [
        "ESTERO",
        "FL"
    ],
    "33930": [
        "FELDA",
        "FL"
    ],
    "33931": [
        "FORT MYERS BEACH",
        "FL"
    ],
    "33932": [
        "FORT MYERS BEACH",
        "FL"
    ],
    "33935": [
        "LABELLE",
        "FL"
    ],
    "33936": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33938": [
        "MURDOCK",
        "FL"
    ],
    "33944": [
        "PALMDALE",
        "FL"
    ],
    "33945": [
        "PINELAND",
        "FL"
    ],
    "33946": [
        "PLACIDA",
        "FL"
    ],
    "33947": [
        "ROTONDA WEST",
        "FL"
    ],
    "33948": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33949": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33950": [
        "PUNTA GORDA",
        "FL"
    ],
    "33951": [
        "PUNTA GORDA",
        "FL"
    ],
    "33952": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33953": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33954": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33955": [
        "PUNTA GORDA",
        "FL"
    ],
    "33956": [
        "SAINT JAMES CITY",
        "FL"
    ],
    "33957": [
        "SANIBEL",
        "FL"
    ],
    "33960": [
        "VENUS",
        "FL"
    ],
    "33965": [
        "FORT MYERS",
        "FL"
    ],
    "33966": [
        "FORT MYERS",
        "FL"
    ],
    "33967": [
        "FORT MYERS",
        "FL"
    ],
    "33970": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33971": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33972": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33973": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33974": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33975": [
        "LABELLE",
        "FL"
    ],
    "33976": [
        "LEHIGH ACRES",
        "FL"
    ],
    "33980": [
        "PUNTA GORDA",
        "FL"
    ],
    "33981": [
        "PORT CHARLOTTE",
        "FL"
    ],
    "33982": [
        "PUNTA GORDA",
        "FL"
    ],
    "33983": [
        "PUNTA GORDA",
        "FL"
    ],
    "33990": [
        "CAPE CORAL",
        "FL"
    ],
    "33991": [
        "CAPE CORAL",
        "FL"
    ],
    "33993": [
        "CAPE CORAL",
        "FL"
    ],
    "33994": [
        "FORT MYERS",
        "FL"
    ],
    "34101": [
        "NAPLES",
        "FL"
    ],
    "34102": [
        "NAPLES",
        "FL"
    ],
    "34103": [
        "NAPLES",
        "FL"
    ],
    "34104": [
        "NAPLES",
        "FL"
    ],
    "34105": [
        "NAPLES",
        "FL"
    ],
    "34106": [
        "NAPLES",
        "FL"
    ],
    "34107": [
        "NAPLES",
        "FL"
    ],
    "34108": [
        "NAPLES",
        "FL"
    ],
    "34109": [
        "NAPLES",
        "FL"
    ],
    "34110": [
        "NAPLES",
        "FL"
    ],
    "34112": [
        "NAPLES",
        "FL"
    ],
    "34113": [
        "NAPLES",
        "FL"
    ],
    "34114": [
        "NAPLES",
        "FL"
    ],
    "34116": [
        "NAPLES",
        "FL"
    ],
    "34117": [
        "NAPLES",
        "FL"
    ],
    "34119": [
        "NAPLES",
        "FL"
    ],
    "34120": [
        "NAPLES",
        "FL"
    ],
    "34133": [
        "BONITA SPRINGS",
        "FL"
    ],
    "34134": [
        "BONITA SPRINGS",
        "FL"
    ],
    "34135": [
        "BONITA SPRINGS",
        "FL"
    ],
    "34136": [
        "BONITA SPRINGS",
        "FL"
    ],
    "34137": [
        "COPELAND",
        "FL"
    ],
    "34138": [
        "CHOKOLOSKEE",
        "FL"
    ],
    "34139": [
        "EVERGLADES CITY",
        "FL"
    ],
    "34140": [
        "GOODLAND",
        "FL"
    ],
    "34141": [
        "OCHOPEE",
        "FL"
    ],
    "34142": [
        "IMMOKALEE",
        "FL"
    ],
    "34143": [
        "IMMOKALEE",
        "FL"
    ],
    "34145": [
        "MARCO ISLAND",
        "FL"
    ],
    "34146": [
        "MARCO ISLAND",
        "FL"
    ],
    "34201": [
        "BRADENTON",
        "FL"
    ],
    "34202": [
        "BRADENTON",
        "FL"
    ],
    "34203": [
        "BRADENTON",
        "FL"
    ],
    "34204": [
        "BRADENTON",
        "FL"
    ],
    "34205": [
        "BRADENTON",
        "FL"
    ],
    "34206": [
        "BRADENTON",
        "FL"
    ],
    "34207": [
        "BRADENTON",
        "FL"
    ],
    "34208": [
        "BRADENTON",
        "FL"
    ],
    "34209": [
        "BRADENTON",
        "FL"
    ],
    "34210": [
        "BRADENTON",
        "FL"
    ],
    "34211": [
        "BRADENTON",
        "FL"
    ],
    "34212": [
        "BRADENTON",
        "FL"
    ],
    "34215": [
        "CORTEZ",
        "FL"
    ],
    "34216": [
        "ANNA MARIA",
        "FL"
    ],
    "34217": [
        "BRADENTON BEACH",
        "FL"
    ],
    "34218": [
        "HOLMES BEACH",
        "FL"
    ],
    "34219": [
        "PARRISH",
        "FL"
    ],
    "34220": [
        "PALMETTO",
        "FL"
    ],
    "34221": [
        "PALMETTO",
        "FL"
    ],
    "34222": [
        "ELLENTON",
        "FL"
    ],
    "34223": [
        "ENGLEWOOD",
        "FL"
    ],
    "34224": [
        "ENGLEWOOD",
        "FL"
    ],
    "34228": [
        "LONGBOAT KEY",
        "FL"
    ],
    "34229": [
        "OSPREY",
        "FL"
    ],
    "34230": [
        "SARASOTA",
        "FL"
    ],
    "34231": [
        "SARASOTA",
        "FL"
    ],
    "34232": [
        "SARASOTA",
        "FL"
    ],
    "34233": [
        "SARASOTA",
        "FL"
    ],
    "34234": [
        "SARASOTA",
        "FL"
    ],
    "34235": [
        "SARASOTA",
        "FL"
    ],
    "34236": [
        "SARASOTA",
        "FL"
    ],
    "34237": [
        "SARASOTA",
        "FL"
    ],
    "34238": [
        "SARASOTA",
        "FL"
    ],
    "34239": [
        "SARASOTA",
        "FL"
    ],
    "34240": [
        "SARASOTA",
        "FL"
    ],
    "34241": [
        "SARASOTA",
        "FL"
    ],
    "34242": [
        "SARASOTA",
        "FL"
    ],
    "34243": [
        "SARASOTA",
        "FL"
    ],
    "34250": [
        "TERRA CEIA",
        "FL"
    ],
    "34251": [
        "MYAKKA CITY",
        "FL"
    ],
    "34264": [
        "ONECO",
        "FL"
    ],
    "34265": [
        "ARCADIA",
        "FL"
    ],
    "34266": [
        "ARCADIA",
        "FL"
    ],
    "34267": [
        "FORT OGDEN",
        "FL"
    ],
    "34268": [
        "NOCATEE",
        "FL"
    ],
    "34269": [
        "ARCADIA",
        "FL"
    ],
    "34270": [
        "TALLEVAST",
        "FL"
    ],
    "34272": [
        "LAUREL",
        "FL"
    ],
    "34274": [
        "NOKOMIS",
        "FL"
    ],
    "34275": [
        "NOKOMIS",
        "FL"
    ],
    "34276": [
        "SARASOTA",
        "FL"
    ],
    "34277": [
        "SARASOTA",
        "FL"
    ],
    "34278": [
        "SARASOTA",
        "FL"
    ],
    "34280": [
        "BRADENTON",
        "FL"
    ],
    "34282": [
        "BRADENTON",
        "FL"
    ],
    "34284": [
        "VENICE",
        "FL"
    ],
    "34285": [
        "VENICE",
        "FL"
    ],
    "34286": [
        "NORTH PORT",
        "FL"
    ],
    "34287": [
        "NORTH PORT",
        "FL"
    ],
    "34288": [
        "NORTH PORT",
        "FL"
    ],
    "34289": [
        "NORTH PORT",
        "FL"
    ],
    "34290": [
        "NORTH PORT",
        "FL"
    ],
    "34291": [
        "NORTH PORT",
        "FL"
    ],
    "34292": [
        "VENICE",
        "FL"
    ],
    "34293": [
        "VENICE",
        "FL"
    ],
    "34295": [
        "ENGLEWOOD",
        "FL"
    ],
    "34420": [
        "BELLEVIEW",
        "FL"
    ],
    "34421": [
        "BELLEVIEW",
        "FL"
    ],
    "34423": [
        "CRYSTAL RIVER",
        "FL"
    ],
    "34428": [
        "CRYSTAL RIVER",
        "FL"
    ],
    "34429": [
        "CRYSTAL RIVER",
        "FL"
    ],
    "34430": [
        "DUNNELLON",
        "FL"
    ],
    "34431": [
        "DUNNELLON",
        "FL"
    ],
    "34432": [
        "DUNNELLON",
        "FL"
    ],
    "34433": [
        "DUNNELLON",
        "FL"
    ],
    "34434": [
        "DUNNELLON",
        "FL"
    ],
    "34436": [
        "FLORAL CITY",
        "FL"
    ],
    "34441": [
        "HERNANDO",
        "FL"
    ],
    "34442": [
        "HERNANDO",
        "FL"
    ],
    "34445": [
        "HOLDER",
        "FL"
    ],
    "34446": [
        "HOMOSASSA",
        "FL"
    ],
    "34447": [
        "HOMOSASSA SPRINGS",
        "FL"
    ],
    "34448": [
        "HOMOSASSA",
        "FL"
    ],
    "34449": [
        "INGLIS",
        "FL"
    ],
    "34450": [
        "INVERNESS",
        "FL"
    ],
    "34451": [
        "INVERNESS",
        "FL"
    ],
    "34452": [
        "INVERNESS",
        "FL"
    ],
    "34453": [
        "INVERNESS",
        "FL"
    ],
    "34460": [
        "LECANTO",
        "FL"
    ],
    "34461": [
        "LECANTO",
        "FL"
    ],
    "34464": [
        "BEVERLY HILLS",
        "FL"
    ],
    "34465": [
        "BEVERLY HILLS",
        "FL"
    ],
    "34470": [
        "OCALA",
        "FL"
    ],
    "34471": [
        "OCALA",
        "FL"
    ],
    "34472": [
        "OCALA",
        "FL"
    ],
    "34473": [
        "OCALA",
        "FL"
    ],
    "34474": [
        "OCALA",
        "FL"
    ],
    "34475": [
        "OCALA",
        "FL"
    ],
    "34476": [
        "OCALA",
        "FL"
    ],
    "34477": [
        "OCALA",
        "FL"
    ],
    "34478": [
        "OCALA",
        "FL"
    ],
    "34479": [
        "OCALA",
        "FL"
    ],
    "34480": [
        "OCALA",
        "FL"
    ],
    "34481": [
        "OCALA",
        "FL"
    ],
    "34482": [
        "OCALA",
        "FL"
    ],
    "34483": [
        "OCALA",
        "FL"
    ],
    "34484": [
        "OXFORD",
        "FL"
    ],
    "34487": [
        "HOMOSASSA",
        "FL"
    ],
    "34488": [
        "SILVER SPRINGS",
        "FL"
    ],
    "34489": [
        "SILVER SPRINGS",
        "FL"
    ],
    "34491": [
        "SUMMERFIELD",
        "FL"
    ],
    "34492": [
        "SUMMERFIELD",
        "FL"
    ],
    "34498": [
        "YANKEETOWN",
        "FL"
    ],
    "34601": [
        "BROOKSVILLE",
        "FL"
    ],
    "34602": [
        "BROOKSVILLE",
        "FL"
    ],
    "34603": [
        "BROOKSVILLE",
        "FL"
    ],
    "34604": [
        "BROOKSVILLE",
        "FL"
    ],
    "34605": [
        "BROOKSVILLE",
        "FL"
    ],
    "34606": [
        "SPRING HILL",
        "FL"
    ],
    "34607": [
        "SPRING HILL",
        "FL"
    ],
    "34608": [
        "SPRING HILL",
        "FL"
    ],
    "34609": [
        "SPRING HILL",
        "FL"
    ],
    "34610": [
        "SPRING HILL",
        "FL"
    ],
    "34611": [
        "SPRING HILL",
        "FL"
    ],
    "34613": [
        "BROOKSVILLE",
        "FL"
    ],
    "34614": [
        "BROOKSVILLE",
        "FL"
    ],
    "34636": [
        "ISTACHATTA",
        "FL"
    ],
    "34637": [
        "LAND O LAKES",
        "FL"
    ],
    "34638": [
        "LAND O LAKES",
        "FL"
    ],
    "34639": [
        "LAND O LAKES",
        "FL"
    ],
    "34652": [
        "NEW PORT RICHEY",
        "FL"
    ],
    "34653": [
        "NEW PORT RICHEY",
        "FL"
    ],
    "34654": [
        "NEW PORT RICHEY",
        "FL"
    ],
    "34655": [
        "NEW PORT RICHEY",
        "FL"
    ],
    "34656": [
        "NEW PORT RICHEY",
        "FL"
    ],
    "34660": [
        "OZONA",
        "FL"
    ],
    "34661": [
        "NOBLETON",
        "FL"
    ],
    "34667": [
        "HUDSON",
        "FL"
    ],
    "34668": [
        "PORT RICHEY",
        "FL"
    ],
    "34669": [
        "HUDSON",
        "FL"
    ],
    "34673": [
        "PORT RICHEY",
        "FL"
    ],
    "34674": [
        "HUDSON",
        "FL"
    ],
    "34677": [
        "OLDSMAR",
        "FL"
    ],
    "34679": [
        "ARIPEKA",
        "FL"
    ],
    "34680": [
        "ELFERS",
        "FL"
    ],
    "34681": [
        "CRYSTAL BEACH",
        "FL"
    ],
    "34682": [
        "PALM HARBOR",
        "FL"
    ],
    "34683": [
        "PALM HARBOR",
        "FL"
    ],
    "34684": [
        "PALM HARBOR",
        "FL"
    ],
    "34685": [
        "PALM HARBOR",
        "FL"
    ],
    "34688": [
        "TARPON SPRINGS",
        "FL"
    ],
    "34689": [
        "TARPON SPRINGS",
        "FL"
    ],
    "34690": [
        "HOLIDAY",
        "FL"
    ],
    "34691": [
        "HOLIDAY",
        "FL"
    ],
    "34695": [
        "SAFETY HARBOR",
        "FL"
    ],
    "34697": [
        "DUNEDIN",
        "FL"
    ],
    "34698": [
        "DUNEDIN",
        "FL"
    ],
    "34705": [
        "ASTATULA",
        "FL"
    ],
    "34711": [
        "CLERMONT",
        "FL"
    ],
    "34712": [
        "CLERMONT",
        "FL"
    ],
    "34713": [
        "CLERMONT",
        "FL"
    ],
    "34714": [
        "CLERMONT",
        "FL"
    ],
    "34715": [
        "CLERMONT",
        "FL"
    ],
    "34729": [
        "FERNDALE",
        "FL"
    ],
    "34731": [
        "FRUITLAND PARK",
        "FL"
    ],
    "34734": [
        "GOTHA",
        "FL"
    ],
    "34736": [
        "GROVELAND",
        "FL"
    ],
    "34737": [
        "HOWEY IN THE HILLS",
        "FL"
    ],
    "34739": [
        "KENANSVILLE",
        "FL"
    ],
    "34740": [
        "KILLARNEY",
        "FL"
    ],
    "34741": [
        "KISSIMMEE",
        "FL"
    ],
    "34742": [
        "KISSIMMEE",
        "FL"
    ],
    "34743": [
        "KISSIMMEE",
        "FL"
    ],
    "34744": [
        "KISSIMMEE",
        "FL"
    ],
    "34745": [
        "KISSIMMEE",
        "FL"
    ],
    "34746": [
        "KISSIMMEE",
        "FL"
    ],
    "34747": [
        "KISSIMMEE",
        "FL"
    ],
    "34748": [
        "LEESBURG",
        "FL"
    ],
    "34749": [
        "LEESBURG",
        "FL"
    ],
    "34753": [
        "MASCOTTE",
        "FL"
    ],
    "34755": [
        "MINNEOLA",
        "FL"
    ],
    "34756": [
        "MONTVERDE",
        "FL"
    ],
    "34758": [
        "KISSIMMEE",
        "FL"
    ],
    "34759": [
        "KISSIMMEE",
        "FL"
    ],
    "34760": [
        "OAKLAND",
        "FL"
    ],
    "34761": [
        "OCOEE",
        "FL"
    ],
    "34762": [
        "OKAHUMPKA",
        "FL"
    ],
    "34769": [
        "SAINT CLOUD",
        "FL"
    ],
    "34770": [
        "SAINT CLOUD",
        "FL"
    ],
    "34771": [
        "SAINT CLOUD",
        "FL"
    ],
    "34772": [
        "SAINT CLOUD",
        "FL"
    ],
    "34773": [
        "SAINT CLOUD",
        "FL"
    ],
    "34777": [
        "WINTER GARDEN",
        "FL"
    ],
    "34778": [
        "WINTER GARDEN",
        "FL"
    ],
    "34785": [
        "WILDWOOD",
        "FL"
    ],
    "34786": [
        "WINDERMERE",
        "FL"
    ],
    "34787": [
        "WINTER GARDEN",
        "FL"
    ],
    "34788": [
        "LEESBURG",
        "FL"
    ],
    "34789": [
        "LEESBURG",
        "FL"
    ],
    "34797": [
        "YALAHA",
        "FL"
    ],
    "34945": [
        "FORT PIERCE",
        "FL"
    ],
    "34946": [
        "FORT PIERCE",
        "FL"
    ],
    "34947": [
        "FORT PIERCE",
        "FL"
    ],
    "34948": [
        "FORT PIERCE",
        "FL"
    ],
    "34949": [
        "FORT PIERCE",
        "FL"
    ],
    "34950": [
        "FORT PIERCE",
        "FL"
    ],
    "34951": [
        "FORT PIERCE",
        "FL"
    ],
    "34952": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34953": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34954": [
        "FORT PIERCE",
        "FL"
    ],
    "34956": [
        "INDIANTOWN",
        "FL"
    ],
    "34957": [
        "JENSEN BEACH",
        "FL"
    ],
    "34958": [
        "JENSEN BEACH",
        "FL"
    ],
    "34972": [
        "OKEECHOBEE",
        "FL"
    ],
    "34973": [
        "OKEECHOBEE",
        "FL"
    ],
    "34974": [
        "OKEECHOBEE",
        "FL"
    ],
    "34979": [
        "FORT PIERCE",
        "FL"
    ],
    "34981": [
        "FORT PIERCE",
        "FL"
    ],
    "34982": [
        "FORT PIERCE",
        "FL"
    ],
    "34983": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34984": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34985": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34986": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34987": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34988": [
        "PORT SAINT LUCIE",
        "FL"
    ],
    "34990": [
        "PALM CITY",
        "FL"
    ],
    "34991": [
        "PALM CITY",
        "FL"
    ],
    "34992": [
        "PORT SALERNO",
        "FL"
    ],
    "34994": [
        "STUART",
        "FL"
    ],
    "34995": [
        "STUART",
        "FL"
    ],
    "34996": [
        "STUART",
        "FL"
    ],
    "34997": [
        "STUART",
        "FL"
    ],
    "35004": [
        "MOODY",
        "AL"
    ],
    "35005": [
        "ADAMSVILLE",
        "AL"
    ],
    "35006": [
        "ADGER",
        "AL"
    ],
    "35007": [
        "ALABASTER",
        "AL"
    ],
    "35010": [
        "ALEXANDER CITY",
        "AL"
    ],
    "35011": [
        "ALEXANDER CITY",
        "AL"
    ],
    "35013": [
        "ALLGOOD",
        "AL"
    ],
    "35014": [
        "ALPINE",
        "AL"
    ],
    "35015": [
        "ALTON",
        "AL"
    ],
    "35016": [
        "ARAB",
        "AL"
    ],
    "35019": [
        "BAILEYTON",
        "AL"
    ],
    "35020": [
        "BESSEMER",
        "AL"
    ],
    "35021": [
        "BESSEMER",
        "AL"
    ],
    "35022": [
        "BESSEMER",
        "AL"
    ],
    "35023": [
        "BESSEMER",
        "AL"
    ],
    "35031": [
        "BLOUNTSVILLE",
        "AL"
    ],
    "35032": [
        "BON AIR",
        "AL"
    ],
    "35033": [
        "BREMEN",
        "AL"
    ],
    "35034": [
        "BRENT",
        "AL"
    ],
    "35035": [
        "BRIERFIELD",
        "AL"
    ],
    "35036": [
        "BROOKSIDE",
        "AL"
    ],
    "35040": [
        "CALERA",
        "AL"
    ],
    "35042": [
        "CENTREVILLE",
        "AL"
    ],
    "35043": [
        "CHELSEA",
        "AL"
    ],
    "35044": [
        "CHILDERSBURG",
        "AL"
    ],
    "35045": [
        "CLANTON",
        "AL"
    ],
    "35046": [
        "CLANTON",
        "AL"
    ],
    "35048": [
        "CLAY",
        "AL"
    ],
    "35049": [
        "CLEVELAND",
        "AL"
    ],
    "35051": [
        "COLUMBIANA",
        "AL"
    ],
    "35052": [
        "COOK SPRINGS",
        "AL"
    ],
    "35053": [
        "CRANE HILL",
        "AL"
    ],
    "35054": [
        "CROPWELL",
        "AL"
    ],
    "35055": [
        "CULLMAN",
        "AL"
    ],
    "35056": [
        "CULLMAN",
        "AL"
    ],
    "35057": [
        "CULLMAN",
        "AL"
    ],
    "35058": [
        "CULLMAN",
        "AL"
    ],
    "35060": [
        "DOCENA",
        "AL"
    ],
    "35061": [
        "DOLOMITE",
        "AL"
    ],
    "35062": [
        "DORA",
        "AL"
    ],
    "35063": [
        "EMPIRE",
        "AL"
    ],
    "35064": [
        "FAIRFIELD",
        "AL"
    ],
    "35068": [
        "FULTONDALE",
        "AL"
    ],
    "35070": [
        "GARDEN CITY",
        "AL"
    ],
    "35071": [
        "GARDENDALE",
        "AL"
    ],
    "35072": [
        "GOODWATER",
        "AL"
    ],
    "35073": [
        "GRAYSVILLE",
        "AL"
    ],
    "35074": [
        "GREEN POND",
        "AL"
    ],
    "35077": [
        "HANCEVILLE",
        "AL"
    ],
    "35078": [
        "HARPERSVILLE",
        "AL"
    ],
    "35079": [
        "HAYDEN",
        "AL"
    ],
    "35080": [
        "HELENA",
        "AL"
    ],
    "35082": [
        "HOLLINS",
        "AL"
    ],
    "35083": [
        "HOLLY POND",
        "AL"
    ],
    "35085": [
        "JEMISON",
        "AL"
    ],
    "35087": [
        "JOPPA",
        "AL"
    ],
    "35089": [
        "KELLYTON",
        "AL"
    ],
    "35091": [
        "KIMBERLY",
        "AL"
    ],
    "35094": [
        "LEEDS",
        "AL"
    ],
    "35096": [
        "LINCOLN",
        "AL"
    ],
    "35097": [
        "LOCUST FORK",
        "AL"
    ],
    "35098": [
        "LOGAN",
        "AL"
    ],
    "35111": [
        "MC CALLA",
        "AL"
    ],
    "35112": [
        "MARGARET",
        "AL"
    ],
    "35114": [
        "MAYLENE",
        "AL"
    ],
    "35115": [
        "MONTEVALLO",
        "AL"
    ],
    "35116": [
        "MORRIS",
        "AL"
    ],
    "35117": [
        "MOUNT OLIVE",
        "AL"
    ],
    "35118": [
        "MULGA",
        "AL"
    ],
    "35119": [
        "NEW CASTLE",
        "AL"
    ],
    "35120": [
        "ODENVILLE",
        "AL"
    ],
    "35121": [
        "ONEONTA",
        "AL"
    ],
    "35123": [
        "PALMERDALE",
        "AL"
    ],
    "35124": [
        "PELHAM",
        "AL"
    ],
    "35125": [
        "PELL CITY",
        "AL"
    ],
    "35126": [
        "PINSON",
        "AL"
    ],
    "35127": [
        "PLEASANT GROVE",
        "AL"
    ],
    "35128": [
        "PELL CITY",
        "AL"
    ],
    "35130": [
        "QUINTON",
        "AL"
    ],
    "35131": [
        "RAGLAND",
        "AL"
    ],
    "35133": [
        "REMLAP",
        "AL"
    ],
    "35135": [
        "RIVERSIDE",
        "AL"
    ],
    "35136": [
        "ROCKFORD",
        "AL"
    ],
    "35137": [
        "SAGINAW",
        "AL"
    ],
    "35142": [
        "SHANNON",
        "AL"
    ],
    "35143": [
        "SHELBY",
        "AL"
    ],
    "35146": [
        "SPRINGVILLE",
        "AL"
    ],
    "35147": [
        "STERRETT",
        "AL"
    ],
    "35148": [
        "SUMITON",
        "AL"
    ],
    "35149": [
        "SYCAMORE",
        "AL"
    ],
    "35150": [
        "SYLACAUGA",
        "AL"
    ],
    "35151": [
        "SYLACAUGA",
        "AL"
    ],
    "35160": [
        "TALLADEGA",
        "AL"
    ],
    "35161": [
        "TALLADEGA",
        "AL"
    ],
    "35171": [
        "THORSBY",
        "AL"
    ],
    "35172": [
        "TRAFFORD",
        "AL"
    ],
    "35173": [
        "TRUSSVILLE",
        "AL"
    ],
    "35175": [
        "UNION GROVE",
        "AL"
    ],
    "35176": [
        "VANDIVER",
        "AL"
    ],
    "35178": [
        "VINCENT",
        "AL"
    ],
    "35179": [
        "VINEMONT",
        "AL"
    ],
    "35180": [
        "WARRIOR",
        "AL"
    ],
    "35182": [
        "WATTSVILLE",
        "AL"
    ],
    "35183": [
        "WEOGUFKA",
        "AL"
    ],
    "35184": [
        "WEST BLOCTON",
        "AL"
    ],
    "35185": [
        "WESTOVER",
        "AL"
    ],
    "35186": [
        "WILSONVILLE",
        "AL"
    ],
    "35187": [
        "WILTON",
        "AL"
    ],
    "35188": [
        "WOODSTOCK",
        "AL"
    ],
    "35201": [
        "BIRMINGHAM",
        "AL"
    ],
    "35202": [
        "BIRMINGHAM",
        "AL"
    ],
    "35203": [
        "BIRMINGHAM",
        "AL"
    ],
    "35204": [
        "BIRMINGHAM",
        "AL"
    ],
    "35205": [
        "BIRMINGHAM",
        "AL"
    ],
    "35206": [
        "BIRMINGHAM",
        "AL"
    ],
    "35207": [
        "BIRMINGHAM",
        "AL"
    ],
    "35208": [
        "BIRMINGHAM",
        "AL"
    ],
    "35209": [
        "BIRMINGHAM",
        "AL"
    ],
    "35210": [
        "BIRMINGHAM",
        "AL"
    ],
    "35211": [
        "BIRMINGHAM",
        "AL"
    ],
    "35212": [
        "BIRMINGHAM",
        "AL"
    ],
    "35213": [
        "BIRMINGHAM",
        "AL"
    ],
    "35214": [
        "BIRMINGHAM",
        "AL"
    ],
    "35215": [
        "BIRMINGHAM",
        "AL"
    ],
    "35216": [
        "BIRMINGHAM",
        "AL"
    ],
    "35217": [
        "BIRMINGHAM",
        "AL"
    ],
    "35218": [
        "BIRMINGHAM",
        "AL"
    ],
    "35219": [
        "BIRMINGHAM",
        "AL"
    ],
    "35220": [
        "BIRMINGHAM",
        "AL"
    ],
    "35221": [
        "BIRMINGHAM",
        "AL"
    ],
    "35222": [
        "BIRMINGHAM",
        "AL"
    ],
    "35223": [
        "BIRMINGHAM",
        "AL"
    ],
    "35224": [
        "BIRMINGHAM",
        "AL"
    ],
    "35226": [
        "BIRMINGHAM",
        "AL"
    ],
    "35228": [
        "BIRMINGHAM",
        "AL"
    ],
    "35229": [
        "BIRMINGHAM",
        "AL"
    ],
    "35231": [
        "BIRMINGHAM",
        "AL"
    ],
    "35232": [
        "BIRMINGHAM",
        "AL"
    ],
    "35233": [
        "BIRMINGHAM",
        "AL"
    ],
    "35234": [
        "BIRMINGHAM",
        "AL"
    ],
    "35235": [
        "BIRMINGHAM",
        "AL"
    ],
    "35236": [
        "BIRMINGHAM",
        "AL"
    ],
    "35237": [
        "BIRMINGHAM",
        "AL"
    ],
    "35238": [
        "BIRMINGHAM",
        "AL"
    ],
    "35242": [
        "BIRMINGHAM",
        "AL"
    ],
    "35243": [
        "BIRMINGHAM",
        "AL"
    ],
    "35244": [
        "BIRMINGHAM",
        "AL"
    ],
    "35246": [
        "BIRMINGHAM",
        "AL"
    ],
    "35249": [
        "BIRMINGHAM",
        "AL"
    ],
    "35253": [
        "BIRMINGHAM",
        "AL"
    ],
    "35254": [
        "BIRMINGHAM",
        "AL"
    ],
    "35255": [
        "BIRMINGHAM",
        "AL"
    ],
    "35259": [
        "BIRMINGHAM",
        "AL"
    ],
    "35260": [
        "BIRMINGHAM",
        "AL"
    ],
    "35261": [
        "BIRMINGHAM",
        "AL"
    ],
    "35266": [
        "BIRMINGHAM",
        "AL"
    ],
    "35285": [
        "BIRMINGHAM",
        "AL"
    ],
    "35288": [
        "BIRMINGHAM",
        "AL"
    ],
    "35290": [
        "BIRMINGHAM",
        "AL"
    ],
    "35291": [
        "BIRMINGHAM",
        "AL"
    ],
    "35294": [
        "BIRMINGHAM",
        "AL"
    ],
    "35295": [
        "BIRMINGHAM",
        "AL"
    ],
    "35298": [
        "BIRMINGHAM",
        "AL"
    ],
    "35401": [
        "TUSCALOOSA",
        "AL"
    ],
    "35402": [
        "TUSCALOOSA",
        "AL"
    ],
    "35403": [
        "TUSCALOOSA",
        "AL"
    ],
    "35404": [
        "TUSCALOOSA",
        "AL"
    ],
    "35405": [
        "TUSCALOOSA",
        "AL"
    ],
    "35406": [
        "TUSCALOOSA",
        "AL"
    ],
    "35407": [
        "TUSCALOOSA",
        "AL"
    ],
    "35441": [
        "AKRON",
        "AL"
    ],
    "35442": [
        "ALICEVILLE",
        "AL"
    ],
    "35443": [
        "BOLIGEE",
        "AL"
    ],
    "35444": [
        "BROOKWOOD",
        "AL"
    ],
    "35446": [
        "BUHL",
        "AL"
    ],
    "35447": [
        "CARROLLTON",
        "AL"
    ],
    "35448": [
        "CLINTON",
        "AL"
    ],
    "35449": [
        "COALING",
        "AL"
    ],
    "35452": [
        "COKER",
        "AL"
    ],
    "35453": [
        "COTTONDALE",
        "AL"
    ],
    "35456": [
        "DUNCANVILLE",
        "AL"
    ],
    "35457": [
        "ECHOLA",
        "AL"
    ],
    "35459": [
        "EMELLE",
        "AL"
    ],
    "35460": [
        "EPES",
        "AL"
    ],
    "35461": [
        "ETHELSVILLE",
        "AL"
    ],
    "35462": [
        "EUTAW",
        "AL"
    ],
    "35463": [
        "FOSTERS",
        "AL"
    ],
    "35464": [
        "GAINESVILLE",
        "AL"
    ],
    "35466": [
        "GORDO",
        "AL"
    ],
    "35469": [
        "KNOXVILLE",
        "AL"
    ],
    "35470": [
        "LIVINGSTON",
        "AL"
    ],
    "35471": [
        "MC SHAN",
        "AL"
    ],
    "35473": [
        "NORTHPORT",
        "AL"
    ],
    "35474": [
        "MOUNDVILLE",
        "AL"
    ],
    "35475": [
        "NORTHPORT",
        "AL"
    ],
    "35476": [
        "NORTHPORT",
        "AL"
    ],
    "35477": [
        "PANOLA",
        "AL"
    ],
    "35478": [
        "PETERSON",
        "AL"
    ],
    "35480": [
        "RALPH",
        "AL"
    ],
    "35481": [
        "REFORM",
        "AL"
    ],
    "35486": [
        "TUSCALOOSA",
        "AL"
    ],
    "35487": [
        "TUSCALOOSA",
        "AL"
    ],
    "35490": [
        "VANCE",
        "AL"
    ],
    "35501": [
        "JASPER",
        "AL"
    ],
    "35502": [
        "JASPER",
        "AL"
    ],
    "35503": [
        "JASPER",
        "AL"
    ],
    "35504": [
        "JASPER",
        "AL"
    ],
    "35540": [
        "ADDISON",
        "AL"
    ],
    "35541": [
        "ARLEY",
        "AL"
    ],
    "35542": [
        "BANKSTON",
        "AL"
    ],
    "35543": [
        "BEAR CREEK",
        "AL"
    ],
    "35544": [
        "BEAVERTON",
        "AL"
    ],
    "35545": [
        "BELK",
        "AL"
    ],
    "35546": [
        "BERRY",
        "AL"
    ],
    "35548": [
        "BRILLIANT",
        "AL"
    ],
    "35549": [
        "CARBON HILL",
        "AL"
    ],
    "35550": [
        "CORDOVA",
        "AL"
    ],
    "35551": [
        "DELMAR",
        "AL"
    ],
    "35552": [
        "DETROIT",
        "AL"
    ],
    "35553": [
        "DOUBLE SPRINGS",
        "AL"
    ],
    "35554": [
        "ELDRIDGE",
        "AL"
    ],
    "35555": [
        "FAYETTE",
        "AL"
    ],
    "35559": [
        "GLEN ALLEN",
        "AL"
    ],
    "35560": [
        "GOODSPRINGS",
        "AL"
    ],
    "35563": [
        "GUIN",
        "AL"
    ],
    "35564": [
        "HACKLEBURG",
        "AL"
    ],
    "35565": [
        "HALEYVILLE",
        "AL"
    ],
    "35570": [
        "HAMILTON",
        "AL"
    ],
    "35571": [
        "HODGES",
        "AL"
    ],
    "35572": [
        "HOUSTON",
        "AL"
    ],
    "35573": [
        "KANSAS",
        "AL"
    ],
    "35574": [
        "KENNEDY",
        "AL"
    ],
    "35575": [
        "LYNN",
        "AL"
    ],
    "35576": [
        "MILLPORT",
        "AL"
    ],
    "35577": [
        "NATURAL BRIDGE",
        "AL"
    ],
    "35578": [
        "NAUVOO",
        "AL"
    ],
    "35579": [
        "OAKMAN",
        "AL"
    ],
    "35580": [
        "PARRISH",
        "AL"
    ],
    "35581": [
        "PHIL CAMPBELL",
        "AL"
    ],
    "35582": [
        "RED BAY",
        "AL"
    ],
    "35584": [
        "SIPSEY",
        "AL"
    ],
    "35585": [
        "SPRUCE PINE",
        "AL"
    ],
    "35586": [
        "SULLIGENT",
        "AL"
    ],
    "35587": [
        "TOWNLEY",
        "AL"
    ],
    "35592": [
        "VERNON",
        "AL"
    ],
    "35593": [
        "VINA",
        "AL"
    ],
    "35594": [
        "WINFIELD",
        "AL"
    ],
    "35601": [
        "DECATUR",
        "AL"
    ],
    "35602": [
        "DECATUR",
        "AL"
    ],
    "35603": [
        "DECATUR",
        "AL"
    ],
    "35609": [
        "DECATUR",
        "AL"
    ],
    "35610": [
        "ANDERSON",
        "AL"
    ],
    "35611": [
        "ATHENS",
        "AL"
    ],
    "35612": [
        "ATHENS",
        "AL"
    ],
    "35613": [
        "ATHENS",
        "AL"
    ],
    "35614": [
        "ATHENS",
        "AL"
    ],
    "35615": [
        "BELLE MINA",
        "AL"
    ],
    "35616": [
        "CHEROKEE",
        "AL"
    ],
    "35617": [
        "CLOVERDALE",
        "AL"
    ],
    "35618": [
        "COURTLAND",
        "AL"
    ],
    "35619": [
        "DANVILLE",
        "AL"
    ],
    "35620": [
        "ELKMONT",
        "AL"
    ],
    "35621": [
        "EVA",
        "AL"
    ],
    "35622": [
        "FALKVILLE",
        "AL"
    ],
    "35630": [
        "FLORENCE",
        "AL"
    ],
    "35631": [
        "FLORENCE",
        "AL"
    ],
    "35632": [
        "FLORENCE",
        "AL"
    ],
    "35633": [
        "FLORENCE",
        "AL"
    ],
    "35634": [
        "FLORENCE",
        "AL"
    ],
    "35640": [
        "HARTSELLE",
        "AL"
    ],
    "35643": [
        "HILLSBORO",
        "AL"
    ],
    "35645": [
        "KILLEN",
        "AL"
    ],
    "35646": [
        "LEIGHTON",
        "AL"
    ],
    "35647": [
        "LESTER",
        "AL"
    ],
    "35648": [
        "LEXINGTON",
        "AL"
    ],
    "35649": [
        "MOORESVILLE",
        "AL"
    ],
    "35650": [
        "MOULTON",
        "AL"
    ],
    "35651": [
        "MOUNT HOPE",
        "AL"
    ],
    "35652": [
        "ROGERSVILLE",
        "AL"
    ],
    "35653": [
        "RUSSELLVILLE",
        "AL"
    ],
    "35654": [
        "RUSSELLVILLE",
        "AL"
    ],
    "35660": [
        "SHEFFIELD",
        "AL"
    ],
    "35661": [
        "MUSCLE SHOALS",
        "AL"
    ],
    "35662": [
        "MUSCLE SHOALS",
        "AL"
    ],
    "35670": [
        "SOMERVILLE",
        "AL"
    ],
    "35671": [
        "TANNER",
        "AL"
    ],
    "35672": [
        "TOWN CREEK",
        "AL"
    ],
    "35673": [
        "TRINITY",
        "AL"
    ],
    "35674": [
        "TUSCUMBIA",
        "AL"
    ],
    "35677": [
        "WATERLOO",
        "AL"
    ],
    "35739": [
        "ARDMORE",
        "AL"
    ],
    "35740": [
        "BRIDGEPORT",
        "AL"
    ],
    "35741": [
        "BROWNSBORO",
        "AL"
    ],
    "35742": [
        "CAPSHAW",
        "AL"
    ],
    "35744": [
        "DUTTON",
        "AL"
    ],
    "35745": [
        "ESTILLFORK",
        "AL"
    ],
    "35746": [
        "FACKLER",
        "AL"
    ],
    "35747": [
        "GRANT",
        "AL"
    ],
    "35748": [
        "GURLEY",
        "AL"
    ],
    "35749": [
        "HARVEST",
        "AL"
    ],
    "35750": [
        "HAZEL GREEN",
        "AL"
    ],
    "35751": [
        "HOLLYTREE",
        "AL"
    ],
    "35752": [
        "HOLLYWOOD",
        "AL"
    ],
    "35754": [
        "LACEYS SPRING",
        "AL"
    ],
    "35755": [
        "LANGSTON",
        "AL"
    ],
    "35756": [
        "MADISON",
        "AL"
    ],
    "35757": [
        "MADISON",
        "AL"
    ],
    "35758": [
        "MADISON",
        "AL"
    ],
    "35759": [
        "MERIDIANVILLE",
        "AL"
    ],
    "35760": [
        "NEW HOPE",
        "AL"
    ],
    "35761": [
        "NEW MARKET",
        "AL"
    ],
    "35762": [
        "NORMAL",
        "AL"
    ],
    "35763": [
        "OWENS CROSS ROADS",
        "AL"
    ],
    "35764": [
        "PAINT ROCK",
        "AL"
    ],
    "35765": [
        "PISGAH",
        "AL"
    ],
    "35766": [
        "PRINCETON",
        "AL"
    ],
    "35767": [
        "RYLAND",
        "AL"
    ],
    "35768": [
        "SCOTTSBORO",
        "AL"
    ],
    "35769": [
        "SCOTTSBORO",
        "AL"
    ],
    "35771": [
        "SECTION",
        "AL"
    ],
    "35772": [
        "STEVENSON",
        "AL"
    ],
    "35773": [
        "TONEY",
        "AL"
    ],
    "35774": [
        "TRENTON",
        "AL"
    ],
    "35775": [
        "VALHERMOSO SPRINGS",
        "AL"
    ],
    "35776": [
        "WOODVILLE",
        "AL"
    ],
    "35801": [
        "HUNTSVILLE",
        "AL"
    ],
    "35802": [
        "HUNTSVILLE",
        "AL"
    ],
    "35803": [
        "HUNTSVILLE",
        "AL"
    ],
    "35804": [
        "HUNTSVILLE",
        "AL"
    ],
    "35805": [
        "HUNTSVILLE",
        "AL"
    ],
    "35806": [
        "HUNTSVILLE",
        "AL"
    ],
    "35807": [
        "HUNTSVILLE",
        "AL"
    ],
    "35808": [
        "HUNTSVILLE",
        "AL"
    ],
    "35809": [
        "HUNTSVILLE",
        "AL"
    ],
    "35810": [
        "HUNTSVILLE",
        "AL"
    ],
    "35811": [
        "HUNTSVILLE",
        "AL"
    ],
    "35812": [
        "HUNTSVILLE",
        "AL"
    ],
    "35813": [
        "HUNTSVILLE",
        "AL"
    ],
    "35814": [
        "HUNTSVILLE",
        "AL"
    ],
    "35815": [
        "HUNTSVILLE",
        "AL"
    ],
    "35816": [
        "HUNTSVILLE",
        "AL"
    ],
    "35824": [
        "HUNTSVILLE",
        "AL"
    ],
    "35893": [
        "HUNTSVILLE",
        "AL"
    ],
    "35896": [
        "HUNTSVILLE",
        "AL"
    ],
    "35898": [
        "HUNTSVILLE",
        "AL"
    ],
    "35899": [
        "HUNTSVILLE",
        "AL"
    ],
    "35901": [
        "GADSDEN",
        "AL"
    ],
    "35902": [
        "GADSDEN",
        "AL"
    ],
    "35903": [
        "GADSDEN",
        "AL"
    ],
    "35904": [
        "GADSDEN",
        "AL"
    ],
    "35905": [
        "GADSDEN",
        "AL"
    ],
    "35906": [
        "RAINBOW CITY",
        "AL"
    ],
    "35907": [
        "GADSDEN",
        "AL"
    ],
    "35950": [
        "ALBERTVILLE",
        "AL"
    ],
    "35951": [
        "ALBERTVILLE",
        "AL"
    ],
    "35952": [
        "ALTOONA",
        "AL"
    ],
    "35953": [
        "ASHVILLE",
        "AL"
    ],
    "35954": [
        "ATTALLA",
        "AL"
    ],
    "35956": [
        "BOAZ",
        "AL"
    ],
    "35957": [
        "BOAZ",
        "AL"
    ],
    "35958": [
        "BRYANT",
        "AL"
    ],
    "35959": [
        "CEDAR BLUFF",
        "AL"
    ],
    "35960": [
        "CENTRE",
        "AL"
    ],
    "35961": [
        "COLLINSVILLE",
        "AL"
    ],
    "35962": [
        "CROSSVILLE",
        "AL"
    ],
    "35963": [
        "DAWSON",
        "AL"
    ],
    "35964": [
        "DOUGLAS",
        "AL"
    ],
    "35966": [
        "FLAT ROCK",
        "AL"
    ],
    "35967": [
        "FORT PAYNE",
        "AL"
    ],
    "35968": [
        "FORT PAYNE",
        "AL"
    ],
    "35971": [
        "FYFFE",
        "AL"
    ],
    "35972": [
        "GALLANT",
        "AL"
    ],
    "35973": [
        "GAYLESVILLE",
        "AL"
    ],
    "35974": [
        "GERALDINE",
        "AL"
    ],
    "35975": [
        "GROVEOAK",
        "AL"
    ],
    "35976": [
        "GUNTERSVILLE",
        "AL"
    ],
    "35978": [
        "HENAGAR",
        "AL"
    ],
    "35979": [
        "HIGDON",
        "AL"
    ],
    "35980": [
        "HORTON",
        "AL"
    ],
    "35981": [
        "IDER",
        "AL"
    ],
    "35983": [
        "LEESBURG",
        "AL"
    ],
    "35984": [
        "MENTONE",
        "AL"
    ],
    "35986": [
        "RAINSVILLE",
        "AL"
    ],
    "35987": [
        "STEELE",
        "AL"
    ],
    "35988": [
        "SYLVANIA",
        "AL"
    ],
    "35989": [
        "VALLEY HEAD",
        "AL"
    ],
    "35990": [
        "WALNUT GROVE",
        "AL"
    ],
    "36003": [
        "AUTAUGAVILLE",
        "AL"
    ],
    "36005": [
        "BANKS",
        "AL"
    ],
    "36006": [
        "BILLINGSLEY",
        "AL"
    ],
    "36008": [
        "BOOTH",
        "AL"
    ],
    "36009": [
        "BRANTLEY",
        "AL"
    ],
    "36010": [
        "BRUNDIDGE",
        "AL"
    ],
    "36013": [
        "CECIL",
        "AL"
    ],
    "36015": [
        "CHAPMAN",
        "AL"
    ],
    "36016": [
        "CLAYTON",
        "AL"
    ],
    "36017": [
        "CLIO",
        "AL"
    ],
    "36020": [
        "COOSADA",
        "AL"
    ],
    "36022": [
        "DEATSVILLE",
        "AL"
    ],
    "36023": [
        "EAST TALLASSEE",
        "AL"
    ],
    "36024": [
        "ECLECTIC",
        "AL"
    ],
    "36025": [
        "ELMORE",
        "AL"
    ],
    "36026": [
        "EQUALITY",
        "AL"
    ],
    "36027": [
        "EUFAULA",
        "AL"
    ],
    "36028": [
        "DOZIER",
        "AL"
    ],
    "36029": [
        "FITZPATRICK",
        "AL"
    ],
    "36030": [
        "FOREST HOME",
        "AL"
    ],
    "36032": [
        "FORT DEPOSIT",
        "AL"
    ],
    "36033": [
        "GEORGIANA",
        "AL"
    ],
    "36034": [
        "GLENWOOD",
        "AL"
    ],
    "36035": [
        "GOSHEN",
        "AL"
    ],
    "36036": [
        "GRADY",
        "AL"
    ],
    "36037": [
        "GREENVILLE",
        "AL"
    ],
    "36038": [
        "GANTT",
        "AL"
    ],
    "36039": [
        "HARDAWAY",
        "AL"
    ],
    "36040": [
        "HAYNEVILLE",
        "AL"
    ],
    "36041": [
        "HIGHLAND HOME",
        "AL"
    ],
    "36042": [
        "HONORAVILLE",
        "AL"
    ],
    "36043": [
        "HOPE HULL",
        "AL"
    ],
    "36045": [
        "KENT",
        "AL"
    ],
    "36046": [
        "LAPINE",
        "AL"
    ],
    "36047": [
        "LETOHATCHEE",
        "AL"
    ],
    "36048": [
        "LOUISVILLE",
        "AL"
    ],
    "36049": [
        "LUVERNE",
        "AL"
    ],
    "36051": [
        "MARBURY",
        "AL"
    ],
    "36052": [
        "MATHEWS",
        "AL"
    ],
    "36053": [
        "MIDWAY",
        "AL"
    ],
    "36054": [
        "MILLBROOK",
        "AL"
    ],
    "36057": [
        "MOUNT MEIGS",
        "AL"
    ],
    "36064": [
        "PIKE ROAD",
        "AL"
    ],
    "36065": [
        "PINE LEVEL",
        "AL"
    ],
    "36066": [
        "PRATTVILLE",
        "AL"
    ],
    "36067": [
        "PRATTVILLE",
        "AL"
    ],
    "36068": [
        "PRATTVILLE",
        "AL"
    ],
    "36069": [
        "RAMER",
        "AL"
    ],
    "36071": [
        "RUTLEDGE",
        "AL"
    ],
    "36072": [
        "EUFAULA",
        "AL"
    ],
    "36075": [
        "SHORTER",
        "AL"
    ],
    "36078": [
        "TALLASSEE",
        "AL"
    ],
    "36079": [
        "TROY",
        "AL"
    ],
    "36080": [
        "TITUS",
        "AL"
    ],
    "36081": [
        "TROY",
        "AL"
    ],
    "36082": [
        "TROY",
        "AL"
    ],
    "36083": [
        "TUSKEGEE",
        "AL"
    ],
    "36087": [
        "TUSKEGEE INSTITUTE",
        "AL"
    ],
    "36088": [
        "TUSKEGEE INSTITUTE",
        "AL"
    ],
    "36089": [
        "UNION SPRINGS",
        "AL"
    ],
    "36091": [
        "VERBENA",
        "AL"
    ],
    "36092": [
        "WETUMPKA",
        "AL"
    ],
    "36093": [
        "WETUMPKA",
        "AL"
    ],
    "36101": [
        "MONTGOMERY",
        "AL"
    ],
    "36102": [
        "MONTGOMERY",
        "AL"
    ],
    "36103": [
        "MONTGOMERY",
        "AL"
    ],
    "36104": [
        "MONTGOMERY",
        "AL"
    ],
    "36105": [
        "MONTGOMERY",
        "AL"
    ],
    "36106": [
        "MONTGOMERY",
        "AL"
    ],
    "36107": [
        "MONTGOMERY",
        "AL"
    ],
    "36108": [
        "MONTGOMERY",
        "AL"
    ],
    "36109": [
        "MONTGOMERY",
        "AL"
    ],
    "36110": [
        "MONTGOMERY",
        "AL"
    ],
    "36111": [
        "MONTGOMERY",
        "AL"
    ],
    "36112": [
        "MONTGOMERY",
        "AL"
    ],
    "36113": [
        "MONTGOMERY",
        "AL"
    ],
    "36114": [
        "MONTGOMERY",
        "AL"
    ],
    "36115": [
        "MONTGOMERY",
        "AL"
    ],
    "36116": [
        "MONTGOMERY",
        "AL"
    ],
    "36117": [
        "MONTGOMERY",
        "AL"
    ],
    "36118": [
        "MONTGOMERY",
        "AL"
    ],
    "36120": [
        "MONTGOMERY",
        "AL"
    ],
    "36121": [
        "MONTGOMERY",
        "AL"
    ],
    "36123": [
        "MONTGOMERY",
        "AL"
    ],
    "36124": [
        "MONTGOMERY",
        "AL"
    ],
    "36125": [
        "MONTGOMERY",
        "AL"
    ],
    "36130": [
        "MONTGOMERY",
        "AL"
    ],
    "36131": [
        "MONTGOMERY",
        "AL"
    ],
    "36201": [
        "ANNISTON",
        "AL"
    ],
    "36202": [
        "ANNISTON",
        "AL"
    ],
    "36203": [
        "OXFORD",
        "AL"
    ],
    "36204": [
        "ANNISTON",
        "AL"
    ],
    "36205": [
        "ANNISTON",
        "AL"
    ],
    "36206": [
        "ANNISTON",
        "AL"
    ],
    "36207": [
        "ANNISTON",
        "AL"
    ],
    "36250": [
        "ALEXANDRIA",
        "AL"
    ],
    "36251": [
        "ASHLAND",
        "AL"
    ],
    "36253": [
        "BYNUM",
        "AL"
    ],
    "36254": [
        "CHOCCOLOCCO",
        "AL"
    ],
    "36255": [
        "CRAGFORD",
        "AL"
    ],
    "36256": [
        "DAVISTON",
        "AL"
    ],
    "36257": [
        "DE ARMANVILLE",
        "AL"
    ],
    "36258": [
        "DELTA",
        "AL"
    ],
    "36260": [
        "EASTABOGA",
        "AL"
    ],
    "36262": [
        "FRUITHURST",
        "AL"
    ],
    "36263": [
        "GRAHAM",
        "AL"
    ],
    "36264": [
        "HEFLIN",
        "AL"
    ],
    "36265": [
        "JACKSONVILLE",
        "AL"
    ],
    "36266": [
        "LINEVILLE",
        "AL"
    ],
    "36267": [
        "MILLERVILLE",
        "AL"
    ],
    "36268": [
        "MUNFORD",
        "AL"
    ],
    "36269": [
        "MUSCADINE",
        "AL"
    ],
    "36271": [
        "OHATCHEE",
        "AL"
    ],
    "36272": [
        "PIEDMONT",
        "AL"
    ],
    "36273": [
        "RANBURNE",
        "AL"
    ],
    "36274": [
        "ROANOKE",
        "AL"
    ],
    "36276": [
        "WADLEY",
        "AL"
    ],
    "36277": [
        "WEAVER",
        "AL"
    ],
    "36278": [
        "WEDOWEE",
        "AL"
    ],
    "36279": [
        "WELLINGTON",
        "AL"
    ],
    "36280": [
        "WOODLAND",
        "AL"
    ],
    "36301": [
        "DOTHAN",
        "AL"
    ],
    "36302": [
        "DOTHAN",
        "AL"
    ],
    "36303": [
        "DOTHAN",
        "AL"
    ],
    "36304": [
        "DOTHAN",
        "AL"
    ],
    "36305": [
        "DOTHAN",
        "AL"
    ],
    "36310": [
        "ABBEVILLE",
        "AL"
    ],
    "36311": [
        "ARITON",
        "AL"
    ],
    "36312": [
        "ASHFORD",
        "AL"
    ],
    "36313": [
        "BELLWOOD",
        "AL"
    ],
    "36314": [
        "BLACK",
        "AL"
    ],
    "36316": [
        "CHANCELLOR",
        "AL"
    ],
    "36318": [
        "COFFEE SPRINGS",
        "AL"
    ],
    "36319": [
        "COLUMBIA",
        "AL"
    ],
    "36320": [
        "COTTONWOOD",
        "AL"
    ],
    "36321": [
        "COWARTS",
        "AL"
    ],
    "36322": [
        "DALEVILLE",
        "AL"
    ],
    "36323": [
        "ELBA",
        "AL"
    ],
    "36330": [
        "ENTERPRISE",
        "AL"
    ],
    "36331": [
        "ENTERPRISE",
        "AL"
    ],
    "36340": [
        "GENEVA",
        "AL"
    ],
    "36343": [
        "GORDON",
        "AL"
    ],
    "36344": [
        "HARTFORD",
        "AL"
    ],
    "36345": [
        "HEADLAND",
        "AL"
    ],
    "36346": [
        "JACK",
        "AL"
    ],
    "36349": [
        "MALVERN",
        "AL"
    ],
    "36350": [
        "MIDLAND CITY",
        "AL"
    ],
    "36351": [
        "NEW BROCKTON",
        "AL"
    ],
    "36352": [
        "NEWTON",
        "AL"
    ],
    "36353": [
        "NEWVILLE",
        "AL"
    ],
    "36360": [
        "OZARK",
        "AL"
    ],
    "36361": [
        "OZARK",
        "AL"
    ],
    "36362": [
        "FORT RUCKER",
        "AL"
    ],
    "36370": [
        "PANSEY",
        "AL"
    ],
    "36371": [
        "PINCKARD",
        "AL"
    ],
    "36373": [
        "SHORTERVILLE",
        "AL"
    ],
    "36374": [
        "SKIPPERVILLE",
        "AL"
    ],
    "36375": [
        "SLOCOMB",
        "AL"
    ],
    "36376": [
        "WEBB",
        "AL"
    ],
    "36401": [
        "EVERGREEN",
        "AL"
    ],
    "36420": [
        "ANDALUSIA",
        "AL"
    ],
    "36421": [
        "ANDALUSIA",
        "AL"
    ],
    "36425": [
        "BEATRICE",
        "AL"
    ],
    "36426": [
        "BREWTON",
        "AL"
    ],
    "36427": [
        "BREWTON",
        "AL"
    ],
    "36429": [
        "BROOKLYN",
        "AL"
    ],
    "36432": [
        "CASTLEBERRY",
        "AL"
    ],
    "36435": [
        "COY",
        "AL"
    ],
    "36436": [
        "DICKINSON",
        "AL"
    ],
    "36439": [
        "EXCEL",
        "AL"
    ],
    "36441": [
        "FLOMATON",
        "AL"
    ],
    "36442": [
        "FLORALA",
        "AL"
    ],
    "36444": [
        "FRANKLIN",
        "AL"
    ],
    "36445": [
        "FRISCO CITY",
        "AL"
    ],
    "36446": [
        "FULTON",
        "AL"
    ],
    "36451": [
        "GROVE HILL",
        "AL"
    ],
    "36453": [
        "KINSTON",
        "AL"
    ],
    "36454": [
        "LENOX",
        "AL"
    ],
    "36456": [
        "MC KENZIE",
        "AL"
    ],
    "36457": [
        "MEGARGEL",
        "AL"
    ],
    "36458": [
        "MEXIA",
        "AL"
    ],
    "36460": [
        "MONROEVILLE",
        "AL"
    ],
    "36461": [
        "MONROEVILLE",
        "AL"
    ],
    "36467": [
        "OPP",
        "AL"
    ],
    "36470": [
        "PERDUE HILL",
        "AL"
    ],
    "36471": [
        "PETERMAN",
        "AL"
    ],
    "36473": [
        "RANGE",
        "AL"
    ],
    "36474": [
        "RED LEVEL",
        "AL"
    ],
    "36475": [
        "REPTON",
        "AL"
    ],
    "36476": [
        "RIVER FALLS",
        "AL"
    ],
    "36477": [
        "SAMSON",
        "AL"
    ],
    "36480": [
        "URIAH",
        "AL"
    ],
    "36481": [
        "VREDENBURGH",
        "AL"
    ],
    "36482": [
        "WHATLEY",
        "AL"
    ],
    "36483": [
        "WING",
        "AL"
    ],
    "36502": [
        "ATMORE",
        "AL"
    ],
    "36503": [
        "ATMORE",
        "AL"
    ],
    "36504": [
        "ATMORE",
        "AL"
    ],
    "36505": [
        "AXIS",
        "AL"
    ],
    "36507": [
        "BAY MINETTE",
        "AL"
    ],
    "36509": [
        "BAYOU LA BATRE",
        "AL"
    ],
    "36511": [
        "BON SECOUR",
        "AL"
    ],
    "36512": [
        "BUCKS",
        "AL"
    ],
    "36513": [
        "CALVERT",
        "AL"
    ],
    "36515": [
        "CARLTON",
        "AL"
    ],
    "36518": [
        "CHATOM",
        "AL"
    ],
    "36521": [
        "CHUNCHULA",
        "AL"
    ],
    "36522": [
        "CITRONELLE",
        "AL"
    ],
    "36523": [
        "CODEN",
        "AL"
    ],
    "36524": [
        "COFFEEVILLE",
        "AL"
    ],
    "36525": [
        "CREOLA",
        "AL"
    ],
    "36526": [
        "DAPHNE",
        "AL"
    ],
    "36527": [
        "SPANISH FORT",
        "AL"
    ],
    "36528": [
        "DAUPHIN ISLAND",
        "AL"
    ],
    "36529": [
        "DEER PARK",
        "AL"
    ],
    "36530": [
        "ELBERTA",
        "AL"
    ],
    "36532": [
        "FAIRHOPE",
        "AL"
    ],
    "36533": [
        "FAIRHOPE",
        "AL"
    ],
    "36535": [
        "FOLEY",
        "AL"
    ],
    "36536": [
        "FOLEY",
        "AL"
    ],
    "36538": [
        "FRANKVILLE",
        "AL"
    ],
    "36539": [
        "FRUITDALE",
        "AL"
    ],
    "36540": [
        "GAINESTOWN",
        "AL"
    ],
    "36541": [
        "GRAND BAY",
        "AL"
    ],
    "36542": [
        "GULF SHORES",
        "AL"
    ],
    "36543": [
        "HUXFORD",
        "AL"
    ],
    "36544": [
        "IRVINGTON",
        "AL"
    ],
    "36545": [
        "JACKSON",
        "AL"
    ],
    "36547": [
        "GULF SHORES",
        "AL"
    ],
    "36548": [
        "LEROY",
        "AL"
    ],
    "36549": [
        "LILLIAN",
        "AL"
    ],
    "36550": [
        "LITTLE RIVER",
        "AL"
    ],
    "36551": [
        "LOXLEY",
        "AL"
    ],
    "36553": [
        "MC INTOSH",
        "AL"
    ],
    "36555": [
        "MAGNOLIA SPRINGS",
        "AL"
    ],
    "36556": [
        "MALCOLM",
        "AL"
    ],
    "36558": [
        "MILLRY",
        "AL"
    ],
    "36559": [
        "MONTROSE",
        "AL"
    ],
    "36560": [
        "MOUNT VERNON",
        "AL"
    ],
    "36561": [
        "ORANGE BEACH",
        "AL"
    ],
    "36562": [
        "PERDIDO",
        "AL"
    ],
    "36564": [
        "POINT CLEAR",
        "AL"
    ],
    "36567": [
        "ROBERTSDALE",
        "AL"
    ],
    "36568": [
        "SAINT ELMO",
        "AL"
    ],
    "36569": [
        "SAINT STEPHENS",
        "AL"
    ],
    "36571": [
        "SARALAND",
        "AL"
    ],
    "36572": [
        "SATSUMA",
        "AL"
    ],
    "36574": [
        "SEMINOLE",
        "AL"
    ],
    "36575": [
        "SEMMES",
        "AL"
    ],
    "36576": [
        "SILVERHILL",
        "AL"
    ],
    "36577": [
        "SPANISH FORT",
        "AL"
    ],
    "36578": [
        "STAPLETON",
        "AL"
    ],
    "36579": [
        "STOCKTON",
        "AL"
    ],
    "36580": [
        "SUMMERDALE",
        "AL"
    ],
    "36581": [
        "SUNFLOWER",
        "AL"
    ],
    "36582": [
        "THEODORE",
        "AL"
    ],
    "36583": [
        "TIBBIE",
        "AL"
    ],
    "36584": [
        "VINEGAR BEND",
        "AL"
    ],
    "36585": [
        "WAGARVILLE",
        "AL"
    ],
    "36587": [
        "WILMER",
        "AL"
    ],
    "36590": [
        "THEODORE",
        "AL"
    ],
    "36601": [
        "MOBILE",
        "AL"
    ],
    "36602": [
        "MOBILE",
        "AL"
    ],
    "36603": [
        "MOBILE",
        "AL"
    ],
    "36604": [
        "MOBILE",
        "AL"
    ],
    "36605": [
        "MOBILE",
        "AL"
    ],
    "36606": [
        "MOBILE",
        "AL"
    ],
    "36607": [
        "MOBILE",
        "AL"
    ],
    "36608": [
        "MOBILE",
        "AL"
    ],
    "36609": [
        "MOBILE",
        "AL"
    ],
    "36610": [
        "MOBILE",
        "AL"
    ],
    "36611": [
        "MOBILE",
        "AL"
    ],
    "36612": [
        "MOBILE",
        "AL"
    ],
    "36613": [
        "EIGHT MILE",
        "AL"
    ],
    "36615": [
        "MOBILE",
        "AL"
    ],
    "36616": [
        "MOBILE",
        "AL"
    ],
    "36617": [
        "MOBILE",
        "AL"
    ],
    "36618": [
        "MOBILE",
        "AL"
    ],
    "36619": [
        "MOBILE",
        "AL"
    ],
    "36625": [
        "MOBILE",
        "AL"
    ],
    "36630": [
        "MOBILE",
        "AL"
    ],
    "36633": [
        "MOBILE",
        "AL"
    ],
    "36640": [
        "MOBILE",
        "AL"
    ],
    "36644": [
        "MOBILE",
        "AL"
    ],
    "36652": [
        "MOBILE",
        "AL"
    ],
    "36660": [
        "MOBILE",
        "AL"
    ],
    "36670": [
        "MOBILE",
        "AL"
    ],
    "36671": [
        "MOBILE",
        "AL"
    ],
    "36685": [
        "MOBILE",
        "AL"
    ],
    "36688": [
        "MOBILE",
        "AL"
    ],
    "36689": [
        "MOBILE",
        "AL"
    ],
    "36691": [
        "MOBILE",
        "AL"
    ],
    "36693": [
        "MOBILE",
        "AL"
    ],
    "36695": [
        "MOBILE",
        "AL"
    ],
    "36701": [
        "SELMA",
        "AL"
    ],
    "36702": [
        "SELMA",
        "AL"
    ],
    "36703": [
        "SELMA",
        "AL"
    ],
    "36720": [
        "ALBERTA",
        "AL"
    ],
    "36722": [
        "ARLINGTON",
        "AL"
    ],
    "36726": [
        "CAMDEN",
        "AL"
    ],
    "36728": [
        "CATHERINE",
        "AL"
    ],
    "36732": [
        "DEMOPOLIS",
        "AL"
    ],
    "36736": [
        "DIXONS MILLS",
        "AL"
    ],
    "36738": [
        "FAUNSDALE",
        "AL"
    ],
    "36740": [
        "FORKLAND",
        "AL"
    ],
    "36741": [
        "FURMAN",
        "AL"
    ],
    "36742": [
        "GALLION",
        "AL"
    ],
    "36744": [
        "GREENSBORO",
        "AL"
    ],
    "36748": [
        "LINDEN",
        "AL"
    ],
    "36749": [
        "JONES",
        "AL"
    ],
    "36750": [
        "MAPLESVILLE",
        "AL"
    ],
    "36751": [
        "LOWER PEACH TREE",
        "AL"
    ],
    "36752": [
        "LOWNDESBORO",
        "AL"
    ],
    "36753": [
        "MC WILLIAMS",
        "AL"
    ],
    "36756": [
        "MARION",
        "AL"
    ],
    "36758": [
        "PLANTERSVILLE",
        "AL"
    ],
    "36759": [
        "MARION JUNCTION",
        "AL"
    ],
    "36761": [
        "MINTER",
        "AL"
    ],
    "36762": [
        "MORVIN",
        "AL"
    ],
    "36763": [
        "MYRTLEWOOD",
        "AL"
    ],
    "36764": [
        "NANAFALIA",
        "AL"
    ],
    "36765": [
        "NEWBERN",
        "AL"
    ],
    "36766": [
        "OAK HILL",
        "AL"
    ],
    "36767": [
        "ORRVILLE",
        "AL"
    ],
    "36768": [
        "PINE APPLE",
        "AL"
    ],
    "36769": [
        "PINE HILL",
        "AL"
    ],
    "36773": [
        "SAFFORD",
        "AL"
    ],
    "36775": [
        "SARDIS",
        "AL"
    ],
    "36776": [
        "SAWYERVILLE",
        "AL"
    ],
    "36782": [
        "SWEET WATER",
        "AL"
    ],
    "36783": [
        "THOMASTON",
        "AL"
    ],
    "36784": [
        "THOMASVILLE",
        "AL"
    ],
    "36785": [
        "TYLER",
        "AL"
    ],
    "36786": [
        "UNIONTOWN",
        "AL"
    ],
    "36790": [
        "STANTON",
        "AL"
    ],
    "36792": [
        "RANDOLPH",
        "AL"
    ],
    "36793": [
        "LAWLEY",
        "AL"
    ],
    "36801": [
        "OPELIKA",
        "AL"
    ],
    "36802": [
        "OPELIKA",
        "AL"
    ],
    "36803": [
        "OPELIKA",
        "AL"
    ],
    "36804": [
        "OPELIKA",
        "AL"
    ],
    "36830": [
        "AUBURN",
        "AL"
    ],
    "36831": [
        "AUBURN",
        "AL"
    ],
    "36832": [
        "AUBURN",
        "AL"
    ],
    "36849": [
        "AUBURN UNIVERSITY",
        "AL"
    ],
    "36850": [
        "CAMP HILL",
        "AL"
    ],
    "36851": [
        "COTTONTON",
        "AL"
    ],
    "36852": [
        "CUSSETA",
        "AL"
    ],
    "36853": [
        "DADEVILLE",
        "AL"
    ],
    "36854": [
        "VALLEY",
        "AL"
    ],
    "36855": [
        "FIVE POINTS",
        "AL"
    ],
    "36856": [
        "FORT MITCHELL",
        "AL"
    ],
    "36858": [
        "HATCHECHUBBEE",
        "AL"
    ],
    "36859": [
        "HOLY TRINITY",
        "AL"
    ],
    "36860": [
        "HURTSBORO",
        "AL"
    ],
    "36861": [
        "JACKSONS GAP",
        "AL"
    ],
    "36862": [
        "LAFAYETTE",
        "AL"
    ],
    "36863": [
        "LANETT",
        "AL"
    ],
    "36865": [
        "LOACHAPOKA",
        "AL"
    ],
    "36866": [
        "NOTASULGA",
        "AL"
    ],
    "36867": [
        "PHENIX CITY",
        "AL"
    ],
    "36868": [
        "PHENIX CITY",
        "AL"
    ],
    "36869": [
        "PHENIX CITY",
        "AL"
    ],
    "36870": [
        "PHENIX CITY",
        "AL"
    ],
    "36871": [
        "PITTSVIEW",
        "AL"
    ],
    "36872": [
        "VALLEY",
        "AL"
    ],
    "36874": [
        "SALEM",
        "AL"
    ],
    "36875": [
        "SEALE",
        "AL"
    ],
    "36877": [
        "SMITHS STATION",
        "AL"
    ],
    "36879": [
        "WAVERLY",
        "AL"
    ],
    "36901": [
        "BELLAMY",
        "AL"
    ],
    "36904": [
        "BUTLER",
        "AL"
    ],
    "36907": [
        "CUBA",
        "AL"
    ],
    "36908": [
        "GILBERTOWN",
        "AL"
    ],
    "36910": [
        "JACHIN",
        "AL"
    ],
    "36912": [
        "LISMAN",
        "AL"
    ],
    "36913": [
        "MELVIN",
        "AL"
    ],
    "36915": [
        "NEEDHAM",
        "AL"
    ],
    "36916": [
        "PENNINGTON",
        "AL"
    ],
    "36919": [
        "SILAS",
        "AL"
    ],
    "36921": [
        "TOXEY",
        "AL"
    ],
    "36922": [
        "WARD",
        "AL"
    ],
    "36925": [
        "YORK",
        "AL"
    ],
    "37010": [
        "ADAMS",
        "TN"
    ],
    "37011": [
        "ANTIOCH",
        "TN"
    ],
    "37012": [
        "ALEXANDRIA",
        "TN"
    ],
    "37013": [
        "ANTIOCH",
        "TN"
    ],
    "37014": [
        "ARRINGTON",
        "TN"
    ],
    "37015": [
        "ASHLAND CITY",
        "TN"
    ],
    "37016": [
        "AUBURNTOWN",
        "TN"
    ],
    "37018": [
        "BEECHGROVE",
        "TN"
    ],
    "37019": [
        "BELFAST",
        "TN"
    ],
    "37020": [
        "BELL BUCKLE",
        "TN"
    ],
    "37022": [
        "BETHPAGE",
        "TN"
    ],
    "37023": [
        "BIG ROCK",
        "TN"
    ],
    "37024": [
        "BRENTWOOD",
        "TN"
    ],
    "37025": [
        "BON AQUA",
        "TN"
    ],
    "37026": [
        "BRADYVILLE",
        "TN"
    ],
    "37027": [
        "BRENTWOOD",
        "TN"
    ],
    "37028": [
        "BUMPUS MILLS",
        "TN"
    ],
    "37029": [
        "BURNS",
        "TN"
    ],
    "37030": [
        "CARTHAGE",
        "TN"
    ],
    "37031": [
        "CASTALIAN SPRINGS",
        "TN"
    ],
    "37032": [
        "CEDAR HILL",
        "TN"
    ],
    "37033": [
        "CENTERVILLE",
        "TN"
    ],
    "37034": [
        "CHAPEL HILL",
        "TN"
    ],
    "37035": [
        "CHAPMANSBORO",
        "TN"
    ],
    "37036": [
        "CHARLOTTE",
        "TN"
    ],
    "37037": [
        "CHRISTIANA",
        "TN"
    ],
    "37040": [
        "CLARKSVILLE",
        "TN"
    ],
    "37041": [
        "CLARKSVILLE",
        "TN"
    ],
    "37042": [
        "CLARKSVILLE",
        "TN"
    ],
    "37043": [
        "CLARKSVILLE",
        "TN"
    ],
    "37044": [
        "CLARKSVILLE",
        "TN"
    ],
    "37046": [
        "COLLEGE GROVE",
        "TN"
    ],
    "37047": [
        "CORNERSVILLE",
        "TN"
    ],
    "37048": [
        "COTTONTOWN",
        "TN"
    ],
    "37049": [
        "CROSS PLAINS",
        "TN"
    ],
    "37050": [
        "CUMBERLAND CITY",
        "TN"
    ],
    "37051": [
        "CUMBERLAND FURNACE",
        "TN"
    ],
    "37052": [
        "CUNNINGHAM",
        "TN"
    ],
    "37055": [
        "DICKSON",
        "TN"
    ],
    "37056": [
        "DICKSON",
        "TN"
    ],
    "37057": [
        "DIXON SPRINGS",
        "TN"
    ],
    "37058": [
        "DOVER",
        "TN"
    ],
    "37059": [
        "DOWELLTOWN",
        "TN"
    ],
    "37060": [
        "EAGLEVILLE",
        "TN"
    ],
    "37061": [
        "ERIN",
        "TN"
    ],
    "37062": [
        "FAIRVIEW",
        "TN"
    ],
    "37063": [
        "FOSTERVILLE",
        "TN"
    ],
    "37064": [
        "FRANKLIN",
        "TN"
    ],
    "37065": [
        "FRANKLIN",
        "TN"
    ],
    "37066": [
        "GALLATIN",
        "TN"
    ],
    "37067": [
        "FRANKLIN",
        "TN"
    ],
    "37068": [
        "FRANKLIN",
        "TN"
    ],
    "37069": [
        "FRANKLIN",
        "TN"
    ],
    "37070": [
        "GOODLETTSVILLE",
        "TN"
    ],
    "37071": [
        "GLADEVILLE",
        "TN"
    ],
    "37072": [
        "GOODLETTSVILLE",
        "TN"
    ],
    "37073": [
        "GREENBRIER",
        "TN"
    ],
    "37074": [
        "HARTSVILLE",
        "TN"
    ],
    "37075": [
        "HENDERSONVILLE",
        "TN"
    ],
    "37076": [
        "HERMITAGE",
        "TN"
    ],
    "37077": [
        "HENDERSONVILLE",
        "TN"
    ],
    "37078": [
        "HURRICANE MILLS",
        "TN"
    ],
    "37079": [
        "INDIAN MOUND",
        "TN"
    ],
    "37080": [
        "JOELTON",
        "TN"
    ],
    "37082": [
        "KINGSTON SPRINGS",
        "TN"
    ],
    "37083": [
        "LAFAYETTE",
        "TN"
    ],
    "37085": [
        "LASCASSAS",
        "TN"
    ],
    "37086": [
        "LA VERGNE",
        "TN"
    ],
    "37087": [
        "LEBANON",
        "TN"
    ],
    "37088": [
        "LEBANON",
        "TN"
    ],
    "37089": [
        "LA VERGNE",
        "TN"
    ],
    "37090": [
        "LEBANON",
        "TN"
    ],
    "37091": [
        "LEWISBURG",
        "TN"
    ],
    "37095": [
        "LIBERTY",
        "TN"
    ],
    "37096": [
        "LINDEN",
        "TN"
    ],
    "37097": [
        "LOBELVILLE",
        "TN"
    ],
    "37098": [
        "LYLES",
        "TN"
    ],
    "37101": [
        "MC EWEN",
        "TN"
    ],
    "37110": [
        "MCMINNVILLE",
        "TN"
    ],
    "37111": [
        "MCMINNVILLE",
        "TN"
    ],
    "37115": [
        "MADISON",
        "TN"
    ],
    "37116": [
        "MADISON",
        "TN"
    ],
    "37118": [
        "MILTON",
        "TN"
    ],
    "37121": [
        "MOUNT JULIET",
        "TN"
    ],
    "37122": [
        "MOUNT JULIET",
        "TN"
    ],
    "37127": [
        "MURFREESBORO",
        "TN"
    ],
    "37128": [
        "MURFREESBORO",
        "TN"
    ],
    "37129": [
        "MURFREESBORO",
        "TN"
    ],
    "37130": [
        "MURFREESBORO",
        "TN"
    ],
    "37131": [
        "MURFREESBORO",
        "TN"
    ],
    "37132": [
        "MURFREESBORO",
        "TN"
    ],
    "37133": [
        "MURFREESBORO",
        "TN"
    ],
    "37134": [
        "NEW JOHNSONVILLE",
        "TN"
    ],
    "37135": [
        "NOLENSVILLE",
        "TN"
    ],
    "37136": [
        "NORENE",
        "TN"
    ],
    "37137": [
        "NUNNELLY",
        "TN"
    ],
    "37138": [
        "OLD HICKORY",
        "TN"
    ],
    "37140": [
        "ONLY",
        "TN"
    ],
    "37141": [
        "ORLINDA",
        "TN"
    ],
    "37142": [
        "PALMYRA",
        "TN"
    ],
    "37143": [
        "PEGRAM",
        "TN"
    ],
    "37144": [
        "PETERSBURG",
        "TN"
    ],
    "37145": [
        "PLEASANT SHADE",
        "TN"
    ],
    "37146": [
        "PLEASANT VIEW",
        "TN"
    ],
    "37148": [
        "PORTLAND",
        "TN"
    ],
    "37149": [
        "READYVILLE",
        "TN"
    ],
    "37150": [
        "RED BOILING SPRINGS",
        "TN"
    ],
    "37151": [
        "RIDDLETON",
        "TN"
    ],
    "37152": [
        "RIDGETOP",
        "TN"
    ],
    "37153": [
        "ROCKVALE",
        "TN"
    ],
    "37160": [
        "SHELBYVILLE",
        "TN"
    ],
    "37162": [
        "SHELBYVILLE",
        "TN"
    ],
    "37166": [
        "SMITHVILLE",
        "TN"
    ],
    "37167": [
        "SMYRNA",
        "TN"
    ],
    "37171": [
        "SOUTHSIDE",
        "TN"
    ],
    "37172": [
        "SPRINGFIELD",
        "TN"
    ],
    "37174": [
        "SPRING HILL",
        "TN"
    ],
    "37175": [
        "STEWART",
        "TN"
    ],
    "37178": [
        "TENNESSEE RIDGE",
        "TN"
    ],
    "37179": [
        "THOMPSONS STATION",
        "TN"
    ],
    "37180": [
        "UNIONVILLE",
        "TN"
    ],
    "37181": [
        "VANLEER",
        "TN"
    ],
    "37183": [
        "WARTRACE",
        "TN"
    ],
    "37184": [
        "WATERTOWN",
        "TN"
    ],
    "37185": [
        "WAVERLY",
        "TN"
    ],
    "37186": [
        "WESTMORELAND",
        "TN"
    ],
    "37187": [
        "WHITE BLUFF",
        "TN"
    ],
    "37188": [
        "WHITE HOUSE",
        "TN"
    ],
    "37189": [
        "WHITES CREEK",
        "TN"
    ],
    "37190": [
        "WOODBURY",
        "TN"
    ],
    "37191": [
        "WOODLAWN",
        "TN"
    ],
    "37201": [
        "NASHVILLE",
        "TN"
    ],
    "37202": [
        "NASHVILLE",
        "TN"
    ],
    "37203": [
        "NASHVILLE",
        "TN"
    ],
    "37204": [
        "NASHVILLE",
        "TN"
    ],
    "37205": [
        "NASHVILLE",
        "TN"
    ],
    "37206": [
        "NASHVILLE",
        "TN"
    ],
    "37207": [
        "NASHVILLE",
        "TN"
    ],
    "37208": [
        "NASHVILLE",
        "TN"
    ],
    "37209": [
        "NASHVILLE",
        "TN"
    ],
    "37210": [
        "NASHVILLE",
        "TN"
    ],
    "37211": [
        "NASHVILLE",
        "TN"
    ],
    "37212": [
        "NASHVILLE",
        "TN"
    ],
    "37213": [
        "NASHVILLE",
        "TN"
    ],
    "37214": [
        "NASHVILLE",
        "TN"
    ],
    "37215": [
        "NASHVILLE",
        "TN"
    ],
    "37216": [
        "NASHVILLE",
        "TN"
    ],
    "37217": [
        "NASHVILLE",
        "TN"
    ],
    "37218": [
        "NASHVILLE",
        "TN"
    ],
    "37219": [
        "NASHVILLE",
        "TN"
    ],
    "37220": [
        "NASHVILLE",
        "TN"
    ],
    "37221": [
        "NASHVILLE",
        "TN"
    ],
    "37222": [
        "NASHVILLE",
        "TN"
    ],
    "37224": [
        "NASHVILLE",
        "TN"
    ],
    "37227": [
        "NASHVILLE",
        "TN"
    ],
    "37228": [
        "NASHVILLE",
        "TN"
    ],
    "37229": [
        "NASHVILLE",
        "TN"
    ],
    "37232": [
        "NASHVILLE",
        "TN"
    ],
    "37234": [
        "NASHVILLE",
        "TN"
    ],
    "37235": [
        "NASHVILLE",
        "TN"
    ],
    "37236": [
        "NASHVILLE",
        "TN"
    ],
    "37238": [
        "NASHVILLE",
        "TN"
    ],
    "37240": [
        "NASHVILLE",
        "TN"
    ],
    "37241": [
        "NASHVILLE",
        "TN"
    ],
    "37242": [
        "NASHVILLE",
        "TN"
    ],
    "37243": [
        "NASHVILLE",
        "TN"
    ],
    "37244": [
        "NASHVILLE",
        "TN"
    ],
    "37246": [
        "NASHVILLE",
        "TN"
    ],
    "37250": [
        "NASHVILLE",
        "TN"
    ],
    "37301": [
        "ALTAMONT",
        "TN"
    ],
    "37302": [
        "APISON",
        "TN"
    ],
    "37303": [
        "ATHENS",
        "TN"
    ],
    "37304": [
        "BAKEWELL",
        "TN"
    ],
    "37305": [
        "BEERSHEBA SPRINGS",
        "TN"
    ],
    "37306": [
        "BELVIDERE",
        "TN"
    ],
    "37307": [
        "BENTON",
        "TN"
    ],
    "37308": [
        "BIRCHWOOD",
        "TN"
    ],
    "37309": [
        "CALHOUN",
        "TN"
    ],
    "37310": [
        "CHARLESTON",
        "TN"
    ],
    "37311": [
        "CLEVELAND",
        "TN"
    ],
    "37312": [
        "CLEVELAND",
        "TN"
    ],
    "37313": [
        "COALMONT",
        "TN"
    ],
    "37314": [
        "COKER CREEK",
        "TN"
    ],
    "37315": [
        "COLLEGEDALE",
        "TN"
    ],
    "37316": [
        "CONASAUGA",
        "TN"
    ],
    "37317": [
        "COPPERHILL",
        "TN"
    ],
    "37318": [
        "COWAN",
        "TN"
    ],
    "37320": [
        "CLEVELAND",
        "TN"
    ],
    "37321": [
        "DAYTON",
        "TN"
    ],
    "37322": [
        "DECATUR",
        "TN"
    ],
    "37323": [
        "CLEVELAND",
        "TN"
    ],
    "37324": [
        "DECHERD",
        "TN"
    ],
    "37325": [
        "DELANO",
        "TN"
    ],
    "37326": [
        "DUCKTOWN",
        "TN"
    ],
    "37327": [
        "DUNLAP",
        "TN"
    ],
    "37328": [
        "ELORA",
        "TN"
    ],
    "37329": [
        "ENGLEWOOD",
        "TN"
    ],
    "37330": [
        "ESTILL SPRINGS",
        "TN"
    ],
    "37331": [
        "ETOWAH",
        "TN"
    ],
    "37332": [
        "EVENSVILLE",
        "TN"
    ],
    "37333": [
        "FARNER",
        "TN"
    ],
    "37334": [
        "FAYETTEVILLE",
        "TN"
    ],
    "37335": [
        "FLINTVILLE",
        "TN"
    ],
    "37336": [
        "GEORGETOWN",
        "TN"
    ],
    "37337": [
        "GRANDVIEW",
        "TN"
    ],
    "37338": [
        "GRAYSVILLE",
        "TN"
    ],
    "37339": [
        "GRUETLI LAAGER",
        "TN"
    ],
    "37340": [
        "GUILD",
        "TN"
    ],
    "37341": [
        "HARRISON",
        "TN"
    ],
    "37342": [
        "HILLSBORO",
        "TN"
    ],
    "37343": [
        "HIXSON",
        "TN"
    ],
    "37345": [
        "HUNTLAND",
        "TN"
    ],
    "37347": [
        "JASPER",
        "TN"
    ],
    "37348": [
        "KELSO",
        "TN"
    ],
    "37349": [
        "MANCHESTER",
        "TN"
    ],
    "37350": [
        "LOOKOUT MOUNTAIN",
        "TN"
    ],
    "37352": [
        "LYNCHBURG",
        "TN"
    ],
    "37353": [
        "MC DONALD",
        "TN"
    ],
    "37354": [
        "MADISONVILLE",
        "TN"
    ],
    "37355": [
        "MANCHESTER",
        "TN"
    ],
    "37356": [
        "MONTEAGLE",
        "TN"
    ],
    "37357": [
        "MORRISON",
        "TN"
    ],
    "37359": [
        "MULBERRY",
        "TN"
    ],
    "37360": [
        "NORMANDY",
        "TN"
    ],
    "37361": [
        "OCOEE",
        "TN"
    ],
    "37362": [
        "OLD FORT",
        "TN"
    ],
    "37363": [
        "OOLTEWAH",
        "TN"
    ],
    "37364": [
        "CLEVELAND",
        "TN"
    ],
    "37365": [
        "PALMER",
        "TN"
    ],
    "37366": [
        "PELHAM",
        "TN"
    ],
    "37367": [
        "PIKEVILLE",
        "TN"
    ],
    "37369": [
        "RELIANCE",
        "TN"
    ],
    "37370": [
        "RICEVILLE",
        "TN"
    ],
    "37371": [
        "ATHENS",
        "TN"
    ],
    "37373": [
        "SALE CREEK",
        "TN"
    ],
    "37374": [
        "SEQUATCHIE",
        "TN"
    ],
    "37375": [
        "SEWANEE",
        "TN"
    ],
    "37376": [
        "SHERWOOD",
        "TN"
    ],
    "37377": [
        "SIGNAL MOUNTAIN",
        "TN"
    ],
    "37378": [
        "SMARTT",
        "TN"
    ],
    "37379": [
        "SODDY DAISY",
        "TN"
    ],
    "37380": [
        "SOUTH PITTSBURG",
        "TN"
    ],
    "37381": [
        "SPRING CITY",
        "TN"
    ],
    "37382": [
        "SUMMITVILLE",
        "TN"
    ],
    "37383": [
        "SEWANEE",
        "TN"
    ],
    "37384": [
        "SODDY DAISY",
        "TN"
    ],
    "37385": [
        "TELLICO PLAINS",
        "TN"
    ],
    "37387": [
        "TRACY CITY",
        "TN"
    ],
    "37388": [
        "TULLAHOMA",
        "TN"
    ],
    "37389": [
        "ARNOLD AFB",
        "TN"
    ],
    "37391": [
        "TURTLETOWN",
        "TN"
    ],
    "37394": [
        "VIOLA",
        "TN"
    ],
    "37397": [
        "WHITWELL",
        "TN"
    ],
    "37398": [
        "WINCHESTER",
        "TN"
    ],
    "37401": [
        "CHATTANOOGA",
        "TN"
    ],
    "37402": [
        "CHATTANOOGA",
        "TN"
    ],
    "37403": [
        "CHATTANOOGA",
        "TN"
    ],
    "37404": [
        "CHATTANOOGA",
        "TN"
    ],
    "37405": [
        "CHATTANOOGA",
        "TN"
    ],
    "37406": [
        "CHATTANOOGA",
        "TN"
    ],
    "37407": [
        "CHATTANOOGA",
        "TN"
    ],
    "37408": [
        "CHATTANOOGA",
        "TN"
    ],
    "37409": [
        "CHATTANOOGA",
        "TN"
    ],
    "37410": [
        "CHATTANOOGA",
        "TN"
    ],
    "37411": [
        "CHATTANOOGA",
        "TN"
    ],
    "37412": [
        "CHATTANOOGA",
        "TN"
    ],
    "37414": [
        "CHATTANOOGA",
        "TN"
    ],
    "37415": [
        "CHATTANOOGA",
        "TN"
    ],
    "37416": [
        "CHATTANOOGA",
        "TN"
    ],
    "37419": [
        "CHATTANOOGA",
        "TN"
    ],
    "37421": [
        "CHATTANOOGA",
        "TN"
    ],
    "37422": [
        "CHATTANOOGA",
        "TN"
    ],
    "37424": [
        "CHATTANOOGA",
        "TN"
    ],
    "37450": [
        "CHATTANOOGA",
        "TN"
    ],
    "37501": [
        "MEMPHIS",
        "TN"
    ],
    "37601": [
        "JOHNSON CITY",
        "TN"
    ],
    "37602": [
        "JOHNSON CITY",
        "TN"
    ],
    "37604": [
        "JOHNSON CITY",
        "TN"
    ],
    "37605": [
        "JOHNSON CITY",
        "TN"
    ],
    "37614": [
        "JOHNSON CITY",
        "TN"
    ],
    "37615": [
        "JOHNSON CITY",
        "TN"
    ],
    "37616": [
        "AFTON",
        "TN"
    ],
    "37617": [
        "BLOUNTVILLE",
        "TN"
    ],
    "37618": [
        "BLUFF CITY",
        "TN"
    ],
    "37620": [
        "BRISTOL",
        "TN"
    ],
    "37621": [
        "BRISTOL",
        "TN"
    ],
    "37625": [
        "BRISTOL",
        "TN"
    ],
    "37640": [
        "BUTLER",
        "TN"
    ],
    "37641": [
        "CHUCKEY",
        "TN"
    ],
    "37642": [
        "CHURCH HILL",
        "TN"
    ],
    "37643": [
        "ELIZABETHTON",
        "TN"
    ],
    "37644": [
        "ELIZABETHTON",
        "TN"
    ],
    "37645": [
        "MOUNT CARMEL",
        "TN"
    ],
    "37650": [
        "ERWIN",
        "TN"
    ],
    "37656": [
        "FALL BRANCH",
        "TN"
    ],
    "37657": [
        "FLAG POND",
        "TN"
    ],
    "37658": [
        "HAMPTON",
        "TN"
    ],
    "37659": [
        "JONESBOROUGH",
        "TN"
    ],
    "37660": [
        "KINGSPORT",
        "TN"
    ],
    "37662": [
        "KINGSPORT",
        "TN"
    ],
    "37663": [
        "KINGSPORT",
        "TN"
    ],
    "37664": [
        "KINGSPORT",
        "TN"
    ],
    "37665": [
        "KINGSPORT",
        "TN"
    ],
    "37680": [
        "LAUREL BLOOMERY",
        "TN"
    ],
    "37681": [
        "LIMESTONE",
        "TN"
    ],
    "37682": [
        "MILLIGAN COLLEGE",
        "TN"
    ],
    "37683": [
        "MOUNTAIN CITY",
        "TN"
    ],
    "37684": [
        "MOUNTAIN HOME",
        "TN"
    ],
    "37686": [
        "PINEY FLATS",
        "TN"
    ],
    "37687": [
        "ROAN MOUNTAIN",
        "TN"
    ],
    "37688": [
        "SHADY VALLEY",
        "TN"
    ],
    "37690": [
        "TELFORD",
        "TN"
    ],
    "37691": [
        "TRADE",
        "TN"
    ],
    "37692": [
        "UNICOI",
        "TN"
    ],
    "37694": [
        "WATAUGA",
        "TN"
    ],
    "37701": [
        "ALCOA",
        "TN"
    ],
    "37705": [
        "ANDERSONVILLE",
        "TN"
    ],
    "37707": [
        "ARTHUR",
        "TN"
    ],
    "37708": [
        "BEAN STATION",
        "TN"
    ],
    "37709": [
        "BLAINE",
        "TN"
    ],
    "37710": [
        "BRICEVILLE",
        "TN"
    ],
    "37711": [
        "BULLS GAP",
        "TN"
    ],
    "37713": [
        "BYBEE",
        "TN"
    ],
    "37714": [
        "CARYVILLE",
        "TN"
    ],
    "37715": [
        "CLAIRFIELD",
        "TN"
    ],
    "37716": [
        "CLINTON",
        "TN"
    ],
    "37717": [
        "CLINTON",
        "TN"
    ],
    "37719": [
        "COALFIELD",
        "TN"
    ],
    "37721": [
        "CORRYTON",
        "TN"
    ],
    "37722": [
        "COSBY",
        "TN"
    ],
    "37723": [
        "CRAB ORCHARD",
        "TN"
    ],
    "37724": [
        "CUMBERLAND GAP",
        "TN"
    ],
    "37725": [
        "DANDRIDGE",
        "TN"
    ],
    "37726": [
        "DEER LODGE",
        "TN"
    ],
    "37727": [
        "DEL RIO",
        "TN"
    ],
    "37729": [
        "DUFF",
        "TN"
    ],
    "37730": [
        "EAGAN",
        "TN"
    ],
    "37731": [
        "EIDSON",
        "TN"
    ],
    "37732": [
        "ELGIN",
        "TN"
    ],
    "37733": [
        "RUGBY",
        "TN"
    ],
    "37737": [
        "FRIENDSVILLE",
        "TN"
    ],
    "37738": [
        "GATLINBURG",
        "TN"
    ],
    "37742": [
        "GREENBACK",
        "TN"
    ],
    "37743": [
        "GREENEVILLE",
        "TN"
    ],
    "37744": [
        "GREENEVILLE",
        "TN"
    ],
    "37745": [
        "GREENEVILLE",
        "TN"
    ],
    "37748": [
        "HARRIMAN",
        "TN"
    ],
    "37752": [
        "HARROGATE",
        "TN"
    ],
    "37753": [
        "HARTFORD",
        "TN"
    ],
    "37754": [
        "HEISKELL",
        "TN"
    ],
    "37755": [
        "HELENWOOD",
        "TN"
    ],
    "37756": [
        "HUNTSVILLE",
        "TN"
    ],
    "37757": [
        "JACKSBORO",
        "TN"
    ],
    "37760": [
        "JEFFERSON CITY",
        "TN"
    ],
    "37762": [
        "JELLICO",
        "TN"
    ],
    "37763": [
        "KINGSTON",
        "TN"
    ],
    "37764": [
        "KODAK",
        "TN"
    ],
    "37766": [
        "LA FOLLETTE",
        "TN"
    ],
    "37769": [
        "LAKE CITY",
        "TN"
    ],
    "37770": [
        "LANCING",
        "TN"
    ],
    "37771": [
        "LENOIR CITY",
        "TN"
    ],
    "37772": [
        "LENOIR CITY",
        "TN"
    ],
    "37773": [
        "LONE MOUNTAIN",
        "TN"
    ],
    "37774": [
        "LOUDON",
        "TN"
    ],
    "37777": [
        "LOUISVILLE",
        "TN"
    ],
    "37779": [
        "LUTTRELL",
        "TN"
    ],
    "37801": [
        "MARYVILLE",
        "TN"
    ],
    "37802": [
        "MARYVILLE",
        "TN"
    ],
    "37803": [
        "MARYVILLE",
        "TN"
    ],
    "37804": [
        "MARYVILLE",
        "TN"
    ],
    "37806": [
        "MASCOT",
        "TN"
    ],
    "37807": [
        "MAYNARDVILLE",
        "TN"
    ],
    "37809": [
        "MIDWAY",
        "TN"
    ],
    "37810": [
        "MOHAWK",
        "TN"
    ],
    "37811": [
        "MOORESBURG",
        "TN"
    ],
    "37813": [
        "MORRISTOWN",
        "TN"
    ],
    "37814": [
        "MORRISTOWN",
        "TN"
    ],
    "37815": [
        "MORRISTOWN",
        "TN"
    ],
    "37816": [
        "MORRISTOWN",
        "TN"
    ],
    "37818": [
        "MOSHEIM",
        "TN"
    ],
    "37819": [
        "NEWCOMB",
        "TN"
    ],
    "37820": [
        "NEW MARKET",
        "TN"
    ],
    "37821": [
        "NEWPORT",
        "TN"
    ],
    "37822": [
        "NEWPORT",
        "TN"
    ],
    "37824": [
        "NEW TAZEWELL",
        "TN"
    ],
    "37825": [
        "NEW TAZEWELL",
        "TN"
    ],
    "37826": [
        "NIOTA",
        "TN"
    ],
    "37828": [
        "NORRIS",
        "TN"
    ],
    "37829": [
        "OAKDALE",
        "TN"
    ],
    "37830": [
        "OAK RIDGE",
        "TN"
    ],
    "37831": [
        "OAK RIDGE",
        "TN"
    ],
    "37840": [
        "OLIVER SPRINGS",
        "TN"
    ],
    "37841": [
        "ONEIDA",
        "TN"
    ],
    "37843": [
        "PARROTTSVILLE",
        "TN"
    ],
    "37845": [
        "PETROS",
        "TN"
    ],
    "37846": [
        "PHILADELPHIA",
        "TN"
    ],
    "37847": [
        "PIONEER",
        "TN"
    ],
    "37848": [
        "POWDER SPRINGS",
        "TN"
    ],
    "37849": [
        "POWELL",
        "TN"
    ],
    "37852": [
        "ROBBINS",
        "TN"
    ],
    "37853": [
        "ROCKFORD",
        "TN"
    ],
    "37854": [
        "ROCKWOOD",
        "TN"
    ],
    "37857": [
        "ROGERSVILLE",
        "TN"
    ],
    "37860": [
        "RUSSELLVILLE",
        "TN"
    ],
    "37861": [
        "RUTLEDGE",
        "TN"
    ],
    "37862": [
        "SEVIERVILLE",
        "TN"
    ],
    "37863": [
        "PIGEON FORGE",
        "TN"
    ],
    "37864": [
        "SEVIERVILLE",
        "TN"
    ],
    "37865": [
        "SEYMOUR",
        "TN"
    ],
    "37866": [
        "SHARPS CHAPEL",
        "TN"
    ],
    "37867": [
        "SHAWANEE",
        "TN"
    ],
    "37868": [
        "PIGEON FORGE",
        "TN"
    ],
    "37869": [
        "SNEEDVILLE",
        "TN"
    ],
    "37870": [
        "SPEEDWELL",
        "TN"
    ],
    "37871": [
        "STRAWBERRY PLAINS",
        "TN"
    ],
    "37872": [
        "SUNBRIGHT",
        "TN"
    ],
    "37873": [
        "SURGOINSVILLE",
        "TN"
    ],
    "37874": [
        "SWEETWATER",
        "TN"
    ],
    "37876": [
        "SEVIERVILLE",
        "TN"
    ],
    "37877": [
        "TALBOTT",
        "TN"
    ],
    "37878": [
        "TALLASSEE",
        "TN"
    ],
    "37879": [
        "TAZEWELL",
        "TN"
    ],
    "37880": [
        "TEN MILE",
        "TN"
    ],
    "37881": [
        "THORN HILL",
        "TN"
    ],
    "37882": [
        "TOWNSEND",
        "TN"
    ],
    "37885": [
        "VONORE",
        "TN"
    ],
    "37886": [
        "WALLAND",
        "TN"
    ],
    "37887": [
        "WARTBURG",
        "TN"
    ],
    "37888": [
        "WASHBURN",
        "TN"
    ],
    "37890": [
        "WHITE PINE",
        "TN"
    ],
    "37891": [
        "WHITESBURG",
        "TN"
    ],
    "37892": [
        "WINFIELD",
        "TN"
    ],
    "37901": [
        "KNOXVILLE",
        "TN"
    ],
    "37902": [
        "KNOXVILLE",
        "TN"
    ],
    "37909": [
        "KNOXVILLE",
        "TN"
    ],
    "37912": [
        "KNOXVILLE",
        "TN"
    ],
    "37914": [
        "KNOXVILLE",
        "TN"
    ],
    "37915": [
        "KNOXVILLE",
        "TN"
    ],
    "37916": [
        "KNOXVILLE",
        "TN"
    ],
    "37917": [
        "KNOXVILLE",
        "TN"
    ],
    "37918": [
        "KNOXVILLE",
        "TN"
    ],
    "37919": [
        "KNOXVILLE",
        "TN"
    ],
    "37920": [
        "KNOXVILLE",
        "TN"
    ],
    "37921": [
        "KNOXVILLE",
        "TN"
    ],
    "37922": [
        "KNOXVILLE",
        "TN"
    ],
    "37923": [
        "KNOXVILLE",
        "TN"
    ],
    "37924": [
        "KNOXVILLE",
        "TN"
    ],
    "37927": [
        "KNOXVILLE",
        "TN"
    ],
    "37928": [
        "KNOXVILLE",
        "TN"
    ],
    "37929": [
        "KNOXVILLE",
        "TN"
    ],
    "37930": [
        "KNOXVILLE",
        "TN"
    ],
    "37931": [
        "KNOXVILLE",
        "TN"
    ],
    "37932": [
        "KNOXVILLE",
        "TN"
    ],
    "37933": [
        "KNOXVILLE",
        "TN"
    ],
    "37934": [
        "KNOXVILLE",
        "TN"
    ],
    "37938": [
        "KNOXVILLE",
        "TN"
    ],
    "37939": [
        "KNOXVILLE",
        "TN"
    ],
    "37940": [
        "KNOXVILLE",
        "TN"
    ],
    "37950": [
        "KNOXVILLE",
        "TN"
    ],
    "37996": [
        "KNOXVILLE",
        "TN"
    ],
    "37998": [
        "KNOXVILLE",
        "TN"
    ],
    "38001": [
        "ALAMO",
        "TN"
    ],
    "38002": [
        "ARLINGTON",
        "TN"
    ],
    "38004": [
        "ATOKA",
        "TN"
    ],
    "38006": [
        "BELLS",
        "TN"
    ],
    "38007": [
        "BOGOTA",
        "TN"
    ],
    "38008": [
        "BOLIVAR",
        "TN"
    ],
    "38011": [
        "BRIGHTON",
        "TN"
    ],
    "38012": [
        "BROWNSVILLE",
        "TN"
    ],
    "38014": [
        "BRUNSWICK",
        "TN"
    ],
    "38015": [
        "BURLISON",
        "TN"
    ],
    "38016": [
        "CORDOVA",
        "TN"
    ],
    "38017": [
        "COLLIERVILLE",
        "TN"
    ],
    "38018": [
        "CORDOVA",
        "TN"
    ],
    "38019": [
        "COVINGTON",
        "TN"
    ],
    "38021": [
        "CROCKETT MILLS",
        "TN"
    ],
    "38023": [
        "DRUMMONDS",
        "TN"
    ],
    "38024": [
        "DYERSBURG",
        "TN"
    ],
    "38025": [
        "DYERSBURG",
        "TN"
    ],
    "38027": [
        "COLLIERVILLE",
        "TN"
    ],
    "38028": [
        "EADS",
        "TN"
    ],
    "38029": [
        "ELLENDALE",
        "TN"
    ],
    "38030": [
        "FINLEY",
        "TN"
    ],
    "38034": [
        "FRIENDSHIP",
        "TN"
    ],
    "38036": [
        "GALLAWAY",
        "TN"
    ],
    "38037": [
        "GATES",
        "TN"
    ],
    "38039": [
        "GRAND JUNCTION",
        "TN"
    ],
    "38040": [
        "HALLS",
        "TN"
    ],
    "38041": [
        "HENNING",
        "TN"
    ],
    "38042": [
        "HICKORY VALLEY",
        "TN"
    ],
    "38044": [
        "HORNSBY",
        "TN"
    ],
    "38046": [
        "LA GRANGE",
        "TN"
    ],
    "38047": [
        "LENOX",
        "TN"
    ],
    "38048": [
        "MACON",
        "TN"
    ],
    "38049": [
        "MASON",
        "TN"
    ],
    "38050": [
        "MAURY CITY",
        "TN"
    ],
    "38052": [
        "MIDDLETON",
        "TN"
    ],
    "38053": [
        "MILLINGTON",
        "TN"
    ],
    "38054": [
        "MILLINGTON",
        "TN"
    ],
    "38055": [
        "MILLINGTON",
        "TN"
    ],
    "38057": [
        "MOSCOW",
        "TN"
    ],
    "38058": [
        "MUNFORD",
        "TN"
    ],
    "38059": [
        "NEWBERN",
        "TN"
    ],
    "38060": [
        "OAKLAND",
        "TN"
    ],
    "38061": [
        "POCAHONTAS",
        "TN"
    ],
    "38063": [
        "RIPLEY",
        "TN"
    ],
    "38066": [
        "ROSSVILLE",
        "TN"
    ],
    "38067": [
        "SAULSBURY",
        "TN"
    ],
    "38068": [
        "SOMERVILLE",
        "TN"
    ],
    "38069": [
        "STANTON",
        "TN"
    ],
    "38070": [
        "TIGRETT",
        "TN"
    ],
    "38075": [
        "WHITEVILLE",
        "TN"
    ],
    "38076": [
        "WILLISTON",
        "TN"
    ],
    "38077": [
        "WYNNBURG",
        "TN"
    ],
    "38079": [
        "TIPTONVILLE",
        "TN"
    ],
    "38080": [
        "RIDGELY",
        "TN"
    ],
    "38083": [
        "MILLINGTON",
        "TN"
    ],
    "38088": [
        "CORDOVA",
        "TN"
    ],
    "38101": [
        "MEMPHIS",
        "TN"
    ],
    "38103": [
        "MEMPHIS",
        "TN"
    ],
    "38104": [
        "MEMPHIS",
        "TN"
    ],
    "38105": [
        "MEMPHIS",
        "TN"
    ],
    "38106": [
        "MEMPHIS",
        "TN"
    ],
    "38107": [
        "MEMPHIS",
        "TN"
    ],
    "38108": [
        "MEMPHIS",
        "TN"
    ],
    "38109": [
        "MEMPHIS",
        "TN"
    ],
    "38111": [
        "MEMPHIS",
        "TN"
    ],
    "38112": [
        "MEMPHIS",
        "TN"
    ],
    "38113": [
        "MEMPHIS",
        "TN"
    ],
    "38114": [
        "MEMPHIS",
        "TN"
    ],
    "38115": [
        "MEMPHIS",
        "TN"
    ],
    "38116": [
        "MEMPHIS",
        "TN"
    ],
    "38117": [
        "MEMPHIS",
        "TN"
    ],
    "38118": [
        "MEMPHIS",
        "TN"
    ],
    "38119": [
        "MEMPHIS",
        "TN"
    ],
    "38120": [
        "MEMPHIS",
        "TN"
    ],
    "38122": [
        "MEMPHIS",
        "TN"
    ],
    "38124": [
        "MEMPHIS",
        "TN"
    ],
    "38125": [
        "MEMPHIS",
        "TN"
    ],
    "38126": [
        "MEMPHIS",
        "TN"
    ],
    "38127": [
        "MEMPHIS",
        "TN"
    ],
    "38128": [
        "MEMPHIS",
        "TN"
    ],
    "38130": [
        "MEMPHIS",
        "TN"
    ],
    "38131": [
        "MEMPHIS",
        "TN"
    ],
    "38132": [
        "MEMPHIS",
        "TN"
    ],
    "38133": [
        "MEMPHIS",
        "TN"
    ],
    "38134": [
        "MEMPHIS",
        "TN"
    ],
    "38135": [
        "MEMPHIS",
        "TN"
    ],
    "38137": [
        "MEMPHIS",
        "TN"
    ],
    "38138": [
        "GERMANTOWN",
        "TN"
    ],
    "38139": [
        "GERMANTOWN",
        "TN"
    ],
    "38141": [
        "MEMPHIS",
        "TN"
    ],
    "38145": [
        "MEMPHIS",
        "TN"
    ],
    "38151": [
        "MEMPHIS",
        "TN"
    ],
    "38152": [
        "MEMPHIS",
        "TN"
    ],
    "38157": [
        "MEMPHIS",
        "TN"
    ],
    "38159": [
        "MEMPHIS",
        "TN"
    ],
    "38163": [
        "MEMPHIS",
        "TN"
    ],
    "38167": [
        "MEMPHIS",
        "TN"
    ],
    "38168": [
        "MEMPHIS",
        "TN"
    ],
    "38173": [
        "MEMPHIS",
        "TN"
    ],
    "38174": [
        "MEMPHIS",
        "TN"
    ],
    "38175": [
        "MEMPHIS",
        "TN"
    ],
    "38177": [
        "MEMPHIS",
        "TN"
    ],
    "38181": [
        "MEMPHIS",
        "TN"
    ],
    "38182": [
        "MEMPHIS",
        "TN"
    ],
    "38183": [
        "GERMANTOWN",
        "TN"
    ],
    "38184": [
        "MEMPHIS",
        "TN"
    ],
    "38186": [
        "MEMPHIS",
        "TN"
    ],
    "38187": [
        "MEMPHIS",
        "TN"
    ],
    "38190": [
        "MEMPHIS",
        "TN"
    ],
    "38193": [
        "MEMPHIS",
        "TN"
    ],
    "38194": [
        "MEMPHIS",
        "TN"
    ],
    "38197": [
        "MEMPHIS",
        "TN"
    ],
    "38201": [
        "MC KENZIE",
        "TN"
    ],
    "38220": [
        "ATWOOD",
        "TN"
    ],
    "38221": [
        "BIG SANDY",
        "TN"
    ],
    "38222": [
        "BUCHANAN",
        "TN"
    ],
    "38223": [
        "COMO",
        "TN"
    ],
    "38224": [
        "COTTAGE GROVE",
        "TN"
    ],
    "38225": [
        "DRESDEN",
        "TN"
    ],
    "38226": [
        "DUKEDOM",
        "TN"
    ],
    "38229": [
        "GLEASON",
        "TN"
    ],
    "38230": [
        "GREENFIELD",
        "TN"
    ],
    "38231": [
        "HENRY",
        "TN"
    ],
    "38232": [
        "HORNBEAK",
        "TN"
    ],
    "38233": [
        "KENTON",
        "TN"
    ],
    "38235": [
        "MC LEMORESVILLE",
        "TN"
    ],
    "38236": [
        "MANSFIELD",
        "TN"
    ],
    "38237": [
        "MARTIN",
        "TN"
    ],
    "38238": [
        "MARTIN",
        "TN"
    ],
    "38240": [
        "OBION",
        "TN"
    ],
    "38241": [
        "PALMERSVILLE",
        "TN"
    ],
    "38242": [
        "PARIS",
        "TN"
    ],
    "38251": [
        "PURYEAR",
        "TN"
    ],
    "38253": [
        "RIVES",
        "TN"
    ],
    "38254": [
        "SAMBURG",
        "TN"
    ],
    "38255": [
        "SHARON",
        "TN"
    ],
    "38256": [
        "SPRINGVILLE",
        "TN"
    ],
    "38257": [
        "SOUTH FULTON",
        "TN"
    ],
    "38258": [
        "TREZEVANT",
        "TN"
    ],
    "38259": [
        "TRIMBLE",
        "TN"
    ],
    "38260": [
        "TROY",
        "TN"
    ],
    "38261": [
        "UNION CITY",
        "TN"
    ],
    "38271": [
        "WOODLAND MILLS",
        "TN"
    ],
    "38281": [
        "UNION CITY",
        "TN"
    ],
    "38301": [
        "JACKSON",
        "TN"
    ],
    "38302": [
        "JACKSON",
        "TN"
    ],
    "38303": [
        "JACKSON",
        "TN"
    ],
    "38305": [
        "JACKSON",
        "TN"
    ],
    "38308": [
        "JACKSON",
        "TN"
    ],
    "38310": [
        "ADAMSVILLE",
        "TN"
    ],
    "38311": [
        "BATH SPRINGS",
        "TN"
    ],
    "38313": [
        "BEECH BLUFF",
        "TN"
    ],
    "38314": [
        "JACKSON",
        "TN"
    ],
    "38315": [
        "BETHEL SPRINGS",
        "TN"
    ],
    "38316": [
        "BRADFORD",
        "TN"
    ],
    "38317": [
        "BRUCETON",
        "TN"
    ],
    "38320": [
        "CAMDEN",
        "TN"
    ],
    "38321": [
        "CEDAR GROVE",
        "TN"
    ],
    "38324": [
        "CLARKSBURG",
        "TN"
    ],
    "38326": [
        "COUNCE",
        "TN"
    ],
    "38327": [
        "CRUMP",
        "TN"
    ],
    "38328": [
        "DARDEN",
        "TN"
    ],
    "38329": [
        "DECATURVILLE",
        "TN"
    ],
    "38330": [
        "DYER",
        "TN"
    ],
    "38332": [
        "ENVILLE",
        "TN"
    ],
    "38333": [
        "EVA",
        "TN"
    ],
    "38334": [
        "FINGER",
        "TN"
    ],
    "38337": [
        "GADSDEN",
        "TN"
    ],
    "38338": [
        "GIBSON",
        "TN"
    ],
    "38339": [
        "GUYS",
        "TN"
    ],
    "38340": [
        "HENDERSON",
        "TN"
    ],
    "38341": [
        "HOLLADAY",
        "TN"
    ],
    "38342": [
        "HOLLOW ROCK",
        "TN"
    ],
    "38343": [
        "HUMBOLDT",
        "TN"
    ],
    "38344": [
        "HUNTINGDON",
        "TN"
    ],
    "38345": [
        "HURON",
        "TN"
    ],
    "38346": [
        "IDLEWILD",
        "TN"
    ],
    "38347": [
        "JACKS CREEK",
        "TN"
    ],
    "38348": [
        "LAVINIA",
        "TN"
    ],
    "38351": [
        "LEXINGTON",
        "TN"
    ],
    "38352": [
        "LURAY",
        "TN"
    ],
    "38355": [
        "MEDINA",
        "TN"
    ],
    "38356": [
        "MEDON",
        "TN"
    ],
    "38357": [
        "MICHIE",
        "TN"
    ],
    "38358": [
        "MILAN",
        "TN"
    ],
    "38359": [
        "MILLEDGEVILLE",
        "TN"
    ],
    "38361": [
        "MORRIS CHAPEL",
        "TN"
    ],
    "38362": [
        "OAKFIELD",
        "TN"
    ],
    "38363": [
        "PARSONS",
        "TN"
    ],
    "38365": [
        "PICKWICK DAM",
        "TN"
    ],
    "38366": [
        "PINSON",
        "TN"
    ],
    "38367": [
        "RAMER",
        "TN"
    ],
    "38368": [
        "REAGAN",
        "TN"
    ],
    "38369": [
        "RUTHERFORD",
        "TN"
    ],
    "38370": [
        "SALTILLO",
        "TN"
    ],
    "38371": [
        "SARDIS",
        "TN"
    ],
    "38372": [
        "SAVANNAH",
        "TN"
    ],
    "38374": [
        "SCOTTS HILL",
        "TN"
    ],
    "38375": [
        "SELMER",
        "TN"
    ],
    "38376": [
        "SHILOH",
        "TN"
    ],
    "38378": [
        "SPRING CREEK",
        "TN"
    ],
    "38379": [
        "STANTONVILLE",
        "TN"
    ],
    "38380": [
        "SUGAR TREE",
        "TN"
    ],
    "38381": [
        "TOONE",
        "TN"
    ],
    "38382": [
        "TRENTON",
        "TN"
    ],
    "38388": [
        "WILDERSVILLE",
        "TN"
    ],
    "38389": [
        "YORKVILLE",
        "TN"
    ],
    "38390": [
        "YUMA",
        "TN"
    ],
    "38391": [
        "DENMARK",
        "TN"
    ],
    "38392": [
        "MERCER",
        "TN"
    ],
    "38401": [
        "COLUMBIA",
        "TN"
    ],
    "38402": [
        "COLUMBIA",
        "TN"
    ],
    "38425": [
        "CLIFTON",
        "TN"
    ],
    "38449": [
        "ARDMORE",
        "TN"
    ],
    "38450": [
        "COLLINWOOD",
        "TN"
    ],
    "38451": [
        "CULLEOKA",
        "TN"
    ],
    "38452": [
        "CYPRESS INN",
        "TN"
    ],
    "38453": [
        "DELLROSE",
        "TN"
    ],
    "38454": [
        "DUCK RIVER",
        "TN"
    ],
    "38455": [
        "ELKTON",
        "TN"
    ],
    "38456": [
        "ETHRIDGE",
        "TN"
    ],
    "38457": [
        "FIVE POINTS",
        "TN"
    ],
    "38459": [
        "FRANKEWING",
        "TN"
    ],
    "38460": [
        "GOODSPRING",
        "TN"
    ],
    "38461": [
        "HAMPSHIRE",
        "TN"
    ],
    "38462": [
        "HOHENWALD",
        "TN"
    ],
    "38463": [
        "IRON CITY",
        "TN"
    ],
    "38464": [
        "LAWRENCEBURG",
        "TN"
    ],
    "38468": [
        "LEOMA",
        "TN"
    ],
    "38469": [
        "LORETTO",
        "TN"
    ],
    "38471": [
        "LUTTS",
        "TN"
    ],
    "38472": [
        "LYNNVILLE",
        "TN"
    ],
    "38473": [
        "MINOR HILL",
        "TN"
    ],
    "38474": [
        "MOUNT PLEASANT",
        "TN"
    ],
    "38475": [
        "OLIVEHILL",
        "TN"
    ],
    "38476": [
        "PRIMM SPRINGS",
        "TN"
    ],
    "38477": [
        "PROSPECT",
        "TN"
    ],
    "38478": [
        "PULASKI",
        "TN"
    ],
    "38481": [
        "SAINT JOSEPH",
        "TN"
    ],
    "38482": [
        "SANTA FE",
        "TN"
    ],
    "38483": [
        "SUMMERTOWN",
        "TN"
    ],
    "38485": [
        "WAYNESBORO",
        "TN"
    ],
    "38486": [
        "WESTPOINT",
        "TN"
    ],
    "38487": [
        "WILLIAMSPORT",
        "TN"
    ],
    "38488": [
        "TAFT",
        "TN"
    ],
    "38501": [
        "COOKEVILLE",
        "TN"
    ],
    "38502": [
        "COOKEVILLE",
        "TN"
    ],
    "38503": [
        "COOKEVILLE",
        "TN"
    ],
    "38504": [
        "ALLARDT",
        "TN"
    ],
    "38505": [
        "COOKEVILLE",
        "TN"
    ],
    "38506": [
        "COOKEVILLE",
        "TN"
    ],
    "38541": [
        "ALLONS",
        "TN"
    ],
    "38543": [
        "ALPINE",
        "TN"
    ],
    "38544": [
        "BAXTER",
        "TN"
    ],
    "38545": [
        "BLOOMINGTON SPRINGS",
        "TN"
    ],
    "38547": [
        "BRUSH CREEK",
        "TN"
    ],
    "38548": [
        "BUFFALO VALLEY",
        "TN"
    ],
    "38549": [
        "BYRDSTOWN",
        "TN"
    ],
    "38550": [
        "CAMPAIGN",
        "TN"
    ],
    "38551": [
        "CELINA",
        "TN"
    ],
    "38552": [
        "CHESTNUT MOUND",
        "TN"
    ],
    "38553": [
        "CLARKRANGE",
        "TN"
    ],
    "38554": [
        "CRAWFORD",
        "TN"
    ],
    "38555": [
        "CROSSVILLE",
        "TN"
    ],
    "38556": [
        "JAMESTOWN",
        "TN"
    ],
    "38557": [
        "CROSSVILLE",
        "TN"
    ],
    "38558": [
        "CROSSVILLE",
        "TN"
    ],
    "38559": [
        "DOYLE",
        "TN"
    ],
    "38560": [
        "ELMWOOD",
        "TN"
    ],
    "38562": [
        "GAINESBORO",
        "TN"
    ],
    "38563": [
        "GORDONSVILLE",
        "TN"
    ],
    "38564": [
        "GRANVILLE",
        "TN"
    ],
    "38565": [
        "GRIMSLEY",
        "TN"
    ],
    "38567": [
        "HICKMAN",
        "TN"
    ],
    "38568": [
        "HILHAM",
        "TN"
    ],
    "38569": [
        "LANCASTER",
        "TN"
    ],
    "38570": [
        "LIVINGSTON",
        "TN"
    ],
    "38571": [
        "CROSSVILLE",
        "TN"
    ],
    "38572": [
        "CROSSVILLE",
        "TN"
    ],
    "38573": [
        "MONROE",
        "TN"
    ],
    "38574": [
        "MONTEREY",
        "TN"
    ],
    "38575": [
        "MOSS",
        "TN"
    ],
    "38577": [
        "PALL MALL",
        "TN"
    ],
    "38578": [
        "PLEASANT HILL",
        "TN"
    ],
    "38579": [
        "QUEBECK",
        "TN"
    ],
    "38580": [
        "RICKMAN",
        "TN"
    ],
    "38581": [
        "ROCK ISLAND",
        "TN"
    ],
    "38582": [
        "SILVER POINT",
        "TN"
    ],
    "38583": [
        "SPARTA",
        "TN"
    ],
    "38585": [
        "SPENCER",
        "TN"
    ],
    "38587": [
        "WALLING",
        "TN"
    ],
    "38588": [
        "WHITLEYVILLE",
        "TN"
    ],
    "38601": [
        "ABBEVILLE",
        "MS"
    ],
    "38603": [
        "ASHLAND",
        "MS"
    ],
    "38606": [
        "BATESVILLE",
        "MS"
    ],
    "38609": [
        "MARKS",
        "MS"
    ],
    "38610": [
        "BLUE MOUNTAIN",
        "MS"
    ],
    "38611": [
        "BYHALIA",
        "MS"
    ],
    "38614": [
        "CLARKSDALE",
        "MS"
    ],
    "38617": [
        "COAHOMA",
        "MS"
    ],
    "38618": [
        "COLDWATER",
        "MS"
    ],
    "38619": [
        "COMO",
        "MS"
    ],
    "38620": [
        "COURTLAND",
        "MS"
    ],
    "38621": [
        "CRENSHAW",
        "MS"
    ],
    "38622": [
        "CROWDER",
        "MS"
    ],
    "38623": [
        "DARLING",
        "MS"
    ],
    "38625": [
        "DUMAS",
        "MS"
    ],
    "38626": [
        "DUNDEE",
        "MS"
    ],
    "38627": [
        "ETTA",
        "MS"
    ],
    "38629": [
        "FALKNER",
        "MS"
    ],
    "38631": [
        "FRIARS POINT",
        "MS"
    ],
    "38632": [
        "HERNANDO",
        "MS"
    ],
    "38633": [
        "HICKORY FLAT",
        "MS"
    ],
    "38634": [
        "HOLLY SPRINGS",
        "MS"
    ],
    "38635": [
        "HOLLY SPRINGS",
        "MS"
    ],
    "38637": [
        "HORN LAKE",
        "MS"
    ],
    "38638": [
        "INDEPENDENCE",
        "MS"
    ],
    "38639": [
        "JONESTOWN",
        "MS"
    ],
    "38641": [
        "LAKE CORMORANT",
        "MS"
    ],
    "38642": [
        "LAMAR",
        "MS"
    ],
    "38643": [
        "LAMBERT",
        "MS"
    ],
    "38644": [
        "LULA",
        "MS"
    ],
    "38645": [
        "LYON",
        "MS"
    ],
    "38646": [
        "MARKS",
        "MS"
    ],
    "38647": [
        "MICHIGAN CITY",
        "MS"
    ],
    "38649": [
        "MOUNT PLEASANT",
        "MS"
    ],
    "38650": [
        "MYRTLE",
        "MS"
    ],
    "38651": [
        "NESBIT",
        "MS"
    ],
    "38652": [
        "NEW ALBANY",
        "MS"
    ],
    "38654": [
        "OLIVE BRANCH",
        "MS"
    ],
    "38655": [
        "OXFORD",
        "MS"
    ],
    "38658": [
        "POPE",
        "MS"
    ],
    "38659": [
        "POTTS CAMP",
        "MS"
    ],
    "38661": [
        "RED BANKS",
        "MS"
    ],
    "38663": [
        "RIPLEY",
        "MS"
    ],
    "38664": [
        "ROBINSONVILLE",
        "MS"
    ],
    "38665": [
        "SARAH",
        "MS"
    ],
    "38666": [
        "SARDIS",
        "MS"
    ],
    "38668": [
        "SENATOBIA",
        "MS"
    ],
    "38670": [
        "SLEDGE",
        "MS"
    ],
    "38671": [
        "SOUTHAVEN",
        "MS"
    ],
    "38672": [
        "SOUTHAVEN",
        "MS"
    ],
    "38673": [
        "TAYLOR",
        "MS"
    ],
    "38674": [
        "TIPLERSVILLE",
        "MS"
    ],
    "38676": [
        "TUNICA",
        "MS"
    ],
    "38677": [
        "UNIVERSITY",
        "MS"
    ],
    "38679": [
        "VICTORIA",
        "MS"
    ],
    "38680": [
        "WALLS",
        "MS"
    ],
    "38683": [
        "WALNUT",
        "MS"
    ],
    "38685": [
        "WATERFORD",
        "MS"
    ],
    "38701": [
        "GREENVILLE",
        "MS"
    ],
    "38702": [
        "GREENVILLE",
        "MS"
    ],
    "38703": [
        "GREENVILLE",
        "MS"
    ],
    "38704": [
        "GREENVILLE",
        "MS"
    ],
    "38720": [
        "ALLIGATOR",
        "MS"
    ],
    "38721": [
        "ANGUILLA",
        "MS"
    ],
    "38722": [
        "ARCOLA",
        "MS"
    ],
    "38723": [
        "AVON",
        "MS"
    ],
    "38725": [
        "BENOIT",
        "MS"
    ],
    "38726": [
        "BEULAH",
        "MS"
    ],
    "38730": [
        "BOYLE",
        "MS"
    ],
    "38731": [
        "CHATHAM",
        "MS"
    ],
    "38732": [
        "CLEVELAND",
        "MS"
    ],
    "38733": [
        "CLEVELAND",
        "MS"
    ],
    "38737": [
        "DREW",
        "MS"
    ],
    "38738": [
        "PARCHMAN",
        "MS"
    ],
    "38739": [
        "DUBLIN",
        "MS"
    ],
    "38740": [
        "DUNCAN",
        "MS"
    ],
    "38744": [
        "GLEN ALLAN",
        "MS"
    ],
    "38746": [
        "GUNNISON",
        "MS"
    ],
    "38748": [
        "HOLLANDALE",
        "MS"
    ],
    "38749": [
        "INDIANOLA",
        "MS"
    ],
    "38751": [
        "INDIANOLA",
        "MS"
    ],
    "38753": [
        "INVERNESS",
        "MS"
    ],
    "38754": [
        "ISOLA",
        "MS"
    ],
    "38756": [
        "LELAND",
        "MS"
    ],
    "38759": [
        "MERIGOLD",
        "MS"
    ],
    "38760": [
        "METCALFE",
        "MS"
    ],
    "38761": [
        "MOORHEAD",
        "MS"
    ],
    "38762": [
        "MOUND BAYOU",
        "MS"
    ],
    "38764": [
        "PACE",
        "MS"
    ],
    "38765": [
        "PANTHER BURN",
        "MS"
    ],
    "38767": [
        "RENA LARA",
        "MS"
    ],
    "38768": [
        "ROME",
        "MS"
    ],
    "38769": [
        "ROSEDALE",
        "MS"
    ],
    "38771": [
        "RULEVILLE",
        "MS"
    ],
    "38772": [
        "SCOTT",
        "MS"
    ],
    "38773": [
        "SHAW",
        "MS"
    ],
    "38774": [
        "SHELBY",
        "MS"
    ],
    "38776": [
        "STONEVILLE",
        "MS"
    ],
    "38778": [
        "SUNFLOWER",
        "MS"
    ],
    "38780": [
        "WAYSIDE",
        "MS"
    ],
    "38782": [
        "WINTERVILLE",
        "MS"
    ],
    "38801": [
        "TUPELO",
        "MS"
    ],
    "38802": [
        "TUPELO",
        "MS"
    ],
    "38803": [
        "TUPELO",
        "MS"
    ],
    "38804": [
        "TUPELO",
        "MS"
    ],
    "38820": [
        "ALGOMA",
        "MS"
    ],
    "38821": [
        "AMORY",
        "MS"
    ],
    "38824": [
        "BALDWYN",
        "MS"
    ],
    "38825": [
        "BECKER",
        "MS"
    ],
    "38826": [
        "BELDEN",
        "MS"
    ],
    "38827": [
        "BELMONT",
        "MS"
    ],
    "38828": [
        "BLUE SPRINGS",
        "MS"
    ],
    "38829": [
        "BOONEVILLE",
        "MS"
    ],
    "38833": [
        "BURNSVILLE",
        "MS"
    ],
    "38834": [
        "CORINTH",
        "MS"
    ],
    "38835": [
        "CORINTH",
        "MS"
    ],
    "38838": [
        "DENNIS",
        "MS"
    ],
    "38839": [
        "DERMA",
        "MS"
    ],
    "38841": [
        "ECRU",
        "MS"
    ],
    "38843": [
        "FULTON",
        "MS"
    ],
    "38844": [
        "GATTMAN",
        "MS"
    ],
    "38846": [
        "GLEN",
        "MS"
    ],
    "38847": [
        "GOLDEN",
        "MS"
    ],
    "38848": [
        "GREENWOOD SPRINGS",
        "MS"
    ],
    "38849": [
        "GUNTOWN",
        "MS"
    ],
    "38850": [
        "HOULKA",
        "MS"
    ],
    "38851": [
        "HOUSTON",
        "MS"
    ],
    "38852": [
        "IUKA",
        "MS"
    ],
    "38855": [
        "MANTACHIE",
        "MS"
    ],
    "38856": [
        "MARIETTA",
        "MS"
    ],
    "38857": [
        "MOOREVILLE",
        "MS"
    ],
    "38858": [
        "NETTLETON",
        "MS"
    ],
    "38859": [
        "NEW SITE",
        "MS"
    ],
    "38860": [
        "OKOLONA",
        "MS"
    ],
    "38862": [
        "PLANTERSVILLE",
        "MS"
    ],
    "38863": [
        "PONTOTOC",
        "MS"
    ],
    "38864": [
        "RANDOLPH",
        "MS"
    ],
    "38865": [
        "RIENZI",
        "MS"
    ],
    "38866": [
        "SALTILLO",
        "MS"
    ],
    "38868": [
        "SHANNON",
        "MS"
    ],
    "38869": [
        "SHERMAN",
        "MS"
    ],
    "38870": [
        "SMITHVILLE",
        "MS"
    ],
    "38871": [
        "THAXTON",
        "MS"
    ],
    "38873": [
        "TISHOMINGO",
        "MS"
    ],
    "38874": [
        "TOCCOPOLA",
        "MS"
    ],
    "38875": [
        "TREBLOC",
        "MS"
    ],
    "38876": [
        "TREMONT",
        "MS"
    ],
    "38877": [
        "VAN VLEET",
        "MS"
    ],
    "38878": [
        "VARDAMAN",
        "MS"
    ],
    "38879": [
        "VERONA",
        "MS"
    ],
    "38880": [
        "WHEELER",
        "MS"
    ],
    "38901": [
        "GRENADA",
        "MS"
    ],
    "38902": [
        "GRENADA",
        "MS"
    ],
    "38913": [
        "BANNER",
        "MS"
    ],
    "38914": [
        "BIG CREEK",
        "MS"
    ],
    "38915": [
        "BRUCE",
        "MS"
    ],
    "38916": [
        "CALHOUN CITY",
        "MS"
    ],
    "38917": [
        "CARROLLTON",
        "MS"
    ],
    "38920": [
        "CASCILLA",
        "MS"
    ],
    "38921": [
        "CHARLESTON",
        "MS"
    ],
    "38922": [
        "COFFEEVILLE",
        "MS"
    ],
    "38923": [
        "COILA",
        "MS"
    ],
    "38924": [
        "CRUGER",
        "MS"
    ],
    "38925": [
        "DUCK HILL",
        "MS"
    ],
    "38926": [
        "ELLIOTT",
        "MS"
    ],
    "38927": [
        "ENID",
        "MS"
    ],
    "38928": [
        "GLENDORA",
        "MS"
    ],
    "38929": [
        "GORE SPRINGS",
        "MS"
    ],
    "38930": [
        "GREENWOOD",
        "MS"
    ],
    "38935": [
        "GREENWOOD",
        "MS"
    ],
    "38940": [
        "HOLCOMB",
        "MS"
    ],
    "38941": [
        "ITTA BENA",
        "MS"
    ],
    "38943": [
        "MC CARLEY",
        "MS"
    ],
    "38944": [
        "MINTER CITY",
        "MS"
    ],
    "38946": [
        "MORGAN CITY",
        "MS"
    ],
    "38947": [
        "NORTH CARROLLTON",
        "MS"
    ],
    "38948": [
        "OAKLAND",
        "MS"
    ],
    "38949": [
        "PARIS",
        "MS"
    ],
    "38950": [
        "PHILIPP",
        "MS"
    ],
    "38951": [
        "PITTSBORO",
        "MS"
    ],
    "38952": [
        "SCHLATER",
        "MS"
    ],
    "38953": [
        "SCOBEY",
        "MS"
    ],
    "38954": [
        "SIDON",
        "MS"
    ],
    "38955": [
        "SLATE SPRING",
        "MS"
    ],
    "38957": [
        "SUMNER",
        "MS"
    ],
    "38960": [
        "TIE PLANT",
        "MS"
    ],
    "38961": [
        "TILLATOBA",
        "MS"
    ],
    "38963": [
        "TUTWILER",
        "MS"
    ],
    "38964": [
        "VANCE",
        "MS"
    ],
    "38965": [
        "WATER VALLEY",
        "MS"
    ],
    "38966": [
        "WEBB",
        "MS"
    ],
    "38967": [
        "WINONA",
        "MS"
    ],
    "39038": [
        "BELZONI",
        "MS"
    ],
    "39039": [
        "BENTON",
        "MS"
    ],
    "39040": [
        "BENTONIA",
        "MS"
    ],
    "39041": [
        "BOLTON",
        "MS"
    ],
    "39042": [
        "BRANDON",
        "MS"
    ],
    "39043": [
        "BRANDON",
        "MS"
    ],
    "39044": [
        "BRAXTON",
        "MS"
    ],
    "39045": [
        "CAMDEN",
        "MS"
    ],
    "39046": [
        "CANTON",
        "MS"
    ],
    "39047": [
        "BRANDON",
        "MS"
    ],
    "39051": [
        "CARTHAGE",
        "MS"
    ],
    "39054": [
        "CARY",
        "MS"
    ],
    "39056": [
        "CLINTON",
        "MS"
    ],
    "39057": [
        "CONEHATTA",
        "MS"
    ],
    "39058": [
        "CLINTON",
        "MS"
    ],
    "39059": [
        "CRYSTAL SPRINGS",
        "MS"
    ],
    "39060": [
        "CLINTON",
        "MS"
    ],
    "39061": [
        "DELTA CITY",
        "MS"
    ],
    "39062": [
        "D LO",
        "MS"
    ],
    "39063": [
        "DURANT",
        "MS"
    ],
    "39066": [
        "EDWARDS",
        "MS"
    ],
    "39067": [
        "ETHEL",
        "MS"
    ],
    "39069": [
        "FAYETTE",
        "MS"
    ],
    "39071": [
        "FLORA",
        "MS"
    ],
    "39072": [
        "FLORA",
        "MS"
    ],
    "39073": [
        "FLORENCE",
        "MS"
    ],
    "39074": [
        "FOREST",
        "MS"
    ],
    "39077": [
        "GALLMAN",
        "MS"
    ],
    "39078": [
        "GEORGETOWN",
        "MS"
    ],
    "39079": [
        "GOODMAN",
        "MS"
    ],
    "39080": [
        "HARPERVILLE",
        "MS"
    ],
    "39082": [
        "HARRISVILLE",
        "MS"
    ],
    "39083": [
        "HAZLEHURST",
        "MS"
    ],
    "39086": [
        "HERMANVILLE",
        "MS"
    ],
    "39087": [
        "HILLSBORO",
        "MS"
    ],
    "39088": [
        "HOLLY BLUFF",
        "MS"
    ],
    "39090": [
        "KOSCIUSKO",
        "MS"
    ],
    "39092": [
        "LAKE",
        "MS"
    ],
    "39094": [
        "LENA",
        "MS"
    ],
    "39095": [
        "LEXINGTON",
        "MS"
    ],
    "39096": [
        "LORMAN",
        "MS"
    ],
    "39097": [
        "LOUISE",
        "MS"
    ],
    "39108": [
        "MC COOL",
        "MS"
    ],
    "39109": [
        "MADDEN",
        "MS"
    ],
    "39110": [
        "MADISON",
        "MS"
    ],
    "39111": [
        "MAGEE",
        "MS"
    ],
    "39113": [
        "MAYERSVILLE",
        "MS"
    ],
    "39114": [
        "MENDENHALL",
        "MS"
    ],
    "39115": [
        "MIDNIGHT",
        "MS"
    ],
    "39116": [
        "MIZE",
        "MS"
    ],
    "39117": [
        "MORTON",
        "MS"
    ],
    "39119": [
        "MOUNT OLIVE",
        "MS"
    ],
    "39120": [
        "NATCHEZ",
        "MS"
    ],
    "39121": [
        "NATCHEZ",
        "MS"
    ],
    "39122": [
        "NATCHEZ",
        "MS"
    ],
    "39130": [
        "MADISON",
        "MS"
    ],
    "39140": [
        "NEWHEBRON",
        "MS"
    ],
    "39144": [
        "PATTISON",
        "MS"
    ],
    "39145": [
        "PELAHATCHIE",
        "MS"
    ],
    "39146": [
        "PICKENS",
        "MS"
    ],
    "39148": [
        "PINEY WOODS",
        "MS"
    ],
    "39149": [
        "PINOLA",
        "MS"
    ],
    "39150": [
        "PORT GIBSON",
        "MS"
    ],
    "39151": [
        "PUCKETT",
        "MS"
    ],
    "39152": [
        "PULASKI",
        "MS"
    ],
    "39153": [
        "RALEIGH",
        "MS"
    ],
    "39154": [
        "RAYMOND",
        "MS"
    ],
    "39156": [
        "REDWOOD",
        "MS"
    ],
    "39157": [
        "RIDGELAND",
        "MS"
    ],
    "39158": [
        "RIDGELAND",
        "MS"
    ],
    "39159": [
        "ROLLING FORK",
        "MS"
    ],
    "39160": [
        "SALLIS",
        "MS"
    ],
    "39161": [
        "SANDHILL",
        "MS"
    ],
    "39162": [
        "SATARTIA",
        "MS"
    ],
    "39163": [
        "SHARON",
        "MS"
    ],
    "39165": [
        "SIBLEY",
        "MS"
    ],
    "39166": [
        "SILVER CITY",
        "MS"
    ],
    "39167": [
        "STAR",
        "MS"
    ],
    "39168": [
        "TAYLORSVILLE",
        "MS"
    ],
    "39169": [
        "TCHULA",
        "MS"
    ],
    "39170": [
        "TERRY",
        "MS"
    ],
    "39171": [
        "THOMASTOWN",
        "MS"
    ],
    "39173": [
        "TINSLEY",
        "MS"
    ],
    "39174": [
        "TOUGALOO",
        "MS"
    ],
    "39175": [
        "UTICA",
        "MS"
    ],
    "39176": [
        "VAIDEN",
        "MS"
    ],
    "39177": [
        "VALLEY PARK",
        "MS"
    ],
    "39179": [
        "VAUGHAN",
        "MS"
    ],
    "39180": [
        "VICKSBURG",
        "MS"
    ],
    "39181": [
        "VICKSBURG",
        "MS"
    ],
    "39182": [
        "VICKSBURG",
        "MS"
    ],
    "39183": [
        "VICKSBURG",
        "MS"
    ],
    "39189": [
        "WALNUT GROVE",
        "MS"
    ],
    "39190": [
        "WASHINGTON",
        "MS"
    ],
    "39191": [
        "WESSON",
        "MS"
    ],
    "39192": [
        "WEST",
        "MS"
    ],
    "39193": [
        "WHITFIELD",
        "MS"
    ],
    "39194": [
        "YAZOO CITY",
        "MS"
    ],
    "39201": [
        "JACKSON",
        "MS"
    ],
    "39202": [
        "JACKSON",
        "MS"
    ],
    "39203": [
        "JACKSON",
        "MS"
    ],
    "39204": [
        "JACKSON",
        "MS"
    ],
    "39205": [
        "JACKSON",
        "MS"
    ],
    "39206": [
        "JACKSON",
        "MS"
    ],
    "39207": [
        "JACKSON",
        "MS"
    ],
    "39208": [
        "PEARL",
        "MS"
    ],
    "39209": [
        "JACKSON",
        "MS"
    ],
    "39210": [
        "JACKSON",
        "MS"
    ],
    "39211": [
        "JACKSON",
        "MS"
    ],
    "39212": [
        "JACKSON",
        "MS"
    ],
    "39213": [
        "JACKSON",
        "MS"
    ],
    "39215": [
        "JACKSON",
        "MS"
    ],
    "39216": [
        "JACKSON",
        "MS"
    ],
    "39217": [
        "JACKSON",
        "MS"
    ],
    "39218": [
        "RICHLAND",
        "MS"
    ],
    "39225": [
        "JACKSON",
        "MS"
    ],
    "39232": [
        "FLOWOOD",
        "MS"
    ],
    "39236": [
        "JACKSON",
        "MS"
    ],
    "39269": [
        "JACKSON",
        "MS"
    ],
    "39272": [
        "BYRAM",
        "MS"
    ],
    "39282": [
        "JACKSON",
        "MS"
    ],
    "39283": [
        "JACKSON",
        "MS"
    ],
    "39284": [
        "JACKSON",
        "MS"
    ],
    "39286": [
        "JACKSON",
        "MS"
    ],
    "39288": [
        "PEARL",
        "MS"
    ],
    "39289": [
        "JACKSON",
        "MS"
    ],
    "39296": [
        "JACKSON",
        "MS"
    ],
    "39298": [
        "JACKSON",
        "MS"
    ],
    "39301": [
        "MERIDIAN",
        "MS"
    ],
    "39302": [
        "MERIDIAN",
        "MS"
    ],
    "39303": [
        "MERIDIAN",
        "MS"
    ],
    "39304": [
        "MERIDIAN",
        "MS"
    ],
    "39305": [
        "MERIDIAN",
        "MS"
    ],
    "39307": [
        "MERIDIAN",
        "MS"
    ],
    "39309": [
        "MERIDIAN",
        "MS"
    ],
    "39320": [
        "BAILEY",
        "MS"
    ],
    "39322": [
        "BUCKATUNNA",
        "MS"
    ],
    "39323": [
        "CHUNKY",
        "MS"
    ],
    "39324": [
        "CLARA",
        "MS"
    ],
    "39325": [
        "COLLINSVILLE",
        "MS"
    ],
    "39326": [
        "DALEVILLE",
        "MS"
    ],
    "39327": [
        "DECATUR",
        "MS"
    ],
    "39328": [
        "DE KALB",
        "MS"
    ],
    "39330": [
        "ENTERPRISE",
        "MS"
    ],
    "39332": [
        "HICKORY",
        "MS"
    ],
    "39335": [
        "LAUDERDALE",
        "MS"
    ],
    "39336": [
        "LAWRENCE",
        "MS"
    ],
    "39337": [
        "LITTLE ROCK",
        "MS"
    ],
    "39338": [
        "LOUIN",
        "MS"
    ],
    "39339": [
        "LOUISVILLE",
        "MS"
    ],
    "39341": [
        "MACON",
        "MS"
    ],
    "39342": [
        "MARION",
        "MS"
    ],
    "39345": [
        "NEWTON",
        "MS"
    ],
    "39346": [
        "NOXAPATER",
        "MS"
    ],
    "39347": [
        "PACHUTA",
        "MS"
    ],
    "39348": [
        "PAULDING",
        "MS"
    ],
    "39350": [
        "PHILADELPHIA",
        "MS"
    ],
    "39352": [
        "PORTERVILLE",
        "MS"
    ],
    "39354": [
        "PRESTON",
        "MS"
    ],
    "39355": [
        "QUITMAN",
        "MS"
    ],
    "39356": [
        "ROSE HILL",
        "MS"
    ],
    "39358": [
        "SCOOBA",
        "MS"
    ],
    "39359": [
        "SEBASTOPOL",
        "MS"
    ],
    "39360": [
        "SHUBUTA",
        "MS"
    ],
    "39361": [
        "SHUQUALAK",
        "MS"
    ],
    "39362": [
        "STATE LINE",
        "MS"
    ],
    "39363": [
        "STONEWALL",
        "MS"
    ],
    "39364": [
        "TOOMSUBA",
        "MS"
    ],
    "39365": [
        "UNION",
        "MS"
    ],
    "39366": [
        "VOSSBURG",
        "MS"
    ],
    "39367": [
        "WAYNESBORO",
        "MS"
    ],
    "39401": [
        "HATTIESBURG",
        "MS"
    ],
    "39402": [
        "HATTIESBURG",
        "MS"
    ],
    "39403": [
        "HATTIESBURG",
        "MS"
    ],
    "39404": [
        "HATTIESBURG",
        "MS"
    ],
    "39406": [
        "HATTIESBURG",
        "MS"
    ],
    "39407": [
        "HATTIESBURG",
        "MS"
    ],
    "39421": [
        "BASSFIELD",
        "MS"
    ],
    "39422": [
        "BAY SPRINGS",
        "MS"
    ],
    "39423": [
        "BEAUMONT",
        "MS"
    ],
    "39425": [
        "BROOKLYN",
        "MS"
    ],
    "39426": [
        "CARRIERE",
        "MS"
    ],
    "39427": [
        "CARSON",
        "MS"
    ],
    "39428": [
        "COLLINS",
        "MS"
    ],
    "39429": [
        "COLUMBIA",
        "MS"
    ],
    "39437": [
        "ELLISVILLE",
        "MS"
    ],
    "39439": [
        "HEIDELBERG",
        "MS"
    ],
    "39440": [
        "LAUREL",
        "MS"
    ],
    "39441": [
        "LAUREL",
        "MS"
    ],
    "39442": [
        "LAUREL",
        "MS"
    ],
    "39443": [
        "LAUREL",
        "MS"
    ],
    "39451": [
        "LEAKESVILLE",
        "MS"
    ],
    "39452": [
        "LUCEDALE",
        "MS"
    ],
    "39455": [
        "LUMBERTON",
        "MS"
    ],
    "39456": [
        "MC LAIN",
        "MS"
    ],
    "39457": [
        "MC NEILL",
        "MS"
    ],
    "39459": [
        "MOSELLE",
        "MS"
    ],
    "39460": [
        "MOSS",
        "MS"
    ],
    "39461": [
        "NEELY",
        "MS"
    ],
    "39462": [
        "NEW AUGUSTA",
        "MS"
    ],
    "39463": [
        "NICHOLSON",
        "MS"
    ],
    "39464": [
        "OVETT",
        "MS"
    ],
    "39465": [
        "PETAL",
        "MS"
    ],
    "39466": [
        "PICAYUNE",
        "MS"
    ],
    "39470": [
        "POPLARVILLE",
        "MS"
    ],
    "39474": [
        "PRENTISS",
        "MS"
    ],
    "39475": [
        "PURVIS",
        "MS"
    ],
    "39476": [
        "RICHTON",
        "MS"
    ],
    "39477": [
        "SANDERSVILLE",
        "MS"
    ],
    "39478": [
        "SANDY HOOK",
        "MS"
    ],
    "39479": [
        "SEMINARY",
        "MS"
    ],
    "39480": [
        "SOSO",
        "MS"
    ],
    "39481": [
        "STRINGER",
        "MS"
    ],
    "39482": [
        "SUMRALL",
        "MS"
    ],
    "39483": [
        "FOXWORTH",
        "MS"
    ],
    "39501": [
        "GULFPORT",
        "MS"
    ],
    "39502": [
        "GULFPORT",
        "MS"
    ],
    "39503": [
        "GULFPORT",
        "MS"
    ],
    "39505": [
        "GULFPORT",
        "MS"
    ],
    "39506": [
        "GULFPORT",
        "MS"
    ],
    "39507": [
        "GULFPORT",
        "MS"
    ],
    "39520": [
        "BAY SAINT LOUIS",
        "MS"
    ],
    "39521": [
        "BAY SAINT LOUIS",
        "MS"
    ],
    "39522": [
        "STENNIS SPACE CENTER",
        "MS"
    ],
    "39525": [
        "DIAMONDHEAD",
        "MS"
    ],
    "39529": [
        "STENNIS SPACE CENTER",
        "MS"
    ],
    "39530": [
        "BILOXI",
        "MS"
    ],
    "39531": [
        "BILOXI",
        "MS"
    ],
    "39532": [
        "BILOXI",
        "MS"
    ],
    "39533": [
        "BILOXI",
        "MS"
    ],
    "39534": [
        "BILOXI",
        "MS"
    ],
    "39535": [
        "BILOXI",
        "MS"
    ],
    "39540": [
        "DIBERVILLE",
        "MS"
    ],
    "39552": [
        "ESCATAWPA",
        "MS"
    ],
    "39553": [
        "GAUTIER",
        "MS"
    ],
    "39555": [
        "HURLEY",
        "MS"
    ],
    "39556": [
        "KILN",
        "MS"
    ],
    "39558": [
        "LAKESHORE",
        "MS"
    ],
    "39560": [
        "LONG BEACH",
        "MS"
    ],
    "39561": [
        "MC HENRY",
        "MS"
    ],
    "39562": [
        "MOSS POINT",
        "MS"
    ],
    "39563": [
        "MOSS POINT",
        "MS"
    ],
    "39564": [
        "OCEAN SPRINGS",
        "MS"
    ],
    "39565": [
        "VANCLEAVE",
        "MS"
    ],
    "39566": [
        "OCEAN SPRINGS",
        "MS"
    ],
    "39567": [
        "PASCAGOULA",
        "MS"
    ],
    "39568": [
        "PASCAGOULA",
        "MS"
    ],
    "39569": [
        "PASCAGOULA",
        "MS"
    ],
    "39571": [
        "PASS CHRISTIAN",
        "MS"
    ],
    "39572": [
        "PEARLINGTON",
        "MS"
    ],
    "39573": [
        "PERKINSTON",
        "MS"
    ],
    "39574": [
        "SAUCIER",
        "MS"
    ],
    "39576": [
        "WAVELAND",
        "MS"
    ],
    "39577": [
        "WIGGINS",
        "MS"
    ],
    "39581": [
        "PASCAGOULA",
        "MS"
    ],
    "39595": [
        "PASCAGOULA",
        "MS"
    ],
    "39601": [
        "BROOKHAVEN",
        "MS"
    ],
    "39602": [
        "BROOKHAVEN",
        "MS"
    ],
    "39603": [
        "BROOKHAVEN",
        "MS"
    ],
    "39629": [
        "BOGUE CHITTO",
        "MS"
    ],
    "39630": [
        "BUDE",
        "MS"
    ],
    "39631": [
        "CENTREVILLE",
        "MS"
    ],
    "39632": [
        "CHATAWA",
        "MS"
    ],
    "39633": [
        "CROSBY",
        "MS"
    ],
    "39635": [
        "FERNWOOD",
        "MS"
    ],
    "39638": [
        "GLOSTER",
        "MS"
    ],
    "39641": [
        "JAYESS",
        "MS"
    ],
    "39643": [
        "KOKOMO",
        "MS"
    ],
    "39645": [
        "LIBERTY",
        "MS"
    ],
    "39647": [
        "MC CALL CREEK",
        "MS"
    ],
    "39648": [
        "MCCOMB",
        "MS"
    ],
    "39649": [
        "MCCOMB",
        "MS"
    ],
    "39652": [
        "MAGNOLIA",
        "MS"
    ],
    "39653": [
        "MEADVILLE",
        "MS"
    ],
    "39654": [
        "MONTICELLO",
        "MS"
    ],
    "39656": [
        "OAK VALE",
        "MS"
    ],
    "39657": [
        "OSYKA",
        "MS"
    ],
    "39661": [
        "ROXIE",
        "MS"
    ],
    "39662": [
        "RUTH",
        "MS"
    ],
    "39663": [
        "SILVER CREEK",
        "MS"
    ],
    "39664": [
        "SMITHDALE",
        "MS"
    ],
    "39665": [
        "SONTAG",
        "MS"
    ],
    "39666": [
        "SUMMIT",
        "MS"
    ],
    "39667": [
        "TYLERTOWN",
        "MS"
    ],
    "39668": [
        "UNION CHURCH",
        "MS"
    ],
    "39669": [
        "WOODVILLE",
        "MS"
    ],
    "39701": [
        "COLUMBUS",
        "MS"
    ],
    "39702": [
        "COLUMBUS",
        "MS"
    ],
    "39703": [
        "COLUMBUS",
        "MS"
    ],
    "39704": [
        "COLUMBUS",
        "MS"
    ],
    "39705": [
        "COLUMBUS",
        "MS"
    ],
    "39710": [
        "COLUMBUS",
        "MS"
    ],
    "39730": [
        "ABERDEEN",
        "MS"
    ],
    "39735": [
        "ACKERMAN",
        "MS"
    ],
    "39736": [
        "ARTESIA",
        "MS"
    ],
    "39737": [
        "BELLEFONTAINE",
        "MS"
    ],
    "39739": [
        "BROOKSVILLE",
        "MS"
    ],
    "39740": [
        "CALEDONIA",
        "MS"
    ],
    "39741": [
        "CEDARBLUFF",
        "MS"
    ],
    "39743": [
        "CRAWFORD",
        "MS"
    ],
    "39744": [
        "EUPORA",
        "MS"
    ],
    "39745": [
        "FRENCH CAMP",
        "MS"
    ],
    "39746": [
        "HAMILTON",
        "MS"
    ],
    "39747": [
        "KILMICHAEL",
        "MS"
    ],
    "39750": [
        "MABEN",
        "MS"
    ],
    "39751": [
        "MANTEE",
        "MS"
    ],
    "39752": [
        "MATHISTON",
        "MS"
    ],
    "39753": [
        "MAYHEW",
        "MS"
    ],
    "39754": [
        "MONTPELIER",
        "MS"
    ],
    "39755": [
        "PHEBA",
        "MS"
    ],
    "39756": [
        "PRAIRIE",
        "MS"
    ],
    "39759": [
        "STARKVILLE",
        "MS"
    ],
    "39760": [
        "STARKVILLE",
        "MS"
    ],
    "39762": [
        "MISSISSIPPI STATE",
        "MS"
    ],
    "39766": [
        "STEENS",
        "MS"
    ],
    "39767": [
        "STEWART",
        "MS"
    ],
    "39769": [
        "STURGIS",
        "MS"
    ],
    "39771": [
        "WALTHALL",
        "MS"
    ],
    "39772": [
        "WEIR",
        "MS"
    ],
    "39773": [
        "WEST POINT",
        "MS"
    ],
    "39776": [
        "WOODLAND",
        "MS"
    ],
    "39813": [
        "ARLINGTON",
        "GA"
    ],
    "39815": [
        "ATTAPULGUS",
        "GA"
    ],
    "39817": [
        "BAINBRIDGE",
        "GA"
    ],
    "39818": [
        "BAINBRIDGE",
        "GA"
    ],
    "39819": [
        "BAINBRIDGE",
        "GA"
    ],
    "39823": [
        "BLAKELY",
        "GA"
    ],
    "39824": [
        "BLUFFTON",
        "GA"
    ],
    "39825": [
        "BRINSON",
        "GA"
    ],
    "39826": [
        "BRONWOOD",
        "GA"
    ],
    "39827": [
        "CAIRO",
        "GA"
    ],
    "39828": [
        "CAIRO",
        "GA"
    ],
    "39829": [
        "CALVARY",
        "GA"
    ],
    "39832": [
        "CEDAR SPRINGS",
        "GA"
    ],
    "39834": [
        "CLIMAX",
        "GA"
    ],
    "39836": [
        "COLEMAN",
        "GA"
    ],
    "39837": [
        "COLQUITT",
        "GA"
    ],
    "39840": [
        "CUTHBERT",
        "GA"
    ],
    "39841": [
        "DAMASCUS",
        "GA"
    ],
    "39842": [
        "DAWSON",
        "GA"
    ],
    "39845": [
        "DONALSONVILLE",
        "GA"
    ],
    "39846": [
        "EDISON",
        "GA"
    ],
    "39851": [
        "FORT GAINES",
        "GA"
    ],
    "39854": [
        "GEORGETOWN",
        "GA"
    ],
    "39859": [
        "IRON CITY",
        "GA"
    ],
    "39861": [
        "JAKIN",
        "GA"
    ],
    "39862": [
        "LEARY",
        "GA"
    ],
    "39866": [
        "MORGAN",
        "GA"
    ],
    "39867": [
        "MORRIS",
        "GA"
    ],
    "39870": [
        "NEWTON",
        "GA"
    ],
    "39877": [
        "PARROTT",
        "GA"
    ],
    "39885": [
        "SASSER",
        "GA"
    ],
    "39886": [
        "SHELLMAN",
        "GA"
    ],
    "39897": [
        "WHIGHAM",
        "GA"
    ],
    "40003": [
        "BAGDAD",
        "KY"
    ],
    "40004": [
        "BARDSTOWN",
        "KY"
    ],
    "40006": [
        "BEDFORD",
        "KY"
    ],
    "40007": [
        "BETHLEHEM",
        "KY"
    ],
    "40008": [
        "BLOOMFIELD",
        "KY"
    ],
    "40009": [
        "BRADFORDSVILLE",
        "KY"
    ],
    "40010": [
        "BUCKNER",
        "KY"
    ],
    "40011": [
        "CAMPBELLSBURG",
        "KY"
    ],
    "40012": [
        "CHAPLIN",
        "KY"
    ],
    "40013": [
        "COXS CREEK",
        "KY"
    ],
    "40014": [
        "CRESTWOOD",
        "KY"
    ],
    "40018": [
        "EASTWOOD",
        "KY"
    ],
    "40019": [
        "EMINENCE",
        "KY"
    ],
    "40020": [
        "FAIRFIELD",
        "KY"
    ],
    "40022": [
        "FINCHVILLE",
        "KY"
    ],
    "40023": [
        "FISHERVILLE",
        "KY"
    ],
    "40025": [
        "GLENVIEW",
        "KY"
    ],
    "40026": [
        "GOSHEN",
        "KY"
    ],
    "40027": [
        "HARRODS CREEK",
        "KY"
    ],
    "40031": [
        "LA GRANGE",
        "KY"
    ],
    "40032": [
        "LA GRANGE",
        "KY"
    ],
    "40033": [
        "LEBANON",
        "KY"
    ],
    "40036": [
        "LOCKPORT",
        "KY"
    ],
    "40037": [
        "LORETTO",
        "KY"
    ],
    "40040": [
        "MACKVILLE",
        "KY"
    ],
    "40041": [
        "MASONIC HOME",
        "KY"
    ],
    "40045": [
        "MILTON",
        "KY"
    ],
    "40046": [
        "MOUNT EDEN",
        "KY"
    ],
    "40047": [
        "MOUNT WASHINGTON",
        "KY"
    ],
    "40048": [
        "NAZARETH",
        "KY"
    ],
    "40049": [
        "NERINX",
        "KY"
    ],
    "40050": [
        "NEW CASTLE",
        "KY"
    ],
    "40051": [
        "NEW HAVEN",
        "KY"
    ],
    "40052": [
        "NEW HOPE",
        "KY"
    ],
    "40055": [
        "PENDLETON",
        "KY"
    ],
    "40056": [
        "PEWEE VALLEY",
        "KY"
    ],
    "40057": [
        "PLEASUREVILLE",
        "KY"
    ],
    "40058": [
        "PORT ROYAL",
        "KY"
    ],
    "40059": [
        "PROSPECT",
        "KY"
    ],
    "40060": [
        "RAYWICK",
        "KY"
    ],
    "40061": [
        "SAINT CATHARINE",
        "KY"
    ],
    "40063": [
        "SAINT MARY",
        "KY"
    ],
    "40065": [
        "SHELBYVILLE",
        "KY"
    ],
    "40066": [
        "SHELBYVILLE",
        "KY"
    ],
    "40067": [
        "SIMPSONVILLE",
        "KY"
    ],
    "40068": [
        "SMITHFIELD",
        "KY"
    ],
    "40069": [
        "SPRINGFIELD",
        "KY"
    ],
    "40070": [
        "SULPHUR",
        "KY"
    ],
    "40071": [
        "TAYLORSVILLE",
        "KY"
    ],
    "40075": [
        "TURNERS STATION",
        "KY"
    ],
    "40076": [
        "WADDY",
        "KY"
    ],
    "40077": [
        "WESTPORT",
        "KY"
    ],
    "40078": [
        "WILLISBURG",
        "KY"
    ],
    "40104": [
        "BATTLETOWN",
        "KY"
    ],
    "40107": [
        "BOSTON",
        "KY"
    ],
    "40108": [
        "BRANDENBURG",
        "KY"
    ],
    "40109": [
        "BROOKS",
        "KY"
    ],
    "40110": [
        "CLERMONT",
        "KY"
    ],
    "40111": [
        "CLOVERPORT",
        "KY"
    ],
    "40115": [
        "CUSTER",
        "KY"
    ],
    "40117": [
        "EKRON",
        "KY"
    ],
    "40118": [
        "FAIRDALE",
        "KY"
    ],
    "40119": [
        "FALLS OF ROUGH",
        "KY"
    ],
    "40121": [
        "FORT KNOX",
        "KY"
    ],
    "40122": [
        "FORT KNOX",
        "KY"
    ],
    "40129": [
        "HILLVIEW",
        "KY"
    ],
    "40140": [
        "GARFIELD",
        "KY"
    ],
    "40142": [
        "GUSTON",
        "KY"
    ],
    "40143": [
        "HARDINSBURG",
        "KY"
    ],
    "40144": [
        "HARNED",
        "KY"
    ],
    "40145": [
        "HUDSON",
        "KY"
    ],
    "40146": [
        "IRVINGTON",
        "KY"
    ],
    "40150": [
        "LEBANON JUNCTION",
        "KY"
    ],
    "40152": [
        "MC DANIELS",
        "KY"
    ],
    "40153": [
        "MC QUADY",
        "KY"
    ],
    "40155": [
        "MULDRAUGH",
        "KY"
    ],
    "40157": [
        "PAYNEVILLE",
        "KY"
    ],
    "40159": [
        "RADCLIFF",
        "KY"
    ],
    "40160": [
        "RADCLIFF",
        "KY"
    ],
    "40161": [
        "RHODELIA",
        "KY"
    ],
    "40162": [
        "RINEYVILLE",
        "KY"
    ],
    "40165": [
        "SHEPHERDSVILLE",
        "KY"
    ],
    "40170": [
        "STEPHENSPORT",
        "KY"
    ],
    "40171": [
        "UNION STAR",
        "KY"
    ],
    "40175": [
        "VINE GROVE",
        "KY"
    ],
    "40176": [
        "WEBSTER",
        "KY"
    ],
    "40177": [
        "WEST POINT",
        "KY"
    ],
    "40178": [
        "WESTVIEW",
        "KY"
    ],
    "40201": [
        "LOUISVILLE",
        "KY"
    ],
    "40202": [
        "LOUISVILLE",
        "KY"
    ],
    "40203": [
        "LOUISVILLE",
        "KY"
    ],
    "40204": [
        "LOUISVILLE",
        "KY"
    ],
    "40205": [
        "LOUISVILLE",
        "KY"
    ],
    "40206": [
        "LOUISVILLE",
        "KY"
    ],
    "40207": [
        "LOUISVILLE",
        "KY"
    ],
    "40208": [
        "LOUISVILLE",
        "KY"
    ],
    "40209": [
        "LOUISVILLE",
        "KY"
    ],
    "40210": [
        "LOUISVILLE",
        "KY"
    ],
    "40211": [
        "LOUISVILLE",
        "KY"
    ],
    "40212": [
        "LOUISVILLE",
        "KY"
    ],
    "40213": [
        "LOUISVILLE",
        "KY"
    ],
    "40214": [
        "LOUISVILLE",
        "KY"
    ],
    "40215": [
        "LOUISVILLE",
        "KY"
    ],
    "40216": [
        "LOUISVILLE",
        "KY"
    ],
    "40217": [
        "LOUISVILLE",
        "KY"
    ],
    "40218": [
        "LOUISVILLE",
        "KY"
    ],
    "40219": [
        "LOUISVILLE",
        "KY"
    ],
    "40220": [
        "LOUISVILLE",
        "KY"
    ],
    "40221": [
        "LOUISVILLE",
        "KY"
    ],
    "40222": [
        "LOUISVILLE",
        "KY"
    ],
    "40223": [
        "LOUISVILLE",
        "KY"
    ],
    "40224": [
        "LOUISVILLE",
        "KY"
    ],
    "40225": [
        "LOUISVILLE",
        "KY"
    ],
    "40228": [
        "LOUISVILLE",
        "KY"
    ],
    "40229": [
        "LOUISVILLE",
        "KY"
    ],
    "40231": [
        "LOUISVILLE",
        "KY"
    ],
    "40232": [
        "LOUISVILLE",
        "KY"
    ],
    "40233": [
        "LOUISVILLE",
        "KY"
    ],
    "40241": [
        "LOUISVILLE",
        "KY"
    ],
    "40242": [
        "LOUISVILLE",
        "KY"
    ],
    "40243": [
        "LOUISVILLE",
        "KY"
    ],
    "40245": [
        "LOUISVILLE",
        "KY"
    ],
    "40250": [
        "LOUISVILLE",
        "KY"
    ],
    "40251": [
        "LOUISVILLE",
        "KY"
    ],
    "40252": [
        "LOUISVILLE",
        "KY"
    ],
    "40253": [
        "LOUISVILLE",
        "KY"
    ],
    "40255": [
        "LOUISVILLE",
        "KY"
    ],
    "40256": [
        "LOUISVILLE",
        "KY"
    ],
    "40257": [
        "LOUISVILLE",
        "KY"
    ],
    "40258": [
        "LOUISVILLE",
        "KY"
    ],
    "40259": [
        "LOUISVILLE",
        "KY"
    ],
    "40261": [
        "LOUISVILLE",
        "KY"
    ],
    "40266": [
        "LOUISVILLE",
        "KY"
    ],
    "40268": [
        "LOUISVILLE",
        "KY"
    ],
    "40269": [
        "LOUISVILLE",
        "KY"
    ],
    "40270": [
        "LOUISVILLE",
        "KY"
    ],
    "40272": [
        "LOUISVILLE",
        "KY"
    ],
    "40280": [
        "LOUISVILLE",
        "KY"
    ],
    "40289": [
        "LOUISVILLE",
        "KY"
    ],
    "40291": [
        "LOUISVILLE",
        "KY"
    ],
    "40292": [
        "LOUISVILLE",
        "KY"
    ],
    "40295": [
        "LOUISVILLE",
        "KY"
    ],
    "40297": [
        "LOUISVILLE",
        "KY"
    ],
    "40298": [
        "LOUISVILLE",
        "KY"
    ],
    "40299": [
        "LOUISVILLE",
        "KY"
    ],
    "40310": [
        "BURGIN",
        "KY"
    ],
    "40311": [
        "CARLISLE",
        "KY"
    ],
    "40312": [
        "CLAY CITY",
        "KY"
    ],
    "40313": [
        "CLEARFIELD",
        "KY"
    ],
    "40316": [
        "DENNISTON",
        "KY"
    ],
    "40319": [
        "FARMERS",
        "KY"
    ],
    "40322": [
        "FRENCHBURG",
        "KY"
    ],
    "40324": [
        "GEORGETOWN",
        "KY"
    ],
    "40328": [
        "GRAVEL SWITCH",
        "KY"
    ],
    "40330": [
        "HARRODSBURG",
        "KY"
    ],
    "40334": [
        "HOPE",
        "KY"
    ],
    "40336": [
        "IRVINE",
        "KY"
    ],
    "40337": [
        "JEFFERSONVILLE",
        "KY"
    ],
    "40339": [
        "KEENE",
        "KY"
    ],
    "40340": [
        "NICHOLASVILLE",
        "KY"
    ],
    "40342": [
        "LAWRENCEBURG",
        "KY"
    ],
    "40346": [
        "MEANS",
        "KY"
    ],
    "40347": [
        "MIDWAY",
        "KY"
    ],
    "40348": [
        "MILLERSBURG",
        "KY"
    ],
    "40350": [
        "MOOREFIELD",
        "KY"
    ],
    "40351": [
        "MOREHEAD",
        "KY"
    ],
    "40353": [
        "MOUNT STERLING",
        "KY"
    ],
    "40355": [
        "NEW LIBERTY",
        "KY"
    ],
    "40356": [
        "NICHOLASVILLE",
        "KY"
    ],
    "40357": [
        "NORTH MIDDLETOWN",
        "KY"
    ],
    "40358": [
        "OLYMPIA",
        "KY"
    ],
    "40359": [
        "OWENTON",
        "KY"
    ],
    "40360": [
        "OWINGSVILLE",
        "KY"
    ],
    "40361": [
        "PARIS",
        "KY"
    ],
    "40362": [
        "PARIS",
        "KY"
    ],
    "40363": [
        "PERRY PARK",
        "KY"
    ],
    "40366": [
        "PRESTON",
        "KY"
    ],
    "40370": [
        "SADIEVILLE",
        "KY"
    ],
    "40371": [
        "SALT LICK",
        "KY"
    ],
    "40372": [
        "SALVISA",
        "KY"
    ],
    "40374": [
        "SHARPSBURG",
        "KY"
    ],
    "40376": [
        "SLADE",
        "KY"
    ],
    "40379": [
        "STAMPING GROUND",
        "KY"
    ],
    "40380": [
        "STANTON",
        "KY"
    ],
    "40383": [
        "VERSAILLES",
        "KY"
    ],
    "40384": [
        "VERSAILLES",
        "KY"
    ],
    "40385": [
        "WACO",
        "KY"
    ],
    "40387": [
        "WELLINGTON",
        "KY"
    ],
    "40390": [
        "WILMORE",
        "KY"
    ],
    "40391": [
        "WINCHESTER",
        "KY"
    ],
    "40392": [
        "WINCHESTER",
        "KY"
    ],
    "40402": [
        "ANNVILLE",
        "KY"
    ],
    "40403": [
        "BEREA",
        "KY"
    ],
    "40404": [
        "BEREA",
        "KY"
    ],
    "40405": [
        "BIGHILL",
        "KY"
    ],
    "40409": [
        "BRODHEAD",
        "KY"
    ],
    "40410": [
        "BRYANTSVILLE",
        "KY"
    ],
    "40419": [
        "CRAB ORCHARD",
        "KY"
    ],
    "40422": [
        "DANVILLE",
        "KY"
    ],
    "40423": [
        "DANVILLE",
        "KY"
    ],
    "40434": [
        "GRAY HAWK",
        "KY"
    ],
    "40437": [
        "HUSTONVILLE",
        "KY"
    ],
    "40440": [
        "JUNCTION CITY",
        "KY"
    ],
    "40442": [
        "KINGS MOUNTAIN",
        "KY"
    ],
    "40444": [
        "LANCASTER",
        "KY"
    ],
    "40445": [
        "LIVINGSTON",
        "KY"
    ],
    "40447": [
        "MC KEE",
        "KY"
    ],
    "40448": [
        "MC KINNEY",
        "KY"
    ],
    "40456": [
        "MOUNT VERNON",
        "KY"
    ],
    "40460": [
        "ORLANDO",
        "KY"
    ],
    "40461": [
        "PAINT LICK",
        "KY"
    ],
    "40464": [
        "PARKSVILLE",
        "KY"
    ],
    "40468": [
        "PERRYVILLE",
        "KY"
    ],
    "40472": [
        "RAVENNA",
        "KY"
    ],
    "40473": [
        "RENFRO VALLEY",
        "KY"
    ],
    "40475": [
        "RICHMOND",
        "KY"
    ],
    "40476": [
        "RICHMOND",
        "KY"
    ],
    "40481": [
        "SANDGAP",
        "KY"
    ],
    "40484": [
        "STANFORD",
        "KY"
    ],
    "40486": [
        "TYNER",
        "KY"
    ],
    "40489": [
        "WAYNESBURG",
        "KY"
    ],
    "40502": [
        "LEXINGTON",
        "KY"
    ],
    "40503": [
        "LEXINGTON",
        "KY"
    ],
    "40504": [
        "LEXINGTON",
        "KY"
    ],
    "40505": [
        "LEXINGTON",
        "KY"
    ],
    "40506": [
        "LEXINGTON",
        "KY"
    ],
    "40507": [
        "LEXINGTON",
        "KY"
    ],
    "40508": [
        "LEXINGTON",
        "KY"
    ],
    "40509": [
        "LEXINGTON",
        "KY"
    ],
    "40510": [
        "LEXINGTON",
        "KY"
    ],
    "40511": [
        "LEXINGTON",
        "KY"
    ],
    "40512": [
        "LEXINGTON",
        "KY"
    ],
    "40513": [
        "LEXINGTON",
        "KY"
    ],
    "40514": [
        "LEXINGTON",
        "KY"
    ],
    "40515": [
        "LEXINGTON",
        "KY"
    ],
    "40516": [
        "LEXINGTON",
        "KY"
    ],
    "40517": [
        "LEXINGTON",
        "KY"
    ],
    "40522": [
        "LEXINGTON",
        "KY"
    ],
    "40523": [
        "LEXINGTON",
        "KY"
    ],
    "40524": [
        "LEXINGTON",
        "KY"
    ],
    "40533": [
        "LEXINGTON",
        "KY"
    ],
    "40536": [
        "LEXINGTON",
        "KY"
    ],
    "40544": [
        "LEXINGTON",
        "KY"
    ],
    "40546": [
        "LEXINGTON",
        "KY"
    ],
    "40555": [
        "LEXINGTON",
        "KY"
    ],
    "40575": [
        "LEXINGTON",
        "KY"
    ],
    "40577": [
        "LEXINGTON",
        "KY"
    ],
    "40578": [
        "LEXINGTON",
        "KY"
    ],
    "40579": [
        "LEXINGTON",
        "KY"
    ],
    "40580": [
        "LEXINGTON",
        "KY"
    ],
    "40581": [
        "LEXINGTON",
        "KY"
    ],
    "40583": [
        "LEXINGTON",
        "KY"
    ],
    "40588": [
        "LEXINGTON",
        "KY"
    ],
    "40591": [
        "LEXINGTON",
        "KY"
    ],
    "40601": [
        "FRANKFORT",
        "KY"
    ],
    "40602": [
        "FRANKFORT",
        "KY"
    ],
    "40603": [
        "FRANKFORT",
        "KY"
    ],
    "40604": [
        "FRANKFORT",
        "KY"
    ],
    "40621": [
        "FRANKFORT",
        "KY"
    ],
    "40701": [
        "CORBIN",
        "KY"
    ],
    "40702": [
        "CORBIN",
        "KY"
    ],
    "40729": [
        "EAST BERNSTADT",
        "KY"
    ],
    "40734": [
        "GRAY",
        "KY"
    ],
    "40737": [
        "KEAVY",
        "KY"
    ],
    "40740": [
        "LILY",
        "KY"
    ],
    "40741": [
        "LONDON",
        "KY"
    ],
    "40742": [
        "LONDON",
        "KY"
    ],
    "40743": [
        "LONDON",
        "KY"
    ],
    "40744": [
        "LONDON",
        "KY"
    ],
    "40755": [
        "PITTSBURG",
        "KY"
    ],
    "40759": [
        "ROCKHOLDS",
        "KY"
    ],
    "40763": [
        "SILER",
        "KY"
    ],
    "40769": [
        "WILLIAMSBURG",
        "KY"
    ],
    "40771": [
        "WOODBINE",
        "KY"
    ],
    "40801": [
        "AGES BROOKSIDE",
        "KY"
    ],
    "40803": [
        "ASHER",
        "KY"
    ],
    "40806": [
        "BAXTER",
        "KY"
    ],
    "40807": [
        "BENHAM",
        "KY"
    ],
    "40808": [
        "BIG LAUREL",
        "KY"
    ],
    "40810": [
        "BLEDSOE",
        "KY"
    ],
    "40813": [
        "CALVIN",
        "KY"
    ],
    "40815": [
        "CAWOOD",
        "KY"
    ],
    "40819": [
        "COLDIRON",
        "KY"
    ],
    "40820": [
        "CRANKS",
        "KY"
    ],
    "40823": [
        "CUMBERLAND",
        "KY"
    ],
    "40824": [
        "DAYHOIT",
        "KY"
    ],
    "40827": [
        "ESSIE",
        "KY"
    ],
    "40828": [
        "EVARTS",
        "KY"
    ],
    "40829": [
        "GRAYS KNOB",
        "KY"
    ],
    "40831": [
        "HARLAN",
        "KY"
    ],
    "40840": [
        "HELTON",
        "KY"
    ],
    "40843": [
        "HOLMES MILL",
        "KY"
    ],
    "40844": [
        "HOSKINSTON",
        "KY"
    ],
    "40845": [
        "HULEN",
        "KY"
    ],
    "40847": [
        "KENVIR",
        "KY"
    ],
    "40854": [
        "LOYALL",
        "KY"
    ],
    "40855": [
        "LYNCH",
        "KY"
    ],
    "40856": [
        "MIRACLE",
        "KY"
    ],
    "40862": [
        "PARTRIDGE",
        "KY"
    ],
    "40863": [
        "PATHFORK",
        "KY"
    ],
    "40865": [
        "PUTNEY",
        "KY"
    ],
    "40868": [
        "STINNETT",
        "KY"
    ],
    "40870": [
        "TOTZ",
        "KY"
    ],
    "40873": [
        "WALLINS CREEK",
        "KY"
    ],
    "40874": [
        "WARBRANCH",
        "KY"
    ],
    "40902": [
        "ARJAY",
        "KY"
    ],
    "40903": [
        "ARTEMUS",
        "KY"
    ],
    "40906": [
        "BARBOURVILLE",
        "KY"
    ],
    "40913": [
        "BEVERLY",
        "KY"
    ],
    "40914": [
        "BIG CREEK",
        "KY"
    ],
    "40915": [
        "BIMBLE",
        "KY"
    ],
    "40921": [
        "BRYANTS STORE",
        "KY"
    ],
    "40923": [
        "CANNON",
        "KY"
    ],
    "40927": [
        "CLOSPLINT",
        "KY"
    ],
    "40932": [
        "FALL ROCK",
        "KY"
    ],
    "40935": [
        "FLAT LICK",
        "KY"
    ],
    "40939": [
        "FOURMILE",
        "KY"
    ],
    "40940": [
        "FRAKES",
        "KY"
    ],
    "40941": [
        "GARRARD",
        "KY"
    ],
    "40943": [
        "GIRDLER",
        "KY"
    ],
    "40946": [
        "GREEN ROAD",
        "KY"
    ],
    "40949": [
        "HEIDRICK",
        "KY"
    ],
    "40951": [
        "HIMA",
        "KY"
    ],
    "40953": [
        "HINKLE",
        "KY"
    ],
    "40955": [
        "INGRAM",
        "KY"
    ],
    "40958": [
        "KETTLE ISLAND",
        "KY"
    ],
    "40962": [
        "MANCHESTER",
        "KY"
    ],
    "40964": [
        "MARY ALICE",
        "KY"
    ],
    "40965": [
        "MIDDLESBORO",
        "KY"
    ],
    "40972": [
        "ONEIDA",
        "KY"
    ],
    "40977": [
        "PINEVILLE",
        "KY"
    ],
    "40979": [
        "ROARK",
        "KY"
    ],
    "40983": [
        "SEXTONS CREEK",
        "KY"
    ],
    "40988": [
        "STONEY FORK",
        "KY"
    ],
    "41001": [
        "ALEXANDRIA",
        "KY"
    ],
    "41002": [
        "AUGUSTA",
        "KY"
    ],
    "41003": [
        "BERRY",
        "KY"
    ],
    "41004": [
        "BROOKSVILLE",
        "KY"
    ],
    "41005": [
        "BURLINGTON",
        "KY"
    ],
    "41006": [
        "BUTLER",
        "KY"
    ],
    "41007": [
        "CALIFORNIA",
        "KY"
    ],
    "41008": [
        "CARROLLTON",
        "KY"
    ],
    "41010": [
        "CORINTH",
        "KY"
    ],
    "41011": [
        "COVINGTON",
        "KY"
    ],
    "41012": [
        "COVINGTON",
        "KY"
    ],
    "41014": [
        "COVINGTON",
        "KY"
    ],
    "41015": [
        "LATONIA",
        "KY"
    ],
    "41016": [
        "COVINGTON",
        "KY"
    ],
    "41017": [
        "FT MITCHELL",
        "KY"
    ],
    "41018": [
        "ERLANGER",
        "KY"
    ],
    "41019": [
        "COVINGTON",
        "KY"
    ],
    "41022": [
        "FLORENCE",
        "KY"
    ],
    "41025": [
        "ERLANGER",
        "KY"
    ],
    "41030": [
        "CRITTENDEN",
        "KY"
    ],
    "41031": [
        "CYNTHIANA",
        "KY"
    ],
    "41033": [
        "DE MOSSVILLE",
        "KY"
    ],
    "41034": [
        "DOVER",
        "KY"
    ],
    "41035": [
        "DRY RIDGE",
        "KY"
    ],
    "41037": [
        "ELIZAVILLE",
        "KY"
    ],
    "41039": [
        "EWING",
        "KY"
    ],
    "41040": [
        "FALMOUTH",
        "KY"
    ],
    "41041": [
        "FLEMINGSBURG",
        "KY"
    ],
    "41042": [
        "FLORENCE",
        "KY"
    ],
    "41043": [
        "FOSTER",
        "KY"
    ],
    "41044": [
        "GERMANTOWN",
        "KY"
    ],
    "41045": [
        "GHENT",
        "KY"
    ],
    "41046": [
        "GLENCOE",
        "KY"
    ],
    "41048": [
        "HEBRON",
        "KY"
    ],
    "41049": [
        "HILLSBORO",
        "KY"
    ],
    "41051": [
        "INDEPENDENCE",
        "KY"
    ],
    "41052": [
        "JONESVILLE",
        "KY"
    ],
    "41053": [
        "KENTON",
        "KY"
    ],
    "41055": [
        "MAYSLICK",
        "KY"
    ],
    "41056": [
        "MAYSVILLE",
        "KY"
    ],
    "41059": [
        "MELBOURNE",
        "KY"
    ],
    "41063": [
        "MORNING VIEW",
        "KY"
    ],
    "41064": [
        "MOUNT OLIVET",
        "KY"
    ],
    "41065": [
        "MUSES MILLS",
        "KY"
    ],
    "41071": [
        "NEWPORT",
        "KY"
    ],
    "41072": [
        "NEWPORT",
        "KY"
    ],
    "41073": [
        "BELLEVUE",
        "KY"
    ],
    "41074": [
        "DAYTON",
        "KY"
    ],
    "41075": [
        "FORT THOMAS",
        "KY"
    ],
    "41076": [
        "NEWPORT",
        "KY"
    ],
    "41080": [
        "PETERSBURG",
        "KY"
    ],
    "41081": [
        "PLUMMERS LANDING",
        "KY"
    ],
    "41083": [
        "SANDERS",
        "KY"
    ],
    "41085": [
        "SILVER GROVE",
        "KY"
    ],
    "41086": [
        "SPARTA",
        "KY"
    ],
    "41091": [
        "UNION",
        "KY"
    ],
    "41092": [
        "VERONA",
        "KY"
    ],
    "41093": [
        "WALLINGFORD",
        "KY"
    ],
    "41094": [
        "WALTON",
        "KY"
    ],
    "41095": [
        "WARSAW",
        "KY"
    ],
    "41096": [
        "WASHINGTON",
        "KY"
    ],
    "41097": [
        "WILLIAMSTOWN",
        "KY"
    ],
    "41098": [
        "WORTHVILLE",
        "KY"
    ],
    "41099": [
        "NEWPORT",
        "KY"
    ],
    "41101": [
        "ASHLAND",
        "KY"
    ],
    "41102": [
        "ASHLAND",
        "KY"
    ],
    "41105": [
        "ASHLAND",
        "KY"
    ],
    "41114": [
        "ASHLAND",
        "KY"
    ],
    "41121": [
        "ARGILLITE",
        "KY"
    ],
    "41124": [
        "BLAINE",
        "KY"
    ],
    "41128": [
        "CARTER",
        "KY"
    ],
    "41129": [
        "CATLETTSBURG",
        "KY"
    ],
    "41135": [
        "EMERSON",
        "KY"
    ],
    "41139": [
        "FLATWOODS",
        "KY"
    ],
    "41141": [
        "GARRISON",
        "KY"
    ],
    "41142": [
        "GRAHN",
        "KY"
    ],
    "41143": [
        "GRAYSON",
        "KY"
    ],
    "41144": [
        "GREENUP",
        "KY"
    ],
    "41146": [
        "HITCHINS",
        "KY"
    ],
    "41149": [
        "ISONVILLE",
        "KY"
    ],
    "41159": [
        "MARTHA",
        "KY"
    ],
    "41164": [
        "OLIVE HILL",
        "KY"
    ],
    "41166": [
        "QUINCY",
        "KY"
    ],
    "41168": [
        "RUSH",
        "KY"
    ],
    "41169": [
        "RUSSELL",
        "KY"
    ],
    "41171": [
        "SANDY HOOK",
        "KY"
    ],
    "41173": [
        "SOLDIER",
        "KY"
    ],
    "41174": [
        "SOUTH PORTSMOUTH",
        "KY"
    ],
    "41175": [
        "SOUTH SHORE",
        "KY"
    ],
    "41179": [
        "VANCEBURG",
        "KY"
    ],
    "41180": [
        "WEBBVILLE",
        "KY"
    ],
    "41181": [
        "WILLARD",
        "KY"
    ],
    "41183": [
        "WORTHINGTON",
        "KY"
    ],
    "41189": [
        "TOLLESBORO",
        "KY"
    ],
    "41201": [
        "ADAMS",
        "KY"
    ],
    "41203": [
        "BEAUTY",
        "KY"
    ],
    "41204": [
        "BOONS CAMP",
        "KY"
    ],
    "41214": [
        "DEBORD",
        "KY"
    ],
    "41216": [
        "EAST POINT",
        "KY"
    ],
    "41219": [
        "FLATGAP",
        "KY"
    ],
    "41222": [
        "HAGERHILL",
        "KY"
    ],
    "41224": [
        "INEZ",
        "KY"
    ],
    "41226": [
        "KEATON",
        "KY"
    ],
    "41230": [
        "LOUISA",
        "KY"
    ],
    "41231": [
        "LOVELY",
        "KY"
    ],
    "41232": [
        "LOWMANSVILLE",
        "KY"
    ],
    "41234": [
        "MEALLY",
        "KY"
    ],
    "41238": [
        "OIL SPRINGS",
        "KY"
    ],
    "41240": [
        "PAINTSVILLE",
        "KY"
    ],
    "41250": [
        "PILGRIM",
        "KY"
    ],
    "41254": [
        "RIVER",
        "KY"
    ],
    "41255": [
        "SITKA",
        "KY"
    ],
    "41256": [
        "STAFFORDSVILLE",
        "KY"
    ],
    "41257": [
        "STAMBAUGH",
        "KY"
    ],
    "41260": [
        "THELMA",
        "KY"
    ],
    "41262": [
        "TOMAHAWK",
        "KY"
    ],
    "41263": [
        "TUTOR KEY",
        "KY"
    ],
    "41264": [
        "ULYSSES",
        "KY"
    ],
    "41265": [
        "VAN LEAR",
        "KY"
    ],
    "41267": [
        "WARFIELD",
        "KY"
    ],
    "41268": [
        "WEST VAN LEAR",
        "KY"
    ],
    "41274": [
        "WITTENSVILLE",
        "KY"
    ],
    "41301": [
        "CAMPTON",
        "KY"
    ],
    "41311": [
        "BEATTYVILLE",
        "KY"
    ],
    "41314": [
        "BOONEVILLE",
        "KY"
    ],
    "41317": [
        "CLAYHOLE",
        "KY"
    ],
    "41332": [
        "HAZEL GREEN",
        "KY"
    ],
    "41339": [
        "JACKSON",
        "KY"
    ],
    "41347": [
        "LONE",
        "KY"
    ],
    "41348": [
        "LOST CREEK",
        "KY"
    ],
    "41352": [
        "MIZE",
        "KY"
    ],
    "41360": [
        "PINE RIDGE",
        "KY"
    ],
    "41366": [
        "ROUSSEAU",
        "KY"
    ],
    "41385": [
        "VANCLEVE",
        "KY"
    ],
    "41386": [
        "VINCENT",
        "KY"
    ],
    "41390": [
        "WHICK",
        "KY"
    ],
    "41397": [
        "ZOE",
        "KY"
    ],
    "41413": [
        "CROCKETT",
        "KY"
    ],
    "41425": [
        "EZEL",
        "KY"
    ],
    "41451": [
        "MALONE",
        "KY"
    ],
    "41464": [
        "ROYALTON",
        "KY"
    ],
    "41465": [
        "SALYERSVILLE",
        "KY"
    ],
    "41472": [
        "WEST LIBERTY",
        "KY"
    ],
    "41477": [
        "WRIGLEY",
        "KY"
    ],
    "41501": [
        "PIKEVILLE",
        "KY"
    ],
    "41502": [
        "PIKEVILLE",
        "KY"
    ],
    "41503": [
        "SOUTH WILLIAMSON",
        "KY"
    ],
    "41512": [
        "ASHCAMP",
        "KY"
    ],
    "41513": [
        "BELCHER",
        "KY"
    ],
    "41514": [
        "BELFRY",
        "KY"
    ],
    "41517": [
        "BURDINE",
        "KY"
    ],
    "41519": [
        "CANADA",
        "KY"
    ],
    "41520": [
        "DORTON",
        "KY"
    ],
    "41522": [
        "ELKHORN CITY",
        "KY"
    ],
    "41524": [
        "FEDSCREEK",
        "KY"
    ],
    "41527": [
        "FOREST HILLS",
        "KY"
    ],
    "41528": [
        "FREEBURN",
        "KY"
    ],
    "41531": [
        "HARDY",
        "KY"
    ],
    "41534": [
        "HELLIER",
        "KY"
    ],
    "41537": [
        "JENKINS",
        "KY"
    ],
    "41538": [
        "JONANCY",
        "KY"
    ],
    "41539": [
        "KIMPER",
        "KY"
    ],
    "41542": [
        "LOOKOUT",
        "KY"
    ],
    "41543": [
        "MC ANDREWS",
        "KY"
    ],
    "41544": [
        "MC CARR",
        "KY"
    ],
    "41547": [
        "MAJESTIC",
        "KY"
    ],
    "41548": [
        "MOUTHCARD",
        "KY"
    ],
    "41549": [
        "MYRA",
        "KY"
    ],
    "41553": [
        "PHELPS",
        "KY"
    ],
    "41554": [
        "PHYLLIS",
        "KY"
    ],
    "41557": [
        "RACCOON",
        "KY"
    ],
    "41558": [
        "RANSOM",
        "KY"
    ],
    "41559": [
        "REGINA",
        "KY"
    ],
    "41560": [
        "ROBINSON CREEK",
        "KY"
    ],
    "41561": [
        "ROCKHOUSE",
        "KY"
    ],
    "41562": [
        "SHELBIANA",
        "KY"
    ],
    "41563": [
        "SHELBY GAP",
        "KY"
    ],
    "41564": [
        "SIDNEY",
        "KY"
    ],
    "41566": [
        "STEELE",
        "KY"
    ],
    "41567": [
        "STONE",
        "KY"
    ],
    "41568": [
        "STOPOVER",
        "KY"
    ],
    "41571": [
        "VARNEY",
        "KY"
    ],
    "41572": [
        "VIRGIE",
        "KY"
    ],
    "41601": [
        "ALLEN",
        "KY"
    ],
    "41602": [
        "AUXIER",
        "KY"
    ],
    "41603": [
        "BANNER",
        "KY"
    ],
    "41604": [
        "BEAVER",
        "KY"
    ],
    "41605": [
        "BETSY LAYNE",
        "KY"
    ],
    "41606": [
        "BEVINSVILLE",
        "KY"
    ],
    "41607": [
        "BLUE RIVER",
        "KY"
    ],
    "41612": [
        "BYPRO",
        "KY"
    ],
    "41615": [
        "DANA",
        "KY"
    ],
    "41616": [
        "DAVID",
        "KY"
    ],
    "41619": [
        "DRIFT",
        "KY"
    ],
    "41621": [
        "DWALE",
        "KY"
    ],
    "41622": [
        "EASTERN",
        "KY"
    ],
    "41630": [
        "GARRETT",
        "KY"
    ],
    "41631": [
        "GRETHEL",
        "KY"
    ],
    "41632": [
        "GUNLOCK",
        "KY"
    ],
    "41635": [
        "HAROLD",
        "KY"
    ],
    "41636": [
        "HI HAT",
        "KY"
    ],
    "41640": [
        "HUEYSVILLE",
        "KY"
    ],
    "41642": [
        "IVEL",
        "KY"
    ],
    "41643": [
        "LACKEY",
        "KY"
    ],
    "41645": [
        "LANGLEY",
        "KY"
    ],
    "41647": [
        "MC DOWELL",
        "KY"
    ],
    "41649": [
        "MARTIN",
        "KY"
    ],
    "41650": [
        "MELVIN",
        "KY"
    ],
    "41651": [
        "MINNIE",
        "KY"
    ],
    "41653": [
        "PRESTONSBURG",
        "KY"
    ],
    "41655": [
        "PRINTER",
        "KY"
    ],
    "41659": [
        "STANVILLE",
        "KY"
    ],
    "41660": [
        "TEABERRY",
        "KY"
    ],
    "41663": [
        "TRAM",
        "KY"
    ],
    "41666": [
        "WAYLAND",
        "KY"
    ],
    "41667": [
        "WEEKSBURY",
        "KY"
    ],
    "41669": [
        "WHEELWRIGHT",
        "KY"
    ],
    "41701": [
        "HAZARD",
        "KY"
    ],
    "41702": [
        "HAZARD",
        "KY"
    ],
    "41712": [
        "ARY",
        "KY"
    ],
    "41713": [
        "AVAWAM",
        "KY"
    ],
    "41714": [
        "BEAR BRANCH",
        "KY"
    ],
    "41719": [
        "BONNYMAN",
        "KY"
    ],
    "41721": [
        "BUCKHORN",
        "KY"
    ],
    "41722": [
        "BULAN",
        "KY"
    ],
    "41723": [
        "BUSY",
        "KY"
    ],
    "41725": [
        "CARRIE",
        "KY"
    ],
    "41727": [
        "CHAVIES",
        "KY"
    ],
    "41729": [
        "COMBS",
        "KY"
    ],
    "41731": [
        "CORNETTSVILLE",
        "KY"
    ],
    "41735": [
        "DELPHIA",
        "KY"
    ],
    "41739": [
        "DWARF",
        "KY"
    ],
    "41740": [
        "EMMALENA",
        "KY"
    ],
    "41743": [
        "FISTY",
        "KY"
    ],
    "41745": [
        "GAYS CREEK",
        "KY"
    ],
    "41746": [
        "HAPPY",
        "KY"
    ],
    "41749": [
        "HYDEN",
        "KY"
    ],
    "41751": [
        "JEFF",
        "KY"
    ],
    "41754": [
        "KRYPTON",
        "KY"
    ],
    "41759": [
        "SASSAFRAS",
        "KY"
    ],
    "41760": [
        "SCUDDY",
        "KY"
    ],
    "41763": [
        "SLEMP",
        "KY"
    ],
    "41766": [
        "THOUSANDSTICKS",
        "KY"
    ],
    "41772": [
        "VEST",
        "KY"
    ],
    "41773": [
        "VICCO",
        "KY"
    ],
    "41774": [
        "VIPER",
        "KY"
    ],
    "41776": [
        "WOOTON",
        "KY"
    ],
    "41777": [
        "YEADDISS",
        "KY"
    ],
    "41804": [
        "BLACKEY",
        "KY"
    ],
    "41810": [
        "CROMONA",
        "KY"
    ],
    "41812": [
        "DEANE",
        "KY"
    ],
    "41815": [
        "ERMINE",
        "KY"
    ],
    "41817": [
        "GARNER",
        "KY"
    ],
    "41819": [
        "GORDON",
        "KY"
    ],
    "41821": [
        "HALLIE",
        "KY"
    ],
    "41822": [
        "HINDMAN",
        "KY"
    ],
    "41824": [
        "ISOM",
        "KY"
    ],
    "41826": [
        "JEREMIAH",
        "KY"
    ],
    "41828": [
        "KITE",
        "KY"
    ],
    "41831": [
        "LEBURN",
        "KY"
    ],
    "41833": [
        "LINEFORK",
        "KY"
    ],
    "41834": [
        "LITTCARR",
        "KY"
    ],
    "41835": [
        "MC ROBERTS",
        "KY"
    ],
    "41836": [
        "MALLIE",
        "KY"
    ],
    "41837": [
        "MAYKING",
        "KY"
    ],
    "41839": [
        "MOUSIE",
        "KY"
    ],
    "41840": [
        "NEON",
        "KY"
    ],
    "41843": [
        "PINE TOP",
        "KY"
    ],
    "41844": [
        "PIPPA PASSES",
        "KY"
    ],
    "41845": [
        "PREMIUM",
        "KY"
    ],
    "41847": [
        "REDFOX",
        "KY"
    ],
    "41848": [
        "ROXANA",
        "KY"
    ],
    "41855": [
        "THORNTON",
        "KY"
    ],
    "41858": [
        "WHITESBURG",
        "KY"
    ],
    "41859": [
        "DEMA",
        "KY"
    ],
    "41861": [
        "RAVEN",
        "KY"
    ],
    "41862": [
        "TOPMOST",
        "KY"
    ],
    "42001": [
        "PADUCAH",
        "KY"
    ],
    "42002": [
        "PADUCAH",
        "KY"
    ],
    "42003": [
        "PADUCAH",
        "KY"
    ],
    "42020": [
        "ALMO",
        "KY"
    ],
    "42021": [
        "ARLINGTON",
        "KY"
    ],
    "42022": [
        "BANDANA",
        "KY"
    ],
    "42023": [
        "BARDWELL",
        "KY"
    ],
    "42024": [
        "BARLOW",
        "KY"
    ],
    "42025": [
        "BENTON",
        "KY"
    ],
    "42027": [
        "BOAZ",
        "KY"
    ],
    "42028": [
        "BURNA",
        "KY"
    ],
    "42029": [
        "CALVERT CITY",
        "KY"
    ],
    "42031": [
        "CLINTON",
        "KY"
    ],
    "42032": [
        "COLUMBUS",
        "KY"
    ],
    "42033": [
        "CRAYNE",
        "KY"
    ],
    "42035": [
        "CUNNINGHAM",
        "KY"
    ],
    "42036": [
        "DEXTER",
        "KY"
    ],
    "42038": [
        "EDDYVILLE",
        "KY"
    ],
    "42039": [
        "FANCY FARM",
        "KY"
    ],
    "42040": [
        "FARMINGTON",
        "KY"
    ],
    "42041": [
        "FULTON",
        "KY"
    ],
    "42044": [
        "GILBERTSVILLE",
        "KY"
    ],
    "42045": [
        "GRAND RIVERS",
        "KY"
    ],
    "42047": [
        "HAMPTON",
        "KY"
    ],
    "42048": [
        "HARDIN",
        "KY"
    ],
    "42049": [
        "HAZEL",
        "KY"
    ],
    "42050": [
        "HICKMAN",
        "KY"
    ],
    "42051": [
        "HICKORY",
        "KY"
    ],
    "42053": [
        "KEVIL",
        "KY"
    ],
    "42054": [
        "KIRKSEY",
        "KY"
    ],
    "42055": [
        "KUTTAWA",
        "KY"
    ],
    "42056": [
        "LA CENTER",
        "KY"
    ],
    "42058": [
        "LEDBETTER",
        "KY"
    ],
    "42060": [
        "LOVELACEVILLE",
        "KY"
    ],
    "42061": [
        "LOWES",
        "KY"
    ],
    "42064": [
        "MARION",
        "KY"
    ],
    "42066": [
        "MAYFIELD",
        "KY"
    ],
    "42069": [
        "MELBER",
        "KY"
    ],
    "42070": [
        "MILBURN",
        "KY"
    ],
    "42071": [
        "MURRAY",
        "KY"
    ],
    "42076": [
        "NEW CONCORD",
        "KY"
    ],
    "42078": [
        "SALEM",
        "KY"
    ],
    "42079": [
        "SEDALIA",
        "KY"
    ],
    "42081": [
        "SMITHLAND",
        "KY"
    ],
    "42082": [
        "SYMSONIA",
        "KY"
    ],
    "42083": [
        "TILINE",
        "KY"
    ],
    "42085": [
        "WATER VALLEY",
        "KY"
    ],
    "42086": [
        "WEST PADUCAH",
        "KY"
    ],
    "42087": [
        "WICKLIFFE",
        "KY"
    ],
    "42088": [
        "WINGO",
        "KY"
    ],
    "42101": [
        "BOWLING GREEN",
        "KY"
    ],
    "42102": [
        "BOWLING GREEN",
        "KY"
    ],
    "42103": [
        "BOWLING GREEN",
        "KY"
    ],
    "42104": [
        "BOWLING GREEN",
        "KY"
    ],
    "42120": [
        "ADOLPHUS",
        "KY"
    ],
    "42122": [
        "ALVATON",
        "KY"
    ],
    "42123": [
        "AUSTIN",
        "KY"
    ],
    "42124": [
        "BEAUMONT",
        "KY"
    ],
    "42127": [
        "CAVE CITY",
        "KY"
    ],
    "42129": [
        "EDMONTON",
        "KY"
    ],
    "42131": [
        "ETOILE",
        "KY"
    ],
    "42133": [
        "FOUNTAIN RUN",
        "KY"
    ],
    "42134": [
        "FRANKLIN",
        "KY"
    ],
    "42135": [
        "FRANKLIN",
        "KY"
    ],
    "42140": [
        "GAMALIEL",
        "KY"
    ],
    "42141": [
        "GLASGOW",
        "KY"
    ],
    "42142": [
        "GLASGOW",
        "KY"
    ],
    "42151": [
        "HESTAND",
        "KY"
    ],
    "42152": [
        "HISEVILLE",
        "KY"
    ],
    "42154": [
        "KNOB LICK",
        "KY"
    ],
    "42156": [
        "LUCAS",
        "KY"
    ],
    "42157": [
        "MOUNT HERMON",
        "KY"
    ],
    "42159": [
        "OAKLAND",
        "KY"
    ],
    "42160": [
        "PARK CITY",
        "KY"
    ],
    "42163": [
        "ROCKY HILL",
        "KY"
    ],
    "42164": [
        "SCOTTSVILLE",
        "KY"
    ],
    "42166": [
        "SUMMER SHADE",
        "KY"
    ],
    "42167": [
        "TOMPKINSVILLE",
        "KY"
    ],
    "42170": [
        "WOODBURN",
        "KY"
    ],
    "42171": [
        "SMITHS GROVE",
        "KY"
    ],
    "42201": [
        "ABERDEEN",
        "KY"
    ],
    "42202": [
        "ADAIRVILLE",
        "KY"
    ],
    "42204": [
        "ALLENSVILLE",
        "KY"
    ],
    "42206": [
        "AUBURN",
        "KY"
    ],
    "42207": [
        "BEE SPRING",
        "KY"
    ],
    "42210": [
        "BROWNSVILLE",
        "KY"
    ],
    "42211": [
        "CADIZ",
        "KY"
    ],
    "42214": [
        "CENTER",
        "KY"
    ],
    "42215": [
        "CERULEAN",
        "KY"
    ],
    "42216": [
        "CLIFTY",
        "KY"
    ],
    "42217": [
        "CROFTON",
        "KY"
    ],
    "42219": [
        "DUNBAR",
        "KY"
    ],
    "42220": [
        "ELKTON",
        "KY"
    ],
    "42221": [
        "FAIRVIEW",
        "KY"
    ],
    "42223": [
        "FORT CAMPBELL",
        "KY"
    ],
    "42232": [
        "GRACEY",
        "KY"
    ],
    "42234": [
        "GUTHRIE",
        "KY"
    ],
    "42236": [
        "HERNDON",
        "KY"
    ],
    "42240": [
        "HOPKINSVILLE",
        "KY"
    ],
    "42241": [
        "HOPKINSVILLE",
        "KY"
    ],
    "42256": [
        "LEWISBURG",
        "KY"
    ],
    "42259": [
        "MAMMOTH CAVE",
        "KY"
    ],
    "42261": [
        "MORGANTOWN",
        "KY"
    ],
    "42262": [
        "OAK GROVE",
        "KY"
    ],
    "42265": [
        "OLMSTEAD",
        "KY"
    ],
    "42266": [
        "PEMBROKE",
        "KY"
    ],
    "42273": [
        "ROCHESTER",
        "KY"
    ],
    "42274": [
        "ROCKFIELD",
        "KY"
    ],
    "42275": [
        "ROUNDHILL",
        "KY"
    ],
    "42276": [
        "RUSSELLVILLE",
        "KY"
    ],
    "42280": [
        "SHARON GROVE",
        "KY"
    ],
    "42285": [
        "SWEEDEN",
        "KY"
    ],
    "42286": [
        "TRENTON",
        "KY"
    ],
    "42301": [
        "OWENSBORO",
        "KY"
    ],
    "42302": [
        "OWENSBORO",
        "KY"
    ],
    "42303": [
        "OWENSBORO",
        "KY"
    ],
    "42304": [
        "OWENSBORO",
        "KY"
    ],
    "42320": [
        "BEAVER DAM",
        "KY"
    ],
    "42321": [
        "BEECH CREEK",
        "KY"
    ],
    "42322": [
        "BEECH GROVE",
        "KY"
    ],
    "42323": [
        "BEECHMONT",
        "KY"
    ],
    "42324": [
        "BELTON",
        "KY"
    ],
    "42325": [
        "BREMEN",
        "KY"
    ],
    "42327": [
        "CALHOUN",
        "KY"
    ],
    "42328": [
        "CENTERTOWN",
        "KY"
    ],
    "42330": [
        "CENTRAL CITY",
        "KY"
    ],
    "42332": [
        "CLEATON",
        "KY"
    ],
    "42333": [
        "CROMWELL",
        "KY"
    ],
    "42337": [
        "DRAKESBORO",
        "KY"
    ],
    "42338": [
        "DUNDEE",
        "KY"
    ],
    "42339": [
        "DUNMOR",
        "KY"
    ],
    "42343": [
        "FORDSVILLE",
        "KY"
    ],
    "42344": [
        "GRAHAM",
        "KY"
    ],
    "42345": [
        "GREENVILLE",
        "KY"
    ],
    "42347": [
        "HARTFORD",
        "KY"
    ],
    "42348": [
        "HAWESVILLE",
        "KY"
    ],
    "42349": [
        "HORSE BRANCH",
        "KY"
    ],
    "42350": [
        "ISLAND",
        "KY"
    ],
    "42351": [
        "LEWISPORT",
        "KY"
    ],
    "42352": [
        "LIVERMORE",
        "KY"
    ],
    "42354": [
        "MC HENRY",
        "KY"
    ],
    "42355": [
        "MACEO",
        "KY"
    ],
    "42356": [
        "MAPLE MOUNT",
        "KY"
    ],
    "42361": [
        "OLATON",
        "KY"
    ],
    "42366": [
        "PHILPOT",
        "KY"
    ],
    "42367": [
        "POWDERLY",
        "KY"
    ],
    "42368": [
        "REYNOLDS STATION",
        "KY"
    ],
    "42369": [
        "ROCKPORT",
        "KY"
    ],
    "42371": [
        "RUMSEY",
        "KY"
    ],
    "42372": [
        "SACRAMENTO",
        "KY"
    ],
    "42374": [
        "SOUTH CARROLLTON",
        "KY"
    ],
    "42376": [
        "UTICA",
        "KY"
    ],
    "42378": [
        "WHITESVILLE",
        "KY"
    ],
    "42404": [
        "CLAY",
        "KY"
    ],
    "42406": [
        "CORYDON",
        "KY"
    ],
    "42408": [
        "DAWSON SPRINGS",
        "KY"
    ],
    "42409": [
        "DIXON",
        "KY"
    ],
    "42410": [
        "EARLINGTON",
        "KY"
    ],
    "42411": [
        "FREDONIA",
        "KY"
    ],
    "42413": [
        "HANSON",
        "KY"
    ],
    "42419": [
        "HENDERSON",
        "KY"
    ],
    "42420": [
        "HENDERSON",
        "KY"
    ],
    "42431": [
        "MADISONVILLE",
        "KY"
    ],
    "42436": [
        "MANITOU",
        "KY"
    ],
    "42437": [
        "MORGANFIELD",
        "KY"
    ],
    "42440": [
        "MORTONS GAP",
        "KY"
    ],
    "42441": [
        "NEBO",
        "KY"
    ],
    "42442": [
        "NORTONVILLE",
        "KY"
    ],
    "42444": [
        "POOLE",
        "KY"
    ],
    "42445": [
        "PRINCETON",
        "KY"
    ],
    "42450": [
        "PROVIDENCE",
        "KY"
    ],
    "42451": [
        "REED",
        "KY"
    ],
    "42452": [
        "ROBARDS",
        "KY"
    ],
    "42453": [
        "SAINT CHARLES",
        "KY"
    ],
    "42455": [
        "SEBREE",
        "KY"
    ],
    "42456": [
        "SLAUGHTERS",
        "KY"
    ],
    "42457": [
        "SMITH MILLS",
        "KY"
    ],
    "42458": [
        "SPOTTSVILLE",
        "KY"
    ],
    "42459": [
        "STURGIS",
        "KY"
    ],
    "42460": [
        "SULLIVAN",
        "KY"
    ],
    "42461": [
        "UNIONTOWN",
        "KY"
    ],
    "42462": [
        "WAVERLY",
        "KY"
    ],
    "42463": [
        "WHEATCROFT",
        "KY"
    ],
    "42464": [
        "WHITE PLAINS",
        "KY"
    ],
    "42501": [
        "SOMERSET",
        "KY"
    ],
    "42502": [
        "SOMERSET",
        "KY"
    ],
    "42503": [
        "SOMERSET",
        "KY"
    ],
    "42516": [
        "BETHELRIDGE",
        "KY"
    ],
    "42518": [
        "BRONSTON",
        "KY"
    ],
    "42519": [
        "BURNSIDE",
        "KY"
    ],
    "42528": [
        "DUNNVILLE",
        "KY"
    ],
    "42533": [
        "FERGUSON",
        "KY"
    ],
    "42539": [
        "LIBERTY",
        "KY"
    ],
    "42541": [
        "MIDDLEBURG",
        "KY"
    ],
    "42544": [
        "NANCY",
        "KY"
    ],
    "42553": [
        "SCIENCE HILL",
        "KY"
    ],
    "42558": [
        "TATEVILLE",
        "KY"
    ],
    "42564": [
        "WEST SOMERSET",
        "KY"
    ],
    "42565": [
        "WINDSOR",
        "KY"
    ],
    "42566": [
        "YOSEMITE",
        "KY"
    ],
    "42567": [
        "EUBANK",
        "KY"
    ],
    "42602": [
        "ALBANY",
        "KY"
    ],
    "42603": [
        "ALPHA",
        "KY"
    ],
    "42629": [
        "JAMESTOWN",
        "KY"
    ],
    "42631": [
        "MARSHES SIDING",
        "KY"
    ],
    "42633": [
        "MONTICELLO",
        "KY"
    ],
    "42634": [
        "PARKERS LAKE",
        "KY"
    ],
    "42635": [
        "PINE KNOT",
        "KY"
    ],
    "42638": [
        "REVELO",
        "KY"
    ],
    "42642": [
        "RUSSELL SPRINGS",
        "KY"
    ],
    "42647": [
        "STEARNS",
        "KY"
    ],
    "42649": [
        "STRUNK",
        "KY"
    ],
    "42653": [
        "WHITLEY CITY",
        "KY"
    ],
    "42701": [
        "ELIZABETHTOWN",
        "KY"
    ],
    "42702": [
        "ELIZABETHTOWN",
        "KY"
    ],
    "42712": [
        "BIG CLIFTY",
        "KY"
    ],
    "42713": [
        "BONNIEVILLE",
        "KY"
    ],
    "42715": [
        "BREEDING",
        "KY"
    ],
    "42716": [
        "BUFFALO",
        "KY"
    ],
    "42717": [
        "BURKESVILLE",
        "KY"
    ],
    "42718": [
        "CAMPBELLSVILLE",
        "KY"
    ],
    "42719": [
        "CAMPBELLSVILLE",
        "KY"
    ],
    "42721": [
        "CANEYVILLE",
        "KY"
    ],
    "42722": [
        "CANMER",
        "KY"
    ],
    "42724": [
        "CECILIA",
        "KY"
    ],
    "42726": [
        "CLARKSON",
        "KY"
    ],
    "42728": [
        "COLUMBIA",
        "KY"
    ],
    "42729": [
        "CUB RUN",
        "KY"
    ],
    "42732": [
        "EASTVIEW",
        "KY"
    ],
    "42733": [
        "ELK HORN",
        "KY"
    ],
    "42740": [
        "GLENDALE",
        "KY"
    ],
    "42741": [
        "GLENS FORK",
        "KY"
    ],
    "42743": [
        "GREENSBURG",
        "KY"
    ],
    "42746": [
        "HARDYVILLE",
        "KY"
    ],
    "42748": [
        "HODGENVILLE",
        "KY"
    ],
    "42749": [
        "HORSE CAVE",
        "KY"
    ],
    "42753": [
        "KNIFLEY",
        "KY"
    ],
    "42754": [
        "LEITCHFIELD",
        "KY"
    ],
    "42755": [
        "LEITCHFIELD",
        "KY"
    ],
    "42757": [
        "MAGNOLIA",
        "KY"
    ],
    "42758": [
        "MANNSVILLE",
        "KY"
    ],
    "42759": [
        "MARROWBONE",
        "KY"
    ],
    "42762": [
        "MILLWOOD",
        "KY"
    ],
    "42764": [
        "MOUNT SHERMAN",
        "KY"
    ],
    "42765": [
        "MUNFORDVILLE",
        "KY"
    ],
    "42776": [
        "SONORA",
        "KY"
    ],
    "42782": [
        "SUMMERSVILLE",
        "KY"
    ],
    "42784": [
        "UPTON",
        "KY"
    ],
    "42788": [
        "WHITE MILLS",
        "KY"
    ],
    "43001": [
        "ALEXANDRIA",
        "OH"
    ],
    "43002": [
        "AMLIN",
        "OH"
    ],
    "43003": [
        "ASHLEY",
        "OH"
    ],
    "43004": [
        "BLACKLICK",
        "OH"
    ],
    "43005": [
        "BLADENSBURG",
        "OH"
    ],
    "43006": [
        "BRINKHAVEN",
        "OH"
    ],
    "43007": [
        "BROADWAY",
        "OH"
    ],
    "43008": [
        "BUCKEYE LAKE",
        "OH"
    ],
    "43009": [
        "CABLE",
        "OH"
    ],
    "43010": [
        "CATAWBA",
        "OH"
    ],
    "43011": [
        "CENTERBURG",
        "OH"
    ],
    "43013": [
        "CROTON",
        "OH"
    ],
    "43014": [
        "DANVILLE",
        "OH"
    ],
    "43015": [
        "DELAWARE",
        "OH"
    ],
    "43016": [
        "DUBLIN",
        "OH"
    ],
    "43017": [
        "DUBLIN",
        "OH"
    ],
    "43018": [
        "ETNA",
        "OH"
    ],
    "43019": [
        "FREDERICKTOWN",
        "OH"
    ],
    "43021": [
        "GALENA",
        "OH"
    ],
    "43022": [
        "GAMBIER",
        "OH"
    ],
    "43023": [
        "GRANVILLE",
        "OH"
    ],
    "43025": [
        "HEBRON",
        "OH"
    ],
    "43026": [
        "HILLIARD",
        "OH"
    ],
    "43027": [
        "HOMER",
        "OH"
    ],
    "43028": [
        "HOWARD",
        "OH"
    ],
    "43029": [
        "IRWIN",
        "OH"
    ],
    "43030": [
        "JACKSONTOWN",
        "OH"
    ],
    "43031": [
        "JOHNSTOWN",
        "OH"
    ],
    "43032": [
        "KILBOURNE",
        "OH"
    ],
    "43033": [
        "KIRKERSVILLE",
        "OH"
    ],
    "43035": [
        "LEWIS CENTER",
        "OH"
    ],
    "43036": [
        "MAGNETIC SPRINGS",
        "OH"
    ],
    "43037": [
        "MARTINSBURG",
        "OH"
    ],
    "43040": [
        "MARYSVILLE",
        "OH"
    ],
    "43041": [
        "MARYSVILLE",
        "OH"
    ],
    "43044": [
        "MECHANICSBURG",
        "OH"
    ],
    "43045": [
        "MILFORD CENTER",
        "OH"
    ],
    "43046": [
        "MILLERSPORT",
        "OH"
    ],
    "43047": [
        "MINGO",
        "OH"
    ],
    "43048": [
        "MOUNT LIBERTY",
        "OH"
    ],
    "43050": [
        "MOUNT VERNON",
        "OH"
    ],
    "43054": [
        "NEW ALBANY",
        "OH"
    ],
    "43055": [
        "NEWARK",
        "OH"
    ],
    "43056": [
        "HEATH",
        "OH"
    ],
    "43058": [
        "NEWARK",
        "OH"
    ],
    "43060": [
        "NORTH LEWISBURG",
        "OH"
    ],
    "43061": [
        "OSTRANDER",
        "OH"
    ],
    "43062": [
        "PATASKALA",
        "OH"
    ],
    "43064": [
        "PLAIN CITY",
        "OH"
    ],
    "43065": [
        "POWELL",
        "OH"
    ],
    "43066": [
        "RADNOR",
        "OH"
    ],
    "43067": [
        "RAYMOND",
        "OH"
    ],
    "43068": [
        "REYNOLDSBURG",
        "OH"
    ],
    "43070": [
        "ROSEWOOD",
        "OH"
    ],
    "43071": [
        "SAINT LOUISVILLE",
        "OH"
    ],
    "43072": [
        "SAINT PARIS",
        "OH"
    ],
    "43073": [
        "SUMMIT STATION",
        "OH"
    ],
    "43074": [
        "SUNBURY",
        "OH"
    ],
    "43076": [
        "THORNVILLE",
        "OH"
    ],
    "43077": [
        "UNIONVILLE CENTER",
        "OH"
    ],
    "43078": [
        "URBANA",
        "OH"
    ],
    "43080": [
        "UTICA",
        "OH"
    ],
    "43081": [
        "WESTERVILLE",
        "OH"
    ],
    "43082": [
        "WESTERVILLE",
        "OH"
    ],
    "43083": [
        "WESTVILLE",
        "OH"
    ],
    "43084": [
        "WOODSTOCK",
        "OH"
    ],
    "43085": [
        "COLUMBUS",
        "OH"
    ],
    "43086": [
        "WESTERVILLE",
        "OH"
    ],
    "43101": [
        "ADELPHI",
        "OH"
    ],
    "43102": [
        "AMANDA",
        "OH"
    ],
    "43103": [
        "ASHVILLE",
        "OH"
    ],
    "43105": [
        "BALTIMORE",
        "OH"
    ],
    "43106": [
        "BLOOMINGBURG",
        "OH"
    ],
    "43107": [
        "BREMEN",
        "OH"
    ],
    "43109": [
        "BRICE",
        "OH"
    ],
    "43110": [
        "CANAL WINCHESTER",
        "OH"
    ],
    "43111": [
        "CARBON HILL",
        "OH"
    ],
    "43112": [
        "CARROLL",
        "OH"
    ],
    "43113": [
        "CIRCLEVILLE",
        "OH"
    ],
    "43115": [
        "CLARKSBURG",
        "OH"
    ],
    "43116": [
        "COMMERCIAL POINT",
        "OH"
    ],
    "43119": [
        "GALLOWAY",
        "OH"
    ],
    "43123": [
        "GROVE CITY",
        "OH"
    ],
    "43125": [
        "GROVEPORT",
        "OH"
    ],
    "43126": [
        "HARRISBURG",
        "OH"
    ],
    "43127": [
        "HAYDENVILLE",
        "OH"
    ],
    "43128": [
        "JEFFERSONVILLE",
        "OH"
    ],
    "43130": [
        "LANCASTER",
        "OH"
    ],
    "43135": [
        "LAURELVILLE",
        "OH"
    ],
    "43136": [
        "LITHOPOLIS",
        "OH"
    ],
    "43137": [
        "LOCKBOURNE",
        "OH"
    ],
    "43138": [
        "LOGAN",
        "OH"
    ],
    "43140": [
        "LONDON",
        "OH"
    ],
    "43142": [
        "MILLEDGEVILLE",
        "OH"
    ],
    "43143": [
        "MOUNT STERLING",
        "OH"
    ],
    "43144": [
        "MURRAY CITY",
        "OH"
    ],
    "43145": [
        "NEW HOLLAND",
        "OH"
    ],
    "43146": [
        "ORIENT",
        "OH"
    ],
    "43147": [
        "PICKERINGTON",
        "OH"
    ],
    "43148": [
        "PLEASANTVILLE",
        "OH"
    ],
    "43149": [
        "ROCKBRIDGE",
        "OH"
    ],
    "43150": [
        "RUSHVILLE",
        "OH"
    ],
    "43151": [
        "SEDALIA",
        "OH"
    ],
    "43152": [
        "SOUTH BLOOMINGVILLE",
        "OH"
    ],
    "43153": [
        "SOUTH SOLON",
        "OH"
    ],
    "43154": [
        "STOUTSVILLE",
        "OH"
    ],
    "43155": [
        "SUGAR GROVE",
        "OH"
    ],
    "43156": [
        "TARLTON",
        "OH"
    ],
    "43157": [
        "THURSTON",
        "OH"
    ],
    "43158": [
        "UNION FURNACE",
        "OH"
    ],
    "43160": [
        "WASHINGTON COURT HOUSE",
        "OH"
    ],
    "43162": [
        "WEST JEFFERSON",
        "OH"
    ],
    "43164": [
        "WILLIAMSPORT",
        "OH"
    ],
    "43194": [
        "LOCKBOURNE",
        "OH"
    ],
    "43201": [
        "COLUMBUS",
        "OH"
    ],
    "43202": [
        "COLUMBUS",
        "OH"
    ],
    "43203": [
        "COLUMBUS",
        "OH"
    ],
    "43204": [
        "COLUMBUS",
        "OH"
    ],
    "43205": [
        "COLUMBUS",
        "OH"
    ],
    "43206": [
        "COLUMBUS",
        "OH"
    ],
    "43207": [
        "COLUMBUS",
        "OH"
    ],
    "43209": [
        "COLUMBUS",
        "OH"
    ],
    "43210": [
        "COLUMBUS",
        "OH"
    ],
    "43211": [
        "COLUMBUS",
        "OH"
    ],
    "43212": [
        "COLUMBUS",
        "OH"
    ],
    "43213": [
        "COLUMBUS",
        "OH"
    ],
    "43214": [
        "COLUMBUS",
        "OH"
    ],
    "43215": [
        "COLUMBUS",
        "OH"
    ],
    "43216": [
        "COLUMBUS",
        "OH"
    ],
    "43217": [
        "COLUMBUS",
        "OH"
    ],
    "43218": [
        "COLUMBUS",
        "OH"
    ],
    "43219": [
        "COLUMBUS",
        "OH"
    ],
    "43220": [
        "COLUMBUS",
        "OH"
    ],
    "43221": [
        "COLUMBUS",
        "OH"
    ],
    "43222": [
        "COLUMBUS",
        "OH"
    ],
    "43223": [
        "COLUMBUS",
        "OH"
    ],
    "43224": [
        "COLUMBUS",
        "OH"
    ],
    "43227": [
        "COLUMBUS",
        "OH"
    ],
    "43228": [
        "COLUMBUS",
        "OH"
    ],
    "43229": [
        "COLUMBUS",
        "OH"
    ],
    "43230": [
        "COLUMBUS",
        "OH"
    ],
    "43231": [
        "COLUMBUS",
        "OH"
    ],
    "43232": [
        "COLUMBUS",
        "OH"
    ],
    "43235": [
        "COLUMBUS",
        "OH"
    ],
    "43236": [
        "COLUMBUS",
        "OH"
    ],
    "43240": [
        "COLUMBUS",
        "OH"
    ],
    "43251": [
        "COLUMBUS",
        "OH"
    ],
    "43260": [
        "COLUMBUS",
        "OH"
    ],
    "43266": [
        "COLUMBUS",
        "OH"
    ],
    "43271": [
        "COLUMBUS",
        "OH"
    ],
    "43287": [
        "COLUMBUS",
        "OH"
    ],
    "43291": [
        "COLUMBUS",
        "OH"
    ],
    "43301": [
        "MARION",
        "OH"
    ],
    "43302": [
        "MARION",
        "OH"
    ],
    "43310": [
        "BELLE CENTER",
        "OH"
    ],
    "43311": [
        "BELLEFONTAINE",
        "OH"
    ],
    "43314": [
        "CALEDONIA",
        "OH"
    ],
    "43315": [
        "CARDINGTON",
        "OH"
    ],
    "43316": [
        "CAREY",
        "OH"
    ],
    "43317": [
        "CHESTERVILLE",
        "OH"
    ],
    "43318": [
        "DE GRAFF",
        "OH"
    ],
    "43319": [
        "EAST LIBERTY",
        "OH"
    ],
    "43320": [
        "EDISON",
        "OH"
    ],
    "43321": [
        "FULTON",
        "OH"
    ],
    "43322": [
        "GREEN CAMP",
        "OH"
    ],
    "43323": [
        "HARPSTER",
        "OH"
    ],
    "43324": [
        "HUNTSVILLE",
        "OH"
    ],
    "43325": [
        "IBERIA",
        "OH"
    ],
    "43326": [
        "KENTON",
        "OH"
    ],
    "43330": [
        "KIRBY",
        "OH"
    ],
    "43331": [
        "LAKEVIEW",
        "OH"
    ],
    "43332": [
        "LA RUE",
        "OH"
    ],
    "43333": [
        "LEWISTOWN",
        "OH"
    ],
    "43334": [
        "MARENGO",
        "OH"
    ],
    "43335": [
        "MARTEL",
        "OH"
    ],
    "43336": [
        "MIDDLEBURG",
        "OH"
    ],
    "43337": [
        "MORRAL",
        "OH"
    ],
    "43338": [
        "MOUNT GILEAD",
        "OH"
    ],
    "43340": [
        "MOUNT VICTORY",
        "OH"
    ],
    "43341": [
        "NEW BLOOMINGTON",
        "OH"
    ],
    "43342": [
        "PROSPECT",
        "OH"
    ],
    "43343": [
        "QUINCY",
        "OH"
    ],
    "43344": [
        "RICHWOOD",
        "OH"
    ],
    "43345": [
        "RIDGEWAY",
        "OH"
    ],
    "43346": [
        "ROUNDHEAD",
        "OH"
    ],
    "43347": [
        "RUSHSYLVANIA",
        "OH"
    ],
    "43348": [
        "RUSSELLS POINT",
        "OH"
    ],
    "43349": [
        "SHAUCK",
        "OH"
    ],
    "43350": [
        "SPARTA",
        "OH"
    ],
    "43351": [
        "UPPER SANDUSKY",
        "OH"
    ],
    "43356": [
        "WALDO",
        "OH"
    ],
    "43357": [
        "WEST LIBERTY",
        "OH"
    ],
    "43358": [
        "WEST MANSFIELD",
        "OH"
    ],
    "43359": [
        "WHARTON",
        "OH"
    ],
    "43360": [
        "ZANESFIELD",
        "OH"
    ],
    "43402": [
        "BOWLING GREEN",
        "OH"
    ],
    "43403": [
        "BOWLING GREEN",
        "OH"
    ],
    "43406": [
        "BRADNER",
        "OH"
    ],
    "43407": [
        "BURGOON",
        "OH"
    ],
    "43408": [
        "CLAY CENTER",
        "OH"
    ],
    "43410": [
        "CLYDE",
        "OH"
    ],
    "43412": [
        "CURTICE",
        "OH"
    ],
    "43413": [
        "CYGNET",
        "OH"
    ],
    "43414": [
        "DUNBRIDGE",
        "OH"
    ],
    "43416": [
        "ELMORE",
        "OH"
    ],
    "43420": [
        "FREMONT",
        "OH"
    ],
    "43430": [
        "GENOA",
        "OH"
    ],
    "43431": [
        "GIBSONBURG",
        "OH"
    ],
    "43432": [
        "GRAYTOWN",
        "OH"
    ],
    "43433": [
        "GYPSUM",
        "OH"
    ],
    "43435": [
        "HELENA",
        "OH"
    ],
    "43437": [
        "JERRY CITY",
        "OH"
    ],
    "43438": [
        "KELLEYS ISLAND",
        "OH"
    ],
    "43439": [
        "LACARNE",
        "OH"
    ],
    "43440": [
        "LAKESIDE MARBLEHEAD",
        "OH"
    ],
    "43441": [
        "LEMOYNE",
        "OH"
    ],
    "43442": [
        "LINDSEY",
        "OH"
    ],
    "43443": [
        "LUCKEY",
        "OH"
    ],
    "43445": [
        "MARTIN",
        "OH"
    ],
    "43446": [
        "MIDDLE BASS",
        "OH"
    ],
    "43447": [
        "MILLBURY",
        "OH"
    ],
    "43449": [
        "OAK HARBOR",
        "OH"
    ],
    "43450": [
        "PEMBERVILLE",
        "OH"
    ],
    "43451": [
        "PORTAGE",
        "OH"
    ],
    "43452": [
        "PORT CLINTON",
        "OH"
    ],
    "43456": [
        "PUT IN BAY",
        "OH"
    ],
    "43457": [
        "RISINGSUN",
        "OH"
    ],
    "43458": [
        "ROCKY RIDGE",
        "OH"
    ],
    "43460": [
        "ROSSFORD",
        "OH"
    ],
    "43462": [
        "RUDOLPH",
        "OH"
    ],
    "43463": [
        "STONY RIDGE",
        "OH"
    ],
    "43464": [
        "VICKERY",
        "OH"
    ],
    "43465": [
        "WALBRIDGE",
        "OH"
    ],
    "43466": [
        "WAYNE",
        "OH"
    ],
    "43468": [
        "WILLISTON",
        "OH"
    ],
    "43469": [
        "WOODVILLE",
        "OH"
    ],
    "43501": [
        "ALVORDTON",
        "OH"
    ],
    "43502": [
        "ARCHBOLD",
        "OH"
    ],
    "43504": [
        "BERKEY",
        "OH"
    ],
    "43505": [
        "BLAKESLEE",
        "OH"
    ],
    "43506": [
        "BRYAN",
        "OH"
    ],
    "43511": [
        "CUSTAR",
        "OH"
    ],
    "43512": [
        "DEFIANCE",
        "OH"
    ],
    "43515": [
        "DELTA",
        "OH"
    ],
    "43516": [
        "DESHLER",
        "OH"
    ],
    "43517": [
        "EDGERTON",
        "OH"
    ],
    "43518": [
        "EDON",
        "OH"
    ],
    "43519": [
        "EVANSPORT",
        "OH"
    ],
    "43520": [
        "FARMER",
        "OH"
    ],
    "43521": [
        "FAYETTE",
        "OH"
    ],
    "43522": [
        "GRAND RAPIDS",
        "OH"
    ],
    "43523": [
        "GRELTON",
        "OH"
    ],
    "43524": [
        "HAMLER",
        "OH"
    ],
    "43525": [
        "HASKINS",
        "OH"
    ],
    "43526": [
        "HICKSVILLE",
        "OH"
    ],
    "43527": [
        "HOLGATE",
        "OH"
    ],
    "43528": [
        "HOLLAND",
        "OH"
    ],
    "43529": [
        "HOYTVILLE",
        "OH"
    ],
    "43530": [
        "JEWELL",
        "OH"
    ],
    "43531": [
        "KUNKLE",
        "OH"
    ],
    "43532": [
        "LIBERTY CENTER",
        "OH"
    ],
    "43533": [
        "LYONS",
        "OH"
    ],
    "43534": [
        "MC CLURE",
        "OH"
    ],
    "43535": [
        "MALINTA",
        "OH"
    ],
    "43536": [
        "MARK CENTER",
        "OH"
    ],
    "43537": [
        "MAUMEE",
        "OH"
    ],
    "43540": [
        "METAMORA",
        "OH"
    ],
    "43541": [
        "MILTON CENTER",
        "OH"
    ],
    "43542": [
        "MONCLOVA",
        "OH"
    ],
    "43543": [
        "MONTPELIER",
        "OH"
    ],
    "43545": [
        "NAPOLEON",
        "OH"
    ],
    "43547": [
        "NEAPOLIS",
        "OH"
    ],
    "43548": [
        "NEW BAVARIA",
        "OH"
    ],
    "43549": [
        "NEY",
        "OH"
    ],
    "43550": [
        "OKOLONA",
        "OH"
    ],
    "43551": [
        "PERRYSBURG",
        "OH"
    ],
    "43552": [
        "PERRYSBURG",
        "OH"
    ],
    "43553": [
        "PETTISVILLE",
        "OH"
    ],
    "43554": [
        "PIONEER",
        "OH"
    ],
    "43555": [
        "RIDGEVILLE CORNERS",
        "OH"
    ],
    "43556": [
        "SHERWOOD",
        "OH"
    ],
    "43557": [
        "STRYKER",
        "OH"
    ],
    "43558": [
        "SWANTON",
        "OH"
    ],
    "43560": [
        "SYLVANIA",
        "OH"
    ],
    "43565": [
        "TONTOGANY",
        "OH"
    ],
    "43566": [
        "WATERVILLE",
        "OH"
    ],
    "43567": [
        "WAUSEON",
        "OH"
    ],
    "43569": [
        "WESTON",
        "OH"
    ],
    "43570": [
        "WEST UNITY",
        "OH"
    ],
    "43571": [
        "WHITEHOUSE",
        "OH"
    ],
    "43601": [
        "TOLEDO",
        "OH"
    ],
    "43603": [
        "TOLEDO",
        "OH"
    ],
    "43604": [
        "TOLEDO",
        "OH"
    ],
    "43605": [
        "TOLEDO",
        "OH"
    ],
    "43606": [
        "TOLEDO",
        "OH"
    ],
    "43607": [
        "TOLEDO",
        "OH"
    ],
    "43608": [
        "TOLEDO",
        "OH"
    ],
    "43609": [
        "TOLEDO",
        "OH"
    ],
    "43610": [
        "TOLEDO",
        "OH"
    ],
    "43611": [
        "TOLEDO",
        "OH"
    ],
    "43612": [
        "TOLEDO",
        "OH"
    ],
    "43613": [
        "TOLEDO",
        "OH"
    ],
    "43614": [
        "TOLEDO",
        "OH"
    ],
    "43615": [
        "TOLEDO",
        "OH"
    ],
    "43616": [
        "OREGON",
        "OH"
    ],
    "43617": [
        "TOLEDO",
        "OH"
    ],
    "43619": [
        "NORTHWOOD",
        "OH"
    ],
    "43620": [
        "TOLEDO",
        "OH"
    ],
    "43623": [
        "TOLEDO",
        "OH"
    ],
    "43635": [
        "TOLEDO",
        "OH"
    ],
    "43652": [
        "TOLEDO",
        "OH"
    ],
    "43659": [
        "TOLEDO",
        "OH"
    ],
    "43660": [
        "TOLEDO",
        "OH"
    ],
    "43697": [
        "TOLEDO",
        "OH"
    ],
    "43699": [
        "TOLEDO",
        "OH"
    ],
    "43701": [
        "ZANESVILLE",
        "OH"
    ],
    "43702": [
        "ZANESVILLE",
        "OH"
    ],
    "43711": [
        "AVA",
        "OH"
    ],
    "43713": [
        "BARNESVILLE",
        "OH"
    ],
    "43716": [
        "BEALLSVILLE",
        "OH"
    ],
    "43717": [
        "BELLE VALLEY",
        "OH"
    ],
    "43718": [
        "BELMONT",
        "OH"
    ],
    "43719": [
        "BETHESDA",
        "OH"
    ],
    "43720": [
        "BLUE ROCK",
        "OH"
    ],
    "43721": [
        "BROWNSVILLE",
        "OH"
    ],
    "43722": [
        "BUFFALO",
        "OH"
    ],
    "43723": [
        "BYESVILLE",
        "OH"
    ],
    "43724": [
        "CALDWELL",
        "OH"
    ],
    "43725": [
        "CAMBRIDGE",
        "OH"
    ],
    "43727": [
        "CHANDLERSVILLE",
        "OH"
    ],
    "43728": [
        "CHESTERHILL",
        "OH"
    ],
    "43730": [
        "CORNING",
        "OH"
    ],
    "43731": [
        "CROOKSVILLE",
        "OH"
    ],
    "43732": [
        "CUMBERLAND",
        "OH"
    ],
    "43733": [
        "DERWENT",
        "OH"
    ],
    "43734": [
        "DUNCAN FALLS",
        "OH"
    ],
    "43735": [
        "EAST FULTONHAM",
        "OH"
    ],
    "43738": [
        "FULTONHAM",
        "OH"
    ],
    "43739": [
        "GLENFORD",
        "OH"
    ],
    "43740": [
        "GRATIOT",
        "OH"
    ],
    "43746": [
        "HOPEWELL",
        "OH"
    ],
    "43747": [
        "JERUSALEM",
        "OH"
    ],
    "43748": [
        "JUNCTION CITY",
        "OH"
    ],
    "43749": [
        "KIMBOLTON",
        "OH"
    ],
    "43750": [
        "KIPLING",
        "OH"
    ],
    "43752": [
        "LAINGS",
        "OH"
    ],
    "43754": [
        "LEWISVILLE",
        "OH"
    ],
    "43755": [
        "LORE CITY",
        "OH"
    ],
    "43756": [
        "MCCONNELSVILLE",
        "OH"
    ],
    "43757": [
        "MALAGA",
        "OH"
    ],
    "43758": [
        "MALTA",
        "OH"
    ],
    "43759": [
        "MORRISTOWN",
        "OH"
    ],
    "43760": [
        "MOUNT PERRY",
        "OH"
    ],
    "43761": [
        "MOXAHALA",
        "OH"
    ],
    "43762": [
        "NEW CONCORD",
        "OH"
    ],
    "43764": [
        "NEW LEXINGTON",
        "OH"
    ],
    "43766": [
        "NEW STRAITSVILLE",
        "OH"
    ],
    "43767": [
        "NORWICH",
        "OH"
    ],
    "43768": [
        "OLD WASHINGTON",
        "OH"
    ],
    "43771": [
        "PHILO",
        "OH"
    ],
    "43772": [
        "PLEASANT CITY",
        "OH"
    ],
    "43773": [
        "QUAKER CITY",
        "OH"
    ],
    "43777": [
        "ROSEVILLE",
        "OH"
    ],
    "43778": [
        "SALESVILLE",
        "OH"
    ],
    "43779": [
        "SARAHSVILLE",
        "OH"
    ],
    "43780": [
        "SENECAVILLE",
        "OH"
    ],
    "43782": [
        "SHAWNEE",
        "OH"
    ],
    "43783": [
        "SOMERSET",
        "OH"
    ],
    "43786": [
        "STAFFORD",
        "OH"
    ],
    "43787": [
        "STOCKPORT",
        "OH"
    ],
    "43788": [
        "SUMMERFIELD",
        "OH"
    ],
    "43791": [
        "WHITE COTTAGE",
        "OH"
    ],
    "43793": [
        "WOODSFIELD",
        "OH"
    ],
    "43802": [
        "ADAMSVILLE",
        "OH"
    ],
    "43803": [
        "BAKERSVILLE",
        "OH"
    ],
    "43804": [
        "BALTIC",
        "OH"
    ],
    "43805": [
        "BLISSFIELD",
        "OH"
    ],
    "43811": [
        "CONESVILLE",
        "OH"
    ],
    "43812": [
        "COSHOCTON",
        "OH"
    ],
    "43821": [
        "DRESDEN",
        "OH"
    ],
    "43822": [
        "FRAZEYSBURG",
        "OH"
    ],
    "43824": [
        "FRESNO",
        "OH"
    ],
    "43830": [
        "NASHPORT",
        "OH"
    ],
    "43832": [
        "NEWCOMERSTOWN",
        "OH"
    ],
    "43836": [
        "PLAINFIELD",
        "OH"
    ],
    "43837": [
        "PORT WASHINGTON",
        "OH"
    ],
    "43840": [
        "STONE CREEK",
        "OH"
    ],
    "43842": [
        "TRINWAY",
        "OH"
    ],
    "43843": [
        "WALHONDING",
        "OH"
    ],
    "43844": [
        "WARSAW",
        "OH"
    ],
    "43845": [
        "WEST LAFAYETTE",
        "OH"
    ],
    "43901": [
        "ADENA",
        "OH"
    ],
    "43902": [
        "ALLEDONIA",
        "OH"
    ],
    "43903": [
        "AMSTERDAM",
        "OH"
    ],
    "43905": [
        "BARTON",
        "OH"
    ],
    "43906": [
        "BELLAIRE",
        "OH"
    ],
    "43907": [
        "CADIZ",
        "OH"
    ],
    "43908": [
        "BERGHOLZ",
        "OH"
    ],
    "43909": [
        "BLAINE",
        "OH"
    ],
    "43910": [
        "BLOOMINGDALE",
        "OH"
    ],
    "43912": [
        "BRIDGEPORT",
        "OH"
    ],
    "43913": [
        "BRILLIANT",
        "OH"
    ],
    "43914": [
        "CAMERON",
        "OH"
    ],
    "43915": [
        "CLARINGTON",
        "OH"
    ],
    "43916": [
        "COLERAIN",
        "OH"
    ],
    "43917": [
        "DILLONVALE",
        "OH"
    ],
    "43920": [
        "EAST LIVERPOOL",
        "OH"
    ],
    "43925": [
        "EAST SPRINGFIELD",
        "OH"
    ],
    "43926": [
        "EMPIRE",
        "OH"
    ],
    "43927": [
        "FAIRPOINT",
        "OH"
    ],
    "43930": [
        "HAMMONDSVILLE",
        "OH"
    ],
    "43931": [
        "HANNIBAL",
        "OH"
    ],
    "43932": [
        "IRONDALE",
        "OH"
    ],
    "43933": [
        "JACOBSBURG",
        "OH"
    ],
    "43934": [
        "LANSING",
        "OH"
    ],
    "43935": [
        "MARTINS FERRY",
        "OH"
    ],
    "43937": [
        "MAYNARD",
        "OH"
    ],
    "43938": [
        "MINGO JUNCTION",
        "OH"
    ],
    "43939": [
        "MOUNT PLEASANT",
        "OH"
    ],
    "43940": [
        "NEFFS",
        "OH"
    ],
    "43942": [
        "POWHATAN POINT",
        "OH"
    ],
    "43943": [
        "RAYLAND",
        "OH"
    ],
    "43944": [
        "RICHMOND",
        "OH"
    ],
    "43945": [
        "SALINEVILLE",
        "OH"
    ],
    "43946": [
        "SARDIS",
        "OH"
    ],
    "43947": [
        "SHADYSIDE",
        "OH"
    ],
    "43948": [
        "SMITHFIELD",
        "OH"
    ],
    "43950": [
        "SAINT CLAIRSVILLE",
        "OH"
    ],
    "43951": [
        "LAFFERTY",
        "OH"
    ],
    "43952": [
        "STEUBENVILLE",
        "OH"
    ],
    "43953": [
        "STEUBENVILLE",
        "OH"
    ],
    "43961": [
        "STRATTON",
        "OH"
    ],
    "43962": [
        "SUMMITVILLE",
        "OH"
    ],
    "43963": [
        "TILTONSVILLE",
        "OH"
    ],
    "43964": [
        "TORONTO",
        "OH"
    ],
    "43967": [
        "WARNOCK",
        "OH"
    ],
    "43968": [
        "WELLSVILLE",
        "OH"
    ],
    "43971": [
        "YORKVILLE",
        "OH"
    ],
    "43972": [
        "BANNOCK",
        "OH"
    ],
    "43973": [
        "FREEPORT",
        "OH"
    ],
    "43974": [
        "HARRISVILLE",
        "OH"
    ],
    "43976": [
        "HOPEDALE",
        "OH"
    ],
    "43977": [
        "FLUSHING",
        "OH"
    ],
    "43981": [
        "NEW ATHENS",
        "OH"
    ],
    "43983": [
        "PIEDMONT",
        "OH"
    ],
    "43985": [
        "HOLLOWAY",
        "OH"
    ],
    "43986": [
        "JEWETT",
        "OH"
    ],
    "43988": [
        "SCIO",
        "OH"
    ],
    "44001": [
        "AMHERST",
        "OH"
    ],
    "44003": [
        "ANDOVER",
        "OH"
    ],
    "44004": [
        "ASHTABULA",
        "OH"
    ],
    "44005": [
        "ASHTABULA",
        "OH"
    ],
    "44010": [
        "AUSTINBURG",
        "OH"
    ],
    "44011": [
        "AVON",
        "OH"
    ],
    "44012": [
        "AVON LAKE",
        "OH"
    ],
    "44017": [
        "BEREA",
        "OH"
    ],
    "44021": [
        "BURTON",
        "OH"
    ],
    "44022": [
        "CHAGRIN FALLS",
        "OH"
    ],
    "44023": [
        "CHAGRIN FALLS",
        "OH"
    ],
    "44024": [
        "CHARDON",
        "OH"
    ],
    "44026": [
        "CHESTERLAND",
        "OH"
    ],
    "44028": [
        "COLUMBIA STATION",
        "OH"
    ],
    "44030": [
        "CONNEAUT",
        "OH"
    ],
    "44032": [
        "DORSET",
        "OH"
    ],
    "44033": [
        "EAST CLARIDON",
        "OH"
    ],
    "44035": [
        "ELYRIA",
        "OH"
    ],
    "44036": [
        "ELYRIA",
        "OH"
    ],
    "44039": [
        "NORTH RIDGEVILLE",
        "OH"
    ],
    "44040": [
        "GATES MILLS",
        "OH"
    ],
    "44041": [
        "GENEVA",
        "OH"
    ],
    "44044": [
        "GRAFTON",
        "OH"
    ],
    "44045": [
        "GRAND RIVER",
        "OH"
    ],
    "44046": [
        "HUNTSBURG",
        "OH"
    ],
    "44047": [
        "JEFFERSON",
        "OH"
    ],
    "44048": [
        "KINGSVILLE",
        "OH"
    ],
    "44049": [
        "KIPTON",
        "OH"
    ],
    "44050": [
        "LAGRANGE",
        "OH"
    ],
    "44052": [
        "LORAIN",
        "OH"
    ],
    "44053": [
        "LORAIN",
        "OH"
    ],
    "44054": [
        "SHEFFIELD LAKE",
        "OH"
    ],
    "44055": [
        "LORAIN",
        "OH"
    ],
    "44056": [
        "MACEDONIA",
        "OH"
    ],
    "44057": [
        "MADISON",
        "OH"
    ],
    "44060": [
        "MENTOR",
        "OH"
    ],
    "44061": [
        "MENTOR",
        "OH"
    ],
    "44062": [
        "MIDDLEFIELD",
        "OH"
    ],
    "44064": [
        "MONTVILLE",
        "OH"
    ],
    "44065": [
        "NEWBURY",
        "OH"
    ],
    "44067": [
        "NORTHFIELD",
        "OH"
    ],
    "44068": [
        "NORTH KINGSVILLE",
        "OH"
    ],
    "44070": [
        "NORTH OLMSTED",
        "OH"
    ],
    "44072": [
        "NOVELTY",
        "OH"
    ],
    "44073": [
        "NOVELTY",
        "OH"
    ],
    "44074": [
        "OBERLIN",
        "OH"
    ],
    "44076": [
        "ORWELL",
        "OH"
    ],
    "44077": [
        "PAINESVILLE",
        "OH"
    ],
    "44080": [
        "PARKMAN",
        "OH"
    ],
    "44081": [
        "PERRY",
        "OH"
    ],
    "44082": [
        "PIERPONT",
        "OH"
    ],
    "44084": [
        "ROCK CREEK",
        "OH"
    ],
    "44085": [
        "ROME",
        "OH"
    ],
    "44086": [
        "THOMPSON",
        "OH"
    ],
    "44087": [
        "TWINSBURG",
        "OH"
    ],
    "44088": [
        "UNIONVILLE",
        "OH"
    ],
    "44089": [
        "VERMILION",
        "OH"
    ],
    "44090": [
        "WELLINGTON",
        "OH"
    ],
    "44092": [
        "WICKLIFFE",
        "OH"
    ],
    "44093": [
        "WILLIAMSFIELD",
        "OH"
    ],
    "44094": [
        "WILLOUGHBY",
        "OH"
    ],
    "44095": [
        "EASTLAKE",
        "OH"
    ],
    "44096": [
        "WILLOUGHBY",
        "OH"
    ],
    "44099": [
        "WINDSOR",
        "OH"
    ],
    "44101": [
        "CLEVELAND",
        "OH"
    ],
    "44102": [
        "CLEVELAND",
        "OH"
    ],
    "44103": [
        "CLEVELAND",
        "OH"
    ],
    "44104": [
        "CLEVELAND",
        "OH"
    ],
    "44105": [
        "CLEVELAND",
        "OH"
    ],
    "44106": [
        "CLEVELAND",
        "OH"
    ],
    "44107": [
        "LAKEWOOD",
        "OH"
    ],
    "44108": [
        "CLEVELAND",
        "OH"
    ],
    "44109": [
        "CLEVELAND",
        "OH"
    ],
    "44110": [
        "CLEVELAND",
        "OH"
    ],
    "44111": [
        "CLEVELAND",
        "OH"
    ],
    "44112": [
        "CLEVELAND",
        "OH"
    ],
    "44113": [
        "CLEVELAND",
        "OH"
    ],
    "44114": [
        "CLEVELAND",
        "OH"
    ],
    "44115": [
        "CLEVELAND",
        "OH"
    ],
    "44116": [
        "ROCKY RIVER",
        "OH"
    ],
    "44117": [
        "EUCLID",
        "OH"
    ],
    "44118": [
        "CLEVELAND",
        "OH"
    ],
    "44119": [
        "CLEVELAND",
        "OH"
    ],
    "44120": [
        "CLEVELAND",
        "OH"
    ],
    "44121": [
        "CLEVELAND",
        "OH"
    ],
    "44122": [
        "BEACHWOOD",
        "OH"
    ],
    "44123": [
        "EUCLID",
        "OH"
    ],
    "44124": [
        "CLEVELAND",
        "OH"
    ],
    "44125": [
        "CLEVELAND",
        "OH"
    ],
    "44126": [
        "CLEVELAND",
        "OH"
    ],
    "44127": [
        "CLEVELAND",
        "OH"
    ],
    "44128": [
        "CLEVELAND",
        "OH"
    ],
    "44129": [
        "CLEVELAND",
        "OH"
    ],
    "44130": [
        "CLEVELAND",
        "OH"
    ],
    "44131": [
        "INDEPENDENCE",
        "OH"
    ],
    "44132": [
        "EUCLID",
        "OH"
    ],
    "44133": [
        "NORTH ROYALTON",
        "OH"
    ],
    "44134": [
        "CLEVELAND",
        "OH"
    ],
    "44135": [
        "CLEVELAND",
        "OH"
    ],
    "44136": [
        "STRONGSVILLE",
        "OH"
    ],
    "44137": [
        "MAPLE HEIGHTS",
        "OH"
    ],
    "44138": [
        "OLMSTED FALLS",
        "OH"
    ],
    "44139": [
        "SOLON",
        "OH"
    ],
    "44140": [
        "BAY VILLAGE",
        "OH"
    ],
    "44141": [
        "BRECKSVILLE",
        "OH"
    ],
    "44142": [
        "BROOKPARK",
        "OH"
    ],
    "44143": [
        "CLEVELAND",
        "OH"
    ],
    "44144": [
        "CLEVELAND",
        "OH"
    ],
    "44145": [
        "WESTLAKE",
        "OH"
    ],
    "44146": [
        "BEDFORD",
        "OH"
    ],
    "44147": [
        "BROADVIEW HEIGHTS",
        "OH"
    ],
    "44149": [
        "STRONGSVILLE",
        "OH"
    ],
    "44181": [
        "CLEVELAND",
        "OH"
    ],
    "44190": [
        "CLEVELAND",
        "OH"
    ],
    "44194": [
        "CLEVELAND",
        "OH"
    ],
    "44195": [
        "CLEVELAND",
        "OH"
    ],
    "44199": [
        "CLEVELAND",
        "OH"
    ],
    "44201": [
        "ATWATER",
        "OH"
    ],
    "44202": [
        "AURORA",
        "OH"
    ],
    "44203": [
        "BARBERTON",
        "OH"
    ],
    "44210": [
        "BATH",
        "OH"
    ],
    "44211": [
        "BRADY LAKE",
        "OH"
    ],
    "44212": [
        "BRUNSWICK",
        "OH"
    ],
    "44214": [
        "BURBANK",
        "OH"
    ],
    "44215": [
        "CHIPPEWA LAKE",
        "OH"
    ],
    "44216": [
        "CLINTON",
        "OH"
    ],
    "44217": [
        "CRESTON",
        "OH"
    ],
    "44221": [
        "CUYAHOGA FALLS",
        "OH"
    ],
    "44222": [
        "CUYAHOGA FALLS",
        "OH"
    ],
    "44223": [
        "CUYAHOGA FALLS",
        "OH"
    ],
    "44224": [
        "STOW",
        "OH"
    ],
    "44230": [
        "DOYLESTOWN",
        "OH"
    ],
    "44231": [
        "GARRETTSVILLE",
        "OH"
    ],
    "44232": [
        "GREEN",
        "OH"
    ],
    "44233": [
        "HINCKLEY",
        "OH"
    ],
    "44234": [
        "HIRAM",
        "OH"
    ],
    "44235": [
        "HOMERVILLE",
        "OH"
    ],
    "44236": [
        "HUDSON",
        "OH"
    ],
    "44237": [
        "HUDSON",
        "OH"
    ],
    "44240": [
        "KENT",
        "OH"
    ],
    "44241": [
        "STREETSBORO",
        "OH"
    ],
    "44242": [
        "KENT",
        "OH"
    ],
    "44243": [
        "KENT",
        "OH"
    ],
    "44250": [
        "LAKEMORE",
        "OH"
    ],
    "44251": [
        "WESTFIELD CENTER",
        "OH"
    ],
    "44253": [
        "LITCHFIELD",
        "OH"
    ],
    "44254": [
        "LODI",
        "OH"
    ],
    "44255": [
        "MANTUA",
        "OH"
    ],
    "44256": [
        "MEDINA",
        "OH"
    ],
    "44258": [
        "MEDINA",
        "OH"
    ],
    "44260": [
        "MOGADORE",
        "OH"
    ],
    "44262": [
        "MUNROE FALLS",
        "OH"
    ],
    "44264": [
        "PENINSULA",
        "OH"
    ],
    "44265": [
        "RANDOLPH",
        "OH"
    ],
    "44266": [
        "RAVENNA",
        "OH"
    ],
    "44270": [
        "RITTMAN",
        "OH"
    ],
    "44272": [
        "ROOTSTOWN",
        "OH"
    ],
    "44273": [
        "SEVILLE",
        "OH"
    ],
    "44274": [
        "SHARON CENTER",
        "OH"
    ],
    "44275": [
        "SPENCER",
        "OH"
    ],
    "44276": [
        "STERLING",
        "OH"
    ],
    "44278": [
        "TALLMADGE",
        "OH"
    ],
    "44280": [
        "VALLEY CITY",
        "OH"
    ],
    "44281": [
        "WADSWORTH",
        "OH"
    ],
    "44282": [
        "WADSWORTH",
        "OH"
    ],
    "44285": [
        "WAYLAND",
        "OH"
    ],
    "44286": [
        "RICHFIELD",
        "OH"
    ],
    "44287": [
        "WEST SALEM",
        "OH"
    ],
    "44288": [
        "WINDHAM",
        "OH"
    ],
    "44301": [
        "AKRON",
        "OH"
    ],
    "44302": [
        "AKRON",
        "OH"
    ],
    "44303": [
        "AKRON",
        "OH"
    ],
    "44304": [
        "AKRON",
        "OH"
    ],
    "44305": [
        "AKRON",
        "OH"
    ],
    "44306": [
        "AKRON",
        "OH"
    ],
    "44307": [
        "AKRON",
        "OH"
    ],
    "44308": [
        "AKRON",
        "OH"
    ],
    "44309": [
        "AKRON",
        "OH"
    ],
    "44310": [
        "AKRON",
        "OH"
    ],
    "44311": [
        "AKRON",
        "OH"
    ],
    "44312": [
        "AKRON",
        "OH"
    ],
    "44313": [
        "AKRON",
        "OH"
    ],
    "44314": [
        "AKRON",
        "OH"
    ],
    "44315": [
        "AKRON",
        "OH"
    ],
    "44316": [
        "AKRON",
        "OH"
    ],
    "44317": [
        "AKRON",
        "OH"
    ],
    "44319": [
        "AKRON",
        "OH"
    ],
    "44320": [
        "AKRON",
        "OH"
    ],
    "44321": [
        "AKRON",
        "OH"
    ],
    "44325": [
        "AKRON",
        "OH"
    ],
    "44326": [
        "AKRON",
        "OH"
    ],
    "44328": [
        "AKRON",
        "OH"
    ],
    "44333": [
        "AKRON",
        "OH"
    ],
    "44334": [
        "FAIRLAWN",
        "OH"
    ],
    "44372": [
        "AKRON",
        "OH"
    ],
    "44401": [
        "BERLIN CENTER",
        "OH"
    ],
    "44402": [
        "BRISTOLVILLE",
        "OH"
    ],
    "44403": [
        "BROOKFIELD",
        "OH"
    ],
    "44404": [
        "BURGHILL",
        "OH"
    ],
    "44405": [
        "CAMPBELL",
        "OH"
    ],
    "44406": [
        "CANFIELD",
        "OH"
    ],
    "44408": [
        "COLUMBIANA",
        "OH"
    ],
    "44410": [
        "CORTLAND",
        "OH"
    ],
    "44411": [
        "DEERFIELD",
        "OH"
    ],
    "44412": [
        "DIAMOND",
        "OH"
    ],
    "44413": [
        "EAST PALESTINE",
        "OH"
    ],
    "44415": [
        "ELKTON",
        "OH"
    ],
    "44416": [
        "ELLSWORTH",
        "OH"
    ],
    "44417": [
        "FARMDALE",
        "OH"
    ],
    "44418": [
        "FOWLER",
        "OH"
    ],
    "44420": [
        "GIRARD",
        "OH"
    ],
    "44422": [
        "GREENFORD",
        "OH"
    ],
    "44423": [
        "HANOVERTON",
        "OH"
    ],
    "44424": [
        "HARTFORD",
        "OH"
    ],
    "44425": [
        "HUBBARD",
        "OH"
    ],
    "44427": [
        "KENSINGTON",
        "OH"
    ],
    "44428": [
        "KINSMAN",
        "OH"
    ],
    "44429": [
        "LAKE MILTON",
        "OH"
    ],
    "44430": [
        "LEAVITTSBURG",
        "OH"
    ],
    "44431": [
        "LEETONIA",
        "OH"
    ],
    "44432": [
        "LISBON",
        "OH"
    ],
    "44436": [
        "LOWELLVILLE",
        "OH"
    ],
    "44437": [
        "MC DONALD",
        "OH"
    ],
    "44438": [
        "MASURY",
        "OH"
    ],
    "44439": [
        "MESOPOTAMIA",
        "OH"
    ],
    "44440": [
        "MINERAL RIDGE",
        "OH"
    ],
    "44441": [
        "NEGLEY",
        "OH"
    ],
    "44442": [
        "NEW MIDDLETOWN",
        "OH"
    ],
    "44443": [
        "NEW SPRINGFIELD",
        "OH"
    ],
    "44444": [
        "NEWTON FALLS",
        "OH"
    ],
    "44445": [
        "NEW WATERFORD",
        "OH"
    ],
    "44446": [
        "NILES",
        "OH"
    ],
    "44449": [
        "NORTH BENTON",
        "OH"
    ],
    "44450": [
        "NORTH BLOOMFIELD",
        "OH"
    ],
    "44451": [
        "NORTH JACKSON",
        "OH"
    ],
    "44452": [
        "NORTH LIMA",
        "OH"
    ],
    "44453": [
        "ORANGEVILLE",
        "OH"
    ],
    "44454": [
        "PETERSBURG",
        "OH"
    ],
    "44455": [
        "ROGERS",
        "OH"
    ],
    "44460": [
        "SALEM",
        "OH"
    ],
    "44470": [
        "SOUTHINGTON",
        "OH"
    ],
    "44471": [
        "STRUTHERS",
        "OH"
    ],
    "44473": [
        "VIENNA",
        "OH"
    ],
    "44481": [
        "WARREN",
        "OH"
    ],
    "44482": [
        "WARREN",
        "OH"
    ],
    "44483": [
        "WARREN",
        "OH"
    ],
    "44484": [
        "WARREN",
        "OH"
    ],
    "44485": [
        "WARREN",
        "OH"
    ],
    "44488": [
        "WARREN",
        "OH"
    ],
    "44490": [
        "WASHINGTONVILLE",
        "OH"
    ],
    "44491": [
        "WEST FARMINGTON",
        "OH"
    ],
    "44492": [
        "WEST POINT",
        "OH"
    ],
    "44493": [
        "WINONA",
        "OH"
    ],
    "44501": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44502": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44503": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44504": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44505": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44506": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44507": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44509": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44510": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44511": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44512": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44513": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44514": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44515": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44555": [
        "YOUNGSTOWN",
        "OH"
    ],
    "44601": [
        "ALLIANCE",
        "OH"
    ],
    "44606": [
        "APPLE CREEK",
        "OH"
    ],
    "44608": [
        "BEACH CITY",
        "OH"
    ],
    "44609": [
        "BELOIT",
        "OH"
    ],
    "44610": [
        "BERLIN",
        "OH"
    ],
    "44611": [
        "BIG PRAIRIE",
        "OH"
    ],
    "44612": [
        "BOLIVAR",
        "OH"
    ],
    "44613": [
        "BREWSTER",
        "OH"
    ],
    "44614": [
        "CANAL FULTON",
        "OH"
    ],
    "44615": [
        "CARROLLTON",
        "OH"
    ],
    "44617": [
        "CHARM",
        "OH"
    ],
    "44618": [
        "DALTON",
        "OH"
    ],
    "44619": [
        "DAMASCUS",
        "OH"
    ],
    "44620": [
        "DELLROY",
        "OH"
    ],
    "44621": [
        "DENNISON",
        "OH"
    ],
    "44622": [
        "DOVER",
        "OH"
    ],
    "44624": [
        "DUNDEE",
        "OH"
    ],
    "44625": [
        "EAST ROCHESTER",
        "OH"
    ],
    "44626": [
        "EAST SPARTA",
        "OH"
    ],
    "44627": [
        "FREDERICKSBURG",
        "OH"
    ],
    "44628": [
        "GLENMONT",
        "OH"
    ],
    "44629": [
        "GNADENHUTTEN",
        "OH"
    ],
    "44630": [
        "GREENTOWN",
        "OH"
    ],
    "44632": [
        "HARTVILLE",
        "OH"
    ],
    "44633": [
        "HOLMESVILLE",
        "OH"
    ],
    "44634": [
        "HOMEWORTH",
        "OH"
    ],
    "44636": [
        "KIDRON",
        "OH"
    ],
    "44637": [
        "KILLBUCK",
        "OH"
    ],
    "44638": [
        "LAKEVILLE",
        "OH"
    ],
    "44639": [
        "LEESVILLE",
        "OH"
    ],
    "44640": [
        "LIMAVILLE",
        "OH"
    ],
    "44641": [
        "LOUISVILLE",
        "OH"
    ],
    "44643": [
        "MAGNOLIA",
        "OH"
    ],
    "44644": [
        "MALVERN",
        "OH"
    ],
    "44645": [
        "MARSHALLVILLE",
        "OH"
    ],
    "44646": [
        "MASSILLON",
        "OH"
    ],
    "44647": [
        "MASSILLON",
        "OH"
    ],
    "44648": [
        "MASSILLON",
        "OH"
    ],
    "44650": [
        "MAXIMO",
        "OH"
    ],
    "44651": [
        "MECHANICSTOWN",
        "OH"
    ],
    "44652": [
        "MIDDLEBRANCH",
        "OH"
    ],
    "44653": [
        "MIDVALE",
        "OH"
    ],
    "44654": [
        "MILLERSBURG",
        "OH"
    ],
    "44656": [
        "MINERAL CITY",
        "OH"
    ],
    "44657": [
        "MINERVA",
        "OH"
    ],
    "44659": [
        "MOUNT EATON",
        "OH"
    ],
    "44660": [
        "MOUNT HOPE",
        "OH"
    ],
    "44661": [
        "NASHVILLE",
        "OH"
    ],
    "44662": [
        "NAVARRE",
        "OH"
    ],
    "44663": [
        "NEW PHILADELPHIA",
        "OH"
    ],
    "44665": [
        "NORTH GEORGETOWN",
        "OH"
    ],
    "44666": [
        "NORTH LAWRENCE",
        "OH"
    ],
    "44667": [
        "ORRVILLE",
        "OH"
    ],
    "44669": [
        "PARIS",
        "OH"
    ],
    "44670": [
        "ROBERTSVILLE",
        "OH"
    ],
    "44671": [
        "SANDYVILLE",
        "OH"
    ],
    "44672": [
        "SEBRING",
        "OH"
    ],
    "44675": [
        "SHERRODSVILLE",
        "OH"
    ],
    "44676": [
        "SHREVE",
        "OH"
    ],
    "44677": [
        "SMITHVILLE",
        "OH"
    ],
    "44678": [
        "SOMERDALE",
        "OH"
    ],
    "44680": [
        "STRASBURG",
        "OH"
    ],
    "44681": [
        "SUGARCREEK",
        "OH"
    ],
    "44682": [
        "TUSCARAWAS",
        "OH"
    ],
    "44683": [
        "UHRICHSVILLE",
        "OH"
    ],
    "44685": [
        "UNIONTOWN",
        "OH"
    ],
    "44687": [
        "WALNUT CREEK",
        "OH"
    ],
    "44688": [
        "WAYNESBURG",
        "OH"
    ],
    "44689": [
        "WILMOT",
        "OH"
    ],
    "44690": [
        "WINESBURG",
        "OH"
    ],
    "44691": [
        "WOOSTER",
        "OH"
    ],
    "44693": [
        "DEERSVILLE",
        "OH"
    ],
    "44695": [
        "BOWERSTON",
        "OH"
    ],
    "44697": [
        "ZOAR",
        "OH"
    ],
    "44699": [
        "TIPPECANOE",
        "OH"
    ],
    "44701": [
        "CANTON",
        "OH"
    ],
    "44702": [
        "CANTON",
        "OH"
    ],
    "44703": [
        "CANTON",
        "OH"
    ],
    "44704": [
        "CANTON",
        "OH"
    ],
    "44705": [
        "CANTON",
        "OH"
    ],
    "44706": [
        "CANTON",
        "OH"
    ],
    "44707": [
        "CANTON",
        "OH"
    ],
    "44708": [
        "CANTON",
        "OH"
    ],
    "44709": [
        "CANTON",
        "OH"
    ],
    "44710": [
        "CANTON",
        "OH"
    ],
    "44711": [
        "CANTON",
        "OH"
    ],
    "44714": [
        "CANTON",
        "OH"
    ],
    "44718": [
        "CANTON",
        "OH"
    ],
    "44720": [
        "NORTH CANTON",
        "OH"
    ],
    "44721": [
        "CANTON",
        "OH"
    ],
    "44730": [
        "EAST CANTON",
        "OH"
    ],
    "44735": [
        "CANTON",
        "OH"
    ],
    "44750": [
        "CANTON",
        "OH"
    ],
    "44802": [
        "ALVADA",
        "OH"
    ],
    "44804": [
        "ARCADIA",
        "OH"
    ],
    "44805": [
        "ASHLAND",
        "OH"
    ],
    "44807": [
        "ATTICA",
        "OH"
    ],
    "44809": [
        "BASCOM",
        "OH"
    ],
    "44811": [
        "BELLEVUE",
        "OH"
    ],
    "44813": [
        "BELLVILLE",
        "OH"
    ],
    "44814": [
        "BERLIN HEIGHTS",
        "OH"
    ],
    "44815": [
        "BETTSVILLE",
        "OH"
    ],
    "44816": [
        "BIRMINGHAM",
        "OH"
    ],
    "44817": [
        "BLOOMDALE",
        "OH"
    ],
    "44818": [
        "BLOOMVILLE",
        "OH"
    ],
    "44820": [
        "BUCYRUS",
        "OH"
    ],
    "44822": [
        "BUTLER",
        "OH"
    ],
    "44824": [
        "CASTALIA",
        "OH"
    ],
    "44825": [
        "CHATFIELD",
        "OH"
    ],
    "44826": [
        "COLLINS",
        "OH"
    ],
    "44827": [
        "CRESTLINE",
        "OH"
    ],
    "44828": [
        "FLAT ROCK",
        "OH"
    ],
    "44830": [
        "FOSTORIA",
        "OH"
    ],
    "44833": [
        "GALION",
        "OH"
    ],
    "44836": [
        "GREEN SPRINGS",
        "OH"
    ],
    "44837": [
        "GREENWICH",
        "OH"
    ],
    "44838": [
        "HAYESVILLE",
        "OH"
    ],
    "44839": [
        "HURON",
        "OH"
    ],
    "44840": [
        "JEROMESVILLE",
        "OH"
    ],
    "44841": [
        "KANSAS",
        "OH"
    ],
    "44842": [
        "LOUDONVILLE",
        "OH"
    ],
    "44843": [
        "LUCAS",
        "OH"
    ],
    "44844": [
        "MC CUTCHENVILLE",
        "OH"
    ],
    "44845": [
        "MELMORE",
        "OH"
    ],
    "44846": [
        "MILAN",
        "OH"
    ],
    "44847": [
        "MONROEVILLE",
        "OH"
    ],
    "44848": [
        "NANKIN",
        "OH"
    ],
    "44849": [
        "NEVADA",
        "OH"
    ],
    "44850": [
        "NEW HAVEN",
        "OH"
    ],
    "44851": [
        "NEW LONDON",
        "OH"
    ],
    "44853": [
        "NEW RIEGEL",
        "OH"
    ],
    "44854": [
        "NEW WASHINGTON",
        "OH"
    ],
    "44855": [
        "NORTH FAIRFIELD",
        "OH"
    ],
    "44856": [
        "NORTH ROBINSON",
        "OH"
    ],
    "44857": [
        "NORWALK",
        "OH"
    ],
    "44859": [
        "NOVA",
        "OH"
    ],
    "44861": [
        "OLD FORT",
        "OH"
    ],
    "44862": [
        "ONTARIO",
        "OH"
    ],
    "44864": [
        "PERRYSVILLE",
        "OH"
    ],
    "44865": [
        "PLYMOUTH",
        "OH"
    ],
    "44866": [
        "POLK",
        "OH"
    ],
    "44867": [
        "REPUBLIC",
        "OH"
    ],
    "44870": [
        "SANDUSKY",
        "OH"
    ],
    "44871": [
        "SANDUSKY",
        "OH"
    ],
    "44874": [
        "SAVANNAH",
        "OH"
    ],
    "44875": [
        "SHELBY",
        "OH"
    ],
    "44878": [
        "SHILOH",
        "OH"
    ],
    "44880": [
        "SULLIVAN",
        "OH"
    ],
    "44881": [
        "SULPHUR SPRINGS",
        "OH"
    ],
    "44882": [
        "SYCAMORE",
        "OH"
    ],
    "44883": [
        "TIFFIN",
        "OH"
    ],
    "44887": [
        "TIRO",
        "OH"
    ],
    "44888": [
        "WILLARD",
        "OH"
    ],
    "44889": [
        "WAKEMAN",
        "OH"
    ],
    "44890": [
        "WILLARD",
        "OH"
    ],
    "44901": [
        "MANSFIELD",
        "OH"
    ],
    "44902": [
        "MANSFIELD",
        "OH"
    ],
    "44903": [
        "MANSFIELD",
        "OH"
    ],
    "44904": [
        "MANSFIELD",
        "OH"
    ],
    "44905": [
        "MANSFIELD",
        "OH"
    ],
    "44906": [
        "MANSFIELD",
        "OH"
    ],
    "44907": [
        "MANSFIELD",
        "OH"
    ],
    "45001": [
        "ADDYSTON",
        "OH"
    ],
    "45002": [
        "CLEVES",
        "OH"
    ],
    "45003": [
        "COLLEGE CORNER",
        "OH"
    ],
    "45004": [
        "COLLINSVILLE",
        "OH"
    ],
    "45005": [
        "FRANKLIN",
        "OH"
    ],
    "45011": [
        "HAMILTON",
        "OH"
    ],
    "45012": [
        "HAMILTON",
        "OH"
    ],
    "45013": [
        "HAMILTON",
        "OH"
    ],
    "45014": [
        "FAIRFIELD",
        "OH"
    ],
    "45015": [
        "HAMILTON",
        "OH"
    ],
    "45018": [
        "FAIRFIELD",
        "OH"
    ],
    "45030": [
        "HARRISON",
        "OH"
    ],
    "45032": [
        "HARVEYSBURG",
        "OH"
    ],
    "45033": [
        "HOOVEN",
        "OH"
    ],
    "45034": [
        "KINGS MILLS",
        "OH"
    ],
    "45036": [
        "LEBANON",
        "OH"
    ],
    "45039": [
        "MAINEVILLE",
        "OH"
    ],
    "45040": [
        "MASON",
        "OH"
    ],
    "45041": [
        "MIAMITOWN",
        "OH"
    ],
    "45042": [
        "MIDDLETOWN",
        "OH"
    ],
    "45044": [
        "MIDDLETOWN",
        "OH"
    ],
    "45050": [
        "MONROE",
        "OH"
    ],
    "45051": [
        "MOUNT SAINT JOSEPH",
        "OH"
    ],
    "45052": [
        "NORTH BEND",
        "OH"
    ],
    "45053": [
        "OKEANA",
        "OH"
    ],
    "45054": [
        "OREGONIA",
        "OH"
    ],
    "45055": [
        "OVERPECK",
        "OH"
    ],
    "45056": [
        "OXFORD",
        "OH"
    ],
    "45061": [
        "ROSS",
        "OH"
    ],
    "45062": [
        "SEVEN MILE",
        "OH"
    ],
    "45063": [
        "SHANDON",
        "OH"
    ],
    "45064": [
        "SOMERVILLE",
        "OH"
    ],
    "45065": [
        "SOUTH LEBANON",
        "OH"
    ],
    "45066": [
        "SPRINGBORO",
        "OH"
    ],
    "45067": [
        "TRENTON",
        "OH"
    ],
    "45068": [
        "WAYNESVILLE",
        "OH"
    ],
    "45069": [
        "WEST CHESTER",
        "OH"
    ],
    "45070": [
        "WEST ELKTON",
        "OH"
    ],
    "45071": [
        "WEST CHESTER",
        "OH"
    ],
    "45101": [
        "ABERDEEN",
        "OH"
    ],
    "45102": [
        "AMELIA",
        "OH"
    ],
    "45103": [
        "BATAVIA",
        "OH"
    ],
    "45105": [
        "BENTONVILLE",
        "OH"
    ],
    "45106": [
        "BETHEL",
        "OH"
    ],
    "45107": [
        "BLANCHESTER",
        "OH"
    ],
    "45111": [
        "CAMP DENNISON",
        "OH"
    ],
    "45113": [
        "CLARKSVILLE",
        "OH"
    ],
    "45114": [
        "CUBA",
        "OH"
    ],
    "45118": [
        "FAYETTEVILLE",
        "OH"
    ],
    "45119": [
        "FEESBURG",
        "OH"
    ],
    "45120": [
        "FELICITY",
        "OH"
    ],
    "45121": [
        "GEORGETOWN",
        "OH"
    ],
    "45122": [
        "GOSHEN",
        "OH"
    ],
    "45123": [
        "GREENFIELD",
        "OH"
    ],
    "45130": [
        "HAMERSVILLE",
        "OH"
    ],
    "45131": [
        "HIGGINSPORT",
        "OH"
    ],
    "45133": [
        "HILLSBORO",
        "OH"
    ],
    "45135": [
        "LEESBURG",
        "OH"
    ],
    "45140": [
        "LOVELAND",
        "OH"
    ],
    "45142": [
        "LYNCHBURG",
        "OH"
    ],
    "45144": [
        "MANCHESTER",
        "OH"
    ],
    "45146": [
        "MARTINSVILLE",
        "OH"
    ],
    "45147": [
        "MIAMIVILLE",
        "OH"
    ],
    "45148": [
        "MIDLAND",
        "OH"
    ],
    "45150": [
        "MILFORD",
        "OH"
    ],
    "45152": [
        "MORROW",
        "OH"
    ],
    "45153": [
        "MOSCOW",
        "OH"
    ],
    "45154": [
        "MOUNT ORAB",
        "OH"
    ],
    "45155": [
        "MOWRYSTOWN",
        "OH"
    ],
    "45157": [
        "NEW RICHMOND",
        "OH"
    ],
    "45158": [
        "NEWTONSVILLE",
        "OH"
    ],
    "45159": [
        "NEW VIENNA",
        "OH"
    ],
    "45160": [
        "OWENSVILLE",
        "OH"
    ],
    "45162": [
        "PLEASANT PLAIN",
        "OH"
    ],
    "45164": [
        "PORT WILLIAM",
        "OH"
    ],
    "45167": [
        "RIPLEY",
        "OH"
    ],
    "45168": [
        "RUSSELLVILLE",
        "OH"
    ],
    "45169": [
        "SABINA",
        "OH"
    ],
    "45171": [
        "SARDINIA",
        "OH"
    ],
    "45172": [
        "SINKING SPRING",
        "OH"
    ],
    "45174": [
        "TERRACE PARK",
        "OH"
    ],
    "45176": [
        "WILLIAMSBURG",
        "OH"
    ],
    "45177": [
        "WILMINGTON",
        "OH"
    ],
    "45201": [
        "CINCINNATI",
        "OH"
    ],
    "45202": [
        "CINCINNATI",
        "OH"
    ],
    "45203": [
        "CINCINNATI",
        "OH"
    ],
    "45204": [
        "CINCINNATI",
        "OH"
    ],
    "45205": [
        "CINCINNATI",
        "OH"
    ],
    "45206": [
        "CINCINNATI",
        "OH"
    ],
    "45207": [
        "CINCINNATI",
        "OH"
    ],
    "45208": [
        "CINCINNATI",
        "OH"
    ],
    "45209": [
        "CINCINNATI",
        "OH"
    ],
    "45211": [
        "CINCINNATI",
        "OH"
    ],
    "45212": [
        "CINCINNATI",
        "OH"
    ],
    "45213": [
        "CINCINNATI",
        "OH"
    ],
    "45214": [
        "CINCINNATI",
        "OH"
    ],
    "45215": [
        "CINCINNATI",
        "OH"
    ],
    "45216": [
        "CINCINNATI",
        "OH"
    ],
    "45217": [
        "CINCINNATI",
        "OH"
    ],
    "45218": [
        "CINCINNATI",
        "OH"
    ],
    "45219": [
        "CINCINNATI",
        "OH"
    ],
    "45220": [
        "CINCINNATI",
        "OH"
    ],
    "45221": [
        "CINCINNATI",
        "OH"
    ],
    "45222": [
        "CINCINNATI",
        "OH"
    ],
    "45223": [
        "CINCINNATI",
        "OH"
    ],
    "45224": [
        "CINCINNATI",
        "OH"
    ],
    "45225": [
        "CINCINNATI",
        "OH"
    ],
    "45226": [
        "CINCINNATI",
        "OH"
    ],
    "45227": [
        "CINCINNATI",
        "OH"
    ],
    "45229": [
        "CINCINNATI",
        "OH"
    ],
    "45230": [
        "CINCINNATI",
        "OH"
    ],
    "45231": [
        "CINCINNATI",
        "OH"
    ],
    "45232": [
        "CINCINNATI",
        "OH"
    ],
    "45233": [
        "CINCINNATI",
        "OH"
    ],
    "45234": [
        "CINCINNATI",
        "OH"
    ],
    "45235": [
        "CINCINNATI",
        "OH"
    ],
    "45236": [
        "CINCINNATI",
        "OH"
    ],
    "45237": [
        "CINCINNATI",
        "OH"
    ],
    "45238": [
        "CINCINNATI",
        "OH"
    ],
    "45239": [
        "CINCINNATI",
        "OH"
    ],
    "45240": [
        "CINCINNATI",
        "OH"
    ],
    "45241": [
        "CINCINNATI",
        "OH"
    ],
    "45242": [
        "CINCINNATI",
        "OH"
    ],
    "45243": [
        "CINCINNATI",
        "OH"
    ],
    "45244": [
        "CINCINNATI",
        "OH"
    ],
    "45245": [
        "CINCINNATI",
        "OH"
    ],
    "45246": [
        "CINCINNATI",
        "OH"
    ],
    "45247": [
        "CINCINNATI",
        "OH"
    ],
    "45248": [
        "CINCINNATI",
        "OH"
    ],
    "45249": [
        "CINCINNATI",
        "OH"
    ],
    "45250": [
        "CINCINNATI",
        "OH"
    ],
    "45251": [
        "CINCINNATI",
        "OH"
    ],
    "45252": [
        "CINCINNATI",
        "OH"
    ],
    "45253": [
        "CINCINNATI",
        "OH"
    ],
    "45254": [
        "CINCINNATI",
        "OH"
    ],
    "45255": [
        "CINCINNATI",
        "OH"
    ],
    "45258": [
        "CINCINNATI",
        "OH"
    ],
    "45262": [
        "CINCINNATI",
        "OH"
    ],
    "45263": [
        "CINCINNATI",
        "OH"
    ],
    "45264": [
        "CINCINNATI",
        "OH"
    ],
    "45267": [
        "CINCINNATI",
        "OH"
    ],
    "45268": [
        "CINCINNATI",
        "OH"
    ],
    "45275": [
        "CINCINNATI",
        "OH"
    ],
    "45301": [
        "ALPHA",
        "OH"
    ],
    "45302": [
        "ANNA",
        "OH"
    ],
    "45303": [
        "ANSONIA",
        "OH"
    ],
    "45304": [
        "ARCANUM",
        "OH"
    ],
    "45305": [
        "BELLBROOK",
        "OH"
    ],
    "45306": [
        "BOTKINS",
        "OH"
    ],
    "45307": [
        "BOWERSVILLE",
        "OH"
    ],
    "45308": [
        "BRADFORD",
        "OH"
    ],
    "45309": [
        "BROOKVILLE",
        "OH"
    ],
    "45310": [
        "BURKETTSVILLE",
        "OH"
    ],
    "45311": [
        "CAMDEN",
        "OH"
    ],
    "45312": [
        "CASSTOWN",
        "OH"
    ],
    "45314": [
        "CEDARVILLE",
        "OH"
    ],
    "45315": [
        "CLAYTON",
        "OH"
    ],
    "45316": [
        "CLIFTON",
        "OH"
    ],
    "45317": [
        "CONOVER",
        "OH"
    ],
    "45318": [
        "COVINGTON",
        "OH"
    ],
    "45319": [
        "DONNELSVILLE",
        "OH"
    ],
    "45320": [
        "EATON",
        "OH"
    ],
    "45321": [
        "ELDORADO",
        "OH"
    ],
    "45322": [
        "ENGLEWOOD",
        "OH"
    ],
    "45323": [
        "ENON",
        "OH"
    ],
    "45324": [
        "FAIRBORN",
        "OH"
    ],
    "45325": [
        "FARMERSVILLE",
        "OH"
    ],
    "45326": [
        "FLETCHER",
        "OH"
    ],
    "45327": [
        "GERMANTOWN",
        "OH"
    ],
    "45328": [
        "GETTYSBURG",
        "OH"
    ],
    "45330": [
        "GRATIS",
        "OH"
    ],
    "45331": [
        "GREENVILLE",
        "OH"
    ],
    "45332": [
        "HOLLANSBURG",
        "OH"
    ],
    "45333": [
        "HOUSTON",
        "OH"
    ],
    "45334": [
        "JACKSON CENTER",
        "OH"
    ],
    "45335": [
        "JAMESTOWN",
        "OH"
    ],
    "45336": [
        "KETTLERSVILLE",
        "OH"
    ],
    "45337": [
        "LAURA",
        "OH"
    ],
    "45338": [
        "LEWISBURG",
        "OH"
    ],
    "45339": [
        "LUDLOW FALLS",
        "OH"
    ],
    "45340": [
        "MAPLEWOOD",
        "OH"
    ],
    "45341": [
        "MEDWAY",
        "OH"
    ],
    "45342": [
        "MIAMISBURG",
        "OH"
    ],
    "45343": [
        "MIAMISBURG",
        "OH"
    ],
    "45344": [
        "NEW CARLISLE",
        "OH"
    ],
    "45345": [
        "NEW LEBANON",
        "OH"
    ],
    "45346": [
        "NEW MADISON",
        "OH"
    ],
    "45347": [
        "NEW PARIS",
        "OH"
    ],
    "45348": [
        "NEW WESTON",
        "OH"
    ],
    "45349": [
        "NORTH HAMPTON",
        "OH"
    ],
    "45350": [
        "NORTH STAR",
        "OH"
    ],
    "45351": [
        "OSGOOD",
        "OH"
    ],
    "45352": [
        "PALESTINE",
        "OH"
    ],
    "45353": [
        "PEMBERTON",
        "OH"
    ],
    "45354": [
        "PHILLIPSBURG",
        "OH"
    ],
    "45356": [
        "PIQUA",
        "OH"
    ],
    "45358": [
        "PITSBURG",
        "OH"
    ],
    "45359": [
        "PLEASANT HILL",
        "OH"
    ],
    "45360": [
        "PORT JEFFERSON",
        "OH"
    ],
    "45361": [
        "POTSDAM",
        "OH"
    ],
    "45362": [
        "ROSSBURG",
        "OH"
    ],
    "45363": [
        "RUSSIA",
        "OH"
    ],
    "45365": [
        "SIDNEY",
        "OH"
    ],
    "45367": [
        "SIDNEY",
        "OH"
    ],
    "45368": [
        "SOUTH CHARLESTON",
        "OH"
    ],
    "45369": [
        "SOUTH VIENNA",
        "OH"
    ],
    "45370": [
        "SPRING VALLEY",
        "OH"
    ],
    "45371": [
        "TIPP CITY",
        "OH"
    ],
    "45372": [
        "TREMONT CITY",
        "OH"
    ],
    "45373": [
        "TROY",
        "OH"
    ],
    "45377": [
        "VANDALIA",
        "OH"
    ],
    "45378": [
        "VERONA",
        "OH"
    ],
    "45380": [
        "VERSAILLES",
        "OH"
    ],
    "45381": [
        "WEST ALEXANDRIA",
        "OH"
    ],
    "45382": [
        "WEST MANCHESTER",
        "OH"
    ],
    "45383": [
        "WEST MILTON",
        "OH"
    ],
    "45384": [
        "WILBERFORCE",
        "OH"
    ],
    "45385": [
        "XENIA",
        "OH"
    ],
    "45387": [
        "YELLOW SPRINGS",
        "OH"
    ],
    "45388": [
        "YORKSHIRE",
        "OH"
    ],
    "45389": [
        "CHRISTIANSBURG",
        "OH"
    ],
    "45390": [
        "UNION CITY",
        "OH"
    ],
    "45401": [
        "DAYTON",
        "OH"
    ],
    "45402": [
        "DAYTON",
        "OH"
    ],
    "45403": [
        "DAYTON",
        "OH"
    ],
    "45404": [
        "DAYTON",
        "OH"
    ],
    "45405": [
        "DAYTON",
        "OH"
    ],
    "45406": [
        "DAYTON",
        "OH"
    ],
    "45409": [
        "DAYTON",
        "OH"
    ],
    "45410": [
        "DAYTON",
        "OH"
    ],
    "45412": [
        "DAYTON",
        "OH"
    ],
    "45413": [
        "DAYTON",
        "OH"
    ],
    "45414": [
        "DAYTON",
        "OH"
    ],
    "45415": [
        "DAYTON",
        "OH"
    ],
    "45416": [
        "DAYTON",
        "OH"
    ],
    "45417": [
        "DAYTON",
        "OH"
    ],
    "45419": [
        "DAYTON",
        "OH"
    ],
    "45420": [
        "DAYTON",
        "OH"
    ],
    "45422": [
        "DAYTON",
        "OH"
    ],
    "45423": [
        "DAYTON",
        "OH"
    ],
    "45424": [
        "DAYTON",
        "OH"
    ],
    "45426": [
        "DAYTON",
        "OH"
    ],
    "45428": [
        "DAYTON",
        "OH"
    ],
    "45429": [
        "DAYTON",
        "OH"
    ],
    "45430": [
        "DAYTON",
        "OH"
    ],
    "45431": [
        "DAYTON",
        "OH"
    ],
    "45432": [
        "DAYTON",
        "OH"
    ],
    "45433": [
        "DAYTON",
        "OH"
    ],
    "45434": [
        "DAYTON",
        "OH"
    ],
    "45435": [
        "DAYTON",
        "OH"
    ],
    "45437": [
        "DAYTON",
        "OH"
    ],
    "45439": [
        "DAYTON",
        "OH"
    ],
    "45440": [
        "DAYTON",
        "OH"
    ],
    "45441": [
        "DAYTON",
        "OH"
    ],
    "45448": [
        "DAYTON",
        "OH"
    ],
    "45449": [
        "DAYTON",
        "OH"
    ],
    "45458": [
        "DAYTON",
        "OH"
    ],
    "45459": [
        "DAYTON",
        "OH"
    ],
    "45469": [
        "DAYTON",
        "OH"
    ],
    "45470": [
        "DAYTON",
        "OH"
    ],
    "45475": [
        "DAYTON",
        "OH"
    ],
    "45479": [
        "DAYTON",
        "OH"
    ],
    "45501": [
        "SPRINGFIELD",
        "OH"
    ],
    "45502": [
        "SPRINGFIELD",
        "OH"
    ],
    "45503": [
        "SPRINGFIELD",
        "OH"
    ],
    "45504": [
        "SPRINGFIELD",
        "OH"
    ],
    "45505": [
        "SPRINGFIELD",
        "OH"
    ],
    "45506": [
        "SPRINGFIELD",
        "OH"
    ],
    "45601": [
        "CHILLICOTHE",
        "OH"
    ],
    "45612": [
        "BAINBRIDGE",
        "OH"
    ],
    "45613": [
        "BEAVER",
        "OH"
    ],
    "45614": [
        "BIDWELL",
        "OH"
    ],
    "45616": [
        "BLUE CREEK",
        "OH"
    ],
    "45617": [
        "BOURNEVILLE",
        "OH"
    ],
    "45618": [
        "CHERRY FORK",
        "OH"
    ],
    "45619": [
        "CHESAPEAKE",
        "OH"
    ],
    "45620": [
        "CHESHIRE",
        "OH"
    ],
    "45621": [
        "COALTON",
        "OH"
    ],
    "45622": [
        "CREOLA",
        "OH"
    ],
    "45623": [
        "CROWN CITY",
        "OH"
    ],
    "45628": [
        "FRANKFORT",
        "OH"
    ],
    "45629": [
        "FRANKLIN FURNACE",
        "OH"
    ],
    "45630": [
        "FRIENDSHIP",
        "OH"
    ],
    "45631": [
        "GALLIPOLIS",
        "OH"
    ],
    "45634": [
        "HAMDEN",
        "OH"
    ],
    "45636": [
        "HAVERHILL",
        "OH"
    ],
    "45638": [
        "IRONTON",
        "OH"
    ],
    "45640": [
        "JACKSON",
        "OH"
    ],
    "45644": [
        "KINGSTON",
        "OH"
    ],
    "45645": [
        "KITTS HILL",
        "OH"
    ],
    "45646": [
        "LATHAM",
        "OH"
    ],
    "45647": [
        "LONDONDERRY",
        "OH"
    ],
    "45648": [
        "LUCASVILLE",
        "OH"
    ],
    "45650": [
        "LYNX",
        "OH"
    ],
    "45651": [
        "MC ARTHUR",
        "OH"
    ],
    "45652": [
        "MC DERMOTT",
        "OH"
    ],
    "45653": [
        "MINFORD",
        "OH"
    ],
    "45654": [
        "NEW PLYMOUTH",
        "OH"
    ],
    "45656": [
        "OAK HILL",
        "OH"
    ],
    "45657": [
        "OTWAY",
        "OH"
    ],
    "45658": [
        "PATRIOT",
        "OH"
    ],
    "45659": [
        "PEDRO",
        "OH"
    ],
    "45660": [
        "PEEBLES",
        "OH"
    ],
    "45661": [
        "PIKETON",
        "OH"
    ],
    "45662": [
        "PORTSMOUTH",
        "OH"
    ],
    "45663": [
        "WEST PORTSMOUTH",
        "OH"
    ],
    "45669": [
        "PROCTORVILLE",
        "OH"
    ],
    "45671": [
        "RARDEN",
        "OH"
    ],
    "45672": [
        "RAY",
        "OH"
    ],
    "45673": [
        "RICHMOND DALE",
        "OH"
    ],
    "45674": [
        "RIO GRANDE",
        "OH"
    ],
    "45678": [
        "SCOTTOWN",
        "OH"
    ],
    "45679": [
        "SEAMAN",
        "OH"
    ],
    "45680": [
        "SOUTH POINT",
        "OH"
    ],
    "45681": [
        "SOUTH SALEM",
        "OH"
    ],
    "45682": [
        "SOUTH WEBSTER",
        "OH"
    ],
    "45683": [
        "STOCKDALE",
        "OH"
    ],
    "45684": [
        "STOUT",
        "OH"
    ],
    "45685": [
        "THURMAN",
        "OH"
    ],
    "45686": [
        "VINTON",
        "OH"
    ],
    "45687": [
        "WAKEFIELD",
        "OH"
    ],
    "45688": [
        "WATERLOO",
        "OH"
    ],
    "45690": [
        "WAVERLY",
        "OH"
    ],
    "45692": [
        "WELLSTON",
        "OH"
    ],
    "45693": [
        "WEST UNION",
        "OH"
    ],
    "45694": [
        "WHEELERSBURG",
        "OH"
    ],
    "45695": [
        "WILKESVILLE",
        "OH"
    ],
    "45696": [
        "WILLOW WOOD",
        "OH"
    ],
    "45697": [
        "WINCHESTER",
        "OH"
    ],
    "45698": [
        "ZALESKI",
        "OH"
    ],
    "45699": [
        "LUCASVILLE",
        "OH"
    ],
    "45701": [
        "ATHENS",
        "OH"
    ],
    "45710": [
        "ALBANY",
        "OH"
    ],
    "45711": [
        "AMESVILLE",
        "OH"
    ],
    "45712": [
        "BARLOW",
        "OH"
    ],
    "45713": [
        "BARTLETT",
        "OH"
    ],
    "45714": [
        "BELPRE",
        "OH"
    ],
    "45715": [
        "BEVERLY",
        "OH"
    ],
    "45716": [
        "BUCHTEL",
        "OH"
    ],
    "45719": [
        "CHAUNCEY",
        "OH"
    ],
    "45720": [
        "CHESTER",
        "OH"
    ],
    "45721": [
        "COAL RUN",
        "OH"
    ],
    "45723": [
        "COOLVILLE",
        "OH"
    ],
    "45724": [
        "CUTLER",
        "OH"
    ],
    "45727": [
        "DEXTER CITY",
        "OH"
    ],
    "45729": [
        "FLEMING",
        "OH"
    ],
    "45732": [
        "GLOUSTER",
        "OH"
    ],
    "45734": [
        "GRAYSVILLE",
        "OH"
    ],
    "45735": [
        "GUYSVILLE",
        "OH"
    ],
    "45739": [
        "HOCKINGPORT",
        "OH"
    ],
    "45740": [
        "JACKSONVILLE",
        "OH"
    ],
    "45741": [
        "LANGSVILLE",
        "OH"
    ],
    "45742": [
        "LITTLE HOCKING",
        "OH"
    ],
    "45743": [
        "LONG BOTTOM",
        "OH"
    ],
    "45744": [
        "LOWELL",
        "OH"
    ],
    "45745": [
        "LOWER SALEM",
        "OH"
    ],
    "45746": [
        "MACKSBURG",
        "OH"
    ],
    "45750": [
        "MARIETTA",
        "OH"
    ],
    "45760": [
        "MIDDLEPORT",
        "OH"
    ],
    "45761": [
        "MILLFIELD",
        "OH"
    ],
    "45764": [
        "NELSONVILLE",
        "OH"
    ],
    "45766": [
        "NEW MARSHFIELD",
        "OH"
    ],
    "45767": [
        "NEW MATAMORAS",
        "OH"
    ],
    "45768": [
        "NEWPORT",
        "OH"
    ],
    "45769": [
        "POMEROY",
        "OH"
    ],
    "45770": [
        "PORTLAND",
        "OH"
    ],
    "45771": [
        "RACINE",
        "OH"
    ],
    "45772": [
        "REEDSVILLE",
        "OH"
    ],
    "45773": [
        "RENO",
        "OH"
    ],
    "45775": [
        "RUTLAND",
        "OH"
    ],
    "45776": [
        "SHADE",
        "OH"
    ],
    "45778": [
        "STEWART",
        "OH"
    ],
    "45779": [
        "SYRACUSE",
        "OH"
    ],
    "45780": [
        "THE PLAINS",
        "OH"
    ],
    "45782": [
        "TRIMBLE",
        "OH"
    ],
    "45783": [
        "TUPPERS PLAINS",
        "OH"
    ],
    "45784": [
        "VINCENT",
        "OH"
    ],
    "45786": [
        "WATERFORD",
        "OH"
    ],
    "45788": [
        "WHIPPLE",
        "OH"
    ],
    "45789": [
        "WINGETT RUN",
        "OH"
    ],
    "45801": [
        "LIMA",
        "OH"
    ],
    "45802": [
        "LIMA",
        "OH"
    ],
    "45804": [
        "LIMA",
        "OH"
    ],
    "45805": [
        "LIMA",
        "OH"
    ],
    "45806": [
        "LIMA",
        "OH"
    ],
    "45807": [
        "LIMA",
        "OH"
    ],
    "45808": [
        "BEAVERDAM",
        "OH"
    ],
    "45809": [
        "GOMER",
        "OH"
    ],
    "45810": [
        "ADA",
        "OH"
    ],
    "45812": [
        "ALGER",
        "OH"
    ],
    "45813": [
        "ANTWERP",
        "OH"
    ],
    "45814": [
        "ARLINGTON",
        "OH"
    ],
    "45815": [
        "BELMORE",
        "OH"
    ],
    "45816": [
        "BENTON RIDGE",
        "OH"
    ],
    "45817": [
        "BLUFFTON",
        "OH"
    ],
    "45819": [
        "BUCKLAND",
        "OH"
    ],
    "45820": [
        "CAIRO",
        "OH"
    ],
    "45821": [
        "CECIL",
        "OH"
    ],
    "45822": [
        "CELINA",
        "OH"
    ],
    "45826": [
        "CHICKASAW",
        "OH"
    ],
    "45827": [
        "CLOVERDALE",
        "OH"
    ],
    "45828": [
        "COLDWATER",
        "OH"
    ],
    "45830": [
        "COLUMBUS GROVE",
        "OH"
    ],
    "45831": [
        "CONTINENTAL",
        "OH"
    ],
    "45832": [
        "CONVOY",
        "OH"
    ],
    "45833": [
        "DELPHOS",
        "OH"
    ],
    "45835": [
        "DOLA",
        "OH"
    ],
    "45836": [
        "DUNKIRK",
        "OH"
    ],
    "45837": [
        "DUPONT",
        "OH"
    ],
    "45838": [
        "ELGIN",
        "OH"
    ],
    "45839": [
        "FINDLAY",
        "OH"
    ],
    "45840": [
        "FINDLAY",
        "OH"
    ],
    "45841": [
        "JENERA",
        "OH"
    ],
    "45843": [
        "FOREST",
        "OH"
    ],
    "45844": [
        "FORT JENNINGS",
        "OH"
    ],
    "45845": [
        "FORT LORAMIE",
        "OH"
    ],
    "45846": [
        "FORT RECOVERY",
        "OH"
    ],
    "45848": [
        "GLANDORF",
        "OH"
    ],
    "45849": [
        "GROVER HILL",
        "OH"
    ],
    "45850": [
        "HARROD",
        "OH"
    ],
    "45851": [
        "HAVILAND",
        "OH"
    ],
    "45853": [
        "KALIDA",
        "OH"
    ],
    "45854": [
        "LAFAYETTE",
        "OH"
    ],
    "45855": [
        "LATTY",
        "OH"
    ],
    "45856": [
        "LEIPSIC",
        "OH"
    ],
    "45858": [
        "MC COMB",
        "OH"
    ],
    "45859": [
        "MC GUFFEY",
        "OH"
    ],
    "45860": [
        "MARIA STEIN",
        "OH"
    ],
    "45861": [
        "MELROSE",
        "OH"
    ],
    "45862": [
        "MENDON",
        "OH"
    ],
    "45863": [
        "MIDDLE POINT",
        "OH"
    ],
    "45864": [
        "MILLER CITY",
        "OH"
    ],
    "45865": [
        "MINSTER",
        "OH"
    ],
    "45866": [
        "MONTEZUMA",
        "OH"
    ],
    "45867": [
        "MOUNT BLANCHARD",
        "OH"
    ],
    "45868": [
        "MOUNT CORY",
        "OH"
    ],
    "45869": [
        "NEW BREMEN",
        "OH"
    ],
    "45870": [
        "NEW HAMPSHIRE",
        "OH"
    ],
    "45871": [
        "NEW KNOXVILLE",
        "OH"
    ],
    "45872": [
        "NORTH BALTIMORE",
        "OH"
    ],
    "45873": [
        "OAKWOOD",
        "OH"
    ],
    "45874": [
        "OHIO CITY",
        "OH"
    ],
    "45875": [
        "OTTAWA",
        "OH"
    ],
    "45876": [
        "OTTOVILLE",
        "OH"
    ],
    "45877": [
        "PANDORA",
        "OH"
    ],
    "45879": [
        "PAULDING",
        "OH"
    ],
    "45880": [
        "PAYNE",
        "OH"
    ],
    "45881": [
        "RAWSON",
        "OH"
    ],
    "45882": [
        "ROCKFORD",
        "OH"
    ],
    "45883": [
        "SAINT HENRY",
        "OH"
    ],
    "45885": [
        "SAINT MARYS",
        "OH"
    ],
    "45886": [
        "SCOTT",
        "OH"
    ],
    "45887": [
        "SPENCERVILLE",
        "OH"
    ],
    "45888": [
        "UNIOPOLIS",
        "OH"
    ],
    "45889": [
        "VAN BUREN",
        "OH"
    ],
    "45890": [
        "VANLUE",
        "OH"
    ],
    "45891": [
        "VAN WERT",
        "OH"
    ],
    "45893": [
        "VAUGHNSVILLE",
        "OH"
    ],
    "45894": [
        "VENEDOCIA",
        "OH"
    ],
    "45895": [
        "WAPAKONETA",
        "OH"
    ],
    "45896": [
        "WAYNESFIELD",
        "OH"
    ],
    "45898": [
        "WILLSHIRE",
        "OH"
    ],
    "45899": [
        "WREN",
        "OH"
    ],
    "45999": [
        "CINCINNATI",
        "OH"
    ],
    "46001": [
        "ALEXANDRIA",
        "IN"
    ],
    "46011": [
        "ANDERSON",
        "IN"
    ],
    "46012": [
        "ANDERSON",
        "IN"
    ],
    "46013": [
        "ANDERSON",
        "IN"
    ],
    "46014": [
        "ANDERSON",
        "IN"
    ],
    "46015": [
        "ANDERSON",
        "IN"
    ],
    "46016": [
        "ANDERSON",
        "IN"
    ],
    "46017": [
        "ANDERSON",
        "IN"
    ],
    "46018": [
        "ANDERSON",
        "IN"
    ],
    "46030": [
        "ARCADIA",
        "IN"
    ],
    "46031": [
        "ATLANTA",
        "IN"
    ],
    "46032": [
        "CARMEL",
        "IN"
    ],
    "46033": [
        "CARMEL",
        "IN"
    ],
    "46034": [
        "CICERO",
        "IN"
    ],
    "46035": [
        "COLFAX",
        "IN"
    ],
    "46036": [
        "ELWOOD",
        "IN"
    ],
    "46037": [
        "FISHERS",
        "IN"
    ],
    "46038": [
        "FISHERS",
        "IN"
    ],
    "46039": [
        "FOREST",
        "IN"
    ],
    "46040": [
        "FORTVILLE",
        "IN"
    ],
    "46041": [
        "FRANKFORT",
        "IN"
    ],
    "46044": [
        "FRANKTON",
        "IN"
    ],
    "46045": [
        "GOLDSMITH",
        "IN"
    ],
    "46047": [
        "HOBBS",
        "IN"
    ],
    "46048": [
        "INGALLS",
        "IN"
    ],
    "46049": [
        "KEMPTON",
        "IN"
    ],
    "46050": [
        "KIRKLIN",
        "IN"
    ],
    "46051": [
        "LAPEL",
        "IN"
    ],
    "46052": [
        "LEBANON",
        "IN"
    ],
    "46055": [
        "MCCORDSVILLE",
        "IN"
    ],
    "46056": [
        "MARKLEVILLE",
        "IN"
    ],
    "46057": [
        "MICHIGANTOWN",
        "IN"
    ],
    "46058": [
        "MULBERRY",
        "IN"
    ],
    "46060": [
        "NOBLESVILLE",
        "IN"
    ],
    "46061": [
        "NOBLESVILLE",
        "IN"
    ],
    "46062": [
        "NOBLESVILLE",
        "IN"
    ],
    "46063": [
        "ORESTES",
        "IN"
    ],
    "46064": [
        "PENDLETON",
        "IN"
    ],
    "46065": [
        "ROSSVILLE",
        "IN"
    ],
    "46067": [
        "SEDALIA",
        "IN"
    ],
    "46068": [
        "SHARPSVILLE",
        "IN"
    ],
    "46069": [
        "SHERIDAN",
        "IN"
    ],
    "46070": [
        "SUMMITVILLE",
        "IN"
    ],
    "46071": [
        "THORNTOWN",
        "IN"
    ],
    "46072": [
        "TIPTON",
        "IN"
    ],
    "46074": [
        "WESTFIELD",
        "IN"
    ],
    "46075": [
        "WHITESTOWN",
        "IN"
    ],
    "46076": [
        "WINDFALL",
        "IN"
    ],
    "46077": [
        "ZIONSVILLE",
        "IN"
    ],
    "46082": [
        "CARMEL",
        "IN"
    ],
    "46102": [
        "ADVANCE",
        "IN"
    ],
    "46103": [
        "AMO",
        "IN"
    ],
    "46104": [
        "ARLINGTON",
        "IN"
    ],
    "46105": [
        "BAINBRIDGE",
        "IN"
    ],
    "46106": [
        "BARGERSVILLE",
        "IN"
    ],
    "46107": [
        "BEECH GROVE",
        "IN"
    ],
    "46110": [
        "BOGGSTOWN",
        "IN"
    ],
    "46111": [
        "BROOKLYN",
        "IN"
    ],
    "46112": [
        "BROWNSBURG",
        "IN"
    ],
    "46113": [
        "CAMBY",
        "IN"
    ],
    "46115": [
        "CARTHAGE",
        "IN"
    ],
    "46117": [
        "CHARLOTTESVILLE",
        "IN"
    ],
    "46118": [
        "CLAYTON",
        "IN"
    ],
    "46120": [
        "CLOVERDALE",
        "IN"
    ],
    "46121": [
        "COATESVILLE",
        "IN"
    ],
    "46122": [
        "DANVILLE",
        "IN"
    ],
    "46123": [
        "AVON",
        "IN"
    ],
    "46124": [
        "EDINBURGH",
        "IN"
    ],
    "46125": [
        "EMINENCE",
        "IN"
    ],
    "46126": [
        "FAIRLAND",
        "IN"
    ],
    "46127": [
        "FALMOUTH",
        "IN"
    ],
    "46128": [
        "FILLMORE",
        "IN"
    ],
    "46129": [
        "FINLY",
        "IN"
    ],
    "46130": [
        "FOUNTAINTOWN",
        "IN"
    ],
    "46131": [
        "FRANKLIN",
        "IN"
    ],
    "46133": [
        "GLENWOOD",
        "IN"
    ],
    "46135": [
        "GREENCASTLE",
        "IN"
    ],
    "46140": [
        "GREENFIELD",
        "IN"
    ],
    "46142": [
        "GREENWOOD",
        "IN"
    ],
    "46143": [
        "GREENWOOD",
        "IN"
    ],
    "46144": [
        "GWYNNEVILLE",
        "IN"
    ],
    "46146": [
        "HOMER",
        "IN"
    ],
    "46147": [
        "JAMESTOWN",
        "IN"
    ],
    "46148": [
        "KNIGHTSTOWN",
        "IN"
    ],
    "46149": [
        "LIZTON",
        "IN"
    ],
    "46150": [
        "MANILLA",
        "IN"
    ],
    "46151": [
        "MARTINSVILLE",
        "IN"
    ],
    "46154": [
        "MAXWELL",
        "IN"
    ],
    "46155": [
        "MAYS",
        "IN"
    ],
    "46156": [
        "MILROY",
        "IN"
    ],
    "46157": [
        "MONROVIA",
        "IN"
    ],
    "46158": [
        "MOORESVILLE",
        "IN"
    ],
    "46160": [
        "MORGANTOWN",
        "IN"
    ],
    "46161": [
        "MORRISTOWN",
        "IN"
    ],
    "46162": [
        "NEEDHAM",
        "IN"
    ],
    "46163": [
        "NEW PALESTINE",
        "IN"
    ],
    "46164": [
        "NINEVEH",
        "IN"
    ],
    "46165": [
        "NORTH SALEM",
        "IN"
    ],
    "46166": [
        "PARAGON",
        "IN"
    ],
    "46167": [
        "PITTSBORO",
        "IN"
    ],
    "46168": [
        "PLAINFIELD",
        "IN"
    ],
    "46170": [
        "PUTNAMVILLE",
        "IN"
    ],
    "46171": [
        "REELSVILLE",
        "IN"
    ],
    "46172": [
        "ROACHDALE",
        "IN"
    ],
    "46173": [
        "RUSHVILLE",
        "IN"
    ],
    "46175": [
        "RUSSELLVILLE",
        "IN"
    ],
    "46176": [
        "SHELBYVILLE",
        "IN"
    ],
    "46180": [
        "STILESVILLE",
        "IN"
    ],
    "46181": [
        "TRAFALGAR",
        "IN"
    ],
    "46182": [
        "WALDRON",
        "IN"
    ],
    "46183": [
        "WEST NEWTON",
        "IN"
    ],
    "46184": [
        "WHITELAND",
        "IN"
    ],
    "46186": [
        "WILKINSON",
        "IN"
    ],
    "46201": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46202": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46203": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46204": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46205": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46206": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46207": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46208": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46210": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46211": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46214": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46216": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46217": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46218": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46219": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46220": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46221": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46222": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46224": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46225": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46226": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46227": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46228": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46229": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46230": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46231": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46234": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46235": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46236": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46237": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46239": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46240": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46241": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46242": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46244": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46247": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46249": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46250": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46251": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46253": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46254": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46255": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46256": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46259": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46260": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46266": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46268": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46274": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46277": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46278": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46280": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46282": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46285": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46290": [
        "INDIANAPOLIS",
        "IN"
    ],
    "46301": [
        "BEVERLY SHORES",
        "IN"
    ],
    "46302": [
        "BOONE GROVE",
        "IN"
    ],
    "46303": [
        "CEDAR LAKE",
        "IN"
    ],
    "46304": [
        "CHESTERTON",
        "IN"
    ],
    "46307": [
        "CROWN POINT",
        "IN"
    ],
    "46308": [
        "CROWN POINT",
        "IN"
    ],
    "46310": [
        "DEMOTTE",
        "IN"
    ],
    "46311": [
        "DYER",
        "IN"
    ],
    "46312": [
        "EAST CHICAGO",
        "IN"
    ],
    "46319": [
        "GRIFFITH",
        "IN"
    ],
    "46320": [
        "HAMMOND",
        "IN"
    ],
    "46321": [
        "MUNSTER",
        "IN"
    ],
    "46322": [
        "HIGHLAND",
        "IN"
    ],
    "46323": [
        "HAMMOND",
        "IN"
    ],
    "46324": [
        "HAMMOND",
        "IN"
    ],
    "46325": [
        "HAMMOND",
        "IN"
    ],
    "46327": [
        "HAMMOND",
        "IN"
    ],
    "46340": [
        "HANNA",
        "IN"
    ],
    "46341": [
        "HEBRON",
        "IN"
    ],
    "46342": [
        "HOBART",
        "IN"
    ],
    "46345": [
        "KINGSBURY",
        "IN"
    ],
    "46346": [
        "KINGSFORD HEIGHTS",
        "IN"
    ],
    "46347": [
        "KOUTS",
        "IN"
    ],
    "46348": [
        "LA CROSSE",
        "IN"
    ],
    "46349": [
        "LAKE VILLAGE",
        "IN"
    ],
    "46350": [
        "LA PORTE",
        "IN"
    ],
    "46352": [
        "LA PORTE",
        "IN"
    ],
    "46355": [
        "LEROY",
        "IN"
    ],
    "46356": [
        "LOWELL",
        "IN"
    ],
    "46360": [
        "MICHIGAN CITY",
        "IN"
    ],
    "46361": [
        "MICHIGAN CITY",
        "IN"
    ],
    "46365": [
        "MILL CREEK",
        "IN"
    ],
    "46366": [
        "NORTH JUDSON",
        "IN"
    ],
    "46368": [
        "PORTAGE",
        "IN"
    ],
    "46371": [
        "ROLLING PRAIRIE",
        "IN"
    ],
    "46372": [
        "ROSELAWN",
        "IN"
    ],
    "46373": [
        "SAINT JOHN",
        "IN"
    ],
    "46374": [
        "SAN PIERRE",
        "IN"
    ],
    "46375": [
        "SCHERERVILLE",
        "IN"
    ],
    "46376": [
        "SCHNEIDER",
        "IN"
    ],
    "46377": [
        "SHELBY",
        "IN"
    ],
    "46379": [
        "SUMAVA RESORTS",
        "IN"
    ],
    "46381": [
        "THAYER",
        "IN"
    ],
    "46382": [
        "UNION MILLS",
        "IN"
    ],
    "46383": [
        "VALPARAISO",
        "IN"
    ],
    "46384": [
        "VALPARAISO",
        "IN"
    ],
    "46385": [
        "VALPARAISO",
        "IN"
    ],
    "46390": [
        "WANATAH",
        "IN"
    ],
    "46391": [
        "WESTVILLE",
        "IN"
    ],
    "46392": [
        "WHEATFIELD",
        "IN"
    ],
    "46393": [
        "WHEELER",
        "IN"
    ],
    "46394": [
        "WHITING",
        "IN"
    ],
    "46401": [
        "GARY",
        "IN"
    ],
    "46402": [
        "GARY",
        "IN"
    ],
    "46403": [
        "GARY",
        "IN"
    ],
    "46404": [
        "GARY",
        "IN"
    ],
    "46405": [
        "LAKE STATION",
        "IN"
    ],
    "46406": [
        "GARY",
        "IN"
    ],
    "46407": [
        "GARY",
        "IN"
    ],
    "46408": [
        "GARY",
        "IN"
    ],
    "46409": [
        "GARY",
        "IN"
    ],
    "46410": [
        "MERRILLVILLE",
        "IN"
    ],
    "46411": [
        "MERRILLVILLE",
        "IN"
    ],
    "46501": [
        "ARGOS",
        "IN"
    ],
    "46502": [
        "ATWOOD",
        "IN"
    ],
    "46504": [
        "BOURBON",
        "IN"
    ],
    "46506": [
        "BREMEN",
        "IN"
    ],
    "46507": [
        "BRISTOL",
        "IN"
    ],
    "46508": [
        "BURKET",
        "IN"
    ],
    "46510": [
        "CLAYPOOL",
        "IN"
    ],
    "46511": [
        "CULVER",
        "IN"
    ],
    "46513": [
        "DONALDSON",
        "IN"
    ],
    "46514": [
        "ELKHART",
        "IN"
    ],
    "46515": [
        "ELKHART",
        "IN"
    ],
    "46516": [
        "ELKHART",
        "IN"
    ],
    "46517": [
        "ELKHART",
        "IN"
    ],
    "46524": [
        "ETNA GREEN",
        "IN"
    ],
    "46526": [
        "GOSHEN",
        "IN"
    ],
    "46527": [
        "GOSHEN",
        "IN"
    ],
    "46528": [
        "GOSHEN",
        "IN"
    ],
    "46530": [
        "GRANGER",
        "IN"
    ],
    "46531": [
        "GROVERTOWN",
        "IN"
    ],
    "46532": [
        "HAMLET",
        "IN"
    ],
    "46534": [
        "KNOX",
        "IN"
    ],
    "46536": [
        "LAKEVILLE",
        "IN"
    ],
    "46537": [
        "LAPAZ",
        "IN"
    ],
    "46538": [
        "LEESBURG",
        "IN"
    ],
    "46539": [
        "MENTONE",
        "IN"
    ],
    "46540": [
        "MIDDLEBURY",
        "IN"
    ],
    "46542": [
        "MILFORD",
        "IN"
    ],
    "46543": [
        "MILLERSBURG",
        "IN"
    ],
    "46544": [
        "MISHAWAKA",
        "IN"
    ],
    "46545": [
        "MISHAWAKA",
        "IN"
    ],
    "46546": [
        "MISHAWAKA",
        "IN"
    ],
    "46550": [
        "NAPPANEE",
        "IN"
    ],
    "46552": [
        "NEW CARLISLE",
        "IN"
    ],
    "46553": [
        "NEW PARIS",
        "IN"
    ],
    "46554": [
        "NORTH LIBERTY",
        "IN"
    ],
    "46555": [
        "NORTH WEBSTER",
        "IN"
    ],
    "46556": [
        "NOTRE DAME",
        "IN"
    ],
    "46561": [
        "OSCEOLA",
        "IN"
    ],
    "46562": [
        "PIERCETON",
        "IN"
    ],
    "46563": [
        "PLYMOUTH",
        "IN"
    ],
    "46565": [
        "SHIPSHEWANA",
        "IN"
    ],
    "46567": [
        "SYRACUSE",
        "IN"
    ],
    "46570": [
        "TIPPECANOE",
        "IN"
    ],
    "46571": [
        "TOPEKA",
        "IN"
    ],
    "46572": [
        "TYNER",
        "IN"
    ],
    "46573": [
        "WAKARUSA",
        "IN"
    ],
    "46574": [
        "WALKERTON",
        "IN"
    ],
    "46580": [
        "WARSAW",
        "IN"
    ],
    "46581": [
        "WARSAW",
        "IN"
    ],
    "46582": [
        "WARSAW",
        "IN"
    ],
    "46590": [
        "WINONA LAKE",
        "IN"
    ],
    "46595": [
        "WYATT",
        "IN"
    ],
    "46601": [
        "SOUTH BEND",
        "IN"
    ],
    "46613": [
        "SOUTH BEND",
        "IN"
    ],
    "46614": [
        "SOUTH BEND",
        "IN"
    ],
    "46615": [
        "SOUTH BEND",
        "IN"
    ],
    "46616": [
        "SOUTH BEND",
        "IN"
    ],
    "46617": [
        "SOUTH BEND",
        "IN"
    ],
    "46619": [
        "SOUTH BEND",
        "IN"
    ],
    "46624": [
        "SOUTH BEND",
        "IN"
    ],
    "46626": [
        "SOUTH BEND",
        "IN"
    ],
    "46628": [
        "SOUTH BEND",
        "IN"
    ],
    "46634": [
        "SOUTH BEND",
        "IN"
    ],
    "46635": [
        "SOUTH BEND",
        "IN"
    ],
    "46637": [
        "SOUTH BEND",
        "IN"
    ],
    "46660": [
        "SOUTH BEND",
        "IN"
    ],
    "46680": [
        "SOUTH BEND",
        "IN"
    ],
    "46701": [
        "ALBION",
        "IN"
    ],
    "46702": [
        "ANDREWS",
        "IN"
    ],
    "46703": [
        "ANGOLA",
        "IN"
    ],
    "46704": [
        "ARCOLA",
        "IN"
    ],
    "46705": [
        "ASHLEY",
        "IN"
    ],
    "46706": [
        "AUBURN",
        "IN"
    ],
    "46710": [
        "AVILLA",
        "IN"
    ],
    "46711": [
        "BERNE",
        "IN"
    ],
    "46713": [
        "BIPPUS",
        "IN"
    ],
    "46714": [
        "BLUFFTON",
        "IN"
    ],
    "46721": [
        "BUTLER",
        "IN"
    ],
    "46723": [
        "CHURUBUSCO",
        "IN"
    ],
    "46725": [
        "COLUMBIA CITY",
        "IN"
    ],
    "46730": [
        "CORUNNA",
        "IN"
    ],
    "46731": [
        "CRAIGVILLE",
        "IN"
    ],
    "46732": [
        "CROMWELL",
        "IN"
    ],
    "46733": [
        "DECATUR",
        "IN"
    ],
    "46737": [
        "FREMONT",
        "IN"
    ],
    "46738": [
        "GARRETT",
        "IN"
    ],
    "46740": [
        "GENEVA",
        "IN"
    ],
    "46741": [
        "GRABILL",
        "IN"
    ],
    "46742": [
        "HAMILTON",
        "IN"
    ],
    "46743": [
        "HARLAN",
        "IN"
    ],
    "46745": [
        "HOAGLAND",
        "IN"
    ],
    "46746": [
        "HOWE",
        "IN"
    ],
    "46747": [
        "HUDSON",
        "IN"
    ],
    "46748": [
        "HUNTERTOWN",
        "IN"
    ],
    "46750": [
        "HUNTINGTON",
        "IN"
    ],
    "46755": [
        "KENDALLVILLE",
        "IN"
    ],
    "46759": [
        "KEYSTONE",
        "IN"
    ],
    "46760": [
        "KIMMELL",
        "IN"
    ],
    "46761": [
        "LAGRANGE",
        "IN"
    ],
    "46763": [
        "LAOTTO",
        "IN"
    ],
    "46764": [
        "LARWILL",
        "IN"
    ],
    "46765": [
        "LEO",
        "IN"
    ],
    "46766": [
        "LIBERTY CENTER",
        "IN"
    ],
    "46767": [
        "LIGONIER",
        "IN"
    ],
    "46769": [
        "LINN GROVE",
        "IN"
    ],
    "46770": [
        "MARKLE",
        "IN"
    ],
    "46771": [
        "MONGO",
        "IN"
    ],
    "46772": [
        "MONROE",
        "IN"
    ],
    "46773": [
        "MONROEVILLE",
        "IN"
    ],
    "46774": [
        "NEW HAVEN",
        "IN"
    ],
    "46776": [
        "ORLAND",
        "IN"
    ],
    "46777": [
        "OSSIAN",
        "IN"
    ],
    "46778": [
        "PETROLEUM",
        "IN"
    ],
    "46779": [
        "PLEASANT LAKE",
        "IN"
    ],
    "46780": [
        "PLEASANT MILLS",
        "IN"
    ],
    "46781": [
        "PONETO",
        "IN"
    ],
    "46782": [
        "PREBLE",
        "IN"
    ],
    "46783": [
        "ROANOKE",
        "IN"
    ],
    "46784": [
        "ROME CITY",
        "IN"
    ],
    "46785": [
        "SAINT JOE",
        "IN"
    ],
    "46786": [
        "SOUTH MILFORD",
        "IN"
    ],
    "46787": [
        "SOUTH WHITLEY",
        "IN"
    ],
    "46788": [
        "SPENCERVILLE",
        "IN"
    ],
    "46789": [
        "STROH",
        "IN"
    ],
    "46791": [
        "UNIONDALE",
        "IN"
    ],
    "46792": [
        "WARREN",
        "IN"
    ],
    "46793": [
        "WATERLOO",
        "IN"
    ],
    "46794": [
        "WAWAKA",
        "IN"
    ],
    "46795": [
        "WOLCOTTVILLE",
        "IN"
    ],
    "46796": [
        "WOLFLAKE",
        "IN"
    ],
    "46797": [
        "WOODBURN",
        "IN"
    ],
    "46798": [
        "YODER",
        "IN"
    ],
    "46799": [
        "ZANESVILLE",
        "IN"
    ],
    "46801": [
        "FORT WAYNE",
        "IN"
    ],
    "46802": [
        "FORT WAYNE",
        "IN"
    ],
    "46803": [
        "FORT WAYNE",
        "IN"
    ],
    "46804": [
        "FORT WAYNE",
        "IN"
    ],
    "46805": [
        "FORT WAYNE",
        "IN"
    ],
    "46806": [
        "FORT WAYNE",
        "IN"
    ],
    "46807": [
        "FORT WAYNE",
        "IN"
    ],
    "46808": [
        "FORT WAYNE",
        "IN"
    ],
    "46809": [
        "FORT WAYNE",
        "IN"
    ],
    "46814": [
        "FORT WAYNE",
        "IN"
    ],
    "46815": [
        "FORT WAYNE",
        "IN"
    ],
    "46816": [
        "FORT WAYNE",
        "IN"
    ],
    "46818": [
        "FORT WAYNE",
        "IN"
    ],
    "46819": [
        "FORT WAYNE",
        "IN"
    ],
    "46825": [
        "FORT WAYNE",
        "IN"
    ],
    "46835": [
        "FORT WAYNE",
        "IN"
    ],
    "46845": [
        "FORT WAYNE",
        "IN"
    ],
    "46850": [
        "FORT WAYNE",
        "IN"
    ],
    "46851": [
        "FORT WAYNE",
        "IN"
    ],
    "46852": [
        "FORT WAYNE",
        "IN"
    ],
    "46853": [
        "FORT WAYNE",
        "IN"
    ],
    "46854": [
        "FORT WAYNE",
        "IN"
    ],
    "46855": [
        "FORT WAYNE",
        "IN"
    ],
    "46856": [
        "FORT WAYNE",
        "IN"
    ],
    "46857": [
        "FORT WAYNE",
        "IN"
    ],
    "46858": [
        "FORT WAYNE",
        "IN"
    ],
    "46862": [
        "FORT WAYNE",
        "IN"
    ],
    "46863": [
        "FORT WAYNE",
        "IN"
    ],
    "46864": [
        "FORT WAYNE",
        "IN"
    ],
    "46865": [
        "FORT WAYNE",
        "IN"
    ],
    "46866": [
        "FORT WAYNE",
        "IN"
    ],
    "46867": [
        "FORT WAYNE",
        "IN"
    ],
    "46868": [
        "FORT WAYNE",
        "IN"
    ],
    "46885": [
        "FORT WAYNE",
        "IN"
    ],
    "46895": [
        "FORT WAYNE",
        "IN"
    ],
    "46896": [
        "FORT WAYNE",
        "IN"
    ],
    "46898": [
        "FORT WAYNE",
        "IN"
    ],
    "46899": [
        "FORT WAYNE",
        "IN"
    ],
    "46901": [
        "KOKOMO",
        "IN"
    ],
    "46902": [
        "KOKOMO",
        "IN"
    ],
    "46903": [
        "KOKOMO",
        "IN"
    ],
    "46904": [
        "KOKOMO",
        "IN"
    ],
    "46910": [
        "AKRON",
        "IN"
    ],
    "46911": [
        "AMBOY",
        "IN"
    ],
    "46912": [
        "ATHENS",
        "IN"
    ],
    "46913": [
        "BRINGHURST",
        "IN"
    ],
    "46914": [
        "BUNKER HILL",
        "IN"
    ],
    "46915": [
        "BURLINGTON",
        "IN"
    ],
    "46916": [
        "BURROWS",
        "IN"
    ],
    "46917": [
        "CAMDEN",
        "IN"
    ],
    "46919": [
        "CONVERSE",
        "IN"
    ],
    "46920": [
        "CUTLER",
        "IN"
    ],
    "46922": [
        "DELONG",
        "IN"
    ],
    "46923": [
        "DELPHI",
        "IN"
    ],
    "46926": [
        "DENVER",
        "IN"
    ],
    "46928": [
        "FAIRMOUNT",
        "IN"
    ],
    "46929": [
        "FLORA",
        "IN"
    ],
    "46930": [
        "FOWLERTON",
        "IN"
    ],
    "46931": [
        "FULTON",
        "IN"
    ],
    "46932": [
        "GALVESTON",
        "IN"
    ],
    "46933": [
        "GAS CITY",
        "IN"
    ],
    "46936": [
        "GREENTOWN",
        "IN"
    ],
    "46937": [
        "HEMLOCK",
        "IN"
    ],
    "46938": [
        "JONESBORO",
        "IN"
    ],
    "46939": [
        "KEWANNA",
        "IN"
    ],
    "46940": [
        "LA FONTAINE",
        "IN"
    ],
    "46941": [
        "LAGRO",
        "IN"
    ],
    "46942": [
        "LAKE CICOTT",
        "IN"
    ],
    "46943": [
        "LAKETON",
        "IN"
    ],
    "46945": [
        "LEITERS FORD",
        "IN"
    ],
    "46946": [
        "LIBERTY MILLS",
        "IN"
    ],
    "46947": [
        "LOGANSPORT",
        "IN"
    ],
    "46950": [
        "LUCERNE",
        "IN"
    ],
    "46951": [
        "MACY",
        "IN"
    ],
    "46952": [
        "MARION",
        "IN"
    ],
    "46953": [
        "MARION",
        "IN"
    ],
    "46957": [
        "MATTHEWS",
        "IN"
    ],
    "46958": [
        "MEXICO",
        "IN"
    ],
    "46959": [
        "MIAMI",
        "IN"
    ],
    "46960": [
        "MONTEREY",
        "IN"
    ],
    "46961": [
        "NEW WAVERLY",
        "IN"
    ],
    "46962": [
        "NORTH MANCHESTER",
        "IN"
    ],
    "46965": [
        "OAKFORD",
        "IN"
    ],
    "46967": [
        "ONWARD",
        "IN"
    ],
    "46970": [
        "PERU",
        "IN"
    ],
    "46971": [
        "GRISSOM ARB",
        "IN"
    ],
    "46974": [
        "ROANN",
        "IN"
    ],
    "46975": [
        "ROCHESTER",
        "IN"
    ],
    "46977": [
        "ROCKFIELD",
        "IN"
    ],
    "46978": [
        "ROYAL CENTER",
        "IN"
    ],
    "46979": [
        "RUSSIAVILLE",
        "IN"
    ],
    "46980": [
        "SERVIA",
        "IN"
    ],
    "46982": [
        "SILVER LAKE",
        "IN"
    ],
    "46984": [
        "SOMERSET",
        "IN"
    ],
    "46985": [
        "STAR CITY",
        "IN"
    ],
    "46986": [
        "SWAYZEE",
        "IN"
    ],
    "46987": [
        "SWEETSER",
        "IN"
    ],
    "46988": [
        "TWELVE MILE",
        "IN"
    ],
    "46989": [
        "UPLAND",
        "IN"
    ],
    "46990": [
        "URBANA",
        "IN"
    ],
    "46991": [
        "VAN BUREN",
        "IN"
    ],
    "46992": [
        "WABASH",
        "IN"
    ],
    "46994": [
        "WALTON",
        "IN"
    ],
    "46995": [
        "WEST MIDDLETON",
        "IN"
    ],
    "46996": [
        "WINAMAC",
        "IN"
    ],
    "47001": [
        "AURORA",
        "IN"
    ],
    "47003": [
        "WEST COLLEGE CORNER",
        "IN"
    ],
    "47006": [
        "BATESVILLE",
        "IN"
    ],
    "47010": [
        "BATH",
        "IN"
    ],
    "47011": [
        "BENNINGTON",
        "IN"
    ],
    "47012": [
        "BROOKVILLE",
        "IN"
    ],
    "47016": [
        "CEDAR GROVE",
        "IN"
    ],
    "47017": [
        "CROSS PLAINS",
        "IN"
    ],
    "47018": [
        "DILLSBORO",
        "IN"
    ],
    "47019": [
        "EAST ENTERPRISE",
        "IN"
    ],
    "47020": [
        "FLORENCE",
        "IN"
    ],
    "47021": [
        "FRIENDSHIP",
        "IN"
    ],
    "47022": [
        "GUILFORD",
        "IN"
    ],
    "47023": [
        "HOLTON",
        "IN"
    ],
    "47024": [
        "LAUREL",
        "IN"
    ],
    "47025": [
        "LAWRENCEBURG",
        "IN"
    ],
    "47030": [
        "METAMORA",
        "IN"
    ],
    "47031": [
        "MILAN",
        "IN"
    ],
    "47032": [
        "MOORES HILL",
        "IN"
    ],
    "47033": [
        "MORRIS",
        "IN"
    ],
    "47034": [
        "NAPOLEON",
        "IN"
    ],
    "47035": [
        "NEW TRENTON",
        "IN"
    ],
    "47036": [
        "OLDENBURG",
        "IN"
    ],
    "47037": [
        "OSGOOD",
        "IN"
    ],
    "47038": [
        "PATRIOT",
        "IN"
    ],
    "47039": [
        "PIERCEVILLE",
        "IN"
    ],
    "47040": [
        "RISING SUN",
        "IN"
    ],
    "47041": [
        "SUNMAN",
        "IN"
    ],
    "47042": [
        "VERSAILLES",
        "IN"
    ],
    "47043": [
        "VEVAY",
        "IN"
    ],
    "47060": [
        "WEST HARRISON",
        "IN"
    ],
    "47102": [
        "AUSTIN",
        "IN"
    ],
    "47106": [
        "BORDEN",
        "IN"
    ],
    "47108": [
        "CAMPBELLSBURG",
        "IN"
    ],
    "47110": [
        "CENTRAL",
        "IN"
    ],
    "47111": [
        "CHARLESTOWN",
        "IN"
    ],
    "47112": [
        "CORYDON",
        "IN"
    ],
    "47114": [
        "CRANDALL",
        "IN"
    ],
    "47115": [
        "DEPAUW",
        "IN"
    ],
    "47116": [
        "ECKERTY",
        "IN"
    ],
    "47117": [
        "ELIZABETH",
        "IN"
    ],
    "47118": [
        "ENGLISH",
        "IN"
    ],
    "47119": [
        "FLOYDS KNOBS",
        "IN"
    ],
    "47120": [
        "FREDERICKSBURG",
        "IN"
    ],
    "47122": [
        "GEORGETOWN",
        "IN"
    ],
    "47123": [
        "GRANTSBURG",
        "IN"
    ],
    "47124": [
        "GREENVILLE",
        "IN"
    ],
    "47125": [
        "HARDINSBURG",
        "IN"
    ],
    "47126": [
        "HENRYVILLE",
        "IN"
    ],
    "47129": [
        "CLARKSVILLE",
        "IN"
    ],
    "47130": [
        "JEFFERSONVILLE",
        "IN"
    ],
    "47131": [
        "JEFFERSONVILLE",
        "IN"
    ],
    "47135": [
        "LACONIA",
        "IN"
    ],
    "47136": [
        "LANESVILLE",
        "IN"
    ],
    "47137": [
        "LEAVENWORTH",
        "IN"
    ],
    "47138": [
        "LEXINGTON",
        "IN"
    ],
    "47140": [
        "MARENGO",
        "IN"
    ],
    "47141": [
        "MARYSVILLE",
        "IN"
    ],
    "47142": [
        "MAUCKPORT",
        "IN"
    ],
    "47143": [
        "MEMPHIS",
        "IN"
    ],
    "47145": [
        "MILLTOWN",
        "IN"
    ],
    "47146": [
        "MOUNT SAINT FRANCIS",
        "IN"
    ],
    "47147": [
        "NABB",
        "IN"
    ],
    "47150": [
        "NEW ALBANY",
        "IN"
    ],
    "47151": [
        "NEW ALBANY",
        "IN"
    ],
    "47160": [
        "NEW MIDDLETOWN",
        "IN"
    ],
    "47161": [
        "NEW SALISBURY",
        "IN"
    ],
    "47162": [
        "NEW WASHINGTON",
        "IN"
    ],
    "47163": [
        "OTISCO",
        "IN"
    ],
    "47164": [
        "PALMYRA",
        "IN"
    ],
    "47165": [
        "PEKIN",
        "IN"
    ],
    "47166": [
        "RAMSEY",
        "IN"
    ],
    "47167": [
        "SALEM",
        "IN"
    ],
    "47170": [
        "SCOTTSBURG",
        "IN"
    ],
    "47172": [
        "SELLERSBURG",
        "IN"
    ],
    "47174": [
        "SULPHUR",
        "IN"
    ],
    "47175": [
        "TASWELL",
        "IN"
    ],
    "47177": [
        "UNDERWOOD",
        "IN"
    ],
    "47201": [
        "COLUMBUS",
        "IN"
    ],
    "47202": [
        "COLUMBUS",
        "IN"
    ],
    "47203": [
        "COLUMBUS",
        "IN"
    ],
    "47220": [
        "BROWNSTOWN",
        "IN"
    ],
    "47223": [
        "BUTLERVILLE",
        "IN"
    ],
    "47224": [
        "CANAAN",
        "IN"
    ],
    "47225": [
        "CLARKSBURG",
        "IN"
    ],
    "47226": [
        "CLIFFORD",
        "IN"
    ],
    "47227": [
        "COMMISKEY",
        "IN"
    ],
    "47229": [
        "CROTHERSVILLE",
        "IN"
    ],
    "47230": [
        "DEPUTY",
        "IN"
    ],
    "47231": [
        "DUPONT",
        "IN"
    ],
    "47232": [
        "ELIZABETHTOWN",
        "IN"
    ],
    "47234": [
        "FLAT ROCK",
        "IN"
    ],
    "47235": [
        "FREETOWN",
        "IN"
    ],
    "47236": [
        "GRAMMER",
        "IN"
    ],
    "47240": [
        "GREENSBURG",
        "IN"
    ],
    "47243": [
        "HANOVER",
        "IN"
    ],
    "47244": [
        "HARTSVILLE",
        "IN"
    ],
    "47245": [
        "HAYDEN",
        "IN"
    ],
    "47246": [
        "HOPE",
        "IN"
    ],
    "47247": [
        "JONESVILLE",
        "IN"
    ],
    "47250": [
        "MADISON",
        "IN"
    ],
    "47260": [
        "MEDORA",
        "IN"
    ],
    "47261": [
        "MILLHOUSEN",
        "IN"
    ],
    "47263": [
        "NEW POINT",
        "IN"
    ],
    "47264": [
        "NORMAN",
        "IN"
    ],
    "47265": [
        "NORTH VERNON",
        "IN"
    ],
    "47272": [
        "SAINT PAUL",
        "IN"
    ],
    "47273": [
        "SCIPIO",
        "IN"
    ],
    "47274": [
        "SEYMOUR",
        "IN"
    ],
    "47280": [
        "TAYLORSVILLE",
        "IN"
    ],
    "47281": [
        "VALLONIA",
        "IN"
    ],
    "47282": [
        "VERNON",
        "IN"
    ],
    "47283": [
        "WESTPORT",
        "IN"
    ],
    "47302": [
        "MUNCIE",
        "IN"
    ],
    "47303": [
        "MUNCIE",
        "IN"
    ],
    "47304": [
        "MUNCIE",
        "IN"
    ],
    "47305": [
        "MUNCIE",
        "IN"
    ],
    "47306": [
        "MUNCIE",
        "IN"
    ],
    "47307": [
        "MUNCIE",
        "IN"
    ],
    "47308": [
        "MUNCIE",
        "IN"
    ],
    "47320": [
        "ALBANY",
        "IN"
    ],
    "47324": [
        "BOSTON",
        "IN"
    ],
    "47325": [
        "BROWNSVILLE",
        "IN"
    ],
    "47326": [
        "BRYANT",
        "IN"
    ],
    "47327": [
        "CAMBRIDGE CITY",
        "IN"
    ],
    "47330": [
        "CENTERVILLE",
        "IN"
    ],
    "47331": [
        "CONNERSVILLE",
        "IN"
    ],
    "47334": [
        "DALEVILLE",
        "IN"
    ],
    "47335": [
        "DUBLIN",
        "IN"
    ],
    "47336": [
        "DUNKIRK",
        "IN"
    ],
    "47337": [
        "DUNREITH",
        "IN"
    ],
    "47338": [
        "EATON",
        "IN"
    ],
    "47339": [
        "ECONOMY",
        "IN"
    ],
    "47340": [
        "FARMLAND",
        "IN"
    ],
    "47341": [
        "FOUNTAIN CITY",
        "IN"
    ],
    "47342": [
        "GASTON",
        "IN"
    ],
    "47344": [
        "GREENSBORO",
        "IN"
    ],
    "47345": [
        "GREENS FORK",
        "IN"
    ],
    "47346": [
        "HAGERSTOWN",
        "IN"
    ],
    "47348": [
        "HARTFORD CITY",
        "IN"
    ],
    "47351": [
        "KENNARD",
        "IN"
    ],
    "47352": [
        "LEWISVILLE",
        "IN"
    ],
    "47353": [
        "LIBERTY",
        "IN"
    ],
    "47354": [
        "LOSANTVILLE",
        "IN"
    ],
    "47355": [
        "LYNN",
        "IN"
    ],
    "47356": [
        "MIDDLETOWN",
        "IN"
    ],
    "47357": [
        "MILTON",
        "IN"
    ],
    "47358": [
        "MODOC",
        "IN"
    ],
    "47359": [
        "MONTPELIER",
        "IN"
    ],
    "47360": [
        "MOORELAND",
        "IN"
    ],
    "47361": [
        "MOUNT SUMMIT",
        "IN"
    ],
    "47362": [
        "NEW CASTLE",
        "IN"
    ],
    "47366": [
        "NEW LISBON",
        "IN"
    ],
    "47367": [
        "OAKVILLE",
        "IN"
    ],
    "47368": [
        "PARKER CITY",
        "IN"
    ],
    "47369": [
        "PENNVILLE",
        "IN"
    ],
    "47370": [
        "PERSHING",
        "IN"
    ],
    "47371": [
        "PORTLAND",
        "IN"
    ],
    "47373": [
        "REDKEY",
        "IN"
    ],
    "47374": [
        "RICHMOND",
        "IN"
    ],
    "47375": [
        "RICHMOND",
        "IN"
    ],
    "47380": [
        "RIDGEVILLE",
        "IN"
    ],
    "47381": [
        "SALAMONIA",
        "IN"
    ],
    "47382": [
        "SARATOGA",
        "IN"
    ],
    "47383": [
        "SELMA",
        "IN"
    ],
    "47384": [
        "SHIRLEY",
        "IN"
    ],
    "47385": [
        "SPICELAND",
        "IN"
    ],
    "47386": [
        "SPRINGPORT",
        "IN"
    ],
    "47387": [
        "STRAUGHN",
        "IN"
    ],
    "47388": [
        "SULPHUR SPRINGS",
        "IN"
    ],
    "47390": [
        "UNION CITY",
        "IN"
    ],
    "47392": [
        "WEBSTER",
        "IN"
    ],
    "47393": [
        "WILLIAMSBURG",
        "IN"
    ],
    "47394": [
        "WINCHESTER",
        "IN"
    ],
    "47396": [
        "YORKTOWN",
        "IN"
    ],
    "47401": [
        "BLOOMINGTON",
        "IN"
    ],
    "47402": [
        "BLOOMINGTON",
        "IN"
    ],
    "47403": [
        "BLOOMINGTON",
        "IN"
    ],
    "47404": [
        "BLOOMINGTON",
        "IN"
    ],
    "47405": [
        "BLOOMINGTON",
        "IN"
    ],
    "47406": [
        "BLOOMINGTON",
        "IN"
    ],
    "47407": [
        "BLOOMINGTON",
        "IN"
    ],
    "47408": [
        "BLOOMINGTON",
        "IN"
    ],
    "47420": [
        "AVOCA",
        "IN"
    ],
    "47421": [
        "BEDFORD",
        "IN"
    ],
    "47424": [
        "BLOOMFIELD",
        "IN"
    ],
    "47426": [
        "CLEAR CREEK",
        "IN"
    ],
    "47427": [
        "COAL CITY",
        "IN"
    ],
    "47429": [
        "ELLETTSVILLE",
        "IN"
    ],
    "47431": [
        "FREEDOM",
        "IN"
    ],
    "47432": [
        "FRENCH LICK",
        "IN"
    ],
    "47433": [
        "GOSPORT",
        "IN"
    ],
    "47434": [
        "HARRODSBURG",
        "IN"
    ],
    "47435": [
        "HELMSBURG",
        "IN"
    ],
    "47436": [
        "HELTONVILLE",
        "IN"
    ],
    "47437": [
        "HURON",
        "IN"
    ],
    "47438": [
        "JASONVILLE",
        "IN"
    ],
    "47441": [
        "LINTON",
        "IN"
    ],
    "47443": [
        "LYONS",
        "IN"
    ],
    "47446": [
        "MITCHELL",
        "IN"
    ],
    "47448": [
        "NASHVILLE",
        "IN"
    ],
    "47449": [
        "NEWBERRY",
        "IN"
    ],
    "47451": [
        "OOLITIC",
        "IN"
    ],
    "47452": [
        "ORLEANS",
        "IN"
    ],
    "47453": [
        "OWENSBURG",
        "IN"
    ],
    "47454": [
        "PAOLI",
        "IN"
    ],
    "47456": [
        "QUINCY",
        "IN"
    ],
    "47457": [
        "SCOTLAND",
        "IN"
    ],
    "47458": [
        "SMITHVILLE",
        "IN"
    ],
    "47459": [
        "SOLSBERRY",
        "IN"
    ],
    "47460": [
        "SPENCER",
        "IN"
    ],
    "47462": [
        "SPRINGVILLE",
        "IN"
    ],
    "47463": [
        "STANFORD",
        "IN"
    ],
    "47464": [
        "STINESVILLE",
        "IN"
    ],
    "47465": [
        "SWITZ CITY",
        "IN"
    ],
    "47467": [
        "TUNNELTON",
        "IN"
    ],
    "47468": [
        "UNIONVILLE",
        "IN"
    ],
    "47469": [
        "WEST BADEN SPRINGS",
        "IN"
    ],
    "47470": [
        "WILLIAMS",
        "IN"
    ],
    "47471": [
        "WORTHINGTON",
        "IN"
    ],
    "47501": [
        "WASHINGTON",
        "IN"
    ],
    "47512": [
        "BICKNELL",
        "IN"
    ],
    "47513": [
        "BIRDSEYE",
        "IN"
    ],
    "47514": [
        "BRANCHVILLE",
        "IN"
    ],
    "47515": [
        "BRISTOW",
        "IN"
    ],
    "47516": [
        "BRUCEVILLE",
        "IN"
    ],
    "47519": [
        "CANNELBURG",
        "IN"
    ],
    "47520": [
        "CANNELTON",
        "IN"
    ],
    "47521": [
        "CELESTINE",
        "IN"
    ],
    "47522": [
        "CRANE",
        "IN"
    ],
    "47523": [
        "DALE",
        "IN"
    ],
    "47524": [
        "DECKER",
        "IN"
    ],
    "47525": [
        "DERBY",
        "IN"
    ],
    "47527": [
        "DUBOIS",
        "IN"
    ],
    "47528": [
        "EDWARDSPORT",
        "IN"
    ],
    "47529": [
        "ELNORA",
        "IN"
    ],
    "47531": [
        "EVANSTON",
        "IN"
    ],
    "47532": [
        "FERDINAND",
        "IN"
    ],
    "47535": [
        "FREELANDVILLE",
        "IN"
    ],
    "47536": [
        "FULDA",
        "IN"
    ],
    "47537": [
        "GENTRYVILLE",
        "IN"
    ],
    "47541": [
        "HOLLAND",
        "IN"
    ],
    "47542": [
        "HUNTINGBURG",
        "IN"
    ],
    "47545": [
        "IRELAND",
        "IN"
    ],
    "47546": [
        "JASPER",
        "IN"
    ],
    "47547": [
        "JASPER",
        "IN"
    ],
    "47549": [
        "JASPER",
        "IN"
    ],
    "47550": [
        "LAMAR",
        "IN"
    ],
    "47551": [
        "LEOPOLD",
        "IN"
    ],
    "47552": [
        "LINCOLN CITY",
        "IN"
    ],
    "47553": [
        "LOOGOOTEE",
        "IN"
    ],
    "47556": [
        "MARIAH HILL",
        "IN"
    ],
    "47557": [
        "MONROE CITY",
        "IN"
    ],
    "47558": [
        "MONTGOMERY",
        "IN"
    ],
    "47561": [
        "OAKTOWN",
        "IN"
    ],
    "47562": [
        "ODON",
        "IN"
    ],
    "47564": [
        "OTWELL",
        "IN"
    ],
    "47567": [
        "PETERSBURG",
        "IN"
    ],
    "47568": [
        "PLAINVILLE",
        "IN"
    ],
    "47575": [
        "SAINT ANTHONY",
        "IN"
    ],
    "47576": [
        "SAINT CROIX",
        "IN"
    ],
    "47577": [
        "SAINT MEINRAD",
        "IN"
    ],
    "47578": [
        "SANDBORN",
        "IN"
    ],
    "47579": [
        "SANTA CLAUS",
        "IN"
    ],
    "47580": [
        "SCHNELLVILLE",
        "IN"
    ],
    "47581": [
        "SHOALS",
        "IN"
    ],
    "47584": [
        "SPURGEON",
        "IN"
    ],
    "47585": [
        "STENDAL",
        "IN"
    ],
    "47586": [
        "TELL CITY",
        "IN"
    ],
    "47588": [
        "TROY",
        "IN"
    ],
    "47590": [
        "VELPEN",
        "IN"
    ],
    "47591": [
        "VINCENNES",
        "IN"
    ],
    "47596": [
        "WESTPHALIA",
        "IN"
    ],
    "47597": [
        "WHEATLAND",
        "IN"
    ],
    "47598": [
        "WINSLOW",
        "IN"
    ],
    "47601": [
        "BOONVILLE",
        "IN"
    ],
    "47610": [
        "CHANDLER",
        "IN"
    ],
    "47611": [
        "CHRISNEY",
        "IN"
    ],
    "47612": [
        "CYNTHIANA",
        "IN"
    ],
    "47613": [
        "ELBERFELD",
        "IN"
    ],
    "47615": [
        "GRANDVIEW",
        "IN"
    ],
    "47616": [
        "GRIFFIN",
        "IN"
    ],
    "47617": [
        "HATFIELD",
        "IN"
    ],
    "47618": [
        "INGLEFIELD",
        "IN"
    ],
    "47619": [
        "LYNNVILLE",
        "IN"
    ],
    "47620": [
        "MOUNT VERNON",
        "IN"
    ],
    "47629": [
        "NEWBURGH",
        "IN"
    ],
    "47630": [
        "NEWBURGH",
        "IN"
    ],
    "47631": [
        "NEW HARMONY",
        "IN"
    ],
    "47633": [
        "POSEYVILLE",
        "IN"
    ],
    "47634": [
        "RICHLAND",
        "IN"
    ],
    "47635": [
        "ROCKPORT",
        "IN"
    ],
    "47637": [
        "TENNYSON",
        "IN"
    ],
    "47638": [
        "WADESVILLE",
        "IN"
    ],
    "47639": [
        "HAUBSTADT",
        "IN"
    ],
    "47640": [
        "HAZLETON",
        "IN"
    ],
    "47647": [
        "BUCKSKIN",
        "IN"
    ],
    "47648": [
        "FORT BRANCH",
        "IN"
    ],
    "47649": [
        "FRANCISCO",
        "IN"
    ],
    "47654": [
        "MACKEY",
        "IN"
    ],
    "47660": [
        "OAKLAND CITY",
        "IN"
    ],
    "47665": [
        "OWENSVILLE",
        "IN"
    ],
    "47666": [
        "PATOKA",
        "IN"
    ],
    "47670": [
        "PRINCETON",
        "IN"
    ],
    "47683": [
        "SOMERVILLE",
        "IN"
    ],
    "47701": [
        "EVANSVILLE",
        "IN"
    ],
    "47702": [
        "EVANSVILLE",
        "IN"
    ],
    "47703": [
        "EVANSVILLE",
        "IN"
    ],
    "47704": [
        "EVANSVILLE",
        "IN"
    ],
    "47705": [
        "EVANSVILLE",
        "IN"
    ],
    "47706": [
        "EVANSVILLE",
        "IN"
    ],
    "47708": [
        "EVANSVILLE",
        "IN"
    ],
    "47710": [
        "EVANSVILLE",
        "IN"
    ],
    "47711": [
        "EVANSVILLE",
        "IN"
    ],
    "47712": [
        "EVANSVILLE",
        "IN"
    ],
    "47713": [
        "EVANSVILLE",
        "IN"
    ],
    "47714": [
        "EVANSVILLE",
        "IN"
    ],
    "47715": [
        "EVANSVILLE",
        "IN"
    ],
    "47716": [
        "EVANSVILLE",
        "IN"
    ],
    "47719": [
        "EVANSVILLE",
        "IN"
    ],
    "47720": [
        "EVANSVILLE",
        "IN"
    ],
    "47721": [
        "EVANSVILLE",
        "IN"
    ],
    "47722": [
        "EVANSVILLE",
        "IN"
    ],
    "47724": [
        "EVANSVILLE",
        "IN"
    ],
    "47725": [
        "EVANSVILLE",
        "IN"
    ],
    "47728": [
        "EVANSVILLE",
        "IN"
    ],
    "47730": [
        "EVANSVILLE",
        "IN"
    ],
    "47733": [
        "EVANSVILLE",
        "IN"
    ],
    "47734": [
        "EVANSVILLE",
        "IN"
    ],
    "47735": [
        "EVANSVILLE",
        "IN"
    ],
    "47736": [
        "EVANSVILLE",
        "IN"
    ],
    "47737": [
        "EVANSVILLE",
        "IN"
    ],
    "47747": [
        "EVANSVILLE",
        "IN"
    ],
    "47750": [
        "EVANSVILLE",
        "IN"
    ],
    "47801": [
        "TERRE HAUTE",
        "IN"
    ],
    "47802": [
        "TERRE HAUTE",
        "IN"
    ],
    "47803": [
        "TERRE HAUTE",
        "IN"
    ],
    "47804": [
        "TERRE HAUTE",
        "IN"
    ],
    "47805": [
        "TERRE HAUTE",
        "IN"
    ],
    "47807": [
        "TERRE HAUTE",
        "IN"
    ],
    "47808": [
        "TERRE HAUTE",
        "IN"
    ],
    "47809": [
        "TERRE HAUTE",
        "IN"
    ],
    "47831": [
        "BLANFORD",
        "IN"
    ],
    "47832": [
        "BLOOMINGDALE",
        "IN"
    ],
    "47833": [
        "BOWLING GREEN",
        "IN"
    ],
    "47834": [
        "BRAZIL",
        "IN"
    ],
    "47836": [
        "BRIDGETON",
        "IN"
    ],
    "47837": [
        "CARBON",
        "IN"
    ],
    "47838": [
        "CARLISLE",
        "IN"
    ],
    "47840": [
        "CENTERPOINT",
        "IN"
    ],
    "47841": [
        "CLAY CITY",
        "IN"
    ],
    "47842": [
        "CLINTON",
        "IN"
    ],
    "47845": [
        "COALMONT",
        "IN"
    ],
    "47846": [
        "CORY",
        "IN"
    ],
    "47847": [
        "DANA",
        "IN"
    ],
    "47848": [
        "DUGGER",
        "IN"
    ],
    "47849": [
        "FAIRBANKS",
        "IN"
    ],
    "47850": [
        "FARMERSBURG",
        "IN"
    ],
    "47851": [
        "FONTANET",
        "IN"
    ],
    "47852": [
        "GRAYSVILLE",
        "IN"
    ],
    "47853": [
        "HARMONY",
        "IN"
    ],
    "47854": [
        "HILLSDALE",
        "IN"
    ],
    "47855": [
        "HYMERA",
        "IN"
    ],
    "47857": [
        "KNIGHTSVILLE",
        "IN"
    ],
    "47858": [
        "LEWIS",
        "IN"
    ],
    "47859": [
        "MARSHALL",
        "IN"
    ],
    "47860": [
        "MECCA",
        "IN"
    ],
    "47861": [
        "MEROM",
        "IN"
    ],
    "47862": [
        "MONTEZUMA",
        "IN"
    ],
    "47866": [
        "PIMENTO",
        "IN"
    ],
    "47868": [
        "POLAND",
        "IN"
    ],
    "47869": [
        "PRAIRIE CREEK",
        "IN"
    ],
    "47870": [
        "PRAIRIETON",
        "IN"
    ],
    "47871": [
        "RILEY",
        "IN"
    ],
    "47872": [
        "ROCKVILLE",
        "IN"
    ],
    "47874": [
        "ROSEDALE",
        "IN"
    ],
    "47875": [
        "SAINT BERNICE",
        "IN"
    ],
    "47876": [
        "SAINT MARY OF THE WOODS",
        "IN"
    ],
    "47878": [
        "SEELYVILLE",
        "IN"
    ],
    "47879": [
        "SHELBURN",
        "IN"
    ],
    "47881": [
        "STAUNTON",
        "IN"
    ],
    "47882": [
        "SULLIVAN",
        "IN"
    ],
    "47884": [
        "UNIVERSAL",
        "IN"
    ],
    "47885": [
        "WEST TERRE HAUTE",
        "IN"
    ],
    "47901": [
        "LAFAYETTE",
        "IN"
    ],
    "47902": [
        "LAFAYETTE",
        "IN"
    ],
    "47903": [
        "LAFAYETTE",
        "IN"
    ],
    "47904": [
        "LAFAYETTE",
        "IN"
    ],
    "47905": [
        "LAFAYETTE",
        "IN"
    ],
    "47906": [
        "WEST LAFAYETTE",
        "IN"
    ],
    "47907": [
        "WEST LAFAYETTE",
        "IN"
    ],
    "47909": [
        "LAFAYETTE",
        "IN"
    ],
    "47917": [
        "AMBIA",
        "IN"
    ],
    "47918": [
        "ATTICA",
        "IN"
    ],
    "47920": [
        "BATTLE GROUND",
        "IN"
    ],
    "47921": [
        "BOSWELL",
        "IN"
    ],
    "47922": [
        "BROOK",
        "IN"
    ],
    "47923": [
        "BROOKSTON",
        "IN"
    ],
    "47924": [
        "BUCK CREEK",
        "IN"
    ],
    "47925": [
        "BUFFALO",
        "IN"
    ],
    "47926": [
        "BURNETTSVILLE",
        "IN"
    ],
    "47928": [
        "CAYUGA",
        "IN"
    ],
    "47929": [
        "CHALMERS",
        "IN"
    ],
    "47930": [
        "CLARKS HILL",
        "IN"
    ],
    "47932": [
        "COVINGTON",
        "IN"
    ],
    "47933": [
        "CRAWFORDSVILLE",
        "IN"
    ],
    "47940": [
        "DARLINGTON",
        "IN"
    ],
    "47941": [
        "DAYTON",
        "IN"
    ],
    "47942": [
        "EARL PARK",
        "IN"
    ],
    "47943": [
        "FAIR OAKS",
        "IN"
    ],
    "47944": [
        "FOWLER",
        "IN"
    ],
    "47946": [
        "FRANCESVILLE",
        "IN"
    ],
    "47948": [
        "GOODLAND",
        "IN"
    ],
    "47949": [
        "HILLSBORO",
        "IN"
    ],
    "47950": [
        "IDAVILLE",
        "IN"
    ],
    "47951": [
        "KENTLAND",
        "IN"
    ],
    "47952": [
        "KINGMAN",
        "IN"
    ],
    "47954": [
        "LADOGA",
        "IN"
    ],
    "47955": [
        "LINDEN",
        "IN"
    ],
    "47957": [
        "MEDARYVILLE",
        "IN"
    ],
    "47958": [
        "MELLOTT",
        "IN"
    ],
    "47959": [
        "MONON",
        "IN"
    ],
    "47960": [
        "MONTICELLO",
        "IN"
    ],
    "47962": [
        "MONTMORENCI",
        "IN"
    ],
    "47963": [
        "MOROCCO",
        "IN"
    ],
    "47965": [
        "NEW MARKET",
        "IN"
    ],
    "47966": [
        "NEWPORT",
        "IN"
    ],
    "47967": [
        "NEW RICHMOND",
        "IN"
    ],
    "47968": [
        "NEW ROSS",
        "IN"
    ],
    "47969": [
        "NEWTOWN",
        "IN"
    ],
    "47970": [
        "OTTERBEIN",
        "IN"
    ],
    "47971": [
        "OXFORD",
        "IN"
    ],
    "47974": [
        "PERRYSVILLE",
        "IN"
    ],
    "47975": [
        "PINE VILLAGE",
        "IN"
    ],
    "47977": [
        "REMINGTON",
        "IN"
    ],
    "47978": [
        "RENSSELAER",
        "IN"
    ],
    "47980": [
        "REYNOLDS",
        "IN"
    ],
    "47981": [
        "ROMNEY",
        "IN"
    ],
    "47982": [
        "STATE LINE",
        "IN"
    ],
    "47983": [
        "STOCKWELL",
        "IN"
    ],
    "47986": [
        "TEMPLETON",
        "IN"
    ],
    "47987": [
        "VEEDERSBURG",
        "IN"
    ],
    "47988": [
        "WALLACE",
        "IN"
    ],
    "47989": [
        "WAVELAND",
        "IN"
    ],
    "47990": [
        "WAYNETOWN",
        "IN"
    ],
    "47991": [
        "WEST LEBANON",
        "IN"
    ],
    "47992": [
        "WESTPOINT",
        "IN"
    ],
    "47993": [
        "WILLIAMSPORT",
        "IN"
    ],
    "47994": [
        "WINGATE",
        "IN"
    ],
    "47995": [
        "WOLCOTT",
        "IN"
    ],
    "47996": [
        "WEST LAFAYETTE",
        "IN"
    ],
    "47997": [
        "YEOMAN",
        "IN"
    ],
    "48001": [
        "ALGONAC",
        "MI"
    ],
    "48002": [
        "ALLENTON",
        "MI"
    ],
    "48003": [
        "ALMONT",
        "MI"
    ],
    "48004": [
        "ANCHORVILLE",
        "MI"
    ],
    "48005": [
        "ARMADA",
        "MI"
    ],
    "48006": [
        "AVOCA",
        "MI"
    ],
    "48007": [
        "TROY",
        "MI"
    ],
    "48009": [
        "BIRMINGHAM",
        "MI"
    ],
    "48012": [
        "BIRMINGHAM",
        "MI"
    ],
    "48014": [
        "CAPAC",
        "MI"
    ],
    "48015": [
        "CENTER LINE",
        "MI"
    ],
    "48017": [
        "CLAWSON",
        "MI"
    ],
    "48021": [
        "EASTPOINTE",
        "MI"
    ],
    "48022": [
        "EMMETT",
        "MI"
    ],
    "48023": [
        "FAIR HAVEN",
        "MI"
    ],
    "48025": [
        "FRANKLIN",
        "MI"
    ],
    "48026": [
        "FRASER",
        "MI"
    ],
    "48027": [
        "GOODELLS",
        "MI"
    ],
    "48028": [
        "HARSENS ISLAND",
        "MI"
    ],
    "48030": [
        "HAZEL PARK",
        "MI"
    ],
    "48032": [
        "JEDDO",
        "MI"
    ],
    "48033": [
        "SOUTHFIELD",
        "MI"
    ],
    "48034": [
        "SOUTHFIELD",
        "MI"
    ],
    "48035": [
        "CLINTON TOWNSHIP",
        "MI"
    ],
    "48036": [
        "CLINTON TOWNSHIP",
        "MI"
    ],
    "48037": [
        "SOUTHFIELD",
        "MI"
    ],
    "48038": [
        "CLINTON TOWNSHIP",
        "MI"
    ],
    "48039": [
        "MARINE CITY",
        "MI"
    ],
    "48040": [
        "MARYSVILLE",
        "MI"
    ],
    "48041": [
        "MEMPHIS",
        "MI"
    ],
    "48042": [
        "MACOMB",
        "MI"
    ],
    "48043": [
        "MOUNT CLEMENS",
        "MI"
    ],
    "48044": [
        "MACOMB",
        "MI"
    ],
    "48045": [
        "HARRISON TOWNSHIP",
        "MI"
    ],
    "48046": [
        "MOUNT CLEMENS",
        "MI"
    ],
    "48047": [
        "NEW BALTIMORE",
        "MI"
    ],
    "48048": [
        "NEW HAVEN",
        "MI"
    ],
    "48049": [
        "NORTH STREET",
        "MI"
    ],
    "48050": [
        "NEW HAVEN",
        "MI"
    ],
    "48051": [
        "NEW BALTIMORE",
        "MI"
    ],
    "48054": [
        "EAST CHINA",
        "MI"
    ],
    "48059": [
        "FORT GRATIOT",
        "MI"
    ],
    "48060": [
        "PORT HURON",
        "MI"
    ],
    "48061": [
        "PORT HURON",
        "MI"
    ],
    "48062": [
        "RICHMOND",
        "MI"
    ],
    "48063": [
        "COLUMBUS",
        "MI"
    ],
    "48064": [
        "CASCO",
        "MI"
    ],
    "48065": [
        "ROMEO",
        "MI"
    ],
    "48066": [
        "ROSEVILLE",
        "MI"
    ],
    "48067": [
        "ROYAL OAK",
        "MI"
    ],
    "48068": [
        "ROYAL OAK",
        "MI"
    ],
    "48069": [
        "PLEASANT RIDGE",
        "MI"
    ],
    "48070": [
        "HUNTINGTON WOODS",
        "MI"
    ],
    "48071": [
        "MADISON HEIGHTS",
        "MI"
    ],
    "48072": [
        "BERKLEY",
        "MI"
    ],
    "48073": [
        "ROYAL OAK",
        "MI"
    ],
    "48074": [
        "SMITHS CREEK",
        "MI"
    ],
    "48075": [
        "SOUTHFIELD",
        "MI"
    ],
    "48076": [
        "SOUTHFIELD",
        "MI"
    ],
    "48079": [
        "SAINT CLAIR",
        "MI"
    ],
    "48080": [
        "SAINT CLAIR SHORES",
        "MI"
    ],
    "48081": [
        "SAINT CLAIR SHORES",
        "MI"
    ],
    "48082": [
        "SAINT CLAIR SHORES",
        "MI"
    ],
    "48083": [
        "TROY",
        "MI"
    ],
    "48084": [
        "TROY",
        "MI"
    ],
    "48085": [
        "TROY",
        "MI"
    ],
    "48086": [
        "SOUTHFIELD",
        "MI"
    ],
    "48088": [
        "WARREN",
        "MI"
    ],
    "48089": [
        "WARREN",
        "MI"
    ],
    "48090": [
        "WARREN",
        "MI"
    ],
    "48091": [
        "WARREN",
        "MI"
    ],
    "48092": [
        "WARREN",
        "MI"
    ],
    "48093": [
        "WARREN",
        "MI"
    ],
    "48094": [
        "WASHINGTON",
        "MI"
    ],
    "48095": [
        "WASHINGTON",
        "MI"
    ],
    "48096": [
        "RAY",
        "MI"
    ],
    "48097": [
        "YALE",
        "MI"
    ],
    "48098": [
        "TROY",
        "MI"
    ],
    "48099": [
        "TROY",
        "MI"
    ],
    "48101": [
        "ALLEN PARK",
        "MI"
    ],
    "48103": [
        "ANN ARBOR",
        "MI"
    ],
    "48104": [
        "ANN ARBOR",
        "MI"
    ],
    "48105": [
        "ANN ARBOR",
        "MI"
    ],
    "48106": [
        "ANN ARBOR",
        "MI"
    ],
    "48107": [
        "ANN ARBOR",
        "MI"
    ],
    "48108": [
        "ANN ARBOR",
        "MI"
    ],
    "48109": [
        "ANN ARBOR",
        "MI"
    ],
    "48110": [
        "AZALIA",
        "MI"
    ],
    "48111": [
        "BELLEVILLE",
        "MI"
    ],
    "48112": [
        "BELLEVILLE",
        "MI"
    ],
    "48113": [
        "ANN ARBOR",
        "MI"
    ],
    "48114": [
        "BRIGHTON",
        "MI"
    ],
    "48115": [
        "BRIDGEWATER",
        "MI"
    ],
    "48116": [
        "BRIGHTON",
        "MI"
    ],
    "48117": [
        "CARLETON",
        "MI"
    ],
    "48118": [
        "CHELSEA",
        "MI"
    ],
    "48120": [
        "DEARBORN",
        "MI"
    ],
    "48121": [
        "DEARBORN",
        "MI"
    ],
    "48122": [
        "MELVINDALE",
        "MI"
    ],
    "48123": [
        "DEARBORN",
        "MI"
    ],
    "48124": [
        "DEARBORN",
        "MI"
    ],
    "48125": [
        "DEARBORN HEIGHTS",
        "MI"
    ],
    "48126": [
        "DEARBORN",
        "MI"
    ],
    "48127": [
        "DEARBORN HEIGHTS",
        "MI"
    ],
    "48128": [
        "DEARBORN",
        "MI"
    ],
    "48130": [
        "DEXTER",
        "MI"
    ],
    "48131": [
        "DUNDEE",
        "MI"
    ],
    "48133": [
        "ERIE",
        "MI"
    ],
    "48134": [
        "FLAT ROCK",
        "MI"
    ],
    "48135": [
        "GARDEN CITY",
        "MI"
    ],
    "48136": [
        "GARDEN CITY",
        "MI"
    ],
    "48137": [
        "GREGORY",
        "MI"
    ],
    "48138": [
        "GROSSE ILE",
        "MI"
    ],
    "48139": [
        "HAMBURG",
        "MI"
    ],
    "48140": [
        "IDA",
        "MI"
    ],
    "48141": [
        "INKSTER",
        "MI"
    ],
    "48143": [
        "LAKELAND",
        "MI"
    ],
    "48144": [
        "LAMBERTVILLE",
        "MI"
    ],
    "48145": [
        "LA SALLE",
        "MI"
    ],
    "48146": [
        "LINCOLN PARK",
        "MI"
    ],
    "48150": [
        "LIVONIA",
        "MI"
    ],
    "48151": [
        "LIVONIA",
        "MI"
    ],
    "48152": [
        "LIVONIA",
        "MI"
    ],
    "48153": [
        "LIVONIA",
        "MI"
    ],
    "48154": [
        "LIVONIA",
        "MI"
    ],
    "48157": [
        "LUNA PIER",
        "MI"
    ],
    "48158": [
        "MANCHESTER",
        "MI"
    ],
    "48159": [
        "MAYBEE",
        "MI"
    ],
    "48160": [
        "MILAN",
        "MI"
    ],
    "48161": [
        "MONROE",
        "MI"
    ],
    "48162": [
        "MONROE",
        "MI"
    ],
    "48164": [
        "NEW BOSTON",
        "MI"
    ],
    "48165": [
        "NEW HUDSON",
        "MI"
    ],
    "48166": [
        "NEWPORT",
        "MI"
    ],
    "48167": [
        "NORTHVILLE",
        "MI"
    ],
    "48168": [
        "NORTHVILLE",
        "MI"
    ],
    "48169": [
        "PINCKNEY",
        "MI"
    ],
    "48170": [
        "PLYMOUTH",
        "MI"
    ],
    "48173": [
        "ROCKWOOD",
        "MI"
    ],
    "48174": [
        "ROMULUS",
        "MI"
    ],
    "48175": [
        "SALEM",
        "MI"
    ],
    "48176": [
        "SALINE",
        "MI"
    ],
    "48177": [
        "SAMARIA",
        "MI"
    ],
    "48178": [
        "SOUTH LYON",
        "MI"
    ],
    "48179": [
        "SOUTH ROCKWOOD",
        "MI"
    ],
    "48180": [
        "TAYLOR",
        "MI"
    ],
    "48182": [
        "TEMPERANCE",
        "MI"
    ],
    "48183": [
        "TRENTON",
        "MI"
    ],
    "48184": [
        "WAYNE",
        "MI"
    ],
    "48185": [
        "WESTLAND",
        "MI"
    ],
    "48186": [
        "WESTLAND",
        "MI"
    ],
    "48187": [
        "CANTON",
        "MI"
    ],
    "48188": [
        "CANTON",
        "MI"
    ],
    "48189": [
        "WHITMORE LAKE",
        "MI"
    ],
    "48190": [
        "WHITTAKER",
        "MI"
    ],
    "48191": [
        "WILLIS",
        "MI"
    ],
    "48192": [
        "WYANDOTTE",
        "MI"
    ],
    "48193": [
        "RIVERVIEW",
        "MI"
    ],
    "48195": [
        "SOUTHGATE",
        "MI"
    ],
    "48197": [
        "YPSILANTI",
        "MI"
    ],
    "48198": [
        "YPSILANTI",
        "MI"
    ],
    "48201": [
        "DETROIT",
        "MI"
    ],
    "48202": [
        "DETROIT",
        "MI"
    ],
    "48203": [
        "HIGHLAND PARK",
        "MI"
    ],
    "48204": [
        "DETROIT",
        "MI"
    ],
    "48205": [
        "DETROIT",
        "MI"
    ],
    "48206": [
        "DETROIT",
        "MI"
    ],
    "48207": [
        "DETROIT",
        "MI"
    ],
    "48208": [
        "DETROIT",
        "MI"
    ],
    "48209": [
        "DETROIT",
        "MI"
    ],
    "48210": [
        "DETROIT",
        "MI"
    ],
    "48211": [
        "DETROIT",
        "MI"
    ],
    "48212": [
        "HAMTRAMCK",
        "MI"
    ],
    "48213": [
        "DETROIT",
        "MI"
    ],
    "48214": [
        "DETROIT",
        "MI"
    ],
    "48215": [
        "DETROIT",
        "MI"
    ],
    "48216": [
        "DETROIT",
        "MI"
    ],
    "48217": [
        "DETROIT",
        "MI"
    ],
    "48218": [
        "RIVER ROUGE",
        "MI"
    ],
    "48219": [
        "DETROIT",
        "MI"
    ],
    "48220": [
        "FERNDALE",
        "MI"
    ],
    "48221": [
        "DETROIT",
        "MI"
    ],
    "48222": [
        "DETROIT",
        "MI"
    ],
    "48223": [
        "DETROIT",
        "MI"
    ],
    "48224": [
        "DETROIT",
        "MI"
    ],
    "48225": [
        "HARPER WOODS",
        "MI"
    ],
    "48226": [
        "DETROIT",
        "MI"
    ],
    "48227": [
        "DETROIT",
        "MI"
    ],
    "48228": [
        "DETROIT",
        "MI"
    ],
    "48229": [
        "ECORSE",
        "MI"
    ],
    "48230": [
        "GROSSE POINTE",
        "MI"
    ],
    "48231": [
        "DETROIT",
        "MI"
    ],
    "48232": [
        "DETROIT",
        "MI"
    ],
    "48233": [
        "DETROIT",
        "MI"
    ],
    "48234": [
        "DETROIT",
        "MI"
    ],
    "48235": [
        "DETROIT",
        "MI"
    ],
    "48236": [
        "GROSSE POINTE",
        "MI"
    ],
    "48237": [
        "OAK PARK",
        "MI"
    ],
    "48238": [
        "DETROIT",
        "MI"
    ],
    "48239": [
        "REDFORD",
        "MI"
    ],
    "48240": [
        "REDFORD",
        "MI"
    ],
    "48242": [
        "DETROIT",
        "MI"
    ],
    "48243": [
        "DETROIT",
        "MI"
    ],
    "48244": [
        "DETROIT",
        "MI"
    ],
    "48255": [
        "DETROIT",
        "MI"
    ],
    "48264": [
        "DETROIT",
        "MI"
    ],
    "48265": [
        "DETROIT",
        "MI"
    ],
    "48267": [
        "DETROIT",
        "MI"
    ],
    "48268": [
        "DETROIT",
        "MI"
    ],
    "48275": [
        "DETROIT",
        "MI"
    ],
    "48277": [
        "DETROIT",
        "MI"
    ],
    "48301": [
        "BLOOMFIELD HILLS",
        "MI"
    ],
    "48302": [
        "BLOOMFIELD HILLS",
        "MI"
    ],
    "48303": [
        "BLOOMFIELD HILLS",
        "MI"
    ],
    "48304": [
        "BLOOMFIELD HILLS",
        "MI"
    ],
    "48306": [
        "ROCHESTER",
        "MI"
    ],
    "48307": [
        "ROCHESTER",
        "MI"
    ],
    "48308": [
        "ROCHESTER",
        "MI"
    ],
    "48309": [
        "ROCHESTER",
        "MI"
    ],
    "48310": [
        "STERLING HEIGHTS",
        "MI"
    ],
    "48311": [
        "STERLING HEIGHTS",
        "MI"
    ],
    "48312": [
        "STERLING HEIGHTS",
        "MI"
    ],
    "48313": [
        "STERLING HEIGHTS",
        "MI"
    ],
    "48314": [
        "STERLING HEIGHTS",
        "MI"
    ],
    "48315": [
        "UTICA",
        "MI"
    ],
    "48316": [
        "UTICA",
        "MI"
    ],
    "48317": [
        "UTICA",
        "MI"
    ],
    "48318": [
        "UTICA",
        "MI"
    ],
    "48320": [
        "KEEGO HARBOR",
        "MI"
    ],
    "48321": [
        "AUBURN HILLS",
        "MI"
    ],
    "48322": [
        "WEST BLOOMFIELD",
        "MI"
    ],
    "48323": [
        "WEST BLOOMFIELD",
        "MI"
    ],
    "48324": [
        "WEST BLOOMFIELD",
        "MI"
    ],
    "48325": [
        "WEST BLOOMFIELD",
        "MI"
    ],
    "48326": [
        "AUBURN HILLS",
        "MI"
    ],
    "48327": [
        "WATERFORD",
        "MI"
    ],
    "48328": [
        "WATERFORD",
        "MI"
    ],
    "48329": [
        "WATERFORD",
        "MI"
    ],
    "48330": [
        "DRAYTON PLAINS",
        "MI"
    ],
    "48331": [
        "FARMINGTON",
        "MI"
    ],
    "48332": [
        "FARMINGTON",
        "MI"
    ],
    "48333": [
        "FARMINGTON",
        "MI"
    ],
    "48334": [
        "FARMINGTON",
        "MI"
    ],
    "48335": [
        "FARMINGTON",
        "MI"
    ],
    "48336": [
        "FARMINGTON",
        "MI"
    ],
    "48340": [
        "PONTIAC",
        "MI"
    ],
    "48341": [
        "PONTIAC",
        "MI"
    ],
    "48342": [
        "PONTIAC",
        "MI"
    ],
    "48343": [
        "PONTIAC",
        "MI"
    ],
    "48346": [
        "CLARKSTON",
        "MI"
    ],
    "48347": [
        "CLARKSTON",
        "MI"
    ],
    "48348": [
        "CLARKSTON",
        "MI"
    ],
    "48350": [
        "DAVISBURG",
        "MI"
    ],
    "48353": [
        "HARTLAND",
        "MI"
    ],
    "48356": [
        "HIGHLAND",
        "MI"
    ],
    "48357": [
        "HIGHLAND",
        "MI"
    ],
    "48359": [
        "LAKE ORION",
        "MI"
    ],
    "48360": [
        "LAKE ORION",
        "MI"
    ],
    "48361": [
        "LAKE ORION",
        "MI"
    ],
    "48362": [
        "LAKE ORION",
        "MI"
    ],
    "48363": [
        "OAKLAND",
        "MI"
    ],
    "48366": [
        "LAKEVILLE",
        "MI"
    ],
    "48367": [
        "LEONARD",
        "MI"
    ],
    "48370": [
        "OXFORD",
        "MI"
    ],
    "48371": [
        "OXFORD",
        "MI"
    ],
    "48374": [
        "NOVI",
        "MI"
    ],
    "48375": [
        "NOVI",
        "MI"
    ],
    "48376": [
        "NOVI",
        "MI"
    ],
    "48377": [
        "NOVI",
        "MI"
    ],
    "48380": [
        "MILFORD",
        "MI"
    ],
    "48381": [
        "MILFORD",
        "MI"
    ],
    "48382": [
        "COMMERCE TOWNSHIP",
        "MI"
    ],
    "48383": [
        "WHITE LAKE",
        "MI"
    ],
    "48386": [
        "WHITE LAKE",
        "MI"
    ],
    "48387": [
        "UNION LAKE",
        "MI"
    ],
    "48390": [
        "WALLED LAKE",
        "MI"
    ],
    "48393": [
        "WIXOM",
        "MI"
    ],
    "48397": [
        "WARREN",
        "MI"
    ],
    "48401": [
        "APPLEGATE",
        "MI"
    ],
    "48410": [
        "ARGYLE",
        "MI"
    ],
    "48411": [
        "ATLAS",
        "MI"
    ],
    "48412": [
        "ATTICA",
        "MI"
    ],
    "48413": [
        "BAD AXE",
        "MI"
    ],
    "48414": [
        "BANCROFT",
        "MI"
    ],
    "48415": [
        "BIRCH RUN",
        "MI"
    ],
    "48416": [
        "BROWN CITY",
        "MI"
    ],
    "48417": [
        "BURT",
        "MI"
    ],
    "48418": [
        "BYRON",
        "MI"
    ],
    "48419": [
        "CARSONVILLE",
        "MI"
    ],
    "48420": [
        "CLIO",
        "MI"
    ],
    "48421": [
        "COLUMBIAVILLE",
        "MI"
    ],
    "48422": [
        "CROSWELL",
        "MI"
    ],
    "48423": [
        "DAVISON",
        "MI"
    ],
    "48426": [
        "DECKER",
        "MI"
    ],
    "48427": [
        "DECKERVILLE",
        "MI"
    ],
    "48428": [
        "DRYDEN",
        "MI"
    ],
    "48429": [
        "DURAND",
        "MI"
    ],
    "48430": [
        "FENTON",
        "MI"
    ],
    "48432": [
        "FILION",
        "MI"
    ],
    "48433": [
        "FLUSHING",
        "MI"
    ],
    "48434": [
        "FORESTVILLE",
        "MI"
    ],
    "48435": [
        "FOSTORIA",
        "MI"
    ],
    "48436": [
        "GAINES",
        "MI"
    ],
    "48437": [
        "GENESEE",
        "MI"
    ],
    "48438": [
        "GOODRICH",
        "MI"
    ],
    "48439": [
        "GRAND BLANC",
        "MI"
    ],
    "48440": [
        "HADLEY",
        "MI"
    ],
    "48441": [
        "HARBOR BEACH",
        "MI"
    ],
    "48442": [
        "HOLLY",
        "MI"
    ],
    "48444": [
        "IMLAY CITY",
        "MI"
    ],
    "48445": [
        "KINDE",
        "MI"
    ],
    "48446": [
        "LAPEER",
        "MI"
    ],
    "48449": [
        "LENNON",
        "MI"
    ],
    "48450": [
        "LEXINGTON",
        "MI"
    ],
    "48451": [
        "LINDEN",
        "MI"
    ],
    "48453": [
        "MARLETTE",
        "MI"
    ],
    "48454": [
        "MELVIN",
        "MI"
    ],
    "48455": [
        "METAMORA",
        "MI"
    ],
    "48456": [
        "MINDEN CITY",
        "MI"
    ],
    "48457": [
        "MONTROSE",
        "MI"
    ],
    "48458": [
        "MOUNT MORRIS",
        "MI"
    ],
    "48460": [
        "NEW LOTHROP",
        "MI"
    ],
    "48461": [
        "NORTH BRANCH",
        "MI"
    ],
    "48462": [
        "ORTONVILLE",
        "MI"
    ],
    "48463": [
        "OTISVILLE",
        "MI"
    ],
    "48464": [
        "OTTER LAKE",
        "MI"
    ],
    "48465": [
        "PALMS",
        "MI"
    ],
    "48466": [
        "PECK",
        "MI"
    ],
    "48467": [
        "PORT AUSTIN",
        "MI"
    ],
    "48468": [
        "PORT HOPE",
        "MI"
    ],
    "48469": [
        "PORT SANILAC",
        "MI"
    ],
    "48470": [
        "RUTH",
        "MI"
    ],
    "48471": [
        "SANDUSKY",
        "MI"
    ],
    "48472": [
        "SNOVER",
        "MI"
    ],
    "48473": [
        "SWARTZ CREEK",
        "MI"
    ],
    "48475": [
        "UBLY",
        "MI"
    ],
    "48476": [
        "VERNON",
        "MI"
    ],
    "48480": [
        "GRAND BLANC",
        "MI"
    ],
    "48501": [
        "FLINT",
        "MI"
    ],
    "48502": [
        "FLINT",
        "MI"
    ],
    "48503": [
        "FLINT",
        "MI"
    ],
    "48504": [
        "FLINT",
        "MI"
    ],
    "48505": [
        "FLINT",
        "MI"
    ],
    "48506": [
        "FLINT",
        "MI"
    ],
    "48507": [
        "FLINT",
        "MI"
    ],
    "48509": [
        "BURTON",
        "MI"
    ],
    "48519": [
        "BURTON",
        "MI"
    ],
    "48529": [
        "BURTON",
        "MI"
    ],
    "48531": [
        "FLINT",
        "MI"
    ],
    "48532": [
        "FLINT",
        "MI"
    ],
    "48551": [
        "FLINT",
        "MI"
    ],
    "48552": [
        "FLINT",
        "MI"
    ],
    "48553": [
        "FLINT",
        "MI"
    ],
    "48554": [
        "FLINT",
        "MI"
    ],
    "48556": [
        "FLINT",
        "MI"
    ],
    "48601": [
        "SAGINAW",
        "MI"
    ],
    "48602": [
        "SAGINAW",
        "MI"
    ],
    "48603": [
        "SAGINAW",
        "MI"
    ],
    "48604": [
        "SAGINAW",
        "MI"
    ],
    "48605": [
        "SAGINAW",
        "MI"
    ],
    "48606": [
        "SAGINAW",
        "MI"
    ],
    "48607": [
        "SAGINAW",
        "MI"
    ],
    "48608": [
        "SAGINAW",
        "MI"
    ],
    "48609": [
        "SAGINAW",
        "MI"
    ],
    "48610": [
        "ALGER",
        "MI"
    ],
    "48611": [
        "AUBURN",
        "MI"
    ],
    "48612": [
        "BEAVERTON",
        "MI"
    ],
    "48613": [
        "BENTLEY",
        "MI"
    ],
    "48614": [
        "BRANT",
        "MI"
    ],
    "48615": [
        "BRECKENRIDGE",
        "MI"
    ],
    "48616": [
        "CHESANING",
        "MI"
    ],
    "48617": [
        "CLARE",
        "MI"
    ],
    "48618": [
        "COLEMAN",
        "MI"
    ],
    "48619": [
        "COMINS",
        "MI"
    ],
    "48620": [
        "EDENVILLE",
        "MI"
    ],
    "48621": [
        "FAIRVIEW",
        "MI"
    ],
    "48622": [
        "FARWELL",
        "MI"
    ],
    "48623": [
        "FREELAND",
        "MI"
    ],
    "48624": [
        "GLADWIN",
        "MI"
    ],
    "48625": [
        "HARRISON",
        "MI"
    ],
    "48626": [
        "HEMLOCK",
        "MI"
    ],
    "48627": [
        "HIGGINS LAKE",
        "MI"
    ],
    "48628": [
        "HOPE",
        "MI"
    ],
    "48629": [
        "HOUGHTON LAKE",
        "MI"
    ],
    "48630": [
        "HOUGHTON LAKE HEIGHTS",
        "MI"
    ],
    "48631": [
        "KAWKAWLIN",
        "MI"
    ],
    "48632": [
        "LAKE",
        "MI"
    ],
    "48633": [
        "LAKE GEORGE",
        "MI"
    ],
    "48634": [
        "LINWOOD",
        "MI"
    ],
    "48635": [
        "LUPTON",
        "MI"
    ],
    "48636": [
        "LUZERNE",
        "MI"
    ],
    "48637": [
        "MERRILL",
        "MI"
    ],
    "48638": [
        "SAGINAW",
        "MI"
    ],
    "48640": [
        "MIDLAND",
        "MI"
    ],
    "48641": [
        "MIDLAND",
        "MI"
    ],
    "48642": [
        "MIDLAND",
        "MI"
    ],
    "48647": [
        "MIO",
        "MI"
    ],
    "48649": [
        "OAKLEY",
        "MI"
    ],
    "48650": [
        "PINCONNING",
        "MI"
    ],
    "48651": [
        "PRUDENVILLE",
        "MI"
    ],
    "48652": [
        "RHODES",
        "MI"
    ],
    "48653": [
        "ROSCOMMON",
        "MI"
    ],
    "48654": [
        "ROSE CITY",
        "MI"
    ],
    "48655": [
        "SAINT CHARLES",
        "MI"
    ],
    "48656": [
        "SAINT HELEN",
        "MI"
    ],
    "48657": [
        "SANFORD",
        "MI"
    ],
    "48658": [
        "STANDISH",
        "MI"
    ],
    "48659": [
        "STERLING",
        "MI"
    ],
    "48661": [
        "WEST BRANCH",
        "MI"
    ],
    "48662": [
        "WHEELER",
        "MI"
    ],
    "48667": [
        "MIDLAND",
        "MI"
    ],
    "48670": [
        "MIDLAND",
        "MI"
    ],
    "48674": [
        "MIDLAND",
        "MI"
    ],
    "48686": [
        "MIDLAND",
        "MI"
    ],
    "48701": [
        "AKRON",
        "MI"
    ],
    "48703": [
        "AU GRES",
        "MI"
    ],
    "48705": [
        "BARTON CITY",
        "MI"
    ],
    "48706": [
        "BAY CITY",
        "MI"
    ],
    "48707": [
        "BAY CITY",
        "MI"
    ],
    "48708": [
        "BAY CITY",
        "MI"
    ],
    "48710": [
        "UNIVERSITY CENTER",
        "MI"
    ],
    "48720": [
        "BAY PORT",
        "MI"
    ],
    "48721": [
        "BLACK RIVER",
        "MI"
    ],
    "48722": [
        "BRIDGEPORT",
        "MI"
    ],
    "48723": [
        "CARO",
        "MI"
    ],
    "48724": [
        "CARROLLTON",
        "MI"
    ],
    "48725": [
        "CASEVILLE",
        "MI"
    ],
    "48726": [
        "CASS CITY",
        "MI"
    ],
    "48727": [
        "CLIFFORD",
        "MI"
    ],
    "48728": [
        "CURRAN",
        "MI"
    ],
    "48729": [
        "DEFORD",
        "MI"
    ],
    "48730": [
        "EAST TAWAS",
        "MI"
    ],
    "48731": [
        "ELKTON",
        "MI"
    ],
    "48732": [
        "ESSEXVILLE",
        "MI"
    ],
    "48733": [
        "FAIRGROVE",
        "MI"
    ],
    "48734": [
        "FRANKENMUTH",
        "MI"
    ],
    "48735": [
        "GAGETOWN",
        "MI"
    ],
    "48737": [
        "GLENNIE",
        "MI"
    ],
    "48738": [
        "GREENBUSH",
        "MI"
    ],
    "48739": [
        "HALE",
        "MI"
    ],
    "48740": [
        "HARRISVILLE",
        "MI"
    ],
    "48741": [
        "KINGSTON",
        "MI"
    ],
    "48742": [
        "LINCOLN",
        "MI"
    ],
    "48743": [
        "LONG LAKE",
        "MI"
    ],
    "48744": [
        "MAYVILLE",
        "MI"
    ],
    "48745": [
        "MIKADO",
        "MI"
    ],
    "48746": [
        "MILLINGTON",
        "MI"
    ],
    "48747": [
        "MUNGER",
        "MI"
    ],
    "48748": [
        "NATIONAL CITY",
        "MI"
    ],
    "48749": [
        "OMER",
        "MI"
    ],
    "48750": [
        "OSCODA",
        "MI"
    ],
    "48754": [
        "OWENDALE",
        "MI"
    ],
    "48755": [
        "PIGEON",
        "MI"
    ],
    "48756": [
        "PRESCOTT",
        "MI"
    ],
    "48757": [
        "REESE",
        "MI"
    ],
    "48758": [
        "RICHVILLE",
        "MI"
    ],
    "48759": [
        "SEBEWAING",
        "MI"
    ],
    "48760": [
        "SILVERWOOD",
        "MI"
    ],
    "48761": [
        "SOUTH BRANCH",
        "MI"
    ],
    "48762": [
        "SPRUCE",
        "MI"
    ],
    "48763": [
        "TAWAS CITY",
        "MI"
    ],
    "48764": [
        "TAWAS CITY",
        "MI"
    ],
    "48765": [
        "TURNER",
        "MI"
    ],
    "48766": [
        "TWINING",
        "MI"
    ],
    "48767": [
        "UNIONVILLE",
        "MI"
    ],
    "48768": [
        "VASSAR",
        "MI"
    ],
    "48770": [
        "WHITTEMORE",
        "MI"
    ],
    "48787": [
        "FRANKENMUTH",
        "MI"
    ],
    "48801": [
        "ALMA",
        "MI"
    ],
    "48804": [
        "MOUNT PLEASANT",
        "MI"
    ],
    "48805": [
        "OKEMOS",
        "MI"
    ],
    "48806": [
        "ASHLEY",
        "MI"
    ],
    "48807": [
        "BANNISTER",
        "MI"
    ],
    "48808": [
        "BATH",
        "MI"
    ],
    "48809": [
        "BELDING",
        "MI"
    ],
    "48811": [
        "CARSON CITY",
        "MI"
    ],
    "48812": [
        "CEDAR LAKE",
        "MI"
    ],
    "48813": [
        "CHARLOTTE",
        "MI"
    ],
    "48815": [
        "CLARKSVILLE",
        "MI"
    ],
    "48816": [
        "COHOCTAH",
        "MI"
    ],
    "48817": [
        "CORUNNA",
        "MI"
    ],
    "48818": [
        "CRYSTAL",
        "MI"
    ],
    "48819": [
        "DANSVILLE",
        "MI"
    ],
    "48820": [
        "DEWITT",
        "MI"
    ],
    "48821": [
        "DIMONDALE",
        "MI"
    ],
    "48822": [
        "EAGLE",
        "MI"
    ],
    "48823": [
        "EAST LANSING",
        "MI"
    ],
    "48824": [
        "EAST LANSING",
        "MI"
    ],
    "48826": [
        "EAST LANSING",
        "MI"
    ],
    "48827": [
        "EATON RAPIDS",
        "MI"
    ],
    "48829": [
        "EDMORE",
        "MI"
    ],
    "48830": [
        "ELM HALL",
        "MI"
    ],
    "48831": [
        "ELSIE",
        "MI"
    ],
    "48832": [
        "ELWELL",
        "MI"
    ],
    "48833": [
        "EUREKA",
        "MI"
    ],
    "48834": [
        "FENWICK",
        "MI"
    ],
    "48835": [
        "FOWLER",
        "MI"
    ],
    "48836": [
        "FOWLERVILLE",
        "MI"
    ],
    "48837": [
        "GRAND LEDGE",
        "MI"
    ],
    "48838": [
        "GREENVILLE",
        "MI"
    ],
    "48840": [
        "HASLETT",
        "MI"
    ],
    "48841": [
        "HENDERSON",
        "MI"
    ],
    "48842": [
        "HOLT",
        "MI"
    ],
    "48843": [
        "HOWELL",
        "MI"
    ],
    "48844": [
        "HOWELL",
        "MI"
    ],
    "48845": [
        "HUBBARDSTON",
        "MI"
    ],
    "48846": [
        "IONIA",
        "MI"
    ],
    "48847": [
        "ITHACA",
        "MI"
    ],
    "48848": [
        "LAINGSBURG",
        "MI"
    ],
    "48849": [
        "LAKE ODESSA",
        "MI"
    ],
    "48850": [
        "LAKEVIEW",
        "MI"
    ],
    "48851": [
        "LYONS",
        "MI"
    ],
    "48852": [
        "MCBRIDES",
        "MI"
    ],
    "48853": [
        "MAPLE RAPIDS",
        "MI"
    ],
    "48854": [
        "MASON",
        "MI"
    ],
    "48855": [
        "HOWELL",
        "MI"
    ],
    "48856": [
        "MIDDLETON",
        "MI"
    ],
    "48857": [
        "MORRICE",
        "MI"
    ],
    "48858": [
        "MOUNT PLEASANT",
        "MI"
    ],
    "48859": [
        "MOUNT PLEASANT",
        "MI"
    ],
    "48860": [
        "MUIR",
        "MI"
    ],
    "48861": [
        "MULLIKEN",
        "MI"
    ],
    "48864": [
        "OKEMOS",
        "MI"
    ],
    "48865": [
        "ORLEANS",
        "MI"
    ],
    "48866": [
        "OVID",
        "MI"
    ],
    "48867": [
        "OWOSSO",
        "MI"
    ],
    "48870": [
        "PALO",
        "MI"
    ],
    "48871": [
        "PERRINTON",
        "MI"
    ],
    "48872": [
        "PERRY",
        "MI"
    ],
    "48873": [
        "PEWAMO",
        "MI"
    ],
    "48874": [
        "POMPEII",
        "MI"
    ],
    "48875": [
        "PORTLAND",
        "MI"
    ],
    "48876": [
        "POTTERVILLE",
        "MI"
    ],
    "48877": [
        "RIVERDALE",
        "MI"
    ],
    "48878": [
        "ROSEBUSH",
        "MI"
    ],
    "48879": [
        "SAINT JOHNS",
        "MI"
    ],
    "48880": [
        "SAINT LOUIS",
        "MI"
    ],
    "48881": [
        "SARANAC",
        "MI"
    ],
    "48882": [
        "SHAFTSBURG",
        "MI"
    ],
    "48883": [
        "SHEPHERD",
        "MI"
    ],
    "48884": [
        "SHERIDAN",
        "MI"
    ],
    "48885": [
        "SIDNEY",
        "MI"
    ],
    "48886": [
        "SIX LAKES",
        "MI"
    ],
    "48887": [
        "SMYRNA",
        "MI"
    ],
    "48888": [
        "STANTON",
        "MI"
    ],
    "48889": [
        "SUMNER",
        "MI"
    ],
    "48890": [
        "SUNFIELD",
        "MI"
    ],
    "48891": [
        "VESTABURG",
        "MI"
    ],
    "48892": [
        "WEBBERVILLE",
        "MI"
    ],
    "48893": [
        "WEIDMAN",
        "MI"
    ],
    "48894": [
        "WESTPHALIA",
        "MI"
    ],
    "48895": [
        "WILLIAMSTON",
        "MI"
    ],
    "48896": [
        "WINN",
        "MI"
    ],
    "48897": [
        "WOODLAND",
        "MI"
    ],
    "48901": [
        "LANSING",
        "MI"
    ],
    "48906": [
        "LANSING",
        "MI"
    ],
    "48908": [
        "LANSING",
        "MI"
    ],
    "48909": [
        "LANSING",
        "MI"
    ],
    "48910": [
        "LANSING",
        "MI"
    ],
    "48911": [
        "LANSING",
        "MI"
    ],
    "48912": [
        "LANSING",
        "MI"
    ],
    "48913": [
        "LANSING",
        "MI"
    ],
    "48915": [
        "LANSING",
        "MI"
    ],
    "48916": [
        "LANSING",
        "MI"
    ],
    "48917": [
        "LANSING",
        "MI"
    ],
    "48918": [
        "LANSING",
        "MI"
    ],
    "48933": [
        "LANSING",
        "MI"
    ],
    "48951": [
        "LANSING",
        "MI"
    ],
    "49001": [
        "KALAMAZOO",
        "MI"
    ],
    "49002": [
        "PORTAGE",
        "MI"
    ],
    "49003": [
        "KALAMAZOO",
        "MI"
    ],
    "49004": [
        "KALAMAZOO",
        "MI"
    ],
    "49005": [
        "KALAMAZOO",
        "MI"
    ],
    "49006": [
        "KALAMAZOO",
        "MI"
    ],
    "49007": [
        "KALAMAZOO",
        "MI"
    ],
    "49008": [
        "KALAMAZOO",
        "MI"
    ],
    "49009": [
        "KALAMAZOO",
        "MI"
    ],
    "49010": [
        "ALLEGAN",
        "MI"
    ],
    "49011": [
        "ATHENS",
        "MI"
    ],
    "49012": [
        "AUGUSTA",
        "MI"
    ],
    "49013": [
        "BANGOR",
        "MI"
    ],
    "49014": [
        "BATTLE CREEK",
        "MI"
    ],
    "49015": [
        "BATTLE CREEK",
        "MI"
    ],
    "49016": [
        "BATTLE CREEK",
        "MI"
    ],
    "49017": [
        "BATTLE CREEK",
        "MI"
    ],
    "49019": [
        "KALAMAZOO",
        "MI"
    ],
    "49020": [
        "BEDFORD",
        "MI"
    ],
    "49021": [
        "BELLEVUE",
        "MI"
    ],
    "49022": [
        "BENTON HARBOR",
        "MI"
    ],
    "49023": [
        "BENTON HARBOR",
        "MI"
    ],
    "49024": [
        "PORTAGE",
        "MI"
    ],
    "49026": [
        "BLOOMINGDALE",
        "MI"
    ],
    "49027": [
        "BREEDSVILLE",
        "MI"
    ],
    "49028": [
        "BRONSON",
        "MI"
    ],
    "49029": [
        "BURLINGTON",
        "MI"
    ],
    "49030": [
        "BURR OAK",
        "MI"
    ],
    "49031": [
        "CASSOPOLIS",
        "MI"
    ],
    "49032": [
        "CENTREVILLE",
        "MI"
    ],
    "49033": [
        "CERESCO",
        "MI"
    ],
    "49034": [
        "CLIMAX",
        "MI"
    ],
    "49035": [
        "CLOVERDALE",
        "MI"
    ],
    "49036": [
        "COLDWATER",
        "MI"
    ],
    "49037": [
        "BATTLE CREEK",
        "MI"
    ],
    "49038": [
        "COLOMA",
        "MI"
    ],
    "49040": [
        "COLON",
        "MI"
    ],
    "49041": [
        "COMSTOCK",
        "MI"
    ],
    "49042": [
        "CONSTANTINE",
        "MI"
    ],
    "49043": [
        "COVERT",
        "MI"
    ],
    "49045": [
        "DECATUR",
        "MI"
    ],
    "49046": [
        "DELTON",
        "MI"
    ],
    "49047": [
        "DOWAGIAC",
        "MI"
    ],
    "49048": [
        "KALAMAZOO",
        "MI"
    ],
    "49050": [
        "DOWLING",
        "MI"
    ],
    "49051": [
        "EAST LEROY",
        "MI"
    ],
    "49052": [
        "FULTON",
        "MI"
    ],
    "49053": [
        "GALESBURG",
        "MI"
    ],
    "49055": [
        "GOBLES",
        "MI"
    ],
    "49056": [
        "GRAND JUNCTION",
        "MI"
    ],
    "49057": [
        "HARTFORD",
        "MI"
    ],
    "49058": [
        "HASTINGS",
        "MI"
    ],
    "49060": [
        "HICKORY CORNERS",
        "MI"
    ],
    "49061": [
        "JONES",
        "MI"
    ],
    "49062": [
        "KENDALL",
        "MI"
    ],
    "49064": [
        "LAWRENCE",
        "MI"
    ],
    "49065": [
        "LAWTON",
        "MI"
    ],
    "49066": [
        "LEONIDAS",
        "MI"
    ],
    "49067": [
        "MARCELLUS",
        "MI"
    ],
    "49068": [
        "MARSHALL",
        "MI"
    ],
    "49070": [
        "MARTIN",
        "MI"
    ],
    "49071": [
        "MATTAWAN",
        "MI"
    ],
    "49072": [
        "MENDON",
        "MI"
    ],
    "49073": [
        "NASHVILLE",
        "MI"
    ],
    "49074": [
        "NAZARETH",
        "MI"
    ],
    "49075": [
        "NOTTAWA",
        "MI"
    ],
    "49076": [
        "OLIVET",
        "MI"
    ],
    "49077": [
        "OSHTEMO",
        "MI"
    ],
    "49078": [
        "OTSEGO",
        "MI"
    ],
    "49079": [
        "PAW PAW",
        "MI"
    ],
    "49080": [
        "PLAINWELL",
        "MI"
    ],
    "49081": [
        "PORTAGE",
        "MI"
    ],
    "49082": [
        "QUINCY",
        "MI"
    ],
    "49083": [
        "RICHLAND",
        "MI"
    ],
    "49084": [
        "RIVERSIDE",
        "MI"
    ],
    "49085": [
        "SAINT JOSEPH",
        "MI"
    ],
    "49087": [
        "SCHOOLCRAFT",
        "MI"
    ],
    "49088": [
        "SCOTTS",
        "MI"
    ],
    "49089": [
        "SHERWOOD",
        "MI"
    ],
    "49090": [
        "SOUTH HAVEN",
        "MI"
    ],
    "49091": [
        "STURGIS",
        "MI"
    ],
    "49092": [
        "TEKONSHA",
        "MI"
    ],
    "49093": [
        "THREE RIVERS",
        "MI"
    ],
    "49094": [
        "UNION CITY",
        "MI"
    ],
    "49095": [
        "VANDALIA",
        "MI"
    ],
    "49096": [
        "VERMONTVILLE",
        "MI"
    ],
    "49097": [
        "VICKSBURG",
        "MI"
    ],
    "49098": [
        "WATERVLIET",
        "MI"
    ],
    "49099": [
        "WHITE PIGEON",
        "MI"
    ],
    "49101": [
        "BARODA",
        "MI"
    ],
    "49102": [
        "BERRIEN CENTER",
        "MI"
    ],
    "49103": [
        "BERRIEN SPRINGS",
        "MI"
    ],
    "49104": [
        "BERRIEN SPRINGS",
        "MI"
    ],
    "49106": [
        "BRIDGMAN",
        "MI"
    ],
    "49107": [
        "BUCHANAN",
        "MI"
    ],
    "49111": [
        "EAU CLAIRE",
        "MI"
    ],
    "49112": [
        "EDWARDSBURG",
        "MI"
    ],
    "49113": [
        "GALIEN",
        "MI"
    ],
    "49115": [
        "HARBERT",
        "MI"
    ],
    "49116": [
        "LAKESIDE",
        "MI"
    ],
    "49117": [
        "NEW BUFFALO",
        "MI"
    ],
    "49119": [
        "NEW TROY",
        "MI"
    ],
    "49120": [
        "NILES",
        "MI"
    ],
    "49125": [
        "SAWYER",
        "MI"
    ],
    "49126": [
        "SODUS",
        "MI"
    ],
    "49127": [
        "STEVENSVILLE",
        "MI"
    ],
    "49128": [
        "THREE OAKS",
        "MI"
    ],
    "49129": [
        "UNION PIER",
        "MI"
    ],
    "49130": [
        "UNION",
        "MI"
    ],
    "49201": [
        "JACKSON",
        "MI"
    ],
    "49202": [
        "JACKSON",
        "MI"
    ],
    "49203": [
        "JACKSON",
        "MI"
    ],
    "49204": [
        "JACKSON",
        "MI"
    ],
    "49220": [
        "ADDISON",
        "MI"
    ],
    "49221": [
        "ADRIAN",
        "MI"
    ],
    "49224": [
        "ALBION",
        "MI"
    ],
    "49227": [
        "ALLEN",
        "MI"
    ],
    "49228": [
        "BLISSFIELD",
        "MI"
    ],
    "49229": [
        "BRITTON",
        "MI"
    ],
    "49230": [
        "BROOKLYN",
        "MI"
    ],
    "49232": [
        "CAMDEN",
        "MI"
    ],
    "49233": [
        "CEMENT CITY",
        "MI"
    ],
    "49234": [
        "CLARKLAKE",
        "MI"
    ],
    "49235": [
        "CLAYTON",
        "MI"
    ],
    "49236": [
        "CLINTON",
        "MI"
    ],
    "49237": [
        "CONCORD",
        "MI"
    ],
    "49238": [
        "DEERFIELD",
        "MI"
    ],
    "49239": [
        "FRONTIER",
        "MI"
    ],
    "49240": [
        "GRASS LAKE",
        "MI"
    ],
    "49241": [
        "HANOVER",
        "MI"
    ],
    "49242": [
        "HILLSDALE",
        "MI"
    ],
    "49245": [
        "HOMER",
        "MI"
    ],
    "49246": [
        "HORTON",
        "MI"
    ],
    "49247": [
        "HUDSON",
        "MI"
    ],
    "49248": [
        "JASPER",
        "MI"
    ],
    "49249": [
        "JEROME",
        "MI"
    ],
    "49250": [
        "JONESVILLE",
        "MI"
    ],
    "49251": [
        "LESLIE",
        "MI"
    ],
    "49252": [
        "LITCHFIELD",
        "MI"
    ],
    "49253": [
        "MANITOU BEACH",
        "MI"
    ],
    "49254": [
        "MICHIGAN CENTER",
        "MI"
    ],
    "49255": [
        "MONTGOMERY",
        "MI"
    ],
    "49256": [
        "MORENCI",
        "MI"
    ],
    "49257": [
        "MOSCOW",
        "MI"
    ],
    "49258": [
        "MOSHERVILLE",
        "MI"
    ],
    "49259": [
        "MUNITH",
        "MI"
    ],
    "49261": [
        "NAPOLEON",
        "MI"
    ],
    "49262": [
        "NORTH ADAMS",
        "MI"
    ],
    "49264": [
        "ONONDAGA",
        "MI"
    ],
    "49265": [
        "ONSTED",
        "MI"
    ],
    "49266": [
        "OSSEO",
        "MI"
    ],
    "49267": [
        "OTTAWA LAKE",
        "MI"
    ],
    "49268": [
        "PALMYRA",
        "MI"
    ],
    "49269": [
        "PARMA",
        "MI"
    ],
    "49270": [
        "PETERSBURG",
        "MI"
    ],
    "49271": [
        "PITTSFORD",
        "MI"
    ],
    "49272": [
        "PLEASANT LAKE",
        "MI"
    ],
    "49274": [
        "READING",
        "MI"
    ],
    "49276": [
        "RIGA",
        "MI"
    ],
    "49277": [
        "RIVES JUNCTION",
        "MI"
    ],
    "49279": [
        "SAND CREEK",
        "MI"
    ],
    "49281": [
        "SOMERSET",
        "MI"
    ],
    "49282": [
        "SOMERSET CENTER",
        "MI"
    ],
    "49283": [
        "SPRING ARBOR",
        "MI"
    ],
    "49284": [
        "SPRINGPORT",
        "MI"
    ],
    "49285": [
        "STOCKBRIDGE",
        "MI"
    ],
    "49286": [
        "TECUMSEH",
        "MI"
    ],
    "49287": [
        "TIPTON",
        "MI"
    ],
    "49288": [
        "WALDRON",
        "MI"
    ],
    "49289": [
        "WESTON",
        "MI"
    ],
    "49301": [
        "ADA",
        "MI"
    ],
    "49302": [
        "ALTO",
        "MI"
    ],
    "49303": [
        "BAILEY",
        "MI"
    ],
    "49304": [
        "BALDWIN",
        "MI"
    ],
    "49305": [
        "BARRYTON",
        "MI"
    ],
    "49306": [
        "BELMONT",
        "MI"
    ],
    "49307": [
        "BIG RAPIDS",
        "MI"
    ],
    "49309": [
        "BITELY",
        "MI"
    ],
    "49310": [
        "BLANCHARD",
        "MI"
    ],
    "49311": [
        "BRADLEY",
        "MI"
    ],
    "49312": [
        "BROHMAN",
        "MI"
    ],
    "49314": [
        "BURNIPS",
        "MI"
    ],
    "49315": [
        "BYRON CENTER",
        "MI"
    ],
    "49316": [
        "CALEDONIA",
        "MI"
    ],
    "49317": [
        "CANNONSBURG",
        "MI"
    ],
    "49318": [
        "CASNOVIA",
        "MI"
    ],
    "49319": [
        "CEDAR SPRINGS",
        "MI"
    ],
    "49320": [
        "CHIPPEWA LAKE",
        "MI"
    ],
    "49321": [
        "COMSTOCK PARK",
        "MI"
    ],
    "49322": [
        "CORAL",
        "MI"
    ],
    "49323": [
        "DORR",
        "MI"
    ],
    "49325": [
        "FREEPORT",
        "MI"
    ],
    "49326": [
        "GOWEN",
        "MI"
    ],
    "49327": [
        "GRANT",
        "MI"
    ],
    "49328": [
        "HOPKINS",
        "MI"
    ],
    "49329": [
        "HOWARD CITY",
        "MI"
    ],
    "49330": [
        "KENT CITY",
        "MI"
    ],
    "49331": [
        "LOWELL",
        "MI"
    ],
    "49332": [
        "MECOSTA",
        "MI"
    ],
    "49333": [
        "MIDDLEVILLE",
        "MI"
    ],
    "49335": [
        "MOLINE",
        "MI"
    ],
    "49336": [
        "MORLEY",
        "MI"
    ],
    "49337": [
        "NEWAYGO",
        "MI"
    ],
    "49338": [
        "PARIS",
        "MI"
    ],
    "49339": [
        "PIERSON",
        "MI"
    ],
    "49340": [
        "REMUS",
        "MI"
    ],
    "49341": [
        "ROCKFORD",
        "MI"
    ],
    "49342": [
        "RODNEY",
        "MI"
    ],
    "49343": [
        "SAND LAKE",
        "MI"
    ],
    "49344": [
        "SHELBYVILLE",
        "MI"
    ],
    "49345": [
        "SPARTA",
        "MI"
    ],
    "49346": [
        "STANWOOD",
        "MI"
    ],
    "49347": [
        "TRUFANT",
        "MI"
    ],
    "49348": [
        "WAYLAND",
        "MI"
    ],
    "49349": [
        "WHITE CLOUD",
        "MI"
    ],
    "49351": [
        "ROCKFORD",
        "MI"
    ],
    "49355": [
        "ADA",
        "MI"
    ],
    "49356": [
        "ADA",
        "MI"
    ],
    "49401": [
        "ALLENDALE",
        "MI"
    ],
    "49402": [
        "BRANCH",
        "MI"
    ],
    "49403": [
        "CONKLIN",
        "MI"
    ],
    "49404": [
        "COOPERSVILLE",
        "MI"
    ],
    "49405": [
        "CUSTER",
        "MI"
    ],
    "49406": [
        "DOUGLAS",
        "MI"
    ],
    "49408": [
        "FENNVILLE",
        "MI"
    ],
    "49409": [
        "FERRYSBURG",
        "MI"
    ],
    "49410": [
        "FOUNTAIN",
        "MI"
    ],
    "49411": [
        "FREE SOIL",
        "MI"
    ],
    "49412": [
        "FREMONT",
        "MI"
    ],
    "49413": [
        "FREMONT",
        "MI"
    ],
    "49415": [
        "FRUITPORT",
        "MI"
    ],
    "49416": [
        "GLENN",
        "MI"
    ],
    "49417": [
        "GRAND HAVEN",
        "MI"
    ],
    "49418": [
        "GRANDVILLE",
        "MI"
    ],
    "49419": [
        "HAMILTON",
        "MI"
    ],
    "49420": [
        "HART",
        "MI"
    ],
    "49421": [
        "HESPERIA",
        "MI"
    ],
    "49422": [
        "HOLLAND",
        "MI"
    ],
    "49423": [
        "HOLLAND",
        "MI"
    ],
    "49424": [
        "HOLLAND",
        "MI"
    ],
    "49425": [
        "HOLTON",
        "MI"
    ],
    "49426": [
        "HUDSONVILLE",
        "MI"
    ],
    "49427": [
        "JAMESTOWN",
        "MI"
    ],
    "49428": [
        "JENISON",
        "MI"
    ],
    "49429": [
        "JENISON",
        "MI"
    ],
    "49430": [
        "LAMONT",
        "MI"
    ],
    "49431": [
        "LUDINGTON",
        "MI"
    ],
    "49434": [
        "MACATAWA",
        "MI"
    ],
    "49435": [
        "MARNE",
        "MI"
    ],
    "49436": [
        "MEARS",
        "MI"
    ],
    "49437": [
        "MONTAGUE",
        "MI"
    ],
    "49440": [
        "MUSKEGON",
        "MI"
    ],
    "49441": [
        "MUSKEGON",
        "MI"
    ],
    "49442": [
        "MUSKEGON",
        "MI"
    ],
    "49443": [
        "MUSKEGON",
        "MI"
    ],
    "49444": [
        "MUSKEGON",
        "MI"
    ],
    "49445": [
        "MUSKEGON",
        "MI"
    ],
    "49446": [
        "NEW ERA",
        "MI"
    ],
    "49448": [
        "NUNICA",
        "MI"
    ],
    "49449": [
        "PENTWATER",
        "MI"
    ],
    "49450": [
        "PULLMAN",
        "MI"
    ],
    "49451": [
        "RAVENNA",
        "MI"
    ],
    "49452": [
        "ROTHBURY",
        "MI"
    ],
    "49453": [
        "SAUGATUCK",
        "MI"
    ],
    "49454": [
        "SCOTTVILLE",
        "MI"
    ],
    "49455": [
        "SHELBY",
        "MI"
    ],
    "49456": [
        "SPRING LAKE",
        "MI"
    ],
    "49457": [
        "TWIN LAKE",
        "MI"
    ],
    "49458": [
        "WALHALLA",
        "MI"
    ],
    "49459": [
        "WALKERVILLE",
        "MI"
    ],
    "49460": [
        "WEST OLIVE",
        "MI"
    ],
    "49461": [
        "WHITEHALL",
        "MI"
    ],
    "49464": [
        "ZEELAND",
        "MI"
    ],
    "49468": [
        "GRANDVILLE",
        "MI"
    ],
    "49501": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49502": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49503": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49504": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49505": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49506": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49507": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49508": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49509": [
        "WYOMING",
        "MI"
    ],
    "49510": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49512": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49514": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49515": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49516": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49518": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49519": [
        "WYOMING",
        "MI"
    ],
    "49523": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49525": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49528": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49530": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49534": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49544": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49546": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49548": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49560": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49588": [
        "GRAND RAPIDS",
        "MI"
    ],
    "49601": [
        "CADILLAC",
        "MI"
    ],
    "49610": [
        "ACME",
        "MI"
    ],
    "49611": [
        "ALBA",
        "MI"
    ],
    "49612": [
        "ALDEN",
        "MI"
    ],
    "49613": [
        "ARCADIA",
        "MI"
    ],
    "49614": [
        "BEAR LAKE",
        "MI"
    ],
    "49615": [
        "BELLAIRE",
        "MI"
    ],
    "49616": [
        "BENZONIA",
        "MI"
    ],
    "49617": [
        "BEULAH",
        "MI"
    ],
    "49618": [
        "BOON",
        "MI"
    ],
    "49619": [
        "BRETHREN",
        "MI"
    ],
    "49620": [
        "BUCKLEY",
        "MI"
    ],
    "49621": [
        "CEDAR",
        "MI"
    ],
    "49622": [
        "CENTRAL LAKE",
        "MI"
    ],
    "49623": [
        "CHASE",
        "MI"
    ],
    "49625": [
        "COPEMISH",
        "MI"
    ],
    "49627": [
        "EASTPORT",
        "MI"
    ],
    "49628": [
        "ELBERTA",
        "MI"
    ],
    "49629": [
        "ELK RAPIDS",
        "MI"
    ],
    "49630": [
        "EMPIRE",
        "MI"
    ],
    "49631": [
        "EVART",
        "MI"
    ],
    "49632": [
        "FALMOUTH",
        "MI"
    ],
    "49633": [
        "FIFE LAKE",
        "MI"
    ],
    "49634": [
        "FILER CITY",
        "MI"
    ],
    "49635": [
        "FRANKFORT",
        "MI"
    ],
    "49636": [
        "GLEN ARBOR",
        "MI"
    ],
    "49637": [
        "GRAWN",
        "MI"
    ],
    "49638": [
        "HARRIETTA",
        "MI"
    ],
    "49639": [
        "HERSEY",
        "MI"
    ],
    "49640": [
        "HONOR",
        "MI"
    ],
    "49642": [
        "IDLEWILD",
        "MI"
    ],
    "49643": [
        "INTERLOCHEN",
        "MI"
    ],
    "49644": [
        "IRONS",
        "MI"
    ],
    "49645": [
        "KALEVA",
        "MI"
    ],
    "49646": [
        "KALKASKA",
        "MI"
    ],
    "49648": [
        "KEWADIN",
        "MI"
    ],
    "49649": [
        "KINGSLEY",
        "MI"
    ],
    "49650": [
        "LAKE ANN",
        "MI"
    ],
    "49651": [
        "LAKE CITY",
        "MI"
    ],
    "49653": [
        "LAKE LEELANAU",
        "MI"
    ],
    "49654": [
        "LELAND",
        "MI"
    ],
    "49655": [
        "LEROY",
        "MI"
    ],
    "49656": [
        "LUTHER",
        "MI"
    ],
    "49657": [
        "MC BAIN",
        "MI"
    ],
    "49659": [
        "MANCELONA",
        "MI"
    ],
    "49660": [
        "MANISTEE",
        "MI"
    ],
    "49663": [
        "MANTON",
        "MI"
    ],
    "49664": [
        "MAPLE CITY",
        "MI"
    ],
    "49665": [
        "MARION",
        "MI"
    ],
    "49666": [
        "MAYFIELD",
        "MI"
    ],
    "49667": [
        "MERRITT",
        "MI"
    ],
    "49668": [
        "MESICK",
        "MI"
    ],
    "49670": [
        "NORTHPORT",
        "MI"
    ],
    "49673": [
        "OLD MISSION",
        "MI"
    ],
    "49674": [
        "OMENA",
        "MI"
    ],
    "49675": [
        "ONEKAMA",
        "MI"
    ],
    "49676": [
        "RAPID CITY",
        "MI"
    ],
    "49677": [
        "REED CITY",
        "MI"
    ],
    "49679": [
        "SEARS",
        "MI"
    ],
    "49680": [
        "SOUTH BOARDMAN",
        "MI"
    ],
    "49682": [
        "SUTTONS BAY",
        "MI"
    ],
    "49683": [
        "THOMPSONVILLE",
        "MI"
    ],
    "49684": [
        "TRAVERSE CITY",
        "MI"
    ],
    "49685": [
        "TRAVERSE CITY",
        "MI"
    ],
    "49686": [
        "TRAVERSE CITY",
        "MI"
    ],
    "49688": [
        "TUSTIN",
        "MI"
    ],
    "49689": [
        "WELLSTON",
        "MI"
    ],
    "49690": [
        "WILLIAMSBURG",
        "MI"
    ],
    "49696": [
        "TRAVERSE CITY",
        "MI"
    ],
    "49701": [
        "MACKINAW CITY",
        "MI"
    ],
    "49705": [
        "AFTON",
        "MI"
    ],
    "49706": [
        "ALANSON",
        "MI"
    ],
    "49707": [
        "ALPENA",
        "MI"
    ],
    "49709": [
        "ATLANTA",
        "MI"
    ],
    "49710": [
        "BARBEAU",
        "MI"
    ],
    "49711": [
        "BAY SHORE",
        "MI"
    ],
    "49712": [
        "BOYNE CITY",
        "MI"
    ],
    "49713": [
        "BOYNE FALLS",
        "MI"
    ],
    "49715": [
        "BRIMLEY",
        "MI"
    ],
    "49716": [
        "BRUTUS",
        "MI"
    ],
    "49717": [
        "BURT LAKE",
        "MI"
    ],
    "49718": [
        "CARP LAKE",
        "MI"
    ],
    "49719": [
        "CEDARVILLE",
        "MI"
    ],
    "49720": [
        "CHARLEVOIX",
        "MI"
    ],
    "49721": [
        "CHEBOYGAN",
        "MI"
    ],
    "49722": [
        "CONWAY",
        "MI"
    ],
    "49723": [
        "CROSS VILLAGE",
        "MI"
    ],
    "49724": [
        "DAFTER",
        "MI"
    ],
    "49725": [
        "DE TOUR VILLAGE",
        "MI"
    ],
    "49726": [
        "DRUMMOND ISLAND",
        "MI"
    ],
    "49727": [
        "EAST JORDAN",
        "MI"
    ],
    "49728": [
        "ECKERMAN",
        "MI"
    ],
    "49729": [
        "ELLSWORTH",
        "MI"
    ],
    "49730": [
        "ELMIRA",
        "MI"
    ],
    "49733": [
        "FREDERIC",
        "MI"
    ],
    "49734": [
        "GAYLORD",
        "MI"
    ],
    "49735": [
        "GAYLORD",
        "MI"
    ],
    "49736": [
        "GOETZVILLE",
        "MI"
    ],
    "49737": [
        "GOOD HART",
        "MI"
    ],
    "49738": [
        "GRAYLING",
        "MI"
    ],
    "49739": [
        "GRAYLING",
        "MI"
    ],
    "49740": [
    ],
