const { findMovieByName } = require('../infra/db/movieRepository');

module.exports = async (movieName, page) => {
    if (!movieName) {
        throw new Error("Movie name is a required field.")
    }
    return { results, current_page, total_results, total_pages } = await findMovieByName(movieName, page);
}