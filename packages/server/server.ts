import express from 'express';
import path from 'path';
import compression from 'compression';
import { readFile } from './utils';

import cors from 'cors';

const localEnvFile = '.env';

if (process.env.VITE_ENV === 'local') {
    require('dotenv').config(localEnvFile);
}
const clientPath = path.resolve(__dirname, '../client');
const basePath = '/person/dashboard';
const server = express();
server.disable('x-powered-by');

server.options('*', cors());
server.use(
    cors({
        origin: '*', // Allow this domain to access assets
        methods: ['GET', 'POST'], // Allow these methods (GET and POST in this case)
        credentials: true, // If you need to allow credentials (cookies)
    }),
);
server.use(compression());
server.use(express.json());
server.use(`${basePath}`, express.static(clientPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, async (req, res) => {
    const indexPath = path.join(clientPath, 'index.html');
    console.log('indexPath', indexPath);

    const result = await readFile(indexPath, 'utf8');
    res.setHeader(
        'Content-Security-Policy',
        "default-src *.nav.no portal-admin-dev.oera.no localhost:8080 localhost:3010; script-src localhost:8080 localhost:3010 *.nav.no portal-admin-dev.oera.no *.tingtun.no termer.no uxsignals-frontend.uxsignals.app.iterate.no *.psplugin.com *.hotjar.com *.taskanalytics.com navtest.boost.ai 'unsafe-inline' 'unsafe-eval'; script-src-elem localhost:8080 localhost:3010 *.nav.no portal-admin-dev.oera.no *.tingtun.no termer.no uxsignals-frontend.uxsignals.app.iterate.no video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob: *.psplugin.com *.hotjar.com *.taskanalytics.com navtest.boost.ai 'unsafe-inline' 'unsafe-eval'; worker-src *.nav.no portal-admin-dev.oera.no blob:; style-src localhost:8080 localhost:3010 *.nav.no portal-admin-dev.oera.no 'unsafe-inline' 'unsafe-eval' *.psplugin.com *.googleapis.com *.gstatic.com; font-src *.nav.no portal-admin-dev.oera.no data: video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob: *.psplugin.com *.hotjar.com cdn.nav.no *.googleapis.com *.gstatic.com; img-src *.nav.no portal-admin-dev.oera.no data: video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob: uxsignals-frontend.uxsignals.app.iterate.no *.psplugin.com *.vimeocdn.com *.hotjar.com www.vergic.com; object-src video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob:; connect-src *.nav.no portal-admin-dev.oera.no video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob: api.uxsignals.com *.boost.ai *.psplugin.com *.hotjar.com *.hotjar.io *.taskanalytics.com; media-src video.qbrick.com play2.qbrick.com analytics.qbrick.com *.ip-only.net blob: ihb.nav.no; child-src *.nav.no blob:; style-src-elem localhost:8080 localhost:3010 *.nav.no *.psplugin.com 'unsafe-inline' *.googleapis.com *.gstatic.com; frame-src *.hotjar.com player.vimeo.com video.qbrick.com *.nav.no; frame-ancestors 'self' *.psplugin.com",
    );
    res.send(result);
});

const port = process.env.PORT || 3010;
server.listen(port, () => console.info(`App listening on port: ${port}`));
