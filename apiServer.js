import 'isomorphic-fetch';
import express from 'express';
import qs from 'qs';
import yargs from 'yargs';

const args = yargs.demand(['key']).argv;

const app = express();

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
