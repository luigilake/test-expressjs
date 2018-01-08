import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressValidator from 'express-validator';
import mongojs from 'mongojs';

var db = mongojs('testexpressapp', ['people']);

// var people = [
//   {
//     id: 1,
//     name: 'Gandalf',
//     race: 'Wizard',
//     age: 290
//   },
//   {
//     id: 2,
//     name: 'Legolas',
//     race: 'Elf',
//     age: 732
//   },
//   {
//     id: 3,
//     name: 'Gimli',
//     race: 'Dwarf',
//     age: 183
//   }
// ]

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

// Global Vars
app.use((request, response, next) => {
  response.locals.errors = null
  next();
})

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
  db.people.find((err, docs) => { // this accesses the database
    response.render('index', {
      title: 'Wizards',
      people: docs
    }); // render ejs file
  })


  // response.send('Hello World'); // renders text
  // response.json(wizards); // renders json
});

app.post('/users/add', (request, response) => {

  request.checkBody('name', 'Name is required').notEmpty();
  request.checkBody('race', 'Race is required').notEmpty();
  request.checkBody('age', 'Age is required').notEmpty();

  let errors = request.validationErrors();
  if(errors){
    console.log('**** ERROR ****');
    console.log(errors)
    db.people.find((err, docs) => {
      response.render('index', {
        title: 'Wizards',
        people: docs,
        errors: errors
      }); // render ejs file
    })
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
  console.log('**** Server started on Port 3000 ****')
});
