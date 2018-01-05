import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressValidator from 'express-validator';

var people = [
  {
    id: 1,
    name: 'Gandalf',
    race: 'Wizard',
    age: 290
  },
  {
    id: 2,
    name: 'Legolas',
    race: 'Elf',
    age: 732
  },
  {
    id: 3,
    name: 'Gimli',
    race: 'Dwarf',
    age: 183
  }
]

var app = express();

// var logger = (request, response, next) => {
//   console.log('Logging...');
//   next();
// }
//
// app.use(logger);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// set static path
app.use(express.static(path.join(__dirname, 'public'))); // css files, react, angular, or static resources go into public folder

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}))

app.get('/', (request, response) => {
  // response.send('Hello World'); // renders text
  // response.json(wizards); // renders json
  response.render('index', {
    title: 'Wizards',
    people: people
  }); // render ejs file
});

app.post('/users/add', (request, response) => {

  request.checkBody('name', 'Name is required').notEmpty();
  request.checkBody('race', 'Race is required').notEmpty();
  request.checkBody('age', 'Age is required').notEmpty();

  let errors = request.validationErrors();
  if(errors){
    console.log('**** ERROR ****');
  } else {
    let newPerson = {
      name: request.body.name,
      race: request.body.race,
      age: request.body.age
    }
    console.log('**** SUCCESS ****');
    console.log(newPerson);
  }

});

app.listen(3000, () => {
  console.log('Server started on Port 3000...')
});
