import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import path from 'path';

const port = parseInt(process.env.VITE_PORT || '3010', 10);

export default defineConfig({
    build: {
        outDir: '../../dist/client',
    },
    server: {
        port,
    },
    base: process.env.VITE_PUBLIC_URL,
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './packages/client'),
        },
    },
});
