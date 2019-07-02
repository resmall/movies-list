const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config()

const movieController = require('./controllers/moviesController')

app.get('/movies', movieController.index);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});
