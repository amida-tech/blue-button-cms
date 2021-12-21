blue-button-cms
=================

Blue Button CMS Parser

[![NPM](https://nodei.co/npm/blue-button-cms.png)](https://nodei.co/npm/blue-button-cms/)

[![Build Status](https://travis-ci.org/amida-tech/blue-button-cms.svg)](https://travis-ci.org/amida-tech/blue-button-cms)
[![Coverage Status](https://coveralls.io/repos/amida-tech/blue-button-cms/badge.png)](https://coveralls.io/r/amida-tech/blue-button-cms)

This library is part of [blue-button](https://github.com/amida-tech/blue-button) family of parsers and generate JSON data from CMS files.  The model of the generated data is described in [blue-button-model](https://github.com/amida-tech/blue-button-model).  This library is also exposed through [blue-button](https://github.com/amida-tech/blue-button).

## Quick up and running guide

### Prerequisites

- Node.js (v0.10+) and NPM
- Grunt.js

```
# Install dependencies
npm i

# Install grunt
npm i -g grunt

# Test
grunt

```

## Usage

``` javascript
var bbcms = require("blue-button-cms");

//read in the file
var textString = fs.readFileSync("cms_sample.txt").toString();

//convert the string text file into blue button model
var result = bbcms.parseText(textString);

console.log(result);
```
getting:

``` javascript

{ data:
   { demographics:
      { name: [Object],
        dob: [Object],
        email: [Object],
        phone: [Object],
        address: [Object] },
     vitals: [ [Object], [Object] ],
     results: [ [Object] ],
     medications: [ [Object], [Object] ],
     allergies: [ [Object], [Object] ],
     immunizations: [ [Object], [Object], [Object] ],
     problems: [ [Object], [Object] ],
     insurance: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
     claims: [ [Object], [Object], [Object], [Object], [Object] ] },
  meta:
   { type: 'cms',
     version: '2.0',
     timestamp: { date: '2013-03-16T05:10:00Z', precision: 'minute' },
     sections: ['demographics', ..., 'claims'] } }

```

# Data Model

Data model details and validation can be found in [blue-button-model](https://github.com/amida-tech/blue-button-model).

## Implementation

Some notes on implementation are included [here](./docs/cms.md).

## License

Licensed under [Apache 2.0](./LICENSE).
