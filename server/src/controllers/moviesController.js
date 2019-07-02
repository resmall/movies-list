const getMovies = require('../app/get-movies');

module.exports =  {

    async index (req, res, next)  {
        try {
            const movies = await getMovies();
            res.send(movies)
        } catch (e) {
            next(e)
        }
    },

    async search (req, res, next) {

    }
}