import express from 'express';
import path from 'path';
import compression from 'compression';
import { readFile } from './utils';
const localEnvFile = '.env';
if (process.env.VITE_ENV === 'local') {
    require('dotenv').config(localEnvFile);
}
const clientPath = path.resolve(__dirname, '../client');
const basePath = '/person/dashboard';
const server = express();
server.disable('x-powered-by');
server.use(compression());
server.use(express.json());
server.use(`${basePath}`, express.static(clientPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));
// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, async (req, res) => {
    const indexPath = path.join(clientPath, 'index.html');
    const result = await readFile(indexPath, 'utf8');
    res.send(result);
});
const port = process.env.PORT || 3010;
server.listen(port, () => console.info(`App listening on port: ${port}`));
