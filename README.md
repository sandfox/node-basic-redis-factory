# Basic Redis Factory

A module that should make creating redis client instances from connection strings much easier.
It does not require/install `redis` itself so the user can decide what version to load.

This module operates "synchronously" so you have an opportunity to attach event listeners to the redis client in the same 
cycle of the event loop as the one where the client is created.

_This is a first draft and I'm open to renaming things and changing arguement structures etc._
_Yes, I realise this should probably be called a redis client factory but thats not quite as catchy and I didn't realise that at the time_

Major Props / big shout / thanks to [Jose-Luis Rivas / ghostbar](https://github.com/ghostbar) for writing the majority
of the option parsing code that I've basically just extracted into a module.

## Example

also see the `/examples` folder for working demos

```javascript

var redisFactory = require('basic-redis-factory');
var redis = require('redis');

var connectionUrl = 'redis://user:mypassword@192.168.10.10:3444'

//either

var client = redisFactory(redis, connectionUrl)

// or if you want to bind a the factory function to a redis module in one place
// and call the factory in another

var myFactory = redisFactory.factory(redis);
// and then somewhere else maybe...
var client = myFactory(opts);


//do some userland stuff like attach event listeners
client.on('error', myErrorHandler)

```

## API

The main export is a function that constructs the redis client

```javascript
var redisFactory = require('basic-redis-factory');
var client = redisFactory(redis, opts);
```

it's arguments are 
- `redis`: the redis module to use
- `opts` : either a url connection string or an object

if opts is an object then the factory will look for the following keys on the object
and fallback to defaults for any missing values (host: `127.0.01`, port: `6379`, no authentication).

- `url` : a url connection string.
- `host`: the host to connect to.
- `port`: the port to connect to.
- `password`: the password to authenticate with, if not supplied then no auth will applied.
- `opts`: an options object as expected by [`redis.createClient`](https://github.com/mranney/node_redis#rediscreateclient).

If `opts.url` is supplied then `opts.host`, `opts.port`, and `opts.password` keys will be ignored.


A `factory` function is available on the main export. This function allows you have a factory instance that is bound to a redis module.

```javascript
var redis = require('redis');
var redisFactory = require('basic-redis-factory').factory(redis);
var client = redisFactory(opts);
```

This maybe useful to you if you wish to bind the factory to a particular redis module at some point in your app, so that other parts of your application can use the factory and just supply a configuration.

## TODO

- Add some tests!

## Fixes, Improvements, Suggestion

I'm open to any and all fixes, changes, improvements, questions in whatever format suits you. Feel free to open a PR, or an issue, reach me on twitter, email or on any other medium that you are comfortable with.

While this repo has no CoC right now, lets all just assume it does and play nicely. Abusive behaviour will not be tolerated.
If you see something you don't like, please do tell me, or if you aren't comfortable doing that yourself I'll understand if you get someone else to do it on your behalf.

## License

MIT