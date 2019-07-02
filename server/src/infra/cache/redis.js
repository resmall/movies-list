const redis = require('redis');
const util = require('util')
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.getAsync = util.promisify(client.get)
client.mgetAsync = util.promisify(client.mget)
client.setAsync = util.promisify(client.set)

// client.on('connect', function(){
//     console.log('Redis connection is up');
// });

exports.get = async (key) => {
    return await client.getAsync(key);
}

exports.getMany = async (keys) => {
    return await client.mgetAsync(keys);
}

exports.set = async (key, value) => {
    return await client.setAsync(key, value);
}