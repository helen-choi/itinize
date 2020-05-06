require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/destinations', (req, res, next) => {
  const destinationName = req.body.destinationName;
  const destinationImage = req.body.destinationImage;
  const destinationDates = req.body.destinationDates;
  const destinationDescription = req.body.destinationDescription;
  if (!destinationName) {
    return res.status(400).json({
      error: 'destinationName is required'
    });
  }
  if (!destinationImage) {
    return res.status(400).json({
      error: 'destinationImage is required'
    });
  }
  if (!destinationDates) {
    return res.status(400).json({
      error: 'DestinationDates is required'
    });
  }

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
