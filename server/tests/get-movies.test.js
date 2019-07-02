const dotenv = require('dotenv');
dotenv.config()
const getMovies = require('../src/app/get-movies');

test('should return 20 movies', async () => {
    const movies = await getMovies()
    expect(movies.results.length).toEqual(20);
});