
var Handlers = require('./handlers');


module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: Handlers.index
    },
    {
        method: 'POST',
        path: '/login',
        handler: Handlers.login
    },
    {
        method: 'GET',
        path: '/dashboard',
        handler: Handlers.dashboard
    },
    {
        method: 'GET',
        path: '/css/{param*}',
        handler: Handlers.css
    },
    {
        method: 'GET',
        path: '/js/{param*}',
        handler: Handlers.js
    },
    {
        method: 'GET',
        path: '/status/{system}/{username}',
        handler: Handlers.status
    }
];

