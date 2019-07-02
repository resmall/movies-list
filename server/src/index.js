const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const api = require('./infra/api')
const repo = require('./infra/movies-repository')

app.get('/', async function (req, res) {
    let db = repo.makeMoviesDb(api)
    let r = await db.findUpcomingMovies()
    res.json(r)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});