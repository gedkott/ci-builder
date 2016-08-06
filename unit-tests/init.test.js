var test = require('tape');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var contextsManagerMock = {
    load: sinon.spy(function() {
        return Promise.resolve({
            "contexts": {
                "ci/test-js": "npm test",
                "ci/build-js": "npm build"
            },
            "githubRepo": "https://gedalia.kott"
        });
    })
};

var githubApiMock = {
    setContextToPending: sinon.spy(function(githubRepo, context) {
        return Promise.resolve();
    })
};

var CiBuilder = proxyquire('../src/ci-builder', {
    './github-api': githubApiMock,
    './contexts-manager': contextsManagerMock
});

test('unit initialization phase: it reads the contexts.json from the \
file and sets all contexts to pending on \
the corresponding github repo', function(t) {
    var ciBuilder = CiBuilder.init();
    t.ok(ciBuilder instanceof Promise, 'ciBuilder should return a promise');
    ciBuilder.then(function() {
        t.ok(contextsManagerMock.load.calledOnce, 'Contexts manager should be called to load data about contexts');
        t.ok(githubApiMock.setContextToPending.calledWith('https://gedalia.kott', "ci/test-js"), 'Context shoud be set to pending');
        t.ok(githubApiMock.setContextToPending.calledWith('https://gedalia.kott', "ci/build-js"), 'Context shoud be set to pending');
        t.ok(githubApiMock.setContextToPending.calledTwice, 'Github api should be called for every context loaded');
        t.end();
    }).catch(function(error) {
        t.fail(error);
        t.end();
    });
});
