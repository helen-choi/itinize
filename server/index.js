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

app.get('/api/destinations', (req, res, next) => {
  const destinationGetSql = `
  select "destinationName",
  "destinationImage",
  "destinationId"
  from
  "Destinations"
  `;
  db.query(destinationGetSql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/destinations/:destinationId', (req, res, next) => {
  const destinationId = req.params.destinationId;
  const sql = `
  select *
  from "Destinations"
  where "destinationId" = $1
  `;
  const value = [destinationId];

  if (destinationId < 0 ||
    destinationId % 1 !== 0) {
    res.status(400).send('You need provide a valid destinationId');
  } else {
    db.query(sql, value)
      .then(result => {
        if (result.rows.length === 0) {
          res.status(404).send(`Cannot find the destination with destinationId ${destinationId}`);
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => console.error(err));
  }
});

app.post('/api/destinations', (req, res, next) => {
  const {
    destinationName,
    destinationImage,
    tripStart,
    tripEnd,
    description,
    placeId
  } = req.body;
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
  if (typeof description !== 'string') {
    return res.status(400).json({
      error: typeof destinationDescription
    });
  }
  if (!tripStart) {
    return res.status(400).json({
      error: 'need trip start date'
    });
  }
  if (!tripEnd) {
    return res.status(400).json({
      error: 'need trip end date'
    });
  }
  if (!placeId) {
    return res.status(400).json({
      error: 'placeid is required'
    });
  }
  const destinationSql = `
  insert into "Destinations" ("destinationName","destinationImage", "tripStart", "tripEnd", "description", "placeId")
  values ($1, $2, $3, $4, $5, $6)
  returning *;
  `;
  const destinationValue = [destinationName, destinationImage, tripStart, tripEnd, description, placeId];
  db.query(destinationSql, destinationValue)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/destinations/:destinationId', (req, res, next) => {
  const { destinationId } = req.params;
  if (!parseInt(destinationId, 10)) {
    return res.status(400).json({
      error: 'destinationId must be a positive integer'
    });
  }
  const deleteDestinationSql = `
    delete from "Destinations"
    where "destinationId" = $1
    returning *
  `;
  const deleteParam = [destinationId];
  db.query(deleteDestinationSql, deleteParam)
    .then(result => {
      const destinationRow = result.rows[0];
      if (!destinationRow) {
        res.status(404).json({
          error: `cannot find destination with "destinationId" ${destinationId}`
        });
      } else {
        res.status(204).json(destinationRow);
      }
    })
    .catch(err => next(err));
});

app.put('/api/destinations/:destinationId', (req, res, next) => {
  const destinationId = req.params.destinationId;
  const newImageString = req.body;
  const destinationPutSql = `
  update "Destinations"
  set " "destinationImage" = $2
  where "productId" = $1;
  `;

  const value = [destinationId, newImageString];
  db.query(destinationPutSql, value);
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
