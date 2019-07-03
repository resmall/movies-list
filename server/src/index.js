const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

app.use(cors());

const { index, search, show } = require('./controllers/moviesController')

app.get('/movies', function (controller) {
    return (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        }

        controller(httpRequest).then(httpResponse => {
            res.status(httpResponse.statusCode).send(httpResponse.body);
        }).catch(e => next(e))
    }
}(index));
app.get('/movies/search', search);
app.get('/movies/:movie_id', show);

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