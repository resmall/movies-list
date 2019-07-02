const api = require('../services/api');

module.exports = async (page) => {
    const { data : { results } } = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}&page=${page}`);

    let movies = results.map(({title, poster_path, genre_ids, release_date}) => {
        return {title, poster_path, genre_ids, release_date};
    })



    return movies;
}