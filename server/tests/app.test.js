const dotenv = require('dotenv');
dotenv.config()
const getMovies = require('../src/app/get-movies');
const getGenres = require('../src/app/get-genres');

test('should return 20 movies', async () => {
    const movies = await getMovies()
    expect(movies.length).toEqual(20);
});

test('should return movie genres', async () => {
    const genres = await getGenres();
    expect(Object.keys(genres[0])).toEqual(['id', 'name'])
});