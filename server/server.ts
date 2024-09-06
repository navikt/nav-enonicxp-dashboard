import express from 'express';
import path from 'path';
import compression from 'compression';
import fs from 'fs';
import util from 'util';

const localEnvFile = '.env';

if (process.env.VITE_ENV === 'local') {
    require('dotenv').config(localEnvFile);
}
const buildPath = path.resolve(__dirname, '../build');
const basePath = '/navno/dashboard';
const server = express();
const readFile = util.promisify(fs.readFile);
server.disable('x-powered-by');

server.use(compression());
server.use(express.json());
server.use(`${basePath}`, express.static(buildPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, async (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    const result = await readFile(indexPath, 'utf8');
    res.send(result);
});

const port = process.env.PORT || 3010;
server.listen(port, () => console.info(`App listening on port: ${port}`));
