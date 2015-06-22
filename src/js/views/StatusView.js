
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = require('jquery');

var template = require('../templates/Status.html');

var data = {
    username: 'poppiestar95',
    available: true,
    status: 'Looking for Word of Crota, anyone up for a Crota HM?',
    friends: ['remybach_uk', 'heyminin']
};

module.exports = Backbone.View.extend({

    id: 'guardianStatus',

    template: _.template(template),

    render: function () {
        this.$el.html(this.template(data));

        return this;
    }

});

