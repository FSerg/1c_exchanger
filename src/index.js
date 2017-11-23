import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';

import DocsDrugstoreRoutes from './routes/DocsDrugstoreRoutes';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, { useMongoClient: true }, err => {
  if (err) console.error(err);
  else console.log('MongoDB connected!');
});

const app = express();
app.use(bodyParser.json());

// routes
app.use('/api/drugstores', DocsDrugstoreRoutes);

// test route
app.get('/test', (req, res) => {
  res.status(200).send({ result: 'GET: /test' });
});

app.listen(config.port, () =>
  console.log(`Server running (port: ${config.port})`)
);
