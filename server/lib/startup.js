Meteor.startup(function(){
    APP.init();
    APP.analyze('sujeewa senasinghe', function (err, result, where) {
        console.log(result, where);
    });
});