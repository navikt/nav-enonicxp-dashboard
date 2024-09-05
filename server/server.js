import { express } from 'express';
import { logger } from './logger';
import { path } from 'path';
import { compression } from 'compression';

const localEnvFile = '.env';
const buildPath = path.resolve(__dirname, '../dist');
const basePath = '/navno/dashboard';
const server = express();
server.disable('x-powered-by');

server.use(compression());
server.use(express.json());
server.use(`${basePath}`, express.static(buildPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => `${buildPath}/index.html`);

const port = process.env.PORT || 3000;
server.listen(port, () => logger.info(`App listening on port: ${port}`));
