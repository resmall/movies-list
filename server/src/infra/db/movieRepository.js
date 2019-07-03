const api = require('../../services/api');

module.exports = {
    async findUpcomingMovies(desiredPage) {
        const { data : { results, page, total_results, total_pages }} = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}&page=${desiredPage}`);
        return { results, current_page: page, total_results, total_pages };
    },

    async findMovieByName(movieName, desiredPage) {
        const { data : { results, page, total_results, total_pages }} = await api.get(`/search/movie?api_key=${process.env.API_KEY}&query=${movieName}&page=${desiredPage}`);
        return { results, current_page: page, total_results, total_pages };
    }
};