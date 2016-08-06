var fs = require('fs');
var path = require('path');

module.exports = {
  load: function() {
    return new Promise(function(resolve, reject) {
      // TODO(gedkott): I just assume that for now the system must be run from the root of the project
      fs.readFile(path.resolve(process.cwd(), 'contexts.json'), function(error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(JSON.parse(data.toString()));
      });
    });
  }
}
