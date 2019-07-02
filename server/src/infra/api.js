const axios = require('axios');
console.log(process.env.TMDB_API_URL)
module.exports.api = axios.create({
    baseURL: process.env.TMDB_API_URL
});