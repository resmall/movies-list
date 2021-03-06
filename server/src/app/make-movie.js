const cache = require('../infra/cache/redis');
const reloadGenreCache = require('./cache-genre');

module.exports = async (results) => {
    let movies = await Promise.all(results.map(async ({
        title,
        poster_path,
        genre_ids,
        release_date,
        id
    }) => {
        poster_path = `${process.env.TMDB_IMAGE_STORE}${poster_path}`;
        return {
            id,
            title,
            poster_path,
            genres: genre_ids,
            release_date
        };
    }))

    for (let i = 0; i < movies.length; i++) {
        const numGenres = movies[i].genres.length;

        for (let j = 0; j < numGenres; j++) {
            let genre_id = movies[i].genres[j];

            try {
                movies[i].genres[j] = await cache.get(genre_id);
            } catch {
                await reloadGenreCache();
            } finally {
                movies[i].genres[j] = await cache.get(genre_id);
            }
        }
    }

    return movies;
}