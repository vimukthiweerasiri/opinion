Template.segment.onCreated = function () {
    console.log(Template.currentData(), 'reREndering');
    this._name = name;
}

Template.segment.helpers({
    'name': function () {
        return Template.currentData().toUpperCase();
    },
    'result': function () {
        return {bad: 12, neutral:34, good:45};
    }
});