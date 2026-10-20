const express = require('express');
const bodyParser = require('body-parser');

const postsRouter = require('./routes/post');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tag');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./config/database');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/tags', tagsRouter);

db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

