'use strict';
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

const
  
  async = require('async'),
  file = require('file'),
  rdfParser = require('./lib/rdf-parser.js'),
  
  work = async.queue(function(path, done) {
    rdfParser(path, function(err, doc) {
      console.log(doc);
      done();
    });
  }, 1000);

console.log('beginning directory walk');
file.walk(__dirname + '/cache', function(err, dirPath, dirs, files){
  files.forEach(function(path){
    if (!path.endsWith('.DS_Store')) {
        work.push(path);
    }
  });
});