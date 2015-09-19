Meteor.methods({
    'test': function(){
        console.log("CALLED");
        return Meteor.settings.twitterKey;
    },
    'test2': function(){
        console.log("CALLED");
        return 'second workingkjkkjk';
    }
});