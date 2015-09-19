T = null;
datum = null;
Meteor.startup(function(){
    datum = Meteor.npmRequire('datumbox').factory(config.datumbox.api_key);
    var Twit = Meteor.npmRequire('twit');
    T = new Twit({
        consumer_key: config.twitter.consumer_key, // API key
        consumer_secret: config.twitter.consumer_secret, // API secret
        access_token: config.twitter.access_token,
        access_token_secret: config.twitter.access_token_secret
    });
    console.log(T);
    var query = {
        q: 'barak obama',
        count: 100
    };
    //T.get('search/tweets', query, function(err, data, response) {
    //    if (data) {
    //        var tweets = data.statuses;
    //        for (var i = 0; i < tweets.length; i++) {
    //             console.log(tweets[i].text);
    //        }
    //    }
    //});
});