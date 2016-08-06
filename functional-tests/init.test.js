var test = require('tape');

var CiBuilder = require('../src/ci-builder');

test('functional initialization phase: it reads the contexts.json from the \
file and sets all contexts to pending on \
the corresponding github repo', function(t) {
    var ciBuilder = CiBuilder.init();
    ciBuilder
        .then(function() {
            // Read status from repo
            t.end();
        }).catch(function(error) {
            t.fail(error);
            t.end();
        });
});
