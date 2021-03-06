
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/Status.html');
var GuardianModel = require('../models/GuardianModel');
var FriendView = require('./FriendView');

module.exports = Backbone.View.extend({

    id: 'guardianStatus',

    template: _.template(template),

    initialize: function () {
        this.model = new GuardianModel({
            username: 'poppiestar95',
            available: true,
            status: 'Hunting for Word of Crota, anyone fancy Crota HM?',
            friends: ['remybach_uk', 'heyminin']
        });
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        var friendsList = this.$el.find('ul');

        _.each(this.model.get('friends'), function (friend) {
            var friendModel = new GuardianModel({
                username: friend
            });
            var friendView = new FriendView({
                model: friendModel
            });
            friendsList.append(friendView.render().el);
        });

        return this;
    }

});

