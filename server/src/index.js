const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const callback = require('./support/ExpressCallback');
const { index, search, show } = require('./controllers/moviesController')

const corsOptions = {
    exposedHeaders: 'X-Page, X-Total-Pages, X-Total'
}
app.use(cors(corsOptions));

app.get('/movies', callback(index));
app.get('/movies/search', callback(search));
app.get('/movies/:movie_id', callback(show));

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