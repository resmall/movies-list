const api = require('../services/api');

module.exports =  {

    async index (req, res, next)  {
        try {
            // logic
            let response = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}`);
            let movies = response.data;
            res.send(movies)
        } catch (e) {
            next(e)
        }
    },

    async search (req, res, next) {

    }
}