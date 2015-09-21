Template.segment.created = function () {
    var name = Template.currentData();
    $("#statistics").hide();
    Meteor.call('analyze', name, function (err, result) {
        console.log(result, 'CAME');
        Session.set(name, result);
    })
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
                return {negative: 0, neutral:0, positive:0};
            }
            var total = result.negative + result.neutral + result.positive;
            if(total === 0) {
                showNoSufficientInfo();
                return {negative: 0, neutral:0, positive:0};
            }
            $("#loading").hide();
            $("#statistics").show();
            var positive = Math.ceil((result.positive * 100) / total);
            var negative = Math.ceil((result.negative * 100) / total);
            var neutral = 100 - positive - negative;
            console.log({negative: negative, neutral: neutral, positive: positive});
            return {negative: negative, neutral: neutral, positive: positive};
        }
         else{
            return {negative: 0, neutral:0, positive:0};
        }
    }
});

var showNoSufficientInfo = function () {
    
}