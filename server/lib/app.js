APP = {};

var DATUM = null;
var TWITTER = null;

var initTwitter = function () {
    var Twit = Meteor.npmRequire('twit');
    TWITTER = new Twit({
        consumer_key: config.twitter.consumer_key, // API key
        consumer_secret: config.twitter.consumer_secret, // API secret
        access_token: config.twitter.access_token,
        access_token_secret: config.twitter.access_token_secret
    });

    if (TWITTER) {
        console.info("TWITTER loaded")
    } else {
        console.error("TWITTER loading FAILED")
    }
}

var initDatum = function () {
    DATUM = Meteor.npmRequire('datumbox').factory(config.datumbox.api_key);
    if (DATUM) {
        console.info("DATUM loaded")
    } else {
        console.error("DATUM loading FAILED")
    }
}

APP.init = function () {
    //initDatum();
    initTwitter();
}

APP.analyze = function (name) {
    var query = {
        q: name,
        count: 100,
        lang: 'en',
        result_type: 'recent'

    };
    TWITTER.get('search/tweets', query, function(err, data, response) {
        if (data) {
            var tweets = data.statuses;
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}
