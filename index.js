
var Path = require('path');
var Hapi = require('hapi');
var Good = require('good');

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
        reply.view('login');
    }
});

server.route({
    method: 'GET',
    path: '/dashboard',
    handler: function (request, reply) {
        reply.view('dashboard');
    }
});

server.route({
    method: 'GET',
    path: '/{system}/{username}',
    handler: function (request, reply) {
        reply.view('status');
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
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


