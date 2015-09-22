Template.work.events({
    "click #submit": function (event, template) {
        var newName = $("#inputName").val();
        newName = newName.toLowerCase();
        $("#inputName").val("");
        var names = Session.get("names");
        if (newName !== "" && !_.contains(names, newName)) {
            names.unshift(newName);
            Session.set("names", names);
        }
    }
});

Template.work.helpers({
    'names': function () {
        return Session.get("names");
    },
    'twitterError': function () {
        return Session.get('__TwitterError');
    },
    'datumError': function () {
        return Session.get('__DatumError');
    }
});