const api = require('../services/api');
const cache = require('../infra/cache/redis');
const getGenres = require('./get-genres');

module.exports = async (page) => {
    const { data : { results } } = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}`);

    let genres = await getGenres();
    genres.map(async ({id, name}) => {
        await cache.set(id, name);
    });

    let movies = await Promise.all(results.map(async ({title, poster_path, genre_ids, release_date, id}) => {
        let genres = await Promise.all(genre_ids.map(genre_id => cache.get(genre_id)));
        poster_path = `${process.env.TMDB_IMAGE_STORE}${poster_path}`;
        return {id, title, poster_path, genres, release_date};
    }))

    return movies;
}