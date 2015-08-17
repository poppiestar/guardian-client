
var Handlers = require('./handlers');
var Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: Handlers.index
    },
    {
        method: 'POST',
        path: '/login',
        handler: Handlers.login,
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                    system: Joi.string().required().valid(['psn', 'xbl'])
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/dashboard',
        handler: Handlers.dashboard,
        config: {
            auth: 'session'
        }
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
        handler: Handlers.status,
        config: {
            validate: {
                params: {
                    system: Joi.string().required().valid(['psn', 'xbl']),
                    username: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/status/{system}/{username}',
        handler: Handlers.statusPost,
        config: {
            auth: 'session',
            validate: {
                params: {
                    system: Joi.string().required().valid(['psn', 'xbl']),
                    username: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/setup',
        handler: Handlers.setup
    }
];

