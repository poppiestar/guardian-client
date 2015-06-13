
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({

    tagName: 'div',

    id: 'thingy',

    initialize: function () {
        $('body').html(this.el);
        this.render();
    },

    render: function () {
        this.$el.html('<h1>This is a test</h1>');
    }

});

