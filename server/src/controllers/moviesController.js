const getMovies = require('../app/get-movies');
const getDetails = require('../app/get-details');
const searchMovies = require('../app/search-movies');
const ValidationError = require('../support/Exceptions').ValidationError

module.exports =  {

    async index (httpRequest)  {
        let { page } = httpRequest.query;

        if (!page) {
            page = 1;
        }

        try {
            const movies = await getMovies(page);
            return {
                body: movies.results,
                statusCode: 200,
                headers: {
                    'X-Page': movies.current_page,
                    'X-Total-Pages': movies.total_pages,
                    'X-Total': movies.total_results
                }
            }
        } catch (e) {
            console.error(e)
            return {
                body: e.message,
                statusCode: 400
            }
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