const axios = require('axios');

const api = axios.create({baseURL: process.env.TMDB_API_URL});

module.exports = api