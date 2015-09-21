Template.work.events({
    "click #submit": function (event, template) {
        var newName = $("#inputName").val();
        $("#inputName").val("");
        var names = Session.get("names");
        if (newName !== "" && !_.contains(names, newName)) {
            names.unshift(newName);
            //names.push(newName);
            Session.set("names", names);
        }
    }
});

Template.work.helpers({
    'names': function () {
        return Session.get("names");
    }
});