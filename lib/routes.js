
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
            validate: {
                params: {
                    system: Joi.string().required().valid(['psn', 'xbl']),
                    username: Joi.string().required()
                }
            }
        }
    }
];

