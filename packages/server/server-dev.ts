import express from 'express';
import path from 'path';
import { createServer } from 'vite';

import dotenv from 'dotenv';

const localEnvFile = '../../.env';
dotenv.config({ path: localEnvFile });

const startup = async () => {
    const clientPath = path.resolve(__dirname, '../client');
    const basePath = '/person/dashboard';

    const server = express();
    server.disable('x-powered-by');

    server.use(express.json());
    server.use(`${basePath}`, express.static(clientPath, { index: false }));
    server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

    console.info('Starting node server and vite server. Please wait...');

    // Client web:
    // Serve client web through vite dev server:
    const viteDevServer = await createServer({
        server: {
            middlewareMode: true,
        },
        root: '../client',
        base: '/',
    });

    server.post(`${basePath}/*`, async (req, res) => {
        try {
            const fetched = await fetch(`http://localhost:${port}/${basePath}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/html',
                },
            });

            const data = await fetched.text();

            res.send(data);
        } catch (error) {
            console.error('Error fetching from Vite server:', error);
            res.status(500).send('Internal server error');
        }
    });

    server.use(viteDevServer.middlewares);

    const port = process.env.PORT || 3010;
    server.listen(port, () => console.info(`App listening on port: ${port}`));
};

startup();
