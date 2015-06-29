# Basic Redis Factory

A module that should make creating redis client instances from connection strings much easier.
It does not require/install `redis` itself so the user can decide what version to load.


_This is a first draft and I'm open to renaming things and changing arguement structures etc._

Major Props / big shout / thanks to [Jose-Luis Rivas / ghostbar](https://github.com/ghostbar) for writing the majority
of the option parsing code that I've basically just wrapped into a module.

## Example

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
```

## API

The main export is a function that constructs the redis client

```javascript
var redisFactory = require('basic-redis-factory');
var client = redisFactory(redis, opts);
```

it's arguements are 
- `redis`: the redis module to use
- `opts` : either a url connection string or an object

if opts is an object then the factory will look for for following keys on the object
and if they are not found fallback to defaults
- `host`: the host to connect to (default '127.0.0.1').
- `port`: the port to connect to (default `6379`).
- `password`: the password to authenticate with, if not supplied then no auth will applied.
- `opts`: an options object as expected by [`redis.createClient`](https://github.com/mranney/node_redis#rediscreateclient).



A `factory` function is available on the main export. This function allows you have a factory instance that is bound to a redis module.

```javascript
var redis = require('redis');
var redisFactory = require('basic-redis-factory').factory(redis);
var client = redisFactory(opts);
```

This maybe useful to you if you wish to bind the factory to a particular redis module at some point in your app, so that other parts of your application can use the factory and just supply a configuration.

## Fixes, Improvements, Suggestion

I'm open to any and all fixes, changes, improvements, questions in whatever format suits you. Feel free to open a PR, or an issue, reach me on twitter, email or on any other medium that you are comfortable with.

While this repo has no CoC right now, lets all just assume it does and play nicely. Abusive behaviour will not be tolerated.
If you see something you don't like, please do tell me, or if you aren't comfortable doing that yourself I'll understand if you get someone else to do it on your behalf.

## License

MIT