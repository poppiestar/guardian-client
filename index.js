
var Path = require('path');
var Hapi = require('hapi');
var Good = require('good');
var _ = require('underscore');

var allActivities = require('./activities');

var server = new Hapi.Server();

server.connection({ port: 4000 });

server.views({
    engines: {
        'hbs': {
            module: require('handlebars'),
            compileMode: 'sync'
        }
    },
    relativeTo: __dirname,
    path: Path.join(__dirname, 'views'),
    layoutPath: Path.join(__dirname, 'views', 'layout'),
    layout: true,
    isCached: false,
    partialsPath: Path.join(__dirname, 'views', 'partials')
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'POST',
    path: '/login',
    handler: function (request, reply) {
        // on success, get user status

        // redirect to dashboard if status exists,
        // redirect to start wizard if status doesn't exist
        reply.view('login');
    }
});

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

server.route({
    method: 'GET',
    path: '/dashboard',
    handler: function (request, reply) {
        reply.view('dashboard', {
            username: 'poppiestar95',
            status: 'Looking for a Black Hammer, Crota NM anyone?',
            activities: prepareActivities({
                'poe:32': true,
                'crucible:trials': true,
                'raid:vog:30': true,
                'weekly:nightfall': true
            })
        });
    }
});

server.route({
    method: 'GET',
    path: '/css/{param*}',
    handler: {
        directory: {
            path: 'public/css'
        }
    }
});

server.route({
    method: 'GET',
    path: '/js/{param*}',
    handler: {
        directory: {
            path: 'public/js'
        }
    }
});

server.route({
    method: 'GET',
    path: '/status/{system}/{username}',
    handler: function (request, reply) {
        // query the db and find the user 

        reply.view('dashboard', {
            username: 'poppiestar95',
            status: 'Looking for a Black Hammer, Crota NM anyone?',
            activities: prepareActivities({
                'raid:vog:': true,
                'nightfall': false
            })
        });
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        console.log('Server running at: %d', server.info.port);
    });
});


