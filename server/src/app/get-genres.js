const api = require('../services/api');
const cache = require('../infra/cache/redis');

module.exports = async () => {
    let {data : {genres}} = await api.get(`/genre/movie/list?api_key=${process.env.API_KEY}`);
    return genres;
}