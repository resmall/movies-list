const dotenv = require('dotenv');
dotenv.config()
const getMovies = require('../src/app/get-movies');
const getDetails = require('../src/app/get-details');
const searchMovies = require('../src/app/search-movies');

test('should return 20 movies', async () => {
    const movies = await getMovies()
    expect(movies.length).toEqual(20);
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

test('should throw exception since search term was not provided', async () => {
    const searchResult = await searchMovies('rambo');
    expect(searchResult.length).toBeGreaterThan(1);
    expect(Object.keys(searchResult[0])).toEqual(expect.arrayContaining(['id', 'popularity', 'original_title', 'genre_ids']));
});