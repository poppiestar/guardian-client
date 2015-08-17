
var _ = require('underscore');
var activities = require('./activities');

function login (email, password) {
    return 'poppiestar95';
}

function getStatus (request, username, system, callback) {
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('statuses').findOne({ 'username': username, 'system': system }, function (err, result) {
        if (err) return reply(Boom.internal('Internal MongoDB error', err));

        callback(result);
    });
}

function normaliseStatus (status) {
    if ( typeof status.activities === 'string' ) {
        status.activities = [status.activities];
    }

    if ( !status.hasOwnProperty('activities') ) {
        status.activities = [];
    }

    return status;
}

exports.index = function (request, reply) {
    return reply.view('index');
};

exports.login = function (request, reply) {
    // on success, get user status
    var username = login(request.payload.email, request.payload.password);

    if ( username ) {
        getStatus(request, username, request.payload.system, function (status) {
            request.auth.session.set({
                username: status.username,
                system: status.system
            });

            if ( status ) {
                // redirect to dashboard if status exists,
                return reply.redirect('dashboard');
            } else {
                // redirect to start wizard if status doesn't exist
                return reply.redirect('setup');
            }
        });
    } else {
        return reply.view('login');
    }
};

exports.logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
};

exports.dashboard = function (request, reply) {
    // only allow access to this page if authenticated
    var db = request.server.plugins['hapi-mongodb'].db;

    getStatus(request, request.auth.credentials.username, request.auth.credentials.system, function (result) {
        return reply.view('dashboard', { activities: activities, status: result });
    });
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
    getStatus(request, request.params.username, request.params.system, function (result) {
        return reply.view('dashboard', { activities: activities, status: result });
    });
};

exports.statusPost = function (request, reply) {
    // put a status on the server, will replace an existing one
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('statuses').update(
        { username: request.payload.username, system: request.payload.system },
        { $set: normaliseStatus(request.payload) }
    ,
    function (err, result) {
        if (err) return reply(Boom.internal('Internal MongoDB error', err));

        return reply.redirect('/dashboard');
    });
};

exports.setup = function (request, reply) {
    return reply.view('setup');
};

