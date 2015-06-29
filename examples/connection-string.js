var redisFactory = require('../'); // 'basic-redis-factory'
var redis = require('redis'); // you'll need to install this for the example to work
 
var connectionUrl = 'redis://127.0.0.1:6379'

var client = redisFactory(redis, connectionUrl)

//do some userland stuff like attach event listeners 
client.on('ready', function(){
    console.log('connected successfuly');
    process.exit(0)
})

client.on('error', function(err){
    console.log('something went wrong')
    console.log(err);
    process.exit(1);
})