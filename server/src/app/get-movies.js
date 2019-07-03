const { findUpcomingMovies } = require('../infra/db/movieRepository');
const makeMovies = require('./make-movie');

module.exports = async (page) => {
    const { results, current_page, total_results, total_pages } = await findUpcomingMovies(page);
    const movies = await makeMovies(results);
    return { results: movies, current_page, total_results, total_pages};
}