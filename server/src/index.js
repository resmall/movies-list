const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

app.use(cors());

const movieController = require('./controllers/moviesController')

app.get('/movies', movieController.index);
app.get('/movies/search', movieController.search);
app.get('/movies/:movie_id', movieController.show);

app.use(function (err, req, res, next) {
    console.error(err.stack);

    switch (err.constructor.name) {
        case "ValidationError":
            res.status(err.statusCode).send({
                message: err.message
            });
    }
});

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});