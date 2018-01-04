import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

var app = express();

// var logger = (request, response, next) => {
//   console.log('Logging...');
//   next();
// }
//
// app.use(logger);

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set static path
app.use(express.static(path.join(__dirname, 'public'))); // css files, react, angular, or static resources go into public folder

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server started on Port 3000...')
});
