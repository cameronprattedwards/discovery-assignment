import 'isomorphic-fetch';
import express from 'express';
import qs from 'qs';
import yargs from 'yargs';

const args = yargs.demand(['key']).argv;

const app = express();

app.use(function allowCrossDomain(request, response, next) {
  response.header('Access-Control-Allow-Origin', request.get('Origin'));
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Credentials', 'true');
  response.type('json');
  next();
});

app.get('/favicon.ico', (request, response) => {
  response.status(404).send('Not found');
});

app.get('/*', async (request, response) => {
  try {
    const newQuery = {
      ...request.query,
      key: args.key,
    };
    const youTubeUrl = 'https://www.googleapis.com/youtube/v3' + request.path + '?' + qs.stringify(newQuery);
    const youTubeResponse = await fetch(youTubeUrl);
    const json = await youTubeResponse.json();
    response.status(200).send(json);
  } catch (e) {
    console.error(e);
  }
});

app.listen(5000, () => {
  console.log('listening on 5000');
});


