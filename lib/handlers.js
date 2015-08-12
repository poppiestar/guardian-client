
var _ = require('underscore');
var activities = require('./activities');

function login (email, password) {
    return 'poppiestar95';
}

function getStatus (username) {
    return {
        username: 'poppiestar95',
        system: 'psn',
        status: 'Looking for a Black Hammer, Crota NM anyone?',
        activities: [
            'poe:32',
            'crucible:trials',
            'raid:vog:30',
            'weekly:nightfall'
        ]
    };
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
    reply.view('dashboard', { activities: activities, status: getStatus() });
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

    reply.view('dashboard', getStatus());
};

exports.statusPost = function (request, reply) {
    // put a status on the server, will replace an existing one
    reply(request.payload);
};

exports.setup = function (request, reply) {
    reply.view('setup');
};

