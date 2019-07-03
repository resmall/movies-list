const api = require('../services/api');
const { findMovieById } = require('../infra/db/movieRepository');

module.exports = async (movie_id) => {
    if (!movie_id) {
        throw ("Inform movie ID");
    }

    const data = await findMovieById(movie_id);

    data.poster_path = `${process.env.TMDB_IMAGE_STORE}${data.poster_path}`;

    return data;
}