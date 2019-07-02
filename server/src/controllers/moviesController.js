const getMovies = require('../app/get-movies');

module.exports =  {

    async index (req, res, next)  {
        let { page } = req.query;

        if (!page) {
            page = 1;
        }

        try {
            const movies = await getMovies(page);
            res.send(movies)
        } catch (e) {
            next(e)
        }
    },

    async search (req, res, next) {

    }
}