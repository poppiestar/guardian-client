
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'li',

    className: 'friend',

    initialize: function (name) {
        this.name = name;
    },

    render: function () {
        this.$el.html(this.name);

        return this;
    }

});

