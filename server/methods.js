Meteor.methods({
    'test': function(){
        console.log("CALLED");
        return Meteor.settings.twitterKey;
    },
    'test2': function(){
        console.log("CALLED");
        return 'second workingkjkkjk';
    },
    'analyze': function (name) {
        //this.unblock();
        //var ttt = APP.analyze(name);
        //console.log(ttt);
        //return ttt;
        return abc();
    }
});

var abc = function () {
    var ttt = function (callback) {
        setTimeout(function () {
            callback(null, {negative: 4, neutral:5+ (Math.random() * 10), positive:8});
        }, 5000);
    }
    var TTT = Meteor.wrapAsync(ttt);
    return TTT();
}
