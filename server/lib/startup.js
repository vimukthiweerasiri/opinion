Meteor.startup(function(){
    APP.init();
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