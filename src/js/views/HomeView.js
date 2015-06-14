
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var template = require('../templates/Home.html');

module.exports = Backbone.View.extend({

    el: '#body',

    template: _.template(template),

    initialize: function () {
        $('body').html(this.el);
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
    }

});

