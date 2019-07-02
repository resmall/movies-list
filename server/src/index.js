const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

app.use(cors());

const movieController = require('./controllers/moviesController')

app.get('/', (req,res) => res.send('ok'))
app.get('/movies', movieController.index);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});
