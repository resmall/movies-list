const api = require('../../services/api');

module.exports = {
    async findUpcomingMovies(page) {
        const { data : { results }} = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}`);
        return results;
    }
};