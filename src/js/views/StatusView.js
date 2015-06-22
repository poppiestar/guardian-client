
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/Status.html');

var FriendView = require('./FriendView');

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
        var friendsList = this.$el.find('ul');

        _.each(data.friends, function (friend) {
            var friendView = new FriendView(friend);
            friendsList.append(friendView.render().el);
        });

        return this;
    }

});

