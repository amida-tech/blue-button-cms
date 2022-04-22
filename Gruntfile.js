/*global module*/

var bbcms = require('./index');
var path = require('path');

var generateChangeDetectionFiles = function (grunt) {
  var srcs = [
    'test/fixtures/sample.txt',
  ];
  var dest = 'test/fixtures/generated';

  srcs.forEach(function (src) {
    var content = grunt.file.read(src);
    var result = bbcms.parseText(content);

    var baseName = path.basename(src, path.extname(src));
    var destName = baseName + '.json';
    var destPath = path.join(dest, destName);
    var destContent = JSON.stringify(result, undefined, 2);
    grunt.file.write(destPath, destContent);
  });
};

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['*.js', './lib/**/*.js', './test/**/*.js'],
      options: {
        browser: true,
        smarttabs: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        node: true,
        expr: true,
        globals: {
          'it': true,
          'xit': true,
          'describe': true,
          'expect': true,
          'before': true,
          'after': true,
          'done': true
        }
      }
    },
    watch: {
      all: {
        files: ['./lib/*.js', '*.js'],
        tasks: ['default']
      }
    },
    jsbeautifier: {
      beautify: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/*.js', '*.js'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      check: {
        src: ['Gruntfile.js', 'lib/*.js', 'test/*.js', '*.js'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    run: {
      test: {
        exec: 'npx jest'
      },
      coverage: {
        exec: 'npx jest --coverage'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '127.0.0.1'
        }
      }
    }
  });

  grunt.registerTask('beautify', ['jsbeautifier:beautify']);
  grunt.registerTask('test', ['run:test']);
  grunt.registerTask('gen-change-detect', 'generates files to detect changes in generation', function () {
    generateChangeDetectionFiles(grunt);
  });

  grunt.registerTask('default', ['beautify', 'jshint', 'test', 'gen-change-detect']);

  grunt.registerTask('commit', ['jshint', 'test']);
  grunt.registerTask('timestamp', function () {
    grunt.log.subhead(Date());
  });
};
