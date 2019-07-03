const getMovies = require('../app/get-movies');
const getDetails = require('../app/get-details');
const searchMovies = require('../app/search-movies');
const ValidationError = require('../support/Exceptions').ValidationError

module.exports =  {

    async index (req, res, next)  {
        let { page } = req.query;

        if (!page) {
            page = 1;
        }

        try {
            const movies = await getMovies(page);
            return res.send(movies)
        } catch (e) {
            next(e);
        }
    },

    async show (req, res, next) {
        const { movie_id } = req.params;

        try {
            const details = await getDetails(movie_id);
            return res.send(details);
        } catch (e) {
            next(e);
        }
    },

    async search (req, res, next) {
        let { term, page } = req.query;
        if (!page) {
            page = 1;
        }

        if (!term) {
            return next(new ValidationError("Missing params", 400))
        }

        try {
            const results = await searchMovies(term, page);
            return res.send(results);
        } catch (e) {
            next(e);
        }
    }
}