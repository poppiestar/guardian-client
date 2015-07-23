
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
    path: Path.join(__dirname, 'views'),
    layoutPath: Path.join(__dirname, 'views', 'layout'),
    layout: true,
    isCached: false,
    partialsPath: Path.join(__dirname, 'views', 'partials')
});

server.route(require('./lib/routes'));

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

