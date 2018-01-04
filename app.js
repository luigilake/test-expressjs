import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

var app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server started on Port 3000...')
});
