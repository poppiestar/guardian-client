
var Path = require('path');
var Hapi = require('hapi');

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
    helpersPath: Path.join(__dirname, 'views', 'helpers'),
    layout: true,
    isCached: false,
    partialsPath: Path.join(__dirname, 'views', 'partials')
});

server.route(require('./lib/routes'));

server.register([{
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
        }
    },
    {
        register: require('hapi-mongodb'),
        options: {
            url: "mongodb://localhost:27017/guardians",
            settings: {
                db: {
                    native_parser: false
                }
            }
        }
    }], 
    function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        console.log('Server running at: %d', server.info.port);
    });
});

