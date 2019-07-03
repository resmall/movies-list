const { findMovieByName } = require('../infra/db/movieRepository');

module.exports = async (movieName, page) => {
    return { results, current_page, total_results, total_pages } = await findMovieByName(movieName, page);
}