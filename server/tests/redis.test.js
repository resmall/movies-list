const dotenv = require('dotenv');
dotenv.config()
const cache = require('../src/infra/cache/redis');

test('should set a key in the cache', async () => {
    await cache.set('teste', 'valorteste')
    let val = await cache.get('teste');
    expect(val).toEqual('valorteste');
});
