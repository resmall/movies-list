const api = require('../services/api');

module.exports = async (movie_id) => {
    if (!movie_id) {
        throw ("Inform movie ID");
    }

    const { data } = await api.get(`/movie/${movie_id}?api_key=${process.env.API_KEY}`);

    data.poster_path = `${process.env.TMDB_IMAGE_STORE}${data.poster_path}`;

    return data;
}