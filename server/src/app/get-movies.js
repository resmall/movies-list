const api = require('../services/api');

module.exports = async () => {
    let response = await api.get(`/movie/upcoming?api_key=${process.env.API_KEY}`);
    return response.data;
}