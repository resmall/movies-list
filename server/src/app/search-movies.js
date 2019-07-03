const api = require('../services/api');
const cache = require('../infra/cache/redis');

module.exports = async (term, page) => {
    const { data : { results } } = await api.get(`/search/movie?api_key=${process.env.API_KEY}&query=${term}&page=${page}`);

    return results;
}