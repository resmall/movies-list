const dotenv = require('dotenv');
dotenv.config()
const getMovies = require('../src/app/get-movies');
const getGenres = require('../src/app/get-genres');
const getDetails = require('../src/app/get-details');

test('should return 20 movies', async () => {
    const movies = await getMovies()
    expect(movies.length).toEqual(20);
});

test('should return movie genres', async () => {
    const genres = await getGenres();
    expect(Object.keys(genres[0])).toEqual(['id', 'name'])
});

test('should not return movie details', async () => {
    let throwed = false;
    try {
        await getDetails();
    } catch(err) {
        throwed = true;
    }
    expect(throwed).toBe(true);
});

test('should return the movie`s details', async () => {
    const details = await getDetails(429617);
    expect(Object.keys(details)).toEqual(expect.arrayContaining(['id', 'popularity', 'original_title', 'budget', 'genres']));
});
