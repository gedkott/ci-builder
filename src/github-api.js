var GitHubApi = require("github");

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

module.exports = {
  setContextToPending: function(githubRepo, context) {
    return new Promise(function(resolve, reject) {
      github.repos.createStatus({
        user:
        repo: githubRepo,
        sha: sha,
        state: 'pending',
        target_url: 'FILL THIS IN',
        description: 'FILL THIS IN',
        context: context
      });
    });
  }
}
