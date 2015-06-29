'use strict';

var urlParser = require('url').parse;

//FIXME: these should probably be exported for programatic consumption
var defaultPort = 6379;
var defaultHost = '127.0.0.1';

function simpleRedisFactory(redisModule, opts){

    var url;
    var client;

    //FIXME: not sure this the best way to really test this
    if (typeof opts === 'string') {
        opts = {
            url: opts
        };
    }

    opts = opts || {};

    if (!opts.url) {
        opts.port = opts.port || defaultPort;
        opts.host = opts.host || defaultHost;
    } else {
        url = urlParser(opts.url);
        opts.port = url.port || defaultPort;
        opts.host = url.hostname || defaultHost;

        if (url.auth) {
          opts.password = url.auth.split(':')[1];
        }
    }

    opts.opts = opts.opts || null;

    client = redisModule.createClient(opts.port, opts.host, opts.opts);


    if (opts.password){
        client.auth(opts.password);
    }

}

module.exports = simpleRedisFactory;

//Yeah - this function name is really just comedy value
function simpleRedisFactoryFactory(redisModule){

    return function factoryFactory(opts){
        simpleRedisFactory(redisModule, opts);
    };

}

module.exports.factory = simpleRedisFactoryFactory;
