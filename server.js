const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('allCaps', (text) => {
  return text.toUpperCase();
})

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// app.use is how you use middleware in express
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  })
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

// The use of the static files must be after the maintenance middleware
app.use(express.static(__dirname + '/public'));

// app.get('/', (request, response) => {
//   // response.send('<h1>Hello World!</h1>');
//   response.send({
//     name: 'Maegan',
//     likes: [
//       'books',
//       'curry',
//       'coffee'
//     ]
//   });
// });

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title: 'About',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    title: 'Home',
    // currentYear: new Date().getFullYear(),
    currentUser: 'Maegan'
  })
})

app.get('/error', (request, response) => {
  response.send({
    errorMsg: 'Could not find page.'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
});