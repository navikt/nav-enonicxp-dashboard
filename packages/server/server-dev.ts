import compression from 'compression';
import express from 'express';
import { createServer as createViteServer, build } from 'vite';
import path from 'path';
import util from 'util';
import fs from 'fs';
import { readFile } from './utils';

const port = parseInt(process.env.PORT || '3010', 10);
const basePath = '/person/dashboard';
const buildPath = path.resolve(__dirname, './build');

const createServer = async () => {
    const app = express();
    const viteServer = await createViteServer({
        build: {
            outDir: './build-dev',
        },
        configFile: false,
        root: path.resolve(__dirname, '../'), // Point to the root of the project
        server: {
            middlewareMode: true,
            port,
            watch: {
                ignored: ['!**/src/**', '!**/server/**'], // Watch both src and server
            },
        },
    });

    app.use(viteServer.middlewares);

    app.use(express.json());
    app.use(`${basePath}`, express.static(buildPath, { index: false }));
    app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

    app.use(/^(?!.*\/(internal|static)\/).*$/, async (req, res, next) => {
        console.log('Request URL:', req.originalUrl);
        const indexPath = path.join(buildPath, 'index.html');
        const result = await readFile(indexPath, 'utf8');
        res.send(result);
    });

    return app;
};

createServer().then((app) => app.listen(port, () => console.info(`App listening on port: ${port}`)));
