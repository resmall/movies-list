const { findMovieByName } = require('../infra/db/movieRepository');
const cache = require('../infra/cache/redis');

module.exports = async (movieName, page) => {
    if (!movieName) {
        throw new Error("Movie name is a required field.")
    }

    const { results, current_page, total_results, total_pages } = await findMovieByName(movieName, page);

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



    return { results: movies, current_page, total_results, total_pages};
}