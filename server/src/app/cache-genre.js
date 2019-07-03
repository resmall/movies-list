const cache = require('../infra/cache/redis');
const { findAllGenres } = require('../infra/db/genreRepository');

module.exports = async () => {
    let genres = await findAllGenres();

    await Promise.all(genres.map(({id, name}) => {
        console.log('cache set', id, name)
        cache.set(id, name);
    }));
}