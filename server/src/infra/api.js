const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

module.exports.api = axios.create({
    baseURL: process.env.TMDB_API_URL
});