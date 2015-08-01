
var _ = require('underscore');
var allActivities = require('./activities');

function login (email, password) {
    return 'poppiestar95';
}

function getStatus (username) {
    return false;
    /*
    return {
        username: 'poppiestar95',
        status: 'Looking for a Black Hammer, Crota NM anyone?',
        activities: prepareActivities({
            'poe:32': true,
            'crucible:trials': true,
            'raid:vog:30': true,
            'weekly:nightfall': true
        })
    };
    */
}

function prepareActivities (guardian) {
    var activities = _.map(allActivities, function (activity) {
        var updated = {
            name: activity.name,
            id: activity.id
        };

        if (activity.items && _.isArray(activity.items)) {
            updated.collection = true;
            updated.items = _.map(activity.items, function (item) {
                var thingy = {
                    name: item.name,
                    id: item.id
                };

                if (item.items && _.isArray(item.items) ) {
                    thingy.collection = true;
                    thingy.items = _.map(item.items, function (last) {
                        return {
                            name: last.name,
                            id: last.id,
                            available: guardian.hasOwnProperty(last.id) ? guardian[last.id] : false
                        };
                    });
                } else {
                    thingy.available = guardian.hasOwnProperty(item.id) ? guardian[item.id] : false;
                }

                return thingy;
            });
        }

        return updated;
    });

    return activities;
}

exports.index = function (request, reply) {
    reply.view('index');
};

exports.login = function (request, reply) {
    // on success, get user status
    var username = login(request.payload.email, request.payload.password );

    if ( username ) {
        var status = getStatus(username);

        if ( status ) {
            // redirect to dashboard if status exists,
            reply.redirect('dashboard');
        } else {
            // redirect to start wizard if status doesn't exist
            reply.redirect('setup');
        }
    } else {
        reply.view('login');
    }
};

exports.dashboard = function (request, reply) {
    // only allow access to this page if authenticated
    reply.view('dashboard', getStatus());
};

exports.css = {
    directory: {
        path: 'public/css'
    }
};

exports.js = {
    directory: {
        path: 'public/js'
    }
};

exports.status = function (request, reply) {
    // query the db and find the user 

    reply.view('dashboard', {
        username: 'poppiestar95',
        status: 'Looking for a Black Hammer, Crota NM anyone?',
        activities: prepareActivities({
            'raid:vog:': true,
            'nightfall': false
        })
    });
};

exports.statusPost = function (request, reply) {
    // put a status on the server, will replace an existing one
};

exports.setup = function (request, reply) {
    reply.view('setup');
};

