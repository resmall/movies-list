const api = require('../services/api');
const cache = require('../infra/cache/redis');
const reloadGenreCache = require('./cache-genre')

module.exports = async (page) => {
    const { data : { results } } = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}`);

    let movies = await Promise.all(results.map(async ({title, poster_path, genre_ids, release_date, id}) => {
        poster_path = `${process.env.TMDB_IMAGE_STORE}${poster_path}`;
        return {id, title, poster_path, genre_ids, release_date};
    }))

    for (let i = 0; i < movies.length; i++) {
        const numGenres = movies[i].genre_ids.length;

        for (let j = 0; j < numGenres; j++) {
            let genre_id = movies[i].genre_ids[j];
            let genre_name = await cache.get(genre_id);

            if (genre_name) {
                movies[i].genre_ids[j] = genre_name;
            } else {
                await reloadGenreCache();
                let genre_name = await cache.get(genre_id);
                movies[i].genre_ids[j] = genre_name;
            }
        }

        // let genres = await Promise.all(genre_ids.map(genre_id => {
        //     try {
        //         console.log('cache miss');
        //         let cached = cache.get(genre_id);
        //         return cached
        //     } catch (e) {
        //         console.log('cache miss');
        //         reloadGenreCache()
        //     }
        // }));
    }



    return movies;
}