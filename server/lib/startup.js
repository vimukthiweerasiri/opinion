Meteor.startup(function(){
    APP.init();
    APP.analyze('mahinda rajapakshe', function (err, result, where) {
        console.log(result, where);
    });
});