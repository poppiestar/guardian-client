
var _ = require('underscore');

module.exports = function (activities, activity) {
    return _.contains(activities, activity) ? 'checked' : undefined;
};

