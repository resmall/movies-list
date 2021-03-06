const api = require('../../services/api');

module.exports = {
    async findAllGenres() {
        let { data : { genres } } = await api.get(`/genre/movie/list?api_key=${process.env.API_KEY}`);
        return genres;
    }
};