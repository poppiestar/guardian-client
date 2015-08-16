
var _ = require('underscore');
var activities = require('./activities');

function login (email, password) {
    return 'poppiestar95';
}

function getStatus (request, username, callback) {
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('statuses').findOne({ 'username': username }, function (err, result) {
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
    reply.view('index');
};

exports.login = function (request, reply) {
    // on success, get user status
    var username = login(request.payload.email, request.payload.password);

    if ( username ) {
        getStatus(request, username, function (status) {
            if ( status ) {
                // redirect to dashboard if status exists,
                reply.redirect('dashboard');
            } else {
                // redirect to start wizard if status doesn't exist
                reply.redirect('setup');
            }
        });
    } else {
        reply.view('login');
    }
};

exports.dashboard = function (request, reply) {
    // only allow access to this page if authenticated
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('statuses').findOne({ 'username': 'poppiestar95' }, function (err, result) {
        if (err) return reply(Boom.internal('Internal MongoDB error', err));

        reply.view('dashboard', { activities: activities, status: result });
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

    reply.view('dashboard', getStatus());
};

exports.statusPost = function (request, reply) {
    // put a status on the server, will replace an existing one
    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('statuses').update(
        { username: request.payload.username },
        { $set: normaliseStatus(request.payload) }
    ,
    function (err, result) {
        if (err) return reply(Boom.internal('Internal MongoDB error', err));

        reply.redirect('/dashboard');
    });
};

exports.setup = function (request, reply) {
    reply.view('setup');
};

