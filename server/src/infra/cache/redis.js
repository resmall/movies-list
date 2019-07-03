const redis = require('redis');
const util = require('util')
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.getAsync = util.promisify(client.get)
client.mgetAsync = util.promisify(client.mget)
client.setAsync = util.promisify(client.set)

client.on('error', (err) => {
    console.error('Redis error.', err);
});

exports.get = (key) => {
    return client.getAsync(key);
}

exports.getMany = async (keys) => {
    return await client.mgetAsync(keys);
}

exports.set = async (key, value) => {
    return await client.setAsync(key, value);
}