
var Backbone = require('backbone');
var _ = require('underscore');

var template = require('../templates/Layout.html');

module.exports = Backbone.View.extend({

    el: 'body',

    template: _.template(template),

    initialize: function () {
        console.log('layout init');
    },

    regions: {},

    render: function () {
        this.$el.html(this.template());

        this.regions['content'] = this.$el.find('#content');
        
        console.log(this.el);
        return this;
    }

});

