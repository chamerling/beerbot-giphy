'use strict';

var DEFAULT_TERM = 'beer';

module.exports = function(bot, options) {

  function getGif(term) {
    var defer = bot.q.defer();

    term = term || DEFAULT_TERM;

    bot.request({
      method: 'GET',
      uri: 'http://api.giphy.com/v1/gifs/translate',
      qs: {
        s: term,
        api_key: 'dc6zaTOxFJmzC'
      },
      json: true
    }, function(err, response, body) {
      if (err) {
        return defer.reject(err);
      }

      if (response.statusCode !== 200) {
        return defer.reject(new Error('Bad response code' + response.statusCode));
      }

      return defer.resolve(body.data.images.fixed_height.url);
    });

    return defer.promise;
  }

  function handle() {
    return getGif(options.term);
  }

  bot.listen(options.match || DEFAULT_TERM, options, handle);
};
