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
        this.unblock();
        console.log('this is the result', APP.analyze(name));
    }
});