
var Path = require('path');
var Hapi = require('hapi');
var Good = require('good');

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
    path: Path.join(__dirname, 'views')
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
    var activities = [];

    for (var activity in allActivities) {
        var thing = allActivities[activity];

        activities.push({
            name: thing.name,
            id: thing.id,
            available: guardian.hasOwnProperty(thing.id) ? guardian[thing.id] : false
        });
    }

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
                'patrol': true,
                'nightfall': false
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
        reply.view('status');
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


