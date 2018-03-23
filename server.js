const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  // response.send('<h1>Hello World!</h1>');
  response.send({
    name: 'Maegan',
    likes: [
      'books',
      'curry',
      'coffee'
    ]
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title: 'About',
    currentYear: new Date().getFullYear()
  });
});

app.get('/error', (request, response) => {
  response.send({
    errorMsg: 'Could not find page.'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});