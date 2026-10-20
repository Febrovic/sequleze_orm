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
const { ready } = require('./models');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Wait for the tables to exist before handling API requests (needed on Vercel cold starts)
app.use('/api', async (req, res, next) => {
  try {
    await ready;
    next();
  } catch (err) {
    console.error('Database not ready:', err);
    // TEMP: show the reason while debugging the deployment; remove once it works
    res.status(500).json({
      error: 'Database connection failed',
      details: err.message,
      dialect: process.env.DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL,
      hasCaCert: Boolean(process.env.DB_CA_CERT),
      nodeEnv: process.env.NODE_ENV,
    });
  }
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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

