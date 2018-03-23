const express = require('express');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

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

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});