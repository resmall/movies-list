const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

const corsOptions = {
    exposedHeaders: 'X-Page, X-Total-Pages, X-Total'
}
app.use(cors(corsOptions));

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
            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.status(httpResponse.statusCode).send(httpResponse.body);
        }).catch(e => next(e));
    }
}(index));

app.get('/movies/search', function (controller) {
    return (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        }

        controller(httpRequest).then(httpResponse => {
            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.status(httpResponse.statusCode).send(httpResponse.body);
        }).catch(e => next(e));
    }
}(search));

app.get('/movies/:movie_id', function (controller) {
    return (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        }

        controller(httpRequest).then(httpResponse => {
            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.status(httpResponse.statusCode).send(httpResponse.body);
        }).catch(e => next(e));
    }
}(show));

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