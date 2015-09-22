var context = null;
Template.segment.created = function () {
    var name = Template.currentData();
    Meteor.call('analyze', name, function (err, result) {
        Session.set(name, result);
    });
}


Template.segment.helpers({
    'name': function () {
        return Template.currentData().toUpperCase();
    },
    'result': function () {
        var name = Template.currentData();
        if (Session.get(name)) {
            var result = Session.get(name);

            if(Object.keys(result).length === 0) {
                showNoSufficientInfo();
                return null;
            }
            var total = result.negative + result.neutral + result.positive;
            if(total === 0) {
                showNoSufficientInfo();
                return null;
            }
            var positive = Math.ceil((result.positive * 100) / total);
            var negative = Math.ceil((result.negative * 100) / total);
            var neutral = 100 - positive - negative;
            return {negative: negative, neutral: neutral, positive: positive};
        }
         else{
            return null;
        }
    }
});
var showNoSufficientInfo = function () {
    
}