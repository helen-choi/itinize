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

app.get('/api/flights', (req, res, next) => {
  const viewFlightsSql = `
  select *
  from "Flight"
  `;
  db.query(viewFlightsSql)
    .then(result => {
      const flights = result.rows;
      res.json(flights);
    })
    .catch(err => console.error(err));
});

app.post('/api/flights', (req, res, next) => {
  const {
    flightNumber,
    flightDate,
    airportDeparture,
    flightName,
    destinationId,
    status
  } = req.body;

  if (!flightNumber) {
    return res.status(400).json({
      error: 'flightNumber is required'
    });
  }
  if (!flightDate) {
    return res.status(400).json({
      error: 'flightDate is required'
    });
  }
  if (!airportDeparture) {
    return res.status(400).json({
      error: 'airportDeparture is required'
    });
  }
  if (!flightName) {
    return res.status(400).json({
      error: 'flightName is required'
    });
  }
  if (!destinationId) {
    return res.status(400).json({
      error: 'destinationId is required'
    });
  }
  if (!parseInt(destinationId, 10)) {
    return res.status(400).json({
      error: 'destinationId needs to be an integer'
    });
  }
  if (!status) {
    return res.status(400).json({
      error: 'status is required'
    });
  }

  const sql = `
  insert into "Flight" ("flightNumber", "flightDate","airportDeparture", "flightName", "destinationId", "status")
  values ($1, $2, $3, $4, $5, $6)
  returning *
  `;
  const values = [flightNumber, flightDate, airportDeparture, flightName, destinationId, status];

  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.delete('/api/flights/:flightId', (req, res, next) => {
  const { flightId } = req.params;
  const sql = `
  delete from "Flight"
  where "flightId" = $1
  returning *;
  `;
  const value = [flightId];

  if (!parseInt(flightId, 10) ||
    flightId % 1 !== 0 ||
    flightId < 0
  ) {
    res.status(400).json({
      error: 'flightId should be a positive integer'
    });
  }

  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find flight with flightId ${flightId}`
        });
      }
      res.status(204).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.post('/api/lodgings', (req, res, next) => {
  const {
    lodgingName,
    lodgingConfNum,
    checkInDateTime,
    checkOutDateTime,
    locationId,
    destinationId
  } = req.body;
  const sql = `
  insert into "Lodging"
  (
    "lodgingName",
    "lodgingConfNum",
    "checkInDateTime",
    "checkOutDateTime",
    "locationId",
    "destinationId"
  )
  values($1,$2,$3,$4,$5,$6)
  returning *;
  `;
  const values = [
    lodgingName,
    lodgingConfNum,
    checkInDateTime,
    checkOutDateTime,
    locationId,
    destinationId
  ];

  if (!lodgingName) {
    return res.status(400).json({
      error: 'lodgingName is required'
    });
  }
  if (!lodgingConfNum) {
    return res.status(400).json({
      error: 'lodgingConfNum is required'
    });
  }
  if (!checkInDateTime) {
    return res.status(400).json({
      error: 'checkInDateTime is required'
    });
  }
  if (!checkOutDateTime) {
    return res.status(400).json({
      error: 'checkOutDateTime is required'
    });
  }
  if (!locationId) {
    return res.status(400).json({
      error: 'locationId is required'
    });
  }
  if (!destinationId) {
    return res.status(400).json({
      error: 'checkInDateTime is required'
    });
  }
  if (locationId < 0 || locationId % 1 !== 0) {
    return res.status(400).json({
      error: 'locationId needs to be a positive integer'
    });
  }
  if (destinationId < 0 || destinationId % 1 !== 0) {
    return res.status(400).json({
      error: 'destinationId needs to be a positive integer'
    });
  }

  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.put('/api/destinations/:destinationId', (req, res, next) => {
  const { destinationId } = req.params;
  const {
    destinationName,
    tripStart,
    tripEnd,
    description
  } = req.body;
  if (!parseInt(destinationId, 10)) {
    return res.status(400).json({
      error: 'destinationId must be a positive integer'
    });
  }
  if (!destinationName) {
    return res.status(400).json({
      error: 'destinationName is required'
    });
  }
  if (!tripStart) {
    return res.status(400).json({
      error: 'tripStart date is required'
    });
  }
  if (!tripEnd) {
    return res.status(400).json({
      error: 'tripEnd date is required'
    });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({
      error: 'description should be a string'
    });
  }
  const viewUpdateDestinationSql = `
  update "Destinations"
  set "destinationName" = $2,
      "tripStart" = $3,
      "tripEnd" = $4,
      "description" = $5
  where "destinationId" = $1
  returning *
  `;
  const viewUpdateParam = [destinationId, destinationName, tripStart, tripEnd, description];
  db.query(viewUpdateDestinationSql, viewUpdateParam)
    .then(result => {
      const updatedRow = result.rows[0];
      if (!updatedRow) {
        res.status(404).json({
          error: `Cannot find destination with destinationId ${destinationId}`
        });
      } else {
        res.json(updatedRow);
      }
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

app.put('/api/destinations/image/:destinationId', (req, res, next) => {
  const { destinationImage } = req.body;
  const { destinationId } = req.params;
  if (isNaN(destinationId)) {
    return res.status(400).json({
      error: `Invalid field used for this POST method for destinationId '${destinationId}'. Please correct property syntax or try using a number type value.`
    });
  } else if (destinationId < 0 ||
    destinationId % 1 !== 0) {
    res.status(400).json({
      error: 'You need provide a valid destinationId. Try an integer greater than 0'
    });
  } else if (!destinationImage) {
    return res.status(400).json({
      error: 'destinationImage is required as a request body property'
    });
  } else {
    const destinationPutSql = `
    update "Destinations"
    set  "destinationImage" = $2
    where "destinationId" = $1
    returning "destinationImage";
    `;

    const value = [destinationId, destinationImage];
    db.query(destinationPutSql, value)
      .then(response => {
        const returnedImageString = response.rows[0];
        if (!returnedImageString) {
          return res.status(404).json({
            error: `Cannot find destinationImage with "destinationId" ${destinationId}. Please check if this Id exists`
          });
        } else {
          res.json(returnedImageString);
        }
      })
      .catch(err => next(err));
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
