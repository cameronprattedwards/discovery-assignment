import fs from 'fs';
import path from 'path';
import express from 'express';

const indexPage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const app = express();

app.get('/favicon.ico', (request, response) => {
  response.status(404).send('Not found');
});

app.use(express.static('dist'));

app.get('/*', async (request, response) => {
  response.status(200).send(indexPage);
});

app.listen(7000, () => {
  console.log('listening on 7000');
});
