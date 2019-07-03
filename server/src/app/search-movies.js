const { findMovieByName } = require('../infra/db/movieRepository');
const makeMovies = require('./make-movie');

module.exports = async (movieName, page) => {
    if (!movieName) {
        throw new Error("Movie name is a required field.")
    }
    const { results, current_page, total_results, total_pages } = await findMovieByName(movieName, page);
    const movies = await makeMovies(results);
    return { results: movies, current_page, total_results, total_pages};
}