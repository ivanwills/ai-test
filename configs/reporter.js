// Taken from https://github.com/adalbertoteixeira/jest-bamboo-formatter
// Rather include it here as one off commit than having to download an other package.

var fs = require('fs-extra');
var path = require('path');

var filename = process.env.JEST_FILE || path.join('tmp', 'test-results.json');

var output = {
  stats: {},
  failures: [],
  passes: [],
  skipped: []
};

function format(result) {
  var formatted = '';
  var msg = [];

  if (result.length === 1) {
    formatted = '1 failure: \n';
  } else {
    formatted = result.length + ' failures: \n';
  }

  result.forEach(function iterator(message, index) {
    msg.push(index + 1 + ' failed: ' + message);
  });

  formatted += msg.join('\n');

  return formatted;
}

module.exports = function reporter(results) {
  output.stats.tests = results.numTotalTests;
  output.stats.passes = results.numPassedTests;
  output.stats.failures = results.numFailedTests;
  output.stats.duration = Date.now() - results.startTime;
  output.stats.start = new Date(results.startTime);
  output.stats.end = new Date();

  results.testResults.forEach(function suiteIterator(suiteResult) {
    suiteResult.testResults.forEach(function testIterator(testResult) {
      if (testResult.status === 'passed') {
        output.passes.push({
          title: testResult.title,
          fullTitle: testResult.ancestorTitles + ' ' + testResult.title,
          duration: suiteResult.perfStats.end - suiteResult.perfStats.start,
          errorCount: testResult.failureMessages.length
        });
      } else if (testResult.status === 'failed') {
        output.failures.push({
          title: testResult.title,
          fullTitle: testResult.ancestorTitles + ' ' + testResult.title,
          duration: suiteResult.perfStats.end - suiteResult.perfStats.start,
          errorCount: testResult.failureMessages.length,
          error: format(testResult.failureMessages)
        });
      } else if (testResult.status === 'pending') {
        output.skipped.push({
          title: testResult.title,
          fullTitle: testResult.ancestorTitles + ' ' + testResult.title,
          duration: suiteResult.perfStats.end - suiteResult.perfStats.start,
          errorCount: testResult.failureMessages.length
        });
      }
    });
  });

  fs.ensureFileSync(filename);
  fs.writeFileSync(filename, JSON.stringify(output, null, 2), 'utf-8');
  return results;
};
