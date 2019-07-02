const moviesRepo = require('./movies-repository')
const api = require('./api');
const dotenv = require('dotenv');
dotenv.config()

// how the same test works with our Jest implementation.
describe('movies repository', () => {
    it('list upcoming movies', async () => {
        let results = moviesRepo.makeMoviesDb(api);
        let movies = await results.findUpcomingMovies();
        expect(movies.length).toEqual(20)
    });
});