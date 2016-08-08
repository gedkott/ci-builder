var test = require('tape');

var CiBuilder = require('../src/ci-builder');

test('functional initialization phase: it reads the contexts.json from the \
file and sets all contexts to pending on \
the corresponding github repo', function(t) {
    try {
      var ciBuilder = CiBuilder.init();
    } catch (error) {
      console.error(error);
    }
    ciBuilder
        .then(function(res) {
            // Read status from repo
            console.log(res);
            t.end();
        }).catch(function(error) {
            t.fail(error);
            t.end();
        });
});
