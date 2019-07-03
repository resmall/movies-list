const getGenres = require('./get-genres');
const cache = require('../infra/cache/redis');

module.exports = async () => {
    // Get from the API.
    console.log('reloading cache')
    let genres = await getGenres();

    await Promise.all(genres.map(({id, name}) => {
        console.log('cache set', id, name)
        cache.set(id, name);
    }));
}