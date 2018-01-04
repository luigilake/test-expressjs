import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

var app = express();

app.listen(3000, () => {
  console.log('Server started on Port 3000...')
})
