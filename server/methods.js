Meteor.methods({
    'analyze': function (name) {
        this.unblock();
        return APP.analyze(name);
    }
});
