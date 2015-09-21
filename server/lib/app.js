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

var getTweets = function (name) {
    var getTweetsAsync = function (name, callBack) {
        var query = {
            q: name,
            count: 100,
            lang: 'en',
            result_type: 'recent'

        };
        TWITTER.get('search/tweets', query, function(err, data) {
            callBack(null, {err: err, data: data});
        });
    }

    var wrappedGetTweetAsync = Meteor.wrapAsync(getTweetsAsync);
    return wrappedGetTweetAsync(name);
}

var updateWithSentiment = function (tweets, callback) {
    var count = tweets.length;
    var positive = 0, negative = 0, neutral = 0;
    console.log(count);
    tweets.forEach(function (tweetInfo, index) {
        var tweet = tweetInfo.text;

        var cachedSentiment = SentimentCache.findOne({tweet: tweet}, {fields: {sentiment: 1, _id: 0}});
        if (cachedSentiment) {
            switch (cachedSentiment.sentiment) {
                case 1: positive++; break;
                case 0: neutral++; break;
                case -1: negative++; break;
            }
            count--;
            console.log('FROM CACHE');
            if(count == 0) {
                console.log('FINISHED UP')
                callback(null, {positive: positive, neutral: neutral, negative: negative});
            }
        } else {
            DATUM.twitterSentimentAnalysis(tweet, Meteor.bindEnvironment(function(err, resultSentiment) {
                var result = -2;
                switch (resultSentiment){
                    case 'positive': result = 1; positive++; break;
                    case 'neutral': result = 0; neutral++; break;
                    case 'negative': result = -1;negative++; break;
                }
                SentimentCache.insert({tweet: tweet, sentiment: result});
                count--;
                console.log('FROM DATUM');
                if (count == 0) {
                    console.log("FINISHED DOWN");
                    callback(null, {positive: positive, neutral: neutral, negative: negative});
                }
            }));
        }
    });
}

var getRecentlyUpdatedInfo = function (name) {
    var now = new Date().getTime();
    var timeAgo = 1000 * config.settings.cacheLimitInSeconds;

    var previous  = ResultsCache.findOne(
        {$and: [{name: name}, {lastUpdated: {$gt: new Date(now - timeAgo)}}]},
        {fields: {_id: 0, result: 1}}
    );
    return previous ? previous.result : previous;
}

APP.init = function () {
    initDatum();
    initTwitter();
}

APP.analyze = function (name) {
    var syncAnalyze = Meteor.wrapAsync(analyze);
    return syncAnalyze(name);
}

var analyze = function (name, callback) {
    console.log('STARTED')
    var recentInfo = getRecentlyUpdatedInfo(name);
    if (recentInfo) {
        callback(null, recentInfo);
        return;
    }
    var tweetData= getTweets(name);
    if(!tweetData.err && tweetData.data.statuses.length > 0) {
        var tweets = tweetData.data.statuses;

        updateWithSentiment(tweets, function (err, result) {
            ResultsCache.upsert({name: name}, {$set: {result: result, lastUpdated: new Date()}});
            callback(null, result);
        });

    } else {
        //console.log('no data || Error:', tweetData.err);
        callback(null, {});
    }
}


